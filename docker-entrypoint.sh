#!/bin/sh
set -e

# Migración opcional al arrancar (no debe impedir que Next escuche en PORT)
if [ -n "${DATABASE_URL}" ] || [ -n "${SUPABASE_DATABASE_URL}" ]; then
  if command -v timeout >/dev/null 2>&1; then
    timeout 20 node scripts/ensure-schema.mjs || {
      echo "[entrypoint] ensure-schema falló o superó 20s — el servidor arranca igual." >&2
      echo "[entrypoint] Usá Session pooler en DATABASE_URL o ejecutá supabase/schema.sql." >&2
    }
  elif ! node scripts/ensure-schema.mjs; then
    echo "[entrypoint] ensure-schema falló — el servidor arranca igual." >&2
    echo "[entrypoint] Usá Session pooler en DATABASE_URL o ejecutá supabase/schema.sql." >&2
  fi
else
  echo "[entrypoint] Sin DATABASE_URL — asumiendo que contact_inquiries ya existe."
fi

# Next standalone: server.js en /app o en subcarpeta según tracing del monorepo
if [ -f /app/server.js ]; then
  cd /app
elif [ -f /app/projects/madsjeezdesign/server.js ]; then
  cd /app/projects/madsjeezdesign
else
  echo "[entrypoint] No se encontró server.js en /app ni en projects/madsjeezdesign" >&2
  exit 1
fi

echo "[entrypoint] Iniciando Next en $(pwd) (PORT=${PORT:-3000}, HOSTNAME=${HOSTNAME:-0.0.0.0})"
exec node server.js
