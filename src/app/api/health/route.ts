import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export async function GET() {
  const supabaseApi = isSupabaseConfigured();
  const hasDbUrl = Boolean(
    (process.env.DATABASE_URL ?? process.env.SUPABASE_DATABASE_URL ?? "").trim(),
  );

  const ok = supabaseApi;

  return NextResponse.json(
    {
      ok,
      supabaseApi,
      postgresMigrate: hasDbUrl,
    },
    { status: ok ? 200 : 503 },
  );
}
