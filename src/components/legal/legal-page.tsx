import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/layout-primitives";
import { siteConfig } from "@/lib/config/site";

export function LegalPage({
  title,
  intro,
  updated = "This is a development placeholder and has not been finalised.",
  children,
}: {
  title: string;
  intro: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <Section ground="bone" space="md" className="pt-28 md:pt-32">
      <div className="max-w-prose">
        <SectionHeading as="h1" eyebrow="Legal" title={title} lede={intro} />
        <p className="mt-4 font-mono text-meta text-greige">{updated}</p>

        <div className="prose-legal mt-12 flex flex-col gap-8 text-[0.9375rem] leading-relaxed text-char/85 [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-d-sm [&_h2]:text-ink [&_a]:text-lacquer [&_a]:underline [&_a]:underline-offset-2 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1.5">
          {children}
        </div>

        <div className="mt-14 border-t border-sand pt-6 text-[0.875rem] text-char/70">
          Questions about this page? Contact{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-lacquer underline underline-offset-2"
          >
            {siteConfig.contact.email}
          </a>{" "}
          or <Link href="/contact" className="text-lacquer underline underline-offset-2">get in touch</Link>.
        </div>
      </div>
    </Section>
  );
}
