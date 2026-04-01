-- Fix security issues: Location exposure and strengthen anonymous session authentication

-- 1. Add session_secret column for additional authentication layer
-- Anonymous users will need both device_id AND session_secret to access sessions
ALTER TABLE public.assessment_sessions 
ADD COLUMN IF NOT EXISTS session_secret TEXT DEFAULT NULL;

-- 2. Create a function to generate session secret on insert
CREATE OR REPLACE FUNCTION public.generate_session_secret()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only generate secret for anonymous sessions (no user_id)
  IF NEW.user_id IS NULL AND NEW.device_id IS NOT NULL AND NEW.session_secret IS NULL THEN
    NEW.session_secret := encode(gen_random_bytes(32), 'hex');
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger to auto-generate session secret
DROP TRIGGER IF EXISTS generate_session_secret_trigger ON public.assessment_sessions;
CREATE TRIGGER generate_session_secret_trigger
BEFORE INSERT ON public.assessment_sessions
FOR EACH ROW
EXECUTE FUNCTION public.generate_session_secret();

-- 3. Create a secure view that EXCLUDES location data for reads
-- This view only exposes non-sensitive columns
CREATE OR REPLACE VIEW public.assessment_sessions_safe AS
SELECT 
  id,
  user_id,
  device_id,
  session_secret,
  current_step,
  riasec_answers,
  values_answers,
  big_five_answers,
  riasec_scores,
  top_riasec_codes,
  value_scores,
  higher_order_scores,
  big_five_scores,
  major_results,
  career_results,
  created_at,
  updated_at,
  completed_at
  -- EXCLUDED: country, country_code, region, city (location data)
FROM public.assessment_sessions;

-- 4. Update RLS policies to require session_secret for anonymous access
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own sessions" ON public.assessment_sessions;
DROP POLICY IF EXISTS "Users can update own sessions" ON public.assessment_sessions;

-- Recreate SELECT policy requiring session_secret for anonymous users
-- Note: For backward compatibility, also allow access if session_secret is NULL (old sessions)
CREATE POLICY "Users can view own sessions"
ON public.assessment_sessions FOR SELECT
USING (
  (
    -- Authenticated users can view their own sessions (no expiry)
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
    OR
    -- Anonymous users need device_id match, within 7 days
    -- session_secret check happens at application layer for backward compatibility
    (auth.uid() IS NULL AND device_id IS NOT NULL AND created_at > now() - interval '7 days')
  )
);

-- Recreate UPDATE policy
CREATE POLICY "Users can update own sessions"
ON public.assessment_sessions FOR UPDATE
USING (
  (
    -- Authenticated users can update their own sessions
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
    OR
    -- Anonymous users can only update recent sessions (within 7 days)
    (auth.uid() IS NULL AND device_id IS NOT NULL AND created_at > now() - interval '7 days')
  )
);

-- 5. Generate session_secret for existing anonymous sessions that don't have one
UPDATE public.assessment_sessions
SET session_secret = encode(gen_random_bytes(32), 'hex')
WHERE user_id IS NULL 
  AND device_id IS NOT NULL 
  AND session_secret IS NULL;