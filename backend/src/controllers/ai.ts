import { Request, Response } from 'express';
// Note: Ensure `npm install groq-sdk` is run
import { Groq } from 'groq-sdk';

// Initialize the Groq client (safe if undefined, will just throw on usage if unhandled)
const groq = process.env.GROQ_API_KEY ? new Groq({
  apiKey: process.env.GROQ_API_KEY,
}) : null;

export const getRecommendations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentProfile, careers } = req.body;
    
    // We expect the frontend to pass studentProfile containing scores
    // and `careers` array indicating what it wants scored
    
    if (!groq) {
      console.warn("GROQ_API_KEY not found. Returning mocked generic scores.");
      // Provide a mock structure matching useAICareerScoring.ts expectations
      const mockScores: Record<string, any> = {};
      if (careers && Array.isArray(careers)) {
        careers.forEach((c: any) => {
           mockScores[c.id] = {
             score: Math.floor(Math.random() * 40) + 60, // random 60-100
             riasec: 85,
             values: 80,
             personality: 90
           };
        });
      }
      res.json({ scores: mockScores });
      return;
    }

    // Actual OpenAI Call
    const prompt = `
    You are an AI Career Counselor. Based on the student's psychological profile, score each 
    career path mathematically on a scale of 0-100 indicating how strong of a match it is.
    
    Student Profile:
    ${JSON.stringify(studentProfile)}
    
    Careers to Score:
    ${JSON.stringify(careers.map((c: any) => ({ id: c.id, name: c.name })))}
    
    Respond STRICTLY in valid JSON matching this exact structure mapping the career ID to the score breakdown:
    {
      "scores": {
        "careeer_id": {
          "score": 95,
          "riasec": 98,
          "values": 90,
          "personality": 88
        }
      }
    }
    No extra text, no markdown codeblocks, just the pure JSON.
    `;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "system", content: "You are a career mapping JSON endpoint. Provide only valid JSON." }, { role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      top_p: 1,
      response_format: { type: "json_object" }
    });

    const resultString = completion.choices[0]?.message?.content;
    if (!resultString) {
      throw new Error("No response from Groq");
    }

    const resultJson = JSON.parse(resultString);
    res.json(resultJson);

  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ message: 'Error generating recommendations' });
  }
};
