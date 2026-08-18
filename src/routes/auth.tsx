import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Moderator Sign In — Promptify" },
      {
        name: "description",
        content: "Sign in to the Promptify moderation dashboard to review prompt submissions.",
      },
      { property: "og:title", content: "Moderator Sign In — Promptify" },
      { property: "og:description", content: "Sign in to the Promptify moderation dashboard." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Auth,
});

const inputClass =
  "h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/60";

function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    try {
      const { error } =
        mode === "signin"
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({
              email,
              password,
              options: { emailRedirectTo: `${window.location.origin}/admin` },
            });
      if (error) throw error;
      toast.success(mode === "signin" ? "Signed in" : "Account created");
      navigate({ to: "/admin" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20 sm:px-6">
      <h1 className="font-display text-2xl font-semibold">Moderator access</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Sign in to review and publish prompt submissions.
      </p>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          aria-label="Email"
          className={inputClass}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          aria-label="Password"
          className={inputClass}
          required
          minLength={6}
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {pending ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>
      <button
        type="button"
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        className="mt-4 text-xs text-muted-foreground hover:text-foreground"
      >
        {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
      </button>
    </div>
  );
}
