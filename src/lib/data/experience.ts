/**
 * "The Home Visit" — how an appointment works, start to finish.
 * Written to avoid unconfirmed claims (areas, timings, guarantees).
 */

export interface ExperienceStep {
  index: string;
  title: string;
  body: string;
}

export const homeVisitSteps: ExperienceStep[] = [
  {
    index: "01",
    title: "Enquire",
    body: "Send your date, the look you have in mind and where you are. Rakshit replies personally on WhatsApp to confirm availability.",
  },
  {
    index: "02",
    title: "Design",
    body: "We agree the service, shape and design before the day — references welcome — so the appointment is all making, no deciding.",
  },
  {
    index: "03",
    title: "We come to you",
    body: "The full atelier arrives at your door: a sanitised kit, considered lighting, and everything needed to work cleanly on your table.",
  },
  {
    index: "04",
    title: "The sitting",
    body: "An unhurried session in your own space. One client at a time, fresh files and buffers, tools sterilised between every visit.",
  },
  {
    index: "05",
    title: "Aftercare",
    body: "You are sent care notes for your set and a standing line to Rakshit for any adjustment in the first few days.",
  },
];

export interface Assurance {
  title: string;
  body: string;
}

export const assurances: Assurance[] = [
  {
    title: "One client at a time",
    body: "Your appointment is private. No waiting room, no rush, no overlap.",
  },
  {
    title: "Sterile by default",
    body: "Single-use files and buffers; metal tools sterilised between clients.",
  },
  {
    title: "Designed, not decided",
    body: "The look is agreed before the visit so the time is spent on craft.",
  },
  {
    title: "Booked around your day",
    body: "Evenings, weekends and pre-event mornings by arrangement.",
  },
];
