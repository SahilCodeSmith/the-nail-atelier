"use client";

import * as React from "react";
import {
  addDays,
  addHours,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

// date-fns getDay: Sun=0..Sat=6 → convert to Monday-first index.
function mondayIndex(d: Date) {
  return (d.getDay() + 6) % 7;
}

export function DatePicker({
  value,
  onChange,
  minLeadHours,
  maxAdvanceDays,
  blackoutDates,
}: {
  value?: string;
  onChange: (iso: string) => void;
  minLeadHours: number;
  maxAdvanceDays: number;
  blackoutDates: string[];
}) {
  const now = new Date();
  const minDate = startOfDay(addHours(now, minLeadHours));
  const maxDate = startOfDay(addDays(now, maxAdvanceDays));

  const selected = value ? startOfDay(new Date(`${value}T00:00:00`)) : null;
  const [cursor, setCursor] = React.useState<Date>(
    startOfMonth(selected ?? minDate),
  );

  const monthStart = startOfMonth(cursor);
  const days = eachDayOfInterval({
    start: monthStart,
    end: endOfMonth(cursor),
  });
  const leadingBlanks = mondayIndex(monthStart);

  const canPrev = isAfter(monthStart, startOfMonth(minDate));
  const canNext = isBefore(monthStart, startOfMonth(maxDate));

  function isDisabled(d: Date) {
    if (isBefore(d, minDate) || isAfter(d, maxDate)) return true;
    return blackoutDates.includes(format(d, "yyyy-MM-dd"));
  }

  function onKeyDown(e: React.KeyboardEvent, day: Date) {
    const map: Record<string, number> = {
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowDown: 7,
      ArrowUp: -7,
    };
    const delta = map[e.key];
    if (!delta) return;
    e.preventDefault();
    const target = addDays(day, delta);
    if (!isSameMonth(target, cursor)) setCursor(startOfMonth(target));
    requestAnimationFrame(() => {
      const el = document.querySelector<HTMLButtonElement>(
        `[data-day="${format(target, "yyyy-MM-dd")}"]`,
      );
      el?.focus();
    });
  }

  return (
    <div className="w-full max-w-sm rounded-xs border border-sand bg-porcelain p-4">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => canPrev && setCursor(addMonths(cursor, -1))}
          disabled={!canPrev}
          className="grid size-9 place-items-center rounded-xs text-ink transition-colors hover:bg-mist disabled:opacity-30"
          aria-label="Previous month"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </button>
        <p className="font-display text-d-sm text-ink" aria-live="polite">
          {format(cursor, "MMMM yyyy")}
        </p>
        <button
          type="button"
          onClick={() => canNext && setCursor(addMonths(cursor, 1))}
          disabled={!canNext}
          className="grid size-9 place-items-center rounded-xs text-ink transition-colors hover:bg-mist disabled:opacity-30"
          aria-label="Next month"
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w) => (
          <span
            key={w}
            className="py-1 font-sans text-[0.625rem] uppercase tracking-[0.12em] text-greige"
          >
            {w}
          </span>
        ))}
        {Array.from({ length: leadingBlanks }).map((_, i) => (
          <span key={`b${i}`} aria-hidden />
        ))}
        {days.map((d) => {
          const iso = format(d, "yyyy-MM-dd");
          const disabled = isDisabled(d);
          const isSelected = selected && isSameDay(d, selected);
          const isToday = isSameDay(d, startOfDay(now));
          return (
            <button
              key={iso}
              type="button"
              data-day={iso}
              disabled={disabled}
              aria-pressed={Boolean(isSelected)}
              aria-label={format(d, "EEEE d MMMM yyyy")}
              onClick={() => onChange(iso)}
              onKeyDown={(e) => onKeyDown(e, d)}
              className={cn(
                "relative aspect-square rounded-xs font-sans text-[0.8125rem] transition-colors",
                disabled && "cursor-not-allowed text-greige/40 line-through",
                !disabled && !isSelected && "text-ink hover:bg-mist",
                isSelected && "bg-ink text-bone",
              )}
            >
              {format(d, "d")}
              {isToday && !isSelected && (
                <span className="absolute inset-x-1/2 bottom-1 size-1 -translate-x-1/2 rounded-full bg-lacquer" />
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-3 border-t border-sand pt-3 font-mono text-[0.6875rem] text-greige">
        Requests open {Math.round(minLeadHours / 24)}+ days ahead · up to{" "}
        {Math.round(maxAdvanceDays / 30)} months
      </p>
    </div>
  );
}
