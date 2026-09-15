"use client";

import Link from "next/link";
import { Check, MessageCircle, Phone, Mail } from "lucide-react";
import type { BookingDraft } from "@/lib/booking/schema";
import { siteConfig } from "@/lib/config/site";
import { telHref, mailtoHref } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/button";
import { BookingSummary } from "@/components/booking/summary";

export function BookingSuccess({
  draft,
  bookingRef,
  whatsappUrl,
  onReset,
}: {
  draft: BookingDraft;
  bookingRef: string;
  whatsappUrl: string;
  onReset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-8 py-6 text-center motion-safe:animate-fade-in">

      <span className="grid size-14 place-items-center rounded-full border border-lacquer text-lacquer">
        <Check className="size-6" aria-hidden />
      </span>

      <div className="flex flex-col gap-3">
        <h1 className="font-display text-d-lg text-ink">Booking Request Received</h1>
        <p className="max-w-[46ch] text-lead text-char/80 text-pretty">
          This is a request, not a confirmed appointment. Send it to Rakshit on
          WhatsApp now and he&rsquo;ll reply personally to confirm the date and a
          quote.
        </p>
        <p className="font-mono text-meta text-greige">Reference {bookingRef}</p>
      </div>

      <ButtonLink
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        variant="primary"
        size="lg"
        className="w-full sm:w-auto"
      >
        <MessageCircle className="size-4" aria-hidden />
        Confirm via WhatsApp
      </ButtonLink>

      <div className="w-full text-left">
        <p className="mb-3 font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-greige">
          What you&rsquo;re sending
        </p>
        <BookingSummary draft={draft} compact />
      </div>

      <div className="flex flex-col gap-3 border-t border-sand pt-6 text-[0.875rem] text-char/75">
        <p>Prefer another way?</p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a href={telHref()} className="inline-flex items-center gap-1.5 u-underline">
            <Phone className="size-3.5" aria-hidden /> {siteConfig.contact.phoneDisplay}
          </a>
          <a
            href={mailtoHref(
              `Booking request ${bookingRef} — ${siteConfig.name}`,
            )}
            className="inline-flex items-center gap-1.5 u-underline"
          >
            <Mail className="size-3.5" aria-hidden /> {siteConfig.contact.email}
          </a>
        </div>
      </div>

      <div className="flex items-center gap-5 text-[0.8125rem]">
        <button
          type="button"
          onClick={onReset}
          className="font-sans uppercase tracking-[0.14em] text-greige u-underline"
        >
          Start another request
        </button>
        <Link href="/" className="font-sans uppercase tracking-[0.14em] text-greige u-underline">
          Back to site
        </Link>
      </div>
    </div>
  );
}
