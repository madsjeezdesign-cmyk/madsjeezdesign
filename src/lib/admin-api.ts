import { cookies } from "next/headers";
import { adminSessionCookieName, verifySessionToken } from "@/lib/admin-session";

/** Valida la cookie de sesión admin (uso en API routes y layouts). */
export async function requireAdminSession() {
  const jar = await cookies();
  const token = jar.get(adminSessionCookieName())?.value;
  const session = verifySessionToken(token);
  if (!session) return null;
  return session;
}
