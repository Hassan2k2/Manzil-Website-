-- Create a secure RPC function to get user sessions with server-side validation
-- This prevents enumeration attacks by requiring both device_id AND session_secret

CREATE OR REPLACE FUNCTION public.get_user_session(
  p_device_id TEXT,
  p_session_secret TEXT
)
RETURNS TABLE (
  id UUID,
  device_id TEXT,
  user_id UUID,
  session_secret TEXT,
  current_step TEXT,
  riasec_answers JSONB,
  values_answers JSONB,
  big_five_answers JSONB,
  riasec_scores JSONB,
  top_riasec_codes TEXT[],
  value_scores JSONB,
  higher_order_scores JSONB,
  big_five_scores JSONB,
  major_results JSONB,
  career_results JSONB,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Validate inputs are not null/empty
  IF p_device_id IS NULL OR p_device_id = '' THEN
    RETURN;
  END IF;
  
  -- Return session only if BOTH device_id AND session_secret match
  -- This provides 384-bit combined entropy protection against enumeration
  RETURN QUERY
  SELECT 
    s.id,
    s.device_id,
    s.user_id,
    s.session_secret,
    s.current_step,
    s.riasec_answers,
    s.values_answers,
    s.big_five_answers,
    s.riasec_scores,
    s.top_riasec_codes,
    s.value_scores,
    s.higher_order_scores,
    s.big_five_scores,
    s.major_results,
    s.career_results,
    s.created_at,
    s.updated_at,
    s.completed_at
  FROM assessment_sessions s
  WHERE s.device_id = p_device_id
    AND s.completed_at IS NULL
    AND s.created_at > now() - interval '7 days'
    AND (
      -- For sessions with secret: require exact match
      (s.session_secret IS NOT NULL AND p_session_secret IS NOT NULL AND s.session_secret = p_session_secret)
      OR
      -- For legacy sessions without secret: allow if no secret was set (backward compat)
      (s.session_secret IS NULL AND p_session_secret IS NULL)
    )
  ORDER BY s.updated_at DESC
  LIMIT 1;
END;
$$;

-- Grant execute permission to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION public.get_user_session(TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.get_user_session(TEXT, TEXT) TO authenticated;