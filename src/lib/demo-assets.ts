/**
 * Imágenes y metadatos de medios para demos (Unsplash CC-friendly).
 * Videos: clips de ejemplo públicos; sustituir por producción propia si aplica.
 */

import { DEMO_SLUGS } from "@/lib/demos-registry";

export const DEMO_VIDEO_POOL = [
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
] as const;

function pickDemoVideo(slug: string): string {
  const i = DEMO_SLUGS.indexOf(slug as (typeof DEMO_SLUGS)[number]);
  const idx = i >= 0 ? i % DEMO_VIDEO_POOL.length : 0;
  return DEMO_VIDEO_POOL[idx]!;
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

export type DemoShopConfig = {
  headline: string;
  sub: string;
  products: DemoShopProduct[];
};

export type DemoVisualPack = {
  cover: string;
  a: string;
  b: string;
  c: string;
  lead: DemoLeadTheme;
  shop: DemoShopConfig | null;
};

export type DemoVisualsResolved = DemoVisualPack & { videoSrc: string };

const u = (id: string, sig: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=82&${sig}`;

/** Cobertura por slug — mismas claves que DEMOS */
const DEMO_VISUAL_PACKS: Record<string, DemoVisualPack> = {
  ferreteria: {
    cover: u("photo-1504148455328-c376907d081c", "ixlib=rb-4.0.3"),
    a: u("photo-1581147036324-c1a02b59f7cc", "ixlib=rb-4.0.3"),
    b: u("photo-1530124566582-ebe8050830cc", "ixlib=rb-4.0.3"),
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
      section: "border-y border-rose-900/40 bg-[#12080c]",
      card: "rounded-2xl border border-rose-900/40 bg-black/40 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-rose-400/80",
      input:
        "mt-1 w-full rounded-xl border border-rose-900/50 bg-rose-950/40 px-4 py-3 text-sm text-amber-50 outline-none",
      button: "w-full rounded-xl bg-rose-700 py-3.5 text-sm font-bold text-white",
      focus: "focus:border-amber-500/50",
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
    b: u("photo-1519415943484-9b1873b0cf59", "ixlib=rb-4.0.3"),
    c: u("photo-1596178060811-6c74949b5a0c", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-stone-300 bg-[#f5f0e8]",
      card: "rounded-2xl border border-stone-300 bg-white p-6 shadow-sm md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-stone-500",
      input:
        "mt-1 w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none",
      button: "w-full rounded-xl bg-stone-900 py-3.5 text-sm font-bold text-amber-50",
      focus: "focus:border-amber-700/50",
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
      section: "border-y border-lime-500/20 bg-zinc-950",
      card: "rounded-2xl border border-zinc-800 bg-black p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-zinc-600",
      input:
        "mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-xl bg-lime-400 py-3.5 text-sm font-black text-black",
      focus: "focus:border-lime-400/60",
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
    cover: u("photo-1450778868360-46186e893a46", "ixlib=rb-4.0.3"),
    a: u("photo-1583337130417-3346a1be7fa6", "ixlib=rb-4.0.3"),
    b: u("photo-1548199973-03cce0bbc87b", "ixlib=rb-4.0.3"),
    c: u("photo-1601758228041-f3b2795255f1", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-teal-500/30 bg-teal-950/80",
      card: "rounded-2xl border border-white/10 bg-teal-900/40 p-6 backdrop-blur md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-teal-200/70",
      input:
        "mt-1 w-full rounded-xl border border-white/15 bg-teal-950/60 px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-xl bg-orange-400 py-3.5 text-sm font-bold text-teal-950",
      focus: "focus:border-orange-300/50",
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
      section: "border-y border-slate-800 bg-slate-950",
      card: "rounded-2xl border border-slate-700 bg-slate-900/70 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-slate-500",
      input:
        "mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-xl bg-amber-600 py-3.5 text-sm font-bold text-slate-950",
      focus: "focus:border-amber-500/50",
    },
    shop: null,
  },
  tech: {
    cover: u("photo-1517694712202-14dd9538aa97", "ixlib=rb-4.0.3"),
    a: u("photo-1555949963-aa79dcee981c", "ixlib=rb-4.0.3"),
    b: u("photo-1460925895917-afdab827c52f", "ixlib=rb-4.0.3"),
    c: u("photo-1504639725590-34d0984388bd", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-violet-500/20 bg-slate-950",
      card: "rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-slate-500",
      input:
        "mt-1 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-xl bg-violet-600 py-3.5 text-sm font-bold text-white",
      focus: "focus:border-violet-400/50",
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
    cover: u("photo-1455659777274-85fd066e501a", "ixlib=rb-4.0.3"),
    a: u("photo-1490750967868-88aa4486c946", "ixlib=rb-4.0.3"),
    b: u("photo-1487530821177-197fdd56168a", "ixlib=rb-4.0.3"),
    c: u("photo-1561181286-d3fee7d55364", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-pink-500/20 bg-emerald-950",
      card: "rounded-2xl border border-pink-500/20 bg-emerald-900/50 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-emerald-200/70",
      input:
        "mt-1 w-full rounded-xl border border-emerald-700 bg-emerald-950/60 px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-xl bg-pink-500 py-3.5 text-sm font-bold text-white",
      focus: "focus:border-pink-400/50",
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
    cover: u("photo-1487754180451ce576e121762", "ixlib=rb-4.0.3"),
    a: u("photo-1486262715619-67b852e7d7b0", "ixlib=rb-4.0.3"),
    b: u("photo-1625047509168-a7026f36de04", "ixlib=rb-4.0.3"),
    c: u("photo-1492144534655-ae79c964c9d7", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-red-900/40 bg-zinc-950",
      card: "rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-zinc-500",
      input:
        "mt-1 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-xl bg-red-600 py-3.5 text-sm font-bold text-white",
      focus: "focus:border-red-500/50",
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
    cover: u("photo-1589829547916-fb3d85a1cd75", "ixlib=rb-4.0.3"),
    a: u("photo-1450101499163-c8848c66ca85", "ixlib=rb-4.0.3"),
    b: u("photo-1589994963528-7b2fe8a8e3a4", "ixlib=rb-4.0.3"),
    c: u("photo-1505664194779-8beacebdb937", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-amber-900/30 bg-[#0d0d0d]",
      card: "rounded-2xl border border-amber-900/30 bg-neutral-950 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-amber-700/90",
      input:
        "mt-1 w-full rounded-xl border border-neutral-800 bg-black px-4 py-3 text-sm text-neutral-200 outline-none",
      button: "w-full rounded-xl border border-amber-600 bg-amber-950/40 py-3.5 text-sm font-bold uppercase tracking-wide text-amber-500",
      focus: "focus:border-amber-500/50",
    },
    shop: null,
  },
  farmacia: {
    cover: u("photo-1584308666744-24d5c474e36e", "ixlib=rb-4.0.3"),
    a: u("photo-1576091160399-112ba8d25d1d", "ixlib=rb-4.0.3"),
    b: u("photo-1587854692152-cbe660dbde88", "ixlib=rb-4.0.3"),
    c: u("photo-1555633514-abcee6ab92e1", "ixlib=rb-4.0.3"),
    lead: {
      section: "border-y border-emerald-500/25 bg-emerald-950",
      card: "rounded-2xl border border-white/10 bg-emerald-900/40 p-6 md:p-8",
      label: "text-[10px] font-bold uppercase tracking-widest text-emerald-200/70",
      input:
        "mt-1 w-full rounded-xl border border-emerald-800 bg-emerald-950/70 px-4 py-3 text-sm text-white outline-none",
      button: "w-full rounded-xl bg-green-500 py-3.5 text-sm font-bold text-emerald-950",
      focus: "focus:border-green-400/50",
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
    cover: u("photo-1606811971618-4486abc44679", "ixlib=rb-4.0.3"),
    a: u("photo-1629909613654-28e377c37b09", "ixlib=rb-4.0.3"),
    b: u("photo-1599818816645-f2575c7ee69d", "ixlib=rb-4.0.3"),
    c: u("photo-1588776814546-1ffcf4724a3a", "ixlib=rb-4.0.3"),
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
    b: u("photo-1551288049-bebda4e38c71", "ixlib=rb-4.0.3"),
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
    cover: u("photo-1607860108855-64acf4208ae9", "ixlib=rb-4.0.3"),
    a: u("photo-1610647742845-bfbcb3c4b633", "ixlib=rb-4.0.3"),
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
    a: u("photo-1549931310-a3806d2d0728", "ixlib=rb-4.0.3"),
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
    b: u("photo-1464817739643-57592b433148", "ixlib=rb-4.0.3"),
    c: u("photo-1473625247510-8ceb09580548", "ixlib=rb-4.0.3"),
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
    a: u("photo-1628177142897-132293272448", "ixlib=rb-4.0.3"),
    b: u("photo-1558317374-067fb3f85ccb", "ixlib=rb-4.0.3"),
    c: u("photo-1584622650111-993a426f1d51", "ixlib=rb-4.0.3"),
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
    a: u("photo-1577803643013-c76443b37436", "ixlib=rb-4.0.3"),
    b: u("photo-1511499767150-a48a237f0083", "ixlib=rb-4.0.3"),
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
  return { ...pack, videoSrc: pickDemoVideo(slug) };
}
