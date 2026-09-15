/**
 * Design directions shown in the portfolio, signature strip and design finder.
 *
 * These are STYLE references, not photographs of client work. Captions describe
 * the look. Replace `imageId` targets with Rakshit's own sets when available.
 */

export type DesignCategory =
  | "minimal"
  | "bridal"
  | "chrome"
  | "glitter"
  | "floral"
  | "abstract"
  | "3d"
  | "french"
  | "custom"
  | "extensions";

export const GALLERY_CATEGORIES: { slug: DesignCategory | "all"; label: string }[] =
  [
    { slug: "all", label: "All" },
    { slug: "minimal", label: "Minimal" },
    { slug: "bridal", label: "Bridal" },
    { slug: "chrome", label: "Chrome" },
    { slug: "glitter", label: "Glitter" },
    { slug: "floral", label: "Floral" },
    { slug: "abstract", label: "Abstract" },
    { slug: "3d", label: "3D" },
    { slug: "french", label: "French" },
    { slug: "custom", label: "Custom" },
    { slug: "extensions", label: "Extensions" },
  ];

/** One signature accent per style direction — the gallery's polish-rack colour code. */
export const CATEGORY_ACCENT: Record<DesignCategory, "lacquer" | "coral" | "champagne" | "teal" | "plum"> = {
  minimal: "teal",
  bridal: "champagne",
  chrome: "plum",
  glitter: "coral",
  floral: "lacquer",
  abstract: "teal",
  "3d": "plum",
  french: "champagne",
  custom: "coral",
  extensions: "lacquer",
};

export const CATEGORY_LABEL: Record<DesignCategory, string> = {
  minimal: "Minimal",
  bridal: "Bridal",
  chrome: "Chrome",
  glitter: "Glitter",
  floral: "Floral",
  abstract: "Abstract",
  "3d": "3D",
  french: "French",
  custom: "Custom",
  extensions: "Extensions",
};

export interface DesignItem {
  id: string;
  title: string;
  category: DesignCategory;
  imageId: string;
  /** Crop hint for the gallery tile — drives tile height in the editorial grid. */
  crop: "tall" | "portrait" | "square" | "wide";
  focal?: { x: number; y: number };
  /** One-line editorial caption describing the look. */
  note: string;
  finish?: string;
  length?: string;
  /** Appears in the homepage signature strip. */
  featured?: boolean;
}

