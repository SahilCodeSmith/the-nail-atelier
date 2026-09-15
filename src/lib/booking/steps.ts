import type { BookingDraft } from "./schema";
import { bookingConfig } from "@/lib/config/booking";

export type StepId =
  | "service"
  | "design"
  | "date"
  | "time"
  | "details"
  | "location"
  | "reference"
  | "review";

export interface StepDef {
  id: StepId;
  index: number;
  label: string;
  title: string;
  hint: string;
  /** Is this step complete enough to advance? */
  isComplete: (d: BookingDraft) => boolean;
  /** Whether the step can be entered given current data. */
  canEnter: (d: BookingDraft) => boolean;
}

const has = (v: unknown) => v !== undefined && v !== null && v !== "";

export const STEPS: StepDef[] = [
  {
    id: "service",
    index: 0,
    label: "Service",
    title: "Choose your service",
    hint: "What kind of appointment is this? You can refine details later in the chat.",
    isComplete: (d) => has(d.service),
    canEnter: () => true,
  },
  {
    id: "design",
    index: 1,
    label: "Design",
    title: "The design direction",
    hint: "Pick a direction, describe your own, or decide together on the day.",
    isComplete: (d) =>
      Boolean(d.decideOnVisit) || has(d.designRefId) || has(d.designPreference),
    canEnter: (d) => has(d.service),
  },
  {
    id: "date",
    index: 2,
    label: "Date",
    title: "Pick a date",
    hint: `Requests open from ${Math.round(
      bookingConfig.minLeadHours / 24,
    )} days ahead. Weekends and festive dates fill first.`,
    isComplete: (d) => has(d.date),
    canEnter: (d) => has(d.service),
  },
  {
    id: "time",
    index: 3,
    label: "Time",
    title: "Pick a time",
    hint: "A start time — the appointment length depends on the service and design.",
    isComplete: (d) => has(d.time),
    canEnter: (d) => has(d.date),
  },
  {
    id: "details",
    index: 4,
    label: "Details",
    title: "Your details",
    hint: "So Rakshit can confirm your visit and reach you on the day.",
    isComplete: (d) =>
      has(d.fullName) && has(d.phone) && Number(d.people) >= 1,
    canEnter: (d) => has(d.time),
  },
  {
    id: "location",
    index: 5,
    label: "Location",
    title: "Where should we come?",
    hint: "The address for the visit. Coverage is confirmed on WhatsApp.",
    isComplete: (d) => has(d.address) && has(d.city) && has(d.pincode),
    canEnter: (d) => has(d.fullName) && has(d.phone),
  },
  {
    id: "reference",
    index: 6,
    label: "References",
    title: "Reference images",
    hint: "Optional. Add up to three images that show what you have in mind.",
    isComplete: () => true,
    canEnter: (d) => has(d.address) && has(d.city) && has(d.pincode),
  },
  {
    id: "review",
    index: 7,
    label: "Review",
    title: "Review your request",
    hint: "Check everything, then send. This is a request — nothing is charged.",
    isComplete: (d) => d.consent === true,
    canEnter: (d) => has(d.address) && has(d.city) && has(d.pincode),
  },
];

export const TOTAL_STEPS = STEPS.length;

export function firstIncompleteIndex(d: BookingDraft): number {
  for (const s of STEPS) {
    if (!s.isComplete(d)) return s.index;
  }
  return STEPS.length - 1;
}
