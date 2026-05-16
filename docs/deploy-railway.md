# Deploy en Railway — MadsJeez Design

Repositorio: [madsjeezdesign-cmyk/madsjeezdesign](https://github.com/madsjeezdesign-cmyk/madsjeezdesign)

## 1. Supabase — API keys

En **Settings → API**:

- **Publishable key** (`sb_publishable_...`) o `anon` JWT → `NEXT_PUBLIC_SUPABASE_ANON_KEY` y `SUPABASE_ANON_KEY`
- **Secret / service_role** → `SUPABASE_SERVICE_ROLE_KEY` (solo servidor)

## 2. Supabase — base de datos (elegí una opción)

### Opción A — Recomendada (sin pegar SQL)

1. **Project Settings → Database → Connection string**
2. Elegí **URI** y modo **Session pooler** (mejor desde Railway IPv4).
3. Copiá la URI completa (usuario `postgres.[ref]`, host `*.pooler.supabase.com`, puerto `5432`).
4. En Railway agregá la variable **`DATABASE_URL`** con ese valor (o **`SUPABASE_DATABASE_URL`**).

Al **iniciar** el contenedor, el script `scripts/ensure-schema.mjs` crea la tabla `contact_inquiries` si no existe.

### Opción B — Manual

1. [SQL Editor](https://supabase.com/dashboard/project/fhvlvuncymvzardotkfd/sql)
2. Ejecutá todo el contenido de `supabase/schema.sql`

## 3. Railway

1. [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub** → `madsjeezdesign`.
2. Variables (Settings → Variables):

| Variable | Valor |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://fhvlvuncymvzardotkfd.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | publishable o anon |
| `SUPABASE_URL` | mismo URL |
| `SUPABASE_ANON_KEY` | mismo que `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `SUPABASE_SERVICE_ROLE_KEY` | secret / service_role |
| `DATABASE_URL` | **(Opción A)** URI Session pooler de Postgres |

3. Tras cambiar variables, hacé **Redeploy** para que el build y el entrypoint vean todo.
4. Health: `GET /api/health` → `supabaseApi: true`, `postgresMigrate: true` si configuraste `DATABASE_URL`.

## 4. Verificar formulario

En la web pública, enviá un mensaje de prueba en **Contacto**.

En Supabase → **Table Editor** → `contact_inquiries` debería aparecer la fila.

## 5. Panel admin (leads)

1. Variables en Railway (o `.env.local`):

| Variable | Descripción |
|----------|-------------|
| `ADMIN_EMAIL` | Email que inicia sesión en `/admin/login` |
| `ADMIN_PASSWORD` | Contraseña (solo servidor) |
| `ADMIN_SESSION_SECRET` | Secreto largo; generar con `openssl rand -base64 32` |

2. Si la tabla `contact_inquiries` ya existía, ejecutá en SQL Editor las líneas `alter table ... add column` de `supabase/schema.sql` (o redeploy con `DATABASE_URL` para correr `ensure-schema`).

3. Entrá a `https://madsjeezdesign.com/admin/login` (o la URL de Railway hasta que apuntes el DNS), luego `/admin` lista los mensajes.

4. **Dominio:** configurá `madsjeezdesign.com` en Railway → **Networking** → Custom domain, y en tu registrador apuntá el registro **CNAME** (o **A**) según indique Railway. El sitio ya usa `site.siteUrl` en `src/lib/data.ts` como `https://madsjeezdesign.com` para metadata y enlaces.

5. **No** pongas la contraseña del panel en el código ni en Git; rotala si la compartiste por chat o mail.

## 6. Desarrollo local

```bash
cp .env.example .env.local
# Completar keys; opcional: DATABASE_URL y luego npm run db:ensure
npm run dev
```
