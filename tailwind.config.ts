import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

/**
 * The Nail Atelier — design tokens.
 * Values mirror the approved design system (Appendix A).
 * Do not add ad-hoc colours/sizes in components; extend here.
 */
const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bone: "#FAF6F2",
        porcelain: "#FFFFFF",
        mist: "#F1ECE5",
        sand: "#E6DED5",
        greige: "#96897E",
        ink: "#1A1613",
        espresso: "#26211C",
        char: "#3B342C",
        lacquer: {
          DEFAULT: "#E31C6B",
          deep: "#A6114F",
          tint: "#FCE1EC",
        },
        champagne: {
          DEFAULT: "#E8A631",
          light: "#F6C868",
          tint: "#FBEDD4",
        },
        coral: {
          DEFAULT: "#FF5A45",
          deep: "#D63C29",
          tint: "#FFE3DC",
        },
        teal: {
          DEFAULT: "#0E8F82",
          deep: "#0A6960",
          tint: "#DBF3EF",
        },
        plum: {
          DEFAULT: "#7C2E8C",
          deep: "#591F65",
          tint: "#F0E0F4",
        },
        clay: "#E8927C",
        success: "#3F8F5C",
        error: "#D6314A",
        warning: "#C6811F",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      fontSize: {
        "d-2xl": [
          "clamp(2.75rem, 1.55rem + 5.6vw, 5.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.022em" },
        ],
        "d-xl": [
          "clamp(2.25rem, 1.5rem + 3.4vw, 4rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "d-lg": [
          "clamp(2rem, 1.55rem + 2.2vw, 3rem)",
          { lineHeight: "1.08", letterSpacing: "-0.016em" },
        ],
        "d-md": [
          "clamp(1.6rem, 1.35rem + 1.3vw, 2.25rem)",
          { lineHeight: "1.14", letterSpacing: "-0.012em" },
        ],
        "d-sm": [
          "clamp(1.35rem, 1.2rem + 0.8vw, 1.6875rem)",
          { lineHeight: "1.2", letterSpacing: "-0.006em" },
        ],
        lead: [
          "clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem)",
          { lineHeight: "1.55" },
        ],
        eyebrow: ["0.8125rem", { lineHeight: "1", letterSpacing: "0.16em" }],
        meta: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.02em" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        gutter: "clamp(1.25rem, 5vw, 4rem)",
        "section-sm": "clamp(3.5rem, 6vw, 6rem)",
        section: "clamp(5rem, 9vw, 9rem)",
        "section-lg": "clamp(7rem, 12vw, 12.5rem)",
      },
      maxWidth: {
        measure: "68ch",
        prose: "53rem",
        content: "80rem",
        wide: "90rem",
      },
      borderRadius: {
        none: "0",
        DEFAULT: "2px",
        xs: "2px",
        sm: "4px",
        md: "8px",
        full: "9999px",
      },
      boxShadow: {
        none: "none",
        float:
          "0 1px 2px rgba(26,22,19,.04), 0 16px 40px -16px rgba(26,22,19,.14)",
        plate: "0 1px 2px rgba(26,22,19,.05), 0 24px 60px -28px rgba(26,22,19,.18)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
        standard: "cubic-bezier(0.2, 0, 0, 1)",
      },
      transitionDuration: {
        "120": "120ms",
        "450": "450ms",
        "600": "600ms",
        "900": "900ms",
      },
      screens: {
        xs: "400px",
      },
      aspectRatio: {
        plate: "4 / 5",
        hero: "3 / 2",
        interstitial: "16 / 7",
      },
      letterSpacing: {
        eyebrow: "0.16em",
        widest2: "0.24em",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scroll-hint": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.35" },
          "50%": { transform: "translateY(6px)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 240ms cubic-bezier(0.2,0,0,1)",
        "accordion-up": "accordion-up 240ms cubic-bezier(0.2,0,0,1)",
        marquee: "marquee 42s linear infinite",
        "fade-in": "fade-in 600ms cubic-bezier(0.16,1,0.3,1) both",
        "fade-up": "fade-up 700ms cubic-bezier(0.16,1,0.3,1) both",
        "scroll-hint": "scroll-hint 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
