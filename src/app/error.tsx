"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { whatsappHref, generalEnquiryMessage } from "@/lib/whatsapp";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="grid min-h-[70vh] place-items-center px-gutter py-section">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <p className="u-eyebrow u-eyebrow--center">Something went wrong</p>
        <h1 className="font-display text-d-lg text-ink">
          A small snag on our side
        </h1>
        <p className="text-[0.9375rem] leading-relaxed text-char/75">
          Try again — if it keeps happening, message us and we&rsquo;ll take your
          booking directly.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button onClick={reset} variant="primary" size="md">
            Try again
          </Button>
          <a
            href={whatsappHref(generalEnquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[0.9375rem] text-ink u-underline"
          >
            Message on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
