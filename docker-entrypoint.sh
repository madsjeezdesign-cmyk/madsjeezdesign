#!/bin/sh
set -e

if [ -n "${DATABASE_URL}" ] || [ -n "${SUPABASE_DATABASE_URL}" ]; then
  if ! node scripts/ensure-schema.mjs; then
    echo "[entrypoint] ensure-schema falló — el servidor arranca igual." >&2
    echo "[entrypoint] Revisá DATABASE_URL (Session pooler recomendado) o ejecutá supabase/schema.sql." >&2
  fi
else
  echo "[entrypoint] Sin DATABASE_URL — asumiendo que contact_inquiries ya existe."
fi

exec node server.js
