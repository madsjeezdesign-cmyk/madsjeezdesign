"use client";

import { useEffect } from "react";
import {
  ANALYTICS_EVENTS,
  getPageType,
  trackEvent,
  type AnalyticsEvent,
} from "@/lib/analytics";

/**
 * <PostHogSmartCapture> — one document-level click listener that turns
 * meaningful CTA clicks into semantic events on top of PostHog autocapture.
 *
 * It inspects the clicked <a>/<button> (or the nearest one), reads its text
 * + href, and matches against intent keywords. A single click emits at most
 * ONE semantic event (first matching rule wins) plus PostHog's own
 * $autocapture — no duplicate semantic events.
 *
 * Every emitted event carries: button_text, href (link destination, if any),
 * page, page_type, ts. (page/page_type/ts added by trackEvent.)
 *
 * Privacy: button text is truncated to 80 chars and we never read input
 * values here.
 */

type Rule = {
  event: AnalyticsEvent;
  /** Matched against lowercased text + href. */
  keywords: string[];
};

// Order matters — first match wins. WhatsApp first (most specific href).
const RULES: Rule[] = [
  {
    event: ANALYTICS_EVENTS.CLICK_WHATSAPP,
    keywords: ["whatsapp", "wa.me", "api.whatsapp.com"],
  },
  { event: ANALYTICS_EVENTS.CLICK_VENDER, keywords: ["vender", "publicar"] },
  { event: ANALYTICS_EVENTS.CLICK_COMPRAR, keywords: ["comprar", "checkout"] },
  {
    event: ANALYTICS_EVENTS.CLICK_REGISTRO,
    keywords: ["registrarme", "registrarse", "registro", "crear cuenta"],
  },
  {
    event: ANALYTICS_EVENTS.LEAD_GENERADO,
    keywords: ["contacto", "consultar", "presupuesto", "cotizar", "agendar"],
  },
];

function classify(text: string, href: string): AnalyticsEvent | null {
  const haystack = `${text} ${href}`.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((k) => haystack.includes(k))) return rule.event;
  }
  return null;
}

export function PostHogSmartCapture() {
  useEffect(() => {
    function onClick(ev: MouseEvent) {
      const target = ev.target as Element | null;
      if (!target) return;
      const el = target.closest<HTMLElement>("a, button, [role='button']");
      if (!el) return;

      const text = (el.textContent || "").trim().slice(0, 80);
      const href = el instanceof HTMLAnchorElement ? el.href : "";
      const event = classify(text, href);
      if (!event) return;

      trackEvent(event, {
        button_text: text,
        href: href || undefined,
        element: el.tagName.toLowerCase(),
      });
    }

    // Capture phase so we still log even if the handler stops propagation.
    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}

/** Re-export for convenience so callers can `import { getPageType }` here too. */
export { getPageType };
