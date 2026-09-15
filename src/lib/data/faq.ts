/**
 * FAQ. Answers avoid unconfirmed specifics (exact areas, prices, timings) and
 * defer those to a WhatsApp conversation.
 */
import { siteConfig } from "@/lib/config/site";
import { bookingConfig } from "@/lib/config/booking";

export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: "Do you really come to my home?",
    a: "Yes — The Nail Atelier is a home-visit practice. Rakshit brings the full kit to your door; you only need a table, two chairs and a plug point nearby.",
  },
  {
    q: "Which areas do you cover?",
    a: "Coverage is confirmed per booking. Send your location on WhatsApp and Rakshit will let you know availability and any travel considerations for your address.",
  },
  {
    q: "How far in advance should I book?",
    a: `Where possible, at least ${Math.round(
      bookingConfig.minLeadHours / 24,
    )} days ahead — earlier for weekends, festive dates and bridal. Last-minute requests are worth asking about.`,
  },
  {
    q: "How much does it cost?",
    a: "Pricing depends on the service, length and design, so a quote is given once the look is agreed. Your booking request is never charged — it opens a conversation.",
  },
  {
    q: "How do I pay?",
    a: "Payment method and any deposit are confirmed with Rakshit when your appointment is set. Nothing is taken through this website.",
  },
  {
    q: "Is it hygienic to do this at home?",
    a: "Files and buffers are single-use. Metal tools are cleaned and sterilised between every client. The workspace is set up and sanitised on arrival, and only one client is seen at a time.",
  },
  {
    q: "Can I book for a group or an event?",
    a: "Yes — bridal parties and small groups are welcome. Share the date, headcount and location on WhatsApp for a plan.",
  },
  {
    q: "What if I need to reschedule?",
    a: `Let Rakshit know as early as you can and we will find another date. Full terms are on the cancellation policy page.`,
  },
  {
    q: "Do you use my own reference images?",
    a: "Please do bring them. You can attach up to three references in the booking form, or share them in the chat afterwards.",
  },
  {
    q: "How do I reach you directly?",
    a: `WhatsApp or call ${siteConfig.contact.phoneDisplay}, or email ${siteConfig.contact.email}.`,
  },
];
