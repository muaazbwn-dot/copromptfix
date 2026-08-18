import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Promptify" },
      {
        name: "description",
        content:
          "How Promptify handles submissions, analytics data and advertising cookies across the site.",
      },
      { property: "og:title", content: "Privacy Policy — Promptify" },
      {
        property: "og:description",
        content: "How Promptify handles data, analytics and advertising cookies.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">Privacy Policy</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Promptify can be browsed without an account. We do not ask for personal information to
          view or copy prompts.
        </p>
        <p>
          <strong className="text-foreground">Submissions.</strong> When you upload a prompt we
          store the image, prompt text, category, tags and the optional creator name you provide.
        </p>
        <p>
          <strong className="text-foreground">Analytics.</strong> We count anonymous page views
          and prompt copies to rank trending content. No personal profiles are built.
        </p>
        <p>
          <strong className="text-foreground">Advertising.</strong> Ad slots on the site may be
          served by third-party ad networks which can set their own cookies, subject to their own
          privacy policies.
        </p>
        <p>Questions? Email hello@promptify.app.</p>
      </div>
    </div>
  );
}
