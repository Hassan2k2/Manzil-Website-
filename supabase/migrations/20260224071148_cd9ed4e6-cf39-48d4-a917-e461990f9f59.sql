
-- Recreate the trigger function to use extensions.gen_random_bytes explicitly
CREATE OR REPLACE FUNCTION public.generate_session_secret()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $function$
BEGIN
  IF NEW.user_id IS NULL AND NEW.device_id IS NOT NULL AND NEW.session_secret IS NULL THEN
    NEW.session_secret := encode(extensions.gen_random_bytes(32), 'hex');
  END IF;
  RETURN NEW;
END;
$function$;

-- Ensure the trigger is attached
DROP TRIGGER IF EXISTS trg_generate_session_secret ON public.assessment_sessions;
CREATE TRIGGER trg_generate_session_secret
  BEFORE INSERT ON public.assessment_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_session_secret();
