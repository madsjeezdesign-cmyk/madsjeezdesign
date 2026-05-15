#!/bin/sh
set -e

if [ -n "${DATABASE_URL}" ] || [ -n "${SUPABASE_DATABASE_URL}" ]; then
  node scripts/ensure-schema.mjs || {
    echo "[entrypoint] ensure-schema falló; revisá DATABASE_URL / permisos." >&2
    exit 1
  }
else
  echo "[entrypoint] Sin DATABASE_URL — asumiendo que contact_inquiries ya existe."
fi

exec node server.js
