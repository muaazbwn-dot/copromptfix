import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Promptify — Support & Takedowns" },
      {
        name: "description",
        content:
          "Get in touch with the Promptify team about submissions, takedown requests, advertising or general questions.",
      },
      { property: "og:title", content: "Contact Promptify" },
      {
        property: "og:description",
        content: "Reach the Promptify team about submissions, takedowns or advertising.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">Contact</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Questions, feedback, advertising enquiries or takedown requests — email us at{" "}
          <a href="mailto: muaazbwn@gmail.com" className="text-primary hover:underline">
            muaazbwn@gmail.com
          </a>
          .
        </p>
        <p>
          If you believe a prompt or image on Promptify infringes your rights, include the page
          URL and proof of ownership and we'll review it within a few business days.
        </p>
      </div>
    </div>
  );
}
