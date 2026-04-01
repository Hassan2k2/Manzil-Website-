
-- Create profiles table for storing user display info and school association
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  school_id uuid REFERENCES public.schools(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS: Users can view own profile
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (id = auth.uid());

-- RLS: Users can update own profile
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (id = auth.uid());

-- RLS: Users can insert own profile
CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());

-- RLS: School admins can view profiles of students in their school
CREATE POLICY "School admins can view school profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'school_admin')
  AND school_id = public.get_user_school_id(auth.uid())
);

-- Function to join school by code (SECURITY DEFINER to bypass RLS on user_roles)
CREATE OR REPLACE FUNCTION public.join_school_by_code(p_school_code text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_school_id uuid;
  v_school_name text;
  v_user_id uuid;
  v_existing_school_id uuid;
BEGIN
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Not authenticated');
  END IF;

  -- Find school by code (case-insensitive)
  SELECT id, name INTO v_school_id, v_school_name
  FROM public.schools
  WHERE upper(code) = upper(trim(p_school_code));

  IF v_school_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid school code. Please check with your school.');
  END IF;

  -- Check if user already linked to a school via profile
  SELECT school_id INTO v_existing_school_id
  FROM public.profiles
  WHERE id = v_user_id AND school_id IS NOT NULL;

  IF v_existing_school_id IS NOT NULL THEN
    IF v_existing_school_id = v_school_id THEN
      RETURN jsonb_build_object('success', true, 'school_name', v_school_name, 'already_linked', true);
    ELSE
      RETURN jsonb_build_object('success', false, 'error', 'You are already linked to a school. Contact support to change.');
    END IF;
  END IF;

  -- Update or create profile with school_id
  INSERT INTO public.profiles (id, school_id, updated_at)
  VALUES (v_user_id, v_school_id, now())
  ON CONFLICT (id) DO UPDATE SET school_id = v_school_id, updated_at = now();

  -- Upsert student role with school_id
  INSERT INTO public.user_roles (user_id, role, school_id)
  VALUES (v_user_id, 'student', v_school_id)
  ON CONFLICT DO NOTHING;

  -- Update existing student role's school_id
  UPDATE public.user_roles
  SET school_id = v_school_id
  WHERE user_id = v_user_id AND role = 'student';

  -- Link existing data to school
  UPDATE public.assessment_sessions
  SET school_id = v_school_id
  WHERE user_id = v_user_id AND school_id IS NULL;

  UPDATE public.user_activity
  SET school_id = v_school_id
  WHERE user_id = v_user_id AND school_id IS NULL;

  UPDATE public.university_matches
  SET school_id = v_school_id
  WHERE user_id = v_user_id AND school_id IS NULL;

  RETURN jsonb_build_object('success', true, 'school_name', v_school_name, 'school_id', v_school_id::text);
END;
$$;

-- Function for school admins to get student list with aggregated data
CREATE OR REPLACE FUNCTION public.get_school_students(p_school_id uuid)
RETURNS TABLE (
  user_id uuid,
  email text,
  full_name text,
  joined_at timestamptz,
  assessments_completed bigint,
  assessments_in_progress bigint,
  university_matches_count bigint,
  last_activity timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify caller is school admin for this school
  IF NOT (public.has_role(auth.uid(), 'school_admin') AND public.get_user_school_id(auth.uid()) = p_school_id) THEN
    RETURN;
  END IF;

  RETURN QUERY
  SELECT
    p.id AS user_id,
    p.email,
    p.full_name,
    p.created_at AS joined_at,
    COALESCE((SELECT count(*) FROM assessment_sessions s WHERE s.user_id = p.id AND s.school_id = p_school_id AND s.completed_at IS NOT NULL), 0) AS assessments_completed,
    COALESCE((SELECT count(*) FROM assessment_sessions s WHERE s.user_id = p.id AND s.school_id = p_school_id AND s.completed_at IS NULL), 0) AS assessments_in_progress,
    COALESCE((SELECT count(*) FROM university_matches um WHERE um.user_id = p.id AND um.school_id = p_school_id), 0) AS university_matches_count,
    COALESCE(
      (SELECT max(s.updated_at) FROM assessment_sessions s WHERE s.user_id = p.id AND s.school_id = p_school_id),
      p.created_at
    ) AS last_activity
  FROM public.profiles p
  WHERE p.school_id = p_school_id
  ORDER BY p.created_at DESC;
END;
$$;

-- Function for student drill-down data
CREATE OR REPLACE FUNCTION public.get_student_details(p_student_id uuid, p_school_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_profile jsonb;
  v_sessions jsonb;
  v_activity jsonb;
  v_matches jsonb;
BEGIN
  -- Verify caller is school admin for this school
  IF NOT (public.has_role(auth.uid(), 'school_admin') AND public.get_user_school_id(auth.uid()) = p_school_id) THEN
    RETURN jsonb_build_object('error', 'Unauthorized');
  END IF;

  -- Verify student belongs to this school
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = p_student_id AND school_id = p_school_id) THEN
    RETURN jsonb_build_object('error', 'Student not found in your school');
  END IF;

  -- Get profile
  SELECT jsonb_build_object('email', p.email, 'full_name', p.full_name, 'joined_at', p.created_at)
  INTO v_profile
  FROM public.profiles p WHERE p.id = p_student_id;

  -- Get assessment sessions
  SELECT COALESCE(jsonb_agg(jsonb_build_object(
    'id', s.id,
    'current_step', s.current_step,
    'riasec_scores', s.riasec_scores,
    'top_riasec_codes', s.top_riasec_codes,
    'big_five_scores', s.big_five_scores,
    'major_results', s.major_results,
    'career_results', s.career_results,
    'created_at', s.created_at,
    'completed_at', s.completed_at
  ) ORDER BY s.created_at DESC), '[]'::jsonb)
  INTO v_sessions
  FROM assessment_sessions s
  WHERE s.user_id = p_student_id AND s.school_id = p_school_id;

  -- Get user activity (predictions)
  SELECT COALESCE(jsonb_agg(jsonb_build_object(
    'id', a.id,
    'prediction', a.prediction,
    'created_at', a.created_at
  ) ORDER BY a.created_at DESC), '[]'::jsonb)
  INTO v_activity
  FROM user_activity a
  WHERE a.user_id = p_student_id AND a.school_id = p_school_id;

  -- Get university matches
  SELECT COALESCE(jsonb_agg(jsonb_build_object(
    'university_name', um.university_name,
    'university_country', um.university_country,
    'score', um.score,
    'tier', um.tier,
    'created_at', um.created_at
  ) ORDER BY um.score DESC), '[]'::jsonb)
  INTO v_matches
  FROM university_matches um
  WHERE um.user_id = p_student_id AND um.school_id = p_school_id;

  RETURN jsonb_build_object(
    'profile', v_profile,
    'sessions', v_sessions,
    'activity', v_activity,
    'university_matches', v_matches
  );
END;
$$;
