# MadsJeez Design — Landing

Landing corporativa del estudio **MadsJeez Design**: desarrollo web para comercios y empresas.

- **GitHub:** [madsjeezdesign-cmyk/madsjeezdesign](https://github.com/madsjeezdesign-cmyk/madsjeezdesign)
- **Supabase:** `https://fhvlvuncymvzardotkfd.supabase.co`
- **Deploy:** [Railway](https://railway.app) (Dockerfile + migración opcional al iniciar)
- **Tema:** modo claro / oscuro / sistema (persistencia en `localStorage`)

## Inicio rápido

```bash
npm install
cp .env.example .env.local
# Completar keys; opcional: DATABASE_URL y npm run db:ensure
npm run dev
```

## Supabase (formulario de contacto)

- **Automático:** definí `DATABASE_URL` (URI Session pooler) y en Docker se ejecuta `ensure-schema` al arrancar; o local: `npm run db:ensure`.
- **Manual:** ejecutá `supabase/schema.sql` en el SQL Editor.

## Deploy Railway

Guía: [`docs/deploy-railway.md`](docs/deploy-railway.md)

## Contenido editable

`src/lib/data.ts` — textos, servicios, equipo, casos, historia.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Supabase · Railway
