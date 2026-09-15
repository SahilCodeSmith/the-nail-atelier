"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, MessageCircle, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import { useBookingStore } from "@/lib/booking/store";
import { STEPS, TOTAL_STEPS, type StepId } from "@/lib/booking/steps";
import { validateStep, validateAll, type FieldErrors } from "@/lib/booking/validate";
import { buildBookingMessage } from "@/lib/booking/message";
import { whatsappHref, bookingEnquiryMessage } from "@/lib/whatsapp";
import { makeBookingRef } from "@/lib/utils";
import { services } from "@/lib/data/services";
import { getDesign } from "@/lib/data/designs";
import { occasions } from "@/lib/data/occasions";

import { Button } from "@/components/ui/button";
import { BookingProgress } from "@/components/booking/progress";
import { BookingSuccess } from "@/components/booking/booking-success";
import {
  StepService,
  StepDesign,
  StepDate,
  StepTime,
  StepDetails,
  StepLocation,
  StepReference,
  StepReview,
  type StepProps,
} from "@/components/booking/steps-content";

const STEP_COMPONENTS: Record<StepId, React.ComponentType<StepProps>> = {
  service: StepService,
  design: StepDesign,
  date: StepDate,
  time: StepTime,
  details: StepDetails,
  location: StepLocation,
  reference: StepReference,
  review: StepReview,
};

export function BookingFlow() {
  const reduce = usePrefersReducedMotion();
  const searchParams = useSearchParams();

  const {
    draft,
    step,
    maxVisited,
    hydrated,
    status,
    bookingRef,
    whatsappUrl,
    patch,
    goTo,
    next,
    back,
    setStatus,
    reset,
  } = useBookingStore();

  const [errors, setErrors] = React.useState<FieldErrors>({});
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const prefilled = React.useRef(false);

  const clearErrors = React.useCallback(() => setErrors({}), []);

  // Prefill from query params once, after hydration.
  React.useEffect(() => {
    if (!hydrated || prefilled.current) return;
    prefilled.current = true;

    const serviceParam = searchParams.get("service");
    const designParam = searchParams.get("design");
    const occasionParam = searchParams.get("occasion");
    const patchValues: Record<string, unknown> = {};

    if (serviceParam && services.some((s) => s.slug === serviceParam) && !draft.service) {
      patchValues.service = serviceParam;
    }
    if (designParam && getDesign(designParam) && !draft.designRefId) {
      patchValues.designRefId = designParam;
    }
    if (occasionParam) {
      const occ = occasions.find((o) => o.slug === occasionParam);
      if (occ && !draft.designPreference) {
        patchValues.designPreference = `For ${occ.name.toLowerCase()}.`;
      }
    }
    if (Object.keys(patchValues).length) patch(patchValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  // Move focus to the step heading on change (a11y — DOM sync only).
  React.useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      headingRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [step]);

  const def = STEPS[step];
  const StepComponent = STEP_COMPONENTS[def.id];
  const isLast = step === TOTAL_STEPS - 1;

  function handleNext() {
    const stepErrors = validateStep(def.id, draft);
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors);
      const firstKey = Object.keys(stepErrors)[0];
      document
        .getElementById(firstKey)
        ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      return;
    }
    setErrors({});
    next();
  }

  async function handleSubmit() {
    const result = validateAll(draft);
    if (!result.success) {
      const fe: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!fe[key]) fe[key] = issue.message;
      }
      setErrors(fe);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json?.error ?? "Request failed");
      }
      setStatus("success", {
        bookingRef: json.bookingRef,
        whatsappUrl: json.whatsappUrl,
      });
    } catch {
      // Resilient fallback: build the link client-side so nothing is lost.
      const ref = makeBookingRef();
      const url = whatsappHref(buildBookingMessage(result.data, ref));
      setStatus("error", { bookingRef: ref, whatsappUrl: url });
    }
  }

  /* ---------- render states ---------- */

  if (!hydrated) {
    return (
      <div className="mx-auto grid min-h-[40vh] max-w-2xl place-items-center">
        <p className="animate-pulse font-mono text-meta text-greige">
          Loading your booking…
        </p>
      </div>
    );
  }

  if (status === "success" && bookingRef && whatsappUrl) {
    return (
      <BookingSuccess
        draft={draft}
        bookingRef={bookingRef}
        whatsappUrl={whatsappUrl}
        onReset={reset}
      />
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <BookingProgress
        current={step}
        maxVisited={maxVisited}
        draft={draft}
        onJump={(i) => {
          if (i <= maxVisited && STEPS[i].canEnter(draft)) {
            clearErrors();
            goTo(i);
          }
        }}
      />

      <div className="flex flex-col gap-2">
        <p className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-greige">
          Step {step + 1} — {def.label}
        </p>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-d-md text-ink outline-none"
        >
          {def.title}
        </h1>
        <p className="max-w-measure text-[0.9375rem] leading-relaxed text-char/75">
          {def.hint}
        </p>
      </div>

      <div key={def.id} className="motion-safe:animate-fade-in">
        <StepComponent draft={draft} patch={patch} errors={errors} goTo={goTo} />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xs border border-error/40 bg-error/5 p-4"
        >
          <p className="text-[0.875rem] font-medium text-ink">
            We couldn&rsquo;t send that automatically.
          </p>
          <p className="text-[0.875rem] text-char/80">
            Nothing is lost — send your request straight to Rakshit on WhatsApp,
            or try again.
          </p>
          <div className="flex flex-wrap gap-3">
            {whatsappUrl && (
              <Button asChild variant="primary" size="sm">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" aria-hidden />
                  Send on WhatsApp
                </a>
              </Button>
            )}
            <Button variant="secondary" size="sm" onClick={handleSubmit}>
              Try again
            </Button>
          </div>
        </div>
      )}

      {/* footer nav */}
      <div className="sticky bottom-0 -mx-gutter mt-2 flex items-center justify-between gap-4 border-t border-sand bg-bone/95 px-gutter py-3.5 backdrop-blur md:static md:mx-0 md:bg-transparent md:px-0 md:py-0 md:pt-4">
        <button
          type="button"
          onClick={() => {
            clearErrors();
            back();
          }}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 font-sans text-[0.875rem] text-char transition-colors hover:text-ink disabled:opacity-30"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back
        </button>

        {isLast ? (
          <Button
            onClick={handleSubmit}
            loading={status === "submitting"}
            size="md"
          >
            {status === "submitting" ? "Sending…" : "Send booking request"}
          </Button>
        ) : (
          <Button onClick={handleNext} arrow size="md">
            Continue
          </Button>
        )}
      </div>

      <p className="text-center font-mono text-[0.6875rem] text-greige">
        Prefer to type it yourself?{" "}
        <a
          href={whatsappHref(bookingEnquiryMessage(draft))}
          target="_blank"
          rel="noopener noreferrer"
          className="text-char u-underline"
        >
          Continue on WhatsApp
        </a>
      </p>
    </div>
  );
}

/* Minimal chrome for the booking route. */
export function BookingHeader() {
  return (
    <div className="sticky top-0 z-40 border-b border-sand bg-bone/90 backdrop-blur-md">
      <div className="u-container flex h-[var(--nav-h)] items-center justify-between">
        <Link
          href="/"
          className="font-display text-[0.9rem] uppercase tracking-[0.24em] text-ink"
        >
          The&nbsp;Nail&nbsp;Atelier
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-sans text-[0.8125rem] text-char transition-colors hover:text-ink"
        >
          Close <X className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
