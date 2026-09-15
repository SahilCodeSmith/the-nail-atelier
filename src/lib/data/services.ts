/**
 * Service directions offered at a home visit.
 *
 * NO PRICES are published here — the brand has not confirmed a price list.
 * `priceNote` carries a neutral placeholder; the booking flow makes clear the
 * quote is confirmed on WhatsApp. Durations are indicative placeholders.
 */

export interface ServiceItem {
  slug: string;
  name: string;
  summary: string;
  description: string;
  includes: string[];
  /** Indicative only — PLACEHOLDER. */
  durationNote: string;
  /** PLACEHOLDER — no confirmed price list. */
  priceNote: string;
  imageId: string;
  featured?: boolean;
}

export const PRICE_PLACEHOLDER = "Quoted on consultation";

export const services: ServiceItem[] = [
  {
    slug: "signature-manicure",
    name: "Signature Manicure",
    summary: "A full hand ritual with a flawless colour or sheer finish.",
    description:
      "Unhurried preparation — cuticle work, shaping, a hand massage — followed by a meticulous colour application in the shade of your choice.",
    includes: [
      "Nail health assessment",
      "Cuticle care & shaping",
      "Hand & arm massage",
      "Gel or classic colour",
    ],
    durationNote: "≈ 60–75 min",
    priceNote: PRICE_PLACEHOLDER,
    imageId: "nails-pink-clean",
    featured: true,
  },
  {
    slug: "gel-and-builder",
    name: "Gel & Builder",
    summary: "Strength and structure on the natural nail, no extension.",
    description:
      "A builder-gel overlay that reinforces and subtly reshapes your own nails, finished in colour or clear.",
    includes: [
      "Structured builder overlay",
      "Custom apex & shape",
      "Colour or clear finish",
      "Aftercare guidance",
    ],
    durationNote: "≈ 75–90 min",
    priceNote: PRICE_PLACEHOLDER,
    imageId: "artist-tools",
    featured: true,
  },
  {
    slug: "extensions",
    name: "Extensions",
    summary: "Added length and silhouette, kept believable.",
    description:
      "Gel or tip extensions sculpted to a natural taper. We design the length and shape around your hands and your week.",
    includes: [
      "Length & shape consultation",
      "Sculpted gel extensions",
      "Balanced, wearable silhouette",
      "Colour or art (added separately)",
    ],
    durationNote: "≈ 120–150 min",
    priceNote: PRICE_PLACEHOLDER,
    imageId: "nails-metallic-stiletto",
    featured: true,
  },
  {
    slug: "bespoke-nail-art",
    name: "Bespoke Nail Art",
    summary: "A design drawn for you, by hand, at the visit.",
    description:
      "Bring a reference, an object, a colour you love — Rakshit designs the set with you and paints it freehand.",
    includes: [
      "Design consultation",
      "Freehand hand-painted art",
      "Finish & seal",
      "Touch-up notes",
    ],
    durationNote: "≈ 120–180 min",
    priceNote: PRICE_PLACEHOLDER,
    imageId: "signature-ornate",
    featured: true,
  },
  {
    slug: "bridal",
    name: "Bridal",
    summary: "A calm appointment, timed to your day.",
    description:
      "A private bridal sitting — often with a preview session beforehand — so the final set is exactly right and exactly on schedule.",
    includes: [
      "Optional preview session",
      "Design locked to your look",
      "Day-of or day-before visit",
      "Party bookings on request",
    ],
    durationNote: "≈ 120 min + preview",
    priceNote: PRICE_PLACEHOLDER,
    imageId: "nails-flower",
    featured: true,
  },
  {
    slug: "pedicure-ritual",
    name: "Pedicure Ritual",
    summary: "The same care, for feet, in your own chair.",
    description:
      "A seated pedicure with soak, exfoliation, nail and cuticle work, massage and a lasting finish.",
    includes: [
      "Soak & exfoliation",
      "Nail & cuticle work",
      "Foot & calf massage",
      "Gel or classic colour",
    ],
    durationNote: "≈ 60–75 min",
    priceNote: PRICE_PLACEHOLDER,
    imageId: "still-polish-shelf",
    featured: true,
  },
  {
    slug: "safe-removal",
    name: "Safe Removal",
    summary: "Gentle takedown and a reset for the natural nail.",
    description:
      "Careful removal of existing gel or extensions, followed by conditioning and a bare or lightly buffed finish.",
    includes: [
      "Gentle product removal",
      "Nail conditioning",
      "Shape & buff",
      "Rebuild plan if needed",
    ],
    durationNote: "≈ 30–45 min",
    priceNote: PRICE_PLACEHOLDER,
    imageId: "texture-brush",
  },
];

export const featuredServices = services.filter((s) => s.featured);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug) ?? null;
}
