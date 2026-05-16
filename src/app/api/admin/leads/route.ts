import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminSession } from "@/lib/admin-api";
import { createSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

const filterSchema = z.enum(["inbox", "new", "archived", "all"]);

export async function GET(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase no configurado." }, { status: 503 });
  }

  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Error de servidor." }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const filterRaw = searchParams.get("filter") ?? "inbox";
  const parsedFilter = filterSchema.safeParse(filterRaw);
  const filter = parsedFilter.success ? parsedFilter.data : "inbox";

  let q = supabase
    .from("contact_inquiries")
    .select(
      "id, name, company, email, service, message, read_at, archived, admin_notes, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(200);

  if (filter === "inbox") {
    q = q.eq("archived", false);
  } else if (filter === "new") {
    q = q.eq("archived", false).is("read_at", null);
  } else if (filter === "archived") {
    q = q.eq("archived", true);
  }

  const { data, error } = await q;

  if (error) {
    console.error("[admin/leads]", error.message);
    return NextResponse.json({ error: "No se pudieron cargar los leads." }, { status: 500 });
  }

  return NextResponse.json({ leads: data ?? [] });
}
