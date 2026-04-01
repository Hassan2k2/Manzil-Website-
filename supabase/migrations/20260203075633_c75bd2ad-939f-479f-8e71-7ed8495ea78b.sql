-- Create table to store university matches when students explore Global Pathways
CREATE TABLE public.university_matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  school_id UUID REFERENCES public.schools(id),
  university_name TEXT NOT NULL,
  university_country TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('Reach', 'Match', 'Safety')),
  score INTEGER NOT NULL,
  preferences JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.university_matches ENABLE ROW LEVEL SECURITY;

-- Users can insert their own matches
CREATE POLICY "Users can insert own matches"
ON public.university_matches
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can view their own matches
CREATE POLICY "Users can view own matches"
ON public.university_matches
FOR SELECT
USING (auth.uid() = user_id);

-- School admins can view their school's matches
CREATE POLICY "School admins can view school matches"
ON public.university_matches
FOR SELECT
USING (
  has_role(auth.uid(), 'school_admin') 
  AND school_id = get_user_school_id(auth.uid())
);

-- Create index for efficient school queries
CREATE INDEX idx_university_matches_school ON public.university_matches(school_id);
CREATE INDEX idx_university_matches_user ON public.university_matches(user_id);