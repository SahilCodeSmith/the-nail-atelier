import type { Metadata } from "next";
import { buildMetadata } from "@/lib/config/seo";
import { BookingHeader } from "@/components/booking/booking-flow";

export const metadata: Metadata = buildMetadata({
  title: "Book a home visit",
  description:
    "Request a home-visit nail appointment with Rakshit. Choose a service and design, pick a date and time, and confirm on WhatsApp.",
  path: "/book",
  noindex: true,
});

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-bone">
      <BookingHeader />
      {children}
    </div>
  );
}
