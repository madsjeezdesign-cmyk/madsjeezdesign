"use client";

/**
 * Factory for the "creator-domain" demos.
 *
 * Routes through CreatorArchetypeLanding so each slug lands in the right
 * archetype shell (trade-worker for trades, streamer-vod for content creators).
 * Slugs not mapped fall back to the legacy CreatorLanding for back-compat.
 */

import { CreatorArchetypeLanding } from "./creator-archetype-router";

export function createCreatorDemo(slug: string) {
  return function CreatorDemo() {
    return <CreatorArchetypeLanding slug={slug} />;
  };
}

// Content creators
export const DemoStreamer = createCreatorDemo("streamer");
export const DemoYoutuber = createCreatorDemo("youtuber");
export const DemoTiktoker = createCreatorDemo("tiktoker");
export const DemoComunicadores = createCreatorDemo("comunicadores");

// Trade workers — moved into the creator domain so they get the correct
// trade-worker archetype shell instead of the misapplied gamer-saas chrome.
export const DemoElectricista = createCreatorDemo("electricista");
export const DemoAlbanil = createCreatorDemo("albanil");
export const DemoArquitectos = createCreatorDemo("arquitectos");
