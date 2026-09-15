"use client";

import * as React from "react";
import Image from "next/image";
import { UploadCloud, X, ImageOff } from "lucide-react";
import { bookingConfig } from "@/lib/config/booking";
import { cn } from "@/lib/utils";

interface RefImage {
  id: string;
  name: string;
  url: string;
  size: number;
  error?: string;
}

const MAX = bookingConfig.maxReferenceImages;
const MAX_BYTES = bookingConfig.maxReferenceImageMB * 1024 * 1024;

export function ReferenceUpload({
  onChange,
}: {
  onChange: (names: string[]) => void;
}) {
  const [images, setImages] = React.useState<RefImage[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);

  React.useEffect(() => {
    return () => images.forEach((i) => URL.revokeObjectURL(i.url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    onChange(images.filter((i) => !i.error).map((i) => i.name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  function addFiles(files: FileList | null) {
    if (!files) return;
    const room = MAX - images.length;
    const next: RefImage[] = [];
    Array.from(files)
      .slice(0, room)
      .forEach((file) => {
        const base: RefImage = {
          id: `${file.name}-${file.size}-${crypto.randomUUID()}`,
          name: file.name,
          url: URL.createObjectURL(file),
          size: file.size,
        };
        if (!file.type.startsWith("image/")) base.error = "Not an image file";
        else if (file.size > MAX_BYTES)
          base.error = `Over ${bookingConfig.maxReferenceImageMB}MB`;
        next.push(base);
      });
    setImages((prev) => [...prev, ...next]);
  }

  function remove(id: string) {
    setImages((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) URL.revokeObjectURL(found.url);
      return prev.filter((i) => i.id !== id);
    });
  }

  const full = images.length >= MAX;

  return (
    <div className="flex flex-col gap-4">
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!full) addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center gap-2 rounded-xs border border-dashed px-6 py-9 text-center transition-colors",
          dragging ? "border-lacquer bg-lacquer-tint/40" : "border-sand bg-porcelain",
          full && "pointer-events-none opacity-50",
        )}
      >
        <UploadCloud className="size-6 text-greige" aria-hidden />
        <span className="font-sans text-[0.875rem] text-char">
          {full
            ? `Maximum ${MAX} images added`
            : "Drop images here, or tap to choose"}
        </span>
        <span className="font-mono text-[0.6875rem] text-greige">
          Up to {MAX} · {bookingConfig.maxReferenceImageMB}MB each · optional
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </label>

      {images.length > 0 && (
        <ul className="grid grid-cols-3 gap-3">
          {images.map((img) => (
            <li
              key={img.id}
              className="group relative aspect-square overflow-hidden rounded-xs border border-sand bg-mist"
            >
              {img.error ? (
                <div className="flex h-full flex-col items-center justify-center gap-1 p-2 text-center">
                  <ImageOff className="size-5 text-error" aria-hidden />
                  <span className="text-[0.625rem] text-error">{img.error}</span>
                </div>
              ) : (
                <Image
                  src={img.url}
                  alt={`Reference: ${img.name}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                  unoptimized
                />
              )}
              <button
                type="button"
                onClick={() => remove(img.id)}
                className="absolute right-1 top-1 grid size-6 place-items-center rounded-xs bg-ink/80 text-bone opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
                aria-label={`Remove ${img.name}`}
              >
                <X className="size-3.5" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}

      {images.length > 0 && (
        <button
          type="button"
          onClick={() => {
            images.forEach((i) => URL.revokeObjectURL(i.url));
            setImages([]);
          }}
          className="self-start font-sans text-[0.75rem] uppercase tracking-[0.14em] text-greige u-underline"
        >
          Clear all
        </button>
      )}

      <p className="rounded-xs bg-mist/60 p-3 text-[0.8125rem] leading-relaxed text-char/75">
        Images stay on your device — they are not uploaded here. Your request
        notes how many you have, and you share them with Rakshit in the WhatsApp
        chat.
      </p>
    </div>
  );
}
