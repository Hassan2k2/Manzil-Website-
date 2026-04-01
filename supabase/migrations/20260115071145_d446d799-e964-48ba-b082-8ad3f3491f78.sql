-- Add session expiry to RLS policies to mitigate device_id authentication risks
-- Sessions older than 7 days cannot be accessed by anonymous users

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own sessions" ON public.assessment_sessions;
DROP POLICY IF EXISTS "Users can update own sessions" ON public.assessment_sessions;

-- Recreate SELECT policy with session expiry for anonymous users
CREATE POLICY "Users can view own sessions"
ON public.assessment_sessions FOR SELECT
USING (
  (
    -- Authenticated users can view their own sessions (no expiry)
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
    OR
    -- Anonymous users can only view recent sessions (within 7 days)
    (auth.uid() IS NULL AND device_id IS NOT NULL AND created_at > now() - interval '7 days')
  )
);

-- Recreate UPDATE policy with session expiry for anonymous users  
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

-- Add index for better performance on device_id lookups
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_device_id 
ON public.assessment_sessions(device_id) 
WHERE user_id IS NULL;

-- Add index for session expiry queries
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_created_at 
ON public.assessment_sessions(created_at);
