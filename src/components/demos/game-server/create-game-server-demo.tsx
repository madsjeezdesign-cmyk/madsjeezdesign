"use client";

import { GameServerLanding } from "./demo-gameserver-landing";

export function createGameServerDemo(slug: string) {
  return function GameServerDemo() {
    return <GameServerLanding slug={slug} />;
  };
}

export const DemoMinecraft = createGameServerDemo("minecraft");
export const DemoRoblox = createGameServerDemo("roblox");
export const DemoCs2 = createGameServerDemo("cs2");
export const DemoFivem = createGameServerDemo("fivem");
export const DemoMuonline = createGameServerDemo("muonline");
export const DemoLineage2 = createGameServerDemo("lineage2");
export const DemoRust = createGameServerDemo("rust");
export const DemoArk = createGameServerDemo("ark");
export const DemoTerraria = createGameServerDemo("terraria");
export const DemoPalworld = createGameServerDemo("palworld");
