// Holland RIASEC Test Questions
export interface QuizQuestion {
  id: string;
  text: string;
  category: string;
}

export const riasecQuestions: QuizQuestion[] = [
  // Realistic (R)
  { id: "R1", text: "I like building or fixing things with my hands.", category: "R" },
  { id: "R2", text: "I enjoy using tools, machines, or equipment.", category: "R" },
  { id: "R3", text: "I prefer working outdoors rather than in an office.", category: "R" },
  { id: "R4", text: "I enjoy tasks that allow me to move around and stay active.", category: "R" },
  { id: "R5", text: "I enjoy figuring out how physical things work.", category: "R" },
  { id: "R6", text: "I enjoy practical, hands-on problem-solving.", category: "R" },
  { id: "R7", text: "I enjoy repairing or assembling objects.", category: "R" },
  { id: "R8", text: "I prefer doing rather than talking.", category: "R" },
  
  // Investigative (I)
  { id: "I1", text: "I enjoy solving puzzles or complex problems.", category: "I" },
  { id: "I2", text: "I like doing experiments or analysing information.", category: "I" },
  { id: "I3", text: "I enjoy learning how things work scientifically.", category: "I" },
  { id: "I4", text: "I like exploring ideas and researching answers.", category: "I" },
  { id: "I5", text: "I enjoy working with data, numbers, or evidence.", category: "I" },
  { id: "I6", text: "I like trying to understand why things happen.", category: "I" },
  { id: "I7", text: "I enjoy reading or studying topics deeply.", category: "I" },
  { id: "I8", text: "I like tasks that require thinking more than doing.", category: "I" },
  
  // Artistic (A)
  { id: "A1", text: "I enjoy drawing, writing, designing, and creating things.", category: "A" },
  { id: "A2", text: "I like expressing myself through art, music, or stories.", category: "A" },
  { id: "A3", text: "I enjoy imagining new ideas or original concepts.", category: "A" },
  { id: "A4", text: "I prefer unstructured, open-ended tasks.", category: "A" },
  { id: "A5", text: "I enjoy performing — singing, acting, dancing, etc.", category: "A" },
  { id: "A6", text: "I like activities that allow creativity and freedom.", category: "A" },
  { id: "A7", text: "I enjoy creating visually appealing things.", category: "A" },
  { id: "A8", text: "I prefer tasks with multiple possible outcomes.", category: "A" },
  
  // Social (S)
  { id: "S1", text: "I enjoy helping people solve personal or academic problems.", category: "S" },
  { id: "S2", text: "I like teaching, tutoring, or mentoring others.", category: "S" },
  { id: "S3", text: "I enjoy working with people rather than alone.", category: "S" },
  { id: "S4", text: "I like comforting or supporting others when they're stressed.", category: "S" },
  { id: "S5", text: "I enjoy collaborating in teams.", category: "S" },
  { id: "S6", text: "I like making people feel heard and understood.", category: "S" },
  { id: "S7", text: "I enjoy activities that improve others' lives.", category: "S" },
  { id: "S8", text: "I prefer jobs involving communication and care.", category: "S" },
  
  // Enterprising (E)
  { id: "E1", text: "I enjoy leading people or taking charge of group activities.", category: "E" },
  { id: "E2", text: "I like persuading others or presenting ideas.", category: "E" },
  { id: "E3", text: "I enjoy starting new projects or initiatives.", category: "E" },
  { id: "E4", text: "I like making decisions and setting plans.", category: "E" },
  { id: "E5", text: "I enjoy organising people to achieve a goal.", category: "E" },
  { id: "E6", text: "I like taking risks to achieve something bigger.", category: "E" },
  { id: "E7", text: "I enjoy negotiating or debating.", category: "E" },
  { id: "E8", text: "I like influencing others' opinions.", category: "E" },
  
  // Conventional (C)
  { id: "C1", text: "I enjoy organising information or keeping records.", category: "C" },
  { id: "C2", text: "I like working with schedules, checklists, or systems.", category: "C" },
  { id: "C3", text: "I enjoy completing tasks with clear rules.", category: "C" },
  { id: "C4", text: "I like arranging, filing, or sorting things.", category: "C" },
  { id: "C5", text: "I enjoy working with numbers, charts, or spreadsheets.", category: "C" },
  { id: "C6", text: "I prefer structured, predictable environments.", category: "C" },
  { id: "C7", text: "I enjoy following procedures carefully.", category: "C" },
  { id: "C8", text: "I like tasks that involve accuracy and attention to detail.", category: "C" },
];

