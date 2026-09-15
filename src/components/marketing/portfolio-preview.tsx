import { Section, SectionHeading } from "@/components/ui/layout-primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { DesignCard } from "@/components/marketing/design-card";
import { designs } from "@/lib/data/designs";
import { SIZES } from "@/lib/data/images";

// A deliberately uneven editorial selection.
const PICKS = [
  "marbled-oxblood",
  "liquid-chrome",
  "pressed-petal",
  "gilded-baroque",
  "negative-space",
  "aura-glow",
  "editorial-black",
];

export function PortfolioPreview() {
  const items = PICKS.map((id) => designs.find((d) => d.id === id)).filter(
    Boolean,
  ) as (typeof designs)[number][];

  return (
    <Section id="portfolio" ground="lavender" space="lg" aria-label="Portfolio">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Portfolio"
          title="An editorial of what nails can be"
          lede="Filter by chrome, bridal, floral, 3D and more in the full gallery — every look opens straight into a booking."
        />
        <ButtonLink href="/gallery" variant="primary" size="md" arrow className="shrink-0">
          Enter the gallery
        </ButtonLink>
      </div>

      <RevealGroup
        stagger={0.04}
        className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-6"
      >
        {items.map((d, i) => (
          <RevealItem
            key={d.id}
            className={
              i === 0
                ? "md:col-span-2 md:row-span-2"
                : i === 3
                  ? "md:col-span-2"
                  : ""
            }
          >
            <DesignCard design={d} sizes={SIZES.gallery} />
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-8">
        <p className="font-mono text-meta text-greige">
          Development imagery from licensed stock — replaceable, not the
          atelier&rsquo;s client work.
        </p>
      </Reveal>
    </Section>
  );
}
