-- Fix SECURITY DEFINER view issue by using security_invoker
-- Drop and recreate view with security_invoker=on

DROP VIEW IF EXISTS public.assessment_sessions_safe;

CREATE VIEW public.assessment_sessions_safe
WITH (security_invoker=on) AS
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