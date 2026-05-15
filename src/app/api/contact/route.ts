import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  company: z.string().max(120).optional().nullable(),
  email: z.string().email().max(254),
  service: z.string().min(1).max(80),
  message: z.string().min(10).max(4000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos. Revisá el formulario." },
        { status: 400 },
      );
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
