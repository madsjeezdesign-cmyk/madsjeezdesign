import { NextResponse } from "next/server";
import { buildAdminSessionCookie } from "@/lib/admin-session";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(buildAdminSessionCookie(null));
  return res;
}
