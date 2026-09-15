import type { Metadata } from "next";
import { buildMetadata } from "@/lib/config/seo";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms",
  description: "The terms for booking a home visit with The Nail Atelier.",
  path: "/terms",
  noindex: true,
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      intro="Plain terms for using this site and booking an appointment. A draft, pending final review."
    >
      <section>
        <h2>Bookings are requests</h2>
        <p>
          Submitting the form on this site creates a <em>request</em>, not a
          confirmed appointment. An appointment exists only once {siteConfig.name}{" "}
          confirms the date, time and details with you directly.
        </p>
      </section>
      <section>
        <h2>Pricing</h2>
        <p>
          Prices depend on the service, nail length and design, and are quoted
          once the look is agreed. Nothing is charged through this website. Any
          deposit and the accepted payment methods are confirmed when your
          appointment is set.
        </p>
      </section>
      <section>
        <h2>The appointment</h2>
        <ul>
          <li>
            You provide a safe, reasonably lit space with a table and two chairs,
            and a power point within reach.
          </li>
          <li>
            Please disclose allergies, sensitivities or nail conditions in
            advance.
          </li>
          <li>
            {siteConfig.name} may decline or stop a service where it would not be
            safe or hygienic to continue.
          </li>
        </ul>
      </section>
      <section>
        <h2>Changes &amp; cancellation</h2>
        <p>
          Rescheduling and cancellation are covered on the{" "}
          <a href="/cancellation">cancellation policy</a> page.
        </p>
      </section>
      <section>
        <h2>Content</h2>
        <p>
          Imagery currently shown on this site is licensed stock used for
          development and is clearly replaceable; it does not depict{" "}
          {siteConfig.name}&rsquo;s own client work. Final photography and any
          client images will be published only with permission.
        </p>
      </section>
      <section>
        <h2>Liability</h2>
        <p>
          Aftercare guidance is provided with every set. To the extent permitted
          by law, {siteConfig.name} is not liable for issues arising from
          undisclosed conditions or from not following aftercare advice.
        </p>
      </section>
    </LegalPage>
  );
}
