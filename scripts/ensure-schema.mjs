/**
 * Crea la tabla contact_inquiries si no existe (para Railway / Docker sin pasos manuales en SQL Editor).
 * Requiere DATABASE_URL o SUPABASE_DATABASE_URL (Session mode recomendado en el panel de Supabase).
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const connectionString = (
  process.env.DATABASE_URL ??
  process.env.SUPABASE_DATABASE_URL ??
  ""
).trim();

if (!connectionString) {
  console.log(
    "[ensure-schema] Sin DATABASE_URL / SUPABASE_DATABASE_URL — omitido (tabla debe existir o configurá la URI de Postgres)",
  );
  process.exit(0);
}

function stripSqlComments(sql) {
  return sql
    .split("\n")
    .map((line) => {
      const i = line.indexOf("--");
      return i === -1 ? line : line.slice(0, i);
    })
    .join("\n");
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, "..", "supabase", "schema.sql");
let sql;
try {
  sql = readFileSync(schemaPath, "utf8");
} catch (e) {
  console.error("[ensure-schema] No se encontró supabase/schema.sql:", e.message);
  process.exit(1);
}

sql = stripSqlComments(sql);
const chunks = sql
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);

const needsSsl =
  /supabase\.co|pooler\.supabase\.com/i.test(connectionString);

const client = new pg.Client({
  connectionString,
  ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
});

try {
  await client.connect();
  for (const statement of chunks) {
    await client.query(statement);
  }
  console.log("[ensure-schema] Listo: contact_inquiries verificada/creada.");
} catch (e) {
  console.error("[ensure-schema] Error:", e.message);
  process.exit(1);
} finally {
  await client.end().catch(() => {});
}
