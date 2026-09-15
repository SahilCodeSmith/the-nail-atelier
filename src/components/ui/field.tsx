"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const baseControl =
  "w-full rounded-xs border border-sand bg-porcelain px-3.5 py-3 font-sans text-[0.9375rem] text-ink placeholder:text-greige/70 transition-colors duration-150 hover:border-greige focus:border-lacquer focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-error";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(baseControl, className)} {...props} />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(baseControl, "min-h-28 resize-y leading-relaxed", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export function Label({
  className,
  children,
  optional,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { optional?: boolean }) {
  return (
    <label
      className={cn(
        "flex items-baseline justify-between gap-2 font-sans text-[0.8125rem] font-medium tracking-[0.02em] text-char",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {optional ? (
        <span className="text-[0.6875rem] font-normal uppercase tracking-[0.16em] text-greige">
          Optional
        </span>
      ) : null}
    </label>
  );
}

/** Label + control + error, wired with ids and aria. */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  optional,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const hintId = hint ? `${htmlFor}-hint` : undefined;
  const errId = error ? `${htmlFor}-error` : undefined;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={htmlFor} optional={optional}>
        {label}
      </Label>
      {hint ? (
        <p id={hintId} className="text-[0.8125rem] text-greige">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p
          id={errId}
          role="alert"
          className="text-[0.8125rem] font-medium text-error"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
