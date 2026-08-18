import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Promptify — The AI Image Prompt Library" },
      {
        name: "description",
        content:
          "Promptify is a free, community-driven library of AI image prompts. Browse the picture, copy the prompt, create your own.",
      },
      { property: "og:title", content: "About Promptify" },
      {
        property: "og:description",
        content: "A free, community-driven library of AI image prompts.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">About Promptify</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Promptify is a free library of AI image prompts. Every image you see here is paired
          with the exact prompt that produced it, so you can copy it, tweak it and use it in the
          image generator of your choice.
        </p>
        <p>
          We don't generate or edit images. Promptify is purely a discovery experience: browse,
          click, read the prompt, copy it.
        </p>
        <p>
          Everything is community-submitted and reviewed by a moderator before publishing, so the
          gallery stays high quality and safe for work.
        </p>
      </div>
      <Link
        to="/explore"
        className="mt-8 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        Start exploring
      </Link>
    </div>
  );
}
