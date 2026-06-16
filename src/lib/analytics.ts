/**
 * Analytics helper — PostHog wrapper.
 *
 * Framework-agnostic, SSR-safe. Coexists with Google Analytics 4 (which is
 * wired separately in layout.tsx). Never throws: if PostHog isn't loaded
 * (no key, or running on the server) every call is a silent no-op.
 *
 * Import `trackEvent` anywhere — server components included (it just no-ops
 * on the server). For event names prefer the ANALYTICS_EVENTS constants so
 * the dashboard stays consistent.
 */

import posthog from "posthog-js";

/** All custom events this site emits. Use these instead of raw strings. */
export const ANALYTICS_EVENTS = {
  CLICK_WHATSAPP: "click_whatsapp",
  CLICK_VENDER: "click_vender",
  CLICK_COMPRAR: "click_comprar",
  CLICK_REGISTRO: "click_registro",
  REGISTRO_INICIO: "registro_inicio",
  REGISTRO_COMPLETO: "registro_completo",
  PRODUCTO_VISTO: "producto_visto",
  CATEGORIA_VISTA: "categoria_vista",
  BUSQUEDA_REALIZADA: "busqueda_realizada",
  CHECKOUT_INICIADO: "checkout_iniciado",
  CHECKOUT_ABANDONADO: "checkout_abandonado",
  LEAD_GENERADO: "lead_generado",
  FORMULARIO_ENVIADO: "formulario_enviado",
} as const;

export type AnalyticsEvent =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

type Props = Record<string, unknown>;

/** Classify the current route into a coarse page type for segmentation. */
export function getPageType(pathname: string): string {
  if (pathname === "/") return "home";
  if (pathname === "/demos") return "demos_index";
  if (pathname.startsWith("/demos/")) return "demo";
  if (pathname.startsWith("/admin")) return "admin";
  return "other";
}

/** True once PostHog has been initialized on the client. */
export function isAnalyticsReady(): boolean {
  if (typeof window === "undefined") return false;
  // posthog.__loaded is set by the SDK after init().
  return Boolean((posthog as unknown as { __loaded?: boolean }).__loaded);
}

/**
 * Send a custom event to PostHog. Silent no-op when:
 *  - running on the server,
 *  - PostHog isn't initialized (missing key),
 *  - the SDK throws for any reason.
 *
 * Automatically enriches every event with: page, page_type, ts (ISO).
 *
 * @example
 * trackEvent(ANALYTICS_EVENTS.CLICK_WHATSAPP, { source: "hero_cta" });
 */
export function trackEvent(event: AnalyticsEvent | string, properties: Props = {}) {
  if (typeof window === "undefined") return;
  try {
    if (!isAnalyticsReady()) return;
    const path = window.location.pathname;
    posthog.capture(event, {
      page: path,
      page_type: getPageType(path),
      ts: new Date().toISOString(),
      ...properties,
    });
  } catch {
    // Analytics must never break the app.
  }
}

/** Identify a user (call after login / known identity only). Avoid PII. */
export function identifyUser(distinctId: string, traits: Props = {}) {
  if (typeof window === "undefined") return;
  try {
    if (!isAnalyticsReady()) return;
    posthog.identify(distinctId, traits);
  } catch {
    /* no-op */
  }
}

/** Reset identity on logout. */
export function resetAnalytics() {
  if (typeof window === "undefined") return;
  try {
    if (!isAnalyticsReady()) return;
    posthog.reset();
  } catch {
    /* no-op */
  }
}
