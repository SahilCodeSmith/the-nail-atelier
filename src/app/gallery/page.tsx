import type { Metadata } from "next";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/config/seo";
import { Section, SectionHeading } from "@/components/ui/layout-primitives";
import { GalleryExperience } from "@/components/gallery/gallery-experience";
import { ButtonLink } from "@/components/ui/button";

// Client-side filtering reads/writes the URL via useSearchParams(); the
// static build silently froze this route on its loading.tsx fallback
// (Next never surfaced an error), so render it per-request instead.
export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio",
  description:
    "An editorial gallery of nail-art directions — minimal, bridal, chrome, floral, abstract, 3D, French and bespoke. Every look opens straight into a home-visit booking.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <Section ground="bone" space="md" className="pt-28 md:pt-32">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          as="h1"
          eyebrow="Portfolio"
          title="An editorial of what nails can be"
          lede="Style references, not client work — clearly replaceable while the atelier builds its own archive. Tap any look to view it full-screen and carry it into a booking."
        />
        <ButtonLink href="/book" variant="primary" size="md" arrow className="shrink-0">
          Book a home visit
        </ButtonLink>
      </div>

      <div className="mt-12">
        <Suspense
          fallback={
            <div className="grid animate-pulse grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] w-full bg-mist"
                  style={{ marginTop: i % 3 === 1 ? "2rem" : 0 }}
                />
              ))}
            </div>
          }
        >
          <GalleryExperience />
        </Suspense>
      </div>
    </Section>
  );
}
