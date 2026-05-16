import { NextResponse } from "next/server";
import { z } from "zod";
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

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
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
