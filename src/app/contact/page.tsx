import type { Metadata } from "next";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { buildMetadata } from "@/lib/config/seo";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/layout-primitives";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";
import {
  whatsappHref,
  telHref,
  mailtoHref,
  generalEnquiryMessage,
} from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Reach The Nail Atelier — WhatsApp, phone or email. Home-visit nail artistry by Rakshit, by appointment.",
  path: "/contact",
});

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.contact.phoneDisplay,
    href: whatsappHref(generalEnquiryMessage()),
    note: "Fastest — Rakshit replies here personally.",
    external: true,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.contact.phoneDisplay,
    href: telHref(),
    note: "Call during the day.",
    external: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: mailtoHref(`Enquiry — ${siteConfig.name}`),
    note: "For longer notes or attachments.",
    external: false,
  },
];

export default function ContactPage() {
  return (
    <Section ground="bone" space="md" className="pt-28 md:pt-32">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="flex flex-col gap-6">
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Talk to the atelier"
            lede="The quickest way to check a date, a design or coverage for your address is a message. There's no call centre — you're speaking to Rakshit."
          />
          <div className="mt-2">
            <ButtonLink href="/book" variant="primary" size="lg" arrow>
              {siteConfig.cta.primary}
            </ButtonLink>
          </div>
          <p className="font-mono text-meta text-greige">
            {siteConfig.hours.label}
          </p>
        </div>

        <ul className="flex flex-col divide-y divide-sand border-y border-sand">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                {...(c.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center gap-5 py-6 transition-colors hover:bg-porcelain"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xs border border-sand text-ink transition-colors group-hover:border-lacquer group-hover:text-lacquer">
                  <c.icon className="size-5" aria-hidden />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-greige">
                    {c.label}
                  </span>
                  <span className="font-display text-d-sm text-ink">{c.value}</span>
                  <span className="text-[0.8125rem] text-char/70">{c.note}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 border-t border-sand pt-8">
        <Eyebrow>Note</Eyebrow>
        <p className="mt-3 max-w-measure text-[0.9375rem] leading-relaxed text-char/75">
          Service areas, hours and pricing are being finalised. Anything specific
          is confirmed with you directly before an appointment is fixed.
        </p>
      </div>
    </Section>
  );
}
