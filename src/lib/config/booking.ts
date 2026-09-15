/**
 * Booking rules. All values are PLACEHOLDER defaults for development —
 * confirm with the brand before launch. Consumed by the booking flow.
 */
export const bookingConfig = {
  /** Earliest a visit can be requested, in hours from now. PLACEHOLDER */
  minLeadHours: 48,
  /** Furthest ahead a visit can be requested, in days. PLACEHOLDER */
  maxAdvanceDays: 90,
  /** Time-of-day options offered in the scheduler. PLACEHOLDER */
  timeSlots: [
    "10:00",
    "11:30",
    "13:00",
    "14:30",
    "16:00",
    "17:30",
    "19:00",
  ],
  /** Dates the artist is unavailable (ISO yyyy-mm-dd). PLACEHOLDER */
  blackoutDates: [] as string[],
  /** Max reference images a client can attach in the flow. */
  maxReferenceImages: 3,
  maxReferenceImageMB: 6,
  confirmed: false,
} as const;

export type BookingConfig = typeof bookingConfig;
