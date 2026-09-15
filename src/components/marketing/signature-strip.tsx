import { Section, SectionHeading } from "@/components/ui/layout-primitives";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { DesignCard } from "@/components/marketing/design-card";
import { signatureSets } from "@/lib/data/designs";
import { SIZES } from "@/lib/data/images";

export function SignatureStrip() {
  const sets = signatureSets.slice(0, 8);
  return (
    <Section
      id="signature"
      ground="espresso"
      space="lg"
      aria-label="Signature sets"
      className="u-grain"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow={<span className="text-champagne-light">Signature sets</span>}
          title="A house language, worn ten ways"
          lede="Directions Rakshit returns to. Tap any to carry it straight into a booking — the exact set is refined with you."
          headingClassName="text-bone"
          className="[&_p.text-lead]:text-bone/75"
        />
        <ButtonLink
          href="/gallery"
          variant="secondaryOnDark"
          size="sm"
          className="shrink-0"
          arrow
        >
          The full portfolio
        </ButtonLink>
      </div>

      <RevealGroup
        stagger={0.05}
        className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
      >
        {sets.map((d) => (
          <RevealItem
            key={d.id}
            className="[&_h3]:text-bone [&_.border-sand]:border-white/15 [&_p]:text-bone/65"
          >
            <DesignCard design={d} sizes={SIZES.card} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
