import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export async function GET() {
  const hasDbUrl = Boolean(
    (process.env.DATABASE_URL ?? process.env.SUPABASE_DATABASE_URL ?? "").trim(),
  );

  return NextResponse.json({
    ok: true,
    supabaseApi: isSupabaseConfigured(),
    /** Si es false, al arrancar el contenedor no se corre ensure-schema; hace falta SQL manual o DATABASE_URL. */
    postgresMigrate: hasDbUrl,
  });
}
