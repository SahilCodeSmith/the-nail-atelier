"use client";

import { Check } from "lucide-react";
import { STEPS, TOTAL_STEPS } from "@/lib/booking/steps";
import type { BookingDraft } from "@/lib/booking/schema";
import { cn } from "@/lib/utils";

export function BookingProgress({
  current,
  maxVisited,
  draft,
  onJump,
}: {
  current: number;
  maxVisited: number;
  draft: BookingDraft;
  onJump: (index: number) => void;
}) {
  const pct = ((current + 1) / TOTAL_STEPS) * 100;
  const step = STEPS[current];

  return (
    <div className="flex flex-col gap-3">
      {/* Desktop: labelled steps */}
      <ol className="hidden items-center gap-1.5 md:flex" aria-label="Booking progress">
        {STEPS.map((s) => {
          const done = current > s.index && s.isComplete(draft);
          const active = current === s.index;
          const reachable = s.index <= maxVisited && s.canEnter(draft);
          return (
            <li key={s.id} className="flex flex-1 items-center gap-1.5">
              <button
                type="button"
                disabled={!reachable || active}
                onClick={() => onJump(s.index)}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-xs px-1 py-0.5 font-sans text-[0.75rem] tracking-[0.02em] transition-colors",
                  active && "text-ink",
                  !active && done && "text-char hover:text-lacquer",
                  !active && !done && "text-greige",
                  reachable && !active && "cursor-pointer",
                )}
              >
                <span
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded-full border text-[0.625rem] font-medium",
                    active && "border-ink bg-ink text-bone",
                    !active && done && "border-lacquer bg-lacquer text-bone",
                    !active && !done && "border-sand text-greige",
                  )}
                >
                  {done ? <Check className="size-3" aria-hidden /> : s.index + 1}
                </span>
                <span className="hidden lg:inline">{s.label}</span>
              </button>
              {s.index < TOTAL_STEPS - 1 && (
                <span
                  className={cn(
                    "h-px flex-1",
                    current > s.index ? "bg-lacquer" : "bg-sand",
                  )}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>

      {/* Mobile: bar + label */}
      <div className="md:hidden">
        <div className="flex items-baseline justify-between">
          <p className="font-sans text-[0.8125rem] font-medium text-ink">
            {step.label}
          </p>
          <p className="font-mono text-[0.6875rem] text-greige">
            Step {current + 1} of {TOTAL_STEPS}
          </p>
        </div>
        <div className="mt-2 h-px w-full bg-sand">
          <div
            className="h-px bg-lacquer transition-[width] duration-500 ease-standard"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