// Schwartz Values Assessment
export const valuesQuestions: QuizQuestion[] = [
  { id: "V1", text: "I love to try new and exciting things.", category: "Stimulation" },
  { id: "V2", text: "Helping others is the most important thing.", category: "Benevolence" },
  { id: "V3", text: "I believe in fighting for equality.", category: "Universalism" },
  { id: "V4", text: "It is important to be successful.", category: "Achievement" },
  { id: "V5", text: "I think it is important to follow the rules.", category: "Conformity" },
  { id: "V6", text: "I value my creativity and individuality.", category: "Self-Direction" },
  { id: "V7", text: "If it feels good, do it.", category: "Hedonism" },
  { id: "V8", text: "Tradition is my foundation.", category: "Tradition" },
  { id: "V9", text: "I aspire to be powerful.", category: "Power" },
  { id: "V10", text: "I like routine and dislike the unexpected.", category: "Security" },
  { id: "V11", text: "I usually do what others tell me.", category: "Conformity" },
  { id: "V12", text: "I like to stick up for the 'underdog'.", category: "Universalism" },
  { id: "V13", text: "I seek out pleasure in life.", category: "Hedonism" },
  { id: "V14", text: "I like to tell others what to do.", category: "Power" },
  { id: "V15", text: "Caring for others is one of the most important things in life.", category: "Benevolence" },
  { id: "V16", text: "I crave novelty.", category: "Stimulation" },
  { id: "V17", text: "I hold to my core values no matter what.", category: "Self-Direction" },
  { id: "V18", text: "Rituals are important to me.", category: "Tradition" },
  { id: "V19", text: "Achieving my goals is one of the greatest joys in life.", category: "Achievement" },
  { id: "V20", text: "I crave a predictable life.", category: "Security" },
  { id: "V21", text: "I like to feel a rush.", category: "Stimulation" },
  { id: "V22", text: "I enjoy being in charge of a situation.", category: "Power" },
  { id: "V23", text: "It helps me to know what to expect.", category: "Security" },
  { id: "V24", text: "The highest goal is in serving humanity.", category: "Benevolence" },
  { id: "V25", text: "Doing things as they have always been done is more important than changing things.", category: "Tradition" },
  { id: "V26", text: "It is important for me to feel authentic to who I really am.", category: "Self-Direction" },
  { id: "V27", text: "It makes sense to seek out pleasure and avoid pain.", category: "Hedonism" },
  { id: "V28", text: "All people are fundamentally equal.", category: "Universalism" },
  { id: "V29", text: "Things go more smoothly when people follow established rules.", category: "Conformity" },
  { id: "V30", text: "Getting what I want in life is among my most important values.", category: "Achievement" },
];

