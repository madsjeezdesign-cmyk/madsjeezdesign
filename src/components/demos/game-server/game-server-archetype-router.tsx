"use client";

import { VoxelBlockyLanding } from "./voxel-blocky-landing";
import { MmoMedievalLanding } from "./mmo-medieval-landing";
import { TacticalFpsLanding } from "./tactical-fps-landing";

/**
 * Game-server archetype mapping.
 *
 * The legacy single-shell landing (`demo-gameserver-landing.tsx`) is kept for
 * back-compat. New game-server slugs should be mapped into one of three
 * archetype shells with distinct visual identities:
 *
 * - voxel   → playful blocky / pixel-grid (Minecraft, Roblox, Terraria)
 * - mmo     → ornamental parchment / serif (MU Online, Lineage 2, ARK)
 * - tactical→ HUD-driven dark mono (CS2, Rust, FiveM, Palworld)
 */
export type GameServerArchetype = "voxel" | "mmo" | "tactical";

export const GAME_SERVER_ARCHETYPE_MAP: Record<string, GameServerArchetype> = {
  minecraft: "voxel",
  roblox: "voxel",
  terraria: "voxel",

  muonline: "mmo",
  lineage2: "mmo",
  ark: "mmo",

  cs2: "tactical",
  rust: "tactical",
  fivem: "tactical",
  palworld: "tactical",
};

export function resolveGameServerArchetype(slug: string): GameServerArchetype {
  return GAME_SERVER_ARCHETYPE_MAP[slug] ?? "tactical";
}

type Props = { slug: string };

export function GameServerArchetypeRouter({ slug }: Props) {
  const archetype = resolveGameServerArchetype(slug);
  if (archetype === "voxel") return <VoxelBlockyLanding slug={slug} />;
  if (archetype === "mmo") return <MmoMedievalLanding slug={slug} />;
  return <TacticalFpsLanding slug={slug} />;
}
