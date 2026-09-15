import type { CATEGORY_ACCENT } from "@/lib/data/designs";

export type AccentKey = (typeof CATEGORY_ACCENT)[keyof typeof CATEGORY_ACCENT];

/**
 * Static class lookups per accent — Tailwind's JIT scanner needs literal
 * class strings, so these can't be built with template interpolation.
 */
export const ACCENT_DOT: Record<AccentKey, string> = {
  lacquer: "bg-lacquer",
  coral: "bg-coral",
  champagne: "bg-champagne",
  teal: "bg-teal",
  plum: "bg-plum",
};

export const ACCENT_TEXT: Record<AccentKey, string> = {
  lacquer: "text-lacquer",
  coral: "text-coral",
  champagne: "text-champagne",
  teal: "text-teal",
  plum: "text-plum",
};

export const ACCENT_GROUP_HOVER_TEXT: Record<AccentKey, string> = {
  lacquer: "group-hover:text-lacquer",
  coral: "group-hover:text-coral",
  champagne: "group-hover:text-champagne",
  teal: "group-hover:text-teal",
  plum: "group-hover:text-plum",
};

/** Active filter chip — text colour picked per swatch for AA contrast. */
export const ACCENT_CHIP_ACTIVE: Record<AccentKey, string> = {
  lacquer: "border-lacquer bg-lacquer text-bone",
  coral: "border-coral bg-coral text-ink",
  champagne: "border-champagne bg-champagne text-ink",
  teal: "border-teal bg-teal text-bone",
  plum: "border-plum bg-plum text-bone",
};

export const ACCENT_CHIP_ACTIVE_MUTED: Record<AccentKey, string> = {
  lacquer: "text-bone/60",
  coral: "text-ink/55",
  champagne: "text-ink/55",
  teal: "text-bone/60",
  plum: "text-bone/60",
};

/** Fixed rotation used to spread colour across cards/lists by index. */
export const ACCENT_CYCLE: AccentKey[] = ["lacquer", "coral", "teal", "plum", "champagne"];

export function accentAt(index: number): AccentKey {
  return ACCENT_CYCLE[index % ACCENT_CYCLE.length];
}
