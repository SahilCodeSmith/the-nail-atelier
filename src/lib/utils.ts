import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge configured with this project's custom design tokens so it does
 * not strip e.g. `text-d-2xl` when it is combined with `text-ink`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "d-2xl",
            "d-xl",
            "d-lg",
            "d-md",
            "d-sm",
            "lead",
            "eyebrow",
            "meta",
          ],
        },
      ],
      rounded: [{ rounded: ["xs"] }],
    },
  },
});

/** Merge conditional class names, resolving Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format an INR amount. Returns null-safe placeholder handling upstream. */
export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Stable, human-friendly booking reference, e.g. TNA-7F3K2. */
export function makeBookingRef(seed = Date.now()) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let n = Math.abs(Math.floor(seed)) ^ Math.floor(Math.random() * 1e9);
  let out = "";
  for (let i = 0; i < 5; i++) {
    out += alphabet[n % alphabet.length];
    n = Math.floor(n / alphabet.length) + 7;
  }
  return `TNA-${out}`;
}

/** Title-case a slug for display fallbacks. */
export function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
