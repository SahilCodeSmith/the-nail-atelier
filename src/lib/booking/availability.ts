import { bookingConfig } from "@/lib/config/booking";

/**
 * PLACEHOLDER availability.
 *
 * There is no backend calendar yet. To exercise the "unavailable" UI, this
 * deterministically marks a subset of slots as taken per date. Replace with a
 * real availability lookup (GET /api/availability) before launch.
 */
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function getUnavailableSlots(dateIso: string): string[] {
  if (!dateIso) return [];
  const slots = bookingConfig.timeSlots;
  const seed = hash(dateIso);
  // 0–2 slots unavailable, chosen from the seed.
  const taken = seed % 3;
  const out: string[] = [];
  for (let i = 0; i < taken; i++) {
    out.push(slots[(seed + i * 3) % slots.length]);
  }
  return Array.from(new Set(out));
}

export function isDateFull(dateIso: string): boolean {
  return (
    getUnavailableSlots(dateIso).length >= bookingConfig.timeSlots.length
  );
}
