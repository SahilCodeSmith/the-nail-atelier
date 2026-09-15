"use client";

import * as React from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { X, ArrowLeft, ArrowRight, Loader2, ImageOff, MessageCircle } from "lucide-react";
import { CATEGORY_LABEL, type DesignItem } from "@/lib/data/designs";
import { getImage, sizedSrc } from "@/lib/data/images";
import { ButtonLink } from "@/components/ui/button";
import { whatsappHref, designEnquiryMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface LightboxProps {
  items: DesignItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

/** Keyed per image so load state resets on navigation without an effect. */
function LightboxStage({ imageId }: { imageId: string }) {
  const [status, setStatus] = React.useState<"loading" | "loaded" | "error">(
    "loading",
  );
  const img = getImage(imageId);

  if (!img.base || status === "error") {
    return (
      <div className="flex flex-col items-center gap-3 text-bone/60">
        <ImageOff className="size-8" aria-hidden />
        <p className="text-sm">Image unavailable</p>
      </div>
    );
  }

  return (
    <>
      <Image
        src={sizedSrc(img.base, { w: 1600, q: 82 })}
        alt={img.alt}
        fill
        sizes="(min-width: 1024px) 60vw, 92vw"
        className={cn(
          "object-contain transition-opacity duration-500",
          status === "loaded" ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        priority
      />
      {status === "loading" && (
        <div className="absolute inset-0 grid place-items-center">
          <Loader2
            className="size-6 animate-spin text-bone/60 motion-reduce:animate-none"
            aria-hidden
          />
        </div>
      )}
    </>
  );
}

export function Lightbox({ items, index, onClose, onIndexChange }: LightboxProps) {
  const open = index !== null;
  const current = open ? items[index] : null;
  const startX = React.useRef<number | null>(null);

  const go = React.useCallback(
    (delta: number) => {
      if (index === null || items.length === 0) return;
      const nextIndex = (index + delta + items.length) % items.length;
      onIndexChange(nextIndex);
    },
    [index, items.length, onIndexChange],
  );

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  if (!current || index === null) return null;

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-espresso/92 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content
          className="fixed inset-0 z-[70] flex flex-col outline-none data-[state=open]:animate-fade-in"
          aria-label={`${current.title} — ${current.note}`}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-4 text-bone/80 sm:px-6">
            <span className="font-mono text-[0.75rem] tracking-[0.06em]">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")}
            </span>
            <Dialog.Close
              className="grid size-11 place-items-center rounded-xs text-bone/80 transition-colors hover:text-bone focus-visible:outline-2 focus-visible:outline-champagne-light"
              aria-label="Close"
            >
              <X className="size-6" aria-hidden />
            </Dialog.Close>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16"
            onPointerDown={(e) => (startX.current = e.clientX)}
            onPointerUp={(e) => {
              if (startX.current === null) return;
              const dx = e.clientX - startX.current;
              if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
              startX.current = null;
            }}
          >
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-1 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-xs text-bone/70 transition-colors hover:text-bone focus-visible:outline-2 focus-visible:outline-champagne-light sm:left-4"
              aria-label="Previous look"
            >
              <ArrowLeft className="size-6" aria-hidden />
            </button>

            <div className="relative flex h-full max-h-[74vh] w-full max-w-4xl items-center justify-center">
              <div
                key={current.id}
                className="relative flex h-full w-full items-center justify-center motion-safe:animate-fade-in"
              >
                <LightboxStage imageId={current.imageId} />
              </div>
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-1 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-xs text-bone/70 transition-colors hover:text-bone focus-visible:outline-2 focus-visible:outline-champagne-light sm:right-4"
              aria-label="Next look"
            >
              <ArrowRight className="size-6" aria-hidden />
            </button>
          </div>

          <div className="flex flex-col items-center gap-4 border-t border-white/10 px-4 py-6 text-center sm:px-6">
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-baseline gap-3">
                <h2 className="font-display text-d-sm text-bone">{current.title}</h2>
                <span className="font-sans text-[0.625rem] uppercase tracking-[0.16em] text-bone/45">
                  {CATEGORY_LABEL[current.category]}
                </span>
              </div>
              <p className="max-w-[46ch] text-[0.875rem] leading-relaxed text-bone/65">
                {current.note}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <ButtonLink
                href={`/book?design=${current.id}`}
                variant="onDark"
                size="md"
                arrow
              >
                Book this look
              </ButtonLink>
              <a
                href={whatsappHref(designEnquiryMessage(current.title))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-sans text-[0.875rem] text-bone/80 underline decoration-white/30 underline-offset-[5px] transition-colors hover:text-bone hover:decoration-champagne-light"
              >
                <MessageCircle className="size-4" aria-hidden />
                Ask on WhatsApp
              </a>
            </div>
            <Link
              href="/gallery"
              onClick={onClose}
              className="font-sans text-[0.75rem] uppercase tracking-[0.16em] text-bone/40 transition-colors hover:text-bone/70"
            >
              Keep browsing
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
