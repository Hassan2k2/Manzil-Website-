-- Fix: ensure admin school lookup is deterministic
-- Previously get_user_school_id() could return the 'student' row first, causing RLS to deny admin access.
CREATE OR REPLACE FUNCTION public.get_user_school_id(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT school_id
  FROM public.user_roles
  WHERE user_id = _user_id
    AND role = 'school_admin'
    AND school_id IS NOT NULL
  LIMIT 1
$$;