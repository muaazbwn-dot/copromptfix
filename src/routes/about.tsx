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
       About Promptify
Promptify is a free online library designed to help people discover, explore, and use AI image prompts.
Our goal is simple: make high-quality AI image prompts easier to discover and easier to understand. Visitors can browse visual examples, view the prompts associated with them, copy prompts, and adapt them for use with the AI image-generation tools of their choice.
What We Do
Promptify focuses on prompt discovery and organization. We do not operate as an AI image-generation service. Instead, we provide a place where users can discover creative prompt ideas and experiment with them using their preferred AI tools.
Our content may include:
AI image prompts
Visual examples
Prompt categories and tags
Creative prompt ideas
Community-submitted content
Information intended to help users understand and adapt prompts
Community Contributions
Some content on Promptify may be submitted by users or members of our community.
Submitted content may be reviewed before publication to help maintain the quality and safety of the website. We may reject, edit, restrict, or remove content that violates our policies, applicable laws, or the rights of others.
Content and Copyright
Promptify respects intellectual-property rights. We do not claim ownership of images simply because they appear on our website.
If you believe that an image, prompt, or other material on Promptify infringes your copyright or other rights, please contact us with sufficient information for us to identify and review the material.
Our Mission
We want Promptify to be a useful and easy-to-navigate resource for creators, designers, AI enthusiasts, and anyone interested in experimenting with AI image prompts.
For questions, feedback, copyright concerns, or other inquiries, please visit our Contact page.
Last updated: August 27, 2026
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
