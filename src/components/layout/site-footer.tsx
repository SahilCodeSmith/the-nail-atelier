import Link from "next/link";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { footerNav, siteConfig, PLACEHOLDER } from "@/lib/config/site";
import {
  whatsappHref,
  telHref,
  mailtoHref,
  generalEnquiryMessage,
} from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/layout-primitives";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-espresso text-bone">
      <div className="u-swatch-bar" aria-hidden />
      {/* Concierge CTA */}
      <div className="u-container border-b border-white/10 py-section">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="flex flex-col gap-5">
            <Eyebrow className="text-champagne-light">
              {siteConfig.serviceArea.label}
            </Eyebrow>
            <h2 className="max-w-[16ch] font-display text-d-lg text-bone">
              Tell us the date. We bring the atelier.
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:items-end">
            <ButtonLink href="/book" variant="onDark" size="lg" arrow>
              {siteConfig.cta.primary}
            </ButtonLink>
            <p className="font-mono text-meta text-bone/70">
              {siteConfig.contact.phoneDisplay} · {siteConfig.contact.email}
            </p>
          </div>
        </div>
      </div>

      {/* Nav + contact */}
      <div className="u-container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <span className="font-display text-[0.95rem] uppercase tracking-[0.24em]">
            The&nbsp;Nail&nbsp;Atelier
          </span>
          <p className="max-w-[38ch] text-[0.9375rem] text-bone/70">
            {siteConfig.descriptionShort}
          </p>
          <div className="mt-2 flex flex-col gap-2.5 text-[0.9375rem]">
            <a
              href={whatsappHref(generalEnquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-bone/85 transition-colors hover:text-bone"
            >
              <MessageCircle className="size-4" aria-hidden /> WhatsApp
            </a>
            <a
              href={telHref()}
              className="inline-flex items-center gap-2.5 text-bone/85 transition-colors hover:text-bone"
            >
              <Phone className="size-4" aria-hidden /> {siteConfig.contact.phoneDisplay}
            </a>
            <a
              href={mailtoHref(`Enquiry — ${siteConfig.name}`)}
              className="inline-flex items-center gap-2.5 text-bone/85 transition-colors hover:text-bone"
            >
              <Mail className="size-4" aria-hidden /> {siteConfig.contact.email}
            </a>
          </div>
        </div>

        {footerNav.map((col) => (
          <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
            <p className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-bone/50">
              {col.title}
            </p>
            {col.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.9375rem] text-bone/80 transition-colors hover:text-bone"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>

      {/* Legal / disclaimers */}
      <div className="u-container border-t border-white/10 py-8">
        <div className="flex flex-col gap-4 text-[0.75rem] leading-relaxed text-bone/55 md:flex-row md:items-start md:justify-between">
          <p>
            © {year} {siteConfig.legalName}. Home-visit nail artistry by{" "}
            {siteConfig.artist.name}.
          </p>
          <p className="max-w-[52ch]">
            {PLACEHOLDER.active
              ? "This site is in development. Service areas, pricing, hours and reviews are placeholders pending confirmation. Photography is licensed stock, not the atelier's own work."
              : "Photography © The Nail Atelier."}
          </p>
        </div>
      </div>
    </footer>
  );
}
