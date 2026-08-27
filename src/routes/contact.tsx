import { createFileRoute } from "@tanstack/react-router";
import { Mail, ShieldAlert, Clock, Briefcase } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Promptify" },
      {
        name: "description",
        content:
          "Get in touch with the Promptify team for questions, feedback, content removal requests or partnerships.",
      },
      { property: "og:title", content: "Contact — Promptify" },
      {
        property: "og:description",
        content:
          "Get in touch with the Promptify team for questions, feedback, content removal requests or partnerships.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const CONTACT_EMAIL = "muaazbwn@gmail.com";

const cards = [
  {
    icon: Mail,
    title: "General questions",
    description:
      "Feedback, feature requests, or anything else on your mind — we read every email.",
    action: "Email us",
    href: `mailto:${CONTACT_EMAIL}?subject=Promptify%20-%20General%20Inquiry`,
  },
  {
    icon: ShieldAlert,
    title: "Content removal",
    description:
      "Believe a prompt or image infringes your rights? Send the content's location and details.",
    action: "Report content",
    href: `mailto:${CONTACT_EMAIL}?subject=Promptify%20-%20Content%20Removal%20Request`,
  },
  {
    icon: Briefcase,
    title: "Partnerships & advertising",
    description:
      "Interested in advertising on Promptify or exploring a partnership? Let's talk.",
    action: "Get in touch",
    href: `mailto:${CONTACT_EMAIL}?subject=Promptify%20-%20Business%20Inquiry`,
  },
];

function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">
          Contact
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Have a question, found a bug, or want to submit feedback about a
          prompt on Promptify? Pick the option below that fits best, or just
          email us directly.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          We typically respond within a few business days
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {cards.map(({ icon: Icon, title, description, action, href }) => (
          <a
            key={title}
            href={href}
            className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/20 hover:bg-muted/40"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
              <Icon className="h-4 w-4 text-foreground" />
            </div>
            <h2 className="mt-4 text-sm font-semibold text-foreground">
              {title}
            </h2>
            <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
            <span className="mt-4 text-xs font-medium text-foreground underline-offset-4 group-hover:underline">
              {action} →
            </span>
          </a>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-border bg-muted/30 p-5">
        <p className="text-sm text-muted-foreground">
          Prefer to write directly?{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-foreground underline underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </div>
  );
}