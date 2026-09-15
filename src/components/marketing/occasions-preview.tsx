import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/layout-primitives";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SmartImage } from "@/components/media/smart-image";
import { occasions } from "@/lib/data/occasions";
import { CATEGORY_LABEL } from "@/lib/data/designs";
import { accentAt, ACCENT_GROUP_HOVER_TEXT } from "@/lib/config/accent";
import { SIZES } from "@/lib/data/images";
import { cn } from "@/lib/utils";

export function OccasionsPreview() {
  return (
    <Section id="occasions" ground="bone" space="lg" aria-label="Occasions">
      <SectionHeading
        eyebrow="Occasions"
        title="Booked around the moment it's for"
        lede="Tell us the occasion and we bring the right direction, timing and calm to it."
      />

      <RevealGroup
        stagger={0.05}
        className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
      >
        {occasions.map((o, i) => {
          const accent = accentAt(i);
          return (
            <RevealItem key={o.slug}>
              <Link
                href={`/book?occasion=${o.slug}`}
                className="group flex flex-col gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                <div className="overflow-hidden">
                  <SmartImage
                    id={o.imageId}
                    sizes={SIZES.card}
                    reqWidth={800}
                    imgClassName="transition-transform duration-[0.9s] ease-out-expo group-hover:scale-[1.05] motion-reduce:transform-none"
                  />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-d-sm text-ink">{o.name}</h3>
                    <p className="max-w-[36ch] text-[0.875rem] leading-relaxed text-char/75">
                      {o.note}
                    </p>
                    <p className="mt-1 font-sans text-[0.625rem] uppercase tracking-[0.16em] text-greige">
                      {o.directions.map((d) => CATEGORY_LABEL[d]).join(" · ")}
                    </p>
                  </div>
                  <ArrowUpRight
                    className={cn(
                      "mt-1 size-4 shrink-0 text-greige transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                      ACCENT_GROUP_HOVER_TEXT[accent],
                    )}
                    aria-hidden
                  />
                </div>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
