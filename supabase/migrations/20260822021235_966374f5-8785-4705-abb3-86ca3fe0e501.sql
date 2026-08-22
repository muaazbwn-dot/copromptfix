ALTER TABLE public.prompts
  ADD COLUMN IF NOT EXISTS content_type text NOT NULL DEFAULT 'image',
  ADD COLUMN IF NOT EXISTS media_url text,
  ADD COLUMN IF NOT EXISTS thumbnail_url text;

UPDATE public.prompts SET media_url = image_url WHERE media_url IS NULL;

ALTER TABLE public.prompts
  ADD CONSTRAINT prompts_content_type_check CHECK (content_type IN ('image','video'));

CREATE INDEX IF NOT EXISTS prompts_content_type_idx ON public.prompts (content_type);