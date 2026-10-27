import { NextRequest, NextResponse } from "next/server";
import { PartnerFormSchema, normaliseNigerianPhone } from "@/lib/validation";
import { insertSubmission } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { notifyNewPartnerSubmission } from "@/lib/notifications";

export async function POST(request: NextRequest) {
  try {
    // 1. IP Rate Limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    const rateResult = checkRateLimit(ip);
    if (!rateResult.allowed) {
      return NextResponse.json(
        {
          error: "Too many submission attempts. Please wait a few minutes before trying again.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(rateResult.resetInMs / 1000).toString(),
          },
        }
      );
    }

    // 2. Parse payload
    const body = await request.json();

    // 3. Honeypot check
    if (body.website_hp && body.website_hp.trim().length > 0) {
      // Silently return success to confuse automated bots
      return NextResponse.json({
        success: true,
        reference_code: "ZP-BOTTRP",
      });
    }

    // 4. Validate with shared Zod schema
    const parseResult = PartnerFormSchema.safeParse(body);
    if (!parseResult.success) {
      const issue = parseResult.error.issues[0];
      return NextResponse.json(
        { error: issue?.message || "Invalid submission data. Please check all fields." },
        { status: 400 }
      );
    }

    const validData = parseResult.data;

    // 5. Normalise phone to E.164
    const normalisedPhone = normaliseNigerianPhone(validData.whatsapp_number);
    if (!normalisedPhone) {
      return NextResponse.json(
        { error: "Please enter a valid Nigerian WhatsApp number (e.g. 0803 123 4567)." },
        { status: 400 }
      );
    }

    // 6. Capture UTM parameters and User Agent
    const userAgent = request.headers.get("user-agent") || null;
    const utm = body.utm || null;

    // 7. Insert submission with duplicate check
    try {
      const submission = await insertSubmission({
        captain_name: validData.captain_name,
        whatsapp_e164: normalisedPhone,
        referred_by: validData.referred_by,
        boats_count: validData.boats_count,
        boat_types: validData.boat_types,
        boat_type_other: validData.boat_type_other,
        preferred_jetty: validData.preferred_jetty,
        jetty_other: validData.jetty_other,
        available_days: validData.available_days,
        pricing: validData.pricing,
        consent: validData.consent,
        utm,
        user_agent: userAgent,
      });

      // 8. Trigger notification stub
      await notifyNewPartnerSubmission(submission);

      return NextResponse.json({
        success: true,
        reference_code: submission.reference_code,
        message: "You're on the founding partners list.",
      });
    } catch (insertErr: any) {
      if (insertErr.message === "This number is already on the list.") {
        return NextResponse.json(
          { error: "This number is already on the list." },
          { status: 409 }
        );
      }
      throw insertErr;
    }
  } catch (error: any) {
    console.error("Partner submission error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your registration. Please try again." },
      { status: 500 }
    );
  }
}
