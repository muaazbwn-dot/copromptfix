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
      <p><strong>Terms of Service</strong><br>
Effective date: August 27, 2026</p>

<p>Welcome to Promptify. By accessing or using the Promptify website, you agree to these Terms of Service. If you do not agree with these terms, please do not use the website.</p>

<p><strong>1. About Promptify</strong><br>
Promptify is an online platform for discovering and sharing AI image prompts and related creative content. No account or login is required to browse or copy prompts on Promptify.<br>
Promptify does not guarantee that a particular prompt will produce the same result across different AI image-generation tools. Results depend on the AI tool, model, settings, and other factors used by the visitor.</p>

<p><strong>2. Eligibility</strong><br>
By using Promptify, you confirm that you are at least 13 years old, or the minimum age required in your country to use online services without parental consent. If you are under 18, you should only use Promptify with the involvement of a parent or guardian.</p>

<p><strong>3. Using Promptify</strong><br>
You may use Promptify for lawful purposes and in accordance with these Terms.<br>
You must not:</p>
<p>
Use the website for unlawful activities<br>
Attempt to interfere with or damage the website<br>
Attempt to gain unauthorized access to website systems<br>
Upload malicious software or harmful code<br>
Abuse automated systems or intentionally overload the website<br>
Submit content that violates another person's rights<br>
Use Promptify to distribute illegal, hateful, sexually explicit, or otherwise prohibited material
</p>
<p>We may restrict or block access where necessary to protect the website, its users, or third parties.</p>

<p><strong>4. Prompts</strong><br>
Prompts displayed on Promptify may be available for visitors to copy and adapt for their own creative purposes.<br>
However, Promptify does not guarantee that every prompt is original, exclusive, accurate, or suitable for every AI tool.<br>
Users are responsible for determining whether their intended use of a prompt complies with the terms, policies, and laws applicable to the AI service they use.</p>

<p><strong>5. User-Submitted Content</strong><br>
If you submit an image, prompt, description, or other material to Promptify, you represent that:</p>
<p>
You have the necessary rights or permission to submit the material<br>
Your submission does not knowingly infringe another person's copyright, trademark, privacy, publicity, or other rights<br>
Your submission complies with applicable laws<br>
Your submission does not contain prohibited material
</p>
<p>You remain responsible for the content you submit.</p>

<p><strong>6. Permission to Display Submissions</strong><br>
By submitting content to Promptify, you grant Promptify a non-exclusive permission to host, reproduce, display, format, organize, and make the submitted content available as part of the website and its normal promotional activities.<br>
This permission does not mean that Promptify automatically becomes the owner of your copyright.</p>

<p><strong>7. Copyright and Content Removal</strong><br>
Promptify respects intellectual-property rights. Unless otherwise stated, Promptify does not claim ownership of third-party images, trademarks, or other copyrighted materials displayed on the website. The appearance of third-party material on Promptify does not necessarily mean that Promptify endorses or owns that material.<br>
We reserve the right to review, reject, edit, restrict, or remove submitted content at our discretion, including content that may violate these Terms, applicable law, or the rights of another person.<br>
If you believe content on Promptify infringes your copyright or other rights, please contact us at muaazbwn@gmail.com with a description of the content, its location on the site, and your contact information. We will review and respond to legitimate requests in a reasonable timeframe.</p>

<p><strong>8. Third-Party Services and Websites</strong><br>
Promptify may reference, link to, or work alongside third-party AI tools, websites, services, or platforms.<br>
Those services are operated independently from Promptify and may have their own terms, privacy policies, and usage requirements.<br>
Promptify is not responsible for the availability, functionality, policies, or results of third-party services.</p>

<p><strong>9. Advertising</strong><br>
Promptify may display advertisements from third-party advertising providers, such as Google AdSense.<br>
Advertising content is provided by third parties, and Promptify does not necessarily endorse every product or service displayed through advertising.<br>
Users should independently evaluate third-party products and services before using or purchasing them.</p>

<p><strong>10. Disclaimer</strong><br>
Promptify is provided on an "as available" basis.<br>
We make reasonable efforts to maintain accurate and useful content, but we do not guarantee that:</p>
<p>
The website will always be available<br>
All information will be completely accurate or current<br>
Every prompt will work with every AI tool<br>
Every submitted item will remain available<br>
The website will be free from errors or interruptions
</p>
<p>Use of Promptify is at your own discretion.</p>

<p><strong>11. Limitation of Liability</strong><br>
To the maximum extent permitted by applicable law, Promptify and its operators will not be responsible for losses or damages arising from your use of, or inability to use, the website or third-party services referenced through the website.<br>
Nothing in these Terms is intended to exclude rights or protections that cannot legally be excluded.</p>

<p><strong>12. Governing Law</strong><br>
These Terms are governed by and construed in accordance with applicable law, without regard to conflict of law principles. Any disputes arising from these Terms or your use of Promptify will be handled in accordance with applicable local regulations.</p>

<p><strong>13. Changes to These Terms</strong><br>
We may update these Terms when necessary.<br>
When changes are made, the updated version will be published on this page with a revised effective date.<br>
Your continued use of Promptify after changes are published constitutes acceptance of the updated Terms, to the extent permitted by applicable law.</p>

<p><strong>14. Contact</strong><br>
Questions about these Terms can be sent to: muaazbwn@gmail.com</p>

<p><em>Last updated: August 27, 2026</em></p>
      </div>
    </div>
  );
}
