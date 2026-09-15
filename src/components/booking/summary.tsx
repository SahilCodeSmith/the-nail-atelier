"use client";

import { Pencil } from "lucide-react";
import type { BookingDraft } from "@/lib/booking/schema";
import { services } from "@/lib/data/services";
import { getDesign } from "@/lib/data/designs";
import { cn } from "@/lib/utils";

function serviceName(slug?: string) {
  return services.find((s) => s.slug === slug)?.name ?? "—";
}

function designText(d: BookingDraft) {
  if (d.decideOnVisit) return "Decide together on the visit";
  const ref = d.designRefId ? getDesign(d.designRefId) : null;
  if (ref && d.designPreference) return `${ref.title} — ${d.designPreference}`;
  if (ref) return ref.title;
  return d.designPreference || "—";
}

function prettyDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Row({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: React.ReactNode;
  onEdit?: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <div className="flex flex-col gap-0.5">
        <dt className="font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-greige">
          {label}
        </dt>
        <dd className="text-[0.9375rem] text-ink">{value || "—"}</dd>
      </div>
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="mt-0.5 inline-flex shrink-0 items-center gap-1 font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-greige transition-colors hover:text-lacquer"
        >
          <Pencil className="size-3" aria-hidden /> Edit
        </button>
      )}
    </div>
  );
}

export function BookingSummary({
  draft,
  onEditStep,
  className,
  compact = false,
}: {
  draft: BookingDraft;
  onEditStep?: (index: number) => void;
  className?: string;
  compact?: boolean;
}) {
  const edit = (i: number) => (onEditStep ? () => onEditStep(i) : undefined);
  return (
    <dl
      className={cn(
        "divide-y divide-sand rounded-xs border border-sand bg-porcelain px-4",
        compact ? "py-1" : "py-2",
        className,
      )}
    >
      <Row label="Service" value={serviceName(draft.service)} onEdit={edit(0)} />
      <Row label="Design" value={designText(draft)} onEdit={edit(1)} />
      <Row label="Date" value={prettyDate(draft.date)} onEdit={edit(2)} />
      <Row label="Time" value={draft.time} onEdit={edit(3)} />
      <Row
        label="Name"
        value={draft.fullName}
        onEdit={edit(4)}
      />
      <Row
        label="Contact"
        value={
          <span className="flex flex-col">
            <span>{draft.phone}</span>
            {draft.email ? (
              <span className="text-greige">{draft.email}</span>
            ) : null}
          </span>
        }
        onEdit={edit(4)}
      />
      <Row label="People" value={draft.people ? String(draft.people) : "1"} onEdit={edit(4)} />
      <Row
        label="Location"
        value={
          draft.address
            ? `${draft.address}, ${draft.city} ${draft.pincode}${
                draft.landmark ? ` · ${draft.landmark}` : ""
              }`
            : "—"
        }
        onEdit={edit(5)}
      />
      {draft.referenceNames && draft.referenceNames.length > 0 && (
        <Row
          label="References"
          value={`${draft.referenceNames.length} image(s) — shared in chat`}
          onEdit={edit(6)}
        />
      )}
      {draft.notes ? <Row label="Notes" value={draft.notes} onEdit={edit(4)} /> : null}
    </dl>
  );
}
