import { z } from "zod";
import { services } from "@/lib/data/services";
import { bookingConfig } from "@/lib/config/booking";

const serviceSlugs = services.map((s) => s.slug) as [string, ...string[]];

/** Loose Indian mobile check: 10 digits, optional +91 / 0 prefix. */
const phoneRegex = /^(?:\+?91[\-\s]?|0)?[6-9]\d{9}$/;
const pincodeRegex = /^\d{6}$/;

export const bookingSchema = z.object({
  // Step 1 — Service
  service: z.enum(serviceSlugs, {
    error: "Choose a service to continue.",
  }),

  // Step 2 — Design
  designPreference: z
    .string()
    .trim()
    .max(400, "Please keep this under 400 characters.")
    .optional()
    .default(""),
  designRefId: z.string().optional().default(""),
  decideOnVisit: z.boolean().optional().default(false),

  // Step 3 — Date
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date for your visit."),

  // Step 4 — Time
  time: z.enum(bookingConfig.timeSlots as unknown as [string, ...string[]], {
    error: "Choose a time for your visit.",
  }),

  // Step 5 — Customer details
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name looks too long."),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Enter a valid mobile number."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email, or leave this blank.")
    .optional()
    .or(z.literal("")),
  people: z
    .number({ error: "Enter how many people." })
    .int()
    .min(1, "At least one person.")
    .max(12, "For larger groups, message us directly."),
  notes: z
    .string()
    .trim()
    .max(600, "Please keep notes under 600 characters.")
    .optional()
    .default(""),

  // Step 6 — Location
  address: z
    .string()
    .trim()
    .min(6, "Enter the street address for the visit.")
    .max(200),
  city: z.string().trim().min(2, "Enter your city.").max(60),
  pincode: z.string().trim().regex(pincodeRegex, "Enter a 6-digit pincode."),
  landmark: z.string().trim().max(120).optional().default(""),

  // Step 7 — References (client-side only metadata; files are not uploaded)
  referenceNames: z.array(z.string()).max(bookingConfig.maxReferenceImages).default([]),

  // Consent
  consent: z.literal(true, {
    error: "Please confirm so we can contact you about the visit.",
  }),
});

export type BookingData = z.infer<typeof bookingSchema>;

/** Partial shape held in the wizard before submission. */
export type BookingDraft = Partial<Omit<BookingData, "consent">> & {
  consent?: boolean;
};

export const emptyDraft: BookingDraft = {
  service: undefined,
  designPreference: "",
  designRefId: "",
  decideOnVisit: false,
  date: "",
  time: undefined,
  fullName: "",
  phone: "",
  email: "",
  people: 1,
  notes: "",
  address: "",
  city: "",
  pincode: "",
  landmark: "",
  referenceNames: [],
  consent: false,
};
