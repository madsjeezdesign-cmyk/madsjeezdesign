import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminSession } from "@/lib/admin-api";
import { createSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

const uuid = z.string().uuid();

const patchSchema = z.object({
  read: z.boolean().optional(),
  archived: z.boolean().optional(),
  notes: z.string().max(4000).optional().nullable(),
});

export async function PATCH(
  request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { id: idParam } = await ctx.params;
  const idParsed = uuid.safeParse(idParam);
  if (!idParsed.success) {
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  }
  const id = idParsed.data;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const { read, archived, notes } = parsed.data;
  if (read === undefined && archived === undefined && notes === undefined) {
    return NextResponse.json({ error: "Nada que actualizar." }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase no configurado." }, { status: 503 });
  }

  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Error de servidor." }, { status: 503 });
  }

  const updates: Record<string, unknown> = {};
  if (read === true) {
    updates.read_at = new Date().toISOString();
  }
  if (read === false) {
    updates.read_at = null;
  }
  if (archived !== undefined) {
    updates.archived = archived;
  }
  if (notes !== undefined) {
    updates.admin_notes = notes === null ? null : notes.trim() || null;
  }

  const { data, error } = await supabase
    .from("contact_inquiries")
    .update(updates)
    .eq("id", id)
    .select(
      "id, name, company, email, service, message, read_at, archived, admin_notes, created_at",
    )
    .maybeSingle();

  if (error) {
    console.error("[admin/leads/patch]", error.message);
    return NextResponse.json({ error: "No se pudo actualizar." }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Lead no encontrado." }, { status: 404 });
  }

  return NextResponse.json({ lead: data });
}
