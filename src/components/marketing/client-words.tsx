import { Section, Eyebrow } from "@/components/ui/layout-primitives";
import { Reveal } from "@/components/motion/reveal";
import { testimonials, hasTestimonials } from "@/lib/data/testimonials";

export function ClientWords() {
  return (
    <Section id="words" ground="bone" space="lg" aria-label="Client words">
      <Reveal className="mx-auto flex max-w-prose flex-col items-center gap-8 text-center">
        <Eyebrow className="u-eyebrow--center">Client words</Eyebrow>

        {hasTestimonials ? (
          <ul className="flex flex-col gap-14">
            {testimonials.map((t, i) => (
              <li key={i} className="flex flex-col items-center gap-5">
                <p className="font-display text-d-md font-light italic leading-[1.28] text-ink text-balance">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="font-sans text-[0.75rem] uppercase tracking-[0.16em] text-greige">
                  {t.attribution}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p className="font-display text-d-md font-light italic leading-[1.3] text-char/70 text-balance">
              &ldquo;The words of early clients will live here — published only
              with their permission.&rdquo;
            </p>
            <p className="max-w-[42ch] text-[0.9375rem] leading-relaxed text-char/70">
              The Nail Atelier is new. Rather than borrow reviews, this space is
              held for real ones. If you&rsquo;ve been seen by Rakshit, we&rsquo;d
              love to hear from you.
            </p>
          </>
        )}
      </Reveal>
    </Section>
  );
}
