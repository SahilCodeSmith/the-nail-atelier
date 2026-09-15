import { Section, SectionHeading } from "@/components/ui/layout-primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { homeVisitSteps, assurances } from "@/lib/data/experience";

export function HomeVisit() {
  return (
    <Section id="experience" ground="mint" space="lg" aria-label="The home visit">
      <SectionHeading
        eyebrow="The home visit"
        title="Five unhurried steps, door to doorstep"
        lede="Every appointment follows the same calm arc. You decide the look with Rakshit in advance; the visit is spent making it."
      />

      <RevealGroup className="mt-16 grid gap-px overflow-hidden border border-sand bg-sand sm:grid-cols-2 lg:grid-cols-5">
        {homeVisitSteps.map((step) => (
          <RevealItem
            key={step.index}
            className="flex flex-col gap-4 bg-mist p-7 transition-colors duration-300 hover:bg-porcelain"
          >
            <span className="font-display text-d-md font-light text-champagne">
              {step.index}
            </span>
            <h3 className="font-display text-d-sm text-ink">{step.title}</h3>
            <p className="text-[0.9375rem] leading-relaxed text-char/80">
              {step.body}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {assurances.map((a) => (
          <div key={a.title} className="flex flex-col gap-2 border-t border-ink/15 pt-4">
            <p className="font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink">
              {a.title}
            </p>
            <p className="text-[0.875rem] leading-relaxed text-char/75">{a.body}</p>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
