import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SmartImage } from "@/components/media/smart-image";
import { CATEGORY_LABEL, type DesignItem } from "@/lib/data/designs";
import { SIZES } from "@/lib/data/images";
import { cn } from "@/lib/utils";

const CROP_RATIO: Record<DesignItem["crop"], number> = {
  tall: 1.4,
  portrait: 1.25,
  square: 1,
  wide: 0.7,
};

/** Portfolio / signature tile. Whole card is a link into the booking flow. */
export function DesignCard({
  design,
  sizes = SIZES.card,
  className,
}: {
  design: DesignItem;
  sizes?: string;
  className?: string;
}) {
  const pad = `${CROP_RATIO[design.crop] * 100}%`;
  return (
    <Link
      href={`/book?design=${design.id}`}
      className={cn(
        "group relative block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
        className,
      )}
      aria-label={`Book this look: ${design.title} — ${design.note}`}
    >
      <div className="relative overflow-hidden bg-mist" style={{ paddingBottom: pad }}>
        <div className="absolute inset-0">
          <SmartImage
            id={design.imageId}
            fill
            sizes={sizes}
            focal={design.focal}
            reqWidth={1000}
            imgClassName="object-cover transition-transform duration-[1.1s] ease-out-expo group-hover:scale-[1.05] motion-reduce:transform-none"
          />
        </div>
        {/* hover veil + CTA */}
        <div
          className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink/55 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        >
          <span className="m-4 inline-flex items-center gap-2 rounded-xs bg-bone/95 px-3 py-2 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink">
            Book this look <ArrowUpRight className="size-3.5" />
          </span>
        </div>
      </div>

      <div className="mt-3.5 flex items-start justify-between gap-3 border-t border-sand pt-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2.5">
            <h3 className="font-display text-d-sm text-ink">{design.title}</h3>
            <span className="font-sans text-[0.625rem] uppercase tracking-[0.16em] text-greige">
              {CATEGORY_LABEL[design.category]}
            </span>
          </div>
          <p className="max-w-[38ch] text-[0.8125rem] leading-relaxed text-char/70">
            {design.note}
          </p>
        </div>
        <ArrowUpRight
          className="mt-1 size-4 shrink-0 text-greige transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lacquer"
          aria-hidden
        />
      </div>
    </Link>
  );
}
