/**
 * Imágenes y metadatos de medios para demos (Unsplash CC-friendly).
 * Videos: clips de ejemplo públicos; sustituir por producción propia si aplica.
 */

import { DEMO_SLUGS } from "@/lib/demos-registry";
import { DEMO_IMAGES, DEMO_SHOPS } from "@/lib/demo-visual-catalog";

export const DEMO_VIDEO_POOL = [
  "https://filesamples.com/samples/video/mp4/sample_640x360.mp4",
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
] as const;

function pickDemoVideo(slug: string): string {
  const i = DEMO_SLUGS.indexOf(slug as (typeof DEMO_SLUGS)[number]);
  const idx = i >= 0 ? i % DEMO_VIDEO_POOL.length : 0;
  return DEMO_VIDEO_POOL[idx]!;
}

function pickDemoVideoFallback(slug: string): string {
  const i = DEMO_SLUGS.indexOf(slug as (typeof DEMO_SLUGS)[number]);
  const idx = i >= 0 ? i % DEMO_VIDEO_POOL.length : 0;
  const alt = (idx + 3) % DEMO_VIDEO_POOL.length;
  return DEMO_VIDEO_POOL[alt]!;
}

export type DemoLeadTheme = {
  section: string;
  card: string;
  label: string;
  input: string;
  button: string;
  focus: string;
  /** Texto oscuro para fondos claros (ej. estética) */
  invert?: boolean;
};

export type DemoShopProduct = {
  id: string;
  name: string;
  price: string;
  note?: string;
};

/** Presentación del bloque de compra demo (cada layout es visualmente distinto). */
export type DemoShopFlowLayout = "grid" | "list" | "featured" | "minimal" | "bento";

export type DemoShopConfig = {
  headline: string;
  sub: string;
  products: DemoShopProduct[];
  layout?: DemoShopFlowLayout;
  /** Reemplaza la etiqueta superior “E-commerce demo”. */
  eyebrow?: string;
};

export type DemoVisualPack = {
  cover: string;
  a: string;
  b: string;
  c: string;
  /** Imágenes extra para galería ampliada (5 fotos cuando ambas existen). */
  d?: string;
  e?: string;
  lead: DemoLeadTheme;
  shop: DemoShopConfig | null;
};

export type DemoVisualsResolved = DemoVisualPack & {
  videoSrc: string;
  /** Segunda fuente MP4 por si la CDN principal bloquea embeds en algunas redes. */
  videoFallbackSrc: string;
};

const u = (id: string, sig: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=82&${sig}`;

function gameServerLead(accent: string): DemoLeadTheme {
  return {
    section: "border-y border-white/5 bg-[#030712]",
    card: "rounded-2xl border border-white/10 bg-[#0b1220]/90 p-6 md:p-8",
    label: `text-[10px] font-bold uppercase tracking-widest text-[${accent}]/80`,
    input:
      "mt-1 w-full border-b border-white/10 bg-transparent px-0 py-3 text-sm text-white outline-none",
    button: `w-full rounded-xl bg-[${accent}] py-3.5 text-sm font-bold text-[#030712]`,
    focus: `focus:border-[${accent}]/50`,
  };
}

const creatorLead = gameServerLead;
const commerceLead = gameServerLead;

const GS_PLACEHOLDER = u("photo-1542751374-adc38448a05e", "ixlib=rb-4.0.3");

