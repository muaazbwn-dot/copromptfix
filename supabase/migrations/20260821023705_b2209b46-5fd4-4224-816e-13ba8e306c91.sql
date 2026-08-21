DROP POLICY IF EXISTS "Anyone can submit a pending prompt" ON public.prompts;
DROP POLICY IF EXISTS "Admins can view all prompts" ON public.prompts;
DROP POLICY IF EXISTS "Admins can update prompts" ON public.prompts;
DROP POLICY IF EXISTS "Admins can delete prompts" ON public.prompts;
REVOKE INSERT, UPDATE, DELETE ON public.prompts FROM anon, authenticated;