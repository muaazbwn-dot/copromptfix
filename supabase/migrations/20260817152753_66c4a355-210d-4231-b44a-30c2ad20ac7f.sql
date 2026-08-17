
CREATE TYPE public.app_role AS ENUM ('admin','moderator','user');

CREATE TABLE public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE TABLE public.prompts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  prompt_text text not null,
  image_url text not null,
  category text not null,
  tags text[] not null default '{}',
  creator text,
  views integer not null default 0,
  copies integer not null default 0,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
CREATE INDEX prompts_status_created_idx ON public.prompts (status, created_at DESC);
CREATE INDEX prompts_category_idx ON public.prompts (category);

GRANT SELECT, INSERT ON public.prompts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.prompts TO authenticated;
GRANT ALL ON public.prompts TO service_role;
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved prompts" ON public.prompts
FOR SELECT TO anon, authenticated USING (status = 'approved');

CREATE POLICY "Admins can view all prompts" ON public.prompts
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can submit a pending prompt" ON public.prompts
FOR INSERT TO anon, authenticated WITH CHECK (status = 'pending' AND featured = false AND views = 0 AND copies = 0);

CREATE POLICY "Admins can update prompts" ON public.prompts
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete prompts" ON public.prompts
FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER prompts_updated_at BEFORE UPDATE ON public.prompts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.increment_prompt_metric(_slug text, _metric text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF _metric = 'views' THEN
    UPDATE public.prompts SET views = views + 1 WHERE slug = _slug AND status = 'approved';
  ELSIF _metric = 'copies' THEN
    UPDATE public.prompts SET copies = copies + 1 WHERE slug = _slug AND status = 'approved';
  END IF;
END; $$;
GRANT EXECUTE ON FUNCTION public.increment_prompt_metric(text, text) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.claim_admin()
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE uid uuid := auth.uid();
BEGIN
  IF uid IS NULL THEN RETURN false; END IF;
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    RETURN public.has_role(uid, 'admin');
  END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (uid, 'admin') ON CONFLICT DO NOTHING;
  RETURN true;
END; $$;
GRANT EXECUTE ON FUNCTION public.claim_admin() TO authenticated;

INSERT INTO public.prompts (slug, title, prompt_text, image_url, category, tags, creator, status, featured, views, copies) VALUES
('cinematic-neon-car-photography','Cinematic Neon Car Photography','Cinematic photograph of a vintage sports car parked on a rain-soaked neon-lit city street at night, deep reflections on wet asphalt, volumetric fog, anamorphic lens flare, shot on 35mm, shallow depth of field, moody teal and magenta color grade, ultra detailed, 8k','/images/p-car.jpg','Cars','{"cinematic","neon","night","automotive"}','Studio Vela','approved',true,1420,318),
('editorial-freckled-portrait','Editorial Freckled Portrait','Studio portrait of a woman with natural freckles, soft rim lighting from camera left, deep black seamless background, editorial fashion photography, 85mm f/1.4, crisp skin texture, subtle warm highlights, high-end retouch, photorealistic','/images/p-portrait.jpg','Portrait','{"portrait","studio","fashion","realistic"}','Mara Lindqvist','approved',true,980,254),
('anime-rooftop-sunset','Anime Rooftop Sunset','Anime key visual of a girl standing on a school rooftop at golden hour, wind lifting her hair, sprawling city skyline below, dramatic pink and orange cloudscape, cel shaded, crisp linework, vibrant saturated palette, 90s anime film aesthetic','/images/p-anime.jpg','Anime','{"anime","sunset","cityscape","key visual"}','Kenta R.','approved',true,2310,540),
('floating-islands-fantasy-vista','Floating Islands Fantasy Vista','Epic fantasy landscape of floating islands with cascading waterfalls suspended above misty mountain ranges, warm golden light breaking through clouds, painterly concept art, atmospheric perspective, matte painting, highly detailed','/images/p-fantasy.jpg','Fantasy','{"fantasy","landscape","concept art","matte painting"}','Aria Wolde','approved',false,760,131),
('minimal-perfume-product-shot','Minimal Perfume Product Shot','Minimalist commercial product photography of a matte black perfume bottle resting on a travertine pedestal, warm beige seamless backdrop, soft large key light with gentle falloff, subtle contact shadow, luxury advertising aesthetic, ultra sharp','/images/p-product.jpg','Product Photography','{"product","minimal","studio","commercial"}','Loom Studio','approved',true,640,187),
('sci-fi-megacity-at-dusk','Sci-Fi Megacity at Dusk','Futuristic sci-fi megacity at dusk seen from a high balcony, flying vehicles weaving between towers, giant holographic advertisements, layered atmospheric haze, orange and cyan contrast, cinematic wide-angle establishing shot, blade runner inspired','/images/p-scifi.jpg','Sci-Fi','{"scifi","cyberpunk","cityscape","cinematic"}','Nova Kirk','approved',false,1180,296),
('misty-pine-forest-sunrise','Misty Pine Forest Sunrise','Misty pine forest at sunrise, dense volumetric god rays cutting through the trunks, dew on the undergrowth, cool blue shadows against warm light, serene nature photography, 24mm, ultra detailed, natural color grade','/images/p-nature.jpg','Nature','{"nature","forest","sunrise","landscape"}','Elin Haas','approved',false,830,142),
('brutalist-concrete-curves','Brutalist Concrete Curves','Brutalist concrete architecture with a sweeping curved ramp, hard midday sunlight carving geometric shadows, minimal composition, negative space, architectural photography, tilt-shift lens, muted warm tones','/images/p-arch.jpg','Architecture','{"architecture","brutalist","minimal","shadows"}','Studio Arto','approved',false,510,98);
