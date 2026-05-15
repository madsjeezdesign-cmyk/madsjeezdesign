# MadsJeez Design — Landing

Landing corporativa del estudio **MadsJeez Design**: desarrollo web para comercios y empresas.

- **GitHub:** [madsjeezdesign-cmyk/madsjeezdesign](https://github.com/madsjeezdesign-cmyk/madsjeezdesign)
- **Supabase:** `https://fhvlvuncymvzardotkfd.supabase.co`
- **Deploy:** Railway (Docker + Next.js standalone)

## Inicio rápido

```bash
npm install
cp .env.example .env.local
# Completar SUPABASE_SERVICE_ROLE_KEY y anon key en .env.local
npm run dev
```

## Supabase (formulario de contacto)

Ejecutá `supabase/schema.sql` en el SQL Editor de tu proyecto Supabase antes de usar el formulario.

## Deploy Railway

Guía paso a paso: [`docs/deploy-railway.md`](docs/deploy-railway.md)

## Contenido editable

`src/lib/data.ts` — textos, servicios, equipo, casos, historia.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Supabase · Railway
