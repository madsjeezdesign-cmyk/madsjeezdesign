/** Configuración por juego para landings de hosting / servidores privados. */

export type GameServerPlan = {
  name: string;
  ram: string;
  slots: string;
  storage: string;
  price: string;
  popular?: boolean;
};

export type GameServerDemoConfig = {
  slug: string;
  brand: string;
  gameLabel: string;
  industryLabel: string;
  accent: string;
  heroKicker: string;
  heroTitle: string;
  heroHighlight: string;
  heroSub: string;
  pingMs: string;
  onlinePlayers: string;
  plans: GameServerPlan[];
  features: readonly string[];
  mods: readonly string[];
  locations: readonly string[];
  faq: readonly { q: string; a: string }[];
};

export const GAME_SERVER_DEMOS: GameServerDemoConfig[] = [
  {
    slug: "minecraft",
    brand: "CubeNode",
    gameLabel: "Minecraft",
    industryLabel: "Java & Bedrock",
    accent: "#22c55e",
    heroKicker: "Servidores premium · modpacks",
    heroTitle: "Tu mundo.",
    heroHighlight: "Tu reglas.",
    heroSub:
      "Hosts optimizados para Survival, Skyblock, Factions y modpacks pesados con instalación en un click y backups automáticos cada 6 h.",
    pingMs: "18 ms",
    onlinePlayers: "2.840",
    plans: [
      { name: "Grass", ram: "4 GB", slots: "20", storage: "40 GB NVMe", price: "$8.900" },
      { name: "Diamond", ram: "8 GB", slots: "50", popular: true, storage: "80 GB NVMe", price: "$15.400" },
      { name: "Netherite", ram: "16 GB", slots: "120", storage: "160 GB NVMe", price: "$28.200" },
    ],
    features: [
      "Panel Pterodactyl en español",
      "Instalador de modpacks CurseForge",
      "Anti-DDoS L3/L7 incluido",
      "Backups S3 automáticos",
      "Subdominio gratis .cubenode.demo",
      "Soporte Discord prioritario",
    ],
    mods: ["Paper", "Forge", "Fabric", "Spigot", "Mohist", "Velocity"],
    locations: ["Buenos Aires", "São Paulo", "Miami", "Madrid"],
    faq: [
      { q: "¿Java o Bedrock?", a: "Ambos. Elegís el tipo al crear el servidor y podés migrar de plan sin perder el mundo." },
      { q: "¿Cuánto tarda el deploy?", a: "Entre 45 y 90 segundos según el modpack seleccionado." },
    ],
  },
  {
    slug: "roblox",
    brand: "BloxLayer",
    gameLabel: "Roblox",
    industryLabel: "Experiencias privadas",
    accent: "#f43f5e",
    heroKicker: "Private servers · experiences",
    heroTitle: "Experiencias",
    heroHighlight: "sin límites.",
    heroSub:
      "Infraestructura para experiences, universos RP y minijuegos con escalado automático y monitoreo de concurrencia en tiempo real.",
    pingMs: "22 ms",
    onlinePlayers: "1.120",
    plans: [
      { name: "Starter", ram: "2 vCPU", slots: "30", storage: "25 GB", price: "$12.500" },
      { name: "Creator", ram: "4 vCPU", slots: "80", popular: true, storage: "60 GB", price: "$22.800" },
      { name: "Studio", ram: "8 vCPU", slots: "200", storage: "120 GB", price: "$41.000" },
    ],
    features: [
      "API de despliegue para estudios",
      "Logs y métricas en vivo",
      "Escalado horizontal",
      "CDN para assets",
      "Entorno staging + prod",
      "Facturación por uso pico",
    ],
    mods: ["Brookhaven RP", "Tycoon kits", "Obby maps", "Voice zones", "Custom UI", "Analytics"],
    locations: ["Miami", "Ashburn", "Los Angeles", "Madrid"],
    faq: [
      { q: "¿Es para Roblox oficial?", a: "Demo de infraestructura para experiences privadas y pruebas de comunidad." },
      { q: "¿Incluye moderación?", a: "Panel con roles, bans y whitelist exportable." },
    ],
  },
  {
    slug: "cs2",
    brand: "StrikeHost",
    gameLabel: "Counter-Strike 2",
    industryLabel: "128 tick · competitivo",
    accent: "#f59e0b",
    heroKicker: "Matchmaking privado",
    heroTitle: "Clutch",
    heroHighlight: "sin lag.",
    heroSub:
      "Servidores dedicados 128 tick con anti-cheat comunitario, GOTV, warmups configurables y plugins de scrims profesionales.",
    pingMs: "14 ms",
    onlinePlayers: "960",
    plans: [
      { name: "Scrim", ram: "6 GB", slots: "12", storage: "30 GB", price: "$11.200" },
      { name: "Premier", ram: "10 GB", slots: "24", popular: true, storage: "50 GB", price: "$19.600" },
      { name: "LAN", ram: "14 GB", slots: "32", storage: "80 GB", price: "$32.400" },
    ],
    features: [
      "128 tick garantizado",
      "Plugins MetaMod + CSS",
      "Demo GOTV en la nube",
      "IP dedicada opcional",
      "Rcon seguro",
      "Mapas workshop rápidos",
    ],
    mods: ["Retake", "Surf", "KZ", "AWP only", "Execute trainer", "1v1 arenas"],
    locations: ["Buenos Aires", "Santiago", "Miami", "Frankfurt"],
    faq: [
      { q: "¿Tickrate estable?", a: "Sí, priorizamos CPU de alto reloj para hitreg consistente." },
      { q: "¿Torneos?", a: "Plan LAN incluye slots de espectadores y backup entre mapas." },
    ],
  },
  {
    slug: "fivem",
    brand: "RoleNode",
    gameLabel: "GTA V · FiveM",
    industryLabel: "Roleplay & economy",
    accent: "#a855f7",
    heroKicker: "RP serious · economy",
    heroTitle: "La ciudad",
    heroHighlight: "es tuya.",
    heroSub:
      "FXServer optimizado para RP serio con ESX/QBCore preinstalado, txAdmin, onesync infinity y base de datos MariaDB incluida.",
    pingMs: "20 ms",
    onlinePlayers: "740",
    plans: [
      { name: "Street", ram: "8 GB", slots: "64", storage: "60 GB", price: "$18.900" },
      { name: "City", ram: "16 GB", slots: "128", popular: true, storage: "120 GB", price: "$34.500" },
      { name: "Metropolis", ram: "32 GB", slots: "256", storage: "240 GB", price: "$59.900" },
    ],
    features: [
      "txAdmin incluido",
      "MariaDB local",
      "Artifacts actualizados",
      "Anti-DDoS para UDP",
      "Voz optimizada",
      "Soporte para custom cars",
    ],
    mods: ["ESX Legacy", "QBCore", "vMenu", "NoPixel pack", "Economy+", "Whitelist"],
    locations: ["Buenos Aires", "Miami", "Madrid", "London"],
    faq: [
      { q: "¿Cuántos slots reales?", a: "Recomendamos 64–128 según scripts; te asesoramos antes del deploy." },
      { q: "¿Licencia GTA?", a: "Debés tener GTA V legítimo; ayudamos con la guía de conexión." },
    ],
  },
  {
    slug: "muonline",
    brand: "LegacyCore",
    gameLabel: "MU Online",
    industryLabel: "Season 6 · custom",
    accent: "#eab308",
    heroKicker: "Servidores clásicos",
    heroTitle: "Reset",
    heroHighlight: "épico.",
    heroSub:
      "Hosts para Season 6, Ex700 y custom con anti-hack, launcher propio y panel de cash shop integrado para tu season.",
    pingMs: "24 ms",
    onlinePlayers: "510",
    plans: [
      { name: "Bronze", ram: "4 GB", slots: "100", storage: "40 GB", price: "$9.800" },
      { name: "Gold", ram: "8 GB", slots: "500", popular: true, storage: "80 GB", price: "$17.400" },
      { name: "Legend", ram: "12 GB", slots: "1000", storage: "120 GB", price: "$29.600" },
    ],
    features: [
      "Anti-hack classic",
      "Launcher branding",
      "SQL Server tuning",
      "Event scheduler",
      "Web registration",
      "DDoS para game ports",
    ],
    mods: ["Season 6", "Ex700", "Duel master", "Castle siege", "Offattack", "Custom wings"],
    locations: ["Buenos Aires", "São Paulo", "Miami"],
    faq: [
      { q: "¿Migración de files?", a: "Subimos tu data folder y SQL con downtime planificado mínimo." },
      { q: "¿Players fake?", a: "No. Métricas reales y alertas de CPU/RAM." },
    ],
  },
  {
    slug: "lineage2",
    brand: "L2Forge",
    gameLabel: "Lineage II",
    industryLabel: "Chronicle · mid-rate",
    accent: "#6366f1",
    heroKicker: "Mid x50 · high five",
    heroTitle: "Siege",
    heroHighlight: "legendario.",
    heroSub:
      "Java y L2OFF con geodata, NPC buffer, event engine y protección contra dupes para crónicas Interlude a High Five.",
    pingMs: "26 ms",
    onlinePlayers: "380",
    plans: [
      { name: "Clan", ram: "6 GB", slots: "200", storage: "50 GB", price: "$10.600" },
      { name: "Alliance", ram: "10 GB", slots: "500", popular: true, storage: "90 GB", price: "$18.200" },
      { name: "Empire", ram: "16 GB", slots: "1500", storage: "140 GB", price: "$31.800" },
    ],
    features: [
      "Geodata incluida",
      "Login server dedicado",
      "Panel de rates",
      "Backup SQL horario",
      "Website template",
      "Soporte en castellano",
    ],
    mods: ["Interlude", "High Five", "Essence pack", "Olympiad fix", "Buffer NPC", "Auto events"],
    locations: ["Buenos Aires", "Frankfurt", "Warsaw"],
    faq: [
      { q: "¿L2OFF o Java?", a: "Ambos stacks disponibles al crear el servidor." },
      { q: "¿Olympiad estable?", a: "Incluimos parches recomendados según chronicle." },
    ],
  },
  {
    slug: "rust",
    brand: "SurvivalGrid",
    gameLabel: "Rust",
    industryLabel: "Wiped · modded",
    accent: "#cd412b",
    heroKicker: "Wipe schedule · oxide",
    heroTitle: "Domina",
    heroHighlight: "el wipe.",
    heroSub:
      "Servidores vanilla y modded con Oxide/uMod, RCON, mapas custom y programación de wipes con anuncio automático en Discord.",
    pingMs: "19 ms",
    onlinePlayers: "620",
    plans: [
      { name: "Solo", ram: "8 GB", slots: "50", storage: "60 GB", price: "$14.800" },
      { name: "Clan", ram: "12 GB", slots: "100", popular: true, storage: "100 GB", price: "$23.500" },
      { name: "Mayhem", ram: "20 GB", slots: "200", storage: "180 GB", price: "$38.900" },
    ],
    features: [
      "Oxide preinstalado",
      "RCON web",
      "Mapas procedural/custom",
      "Wipe scheduler",
      "Discord bot",
      "FPS boost flags",
    ],
    mods: ["2x gather", "TP home", "Kits", "Raid alerts", "Clans", "Custom loot"],
    locations: ["Buenos Aires", "Miami", "London"],
    faq: [
      { q: "¿Mapas custom?", a: "Subís tu .map y lo vinculamos en el panel antes del wipe." },
      { q: "¿Pop mínimo?", a: "Recursos escalan según jugadores conectados." },
    ],
  },
  {
    slug: "ark",
    brand: "PrimalHost",
    gameLabel: "ARK: Survival",
    industryLabel: "Ascended · Evolved",
    accent: "#14b8a6",
    heroKicker: "Clusters · mods",
    heroTitle: "Domesticá",
    heroHighlight: "el mapa.",
    heroSub:
      "Clusters PvE/PvP con transferencias, mods Steam Workshop y backups del savegame antes de cada actualización de Wildcard.",
    pingMs: "28 ms",
    onlinePlayers: "290",
    plans: [
      { name: "Tribe", ram: "12 GB", slots: "30", storage: "100 GB", price: "$19.900" },
      { name: "Alpha", ram: "20 GB", slots: "70", popular: true, storage: "180 GB", price: "$36.400" },
      { name: "Cluster", ram: "32 GB", slots: "100", storage: "320 GB", price: "$62.000" },
    ],
    features: [
      "Workshop auto-update",
      "Cluster transfer",
      "Savegame backup",
      "CPU turbo boost",
      "RCON avanzado",
      "Discord wipe alerts",
    ],
    mods: ["S+", "DinoOverhaul", "Epic loot", "The Island", "Fjordur", "Primitive+"],
    locations: ["Miami", "Madrid", "Sydney"],
    faq: [
      { q: "¿ARK Ascended?", a: "Sí, plan Alpha soporta ASA con GPU dedicada demo." },
      { q: "¿Tamaño de mods?", a: "Hasta 50 GB en plan Cluster con almacenamiento expandible." },
    ],
  },
  {
    slug: "terraria",
    brand: "TerraNode",
    gameLabel: "Terraria",
    industryLabel: "tModLoader",
    accent: "#a78bfa",
    heroKicker: "tModLoader · vanilla",
    heroTitle: "Bosses",
    heroHighlight: "co-op.",
    heroSub:
      "Hosts para vanilla y tModLoader con worlds en la nube, password y max players configurables desde el panel móvil.",
    pingMs: "21 ms",
    onlinePlayers: "180",
    plans: [
      { name: "Journey", ram: "2 GB", slots: "8", storage: "20 GB", price: "$5.400" },
      { name: "Expert", ram: "4 GB", slots: "16", popular: true, storage: "40 GB", price: "$9.200" },
      { name: "Master", ram: "6 GB", slots: "32", storage: "60 GB", price: "$14.600" },
    ],
    features: [
      "tModLoader 1 click",
      "World vault",
      "Auto-save",
      "Mobile panel",
      "Mods populares",
      "Cross-play notes",
    ],
    mods: ["Calamity", "Thorium", "Spirit", "Exxo", "Redemption", "Vanilla+"],
    locations: ["Buenos Aires", "Miami", "Madrid"],
    faq: [
      { q: "¿Cuántos mods?", a: "Hasta 50 mods en plan Master con 6 GB RAM." },
      { q: "¿World corrupt?", a: "Snapshots automáticos antes de cada update." },
    ],
  },
  {
    slug: "palworld",
    brand: "PalCluster",
    gameLabel: "Palworld",
    industryLabel: "Co-op · dedicated",
    accent: "#06b6d4",
    heroKicker: "Dedicated · co-op",
    heroTitle: "Pals",
    heroHighlight: "online.",
    heroSub:
      "Servidores dedicados para co-op y comunidades con saves protegidos, restarts programados y mods cuando estén soportados.",
    pingMs: "23 ms",
    onlinePlayers: "340",
    plans: [
      { name: "Nest", ram: "8 GB", slots: "8", storage: "50 GB", price: "$13.600" },
      { name: "Sanctuary", ram: "12 GB", slots: "16", popular: true, storage: "80 GB", price: "$21.800" },
      { name: "Legend", ram: "16 GB", slots: "32", storage: "120 GB", price: "$33.200" },
    ],
    features: [
      "Save en NVMe",
      "Restart scheduler",
      "Password / whitelist",
      "Discord status bot",
      "Low ping routing",
      "Updates guiados",
    ],
    mods: ["XP boost", "Palbox+", "Build free", "Hardcore", "Event weekends", "Custom pals"],
    locations: ["Buenos Aires", "Miami", "Tokyo", "Frankfurt"],
    faq: [
      { q: "¿Slots recomendados?", a: "8–16 para co-op estable; más slots requieren más RAM." },
      { q: "¿Pérdida de pals?", a: "Backup antes de cada patch oficial." },
    ],
  },
];

export const GAME_SERVER_SLUGS = GAME_SERVER_DEMOS.map((d) => d.slug);

export function getGameServerConfig(slug: string): GameServerDemoConfig | undefined {
  return GAME_SERVER_DEMOS.find((d) => d.slug === slug);
}
