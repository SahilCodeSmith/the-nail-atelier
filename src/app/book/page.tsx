import { Suspense } from "react";
import { BookingFlow } from "@/components/booking/booking-flow";

export default function BookPage() {
  return (
    <div className="u-container py-10 pb-16 md:py-16">
      <Suspense
        fallback={
          <div className="mx-auto grid min-h-[40vh] max-w-2xl place-items-center">
            <p className="animate-pulse font-mono text-[0.8125rem] text-greige">
              Loading your booking…
            </p>
          </div>
        }
      >
        <BookingFlow />
      </Suspense>
    </div>
  );
}
