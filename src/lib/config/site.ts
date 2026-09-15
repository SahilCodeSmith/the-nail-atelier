/**
 * THE NAIL ATELIER — single source of truth for business information.
 *
 * KNOWN, CONFIRMED facts are set directly.
 * Anything not confirmed by the brand is marked PLACEHOLDER and must be
 * replaced before launch. Never hardcode any of this in components —
 * import from here (or from lib/data/*).
 */

export const PLACEHOLDER = {
  /** Flip to false once every PLACEHOLDER value below has been confirmed. */
  active: true,
  note: "Values marked PLACEHOLDER are assumptions for development only.",
} as const;

const phoneE164 = "+919116067596"; // confirmed
const whatsappDigits = "919116067596"; // confirmed (wa.me format, no +)

export const siteConfig = {
  name: "The Nail Atelier",
  shortName: "Nail Atelier",
  legalName: "The Nail Atelier", // PLACEHOLDER — confirm registered/trading name
  artist: {
    name: "Rakshit",
    role: "Founder & Nail Artist",
    // PLACEHOLDER — short bio, replace with Rakshit's own words.
    bioShort:
      "Rakshit is the artist and founder of The Nail Atelier — a home-visit practice built around unhurried, hand-finished nail art.",
  },

  // ---- Contact (confirmed) ----------------------------------------------
  contact: {
    phoneE164,
    phoneDisplay: "+91 91160 67596",
    whatsappDigits,
    email: "thenailartindia@gmail.com",
  },

  // ---- Positioning -----------------------------------------------------
  tagline: "Luxury nail artistry, brought to your doorstep.",
  descriptionShort:
    "A home-visit nail art, manicure & pedicure atelier. Bespoke nail designs, hand-finished by Rakshit, in the comfort of your own space.",
  descriptionLong:
    "The Nail Atelier is a private, home-visit nail art, manicure and pedicure practice led by Rakshit. Every appointment is a considered ritual — a bespoke nail design consultation, meticulous preparation, and hand-finished artistry on hands and feet — delivered to your door.",

  // ---- Service area (PLACEHOLDER) -------------------------------------
  // The brand has not confirmed cities/zones. Keep vague copy in components
  // and surface this single line; confirm before publishing local SEO pages.
  serviceArea: {
    primaryCity: "your city", // PLACEHOLDER
    label: "Home visits by appointment", // PLACEHOLDER — e.g. "Across Bengaluru & NCR"
    confirmed: false,
  },

  // ---- Hours (PLACEHOLDER) ------------------------------------------
  hours: {
    label: "By appointment, seven days a week", // PLACEHOLDER
    confirmed: false,
  },

  // ---- Booking primitives -------------------------------------------
  currency: "INR",
  timezone: "Asia/Kolkata",

  // ---- Social (PLACEHOLDER — none confirmed) -----------------------
  social: {
    instagram: null as string | null, // PLACEHOLDER — no handle provided
  },

  // ---- URLs --------------------------------------------------------
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://thenailatelier.example", // PLACEHOLDER — set NEXT_PUBLIC_SITE_URL

  ogImageAlt: "The Nail Atelier — luxury home-visit nail artistry",

  // ---- Primary calls to action ----------------------------------
  cta: {
    primary: "Book a home visit",
    primaryShort: "Book",
    secondary: "Explore the portfolio",
    whatsapp: "Message on WhatsApp",
    call: "Call the studio",
    email: "Email us",
  },
} as const;

export type SiteConfig = typeof siteConfig;

// ---- Navigation ---------------------------------------------------
export const primaryNav = [
  { label: "The Home Visit", href: "/#experience" },
  { label: "Services", href: "/#services" },
  { label: "Signature Sets", href: "/#signature" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "About", href: "/#about" },
] as const;

export const footerNav: { title: string; links: { label: string; href: string }[] }[] =
  [
    {
      title: "Atelier",
      links: [
        { label: "The Home Visit", href: "/#experience" },
        { label: "Services", href: "/#services" },
        { label: "Signature Sets", href: "/#signature" },
        { label: "Design Finder", href: "/#finder" },
        { label: "Occasions", href: "/#occasions" },
      ],
    },
    {
      title: "Studio",
      links: [
        { label: "About Rakshit", href: "/#about" },
        { label: "Portfolio", href: "/#portfolio" },
        { label: "Client Words", href: "/#words" },
        { label: "Questions", href: "/#faq" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Booking",
      links: [
        { label: "Book a Home Visit", href: "/book" },
        { label: "Cancellation Policy", href: "/cancellation" },
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ];
