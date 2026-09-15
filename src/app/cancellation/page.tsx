import type { Metadata } from "next";
import { buildMetadata } from "@/lib/config/seo";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/config/site";
import { whatsappHref, generalEnquiryMessage } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Cancellation policy",
  description:
    "How rescheduling and cancellation work for a home visit with The Nail Atelier.",
  path: "/cancellation",
  noindex: true,
});

export default function CancellationPage() {
  return (
    <LegalPage
      title="Cancellation policy"
      intro="How rescheduling and cancellation work. The specific notice periods and any fees below are placeholders pending confirmation by the atelier."
    >
      <section>
        <h2>Rescheduling</h2>
        <p>
          Life happens. Let {siteConfig.name} know as early as you can and
          we&rsquo;ll find another date at no charge, subject to availability.
        </p>
      </section>
      <section>
        <h2>Notice <span className="text-greige">(placeholder)</span></h2>
        <ul>
          <li>
            <strong>More than 48 hours&rsquo; notice:</strong> reschedule or
            cancel with no fee.
          </li>
          <li>
            <strong>24–48 hours&rsquo; notice:</strong> any deposit may be held
            against a future date.
          </li>
          <li>
            <strong>Less than 24 hours, or no-show:</strong> the deposit may be
            retained to cover the reserved time and travel.
          </li>
        </ul>
        <p className="text-greige">
          These figures are indicative for development and will be set by{" "}
          {siteConfig.name} before launch.
        </p>
      </section>
      <section>
        <h2>If the atelier reschedules</h2>
        <p>
          If Rakshit has to move your appointment, you&rsquo;ll be offered the
          next available date or a full refund of any deposit.
        </p>
      </section>
      <section>
        <h2>Late arrivals &amp; access</h2>
        <p>
          If the space isn&rsquo;t ready or access isn&rsquo;t possible on
          arrival, the appointment may need to be shortened or rescheduled.
        </p>
      </section>
      <section>
        <h2>How to cancel or move a booking</h2>
        <p>
          Message{" "}
          <a href={whatsappHref(generalEnquiryMessage())}>on WhatsApp</a> or call{" "}
          {siteConfig.contact.phoneDisplay} with your booking reference.
        </p>
      </section>
    </LegalPage>
  );
}
