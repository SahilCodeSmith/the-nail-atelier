import { Section, Eyebrow } from "@/components/ui/layout-primitives";
import { Reveal } from "@/components/motion/reveal";
import { SmartImage } from "@/components/media/smart-image";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig, PLACEHOLDER } from "@/lib/config/site";
import { SIZES } from "@/lib/data/images";

export function AboutPreview() {
  return (
    <Section id="about" ground="mint" space="lg" aria-label="About Rakshit">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        <Reveal className="order-last lg:order-first">
          <figure className="flex flex-col gap-3">
            <SmartImage
              id="hero-portrait"
              sizes={SIZES.half}
              reqWidth={1000}
              plateLabel="Rakshit"
              className="shadow-plate"
            />
            <figcaption className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-greige">
              {PLACEHOLDER.active
                ? "Reference imagery — portrait of Rakshit to be added"
                : `${siteConfig.artist.name}, ${siteConfig.artist.role}`}
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col gap-6">
          <Eyebrow>The artist</Eyebrow>
          <h2 className="max-w-[18ch] font-display text-d-lg font-light leading-[1.1] text-ink text-balance">
            One pair of hands, and the time to use them well
          </h2>
          <p className="max-w-measure text-lead text-char/85 text-pretty">
            {siteConfig.artist.bioShort}
          </p>
          <p className="max-w-measure text-[0.9375rem] leading-relaxed text-char/75">
            Every appointment is Rakshit&rsquo;s own — the consultation, the
            preparation, the painting. Nothing is handed off, nothing is rushed,
            and the design leaves with care notes and a direct line for the days
            after.
          </p>
          <div className="mt-2">
            <ButtonLink href="/book" variant="secondary" size="md" arrow>
              Book with {siteConfig.artist.name}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
