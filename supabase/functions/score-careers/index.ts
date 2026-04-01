import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory rate limiter (resets on function cold start, but provides reasonable protection)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_REQUESTS = 10; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_PAYLOAD_SIZE = 100 * 1024; // 100KB max payload

function checkRateLimit(clientIP: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const key = `score-careers:${clientIP}`;
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
const RiasecCodeSchema = z.enum(['R', 'I', 'A', 'S', 'E', 'C']);

const StudentProfileSchema = z.object({
  topRiasecCodes: z.array(z.string().max(10)).min(1).max(6),
  riasecScores: z.record(z.string().max(10), z.number().min(0).max(100)).optional().default({}),
  higherOrderValues: z.record(z.string().max(100), z.number().min(0).max(100)).optional().default({}),
  bigFiveScores: z.record(z.string().max(50), z.number().min(0).max(100)).optional().default({}),
});

const CareerSchema = z.object({
  id: z.string().min(1).max(100),
  name: z.string().min(1).max(200),
  riasecMatch: z.array(z.string().max(10)).max(6).optional().default([]),
  valueMatch: z.array(z.string().max(100)).max(20).optional().default([]),
  personalityMatch: z.record(
    z.string().max(50),
    z.string().max(20)
  ).optional().default({}),
});

const RequestSchema = z.object({
  studentProfile: StudentProfileSchema,
  careers: z.array(CareerSchema).max(100).optional().default([]),
  majors: z.array(CareerSchema).max(100).optional().default([]),
});

type StudentProfile = z.infer<typeof StudentProfileSchema>;
type Career = z.infer<typeof CareerSchema>;

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

    const payload = await req.json();

    // Validate input using zod schema
    const parseResult = RequestSchema.safeParse(payload);
    if (!parseResult.success) {
      console.warn(`[${clientIP}] Invalid request:`, parseResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`));
      return new Response(
        JSON.stringify({ error: "Invalid request data. Please check your input." }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { studentProfile, careers: careersList, majors: majorsList } = parseResult.data;

    if (careersList.length === 0 && majorsList.length === 0) {
      return new Response(
        JSON.stringify({ error: "No careers or majors provided to score" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[${clientIP}] Scoring recommendations for student with profile:`, {
      riasec: studentProfile.topRiasecCodes,
      topValues: Object.entries(studentProfile.higherOrderValues || {})
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2)
        .map(([k]) => k),
      careers: careersList.length,
      majors: majorsList.length,
    });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error('[CRITICAL] API key not configured');
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable. Please try again later.' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format student profile for the prompt
    const topValues = Object.entries(studentProfile.higherOrderValues || {})
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2)
      .map(([k]) => k);

    const bigFiveDescription = Object.entries(studentProfile.bigFiveScores || {})
      .map(([trait, score]) => {
        const level = score >= 70 ? "high" : score >= 40 ? "moderate" : "low";
        return `${sanitizeForPrompt(trait)}: ${level} (${score}%)`;
      })
      .join(", ");

    // Process items in batches to avoid context limits
    const batchSize = 25;

    type ScoreResult = { score: number; riasec: number; values: number; personality: number };

    const scoreItems = async (items: Career[], kind: "careers" | "majors") => {
      const allScores: Record<string, ScoreResult> = {};

      for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);

        // Sanitize all user-provided strings before inserting into prompt
        const itemsList = batch
          .map(
            (c) =>
              `- ${sanitizeForPrompt(c.name)} (ID: ${sanitizeForPrompt(c.id)}): RIASEC=${c.riasecMatch?.join("") || "N/A"}, Values=[${c.valueMatch?.map(v => sanitizeForPrompt(v)).join(", ") || "N/A"}], Personality: O=${c.personalityMatch?.openness || "N/A"}, C=${c.personalityMatch?.conscientiousness || "N/A"}, E=${c.personalityMatch?.extraversion || "N/A"}, A=${c.personalityMatch?.agreeableness || "N/A"}, N=${c.personalityMatch?.neuroticism || "N/A"}`,
          )
          .join("\n");

        const sanitizedRiasecCodes = studentProfile.topRiasecCodes.map(c => sanitizeForPrompt(c));
        const sanitizedTopValues = topValues.map(v => sanitizeForPrompt(v));

        const prompt = `You are a career counselor AI. Score how well each item matches this student's profile.

STUDENT PROFILE:
- Holland/RIASEC Code: ${sanitizedRiasecCodes.join("")} (top 3: ${sanitizedRiasecCodes.join(", ")})
- Core Values: ${sanitizedTopValues.join(", ")}
- Big Five Personality: ${bigFiveDescription}

${kind.toUpperCase()} TO SCORE (use the EXACT IDs shown):
${itemsList}

Return ONLY valid JSON in ONE of these forms (prefer the array):

A) Array form:
[{"id":"item-id","riasec":90,"values":80,"personality":85}, ...]

B) Object form:
{"item-id": {"riasec":90,"values":80,"personality":85}, ...}

Rules:
- IDs must match exactly one of the IDs provided above.
- Scores are integers 0-100.
- Be discriminating (not everything high).`;

        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-5-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are an expert career counselor. Always respond with valid JSON only, no markdown or explanations.",
              },
              { role: "user", content: prompt },
            ],
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("AI API error:", response.status, errorText);

          if (response.status === 429) {
            return new Response(
              JSON.stringify({ error: "Service is busy. Please try again later." }),
              {
                status: 429,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
              },
            );
          }
          if (response.status === 402) {
            return new Response(
              JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
              {
                status: 503,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
              },
            );
          }
          // Generic error for other status codes
          console.error(`AI API returned status ${response.status}`);
          throw new Error('AI service error');
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || "";

        console.log(`${kind} batch ${Math.floor(i / batchSize) + 1} response received`);

        // Parse the JSON response
        try {
          // Clean up the response - remove markdown code blocks if present
          let cleanContent = content.trim();
          if (cleanContent.startsWith("```json")) {
            cleanContent = cleanContent.slice(7);
          }
          if (cleanContent.startsWith("```")) {
            cleanContent = cleanContent.slice(3);
          }
          if (cleanContent.endsWith("```")) {
            cleanContent = cleanContent.slice(0, -3);
          }
          cleanContent = cleanContent.trim();

          const parsedAny = JSON.parse(cleanContent) as any;

          // Accept either array form [{id, riasec, values, personality}] or object form {id: {...}}
          const parsedMap: Record<string, any> = Array.isArray(parsedAny)
            ? Object.fromEntries(
                parsedAny
                  .filter((x: any) => x && typeof x.id === "string")
                  .map((x: any) => [x.id, x]),
              )
            : (parsedAny ?? {});

          const toNum = (v: unknown) => {
            const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
            return Number.isFinite(n) ? n : NaN;
          };

          const clamp01 = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

          // Ensure we return a score for EVERY item ID in this batch.
          for (const item of batch) {
            const raw = parsedMap?.[item.id];

            const riasec = clamp01(toNum(raw?.riasec));
            const values = clamp01(toNum(raw?.values));
            const personality = clamp01(toNum(raw?.personality));

            const valid = Number.isFinite(riasec) && Number.isFinite(values) && Number.isFinite(personality);

            if (!valid) {
              allScores[item.id] = calculateFallbackScore(studentProfile, item);
              continue;
            }

            const score = clamp01(riasec * 0.4 + values * 0.35 + personality * 0.25);
            allScores[item.id] = { score, riasec, values, personality };
          }
        } catch (parseError) {
          console.error("Failed to parse batch response");
          // Fall back to formula-based scoring for this batch
          for (const item of batch) {
            allScores[item.id] = calculateFallbackScore(studentProfile, item);
          }
        }
      }

      return allScores;
    };

    let careerScores: Record<string, ScoreResult> | undefined;
    let majorScores: Record<string, ScoreResult> | undefined;

    // Score careers (if provided)
    if (careersList.length > 0) {
      const maybeResponse = await scoreItems(careersList, "careers");
      if (maybeResponse instanceof Response) return maybeResponse;
      careerScores = maybeResponse;
    }

    // Score majors (if provided)
    if (majorsList.length > 0) {
      const maybeResponse = await scoreItems(majorsList, "majors");
      if (maybeResponse instanceof Response) return maybeResponse;
      majorScores = maybeResponse;
    }

    console.log(`[${clientIP}] Successfully scored:`, {
      careers: careerScores ? Object.keys(careerScores).length : 0,
      majors: majorScores ? Object.keys(majorScores).length : 0,
    });

    return new Response(
      JSON.stringify({
        ...(careerScores ? { scores: careerScores } : {}),
        ...(majorScores ? { majorScores } : {}),
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );

  } catch (error) {
    return handleError(error, 'score-careers', clientIP);
  }
});

function calculateFallbackScore(profile: StudentProfile, career: Career) {
  // Simple fallback scoring if AI fails
  let riasecScore = 0;
  (career.riasecMatch || []).forEach((code, i) => {
    const pos = profile.topRiasecCodes.indexOf(code);
    if (pos !== -1) {
      riasecScore += (3 - pos) * (3 - i) * 10;
    }
  });
  riasecScore = Math.min(100, riasecScore);
  
  const topValues = Object.entries(profile.higherOrderValues || {})
    .sort(([,a], [,b]) => b - a)
    .slice(0, 2)
    .map(([k]) => k);
  
  let valuesScore = 0;
  (career.valueMatch || []).forEach(v => {
    if (topValues.includes(v)) valuesScore += 50;
  });
  valuesScore = Math.min(100, valuesScore);
  
  const personalityScore = 60; // Default middle score
  
  const overall = Math.round((riasecScore * 0.4 + valuesScore * 0.35 + personalityScore * 0.25));
  
  return { score: overall, riasec: riasecScore, values: valuesScore, personality: personalityScore };
}
