import { NextRequest, NextResponse } from "next/server";
import { updateSubmissionStatus } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookie = request.cookies.get("zigo_admin_session");
  if (!cookie || cookie.value !== "authenticated_partner_admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const allowed = ["New", "Contacted", "Verified", "Live"];
    if (!allowed.includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const updated = await updateSubmissionStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, status });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
