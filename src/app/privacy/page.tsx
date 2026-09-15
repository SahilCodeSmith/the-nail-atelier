import type { Metadata } from "next";
import { buildMetadata } from "@/lib/config/seo";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description: "How The Nail Atelier handles the information you share when booking.",
  path: "/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      intro="A short, plain account of what we collect and why. This draft will be finalised before launch."
    >
      <section>
        <h2>What we collect</h2>
        <p>
          When you send a booking request or a message, we receive the details
          you provide: your name, phone number, optional email, the address for
          the visit, your service and design preferences, and any notes.
        </p>
      </section>
      <section>
        <h2>How it&rsquo;s used</h2>
        <ul>
          <li>To reply, confirm availability and give a quote.</li>
          <li>To plan and carry out your appointment.</li>
          <li>To contact you about changes to a booking you&rsquo;ve made.</li>
        </ul>
        <p>
          We do not sell your information or use it for advertising.
        </p>
      </section>
      <section>
        <h2>Where it goes</h2>
        <p>
          Booking requests reach {siteConfig.name} by message and email. If you
          continue on WhatsApp, that conversation is subject to WhatsApp&rsquo;s
          own privacy terms. Reference images you attach in the booking form stay
          on your device — they are not uploaded by this website.
        </p>
      </section>
      <section>
        <h2>Retention &amp; your choices</h2>
        <p>
          We keep enquiry details only as long as needed to serve you and for
          reasonable record-keeping. To ask what we hold, or to have it deleted,
          email{" "}
          <a href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>
          .
        </p>
      </section>
      <section>
        <h2>This website</h2>
        <p>
          The site uses only the storage needed to remember an in-progress
          booking on your own device. Any analytics or additional processing
          will be disclosed here before it is added.
        </p>
      </section>
    </LegalPage>
  );
}
