"use client";

/**
 * Routes each commerce slug to its archetype shell.
 * Slugs not mapped here fall back to the legacy CommerceLanding for back-compat.
 */

import { CommerceLanding } from "./demo-commerce-landing";
import { TradeTrustLanding } from "./trade-trust-landing";
import { NeighborhoodWarmthLanding } from "./neighborhood-warmth-landing";
import { B2bAgencyLanding } from "./b2b-agency-landing";
import { RetailGridLanding } from "./retail-grid-landing";

export type CommerceArchetype = "trade-trust" | "neighborhood-warmth" | "b2b-agency" | "retail-grid" | "legacy";

const SLUG_TO_ARCHETYPE: Record<string, CommerceArchetype> = {
  // Trade trust — licensed trades, urgency + matrícula + photo of work
  gasista: "trade-trust",
  motores: "trade-trust",
  "taller-motos": "trade-trust",
  electricista: "trade-trust",
  albanil: "trade-trust",

  // Neighborhood warmth — local barrio commerce, warm voice
  almacen: "neighborhood-warmth",
  kiosco: "neighborhood-warmth",
  carniceria: "neighborhood-warmth",
  granja: "neighborhood-warmth",
  libreria: "neighborhood-warmth",
  supermercado: "neighborhood-warmth",

  // B2B agency — professional services with editorial restraint
  marketing: "b2b-agency",
  imprenta: "b2b-agency",
  arquitectos: "b2b-agency",

  // Retail grid — product-first e-commerce feel
  ropa: "retail-grid",
  bazar: "retail-grid",
  computacion: "retail-grid",
  celulares: "retail-grid",
  barberia: "retail-grid",
};

export function getCommerceArchetype(slug: string): CommerceArchetype {
  return SLUG_TO_ARCHETYPE[slug] ?? "legacy";
}

type Props = { slug: string };

/** Server-pickable archetype renderer. */
export function CommerceArchetypeLanding({ slug }: Props) {
  const archetype = getCommerceArchetype(slug);
  switch (archetype) {
    case "trade-trust":
      return <TradeTrustLanding slug={slug} />;
    case "neighborhood-warmth":
      return <NeighborhoodWarmthLanding slug={slug} />;
    case "b2b-agency":
      return <B2bAgencyLanding slug={slug} />;
    case "retail-grid":
      return <RetailGridLanding slug={slug} />;
    default:
      return <CommerceLanding slug={slug} />;
  }
}
