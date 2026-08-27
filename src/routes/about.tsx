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
        
         <h1>About Promptify</h1>

  <p>
    <strong>Promptify</strong> is a free online platform dedicated to helping
    creators discover, explore, and use creative prompts for AI image generation.
    Our goal is to make useful prompt ideas easier to find, understand, and
    adapt for different creative projects.
  </p>

  <p>
    AI image generation is developing rapidly, but finding useful prompts and
    creative ideas can sometimes be difficult. Promptify brings prompt
    inspiration together in an organized and easy-to-use environment, allowing
    visitors to explore different visual concepts and discover new ways to
    experiment with AI-powered creativity.
  </p>

  <h2>What Promptify Provides</h2>

  <p>
    Promptify features a curated collection of AI image prompts and visual
    inspiration covering a variety of creative concepts, styles, subjects, and
    ideas.
  </p>

  <p>
    Depending on the content available on the platform, visitors may find:
  </p>

  <ul>
    <li>Creative AI image prompts</li>
    <li>Visual examples for inspiration</li>
    <li>Prompts organized into relevant categories</li>
    <li>Copyable prompt text</li>
    <li>Creative ideas that can be adapted for different projects</li>
  </ul>

  <h2>Our Mission</h2>

  <p>
    Our mission is to make AI creativity more accessible by providing a simple
    place where people can discover useful prompt ideas without unnecessary
    complexity.
  </p>

  <p>
    We aim to continually improve the quality, organization, and usefulness of
    the content available on Promptify while creating a straightforward and
    enjoyable experience for our visitors.
  </p>

  <h2>How Promptify Works</h2>

  <p>
    Visitors can browse the available content, explore prompts that interest
    them, and copy prompt text for experimentation with compatible AI image
    generation services.
  </p>

  <p>
    Promptify is primarily a <strong>prompt discovery and inspiration
    platform</strong>. Unless specifically stated otherwise, Promptify does not
    generate the final AI images itself. The results produced from a prompt can
    vary depending on the AI service, model, settings, and other parameters
    selected by the user.
  </p>

  <h2>Content Quality</h2>

  <p>
    We strive to keep Promptify useful, relevant, and easy to navigate.
    Content may be reviewed, organized, updated, or removed when necessary to
    maintain the quality and integrity of the platform.
  </p>

  <p>
    We also aim to provide clear information about the content presented on the
    website and encourage visitors to use prompts as starting points for their
    own creative work.
  </p>

  <h2>User-Submitted Content</h2>

  <p>
    Where user submissions are enabled, contributors may submit prompts, images,
    or other creative material for consideration. Submitted material may be
    reviewed before publication.
  </p>

  <p>
    Contributors are responsible for ensuring that material they submit does
    not unlawfully infringe the copyright, trademark, privacy, or other rights
    of another person or organization.
  </p>

  <h2>Copyright and Intellectual Property</h2>

  <p>
    Promptify respects the rights of creators, artists, copyright holders, and
    other content owners. The appearance of an image, trademark, or other
    material on the website does not automatically mean that Promptify claims
    ownership of that material.
  </p>

  <p>
    If you believe that material available on Promptify infringes your
    copyright or other rights, please contact us with sufficient information
    to identify the material and evaluate your request.
  </p>

  <h2>Third-Party AI Services</h2>

  <p>
    Prompts available on Promptify may be used with third-party AI image
    generation services. These services are independent from Promptify and may
    have their own terms, policies, pricing, features, and content
    requirements.
  </p>

  <p>
    Promptify does not guarantee that a particular prompt will produce identical
    results across different AI services or models.
  </p>

  <h2>Our Commitment to Visitors</h2>

  <p>
    We are committed to maintaining a transparent, useful, and user-friendly
    website. We continuously work to improve the platform, organize its content,
    and provide visitors with useful creative resources.
  </p>

  <p>
    If you have feedback that could help us improve Promptify, we welcome you
    to get in touch.
  </p>

  <h2>Contact Promptify</h2>

  <p>
    For general questions, suggestions, copyright concerns, content issues, or
    business inquiries, please contact us through our Contact page or email us
    directly.
  </p>

  <p>
    <strong>Email:</strong>
    <a href="mailto:muaazbwn@gmail.com">muaazbwn@gmail.com</a>
  </p>

  <p>
    <strong>Last updated:</strong> August 27, 2026
  </p>

</section>
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
