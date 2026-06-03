import { NextResponse } from "next/server";
import { createSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

const DB_TIMEOUT_MS = 2000;

async function checkDb(): Promise<boolean> {
  const client = createSupabaseAdmin();
  if (!client) return false;

  const query = client
    .from("contact_inquiries")
    .select("*", { count: "exact", head: true })
    .limit(1)
    .then((r) => !r.error);

  const timeout = new Promise<boolean>((resolve) =>
    setTimeout(() => resolve(false), DB_TIMEOUT_MS),
  );

  try {
    return await Promise.race([query, timeout]);
  } catch {
    return false;
  }
}

export async function GET() {
  const supabaseApi = isSupabaseConfigured();
  const db = supabaseApi ? await checkDb() : false;
  const ok = supabaseApi && db;

  return NextResponse.json(
    { ok, supabaseApi, db },
    { status: ok ? 200 : 503 },
  );
}