// Big Five Personality Test
export const bigFiveQuestions: QuizQuestion[] = [
  // Extraversion
  { id: "BF1", text: "I am the life of the party.", category: "Extraversion_High" },
  { id: "BF2", text: "I feel comfortable around people.", category: "Extraversion_High" },
  { id: "BF3", text: "I talk to a lot of different people at social events.", category: "Extraversion_High" },
  { id: "BF4", text: "I don't like to draw attention to myself.", category: "Extraversion_Low" },
  { id: "BF5", text: "I prefer to keep in the background.", category: "Extraversion_Low" },
  { id: "BF6", text: "I am quiet around strangers.", category: "Extraversion_Low" },
  
  // Agreeableness
  { id: "BF7", text: "I feel little concern for others.", category: "Agreeableness_Low" },
  { id: "BF8", text: "I am not interested in other people's problems.", category: "Agreeableness_Low" },
  { id: "BF9", text: "I insult people sometimes.", category: "Agreeableness_Low" },
  { id: "BF10", text: "I am not really interested in others.", category: "Agreeableness_Low" },
  { id: "BF11", text: "I am interested in people.", category: "Agreeableness_High" },
  { id: "BF12", text: "I sympathise with others' feelings.", category: "Agreeableness_High" },
  { id: "BF13", text: "I make people feel at ease.", category: "Agreeableness_High" },
  { id: "BF14", text: "I take time out for others.", category: "Agreeableness_High" },
  
  // Conscientiousness
  { id: "BF15", text: "I am always prepared for things.", category: "Conscientiousness_High" },
  { id: "BF16", text: "I follow a schedule.", category: "Conscientiousness_High" },
  { id: "BF17", text: "I pay attention to details.", category: "Conscientiousness_High" },
  { id: "BF18", text: "I like order.", category: "Conscientiousness_High" },
  { id: "BF19", text: "I leave my belongings around.", category: "Conscientiousness_Low" },
  { id: "BF20", text: "I make a mess of things.", category: "Conscientiousness_Low" },
  { id: "BF21", text: "I often forget to put things back in their proper place.", category: "Conscientiousness_Low" },
  { id: "BF22", text: "I shrink from duties.", category: "Conscientiousness_Low" },
  
  // Neuroticism
  { id: "BF23", text: "I get stressed out easily.", category: "Neuroticism_High" },
  { id: "BF24", text: "I get irritated easily.", category: "Neuroticism_High" },
  { id: "BF25", text: "I have frequent mood swings.", category: "Neuroticism_High" },
  { id: "BF26", text: "I am relaxed most of the time.", category: "Neuroticism_Low" },
  { id: "BF27", text: "I rarely feel blue/upset.", category: "Neuroticism_Low" },
  { id: "BF28", text: "I don't worry about things.", category: "Neuroticism_Low" },
  
  // Openness
  { id: "BF29", text: "I have difficulty understanding abstract ideas.", category: "Openness_Low" },
  { id: "BF30", text: "I am not interested in abstract ideas and theoretical concepts.", category: "Openness_Low" },
  { id: "BF31", text: "I do not have a good imagination.", category: "Openness_Low" },
  { id: "BF32", text: "I like tackling new challenges.", category: "Openness_High" },
  { id: "BF33", text: "I have a vivid imagination.", category: "Openness_High" },
  { id: "BF34", text: "I like trying new things.", category: "Openness_High" },
];

export const riasecLabels: Record<string, { name: string; description: string; color: string }> = {
  R: { name: "Realistic", description: "Practical & hands-on", color: "coral" },
  I: { name: "Investigative", description: "Curious & analytical", color: "teal" },
  A: { name: "Artistic", description: "Creative & expressive", color: "lavender" },
  S: { name: "Social", description: "Helpful & empathetic", color: "mint" },
  E: { name: "Enterprising", description: "Ambitious & persuasive", color: "amber" },
  C: { name: "Conventional", description: "Organized & detail-oriented", color: "sky" },
};

export const valueCategories = [
  "Stimulation", "Benevolence", "Universalism", "Achievement", 
  "Conformity", "Self-Direction", "Hedonism", "Tradition", "Power", "Security"
];

export const higherOrderValues: Record<string, string[]> = {
  "Self-Transcendence": ["Universalism", "Benevolence"],
  "Self-Enhancement": ["Achievement", "Power"],
  "Openness to Change": ["Hedonism", "Self-Direction", "Stimulation"],
  "Conservation": ["Conformity", "Tradition", "Security"],
};

export const bigFiveTraits = ["Extraversion", "Agreeableness", "Conscientiousness", "Neuroticism", "Openness"];
