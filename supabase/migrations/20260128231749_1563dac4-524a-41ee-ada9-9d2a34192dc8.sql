-- Fix overly permissive SELECT policy on assessment_sessions
-- The current policy allows ANY anonymous user to read ANY session with a device_id
-- This exposes all assessment data to potential attackers

-- Drop the existing overly permissive SELECT policy
DROP POLICY IF EXISTS "Users can view own sessions" ON public.assessment_sessions;

-- Create a more restrictive SELECT policy
-- Authenticated users: can only view their own sessions (user_id matches)
-- Anonymous users: CANNOT directly SELECT from this table
-- Anonymous users MUST use the get_user_session RPC function which validates device_id + session_secret
CREATE POLICY "Users can view own sessions" 
ON public.assessment_sessions 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND user_id = auth.uid()
);

-- Note: Anonymous session access is handled securely via the get_user_session RPC function
-- which requires BOTH device_id AND session_secret to match (384-bit combined entropy)