import { supabase } from "@/integrations/supabase/client";

export type PromptStatus = "pending" | "approved" | "rejected";

export type Prompt = {
  id: string;
  slug: string;
  title: string;
  prompt_text: string;
  image_url: string;
  category: string;
  tags: string[];
  creator: string | null;
  views: number;
  copies: number;
  status: PromptStatus;
  featured: boolean;
  created_at: string;
};

export const CATEGORIES = [
  "Realistic",
  "Anime",
  "Cinematic",
  "Fantasy",
  "Portrait",
  "Nature",
  "Architecture",
  "Cars",
  "Animals",
  "Fashion",
  "Product Photography",
  "3D",
  "Sci-Fi",
  "Wallpapers",
  "Illustration",
] as const;

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 70);
}

export function categorySlug(category: string) {
  return slugify(category);
}

export function categoryFromSlug(slug: string) {
  return CATEGORIES.find((category) => categorySlug(category) === slug);
}

const SELECT =
  "id,slug,title,prompt_text,image_url,category,tags,creator,views,copies,status,featured,created_at";

export type ListOptions = {
  search?: string | undefined;
  category?: string | undefined;
  sort?: "latest" | "trending" | "featured" | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
};

export async function listPrompts(options: ListOptions = {}): Promise<Prompt[]> {
  const { search, category, sort = "latest", limit = 60, offset = 0 } = options;
  let query = supabase.from("prompts").select(SELECT).eq("status", "approved");

  if (category) query = query.eq("category", category);
  if (sort === "featured") query = query.eq("featured", true);

  if (search && search.trim()) {
    const term = search.trim().replace(/[%,()]/g, " ");
    query = query.or(
      `title.ilike.%${term}%,prompt_text.ilike.%${term}%,category.ilike.%${term}%,tags.cs.{${term}}`,
    );
  }

  query =
    sort === "trending"
      ? query.order("copies", { ascending: false }).order("views", { ascending: false })
      : query.order("created_at", { ascending: false });

  const { data, error } = await query.range(offset, offset + limit - 1);
  if (error) throw error;
  return (data ?? []) as Prompt[];
}


export async function getPromptBySlug(slug: string): Promise<Prompt | null> {
  const { data, error } = await supabase
    .from("prompts")
    .select(SELECT)
    .eq("slug", slug)
    .eq("status", "approved")
    .maybeSingle();
  if (error) throw error;
  return (data as Prompt | null) ?? null;
}

export async function getRelatedPrompts(prompt: Prompt): Promise<Prompt[]> {
  const { data } = await supabase
    .from("prompts")
    .select(SELECT)
    .eq("status", "approved")
    .eq("category", prompt.category)
    .neq("id", prompt.id)
    .order("views", { ascending: false })
    .limit(6);
  return (data ?? []) as Prompt[];
}

export async function trackMetric(slug: string, metric: "views" | "copies") {
  await supabase.rpc("increment_prompt_metric", { _slug: slug, _metric: metric });
}

export function formatCount(value: number) {
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(value);
}