/** Cobertura por slug — mismas claves que DEMOS */
const DEMO_VISUAL_PACKS: Record<string, DemoVisualPack> = {
  ferreteria: {
    cover: u("photo-1504148455328-c376907d081c", "ixlib=rb-4.0.3"),
    a: u("photo-1625047509168-a7026f36de04", "ixlib=rb-4.0.3"),
    b: u("photo-1492144534655-ae79c964c9d7", "ixlib=rb-4.0.3"),
    c: u("photo-1504328345606-18bbc8c9d7d1", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-orange-500/20 bg-zinc-950",
      card: "rounded-2xl border border-white/10 bg-zinc-900/60 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-zinc-500",
      input:
        "mt-1 w-full rounded-xl border border-zinc-700 bg-black/60 px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-xl bg-orange-600 py-3.5 text-sm font-bold text-white",
      focus: "focus:border-orange-500/50",
    },
    shop: {
      headline: "Tienda online demo",
      sub: "Elegí productos, carrito y checkout simulado — flujo real en tu sitio.",
      products: [
        { id: "f1", name: "Taladro percutor 750 W + maletín", price: "$189.900" },
        { id: "f2", name: "Látex interior 20 L blanco", price: "$124.500", note: "Envío gratis +$200k" },
        { id: "f3", name: "Set bulonería mix 850 pzs", price: "$45.200" },
      ],
    },
  },
  restaurante: {
    cover: u("photo-1517248135467-4c7edcad34c4", "ixlib=rb-4.0.3"),
    a: u("photo-1414235077428-338989a2e8c0", "ixlib=rb-4.0.3"),
    b: u("photo-1555396273-367ea4eb4db5", "ixlib=rb-4.0.3"),
    c: u("photo-1559339352-11d035aa65de", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-white/5 bg-[#050505]",
      card: "border border-[#c29d5f]/20 bg-[#121212] p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-[#c29d5f]/80",
      input:
        "mt-1 w-full border-b border-white/10 bg-transparent px-0 py-3 text-sm font-light text-white outline-none",
      button:
        "lumina-btn-signature w-full py-3.5 text-[10px] font-black uppercase tracking-[0.3em]",
      focus: "focus:border-[#c29d5f]/50",
    },
    shop: {
      headline: "Pedí delivery (demo)",
      sub: "Combo maridaje, burger premium o menú degustación — demostración de carrito.",
      products: [
        { id: "r1", name: "Degustación 7 pasos (viernes)", price: "$85.000", note: "Seña 30%" },
        { id: "r2", name: "Burger norteña + papas", price: "$18.500" },
        { id: "r3", name: "Maridaje 4 copas", price: "$32.000" },
      ],
    },
  },
  estetica: {
    cover: u("photo-1560066984-138dadb4c035", "ixlib=rb-4.0.3"),
    a: u("photo-1522337360788-8b13dee7a37e", "ixlib=rb-4.0.3"),
    b: u("photo-1511499767150-a48a237f0083", "ixlib=rb-4.0.3"),
    c: u("photo-1600607687939-ce8a6c25118c", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-gray-100 bg-[#faf7f4]",
      card: "border border-[#c48e58]/10 bg-white p-6 shadow-sm md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-[#c48e58]",
      input:
        "mt-1 w-full border-b border-gray-200 bg-transparent px-0 py-3 text-sm text-[#3d3d3d] outline-none",
      button: "aura-btn w-full py-3.5 text-[10px] font-black uppercase tracking-[0.3em]",
      focus: "focus:border-[#c48e58]/50",
      invert: true,
    },
    shop: {
      headline: "Tienda facial home care (demo)",
      sub: "Kits y serums para retiro en sala o envío — ejemplo de e-commerce.",
      products: [
        { id: "e1", name: "Kit glow vitamina C 30 días", price: "$62.000" },
        { id: "e2", name: "Serum niacinamida 50 ml", price: "$38.500" },
        { id: "e3", name: "Protector solar facial SPF50", price: "$29.900", note: "Cruelty-free" },
      ],
    },
  },
  gimnasio: {
    cover: u("photo-1571902943202-507ec2618e8f", "ixlib=rb-4.0.3"),
    a: u("photo-1534438327276-14e5300c3a48", "ixlib=rb-4.0.3"),
    b: u("photo-1490645935967-10de6ba17061", "ixlib=rb-4.0.3"),
    c: u("photo-1517836357463-d25dfeac3438", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-white/5 bg-[#0e0e0e]",
      card: "border border-white/10 bg-[#050505] p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-[#dfff00]/80",
      input:
        "mt-1 w-full border-b border-white/10 bg-transparent px-0 py-3 text-sm text-white outline-none",
      button: "iron-btn-triple-a w-full py-3.5 text-[10px] font-black uppercase tracking-[0.3em]",
      focus: "focus:border-[#dfff00]/60",
    },
    shop: {
      headline: "Shop & suplementos (demo)",
      sub: "Proteína, shakers y accesorios — carrito de ejemplo.",
      products: [
        { id: "g1", name: "Whey 2 kg · chocolate", price: "$94.500" },
        { id: "g2", name: "Shaker Pulse 750 ml", price: "$12.800" },
        { id: "g3", name: "Cinta lev. 10 cm", price: "$8.200", note: "Stock limitado" },
      ],
    },
  },
  veterinaria: {
    cover: u("photo-1548199973-03cce0bbc87b", "ixlib=rb-4.0.3"),
    a: u("photo-1583337130417-3346a1be7dee", "ixlib=rb-4.0.3"),
    b: u("photo-1548199973-03cce0bbc87b", "ixlib=rb-4.0.3"),
    c: u("photo-1601758228041-f3b2795255f1", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-white/5 bg-[#050505]",
      card: "border border-[#c5a059]/15 bg-[#111111] p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-[#c5a059]/80",
      input:
        "mt-1 w-full border-b border-white/10 bg-transparent px-0 py-3 text-sm text-white outline-none",
      button: "paw-btn-gold w-full rounded-sm py-3.5 text-[10px] font-bold tracking-[0.2em]",
      focus: "focus:border-[#c5a059]/50",
    },
    shop: {
      headline: "Pet shop online (demo)",
      sub: "Alimento, juguetes y pipetas — ejemplo de compra.",
      products: [
        { id: "v1", name: "Alimento adulto 15 kg", price: "$78.000" },
        { id: "v2", name: "Pipeta antipulgas 2 u", price: "$22.400" },
        { id: "v3", name: "Pelota interactiva", price: "$9.900" },
      ],
    },
  },
  inmobiliaria: {
    cover: u("photo-1560518883-ce09059eeffa", "ixlib=rb-4.0.3"),
    a: u("photo-1600596542815-ffad4c1539a9", "ixlib=rb-4.0.3"),
    b: u("photo-1600585154340-be6161a56a0c", "ixlib=rb-4.0.3"),
    c: u("photo-1600607687939-ce8a6c25118c", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-white/5 bg-black",
      card: "border border-[#a68966]/15 bg-[#111111] p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-[#a68966]/80",
      input:
        "mt-1 w-full border-b border-white/10 bg-transparent px-0 py-3 text-sm text-white outline-none",
      button: "van-btn-vanguard w-full py-3.5 text-[10px] font-bold tracking-[0.2em]",
      focus: "focus:border-[#a68966]/50",
    },
    shop: null,
  },
  tech: {
    cover: u("photo-1451187580459-43490279c0fa", "ixlib=rb-4.0.3"),
    a: u("photo-1555949963-aa79dcee981c", "ixlib=rb-4.0.3"),
    b: u("photo-1460925895917-afdab827c52f", "ixlib=rb-4.0.3"),
    c: u("photo-1504639725590-34d0984388bd", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-cyan-500/20 bg-slate-950",
      card: "rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-cyan-400/80",
      input:
        "mt-1 w-full border-b border-white/10 bg-transparent px-0 py-3 font-mono text-sm text-white outline-none",
      button: "w-full bg-cyan-500 py-3.5 text-sm font-bold text-slate-950",
      focus: "focus:border-cyan-400/50",
    },
    shop: {
      headline: "Add-ons & seats (demo)",
      sub: "Checkout simulado para licencias y packs de integración.",
      products: [
        { id: "t1", name: "Seat Business +50k evt", price: "USD 149 / mes" },
        { id: "t2", name: "Premium support 24/7", price: "USD 399 / mes" },
        { id: "t3", name: "Onboarding assist 10 h", price: "USD 1.200", note: "One-time" },
      ],
    },
  },
  floreria: {
    cover: u("photo-1526047932273-341f2a7631f9", "ixlib=rb-4.0.3"),
    a: u("photo-1523694559144-4ec08b9e1146", "ixlib=rb-4.0.3"),
    b: u("photo-1614594975525-e45190c55d0b", "ixlib=rb-4.0.3"),
    c: u("photo-1591886960571-74d43a9d4166", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-emerald-800/10 bg-stone-100",
      card: "rounded-3xl border border-emerald-800/10 bg-white p-6 shadow-lg md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-emerald-800/80",
      input:
        "mt-1 w-full rounded-full border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none",
      button: "w-full rounded-full bg-emerald-800 py-3.5 text-sm font-bold text-white",
      focus: "focus:border-emerald-600",
      invert: true,
    },
    shop: {
      headline: "Flores a domicilio (demo)",
      sub: "Ramos y suscripciones — demostración de checkout.",
      products: [
        { id: "fl1", name: "Ramo field peonías", price: "$28.500" },
        { id: "fl2", name: "Suscripción tulipanes 4 semanas", price: "$19.900 / sem" },
        { id: "fl3", name: "Centro mesa evento", price: "$42.000", note: "Consultar fecha" },
      ],
    },
  },
  taller: {
    cover: u("photo-1530046339160-ce3e5b0c7a2f", "ixlib=rb-4.0.3"),
    a: u("photo-1486262715619-67b85e0b08d3", "ixlib=rb-4.0.3"),
    b: u("photo-1542282088-fe8426682e8f", "ixlib=rb-4.0.3"),
    c: u("photo-1613214149174-da7a397738b0", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-orange-600/20 bg-zinc-950",
      card: "rounded-sm border border-zinc-800 bg-zinc-900/80 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-orange-500/80",
      input:
        "mt-1 w-full rounded-sm border border-zinc-700 bg-black px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-sm bg-orange-600 py-3.5 text-sm font-bold text-white hover:bg-orange-500",
      focus: "focus:border-orange-500/50",
    },
    shop: {
      headline: "Repuestos & aceites (demo)",
      sub: "Reserva online con retiro en taller.",
      products: [
        { id: "ta1", name: "Service aceite 5W-30 sintético", price: "$96.000" },
        { id: "ta2", name: "Pastillas freno delanteras", price: "$124.000", note: "Incluye colocación demo" },
        { id: "ta3", name: "Filtro aire habitáculo", price: "$18.200" },
      ],
    },
  },
  abogados: {
    cover: u("photo-1589829545856-d10d557cf95f", "ixlib=rb-4.0.3"),
    a: u("photo-1505664194779-8beaceb93744", "ixlib=rb-4.0.3"),
    b: u("photo-1453723490680-798aa0ed62bd", "ixlib=rb-4.0.3"),
    c: u("photo-1473186578172-c141e6798ea4", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-amber-600/20 bg-[#0a0f18]",
      card: "border border-slate-800 bg-slate-900/80 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-amber-500/80",
      input:
        "mt-1 w-full border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none",
      button: "w-full bg-amber-600 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-amber-500",
      focus: "focus:border-amber-500/50",
    },
    shop: null,
  },
  farmacia: {
    cover: u("photo-1587854692152-cbe660dbde88", "ixlib=rb-4.0.3"),
    a: u("photo-1576091160399-112ba8d25d1d", "ixlib=rb-4.0.3"),
    b: u("photo-1587854692152-cbe660dbde88", "ixlib=rb-4.0.3"),
    c: u("photo-1555633514-abcee6ab92e1", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-slate-200 bg-slate-50",
      card: "rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-cyan-600",
      input:
        "mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none",
      button: "w-full rounded-xl bg-cyan-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-600/25",
      focus: "focus:border-cyan-500/50",
      invert: true,
    },
    shop: {
      headline: "Farmacia online (demo)",
      sub: "OTC, dermocosmética y pañales — flujo con validación de edad en checkout real.",
      products: [
        { id: "fa1", name: "Pack pañales M x64", price: "$28.900" },
        { id: "fa2", name: "Protector solar FPS 50", price: "$21.400" },
        { id: "fa3", name: "Electrolitos sobres", price: "$6.500", note: "Máx. 6 u" },
      ],
    },
  },
  odontologia: {
    cover: u("photo-1629909613654-28e377c37b09", "ixlib=rb-4.0.3"),
    a: u("photo-1576091160399-112ba8d25d1d", "ixlib=rb-4.0.3"),
    b: u("photo-1587854692152-cbe660dbde88", "ixlib=rb-4.0.3"),
    c: u("photo-1555633514-abcee6ab92e1", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-sky-500/30 bg-sky-950",
      card: "rounded-2xl border border-white/10 bg-sky-900/30 p-6 backdrop-blur md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-sky-200/70",
      input:
        "mt-1 w-full rounded-xl border border-sky-700 bg-sky-950/60 px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-xl bg-sky-500 py-3.5 text-sm font-bold text-sky-950",
      focus: "focus:border-sky-300/50",
    },
    shop: {
      headline: "Higiene & blanqueamiento (demo)",
      sub: "Productos para retirar en recepción.",
      products: [
        { id: "o1", name: "Kit blanqueamiento casero", price: "$55.000" },
        { id: "o2", name: "Enjuague sin alcohol", price: "$8.900" },
        { id: "o3", name: "Cepillo eléctrico cabezal x2", price: "$18.500" },
      ],
    },
  },
  contadores: {
    cover: u("photo-1454165804606-c3d57bc86b40", "ixlib=rb-4.0.3"),
    a: u("photo-1554224155-6726b3ff858f", "ixlib=rb-4.0.3"),
    b: u("photo-1460925895917-afdab827c52f", "ixlib=rb-4.0.3"),
    c: u("photo-1507679799987-c73779587ccf", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-slate-700 bg-slate-950",
      card: "rounded-2xl border border-slate-700 bg-slate-900/60 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-slate-500",
      input:
        "mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-xl bg-slate-200 py-3.5 text-sm font-bold text-slate-900",
      focus: "focus:border-slate-400/50",
    },
    shop: null,
  },
  musica: {
    cover: u("photo-1511379938547-c1f69419868d", "ixlib=rb-4.0.3"),
    a: u("photo-1511671782779-c97d3d27a1d4", "ixlib=rb-4.0.3"),
    b: u("photo-1493225457124-a3eb161ffa5f", "ixlib=rb-4.0.3"),
    c: u("photo-1520523839897-bd0b52f945a0", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-violet-500/25 bg-violet-950",
      card: "rounded-2xl border border-violet-500/30 bg-black/40 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-violet-300/70",
      input:
        "mt-1 w-full rounded-xl border border-violet-800 bg-violet-950/50 px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-xl bg-fuchsia-500 py-3.5 text-sm font-bold text-white",
      focus: "focus:border-fuchsia-400/50",
    },
    shop: {
      headline: "Instrumentos & métodos (demo)",
      sub: "Libros, cuerdas y accesorios.",
      products: [
        { id: "m1", name: "Metodo Trinity prep + audio", price: "$14.500" },
        { id: "m2", name: "Encordado guitarra clásica", price: "$12.000", note: "Servicio" },
        { id: "m3", name: "Afinador clip pro", price: "$9.200" },
      ],
    },
  },
  detailing: {
    cover: u("photo-1503376780353-7e6692767b70", "ixlib=rb-4.0.3"),
    a: u("photo-1492144534655-ae79c964c9d7", "ixlib=rb-4.0.3"),
    b: u("photo-1619405399517-d7fce0f13302", "ixlib=rb-4.0.3"),
    c: u("photo-1503376780353-7e6692767b70", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-sky-500/20 bg-slate-950",
      card: "rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-slate-500",
      input:
        "mt-1 w-full rounded-xl border border-slate-700 bg-black px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-xl bg-sky-500 py-3.5 text-sm font-bold text-slate-950",
      focus: "focus:border-sky-400/50",
    },
    shop: {
      headline: "Cerámicos & kits (demo)",
      sub: "Reservá producto con retiro post servicio.",
      products: [
        { id: "d1", name: "Coating cerámico 9H", price: "$340.000", note: "Incluye pulido demo" },
        { id: "d2", name: "Shampoo pH neutro 1L", price: "$18.900" },
        { id: "d3", name: "Microfibra plush x3", price: "$15.200" },
      ],
    },
  },
  panaderia: {
    cover: u("photo-1509440159596-0249088772ff", "ixlib=rb-4.0.3"),
    a: u("photo-1414235077428-338989a2e8c0", "ixlib=rb-4.0.3"),
    b: u("photo-1555507036-ab1f4038808a", "ixlib=rb-4.0.3"),
    c: u("photo-1509440159596-0249088772ff", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-amber-800/40 bg-amber-950/80",
      card: "rounded-2xl border border-amber-800/50 bg-black/30 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-amber-200/60",
      input:
        "mt-1 w-full rounded-xl border border-amber-900/50 bg-amber-950/50 px-4 py-3 text-sm text-amber-50 outline-none",
      button: "w-full rounded-xl bg-amber-500 py-3.5 text-sm font-bold text-amber-950",
      focus: "focus:border-amber-300/50",
    },
    shop: {
      headline: "Pedidos & café (demo)",
      sub: "Encargá masas o combos lunch.",
      products: [
        { id: "p1", name: "Docena medialunas manteca", price: "$18.000" },
        { id: "p2", name: "Pan campo 1 kg", price: "$8.500" },
        { id: "p3", name: "Combo focaccia + cold brew", price: "$14.200", note: "Retiro 12–15 h" },
      ],
    },
  },
  viajes: {
    cover: u("photo-1488646953014-85cb44e25828", "ixlib=rb-4.0.3"),
    a: u("photo-1436491865332-7a61a109cc05", "ixlib=rb-4.0.3"),
    b: u("photo-1600596542815-ffad4c1539a9", "ixlib=rb-4.0.3"),
    c: u("photo-1504639725590-34d0984388bd", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-teal-500/30 bg-teal-950",
      card: "rounded-2xl border border-teal-800 bg-teal-900/40 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-teal-200/70",
      input:
        "mt-1 w-full rounded-xl border border-teal-700 bg-teal-950/70 px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-xl bg-teal-500 py-3.5 text-sm font-bold text-teal-950",
      focus: "focus:border-teal-300/50",
    },
    shop: {
      headline: "Paquetes destacados (demo)",
      sub: "Seña y voucher digital simulados.",
      products: [
        { id: "vi1", name: "Escape 4 noches · café + traslados", price: "USD 890 p/p" },
        { id: "vi2", name: "Crucero veranda · 7 noches", price: "USD 2.400 cabin" },
        { id: "vi3", name: "MICE day meeting + AV", price: "Cotizar", note: "Sobre brief" },
      ],
    },
  },
  limpieza: {
    cover: u("photo-1581578731548-c64695cc6952", "ixlib=rb-4.0.3"),
    a: u("photo-1554224155-6726b3ff858f", "ixlib=rb-4.0.3"),
    b: u("photo-1557683316-973673baf926", "ixlib=rb-4.0.3"),
    c: u("photo-1517836357463-d25dfeac3438", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-indigo-500/30 bg-slate-950",
      card: "rounded-2xl border border-indigo-900/50 bg-slate-900/60 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-indigo-200/70",
      input:
        "mt-1 w-full rounded-xl border border-indigo-900/60 bg-slate-950 px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-xl bg-indigo-500 py-3.5 text-sm font-bold text-white",
      focus: "focus:border-indigo-400/50",
    },
    shop: {
      headline: "Insumos corporativos (demo)",
      sub: "Pedido recurrente con SLA.",
      products: [
        { id: "l1", name: "Kit higiene baños 50 dispensers", price: "$92.000 / mes" },
        { id: "l2", name: "Rollos microfibra azul x200", price: "$38.500" },
        { id: "l3", name: "Químico piso neutro 5 L x4", price: "$44.200" },
      ],
    },
  },
  foto: {
    cover: u("photo-1516035069371-29a1b244cc32", "ixlib=rb-4.0.3"),
    a: u("photo-1542038784456-1ea8e935640e", "ixlib=rb-4.0.3"),
    b: u("photo-1492691527719-9d1e07e534b4", "ixlib=rb-4.0.3"),
    c: u("photo-1452587925148-ce544e77e70d", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-amber-700/30 bg-zinc-950",
      card: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-zinc-500",
      input:
        "mt-1 w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-xl bg-amber-500 py-3.5 text-sm font-bold text-zinc-950",
      focus: "focus:border-amber-400/50",
    },
    shop: {
      headline: "Packs & addons (demo)",
      sub: "Reserva horas y licencias de uso.",
      products: [
        { id: "fo1", name: "Pack e-commerce 12 fotos", price: "$95.000" },
        { id: "fo2", name: "Color grade LUT marca", price: "$28.000", note: "Add-on" },
        { id: "fo3", name: "Rush 24 h stills", price: "+35% sobre pack", note: "Surcharge demo" },
      ],
    },
  },
  optica: {
    cover: u("photo-1574258495973-f010dfbb5371", "ixlib=rb-4.0.3"),
    a: u("photo-1511499767150-a48a237f0083", "ixlib=rb-4.0.3"),
    b: u("photo-1600607687939-ce8a6c25118c", "ixlib=rb-4.0.3"),
    c: u("photo-1574258495973-f010dfbb5371", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-sky-600/30 bg-slate-950",
      card: "rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-sky-200/70",
      input:
        "mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-xl bg-sky-500 py-3.5 text-sm font-bold text-slate-950",
      focus: "focus:border-sky-400/50",
    },
    shop: {
      headline: "Armazones & cristales (demo)",
      sub: "Armado posterior a examen — ejemplo de carrito.",
      products: [
        { id: "op1", name: "Armazón titanio ultraliviano", price: "$118.000" },
        { id: "op2", name: "Cristales antirreflejo full", price: "$154.000", note: "Con formula demo" },
        { id: "op3", name: "Estuche rígido premium", price: "$12.900" },
      ],
    },
  },
  heladeria: {
    cover: u("photo-1563805042-76840396a842", "ixlib=rb-4.0.3"),
    a: u("photo-1497034825420-c936a79e04da", "ixlib=rb-4.0.3"),
    b: u("photo-1578985545062-69928b1d9587", "ixlib=rb-4.0.3"),
    c: u("photo-1556679343-c7306c1976bc", "ixlib=rb-4.0.3"),
    d: u("photo-1580915411954-282cb1b99deb", "ixlib=rb-4.0.3"),
    e: u("photo-1501447529947-6299e75df4aa", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-fuchsia-500/25 bg-[#1a0b18]",
      card: "rounded-[2rem] border border-fuchsia-500/25 bg-gradient-to-br from-fuchsia-950/50 to-cyan-950/30 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-fuchsia-200/70",
      input:
        "mt-1 w-full rounded-2xl border border-fuchsia-500/30 bg-black/40 px-4 py-3 text-sm text-fuchsia-50 outline-none",
      button: "w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 py-3.5 text-sm font-bold text-white",
      focus: "focus:border-cyan-400/50",
    },
    shop: {
      eyebrow: "Heladería · pedidos de mostrador",
      headline: "Potes, cucuruchos y fiestas (demo)",
      sub: "Sabores de estación con trazabilidad de leche y fruta. Reservá torta helada o catering en carrito simulado.",
      layout: "featured",
      products: [
        { id: "he1", name: "Caja degustación 6 sabores", price: "$18.500", note: "Retiro 2 h" },
        { id: "he2", name: "Pote 1 L · pistacchio Sicilia", price: "$14.200" },
        { id: "he3", name: "Barra movil 50 cucuruchos", price: "$210.000", note: "Evento +30 km" },
      ],
    },
  },
  lavadero: {
    cover: u("photo-1520340351874-b922bb932d21", "ixlib=rb-4.0.3"),
    a: u("photo-1489824904134-891ab64532f1", "ixlib=rb-4.0.3"),
    b: u("photo-1503376780353-7e6692767b70", "ixlib=rb-4.0.3"),
    c: u("photo-1619405399517-d7fce0f13302", "ixlib=rb-4.0.3"),
    d: u("photo-1492144534655-ae79c964c9d7", "ixlib=rb-4.0.3"),
    e: u("photo-1486262715619-67b85e0a08d3", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-cyan-500/30 bg-slate-950",
      card: "rounded-xl border border-cyan-500/20 bg-slate-900/70 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-cyan-300/80",
      input:
        "mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-xl bg-cyan-500 py-3.5 text-sm font-bold text-slate-950",
      focus: "focus:border-cyan-300/50",
    },
    shop: {
      eyebrow: "Planes & membresía autolavado",
      headline: "Pagá el paquete y entrá sin fila (demo)",
      sub: "Suscripción con RFID o QR en parabrisas. Muestra de carrito para ceras rápidas y ozono.",
      layout: "list",
      products: [
        { id: "la1", name: "Wash Express + secado", price: "$8.900" },
        { id: "la2", name: "Membership ilimitado SUV", price: "$44.900 / mes", note: "1 vehículo" },
        { id: "la3", name: "Detailing mini interior", price: "$31.500", note: "Sillones + tablero" },
      ],
    },
  },
  seguridad: {
    cover: u("photo-1557597774-9d63fd9ecffc", "ixlib=rb-4.0.3"),
    a: u("photo-1507679799987-c73779587ccf", "ixlib=rb-4.0.3"),
    b: u("photo-1451187580459-43490279c0fa", "ixlib=rb-4.0.3"),
    c: u("photo-1510511459019-5dda772513fd", "ixlib=rb-4.0.3"),
    d: u("photo-1563986768609-322da13575f3", "ixlib=rb-4.0.3"),
    e: u("photo-1584433144859-1fc3ab64a978", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-emerald-500/30 bg-[#050a08]",
      card: "rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-emerald-300/70",
      input:
        "mt-1 w-full rounded-xl border border-emerald-900 bg-black/50 px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-xl bg-emerald-500 py-3.5 text-sm font-bold text-emerald-950",
      focus: "focus:border-emerald-300/50",
    },
    shop: {
      eyebrow: "Kit demo de expansión",
      headline: "Sumá nodos sin mudar el cableado (demo)",
      sub: "Checkout simulado para packs IoT listos. Instalación certificada en sitio real.",
      layout: "bento",
      products: [
        { id: "se1", name: "Kit 4 cámaras 4K + NVR 2 TB", price: "$389.000" },
        { id: "se2", name: "Central monitoreo 12 m + app", price: "$15.400 / mes" },
        { id: "se3", name: "Sensor perimetral triple tech", price: "$42.000", note: "Incluye sirena" },
      ],
    },
  },
  yoga: {
    cover: u("photo-1544367567-0f2fcb009e0b", "ixlib=rb-4.0.3"),
    a: u("photo-1506126613408-eca07ce68773", "ixlib=rb-4.0.3"),
    b: u("photo-1599901860904-17e6ed7083a0", "ixlib=rb-4.0.3"),
    c: u("photo-1545205597-3d9d02c29597", "ixlib=rb-4.0.3"),
    d: u("photo-1575052814086-42aed8426e4d", "ixlib=rb-4.0.3"),
    e: u("photo-1599447421410-3410dfe0c871", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-violet-300/25 bg-[#f4f1ff]",
      card: "rounded-3xl border border-violet-200 bg-white p-6 shadow-lg md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-violet-500",
      input:
        "mt-1 w-full rounded-2xl border border-violet-200 bg-violet-50/60 px-4 py-3 text-sm text-violet-950 outline-none",
      button: "w-full rounded-2xl bg-violet-600 py-3.5 text-sm font-bold text-white",
      focus: "focus:border-violet-500/50",
      invert: true,
    },
    shop: {
      eyebrow: "Passes & talleres",
      headline: "Comprá créditos y reservá mat (demo)",
      sub: "Ideal para corporativos con budget wellness. Activación automática en tu perfil demo.",
      layout: "minimal",
      products: [
        { id: "yo1", name: "Pack 10 clases mix", price: "$58.000", note: "90 días" },
        { id: "yo2", name: "Retiro breathwork finde", price: "$112.000" },
        { id: "yo3", name: "Mat mandukaPro · sala", price: "$18.500", note: "Retiro o envío" },
      ],
    },
  },
  hotel: {
    cover: u("photo-1566073771259-6a8506099945", "ixlib=rb-4.0.3"),
    a: u("photo-1631049307264-da0a9d8b57a2", "ixlib=rb-4.0.3"),
    b: u("photo-1611892440504-42a792ae8649", "ixlib=rb-4.0.3"),
    c: u("photo-1582719478250-c89cae4dc85b", "ixlib=rb-4.0.3"),
    d: u("photo-1520250497591-112f2f40a3f4", "ixlib=rb-4.0.3"),
    e: u("photo-1566662587733-51f80924b7a6", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-amber-800/40 bg-[#1c1410]",
      card: "rounded-sm border border-amber-700/40 bg-stone-900/70 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-amber-200/70",
      input:
        "mt-1 w-full rounded-sm border border-stone-600 bg-black/40 px-4 py-3 text-sm text-amber-50 outline-none",
      button: "w-full rounded-sm bg-amber-600 py-3.5 text-sm font-bold text-stone-950",
      focus: "focus:border-amber-400/50",
    },
    shop: {
      eyebrow: "Reservas & experiencias",
      headline: "Extras hospedaje · simulación de carrito",
      sub: "Degustación, picnics en viñedo y traslado — lo que buscan hoteles boutique para subir ticket medio.",
      layout: "grid",
      products: [
        { id: "ho1", name: "Cena maridaje 5 pasos x2", price: "$98.000" },
        { id: "ho2", name: "Late checkout hasta 16 h", price: "$24.000", note: "Sujeto a ocupación" },
        { id: "ho3", name: "Picnic canasto + manta", price: "$36.500" },
      ],
    },
  },
  catering: {
    cover: u("photo-1555244162-80383440eb97", "ixlib=rb-4.0.3"),
    a: u("photo-1414235077428-338989a2e8c0", "ixlib=rb-4.0.3"),
    b: u("photo-1466978913421-dad61cffa3a8", "ixlib=rb-4.0.3"),
    c: u("photo-1517248135467-4c7edcad34c4", "ixlib=rb-4.0.3"),
    d: u("photo-1551218808-94e220e084d2", "ixlib=rb-4.0.3"),
    e: u("photo-1559339352-11d035aa65de", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-red-900/40 bg-[#140808]",
      card: "rounded-2xl border border-red-900/50 bg-red-950/30 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-red-300/70",
      input:
        "mt-1 w-full rounded-xl border border-red-900/60 bg-black/40 px-4 py-3 text-sm text-red-50 outline-none",
      button: "w-full rounded-xl bg-red-600 py-3.5 text-sm font-bold text-white",
      focus: "focus:border-red-400/50",
    },
    shop: {
      eyebrow: "Brief corporativo",
      headline: "Menús por persona · demo de compra",
      sub: "Cotización final pasa por chef ejecutivo; acá mostramos ítems típicos con carrito simulado.",
      layout: "featured",
      products: [
        { id: "ca1", name: "Cóctel canapés premium (50 pax)", price: "$285.000" },
        { id: "ca2", name: "Coffee break plant based", price: "$8.400 / pax" },
        { id: "ca3", name: "Asado ritual + vinos selección", price: "$62.000 / pax", note: "4 h servicio" },
      ],
    },
  },
  paisajismo: {
    cover: u("photo-1416879595882-3373a0480b7e", "ixlib=rb-4.0.3"),
    a: u("photo-1598901963450-c1a0e05f97b8", "ixlib=rb-4.0.3"),
    b: u("photo-1558618666-fcd25c85cd64", "ixlib=rb-4.0.3"),
    c: u("photo-1464226184922-a912d6707e4d", "ixlib=rb-4.0.3"),
    d: u("photo-1585320806297-9794b3e644ee", "ixlib=rb-4.0.3"),
    e: u("photo-1591857177580-dc82b24ee6e7", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-green-700/35 bg-green-950",
      card: "rounded-2xl border border-green-800/50 bg-green-900/35 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-green-200/70",
      input:
        "mt-1 w-full rounded-xl border border-green-800 bg-green-950/60 px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-xl bg-lime-500 py-3.5 text-sm font-bold text-green-950",
      focus: "focus:border-lime-300/50",
    },
    shop: {
      eyebrow: "Mantenimiento & plantas",
      headline: "Contratos y pack de riego (demo)",
      sub: "Ideal para consorcios que buscan presupuesto anual claro y SLA de poda.",
      layout: "list",
      products: [
        { id: "pa1", name: "Mantenimiento jardín 200 m²", price: "$92.000 / mes" },
        { id: "pa2", name: "Instalación smart irrigation", price: "$310.000", note: "Insumos incl." },
        { id: "pa3", name: "Poda alta certificada", price: "$148.000", note: "Hasta 8 m" },
      ],
    },
  },
  tattoo: {
    cover: u("photo-1611501275019-9b5cda994e1d", "ixlib=rb-4.0.3"),
    a: u("photo-1590246814889-5791e37fe980", "ixlib=rb-4.0.3"),
    b: u("photo-1611348586804-61bf6c080496", "ixlib=rb-4.0.3"),
    c: u("photo-1568515048389-1d5da43f0424", "ixlib=rb-4.0.3"),
    d: u("photo-1598373181952-e1a05a1a5d4e", "ixlib=rb-4.0.3"),
    e: u("photo-1522337360788-8b13dee7a37e", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-rose-600/30 bg-[#12050a]",
      card: "rounded-xl border border-rose-900/50 bg-black/50 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-rose-400/80",
      input:
        "mt-1 w-full rounded-lg border border-rose-900/60 bg-zinc-950 px-4 py-3 text-sm text-rose-50 outline-none",
      button: "w-full rounded-lg bg-rose-600 py-3.5 text-sm font-bold text-white",
      focus: "focus:border-rose-400/50",
    },
    shop: {
      eyebrow: "Sesiones & merch",
      headline: "Depósito seña + care post (demo)",
      sub: "Flujo típico de estudios con lista de espera: acá simulamos compra de bloques y productos.",
      layout: "minimal",
      products: [
        { id: "ta1", name: "Sesión blackwork 6 h", price: "$220.000", note: "Seña 40%" },
        { id: "ta2", name: "Pack aftercare film + jabón", price: "$14.200" },
        { id: "ta3", name: "Flash day cupo prioritario", price: "$8.000", note: "Descuento en pieza" },
      ],
    },
  },
  cerrajeria: {
    cover: u("photo-1589756824025-6bb2a6cf8fa1", "ixlib=rb-4.0.3"),
    a: u("photo-1454165804606-c3d57bc86b40", "ixlib=rb-4.0.3"),
    b: u("photo-1581149787766-e32f0e58e3e2", "ixlib=rb-4.0.3"),
    c: u("photo-1621905252507-b35492cc74b4", "ixlib=rb-4.0.3"),
    d: u("photo-1504384308090-c894fdcc538d", "ixlib=rb-4.0.3"),
    e: u("photo-1453222714902-292970d40d78", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-yellow-600/30 bg-neutral-950",
      card: "rounded-2xl border border-yellow-700/40 bg-zinc-900/80 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-yellow-500/90",
      input:
        "mt-1 w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm text-yellow-50 outline-none",
      button: "w-full rounded-xl bg-yellow-500 py-3.5 text-sm font-bold text-black",
      focus: "focus:border-yellow-300/50",
    },
    shop: {
      eyebrow: "Tienda & duplicados",
      headline: "Cilindros, tags y controles (demo)",
      sub: "Checkout simulado para pick-up en taller o envío certificado.",
      layout: "grid",
      products: [
        { id: "ce1", name: "Cilindro europeo antibumping", price: "$68.000" },
        { id: "ce2", name: "Duplicado llave tubular codificada", price: "$12.500", note: "Con credencial" },
        { id: "ce3", name: "Kit RFID consorcio 10 unidades", price: "$184.000" },
      ],
    },
  },
  coworking: {
    cover: u("photo-1527195091313-076d671660de", "ixlib=rb-4.0.3"),
    a: u("photo-1497366212358-3750bf24b38a", "ixlib=rb-4.0.3"),
    b: u("photo-1497366754035-f200968a6e72", "ixlib=rb-4.0.3"),
    c: u("photo-1524758631624-e2822e304c36", "ixlib=rb-4.0.3"),
    d: u("photo-1522071820081-009f0129c71c", "ixlib=rb-4.0.3"),
    e: u("photo-1519389950473-47ba0277781c", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-sky-500/25 bg-slate-950",
      card: "rounded-3xl border border-sky-500/20 bg-slate-900/60 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-sky-300/80",
      input:
        "mt-1 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-2xl bg-sky-500 py-3.5 text-sm font-bold text-slate-950",
      focus: "focus:border-sky-300/50",
    },
    shop: {
      eyebrow: "Passes & salas",
      headline: "Reservá franjas en vivo (demo)",
      sub: "Modelo SaaS-ligero para espacios flex: day pass, cabinas y salas de equipo.",
      layout: "bento",
      products: [
        { id: "co1", name: "Day pass hot desk", price: "$9.500" },
        { id: "co2", name: "Cabina acústica 3 h", price: "$11.200" },
        { id: "co3", name: "Sala 8 pax · proyector 4K", price: "$28.000", note: "IVA incl. demo" },
      ],
    },
  },
  minecraft: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: gameServerLead("#22c55e"),
    shop: null,
  },
  roblox: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: gameServerLead("#f43f5e"),
    shop: null,
  },
  cs2: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: gameServerLead("#f59e0b"),
    shop: null,
  },
  fivem: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: gameServerLead("#a855f7"),
    shop: null,
  },
  muonline: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: gameServerLead("#eab308"),
    shop: null,
  },
  lineage2: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: gameServerLead("#6366f1"),
    shop: null,
  },
  rust: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: gameServerLead("#cd412b"),
    shop: null,
  },
  ark: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: gameServerLead("#14b8a6"),
    shop: null,
  },
  terraria: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: gameServerLead("#a78bfa"),
    shop: null,
  },
  palworld: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: gameServerLead("#06b6d4"),
    shop: null,
  },
  streamer: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: creatorLead("#9146ff"),
    shop: null,
  },
  youtuber: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: creatorLead("#ff0000"),
    shop: null,
  },
  tiktoker: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: creatorLead("#25f4ee"),
    shop: null,
  },
  comunicadores: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: creatorLead("#f59e0b"),
    shop: null,
  },
  "taller-motos": {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: commerceLead("#f97316"),
    shop: null,
  },
  celulares: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: commerceLead("#3b82f6"),
    shop: null,
  },
  almacen: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: commerceLead("#d97706"),
    shop: null,
  },
  kiosco: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: commerceLead("#eab308"),
    shop: null,
  },
  libreria: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: commerceLead("#92400e"),
    shop: null,
  },
  bazar: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: commerceLead("#ec4899"),
    shop: null,
  },
  carniceria: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: commerceLead("#dc2626"),
    shop: null,
  },
  granja: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: commerceLead("#16a34a"),
    shop: null,
  },
  computacion: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: commerceLead("#06b6d4"),
    shop: null,
  },
  ropa: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: commerceLead("#db2777"),
    shop: null,
  },
  supermercado: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: commerceLead("#059669"),
    shop: null,
  },
  barberia: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: commerceLead("#64748b"),
    shop: null,
  },
  marketing: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: commerceLead("#8b5cf6"),
    shop: null,
  },
  imprenta: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: commerceLead("#4f46e5"),
    shop: null,
  },
  motores: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: commerceLead("#c2410c"),
    shop: null,
  },
  gasista: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: commerceLead("#0284c7"),
    shop: null,
  },
  electricista: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: commerceLead("#ca8a04"),
    shop: null,
  },
  albanil: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: commerceLead("#78716c"),
    shop: null,
  },
  arquitectos: {
    cover: GS_PLACEHOLDER,
    a: GS_PLACEHOLDER,
    b: GS_PLACEHOLDER,
    c: GS_PLACEHOLDER,
    lead: commerceLead("#a8a29e"),
    shop: null,
  },
};

