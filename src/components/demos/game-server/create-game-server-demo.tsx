"use client";

import { GameServerArchetypeRouter } from "./game-server-archetype-router";

/**
 * Factory used by `src/components/demos/index.ts` to materialize a per-slug
 * demo component. Each demo now resolves to one of three archetype shells
 * via {@link GameServerArchetypeRouter}.
 *
 * The legacy single shell at `./demo-gameserver-landing` is preserved for
 * back-compat and is intentionally NOT exported from here. To restore the
 * old visual for a slug, import `GameServerLanding` directly.
 */
export function createGameServerDemo(slug: string) {
  return function GameServerDemo() {
    return <GameServerArchetypeRouter slug={slug} />;
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
