-- Create table to store student assessment sessions (works for anonymous and logged-in users)
CREATE TABLE public.assessment_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  device_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- RIASEC scores
  riasec_scores JSONB DEFAULT '{}',
  top_riasec_codes TEXT[] DEFAULT '{}',
  
  -- Values scores  
  value_scores JSONB DEFAULT '{}',
  higher_order_scores JSONB DEFAULT '{}',
  
  -- Big Five scores
  big_five_scores JSONB DEFAULT '{}',
  
  -- Raw answers for each section
  riasec_answers JSONB DEFAULT '{}',
  values_answers JSONB DEFAULT '{}',
  big_five_answers JSONB DEFAULT '{}',
  
  -- Results
  major_results JSONB DEFAULT '[]',
  career_results JSONB DEFAULT '[]',
  
  -- Current progress
  current_step TEXT DEFAULT 'welcome',
  
  CONSTRAINT valid_device_or_user CHECK (device_id IS NOT NULL OR user_id IS NOT NULL)
);

-- Enable Row Level Security
ALTER TABLE public.assessment_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own sessions (by user_id or device_id)
CREATE POLICY "Users can view own sessions"
ON public.assessment_sessions
FOR SELECT
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid())
  OR
  (auth.uid() IS NULL AND device_id IS NOT NULL)
);

-- Policy: Anyone can insert a session (anonymous or authenticated)
CREATE POLICY "Anyone can create sessions"
ON public.assessment_sessions
FOR INSERT
WITH CHECK (
  (auth.uid() IS NOT NULL AND user_id = auth.uid())
  OR
  (auth.uid() IS NULL AND user_id IS NULL AND device_id IS NOT NULL)
);

-- Policy: Users can update their own sessions
CREATE POLICY "Users can update own sessions"
ON public.assessment_sessions
FOR UPDATE
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid())
  OR
  (auth.uid() IS NULL AND device_id IS NOT NULL)
);

-- Policy: Authenticated users can claim anonymous sessions
CREATE POLICY "Users can claim anonymous sessions"
ON public.assessment_sessions
FOR UPDATE
USING (user_id IS NULL AND device_id IS NOT NULL AND auth.uid() IS NOT NULL)
WITH CHECK (user_id = auth.uid());

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_assessment_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_assessment_sessions_updated_at
BEFORE UPDATE ON public.assessment_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_assessment_updated_at();