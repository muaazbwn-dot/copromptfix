import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import type { Prompt, PromptStatus } from "@/lib/promptify";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Moderation Dashboard — Promptify" },
      {
        name: "description",
        content: "Review, approve, feature or reject community prompt submissions on Promptify.",
      },
      { property: "og:title", content: "Moderation Dashboard — Promptify" },
      { property: "og:description", content: "Review community prompt submissions." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const SELECT =
  "id,slug,title,prompt_text,image_url,category,tags,creator,views,copies,status,featured,created_at";

function Admin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filter, setFilter] = useState<PromptStatus>("pending");

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate({ to: "/auth" });
        return;
      }
      const { data: allowed } = await supabase.rpc("claim_admin");
      if (!active) return;
      setIsAdmin(Boolean(allowed));
      setReady(true);
    })();
    return () => {
      active = false;
    };
  }, [navigate]);

  const { data: prompts = [], isLoading } = useQuery({
    queryKey: ["admin-prompts", filter],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prompts")
        .select(SELECT)
        .eq("status", filter)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Prompt[];
    },
  });

  async function update(id: string, patch: Record<string, unknown>) {
    const { error } = await supabase.from("prompts").update(patch).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Updated");
    void queryClient.invalidateQueries({ queryKey: ["admin-prompts"] });
  }

  async function remove(id: string) {
    const { error } = await supabase.from("prompts").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Deleted");
    void queryClient.invalidateQueries({ queryKey: ["admin-prompts"] });
  }

  if (!ready) {
    return <p className="px-6 py-24 text-center text-sm text-muted-foreground">Checking access…</p>;
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-2xl font-semibold">No moderator access</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This account isn't a moderator. Ask an existing admin for access.
        </p>
        <button
          type="button"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
          className="mt-6 rounded-full border border-border px-5 py-2.5 text-sm"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold">Moderation</h1>
        <button
          type="button"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
          className="rounded-full border border-border px-4 py-2 text-xs"
        >
          Sign out
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["pending", "approved", "rejected"] as PromptStatus[]).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`rounded-full px-4 py-2 text-xs capitalize ${
              filter === status
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="mt-10 text-sm text-muted-foreground">Loading…</p>
      ) : prompts.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          Nothing {filter} right now.
        </p>
      ) : (
        <div className="mt-8 grid gap-4">
          {prompts.map((prompt) => (
            <article
              key={prompt.id}
              className="grid gap-4 rounded-2xl surface-card p-4 sm:grid-cols-[160px_1fr]"
            >
              <img
                src={prompt.image_url}
                alt={prompt.title}
                className="h-40 w-full rounded-xl object-cover sm:h-full"
                loading="lazy"
              />
              <div>
                <h2 className="text-sm font-semibold">{prompt.title}</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {prompt.category} · {prompt.tags.join(", ") || "no tags"} ·{" "}
                  {prompt.creator ?? "anonymous"}
                </p>
                <p className="mt-3 line-clamp-4 text-xs leading-relaxed text-muted-foreground">
                  {prompt.prompt_text}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  {prompt.status !== "approved" ? (
                    <button
                      type="button"
                      onClick={() => update(prompt.id, { status: "approved" })}
                      className="rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground"
                    >
                      Approve
                    </button>
                  ) : null}
                  {prompt.status !== "rejected" ? (
                    <button
                      type="button"
                      onClick={() => update(prompt.id, { status: "rejected" })}
                      className="rounded-full border border-border px-4 py-2"
                    >
                      Reject
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => update(prompt.id, { featured: !prompt.featured })}
                    className="rounded-full border border-border px-4 py-2"
                  >
                    {prompt.featured ? "Unfeature" : "Feature"}
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(prompt.id)}
                    className="rounded-full border border-destructive/50 px-4 py-2 text-destructive"
                  >
                    Delete
                  </button>
                  {prompt.status === "approved" ? (
                    <Link
                      to="/prompt/$slug"
                      params={{ slug: prompt.slug }}
                      className="rounded-full border border-border px-4 py-2"
                    >
                      View
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
