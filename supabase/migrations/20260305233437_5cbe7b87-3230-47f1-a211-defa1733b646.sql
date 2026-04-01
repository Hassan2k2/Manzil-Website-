
-- Enable RLS on pakistan_programs and allow public read access
ALTER TABLE public.pakistan_programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read pakistan programs"
ON public.pakistan_programs FOR SELECT
TO anon, authenticated
USING (true);
