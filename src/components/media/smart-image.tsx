"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getImage, sizedSrc, type ImageAsset } from "@/lib/data/images";

type SmartImageProps = {
  id?: string;
  asset?: ImageAsset;
  className?: string;
  imgClassName?: string;
  sizes: string;
  priority?: boolean;
  focal?: { x: number; y: number };
  reqWidth?: number;
  plateLabel?: string;
  fill?: boolean;
};

const RATIO_PAD: Record<ImageAsset["ratio"], string> = {
  "4/5": "125%",
  "3/4": "133.333%",
  "1/1": "100%",
  "4/3": "75%",
  "3/2": "66.666%",
  "16/7": "43.75%",
};

/**
 * Central image renderer. Shows a branded plate when there is no source or the
 * image errors. Image visibility is NOT gated on a JS load event (that can miss
 * cached images) — a skeleton sits behind the <img> and is covered on paint.
 */
export function SmartImage({
  id,
  asset,
  className,
  imgClassName,
  sizes,
  priority,
  focal,
  reqWidth = 1400,
  plateLabel,
  fill,
}: SmartImageProps) {
  const img = asset ?? getImage(id ?? "");
  const [errored, setErrored] = React.useState(false);

  const point = focal ?? img.focal;
  const objectPosition = `${point.x * 100}% ${point.y * 100}%`;

  const wrapperClass = cn(
    "relative overflow-hidden bg-mist",
    !fill && "w-full",
    className,
  );

  if (!img.base || errored) {
    return (
      <div
        className={cn(wrapperClass, "bg-gradient-to-br from-mist to-sand/50")}
        style={fill ? undefined : { paddingBottom: RATIO_PAD[img.ratio] }}
        role="img"
        aria-label={img.alt || plateLabel || "Photograph coming soon"}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
          <span className="h-px w-8 bg-champagne" aria-hidden />
          <span className="font-display text-d-sm text-char/70">
            {plateLabel ?? "The Nail Atelier"}
          </span>
          <span className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-greige">
            Photograph coming soon
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={wrapperClass}
      style={fill ? undefined : { paddingBottom: RATIO_PAD[img.ratio] }}
    >
      <div
        className="absolute inset-0 animate-pulse bg-gradient-to-br from-mist to-sand/60 motion-reduce:animate-none"
        aria-hidden
      />
      <Image
        src={sizedSrc(img.base, { w: reqWidth })}
        alt={img.alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setErrored(true)}
        className={cn(
          "object-cover [filter:saturate(0.92)_contrast(1.02)_brightness(1.01)]",
          imgClassName,
        )}
        style={{ objectPosition }}
      />
      {/* warm unifying wash so licensed stock reads as one set */}
      <div
        className="pointer-events-none absolute inset-0 bg-clay/10 mix-blend-multiply"
        aria-hidden
      />
    </div>
  );
}
