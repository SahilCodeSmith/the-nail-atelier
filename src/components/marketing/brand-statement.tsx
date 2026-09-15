import { Section, Eyebrow } from "@/components/ui/layout-primitives";
import { Reveal } from "@/components/motion/reveal";
import { SmartImage } from "@/components/media/smart-image";
import { SIZES } from "@/lib/data/images";

export function BrandStatement() {
  return (
    <Section ground="gold" space="lg" aria-label="The atelier">
      <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
        <Reveal className="flex flex-col gap-8">
          <Eyebrow>The atelier</Eyebrow>
          <p className="max-w-[20ch] font-display text-d-lg font-light leading-[1.1] text-ink text-balance">
            A salon is a place you go. This is one that comes to you.
          </p>
          <p className="max-w-measure text-lead text-char/85 text-pretty">
            The Nail Atelier is a private, home-visit practice led by Rakshit.
            One appointment at a time, unhurried, with the design agreed before
            the day — so the visit itself is nothing but craft.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="w-full max-w-sm justify-self-end lg:w-[22rem]"
        >
          <figure className="flex flex-col gap-3">
            <SmartImage
              id="artist-applying"
              sizes={SIZES.card}
              reqWidth={900}
              className="shadow-plate"
            />
            <figcaption className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-greige">
              Reference imagery — the atelier&rsquo;s own work to follow
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
