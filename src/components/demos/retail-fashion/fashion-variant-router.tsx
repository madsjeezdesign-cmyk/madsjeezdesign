"use client";

/**
 * Fashion variant router.
 *
 * Maps a fashion demo slug to one of 4 visual chrome variants (or to the
 * legacy shared shell for back-compat). The mapping lives here so each variant
 * stays cleanly decoupled from the shared `retail-fashion-demos.ts` config.
 *
 * Add new slugs to `SLUG_TO_VARIANT`. Default = legacy shell.
 */

import { RetailFashionLanding } from "./demo-retail-fashion-landing";
import { NordicMinimalLanding } from "./variants/nordic-minimal-landing";
import { EditorialLanding } from "./variants/editorial-landing";
import { StreetUrbanLanding } from "./variants/street-urban-landing";
import { BohemianNightLanding } from "./variants/bohemian-night-landing";

export type FashionVariantKey =
  | "legacy"
  | "nordic-minimal"
  | "editorial"
  | "street-urban"
  | "bohemian-night";

/**
 * Source of truth for which slug renders with which chrome. Keep close to the
 * variant components so designers can re-route a brand by editing one map.
 */
export const SLUG_TO_VARIANT: Record<string, FashionVariantKey> = {
  // A — Nordic Minimal
  "moda-linnea": "nordic-minimal",
  "moda-maison-elle": "nordic-minimal",

  // B — Editorial
  "moda-silk-atelier": "editorial",
  "moda-vogue-estudio": "editorial",
  "moda-maison-rose": "editorial",

  // C — Street / Urban
  "moda-urbano-chic": "street-urban",
  "moda-casa-nova": "street-urban",

  // D — Bohemian Night
  "moda-atelier-noir": "bohemian-night",
  "moda-luna-boutique": "bohemian-night",

  // Legacy back-compat (rich custom marketing block).
  "moda-infinita": "legacy",
};

type Props = { slug: string };

export function FashionVariantRouter({ slug }: Props) {
  const variant = SLUG_TO_VARIANT[slug] ?? "legacy";

  switch (variant) {
    case "nordic-minimal":
      return <NordicMinimalLanding slug={slug} />;
    case "editorial":
      return <EditorialLanding slug={slug} />;
    case "street-urban":
      return <StreetUrbanLanding slug={slug} />;
    case "bohemian-night":
      return <BohemianNightLanding slug={slug} />;
    case "legacy":
    default:
      return <RetailFashionLanding slug={slug} />;
  }
}
