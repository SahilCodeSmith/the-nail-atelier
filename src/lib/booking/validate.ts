import { bookingSchema, type BookingDraft, type BookingData } from "./schema";
import type { StepId } from "./steps";

export type FieldErrors = Partial<Record<string, string>>;

const pickFields: Record<StepId, (keyof BookingData)[]> = {
  service: ["service"],
  design: [],
  date: ["date"],
  time: ["time"],
  details: ["fullName", "phone", "email", "people", "notes"],
  location: ["address", "city", "pincode", "landmark"],
  reference: [],
  review: ["consent"],
};

/** Validate just the fields owned by one step. Returns {} when valid. */
export function validateStep(step: StepId, draft: BookingDraft): FieldErrors {
  // Cross-field steps handled manually.
  if (step === "design") {
    const ok =
      Boolean(draft.decideOnVisit) ||
      Boolean(draft.designRefId) ||
      Boolean((draft.designPreference ?? "").trim());
    return ok
      ? {}
      : { design: "Pick a direction, describe one, or choose to decide on the visit." };
  }
  if (step === "reference") return {};

  const fields = pickFields[step];
  const shape = bookingSchema.pick(
    Object.fromEntries(fields.map((f) => [f, true])) as Record<
      keyof BookingData,
      true
    >,
  );
  const result = shape.safeParse(draft);
  if (result.success) return {};

  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}

/** Full validation before submit. */
export function validateAll(draft: BookingDraft) {
  return bookingSchema.safeParse(draft);
}
