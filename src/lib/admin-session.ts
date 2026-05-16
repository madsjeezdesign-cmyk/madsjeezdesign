import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "admin_session";
const SESSION_DAYS = 7;

export function getAdminCredentials() {
  const email = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const password = (process.env.ADMIN_PASSWORD ?? "").trim();
  const secret = (process.env.ADMIN_SESSION_SECRET ?? "").trim();
  return { email, password, secret };
}

export function isAdminAuthConfigured(): boolean {
  const c = getAdminCredentials();
  return Boolean(c.email && c.password && c.secret);
}

export function adminSessionCookieName() {
  return COOKIE_NAME;
}

function signPayload(payload: string, secret: string): string {
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function createSessionToken(email: string): string {
  const { secret } = getAdminCredentials();
  const exp = Date.now() + SESSION_DAYS * 86_400_000;
  const payload = Buffer.from(
    JSON.stringify({ email: email.trim().toLowerCase(), exp }),
    "utf8",
  ).toString("base64url");
  return signPayload(payload, secret);
}

export function verifySessionToken(
  token: string | undefined,
): { email: string } | null {
  if (!token?.includes(".")) return null;
  const dot = token.lastIndexOf(".");
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const { secret } = getAdminCredentials();
  if (!secret || !payload || !sig) return null;
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  try {
    const a = Buffer.from(sig, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  try {
    const json = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      email?: string;
      exp?: number;
    };
    if (typeof json.exp !== "number" || json.exp < Date.now()) return null;
    if (typeof json.email !== "string" || !json.email) return null;
    return { email: json.email };
  } catch {
    return null;
  }
}

export function verifyAdminLogin(email: string, password: string): boolean {
  const c = getAdminCredentials();
  if (!c.email || !c.password || !c.secret) return false;
  const e = email.trim().toLowerCase();
  if (e !== c.email) return false;
  if (password.length !== c.password.length) return false;
  try {
    return timingSafeEqual(
      Buffer.from(password, "utf8"),
      Buffer.from(c.password, "utf8"),
    );
  } catch {
    return false;
  }
}

export function adminSessionCookieMaxAgeSeconds() {
  return SESSION_DAYS * 86_400;
}

/**
 * Opciones para cookies() de Next.js o Response cookies.
 */
export function buildAdminSessionCookie(value: string | null) {
  const isProd = process.env.NODE_ENV === "production";
  if (value === null) {
    return {
      name: COOKIE_NAME,
      value: "",
      httpOnly: true,
      secure: isProd,
      path: "/",
      maxAge: 0,
      sameSite: "lax" as const,
    };
  }
  return {
    name: COOKIE_NAME,
    value,
    httpOnly: true,
    secure: isProd,
    path: "/",
    maxAge: adminSessionCookieMaxAgeSeconds(),
    sameSite: "lax" as const,
  };
}
