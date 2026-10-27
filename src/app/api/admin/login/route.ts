import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.ADMIN_PASSWORD || "zigo2026water";

    if (!password || password !== correctPassword) {
      return NextResponse.json({ error: "Incorrect admin password" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, message: "Authenticated successfully" });

    // Set httpOnly secure session cookie
    response.cookies.set({
      name: "zigo_admin_session",
      value: "authenticated_partner_admin",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
