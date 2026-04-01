import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_REQUESTS = 5; // Max requests per window (stricter since this is more expensive)
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_PAYLOAD_SIZE = 50 * 1024; // 50KB max payload

function checkRateLimit(clientIP: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const key = `analyze-results:${clientIP}`;
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_REQUESTS - 1 };
  }

  if (record.count >= RATE_LIMIT_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_REQUESTS - record.count };
}

function getClientIP(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('cf-connecting-ip')
    || req.headers.get('x-real-ip')
    || 'unknown';
}

// Input validation schemas
const MajorSchema = z.object({
  id: z.string().min(1).max(100),
  name: z.string().min(1).max(200),
  score: z.number().min(0).max(100),
});

const RequestSchema = z.object({
  topRiasecCodes: z.array(z.string().max(10)).min(1).max(6),
  riasecScores: z.record(z.string().max(10), z.number().min(0).max(100)).optional().default({}),
  higherOrderScores: z.record(z.string().max(100), z.number().min(0).max(100)).optional().default({}),
  bigFiveScores: z.record(z.string().max(50), z.number().min(0).max(100)).optional().default({}),
  topMajors: z.array(MajorSchema).min(1).max(20),
  goodMajors: z.array(MajorSchema).max(20).optional().default([]),
  notFitMajors: z.array(MajorSchema).max(20).optional().default([]),
});

type AnalysisRequest = z.infer<typeof RequestSchema>;

// Sanitize strings for AI prompts to prevent injection
function sanitizeForPrompt(str: string): string {
  return str
    .replace(/[<>"`]/g, '') // Remove injection characters
    .replace(/\n{3,}/g, '\n\n') // Limit consecutive newlines
    .substring(0, 200); // Hard limit length
}

// Generic error handler - logs details server-side, returns generic message to client
function handleError(error: unknown, context: string, clientIP: string): Response {
  console.error(`[${context}] [${clientIP}]`, {
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString(),
  });
  
  return new Response(
    JSON.stringify({ 
      error: 'An error occurred processing your request. Please try again later.' 
    }),
    { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Get client IP and apply rate limiting
  const clientIP = getClientIP(req);
  const rateLimit = checkRateLimit(clientIP);
  
  if (!rateLimit.allowed) {
    console.warn(`Rate limit exceeded for IP: ${clientIP}`);
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
      {
        status: 429,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Retry-After': '60'
        },
      }
    );
  }

  try {
    // Check Content-Length before parsing
    const contentLength = parseInt(req.headers.get('content-length') || '0', 10);
    if (contentLength > MAX_PAYLOAD_SIZE) {
      console.warn(`Payload too large from IP ${clientIP}: ${contentLength} bytes`);
      return new Response(
        JSON.stringify({ error: "Request payload too large" }),
        { status: 413, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const requestBody = await req.json();
    
    // Validate input using zod schema
    const parseResult = RequestSchema.safeParse(requestBody);
    if (!parseResult.success) {
      console.warn(`[${clientIP}] Invalid request:`, parseResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`));
      return new Response(
        JSON.stringify({ error: "Invalid request data. Please check your input." }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { 
      topRiasecCodes, 
      riasecScores, 
      higherOrderScores, 
      bigFiveScores, 
      topMajors, 
      goodMajors, 
      notFitMajors 
    } = parseResult.data;

    console.log(`[${clientIP}] Analyzing results for student with codes:`, topRiasecCodes);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('[CRITICAL] API key not configured');
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable. Please try again later.' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build a comprehensive prompt for the AI
    const riasecLabels: Record<string, string> = {
      R: 'Realistic (hands-on, practical)',
      I: 'Investigative (analytical, curious)',
      A: 'Artistic (creative, expressive)',
      S: 'Social (helping, teaching)',
      E: 'Enterprising (leading, persuading)',
      C: 'Conventional (organizing, detail-oriented)'
    };

    const topInterests = topRiasecCodes.slice(0, 3).map(code => riasecLabels[code] || sanitizeForPrompt(code)).join(', ');
    
    const topValues = Object.entries(higherOrderScores || {})
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([val]) => sanitizeForPrompt(val))
      .join(' and ');

    const personalityTraits = Object.entries(bigFiveScores || {})
      .sort(([, a], [, b]) => b - a)
      .map(([trait, score]) => `${sanitizeForPrompt(trait)}: ${score}%`)
      .join(', ');

    const systemPrompt = `You are a friendly, encouraging career counselor for teenagers (ages 14-19). 
Your job is to explain why certain academic majors fit or don't fit a student based on their interests, values, and personality.
Write in a warm, motivating tone - avoid academic jargon. Use "you" language.
Be specific and personal - reference their actual traits. Keep explanations concise but meaningful.`;

    // Sanitize major names for the prompt
    const sanitizedTopMajors = topMajors.map((m, i) => `${i + 1}. ${sanitizeForPrompt(m.name)} (Score: ${m.score}/100)`).join('\n');
    const sanitizedGoodMajors = goodMajors.map((m, i) => `${i + 4}. ${sanitizeForPrompt(m.name)} (Score: ${m.score}/100)`).join('\n') || 'None';
    const sanitizedNotFitMajors = notFitMajors.map(m => `- ${sanitizeForPrompt(m.name)}`).join('\n') || 'None';

    const userPrompt = `Analyze these assessment results for a student:

**Their Top Interests (Holland Code: ${topRiasecCodes.slice(0, 3).join('')}):**
${topInterests}

**Their Core Values:**
${topValues || 'Not specified'}

**Their Personality Profile:**
${personalityTraits || 'Not specified'}

**Top 3 Majors to explain (strongest fit):**
${sanitizedTopMajors}

**Good Fit Majors (still strong, explain briefly why slightly lower):**
${sanitizedGoodMajors}

**NOT a Good Fit Majors (explain why these don't match):**
${sanitizedNotFitMajors}

Return a JSON object with this exact structure:
{
  "topMajors": [
    {
      "id": "major-id",
      "whyFits": ["3 specific reasons why this fits their interests/values/personality"],
      "whatGives": ["3 things this major will give them"],
      "whyNotBoring": "One engaging sentence about why they'll enjoy it"
    }
  ],
  "goodMajors": [
    {
      "id": "major-id", 
      "whyFits": ["2 reasons why it's a good fit"],
      "whySlightlyLower": ["2 reasons why it ranks lower than top 3"]
    }
  ],
  "notFitMajors": [
    {
      "id": "major-id",
      "whyNot": ["3 specific reasons why this doesn't match their profile"]
    }
  ]
}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Service is busy. Please try again later.' }),
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Service temporarily unavailable. Please try again later.' }),
          {
            status: 503,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      // Generic error for other status codes
      console.error(`AI API returned status ${response.status}`);
      throw new Error('AI service error');
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log(`[${clientIP}] AI response received, parsing...`);
    
    // Parse the JSON from the response
    let analysis;
    try {
      // Try to extract JSON from the response (it might be wrapped in markdown code blocks)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid response from AI');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response');
      throw new Error('Failed to process results');
    }

    console.log(`[${clientIP}] Successfully analyzed results`);

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return handleError(error, 'analyze-results', clientIP);
  }
});
