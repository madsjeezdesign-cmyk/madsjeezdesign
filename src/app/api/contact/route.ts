import { NextResponse } from "next/server";
import { z } from "zod";
import { parseJsonBody } from "@/lib/parse-json-body";
import {
  checkRateLimit,
  clientIp,
  rateLimitResponse,
} from "@/lib/rate-limit";
import { createSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  company: z.string().max(120).optional().nullable(),
  email: z.string().email().max(254),
  service: z.string().min(1).max(80),
  message: z.string().min(10).max(4000),
  /** Honeypot (oculto en el formulario) */
  website: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = checkRateLimit(`contact:${ip}`, 8, 60 * 60 * 1000);
  if (!limited.ok) {
    return rateLimitResponse(limited.retryAfterSec);
  }

  try {
    const parsedBody = await parseJsonBody(request);
    if (!parsedBody.ok) return parsedBody.response;

    const parsed = contactSchema.safeParse(parsedBody.data);

    if (!parsed.success) {
      const issues = parsed.error.flatten().fieldErrors;
      const messageTooShort = issues.message?.length;
      const nameTooShort = issues.name?.length;
      let hint = "Revisá el formulario.";
      if (nameTooShort) hint = "El nombre debe tener al menos 2 caracteres.";
      else if (messageTooShort) hint = "El mensaje debe tener al menos 10 caracteres.";
      else if (issues.email?.length) hint = "Ingresá un email válido.";
      return NextResponse.json({ error: hint }, { status: 400 });
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const { name, company, email, service, message } = parsed.data;

    if (!isSupabaseConfigured()) {
      console.error("[contact] Supabase no configurado en el servidor");
      return NextResponse.json(
        {
          error:
            "El formulario no está disponible temporalmente. Escribinos por WhatsApp o email.",
        },
        { status: 503 },
      );
    }

    const supabase = createSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json(
        { error: "Error de configuración del servidor." },
        { status: 503 },
      );
    }

    const { error } = await supabase.from("contact_inquiries").insert({
      name: name.trim(),
      company: company?.trim() || null,
      email: email.trim().toLowerCase(),
      service: service.trim(),
      message: message.trim(),
    });

    if (error) {
      console.error("[contact] Supabase insert:", error.message);
      const msg = error.message?.toLowerCase() ?? "";
      const code = "code" in error ? String((error as { code?: string }).code) : "";
      const missingTable =
        code === "42P01" ||
        (msg.includes("contact_inquiries") &&
          (msg.includes("does not exist") ||
            msg.includes("could not find") ||
            msg.includes("no existe")));
      if (missingTable) {
        return NextResponse.json(
          {
            error:
              "Falta crear la tabla en la base de datos. En Railway agregá DATABASE_URL (URI Session de Supabase) y redeploy, o ejecutá supabase/schema.sql en el SQL Editor.",
          },
          { status: 503 },
        );
      }
      return NextResponse.json(
        { error: "No pudimos guardar tu consulta. Intentá de nuevo." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Error inesperado. Intentá más tarde." },
      { status: 500 },
    );
  }
}
