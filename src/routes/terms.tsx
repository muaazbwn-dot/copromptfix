import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Promptify" },
      {
        name: "description",
        content:
          "The rules for browsing, copying and submitting AI image prompts on Promptify.",
      },
      { property: "og:title", content: "Terms of Service — Promptify" },
      {
        property: "og:description",
        content: "Rules for browsing, copying and submitting prompts on Promptify.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">Terms of Service</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          By using Promptify you agree to these terms. Prompts published here may be copied and
          used freely, but the images remain the property of their creators.
        </p>
        <p>
          When submitting, you confirm you have the right to share the image and prompt, and that
          the content is safe for work and free of hateful, explicit or illegal material.
        </p>
        <p>
          We review every submission and may reject or remove any content at our discretion. The
          service is provided as-is, without warranties.
        </p>
      </div>
    </div>
  );
}
