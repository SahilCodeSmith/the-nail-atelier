import { Section, SectionHeading } from "@/components/ui/layout-primitives";
import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { faqs } from "@/lib/data/faq";
import { whatsappHref, generalEnquiryMessage } from "@/lib/whatsapp";

export function FaqPreview() {
  const shown = faqs.slice(0, 6);
  return (
    <Section id="faq" ground="porcelain" space="lg" aria-label="Questions">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="Questions" title="The things people ask first" />
          <p className="max-w-measure text-[0.9375rem] leading-relaxed text-char/75">
            Anything specific — coverage for your address, pricing for your
            design, a last-minute date — is quickest to settle on WhatsApp.
          </p>
          <ButtonLink
            href={whatsappHref(generalEnquiryMessage())}
            variant="secondary"
            size="md"
            arrow
          >
            Ask on WhatsApp
          </ButtonLink>
        </div>

        <Reveal>
          <Accordion type="single" collapsible className="border-t border-sand">
            {shown.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>
                  <p className="leading-relaxed">{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
