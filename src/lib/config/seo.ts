import type { Metadata } from "next";
import { siteConfig } from "./site";
import { services } from "@/lib/data/services";

const baseUrl = siteConfig.url;

export function buildMetadata(opts?: {
  title?: string;
  description?: string;
  path?: string;
  noindex?: boolean;
}): Metadata {
  const title = opts?.title;
  const description = opts?.description ?? siteConfig.descriptionShort;
  const path = opts?.path ?? "/";
  const url = `${baseUrl}${path}`;

  return {
    metadataBase: new URL(baseUrl),
    title: title
      ? { absolute: `${title} · ${siteConfig.name}` }
      : {
          default: `${siteConfig.name} — Home-Visit Nail Art, Manicure & Pedicure`,
          template: `%s · ${siteConfig.name}`,
        },
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.artist.name }],
    keywords: [
      // Core service
      "home visit nail artist",
      "home visit manicure",
      "home visit pedicure",
      "mobile nail salon",
      "nail artist at home",
      "manicure at home",
      "pedicure at home",
      "nail salon at home",
      "on demand manicure pedicure",
      // Nail art / design
      "nail art",
      "nail art designs",
      "nail designs",
      "designs on nails",
      "hand nail art",
      "custom nail art",
      "bespoke nail art",
      "nail art at home",
      // Techniques / finishes
      "gel manicure",
      "gel extensions at home",
      "nail extensions",
      "acrylic nails",
      "builder gel nails",
      "chrome nails",
      "french manicure",
      "3D nail art",
      "glitter nails",
      "matte nails",
      // Occasions
      "bridal nails",
      "bridal nail art",
      "party nail art",
      // Brand
      "luxury nail art",
      "bespoke manicure",
      "nail atelier",
      siteConfig.name,
    ],
    alternates: { canonical: url },
    robots: opts?.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: title ? `${title} · ${siteConfig.name}` : siteConfig.name,
      description,
      url,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} · ${siteConfig.name}` : siteConfig.name,
      description,
    },
    formatDetection: { telephone: true, address: false, email: true },
  };
}

/** JSON-LD for the business. Only confirmed facts are asserted. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: siteConfig.name,
    description: siteConfig.descriptionLong,
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneE164,
    email: siteConfig.contact.email,
    image: `${siteConfig.url}/opengraph-image`,
    founder: { "@type": "Person", name: siteConfig.artist.name },
    priceRange: "On consultation",
    knowsAbout: [
      "Nail art",
      "Nail art designs",
      "Manicure",
      "Pedicure",
      "Gel manicure",
      "Nail extensions",
      "Acrylic nails",
      "Chrome nails",
      "French manicure",
      "3D nail art",
      "Bridal nails",
      "Home-visit beauty services",
    ],
    // areaServed / address intentionally omitted until confirmed by the brand.
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        serviceType: "Mobile nail salon",
        provider: { "@type": "Organization", name: siteConfig.name },
      },
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
