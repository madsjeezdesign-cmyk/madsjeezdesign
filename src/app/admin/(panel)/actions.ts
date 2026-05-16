"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminSessionCookieName } from "@/lib/admin-session";

export async function adminLogoutAction() {
  (await cookies()).delete(adminSessionCookieName());
  redirect("/admin/login");
}
