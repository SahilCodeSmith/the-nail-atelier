import type { Metadata } from "next";
import { siteConfig } from "./site";

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
          default: `${siteConfig.name} — ${siteConfig.tagline}`,
          template: `%s · ${siteConfig.name}`,
        },
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.artist.name }],
    keywords: [
      "home visit nail artist",
      "luxury nail art",
      "bespoke manicure",
      "nail atelier",
      "gel extensions at home",
      "bridal nails",
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
    "@type": "HealthAndBeautyBusiness",
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
      "Gel manicure",
      "Nail extensions",
      "Bridal nails",
    ],
    // areaServed / address intentionally omitted until confirmed by the brand.
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Home-visit nail artistry",
        serviceType: "Mobile nail salon",
        provider: { "@type": "Organization", name: siteConfig.name },
      },
    },
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
