/**
 * Client words.
 *
 * INTENTIONALLY EMPTY. Do not invent testimonials. Add entries here only when
 * you have a real quote with the client's permission to publish it.
 * The UI renders a dignified "coming soon" state while this is empty.
 */

export interface Testimonial {
  quote: string;
  attribution: string; // e.g. "R. — bridal client"
  context?: string;
}

export const testimonials: Testimonial[] = [];

export const hasTestimonials = testimonials.length > 0;
