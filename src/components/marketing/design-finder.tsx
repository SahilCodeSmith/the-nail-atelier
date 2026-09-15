"use client";

import * as React from "react";
import { Section, SectionHeading } from "@/components/ui/layout-primitives";
import { ButtonLink } from "@/components/ui/button";
import { DesignCard } from "@/components/marketing/design-card";
import {
  designs,
  GALLERY_CATEGORIES,
  CATEGORY_ACCENT,
  type DesignCategory,
} from "@/lib/data/designs";
import { ACCENT_CHIP_ACTIVE } from "@/lib/config/accent";
import { SIZES } from "@/lib/data/images";
import { cn } from "@/lib/utils";

const LENGTHS = ["Any", "Short", "Medium", "Long"] as const;
const FINISHES = ["Any", "Gloss", "Matte", "Chrome", "Shimmer"] as const;

function matchLength(len: string | undefined, choice: string) {
  if (choice === "Any" || !len) return true;
  return len.toLowerCase().includes(choice.toLowerCase());
}
function matchFinish(fin: string | undefined, choice: string) {
  if (choice === "Any" || !fin) return true;
  return fin.toLowerCase().includes(choice.toLowerCase());
}

function Chip({
  active,
  children,
  onClick,
  activeClassName = "border-lacquer bg-lacquer text-bone",
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  activeClassName?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-xs border px-3.5 py-2 font-sans text-[0.8125rem] tracking-[0.01em] transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.96] motion-reduce:active:scale-100",
        active ? activeClassName : "border-sand bg-porcelain text-char hover:border-greige",
      )}
    >
      {children}
    </button>
  );
}

export function DesignFinder() {
  const [cat, setCat] = React.useState<DesignCategory | "all">("all");
  const [len, setLen] = React.useState<(typeof LENGTHS)[number]>("Any");
  const [fin, setFin] = React.useState<(typeof FINISHES)[number]>("Any");

  const results = React.useMemo(() => {
    return designs
      .filter((d) => (cat === "all" ? true : d.category === cat))
      .filter((d) => matchLength(d.length, len))
      .filter((d) => matchFinish(d.finish, fin))
      .slice(0, 6);
  }, [cat, len, fin]);

  const galleryHref = cat === "all" ? "/gallery" : `/gallery?category=${cat}`;

  return (
    <Section id="finder" ground="coral" space="lg" aria-label="Design finder">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Design finder"
            title="Not sure where to start?"
            lede="Set a direction and see it narrow. Take any result straight into a booking, or explore the whole set in the gallery."
          />

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-2 font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-greige">
              Style
            </legend>
            <div className="flex flex-wrap gap-2">
              {GALLERY_CATEGORIES.map((c) => (
                <Chip
                  key={c.slug}
                  active={cat === c.slug}
                  onClick={() => setCat(c.slug)}
                  activeClassName={
                    c.slug === "all" ? undefined : ACCENT_CHIP_ACTIVE[CATEGORY_ACCENT[c.slug]]
                  }
                >
                  {c.label}
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-2 font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-greige">
              Length
            </legend>
            <div className="flex flex-wrap gap-2">
              {LENGTHS.map((l) => (
                <Chip key={l} active={len === l} onClick={() => setLen(l)}>
                  {l}
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-2 font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-greige">
              Finish
            </legend>
            <div className="flex flex-wrap gap-2">
              {FINISHES.map((f) => (
                <Chip key={f} active={fin === f} onClick={() => setFin(f)}>
                  {f}
                </Chip>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-sand pt-6">
            <p className="font-mono text-meta text-greige" aria-live="polite">
              {results.length
                ? `${results.length} direction${results.length > 1 ? "s" : ""} to explore`
                : "No exact match — widen a filter or ask Rakshit"}
            </p>
            <ButtonLink href={galleryHref} variant="link" size="md">
              Open in the gallery
            </ButtonLink>
          </div>
        </div>

        <div className="min-h-[24rem]">
          {results.length ? (
            <div
              key={`${cat}-${len}-${fin}`}
              className="grid grid-cols-2 gap-x-5 gap-y-10 motion-safe:animate-fade-in sm:grid-cols-3"
            >
              {results.map((d) => (
                <DesignCard key={d.id} design={d} sizes={SIZES.thumb} />
              ))}
            </div>
          ) : (
            <div className="flex h-full min-h-[24rem] items-center justify-center border border-dashed border-sand p-8 text-center">
              <p className="max-w-[28ch] text-[0.9375rem] text-char/70">
                Nothing matches that combination yet. Loosen a filter, or bring
                your own reference to the booking.
              </p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
