import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/booking/schema";
import { buildBookingMessage } from "@/lib/booking/message";
import { whatsappHref } from "@/lib/whatsapp";
import { makeBookingRef } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Receives a booking REQUEST. There is no calendar backend yet, so this does
 * not and must not report a confirmed appointment — it validates the request,
 * assigns a reference, and returns a pre-filled WhatsApp link for the client to
 * complete the booking with Rakshit.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed request." },
      { status: 400 },
    );
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Some details need a look.", fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const bookingRef = makeBookingRef();

  // Sink for the request. Replace with email / sheet / DB before launch.
  console.info(
    `[booking] ${bookingRef} · ${data.fullName} · ${data.service} · ${data.date} ${data.time} · ${data.city} ${data.pincode}`,
  );

  const whatsappUrl = whatsappHref(buildBookingMessage(data, bookingRef));

  return NextResponse.json({ ok: true, bookingRef, whatsappUrl });
}
