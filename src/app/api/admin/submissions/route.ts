import { NextRequest, NextResponse } from "next/server";
import { getAllSubmissions } from "@/lib/db";

export async function GET(request: NextRequest) {
  // Check admin session cookie
  const cookie = request.cookies.get("zigo_admin_session");
  if (!cookie || cookie.value !== "authenticated_partner_admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase().trim();
  const boatType = searchParams.get("boat_type");
  const jetty = searchParams.get("jetty");
  const day = searchParams.get("day");
  const status = searchParams.get("status");

  let submissions = await getAllSubmissions();

  // Search filter
  if (search) {
    submissions = submissions.filter(
      (s) =>
        s.captain_name.toLowerCase().includes(search) ||
        s.reference_code.toLowerCase().includes(search) ||
        s.whatsapp_e164.includes(search) ||
        (s.referred_by && s.referred_by.toLowerCase().includes(search))
    );
  }

  // Boat Type filter
  if (boatType && boatType !== "all") {
    submissions = submissions.filter((s) => s.boat_types.includes(boatType));
  }

  // Jetty filter
  if (jetty && jetty !== "all") {
    submissions = submissions.filter((s) => s.preferred_jetty === jetty);
  }

  // Available day filter
  if (day && day !== "all") {
    submissions = submissions.filter((s) => s.available_days.includes(day));
  }

  // Status filter
  if (status && status !== "all") {
    submissions = submissions.filter((s) => s.status === status);
  }

  // Calculate total registered boats by summing boats_count per prompt rules!
  const totalBoats = submissions.reduce((sum, s) => sum + (s.boats_count || 1), 0);

  return NextResponse.json({
    submissions,
    totalBoats,
    totalSubmissions: submissions.length,
  });
}
