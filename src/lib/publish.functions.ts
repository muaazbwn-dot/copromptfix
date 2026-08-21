import { createServerFn } from "@tanstack/react-start";

export type PublishInput = {
  pin: string;
  title: string;
  prompt_text: string;
  category: string;
  tags: string[];
  creator?: string | undefined;
  imageUrl?: string | undefined;
  imageBase64?: string | undefined;
  imageName?: string | undefined;
  imageType?: string | undefined;
};

export const publishPrompt = createServerFn({ method: "POST" })
  .inputValidator((data: PublishInput) => data)
  .handler(async ({ data }) => {
    const expected = process.env["OWNER_PIN"];
    if (!expected || data.pin !== expected) {
      return { ok: false as const, error: "Incorrect PIN. The prompt was not published." };
    }

    const title = data.title.trim();
    const promptText = data.prompt_text.trim();
    const category = data.category.trim();
    if (!title || !promptText || !category) {
      return { ok: false as const, error: "Title, prompt text and category are required." };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let imageUrl = data.imageUrl?.trim() ?? "";

    if (data.imageBase64) {
      const ext = (data.imageName?.split(".").pop() ?? "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
      const path = `${crypto.randomUUID()}.${ext || "jpg"}`;
      const binary = Uint8Array.from(atob(data.imageBase64), (char) => char.charCodeAt(0));
      const { error: uploadError } = await supabaseAdmin.storage
        .from("prompt-images")
        .upload(path, binary, {
          cacheControl: "31536000",
          upsert: false,
          contentType: data.imageType || "image/jpeg",
        });
      if (uploadError) return { ok: false as const, error: uploadError.message };
      imageUrl = `/api/public/image/${path}`;
    }

    if (!imageUrl) {
      return { ok: false as const, error: "An image file or image URL is required." };
    }

    const base =
      title
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 70) || "prompt";
    const slug = `${base}-${Math.random().toString(36).slice(2, 7)}`;

    const { error } = await supabaseAdmin.from("prompts").insert({
      slug,
      title,
      prompt_text: promptText,
      image_url: imageUrl,
      category,
      tags: data.tags.slice(0, 10),
      creator: data.creator?.trim() || null,
      status: "approved",
      featured: false,
      views: 0,
      copies: 0,
    });
    if (error) return { ok: false as const, error: error.message };

    return { ok: true as const, slug };
  });
