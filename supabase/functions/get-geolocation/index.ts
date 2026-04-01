import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_REQUESTS = 30; // Max requests per window (more lenient since it's lightweight)
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window

function checkRateLimit(clientIP: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const key = `get-geolocation:${clientIP}`;
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

// Default fallback response for errors
const fallbackResponse = {
  country: 'Unknown',
  countryCode: 'XX',
  region: 'Unknown',
  city: 'Unknown'
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP from headers (Supabase/Cloudflare provides this)
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
      || req.headers.get('cf-connecting-ip')
      || req.headers.get('x-real-ip')
      || 'unknown';

    // Apply rate limiting
    const rateLimit = checkRateLimit(clientIP);
    
    if (!rateLimit.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          ...fallbackResponse,
          error: "Rate limit exceeded"
        }),
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

    console.log(`[${clientIP}] Fetching geolocation`);

    // Use free IP geolocation API (ip-api.com - free for non-commercial use)
    const geoResponse = await fetch(`http://ip-api.com/json/${clientIP}?fields=status,country,countryCode,region,regionName,city`);
    
    if (!geoResponse.ok) {
      console.error('Geolocation API error:', geoResponse.status);
      return new Response(JSON.stringify(fallbackResponse), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const geoData = await geoResponse.json();
    console.log(`[${clientIP}] Geolocation lookup completed`);

    if (geoData.status === 'fail') {
      // Fallback for localhost/private IPs
      return new Response(JSON.stringify(fallbackResponse), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      country: geoData.country || 'Unknown',
      countryCode: geoData.countryCode || 'XX',
      region: geoData.regionName || 'Unknown',
      city: geoData.city || 'Unknown'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    // Log error server-side only, don't expose details to client
    console.error('Error in get-geolocation function:', error instanceof Error ? error.message : 'Unknown error');
    
    // Return fallback data without error details
    return new Response(JSON.stringify(fallbackResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
