"use client";

import { CreatorLanding } from "./demo-creator-landing";

export function createCreatorDemo(slug: string) {
  return function CreatorDemo() {
    return <CreatorLanding slug={slug} />;
  };
}

export const DemoStreamer = createCreatorDemo("streamer");
export const DemoYoutuber = createCreatorDemo("youtuber");
export const DemoTiktoker = createCreatorDemo("tiktoker");
export const DemoComunicadores = createCreatorDemo("comunicadores");
