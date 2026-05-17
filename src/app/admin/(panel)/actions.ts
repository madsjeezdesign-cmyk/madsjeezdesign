"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { buildAdminSessionCookie } from "@/lib/admin-session";

export async function adminLogoutAction() {
  const jar = await cookies();
  const cleared = buildAdminSessionCookie(null);
  jar.set(cleared);
  redirect("/admin/login");
}
