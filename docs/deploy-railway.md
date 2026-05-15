# Deploy en Railway — MadsJeez Design

Repositorio: [madsjeezdesign-cmyk/madsjeezdesign](https://github.com/madsjeezdesign-cmyk/madsjeezdesign)

## 1. Supabase

1. Abrí el [SQL Editor](https://supabase.com/dashboard/project/fhvlvuncymvzardotkfd/sql) del proyecto `fhvlvuncymvzardotkfd`.
2. Ejecutá el contenido de `supabase/schema.sql` (tabla `contact_inquiries`).
3. En **Settings → API**, copiá:
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY` y `SUPABASE_ANON_KEY`
   - `service_role` secret → `SUPABASE_SERVICE_ROLE_KEY` (solo servidor, nunca en el cliente)

## 2. Railway

1. [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo** → `madsjeezdesign`.
2. Variables de entorno (Settings → Variables):

| Variable | Valor |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://fhvlvuncymvzardotkfd.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key |
| `SUPABASE_URL` | mismo URL |
| `SUPABASE_ANON_KEY` | mismo anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | service role key |

3. Build usa el `Dockerfile` (standalone Next.js). No hace falta comando de start manual.
4. Generá un dominio en **Networking** o conectá tu dominio custom.

## 3. Verificar formulario

Tras el deploy, enviá una consulta de prueba en `/` → sección Contacto.

En Supabase → **Table Editor** → `contact_inquiries` deberías ver el registro.

## 4. Desarrollo local

```bash
cp .env.example .env.local
# Completar keys en .env.local
npm run dev
```