export const designs: DesignItem[] = [
  {
    id: "porcelain-line",
    title: "Porcelain",
    category: "minimal",
    imageId: "nails-pink-clean",
    crop: "portrait",
    note: "A bare, high-shine wash finished with one freehand line.",
    finish: "High-gloss",
    length: "Short almond",
    featured: true,
  },
  {
    id: "bone-white",
    title: "Bone White",
    category: "minimal",
    imageId: "nails-white-minimal",
    crop: "tall",
    note: "Opaque warm white, buffed to a clean matte-adjacent sheen.",
    finish: "Soft gloss",
    length: "Short round",
  },
  {
    id: "negative-space",
    title: "Negative Space",
    category: "minimal",
    imageId: "nails-white-brushwork",
    crop: "portrait",
    note: "Unpainted nail framed by a single hand-drawn arc.",
    finish: "Matte topcoat",
    length: "Medium almond",
    featured: true,
  },
  {
    id: "modern-french",
    title: "Modern French",
    category: "french",
    imageId: "nails-white-brushwork",
    crop: "square",
    note: "A crisp, slim tip set slightly wider than classic.",
    finish: "High-gloss",
    length: "Medium squoval",
    featured: true,
  },
  {
    id: "micro-french",
    title: "Micro French",
    category: "french",
    imageId: "nails-pink-clean",
    crop: "portrait",
    note: "A whisper-thin tip on a sheer, skin-tone base.",
    finish: "High-gloss",
    length: "Short almond",
  },
  {
    id: "inverted-french",
    title: "Inverted French",
    category: "french",
    imageId: "nails-white-minimal",
    crop: "tall",
    note: "The line moves to the cuticle — quiet and unexpected.",
    finish: "Soft gloss",
    length: "Medium almond",
  },
  {
    id: "liquid-chrome",
    title: "Liquid Chrome",
    category: "chrome",
    imageId: "nails-metallic-stiletto",
    crop: "portrait",
    note: "A mirror-bright chrome rubbed to a seamless finish.",
    finish: "Mirror chrome",
    length: "Long stiletto",
    featured: true,
  },
  {
    id: "pewter-wash",
    title: "Pewter Wash",
    category: "chrome",
    imageId: "artist-tools",
    crop: "square",
    note: "A softened, brushed-metal chrome in cool grey.",
    finish: "Brushed chrome",
    length: "Medium almond",
  },
  {
    id: "aura-glow",
    title: "Aura",
    category: "glitter",
    imageId: "nails-mauve-glitter",
    crop: "portrait",
    note: "An airbrushed centre glow lifted with the finest shimmer.",
    finish: "Pearl shimmer",
    length: "Short almond",
    featured: true,
  },
  {
    id: "champagne-flecks",
    title: "Champagne Flecks",
    category: "glitter",
    imageId: "nails-mauve-glitter",
    crop: "tall",
    note: "Sheer nude carrying a scatter of warm metallic flake.",
    finish: "Fine glitter",
    length: "Medium almond",
  },
  {
    id: "pressed-petal",
    title: "Pressed Petal",
    category: "floral",
    imageId: "nails-flower",
    crop: "portrait",
    note: "Hand-painted florals kept pale and translucent.",
    finish: "Gloss over art",
    length: "Medium almond",
    featured: true,
  },
  {
    id: "ink-botanical",
    title: "Ink Botanical",
    category: "floral",
    imageId: "nails-painted-art",
    crop: "square",
    note: "Loose botanical line work in a single deep tone.",
    finish: "Matte topcoat",
    length: "Medium squoval",
  },
  {
    id: "marbled-oxblood",
    title: "Marbled Oxblood",
    category: "abstract",
    imageId: "nails-tortoiseshell",
    crop: "portrait",
    note: "Smoked marbling in oxblood and clear, no two nails alike.",
    finish: "High-gloss",
    length: "Medium almond",
    featured: true,
  },
  {
    id: "brushstroke",
    title: "Brushstroke",
    category: "abstract",
    imageId: "nails-painted-art",
    crop: "tall",
    note: "A single confident stroke of pigment per nail.",
    finish: "Gloss over art",
    length: "Long almond",
  },
  {
    id: "tortoise-glass",
    title: "Tortoise Glass",
    category: "abstract",
    imageId: "nails-tortoiseshell",
    crop: "square",
    note: "Translucent tortoiseshell built in layered amber.",
    finish: "Glass gloss",
    length: "Medium almond",
  },
  {
    id: "sculpted-relief",
    title: "Sculpted Relief",
    category: "3d",
    imageId: "signature-ornate",
    crop: "portrait",
    note: "Raised gel forms catching light along the tip.",
    finish: "Structured gel",
    length: "Long almond",
    featured: true,
  },
  {
    id: "pearl-caviar",
    title: "Pearl Caviar",
    category: "3d",
    imageId: "nails-metallic-stiletto",
    crop: "tall",
    note: "Micro-pearls set by hand into a clear dome.",
    finish: "Embellished",
    length: "Long stiletto",
  },
  {
    id: "gilded-baroque",
    title: "Gilded Baroque",
    category: "custom",
    imageId: "signature-ornate",
    crop: "portrait",
    note: "Navy, bone and gold worked into a bespoke motif.",
    finish: "Hand-painted",
    length: "Long almond",
    featured: true,
  },
  {
    id: "monogram",
    title: "Monogram",
    category: "custom",
    imageId: "nails-painted-art",
    crop: "square",
    note: "A initial or date lettered onto an accent nail.",
    finish: "Hand-lettered",
    length: "Medium almond",
  },
  {
    id: "colour-story",
    title: "Colour Story",
    category: "custom",
    imageId: "hero-primary",
    crop: "wide",
    note: "A palette built around one object you bring to the visit.",
    finish: "Bespoke",
    length: "Your choice",
  },
  {
    id: "silk-bride",
    title: "Silk",
    category: "bridal",
    imageId: "nails-pink-clean",
    crop: "portrait",
    note: "The quietest bridal — sheer, luminous, nothing loud.",
    finish: "High-gloss",
    length: "Short almond",
    featured: true,
  },
  {
    id: "pearl-bride",
    title: "Pearl & Lace",
    category: "bridal",
    imageId: "nails-flower",
    crop: "tall",
    note: "Fine lace line work with a single set pearl.",
    finish: "Embellished",
    length: "Medium almond",
  },
  {
    id: "ivory-chrome-bride",
    title: "Ivory Chrome",
    category: "bridal",
    imageId: "nails-metallic-stiletto",
    crop: "square",
    note: "A warm pearl-chrome that photographs soft, not shiny.",
    finish: "Pearl chrome",
    length: "Medium almond",
  },
  {
    id: "almond-extension",
    title: "Almond Extension",
    category: "extensions",
    imageId: "nails-metallic-stiletto",
    crop: "portrait",
    note: "Added length in a natural almond, kept believable.",
    finish: "Builder gel",
    length: "Long almond",
    featured: true,
  },
  {
    id: "square-extension",
    title: "Squared Extension",
    category: "extensions",
    imageId: "artist-tools",
    crop: "square",
    note: "A strong squared silhouette on a nude base.",
    finish: "Builder gel",
    length: "Long square",
  },
  {
    id: "lacquer-red",
    title: "Atelier Red",
    category: "custom",
    imageId: "hero-primary",
    crop: "portrait",
    note: "The house red — a deep, unbroken high-gloss lacquer.",
    finish: "High-gloss",
    length: "Short almond",
    featured: true,
  },
  {
    id: "editorial-black",
    title: "Editorial Black",
    category: "abstract",
    imageId: "nails-tortoiseshell",
    crop: "wide",
    note: "Flat black with one gloss-on-matte detail.",
    finish: "Matte + gloss",
    length: "Long almond",
  },
  {
    id: "glass-gloss",
    title: "Glass Gloss",
    category: "minimal",
    imageId: "hero-portrait",
    crop: "square",
    note: "Clear builder buffed to a wet-look shine.",
    finish: "Glass gloss",
    length: "Medium almond",
  },
];

export const signatureSets = designs.filter((d) => d.featured);

export function getDesign(id: string) {
  return designs.find((d) => d.id === id) ?? null;
}

export function designsByCategory(cat: DesignCategory | "all") {
  return cat === "all" ? designs : designs.filter((d) => d.category === cat);
}
