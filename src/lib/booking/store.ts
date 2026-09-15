"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { emptyDraft, type BookingDraft } from "./schema";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface BookingState {
  draft: BookingDraft;
  step: number;
  /** Highest step the user has reached — for the progress indicator. */
  maxVisited: number;
  hydrated: boolean;
  status: SubmitStatus;
  bookingRef: string | null;
  whatsappUrl: string | null;
  errorMessage: string | null;

  patch: (values: Partial<BookingDraft>) => void;
  goTo: (step: number) => void;
  next: () => void;
  back: () => void;
  setStatus: (
    status: SubmitStatus,
    payload?: { bookingRef?: string; whatsappUrl?: string; errorMessage?: string },
  ) => void;
  reset: () => void;
  markHydrated: () => void;
}

const TOTAL = 8;

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      draft: { ...emptyDraft },
      step: 0,
      maxVisited: 0,
      hydrated: false,
      status: "idle",
      bookingRef: null,
      whatsappUrl: null,
      errorMessage: null,

      patch: (values) =>
        set((s) => ({ draft: { ...s.draft, ...values } })),

      goTo: (step) =>
        set((s) => {
          const clamped = Math.max(0, Math.min(TOTAL - 1, step));
          return { step: clamped, maxVisited: Math.max(s.maxVisited, clamped) };
        }),

      next: () =>
        set((s) => {
          const step = Math.min(TOTAL - 1, s.step + 1);
          return { step, maxVisited: Math.max(s.maxVisited, step) };
        }),

      back: () => set((s) => ({ step: Math.max(0, s.step - 1) })),

      setStatus: (status, payload) =>
        set({
          status,
          bookingRef: payload?.bookingRef ?? null,
          whatsappUrl: payload?.whatsappUrl ?? null,
          errorMessage: payload?.errorMessage ?? null,
        }),

      reset: () =>
        set({
          draft: { ...emptyDraft },
          step: 0,
          maxVisited: 0,
          status: "idle",
          bookingRef: null,
          whatsappUrl: null,
          errorMessage: null,
        }),

      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "tna-booking-v1",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // Don't persist transient submission state.
      partialize: (s) => ({
        draft: s.draft,
        step: s.step,
        maxVisited: s.maxVisited,
      }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);
