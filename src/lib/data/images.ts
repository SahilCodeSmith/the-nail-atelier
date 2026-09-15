/**
 * CENTRAL IMAGE REGISTRY — the only file in the project that holds image URLs.
 *
 * Development imagery is licensed stock from Unsplash (free license, no
 * attribution required — we credit anyway). None of it is The Nail Atelier's
 * own work. Every entry is a slot: drop Rakshit's photograph in at the same
 * `id`, set `source: "atelier"`, clear `credit`, and nothing else changes.
 *
 * Components must never import an Unsplash URL directly — use getImage(id)
 * or the <SmartImage> component.
 */

export type ImageSource = "unsplash" | "atelier";

export interface ImageCredit {
  name: string;
  url: string;
}

export interface ImageAsset {
  id: string;
  /** Base CDN url WITHOUT query params, or null → SmartImage renders a branded plate. */
  base: string | null;
  source: ImageSource;
  credit: ImageCredit | null;
  /** Real, descriptive alt text. */
  alt: string;
  /** Intrinsic-ish ratio used for layout when not overridden. */
  ratio: "4/5" | "3/4" | "1/1" | "4/3" | "3/2" | "16/7";
  /** object-position, 0..1. */
  focal: { x: number; y: number };
  isPlaceholder: boolean;
}

const U = (id: string): string => `https://images.unsplash.com/${id}`;

function asset(
  id: string,
  base: string | null,
  alt: string,
  ratio: ImageAsset["ratio"],
  credit: ImageCredit | null,
  focal: { x: number; y: number } = { x: 0.5, y: 0.4 },
): ImageAsset {
  return {
    id,
    base,
    source: base ? "unsplash" : "atelier",
    credit,
    alt,
    ratio,
    focal,
    isPlaceholder: true,
  };
}