export function getDemoVisuals(slug: string): DemoVisualsResolved {
  const pack =
    DEMO_VISUAL_PACKS[slug] ?? {
      cover: u("photo-1467232004584-a241de8bcf5d", "ixlib=rb-4.0.3"),
      a: u("photo-1557683316-973673baf926", "ixlib=rb-4.0.3"),
      b: u("photo-1498050108023-c5249f4df085", "ixlib=rb-4.0.3"),
      c: u("photo-1504639725590-34d0984388bd", "ixlib=rb-4.0.3"),
      lead: {
        section: "border-y border-white/10 bg-zinc-950",
        card: "rounded-2xl border border-white/10 bg-zinc-900/60 p-6 md:p-8",
        label: "text-[10px] font-bold uppercase tracking-widest text-zinc-500",
        input:
          "mt-1 w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm text-white outline-none",
        button: "w-full rounded-xl bg-[#1de0b1] py-3.5 text-sm font-bold text-black",
        focus: "focus:border-[#1de0b1]/50",
      },
      shop: null,
    };
  const images = DEMO_IMAGES[slug];
  const shopOverride = Object.prototype.hasOwnProperty.call(DEMO_SHOPS, slug)
    ? DEMO_SHOPS[slug]
    : pack.shop;

  return {
    ...pack,
    ...(images ?? {}),
    shop: shopOverride ?? null,
    videoSrc: pickDemoVideo(slug),
    videoFallbackSrc: pickDemoVideoFallback(slug),
  };
}
