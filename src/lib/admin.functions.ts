import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const SELECT =
  "id,slug,title,prompt_text,image_url,category,tags,creator,views,copies,status,featured,created_at";

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Not authorized: this account is not a moderator.");
}

export const listSubmissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { status: "pending" | "approved" | "rejected" }) => data)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("prompts")
      .select(SELECT)
      .eq("status", data.status)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const updateSubmission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; status?: string; featured?: boolean }) => data)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const patch: { status?: string; featured?: boolean } = {};
    if (data.status !== undefined) patch.status = data.status;
    if (data.featured !== undefined) patch.featured = data.featured;
    const { error } = await supabaseAdmin.from("prompts").update(patch).eq("id", data.id);

    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteSubmission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("prompts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
