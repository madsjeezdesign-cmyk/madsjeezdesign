"use client";

/**
 * Routes each "creator-domain" slug to its archetype shell.
 *
 * Background: the original CreatorLanding was a single shared shell wrongly
 * applied to BOTH trades (electricista, albañil, arquitectos) and content
 * creators (streamer, youtuber, tiktoker, comunicadores). Semantic mismatch.
 *
 * Now:
 *  - Trades → TradeWorkerLanding (light, photo-led, restraint for arquitectos).
 *  - Creators → StreamerVodLanding with a `format` prop that switches the
 *    layout patterns per platform (NOT just an accent swap).
 *
 * Legacy CreatorLanding is kept exported for back-compat / fallback.
 */

import { CreatorLanding } from "./demo-creator-landing";
import { TradeWorkerLanding } from "./trade-worker-landing";
import { StreamerVodLanding } from "./streamer-vod-landing";

export type CreatorArchetype = "trade-worker" | "streamer-vod" | "legacy";

type CreatorFormat = "streamer" | "youtuber" | "tiktoker" | "comunicadores";

const SLUG_TO_ARCHETYPE: Record<string, CreatorArchetype> = {
  electricista: "trade-worker",
  albanil: "trade-worker",
  arquitectos: "trade-worker",

  streamer: "streamer-vod",
  youtuber: "streamer-vod",
  tiktoker: "streamer-vod",
  comunicadores: "streamer-vod",
};

const SLUG_TO_FORMAT: Record<string, CreatorFormat> = {
  streamer: "streamer",
  youtuber: "youtuber",
  tiktoker: "tiktoker",
  comunicadores: "comunicadores",
};

export function getCreatorArchetype(slug: string): CreatorArchetype {
  return SLUG_TO_ARCHETYPE[slug] ?? "legacy";
}

type Props = { slug: string };

/** Server-pickable archetype renderer for the /creator/ domain. */
export function CreatorArchetypeLanding({ slug }: Props) {
  const archetype = getCreatorArchetype(slug);
  switch (archetype) {
    case "trade-worker":
      return <TradeWorkerLanding slug={slug} />;
    case "streamer-vod":
      return <StreamerVodLanding slug={slug} format={SLUG_TO_FORMAT[slug] ?? "streamer"} />;
    default:
      return <CreatorLanding slug={slug} />;
  }
}
