/**
 * Occasions — entry points into a booking, matched to a design direction.
 */
import type { DesignCategory } from "./designs";

export interface Occasion {
  slug: string;
  name: string;
  note: string;
  imageId: string;
  /** Design categories usually explored for this occasion. */
  directions: DesignCategory[];
}

export const occasions: Occasion[] = [
  {
    slug: "bridal",
    name: "Bridal & pre-wedding",
    note: "A preview sitting, then a calm appointment timed to the day itself.",
    imageId: "nails-flower",
    directions: ["bridal", "french", "minimal"],
  },
  {
    slug: "celebration",
    name: "Parties & celebrations",
    note: "Something with presence for a birthday, an anniversary, a night out.",
    imageId: "nails-mauve-glitter",
    directions: ["glitter", "chrome", "3d"],
  },
  {
    slug: "festive",
    name: "Festive & family",
    note: "Sets that sit well with heavy jewellery and long days.",
    imageId: "signature-ornate",
    directions: ["custom", "abstract", "chrome"],
  },
  {
    slug: "editorial",
    name: "Shoots & editorial",
    note: "Camera-ready art, coordinated with a stylist if needed.",
    imageId: "nails-painted-art",
    directions: ["abstract", "3d", "custom"],
  },
  {
    slug: "everyday",
    name: "Everyday polish",
    note: "A quiet, hard-wearing finish that photographs like skin.",
    imageId: "nails-pink-clean",
    directions: ["minimal", "french"],
  },
  {
    slug: "gifting",
    name: "Gifting",
    note: "An appointment given to someone else — arranged discreetly.",
    imageId: "still-polish-bottle",
    directions: ["minimal", "bridal", "custom"],
  },
];
