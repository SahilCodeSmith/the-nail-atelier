import { MessageCircle } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/layout-primitives";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { SmartImage } from "@/components/media/smart-image";
import { siteConfig } from "@/lib/config/site";
import { whatsappHref, generalEnquiryMessage } from "@/lib/whatsapp";
import { SIZES } from "@/lib/data/images";

export function ClosingCta() {
  return (
    <Section
      ground="espresso"
      space="none"
      bleed
      aria-label="Book a home visit"
      className="u-grain"
    >
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px] lg:min-h-[560px]">
          <SmartImage
            id="hero-portrait"
            fill
            sizes={SIZES.half}
            reqWidth={1400}
            focal={{ x: 0.5, y: 0.4 }}
            className="h-full"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent lg:bg-gradient-to-r"
            aria-hidden
          />
        </div>

        <Reveal className="flex flex-col justify-center gap-7 px-gutter py-section-lg lg:px-16">
          <Eyebrow className="text-champagne-light">
            {siteConfig.serviceArea.label}
          </Eyebrow>
          <h2 className="max-w-[16ch] font-display text-d-xl font-light leading-[1.06] text-bone text-balance">
            The date is yours. The atelier comes to it.
          </h2>
          <p className="max-w-[46ch] text-lead text-bone/75 text-pretty">
            Send your day and the look you have in mind. {siteConfig.artist.name}{" "}
            replies personally to confirm availability and a quote — nothing is
            charged to make the request.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-7 gap-y-4">
            <ButtonLink href="/book" variant="onDark" size="lg" arrow>
              {siteConfig.cta.primary}
            </ButtonLink>
            <a
              href={whatsappHref(generalEnquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-[0.9375rem] text-bone/85 underline decoration-white/30 underline-offset-[6px] transition-colors hover:text-bone hover:decoration-champagne-light"
            >
              <MessageCircle className="size-4" aria-hidden />
              Or message on WhatsApp
            </a>
          </div>
          <p className="font-mono text-meta text-bone/55">
            {siteConfig.contact.phoneDisplay} · {siteConfig.contact.email}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
