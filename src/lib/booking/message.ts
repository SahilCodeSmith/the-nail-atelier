import type { BookingData } from "./schema";
import { services } from "@/lib/data/services";
import { getDesign } from "@/lib/data/designs";
import { siteConfig } from "@/lib/config/site";

function serviceName(slug?: string) {
  return services.find((s) => s.slug === slug)?.name ?? slug ?? "";
}

function designLine(d: Partial<BookingData>) {
  if (d.decideOnVisit) return "To decide together on the visit";
  const ref = d.designRefId ? getDesign(d.designRefId) : null;
  if (ref && d.designPreference) return `${ref.title} — ${d.designPreference}`;
  if (ref) return `${ref.title} (from the portfolio)`;
  return d.designPreference || "";
}

function formatDate(iso?: string) {
  if (!iso) return "";
  const dt = new Date(`${iso}T00:00:00`);
  return dt.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * The message the CLIENT sends to confirm their request on WhatsApp.
 * First person, complete, compact (deep links get unreliable past ~2k chars).
 * Correctly encoded by whatsappHref().
 */
export function buildBookingMessage(d: BookingData, ref: string): string {
  const location = `${d.address}, ${d.city} ${d.pincode}`;
  const lines = [
    `Hi ${siteConfig.name}!`,
    "",
    "I'd like to book a home visit.",
    `Reference: ${ref}`,
    "",
    `Name: ${d.fullName}`,
    `Phone: ${d.phone}`,
    d.email ? `Email: ${d.email}` : null,
    `Service: ${serviceName(d.service)}`,
    `Design preference: ${designLine(d)}`,
    `Preferred date: ${formatDate(d.date)}`,
    `Preferred time: ${d.time}`,
    `Location: ${location}`,
    d.landmark ? `Landmark: ${d.landmark}` : null,
    `Number of people: ${d.people}`,
    d.referenceNames.length
      ? `References: ${d.referenceNames.length} image(s) — I'll share them here`
      : null,
    d.notes ? `Notes: ${d.notes}` : null,
    "",
    "Please let me know the availability and a quote.",
  ].filter((l): l is string => l !== null);

  return lines.join("\n");
}
