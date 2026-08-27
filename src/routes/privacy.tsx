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
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: August 27, 2026
      </p>

      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Promptify ("we," "us," or "our") operates this website. This
          Privacy Policy explains what information we collect, how we use
          it, and the choices you have. We are based in Pakistan. By using
          the site, you agree to the practices described here.
        </p>

        <p>
          Promptify can be browsed without an account. We do not ask for
          personal information to view or copy prompts.
        </p>

        <h2 className="text-foreground font-semibold text-base pt-2">
          Information We Collect
        </h2>

        <p>
          <strong className="text-foreground">Submissions.</strong> When you
          upload a prompt we store the image, prompt text, category, tags
          and the optional creator name you provide.
        </p>

        <p>
          <strong className="text-foreground">Analytics.</strong> We count
          anonymous page views and prompt copies to rank trending content.
          No personal profiles are built.
        </p>

        <p>
          <strong className="text-foreground">
            Automatically collected data.
          </strong>{" "}
          Like most websites, our servers and third-party tools may log
          technical information such as IP address, browser type, device
          type, referring pages and general usage data.
        </p>

        <h2 className="text-foreground font-semibold text-base pt-2">
          Advertising &amp; Cookies
        </h2>

        <p>
          <strong className="text-foreground">Advertising.</strong> Ad slots
          on the site may be served by third-party ad networks, including
          Google AdSense, which can set their own cookies, subject to their
          own privacy policies.
        </p>

        <p>
          Google and its partners may use cookies (including the DoubleClick
          cookie) to serve ads based on your visits to this site and other
          sites. You can opt out of personalized advertising by visiting{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Google Ads Settings
          </a>{" "}
          or the{" "}
          <a
            href="https://optout.aboutads.info"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Digital Advertising Alliance opt-out page
          </a>
          . Most browsers also let you refuse or delete cookies in their
          settings.
        </p>

        <h2 className="text-foreground font-semibold text-base pt-2">
          How We Use Information
        </h2>

        <p>
          We use the information above to operate and improve the site,
          rank trending prompts, serve relevant ads, respond to inquiries,
          and detect abuse or fraud.
        </p>

        <h2 className="text-foreground font-semibold text-base pt-2">
          Third-Party Services
        </h2>

        <p>
          We may rely on third-party services such as Google AdSense and
          analytics providers, each governed by their own privacy policy.
          See Google's policy{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            here
          </a>
          .
        </p>

        <h2 className="text-foreground font-semibold text-base pt-2">
          Children's Privacy
        </h2>

        <p>
          Promptify is not directed at children under 13, and we do not
          knowingly collect personal information from children under 13.
        </p>

        <h2 className="text-foreground font-semibold text-base pt-2">
          Data Retention &amp; Security
        </h2>

        <p>
          We retain data only as long as necessary for the purposes
          described above and take reasonable steps to protect it. No
          method of transmission over the internet is completely secure.
        </p>

        <h2 className="text-foreground font-semibold text-base pt-2">
          Changes to This Policy
        </h2>

        <p>
          We may update this Privacy Policy from time to time. Changes will
          be posted on this page with a revised "Last updated" date.
        </p>

        <h2 className="text-foreground font-semibold text-base pt-2">
          Contact
        </h2>

        <p>
          Questions? Email{" "}
          <a href="mailto:muaazbwn@gmail.com" className="underline">
            muaazbwn@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}