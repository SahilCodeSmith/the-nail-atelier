import { MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SmartImage } from "@/components/media/smart-image";
import { siteConfig } from "@/lib/config/site";
import { SIZES } from "@/lib/data/images";
import { whatsappHref, generalEnquiryMessage } from "@/lib/whatsapp";

/**
 * Hero is above the fold — content is always present. A gentle opacity-only
 * entrance (skipped under reduced motion) is the only motion here.
 */
const stepStyle = (i: number) => ({ animationDelay: `${0.06 + i * 0.08}s` });

export function Hero() {
  return (
    <section
      aria-label="The Nail Atelier — luxury home-visit nail artistry"
      className="relative isolate overflow-hidden bg-bone"
    >
      <div className="mx-auto grid min-h-[100svh] w-full max-w-[112rem] grid-rows-[44svh_1fr] lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-1">
        {/* ---- Image plate ---- */}
        <div className="relative order-first min-h-[300px] w-full overflow-hidden lg:order-last lg:h-full">
          <div className="absolute inset-0 motion-safe:animate-fade-in">
            <SmartImage
              id="hero-primary"
              fill
              sizes={SIZES.half}
              priority
              reqWidth={1800}
              focal={{ x: 0.6, y: 0.5 }}
              className="h-full w-full u-grain"
              imgClassName="object-cover"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bone via-bone/10 to-transparent lg:bg-gradient-to-r lg:from-bone lg:via-bone/5 lg:to-transparent"
            aria-hidden
          />
        </div>

        {/* ---- Content field ---- */}
        <div className="relative order-last flex items-center py-16 lg:order-first lg:py-0">
          <span
            className="pointer-events-none absolute left-[max(1.25rem,calc((100%-106rem)/2))] top-1/2 hidden -translate-y-1/2 -rotate-90 font-sans text-[0.6875rem] uppercase tracking-[0.24em] text-greige xl:block"
            aria-hidden
          >
            N°01 — The Visit
          </span>

          <div className="mx-auto flex w-full max-w-[47rem] flex-col gap-7 px-gutter lg:pl-[clamp(2rem,7vw,7rem)] lg:pr-10">
            <p
              className="u-eyebrow motion-safe:animate-fade-in"
              style={stepStyle(0)}
            >
              Home-visit nail atelier
            </p>

            <h1
              className="font-display text-d-2xl font-light leading-[1.03] text-ink motion-safe:animate-fade-in"
              style={stepStyle(1)}
            >
              Luxury nail artistry,
              <br className="hidden sm:block" /> brought to{" "}
              <span className="italic text-lacquer">your</span> doorstep.
            </h1>

            <p
              className="max-w-[42ch] text-lead text-char/85 text-pretty motion-safe:animate-fade-in"
              style={stepStyle(2)}
            >
              Bespoke sets, hand-finished by {siteConfig.artist.name} — in the calm
              of your own space.
            </p>

            <div
              className="flex flex-col gap-5 pt-1 motion-safe:animate-fade-in"
              style={stepStyle(3)}
            >
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <ButtonLink href="/book" variant="primary" size="lg" arrow>
                  {siteConfig.cta.primary}
                </ButtonLink>
                <ButtonLink href="/gallery" variant="link" size="md">
                  {siteConfig.cta.secondary}
                </ButtonLink>
              </div>
              <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-meta text-greige">
                <span>By appointment</span>
                <span aria-hidden>·</span>
                <a
                  href={whatsappHref(generalEnquiryMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-char transition-colors hover:text-lacquer"
                >
                  <MessageCircle className="size-3.5" aria-hidden />
                  WhatsApp {siteConfig.contact.phoneDisplay}
                </a>
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-7 left-[clamp(1.25rem,7vw,7rem)] hidden items-center gap-3 lg:flex">
            <span
              className="h-9 w-px animate-scroll-hint bg-greige motion-reduce:animate-none"
              aria-hidden
            />
            <span className="font-sans text-[0.625rem] uppercase tracking-[0.24em] text-greige">
              Scroll
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