const REGISTRY: Record<string, ImageAsset> = {
  "hero-primary": asset(
    "hero-primary",
    U("photo-1748163432725-454f46f68340"),
    "A hand resting on a soft surface, nails lacquered in a deep glossy red, lit by low afternoon light",
    "3/2",
    { name: "photo koala", url: "https://unsplash.com/@koalaaaah" },
    { x: 0.62, y: 0.5 },
  ),
  "hero-portrait": asset(
    "hero-portrait",
    U("photo-1457972729786-0411a3b2b626"),
    "Close view of red polish being applied to fingernails during an appointment",
    "4/5",
    { name: "Kris Atomic", url: "https://unsplash.com/@krisatomic" },
    { x: 0.5, y: 0.45 },
  ),
  "signature-ornate": asset(
    "signature-ornate",
    U("photo-1754799670312-8e7da8e40ad7"),
    "Hands with an ornate navy, gold and white hand-painted nail set",
    "4/5",
    { name: "Ari Kurniawan", url: "https://unsplash.com/@arikurniawan" },
    { x: 0.5, y: 0.42 },
  ),
  "nails-mauve-glitter": asset(
    "nails-mauve-glitter",
    U("photo-1607779097040-26e80aa78e66"),
    "A hand with mauve nails finished in a fine glitter topcoat",
    "4/5",
    { name: "Patrícia Hellinger", url: "https://unsplash.com/@newleonin" },
    { x: 0.5, y: 0.4 },
  ),
  "nails-tortoiseshell": asset(
    "nails-tortoiseshell",
    U("photo-1604654894610-df63bc536371"),
    "A hand with black and tortoiseshell painted nails against a dark ground",
    "4/5",
    { name: "Bryony Elena", url: "https://unsplash.com/@b_elena" },
    { x: 0.5, y: 0.4 },
  ),
  "nails-pink-clean": asset(
    "nails-pink-clean",
    U("photo-1610992015762-45dca7fa3a85"),
    "A hand with a clean, sheer pale-pink manicure",
    "4/5",
    { name: "Chelson Tamares", url: "https://unsplash.com/@jd_chon" },
    { x: 0.5, y: 0.38 },
  ),
  "nails-white-brushwork": asset(
    "nails-white-brushwork",
    U("photo-1633955726992-2b7c0d2d2a69"),
    "Hands with a soft white polish and minimal brush detailing",
    "4/5",
    { name: "Alazar Kassahun", url: "https://unsplash.com/@alazar_k5" },
    { x: 0.5, y: 0.42 },
  ),
  "nails-white-minimal": asset(
    "nails-white-minimal",
    U("photo-1630843599725-32ead7671867"),
    "A single hand with a bright white minimal manicure",
    "3/4",
    { name: "Ellie Eshaghi", url: "https://unsplash.com/@eliiesh" },
    { x: 0.5, y: 0.4 },
  ),
  "nails-painted-art": asset(
    "nails-painted-art",
    U("photo-1659391542239-9648f307c0b1"),
    "A pair of hands with an expressive hand-painted nail-art design",
    "4/5",
    { name: "Stefan Lehner", url: "https://unsplash.com/@st_lehner" },
    { x: 0.5, y: 0.42 },
  ),
  "nails-flower": asset(
    "nails-flower",
    U("photo-1736434518489-0eb84070017f"),
    "A softly manicured hand holding a single flower",
    "4/5",
    { name: "Caroline Badran", url: "https://unsplash.com/@___atmos" },
    { x: 0.5, y: 0.42 },
  ),
  "nails-metallic-stiletto": asset(
    "nails-metallic-stiletto",
    U("photo-1777287216954-2b4b22bb6bf2"),
    "Long stiletto nails in a metallic chrome finish with jewelled accents",
    "4/5",
    { name: "de Aura", url: "https://unsplash.com/@deaura2026" },
    { x: 0.5, y: 0.4 },
  ),
  "still-polish-shelf": asset(
    "still-polish-shelf",
    U("photo-1619607146034-5a05296c8f9a"),
    "Rows of nail-polish bottles arranged on warm-toned shelving",
    "4/3",
    { name: "H&CO", url: "https://unsplash.com/@hngstrm" },
    { x: 0.5, y: 0.5 },
  ),
  "still-polish-bottle": asset(
    "still-polish-bottle",
    U("photo-1544816135-b44f18b3c5d6"),
    "A single nail-polish bottle photographed as a still life in soft light",
    "1/1",
    { name: "Kelly Sikkema", url: "https://unsplash.com/@kellysikkema" },
    { x: 0.5, y: 0.5 },
  ),
  "texture-brush": asset(
    "texture-brush",
    U("photo-1616427592814-195c30c24ea3"),
    "Macro detail of a fine paint brush loaded with colour",
    "16/7",
    { name: "Maria Lupan", url: "https://unsplash.com/@luandmario" },
    { x: 0.4, y: 0.5 },
  ),
  "artist-applying": asset(
    "artist-applying",
    U("photo-1693776529070-2cdea397595b"),
    "A nail artist carefully applying gel to a client's nails",
    "3/2",
    { name: "Anna Keibalo", url: "https://unsplash.com/@anyutakejbalo" },
    { x: 0.45, y: 0.5 },
  ),
  "artist-tools": asset(
    "artist-tools",
    U("photo-1613457492120-4fcfbb7c3a5b"),
    "Close view of a manicure in progress with brushed-steel tools",
    "4/5",
    { name: "Jona Novak", url: "https://unsplash.com/@jonanovak" },
    { x: 0.5, y: 0.5 },
  ),

  // ---- Reserved slots with no stock stand-in (branded plate) --------
  "portrait-rakshit": asset(
    "portrait-rakshit",
    null,
    "Portrait of Rakshit, founder of The Nail Atelier — photograph to be added",
    "4/5",
    null,
  ),
};

export const IMAGE_IDS = Object.keys(REGISTRY);

export function getImage(id: string): ImageAsset {
  const found = REGISTRY[id];
  if (found) return found;
  if (process.env.NODE_ENV !== "production") {
    // Surface the miss loudly in dev, but never crash a render.
    console.warn(`[images] unknown image id "${id}" — using a branded plate`);
  }
  return {
    id,
    base: null,
    source: "atelier",
    credit: null,
    alt: "",
    ratio: "4/5",
    focal: { x: 0.5, y: 0.5 },
    isPlaceholder: true,
  };
}

/** Build a sized Unsplash URL from a registry base. */
export function sizedSrc(
  base: string,
  opts: { w: number; h?: number; q?: number } = { w: 1400 },
): string {
  const { w, h, q = 78 } = opts;
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    q: String(q),
    w: String(w),
  });
  if (h) params.set("h", String(h));
  return `${base}?${params.toString()}`;
}

/** Responsive `sizes` presets. */
export const SIZES = {
  hero: "100vw",
  half: "(min-width: 1024px) 50vw, 100vw",
  card: "(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 90vw",
  gallery:
    "(min-width: 1280px) 28vw, (min-width: 768px) 33vw, (min-width: 480px) 50vw, 92vw",
  thumb: "(min-width: 640px) 20vw, 40vw",
} as const;
