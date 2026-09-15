"use client";

import * as React from "react";
import { Check, Minus, Plus } from "lucide-react";
import type { BookingDraft } from "@/lib/booking/schema";
import type { FieldErrors } from "@/lib/booking/validate";
import { services } from "@/lib/data/services";
import { signatureSets, getDesign } from "@/lib/data/designs";
import { bookingConfig } from "@/lib/config/booking";
import { getUnavailableSlots } from "@/lib/booking/availability";
import { SmartImage } from "@/components/media/smart-image";
import { DatePicker } from "@/components/booking/date-picker";
import { ReferenceUpload } from "@/components/booking/reference-upload";
import { BookingSummary } from "@/components/booking/summary";
import { Field, Input, Textarea } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { SIZES } from "@/lib/data/images";

export interface StepProps {
  draft: BookingDraft;
  patch: (v: Partial<BookingDraft>) => void;
  errors: FieldErrors;
  goTo: (index: number) => void;
}

/* -------------------------------------------------------------- 1 · Service */

export function StepService({ draft, patch, errors }: StepProps) {
  return (
    <div className="flex flex-col gap-3">
      <fieldset>
        <legend className="sr-only">Choose a service</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((s) => {
            const active = draft.service === s.slug;
            return (
              <label
                key={s.slug}
                className={cn(
                  "group relative flex cursor-pointer gap-4 rounded-xs border p-4 transition-colors",
                  active
                    ? "border-ink bg-porcelain"
                    : "border-sand bg-porcelain/40 hover:border-greige",
                )}
              >
                <input
                  type="radio"
                  name="service"
                  value={s.slug}
                  checked={active}
                  onChange={() => patch({ service: s.slug })}
                  className="sr-only"
                />
                <div className="relative hidden size-16 shrink-0 overflow-hidden rounded-xs sm:block">
                  <SmartImage id={s.imageId} fill sizes="64px" reqWidth={200} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-d-sm text-ink">{s.name}</span>
                    {active && <Check className="size-4 text-lacquer" aria-hidden />}
                  </div>
                  <p className="text-[0.8125rem] leading-relaxed text-char/75">
                    {s.summary}
                  </p>
                  <p className="mt-1 font-mono text-[0.6875rem] text-greige">
                    {s.durationNote} · {s.priceNote}
                  </p>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>
      {errors.service && (
        <p role="alert" className="text-[0.8125rem] font-medium text-error">
          {errors.service}
        </p>
      )}
      <p className="font-mono text-[0.6875rem] text-greige">
        Not sure? Choose the closest — the final service is agreed with Rakshit.
      </p>
    </div>
  );
}

/* --------------------------------------------------------------- 2 · Design */

export function StepDesign({ draft, patch, errors }: StepProps) {
  const chosen = draft.designRefId ? getDesign(draft.designRefId) : null;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <p className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-greige">
          Pick a direction
        </p>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {signatureSets.map((d) => {
            const active = draft.designRefId === d.id && !draft.decideOnVisit;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() =>
                  patch({
                    designRefId: active ? "" : d.id,
                    decideOnVisit: false,
                  })
                }
                aria-pressed={active}
                className={cn(
                  "group relative overflow-hidden rounded-xs border-2 transition-colors",
                  active ? "border-ink" : "border-transparent hover:border-sand",
                )}
              >
                <SmartImage
                  id={d.imageId}
                  sizes={SIZES.thumb}
                  reqWidth={320}
                  focal={d.focal}
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-2 pb-1.5 pt-4 text-left font-sans text-[0.625rem] uppercase tracking-[0.08em] text-bone">
                  {d.title}
                </span>
                {active && (
                  <span className="absolute right-1.5 top-1.5 grid size-5 place-items-center rounded-full bg-ink text-bone">
                    <Check className="size-3" aria-hidden />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <Field
        label={chosen ? `Notes on "${chosen.title}"` : "Or describe the look you want"}
        htmlFor="designPreference"
        optional
        hint={
          chosen
            ? "Any changes — colour, length, an accent nail."
            : "Colours, shapes, a reference you've seen, an object you're matching."
        }
        error={errors.designPreference}
      >
        <Textarea
          id="designPreference"
          value={draft.designPreference ?? ""}
          maxLength={400}
          onChange={(e) => patch({ designPreference: e.target.value })}
          placeholder="e.g. short almond, milky base, one gold line on the ring finger"
        />
      </Field>

      <label
        className={cn(
          "flex cursor-pointer items-start gap-3 rounded-xs border p-4 transition-colors",
          draft.decideOnVisit
            ? "border-ink bg-porcelain"
            : "border-sand hover:border-greige",
        )}
      >
        <input
          type="checkbox"
          checked={Boolean(draft.decideOnVisit)}
          onChange={(e) =>
            patch({
              decideOnVisit: e.target.checked,
              designRefId: e.target.checked ? "" : draft.designRefId,
            })
          }
          className="mt-0.5 size-4 accent-[#1A1613]"
        />
        <span className="flex flex-col gap-0.5">
          <span className="font-sans text-[0.9375rem] text-ink">
            I&rsquo;d rather decide with Rakshit on the visit
          </span>
          <span className="text-[0.8125rem] text-char/70">
            Bring inspiration on the day and design it together.
          </span>
        </span>
      </label>

      {errors.design && (
        <p role="alert" className="text-[0.8125rem] font-medium text-error">
          {errors.design}
        </p>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- 3 · Date */

export function StepDate({ draft, patch, errors }: StepProps) {
  return (
    <div className="flex flex-col items-start gap-3">
      <DatePicker
        value={draft.date}
        onChange={(iso) => patch({ date: iso })}
        minLeadHours={bookingConfig.minLeadHours}
        maxAdvanceDays={bookingConfig.maxAdvanceDays}
        blackoutDates={bookingConfig.blackoutDates as string[]}
      />
      {errors.date && (
        <p role="alert" className="text-[0.8125rem] font-medium text-error">
          {errors.date}
        </p>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- 4 · Time */

export function StepTime({ draft, patch, errors }: StepProps) {
  const unavailable = getUnavailableSlots(draft.date ?? "");
  const allTaken = unavailable.length >= bookingConfig.timeSlots.length;

  return (
    <div className="flex flex-col gap-3">
      {allTaken ? (
        <div className="rounded-xs border border-warning/40 bg-warning/5 p-4 text-[0.875rem] text-char">
          Every slot on this date is taken. Pick another date, or ask Rakshit on
          WhatsApp about a waitlist.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
          {bookingConfig.timeSlots.map((slot) => {
            const taken = unavailable.includes(slot);
            const active = draft.time === slot;
            return (
              <button
                key={slot}
                type="button"
                disabled={taken}
                aria-pressed={active}
                onClick={() => patch({ time: slot })}
                className={cn(
                  "rounded-xs border px-2 py-3 font-sans text-[0.875rem] transition-colors",
                  taken &&
                    "cursor-not-allowed border-sand text-greige/50 line-through",
                  !taken && active && "border-ink bg-ink text-bone",
                  !taken && !active && "border-sand text-ink hover:border-greige",
                )}
              >
                {slot}
                {taken && (
                  <span className="mt-0.5 block font-mono text-[0.5625rem] uppercase tracking-[0.1em] no-underline">
                    Booked
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
      {errors.time && (
        <p role="alert" className="text-[0.8125rem] font-medium text-error">
          {errors.time}
        </p>
      )}
      <p className="font-mono text-[0.6875rem] text-greige">
        Times shown in IST. Availability is confirmed on WhatsApp.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------- 5 · Details */

function PeopleStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-xs border border-sand bg-porcelain">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="grid size-11 place-items-center text-ink transition-colors hover:bg-mist disabled:opacity-30"
        disabled={value <= 1}
        aria-label="One fewer person"
      >
        <Minus className="size-4" aria-hidden />
      </button>
      <span
        className="w-12 text-center font-mono text-[0.9375rem] text-ink"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(12, value + 1))}
        className="grid size-11 place-items-center text-ink transition-colors hover:bg-mist disabled:opacity-30"
        disabled={value >= 12}
        aria-label="One more person"
      >
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  );
}

export function StepDetails({ draft, patch, errors }: StepProps) {
  return (
    <div className="flex flex-col gap-5">
      <Field label="Full name" htmlFor="fullName" error={errors.fullName}>
        <Input
          id="fullName"
          value={draft.fullName ?? ""}
          autoComplete="name"
          aria-invalid={Boolean(errors.fullName)}
          onChange={(e) => patch({ fullName: e.target.value })}
          placeholder="Your name"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Phone (WhatsApp)"
          htmlFor="phone"
          error={errors.phone}
          hint="This is where Rakshit replies."
        >
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={draft.phone ?? ""}
            aria-invalid={Boolean(errors.phone)}
            onChange={(e) => patch({ phone: e.target.value })}
            placeholder="+91 ..."
          />
        </Field>
        <Field label="Email" htmlFor="email" optional error={errors.email}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={draft.email ?? ""}
            aria-invalid={Boolean(errors.email)}
            onChange={(e) => patch({ email: e.target.value })}
            placeholder="you@example.com"
          />
        </Field>
      </div>

      <Field
        label="Number of people"
        htmlFor="people"
        error={errors.people}
        hint="Bridal parties and small groups welcome."
      >
        <PeopleStepper
          value={Number(draft.people ?? 1)}
          onChange={(n) => patch({ people: n })}
        />
      </Field>

      <Field
        label="Additional notes"
        htmlFor="notes"
        optional
        error={errors.notes}
        hint="Allergies, access notes, timing constraints, anything useful."
      >
        <Textarea
          id="notes"
          value={draft.notes ?? ""}
          maxLength={600}
          onChange={(e) => patch({ notes: e.target.value })}
        />
      </Field>
    </div>
  );
}

/* ------------------------------------------------------------- 6 · Location */

export function StepLocation({ draft, patch, errors }: StepProps) {
  return (
    <div className="flex flex-col gap-5">
      <Field label="Street address" htmlFor="address" error={errors.address}>
        <Input
          id="address"
          autoComplete="street-address"
          value={draft.address ?? ""}
          aria-invalid={Boolean(errors.address)}
          onChange={(e) => patch({ address: e.target.value })}
          placeholder="Flat / house, street, area"
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="City" htmlFor="city" error={errors.city}>
          <Input
            id="city"
            autoComplete="address-level2"
            value={draft.city ?? ""}
            aria-invalid={Boolean(errors.city)}
            onChange={(e) => patch({ city: e.target.value })}
          />
        </Field>
        <Field label="Pincode" htmlFor="pincode" error={errors.pincode}>
          <Input
            id="pincode"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={6}
            value={draft.pincode ?? ""}
            aria-invalid={Boolean(errors.pincode)}
            onChange={(e) =>
              patch({ pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })
            }
          />
        </Field>
      </div>
      <Field label="Landmark" htmlFor="landmark" optional error={errors.landmark}>
        <Input
          id="landmark"
          value={draft.landmark ?? ""}
          onChange={(e) => patch({ landmark: e.target.value })}
          placeholder="Nearest metro pillar, gate, shop…"
        />
      </Field>
      <p className="rounded-xs bg-mist/60 p-3 text-[0.8125rem] leading-relaxed text-char/75">
        Coverage for your address is confirmed on WhatsApp. If it&rsquo;s outside
        the usual range, Rakshit will let you know any travel considerations
        before anything is fixed.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------ 7 · Reference */

export function StepReference({ patch }: StepProps) {
  return <ReferenceUpload onChange={(names) => patch({ referenceNames: names })} />;
}

/* --------------------------------------------------------------- 8 · Review */

export function StepReview({ draft, patch, errors, goTo }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <BookingSummary draft={draft} onEditStep={goTo} />

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={draft.consent === true}
          onChange={(e) => patch({ consent: e.target.checked })}
          className="mt-0.5 size-4 accent-[#1A1613]"
          aria-invalid={Boolean(errors.consent)}
        />
        <span className="text-[0.875rem] leading-relaxed text-char/80">
          I understand this is a booking request, not a confirmed appointment,
          and I&rsquo;m happy for {""}
          <strong className="font-medium text-ink">The Nail Atelier</strong> to
          contact me on WhatsApp, phone or email about it.
        </span>
      </label>
      {errors.consent && (
        <p role="alert" className="-mt-3 text-[0.8125rem] font-medium text-error">
          {errors.consent}
        </p>
      )}
    </div>
  );
}
