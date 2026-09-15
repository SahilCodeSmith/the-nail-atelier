"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Lightbox } from "@/components/gallery/lightbox";
import { SmartImage } from "@/components/media/smart-image";
import {
  designs,
  GALLERY_CATEGORIES,
  CATEGORY_ACCENT,
  CATEGORY_LABEL,
  type DesignCategory,
} from "@/lib/data/designs";
import { ACCENT_CHIP_ACTIVE, ACCENT_CHIP_ACTIVE_MUTED, ACCENT_DOT } from "@/lib/config/accent";
import { SIZES } from "@/lib/data/images";
import { cn } from "@/lib/utils";

type Cat = DesignCategory | "all";

function isCat(v: string | null): v is Cat {
  return !!v && GALLERY_CATEGORIES.some((c) => c.slug === v);
}

export function GalleryExperience() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = searchParams.get("category");

  const [cat, setCat] = React.useState<Cat>(isCat(initial) ? initial : "all");
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const items = React.useMemo(
    () => (cat === "all" ? designs : designs.filter((d) => d.category === cat)),
    [cat],
  );

  const counts = React.useMemo(() => {
    const map: Record<string, number> = { all: designs.length };
    for (const c of GALLERY_CATEGORIES) {
      if (c.slug === "all") continue;
      map[c.slug] = designs.filter((d) => d.category === c.slug).length;
    }
    return map;
  }, []);

  function selectCat(next: Cat) {
    setCat(next);
    setLightboxIndex(null);
    const url = next === "all" ? "/gallery" : `/gallery?category=${next}`;
    router.replace(url, { scroll: false });
  }

  return (
    <>
      {/* filter bar */}
      <div className="sticky top-[var(--nav-h)] z-30 -mx-gutter mb-10 border-y border-sand bg-bone/90 px-gutter py-3.5 backdrop-blur-md">
        <div
          role="tablist"
          aria-label="Filter the gallery by category"
          className="flex snap-x gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {GALLERY_CATEGORIES.map((c) => {
            const active = cat === c.slug;
            const accent = c.slug === "all" ? null : CATEGORY_ACCENT[c.slug];
            return (
              <button
                key={c.slug}
                role="tab"
                aria-selected={active}
                onClick={() => selectCat(c.slug)}
                className={cn(
                  "shrink-0 snap-start rounded-xs border px-3.5 py-1.5 font-sans text-[0.8125rem] tracking-[0.02em] transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.96] motion-reduce:active:scale-100",
                  active
                    ? accent
                      ? ACCENT_CHIP_ACTIVE[accent]
                      : "border-ink bg-ink text-bone"
                    : "border-sand bg-transparent text-char hover:border-greige",
                )}
              >
                {c.label}
                <span
                  className={cn(
                    "ml-1.5 font-mono text-[0.625rem]",
                    active
                      ? accent
                        ? ACCENT_CHIP_ACTIVE_MUTED[accent]
                        : "text-bone/60"
                      : "text-greige",
                  )}
                >
                  {counts[c.slug]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mb-8 font-mono text-meta text-greige" aria-live="polite">
        {items.length} {items.length === 1 ? "look" : "looks"}
        {cat !== "all" ? ` · ${CATEGORY_LABEL[cat as DesignCategory]}` : ""}
      </p>

      {/* editorial masonry */}
      <div
        key={cat}
        className="columns-2 gap-4 md:columns-3 md:gap-6 xl:columns-4 [column-fill:_balance]"
      >
        {items.map((d, i) => (
          <figure
            key={d.id}
            className="mb-4 break-inside-avoid motion-safe:animate-fade-in md:mb-6"
            style={{ animationDelay: `${Math.min(i * 0.035, 0.4)}s` }}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group relative block w-full overflow-hidden bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              aria-label={`View ${d.title} — ${d.note}`}
            >
              <SmartImage
                id={d.imageId}
                sizes={SIZES.gallery}
                focal={d.focal}
                reqWidth={900}
                imgClassName="transition-transform duration-[1.1s] ease-out-expo group-hover:scale-[1.05] motion-reduce:transform-none"
              />
              <span
                className="pointer-events-none absolute inset-0 flex items-end justify-between gap-2 bg-gradient-to-t from-ink/60 via-ink/0 to-ink/0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              >
                <span className="font-display text-d-sm text-bone">{d.title}</span>
                <span className="inline-flex items-center gap-1 self-end rounded-xs bg-bone/95 px-2.5 py-1.5 font-sans text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-ink">
                  Book <ArrowUpRight className="size-3" />
                </span>
              </span>
            </button>
            <figcaption className="mt-3 flex items-baseline justify-between gap-3 border-t border-sand pt-2.5">
              <span className="font-sans text-[0.8125rem] text-char">{d.title}</span>
              <span className="inline-flex items-center gap-1.5 font-sans text-[0.625rem] uppercase tracking-[0.16em] text-greige">
                <span
                  className={cn("size-1.5 rounded-full", ACCENT_DOT[CATEGORY_ACCENT[d.category]])}
                  aria-hidden
                />
                {CATEGORY_LABEL[d.category]}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {items.length === 0 && (
        <div className="border border-dashed border-sand p-12 text-center">
          <p className="text-[0.9375rem] text-char/70">
            Nothing in this category yet.
          </p>
        </div>
      )}

      <div className="mt-16 flex flex-col items-start gap-3 border-t border-sand pt-8">
        <Link
          href="/book"
          className="font-display text-d-sm text-ink u-underline decoration-sand"
        >
          Bring your own reference to a booking →
        </Link>
        <p className="font-mono text-meta text-greige">
          Development imagery is licensed stock — replaceable, not the atelier&rsquo;s
          own client work.
        </p>
      </div>

      <Lightbox
        items={items}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
}
