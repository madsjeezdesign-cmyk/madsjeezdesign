#!/bin/sh
set -e

# Migración opcional (pg vive en /app/schema-deps, no toca node_modules de Next)
if [ -n "${DATABASE_URL}" ] || [ -n "${SUPABASE_DATABASE_URL}" ]; then
  export NODE_PATH="/app/schema-deps/node_modules${NODE_PATH:+:$NODE_PATH}"
  if command -v timeout >/dev/null 2>&1; then
    timeout 20 node /app/scripts/ensure-schema.mjs || {
      echo "[entrypoint] ensure-schema falló o superó 20s — continuando." >&2
    }
  elif ! node /app/scripts/ensure-schema.mjs; then
    echo "[entrypoint] ensure-schema falló — continuando." >&2
  fi
else
  echo "[entrypoint] Sin DATABASE_URL — omitiendo ensure-schema."
fi

if [ ! -f /app/server.js ]; then
  echo "[entrypoint] Falta /app/server.js — revisá el build standalone." >&2
  exit 1
fi

cd /app
echo "[entrypoint] Next en /app (PORT=${PORT:-3000}, HOSTNAME=${HOSTNAME:-0.0.0.0})"
exec node server.js
