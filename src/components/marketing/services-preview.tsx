import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/layout-primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SmartImage } from "@/components/media/smart-image";
import { ButtonLink } from "@/components/ui/button";
import { featuredServices, PRICE_PLACEHOLDER } from "@/lib/data/services";
import { accentAt, ACCENT_GROUP_HOVER_TEXT } from "@/lib/config/accent";
import { SIZES } from "@/lib/data/images";
import { cn } from "@/lib/utils";

export function ServicesPreview() {
  return (
    <Section id="services" ground="bone" space="lg" aria-label="Services">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Services"
          title="What we can do at your table"
          lede="Every service is delivered at a home visit. Design and finish are shaped to your hands and your week."
        />
        <ButtonLink href="/book" variant="link" size="md" className="shrink-0">
          Start a booking
        </ButtonLink>
      </div>

      <RevealGroup
        stagger={0.05}
        className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
      >
        {featuredServices.map((s, i) => {
          const accent = accentAt(i);
          return (
            <RevealItem key={s.slug}>
              <Link
                href={`/book?service=${s.slug}`}
                className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                <div className="overflow-hidden">
                  <SmartImage
                    id={s.imageId}
                    sizes={SIZES.card}
                    reqWidth={900}
                    imgClassName="transition-transform duration-[0.9s] ease-out-expo group-hover:scale-[1.045] motion-reduce:transform-none"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3 border-t border-sand pt-4">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-d-sm text-ink u-underline decoration-sand">
                      {s.name}
                    </h3>
                    <p className="max-w-[34ch] text-[0.875rem] leading-relaxed text-char/75">
                      {s.summary}
                    </p>
                  </div>
                  <ArrowUpRight
                    className={cn(
                      "mt-1 size-4 shrink-0 text-greige transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                      ACCENT_GROUP_HOVER_TEXT[accent],
                    )}
                    aria-hidden
                  />
                </div>
                <p className="mt-3 flex items-center gap-3 font-mono text-meta text-greige">
                  <span>{s.durationNote}</span>
                  <span aria-hidden>·</span>
                  <span>{PRICE_PLACEHOLDER}</span>
                </p>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <Reveal className="mt-10">
        <p className="font-mono text-meta text-greige">
          Pedicure Ritual and Safe Removal are also available — ask when you book.
        </p>
      </Reveal>
    </Section>
  );
}
