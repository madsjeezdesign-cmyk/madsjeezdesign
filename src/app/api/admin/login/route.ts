import { NextResponse } from "next/server";
import { z } from "zod";
import { parseJsonBody } from "@/lib/parse-json-body";
import {
  checkRateLimit,
  clientIp,
  rateLimitResponse,
} from "@/lib/rate-limit";
import {
  buildAdminSessionCookie,
  createSessionToken,
  isAdminAuthConfigured,
  verifyAdminLogin,
} from "@/lib/admin-session";

const bodySchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(1).max(500),
});

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      {
        error:
          "Panel admin no configurado. Definí ADMIN_EMAIL, ADMIN_PASSWORD y ADMIN_SESSION_SECRET en el servidor.",
      },
      { status: 503 },
    );
  }

  const ip = clientIp(request);
  const limited = checkRateLimit(`admin-login:${ip}`, 10, 15 * 60 * 1000);
  if (!limited.ok) {
    return rateLimitResponse(limited.retryAfterSec);
  }

  const parsedBody = await parseJsonBody(request, 4_000);
  if (!parsedBody.ok) return parsedBody.response;

  const parsed = bodySchema.safeParse(parsedBody.data);
  if (!parsed.success) {
    return NextResponse.json({ error: "Credenciales inválidas." }, { status: 400 });
  }

  const { email, password } = parsed.data;
  if (!verifyAdminLogin(email, password)) {
    return NextResponse.json({ error: "Email o contraseña incorrectos." }, { status: 401 });
  }

  const token = createSessionToken(email);
  const res = NextResponse.json({ ok: true });
  const c = buildAdminSessionCookie(token);
  res.cookies.set(c);
  return res;
}
