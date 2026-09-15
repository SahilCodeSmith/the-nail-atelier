import { siteConfig } from "@/lib/config/site";
import { services } from "@/lib/data/services";
import { getDesign } from "@/lib/data/designs";
import type { BookingDraft } from "@/lib/booking/schema";

/**
 * All WhatsApp deep links in the app are built here so encoding and the number
 * are consistent. wa.me expects digits only, no "+".
 */
export function whatsappHref(message?: string) {
  const base = `https://wa.me/${siteConfig.contact.whatsappDigits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telHref() {
  return `tel:${siteConfig.contact.phoneE164}`;
}

export function mailtoHref(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString();
  return `mailto:${siteConfig.contact.email}${qs ? `?${qs}` : ""}`;
}

const HELLO = `Hi ${siteConfig.name}!`;

/** Generic enquiry — header / footer / floating button. */
export function generalEnquiryMessage() {
  return [
    HELLO,
    "",
    "I'd like to ask about a home visit for nails.",
    "",
    "Please let me know your availability.",
  ].join("\n");
}

/** From a specific design direction — "Ask about this look". */
export function designEnquiryMessage(designTitle: string) {
  return [
    HELLO,
    "",
    `I love the "${designTitle}" direction — could we do something like it at a home visit?`,
    "",
    "Please let me know your availability.",
  ].join("\n");
}

/** From a specific service. */
export function serviceEnquiryMessage(serviceName: string) {
  return [
    HELLO,
    "",
    `I'd like to book a home visit — ${serviceName}.`,
    "",
    "Preferred date:",
    "Preferred time:",
    "Location:",
    "",
    "Please let me know your availability.",
  ].join("\n");
}

function serviceName(slug?: string) {
  return slug ? (services.find((s) => s.slug === slug)?.name ?? "") : "";
}

function designName(draft: BookingDraft) {
  if (draft.decideOnVisit) return "To decide on the visit";
  const ref = draft.designRefId ? getDesign(draft.designRefId) : null;
  if (ref && draft.designPreference) return `${ref.title} — ${draft.designPreference}`;
  if (ref) return ref.title;
  return draft.designPreference ?? "";
}

function prettyDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Booking enquiry skeleton, populated with whatever the in-progress form holds.
 * Empty fields keep their label so the client can complete them in WhatsApp.
 */
export function bookingEnquiryMessage(draft: BookingDraft = {}) {
  const location = [draft.address, draft.city, draft.pincode]
    .filter(Boolean)
    .join(", ");

  return [
    HELLO,
    "",
    "I'd like to book a home visit.",
    "",
    `Name: ${draft.fullName ?? ""}`,
    `Service: ${serviceName(draft.service) || ""}`,
    `Preferred date: ${prettyDate(draft.date)}`,
    `Preferred time: ${draft.time ?? ""}`,
    `Location: ${location}`,
    `Design preference: ${designName(draft)}`,
    draft.people && draft.people > 1 ? `Number of people: ${draft.people}` : null,
    "",
    "Please let me know the availability.",
  ]
    .filter((l): l is string => l !== null)
    .join("\n");
}
