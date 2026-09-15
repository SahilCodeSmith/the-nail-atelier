import type { Metadata } from "next";
import { buildMetadata } from "@/lib/config/seo";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { faqs } from "@/lib/data/faq";

import { Hero } from "@/components/marketing/hero";
import { MarqueeStrip } from "@/components/marketing/marquee-strip";
import { BrandStatement } from "@/components/marketing/brand-statement";
import { HomeVisit } from "@/components/marketing/home-visit";
import { ServicesPreview } from "@/components/marketing/services-preview";
import { SignatureStrip } from "@/components/marketing/signature-strip";
import { PortfolioPreview } from "@/components/marketing/portfolio-preview";
import { DesignFinder } from "@/components/marketing/design-finder";
import { OccasionsPreview } from "@/components/marketing/occasions-preview";
import { AboutPreview } from "@/components/marketing/about-preview";
import { ClientWords } from "@/components/marketing/client-words";
import { FaqPreview } from "@/components/marketing/faq-preview";
import { ClosingCta } from "@/components/marketing/closing-cta";

export const metadata: Metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <FaqJsonLd items={faqs} />
      <Hero />
      <MarqueeStrip />
      <BrandStatement />
      <HomeVisit />
      <ServicesPreview />
      <SignatureStrip />
      <PortfolioPreview />
      <DesignFinder />
      <OccasionsPreview />
      <AboutPreview />
      <ClientWords />
      <FaqPreview />
      <ClosingCta />
    </>
  );
}
