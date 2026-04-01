-- Create app role enum for user roles
CREATE TYPE public.app_role AS ENUM ('student', 'school_admin');

-- Create schools table
CREATE TABLE public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE, -- Unique code students use to join
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table (separate from profiles per security requirements)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'student',
  school_id UUID REFERENCES public.schools(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on both tables
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Security definer function to get user's school_id
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
  LIMIT 1
$$;

-- RLS policies for schools table
CREATE POLICY "School admins can view their school"
ON public.schools FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'school_admin') 
  AND id = public.get_user_school_id(auth.uid())
);

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own role"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "School admins can view roles in their school"
ON public.user_roles FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'school_admin')
  AND school_id = public.get_user_school_id(auth.uid())
);

-- Add school_id to assessment_sessions for linking students to schools
ALTER TABLE public.assessment_sessions 
ADD COLUMN school_id UUID REFERENCES public.schools(id) ON DELETE SET NULL;

-- Policy for school admins to view their students' sessions
CREATE POLICY "School admins can view their school sessions"
ON public.assessment_sessions FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'school_admin')
  AND school_id = public.get_user_school_id(auth.uid())
);

-- Add school_id to user_activity for school tracking
ALTER TABLE public.user_activity
ADD COLUMN school_id UUID REFERENCES public.schools(id) ON DELETE SET NULL;

-- Policy for school admins to view their students' activity
CREATE POLICY "School admins can view their school activity"
ON public.user_activity FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'school_admin')
  AND school_id = public.get_user_school_id(auth.uid())
);

-- Trigger to update schools updated_at
CREATE TRIGGER update_schools_updated_at
BEFORE UPDATE ON public.schools
FOR EACH ROW
EXECUTE FUNCTION public.update_assessment_updated_at();