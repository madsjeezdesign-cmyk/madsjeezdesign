# PostHog — Guía de integración

PostHog mide visitas, clics, conversiones, embudos y comportamiento de
usuarios. **Convive con Google Analytics 4** (ya instalado) — no lo
reemplaza. Si la API key está vacía, PostHog no se inicializa: cero impacto
en build, render o consola.

---

## 1. Archivos modificados / creados

| Archivo | Qué hace |
|---|---|
| `src/lib/analytics.ts` | **Utilidad reutilizable** `trackEvent()` + constantes `ANALYTICS_EVENTS` + `getPageType()` + `identifyUser()` / `resetAnalytics()`. SSR-safe, nunca tira error. |
| `src/components/analytics/posthog-provider.tsx` | Inicializa PostHog **una sola vez** en el cliente. Monta pageview + smart-capture. Excluye `/admin/*` por privacidad. |
| `src/components/analytics/posthog-pageview.tsx` | Captura `$pageview` manual en cada cambio de ruta del App Router (sin duplicar). |
| `src/components/analytics/posthog-smart-capture.tsx` | Un listener global de clics que detecta CTAs (WhatsApp, vender, comprar, registro, contacto…) y emite eventos semánticos. |
| `src/app/layout.tsx` | Monta `<PostHogProvider>` envolviendo el contenido (debajo de `ThemeProvider`, junto a GA4). |
| `src/components/hyper/hyper-contact.tsx` | Dispara `formulario_enviado` + `lead_generado` al enviar el form de contacto con éxito (sin PII). |
| `.env.example` | Documenta `NEXT_PUBLIC_POSTHOG_KEY` y `NEXT_PUBLIC_POSTHOG_HOST`. |
| `Dockerfile` | Pasa las dos vars como build ARG (los `NEXT_PUBLIC_*` se inlinen en build time). |
| `package.json` | Agrega `posthog-js` (pin exacto `1.387.0`). |

---

## 2. Dónde pegar tu Project API Key

PostHog → **Project Settings → Project API Key** (empieza con `phc_...`).

### Local (`.env.local`, no se sube a git)

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_tu_key_aca
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### Producción (Railway)

Railway → proyecto `madsjeezdesign` → service → **Variables**:

```
NEXT_PUBLIC_POSTHOG_KEY = phc_tu_key_aca
NEXT_PUBLIC_POSTHOG_HOST = https://us.i.posthog.com
```

> ⚠️ Igual que `NEXT_PUBLIC_GA_ID`, estas vars se **inlinen en build time**.
> El `Dockerfile` ya las recibe como ARG, así que un redeploy tras setear la
> var alcanza. No hace falta tocar nada más.

**Nunca** commitees la key real. El `.env.example` solo tiene el placeholder.

---

## 3. Cómo verificar que funciona

1. Seteá la key (local o Railway) y reiniciá / redeployá.
2. Abrí el sitio en una pestaña nueva.
3. En PostHog → **Activity** (o **Live events**) deberías ver `$pageview`
   en segundos.
4. Hacé clic en un botón de WhatsApp / "Pedir presupuesto" → aparece el
   evento semántico (`click_whatsapp`, `lead_generado`, etc.).
5. Enviá el formulario de contacto → `formulario_enviado` + `lead_generado`.

**Si no aparece nada:** suele ser (a) key vacía / mal pegada, (b) un ad
blocker bloqueando el request a `us.i.posthog.com` — probá en una ventana
sin bloqueador o desde el celular con datos.

Para debug local: en `posthog-provider.tsx` poné `ph.debug(true)` dentro de
`loaded` y vas a ver cada evento en la consola.

---

## 4. Eventos que se están midiendo

### Automáticos (sin escribir código)

- **`$pageview`** — cada navegación (incluye client-side routing).
- **`$pageleave`** — salida de página (para tiempo en página / bounce).
- **`$autocapture`** — clics e interacciones básicas que PostHog detecta solo.

### Semánticos por detección de CTA (smart-capture)

El listener global clasifica el texto + href del botón/link clickeado:

| Palabra detectada | Evento emitido |
|---|---|
| whatsapp · wa.me · api.whatsapp.com | `click_whatsapp` |
| vender · publicar | `click_vender` |
| comprar · checkout | `click_comprar` |
| registrarme · registrarse · registro · crear cuenta | `click_registro` |
| contacto · consultar · presupuesto · cotizar · agendar | `lead_generado` |

Cada uno incluye: `button_text`, `href`, `element`, `page`, `page_type`, `ts`.

### Conversión cableada en el form de contacto

- `formulario_enviado` — al enviar con éxito (prop: `service`).
- `lead_generado` — mismo momento (prop: `source: contact_form`).

### Disponibles para usar donde los necesites (e-commerce / demos)

Definidos en `ANALYTICS_EVENTS`, listos para llamar manualmente:
`registro_inicio`, `registro_completo`, `producto_visto`, `categoria_vista`,
`busqueda_realizada`, `checkout_iniciado`, `checkout_abandonado`.

---

## 5. Cómo agregar nuevos eventos

Importá `trackEvent` en **cualquier** componente cliente:

```tsx
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

// con constante (recomendado):
trackEvent(ANALYTICS_EVENTS.PRODUCTO_VISTO, {
  product: "Plan completo",
  price: 150000,
});

// o con string libre para un evento nuevo:
trackEvent("descarga_brochure", { source: "footer" });
```

`trackEvent` agrega solo: `page`, `page_type`, `ts`. Es no-op en el
servidor y si PostHog no está inicializado — podés llamarlo sin guardas.

Para un evento nuevo recurrente, sumalo a `ANALYTICS_EVENTS` en
`src/lib/analytics.ts` y usá la constante.

---

## 6. Precauciones de privacidad aplicadas

- **`/admin/*` excluido por completo** — el panel de leads muestra emails
  reales; PostHog ni se inicializa ahí (sin pageview, sin replay, sin clics).
- **`maskAllInputs: true`** en session replay — todos los inputs de
  formulario se enmascaran (nunca se graban contraseñas, emails tipeados,
  DNI, tarjetas, etc.).
- **`person_profiles: "identified_only"`** — los visitantes anónimos no
  crean perfiles de persona; baja el volumen y la superficie de PII.
- **Sin PII en eventos custom** — el form de contacto envía solo el `service`
  elegido, nunca nombre/email/mensaje.
- **`button_text` truncado a 80 chars** y el smart-capture nunca lee valores
  de inputs.
- **Para enmascarar algo específico** en el replay: agregá la clase
  `ph-no-capture` (lo oculta) o el atributo `data-ph-mask` (lo enmascara) al
  elemento.
- GA4 y Search Console **no fueron tocados** — siguen funcionando igual.

---

## Resumen de 1 línea

PostHog queda instalado, privado y conviviendo con GA4. Pegá tu `phc_...`
en `NEXT_PUBLIC_POSTHOG_KEY` (local o Railway), redeployá, y empieza a medir.
