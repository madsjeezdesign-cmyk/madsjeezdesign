/** NEXUS Ferretería — ferretería industrial premium demo */

export const NEXUS_FERRETERIA_SLUG = "nexus-ferreteria";

export type NexusCategoryId =
  | "electricas"
  | "pintureria"
  | "construccion"
  | "plomeria"
  | "electricidad"
  | "jardineria";

export type NexusStock = "high" | "low" | "out";

export type NexusProduct = {
  id: number;
  name: string;
  brand: string;
  category: NexusCategoryId;
  price: number;
  sku: string;
  stock: NexusStock;
  image: string;
  imageHover: string;
  specs: string[];
  featured?: "large" | "wide";
};

export type NexusCartItem = NexusProduct & {
  key: string;
  quantity: number;
};

export const NEXUS_CATEGORIES: {
  id: NexusCategoryId;
  title: string;
  subtitle: string;
  icon: string;
  gradient: string;
  glow: string;
}[] = [
  {
    id: "electricas",
    title: "Herramientas eléctricas",
    subtitle: "Taladros · amoladoras · impacto",
    icon: "⚡",
    gradient: "from-orange-950/80 to-zinc-950",
    glow: "rgba(249,115,22,0.15)",
  },
  {
    id: "pintureria",
    title: "Pinturería",
    subtitle: "Látex · esmaltes · rodillos pro",
    icon: "🎨",
    gradient: "from-amber-950/60 to-zinc-950",
    glow: "rgba(251,191,36,0.12)",
  },
  {
    id: "construccion",
    title: "Construcción",
    subtitle: "Cemento · hierros · mallas",
    icon: "🏗",
    gradient: "from-zinc-800/80 to-zinc-950",
    glow: "rgba(163,163,163,0.1)",
  },
  {
    id: "plomeria",
    title: "Plomería",
    subtitle: "Caños · conexiones · sanitarios",
    icon: "🔧",
    gradient: "from-sky-950/60 to-zinc-950",
    glow: "rgba(56,189,248,0.1)",
  },
  {
    id: "electricidad",
    title: "Electricidad",
    subtitle: "Cables · tableros · LED",
    icon: "💡",
    gradient: "from-yellow-950/50 to-zinc-950",
    glow: "rgba(250,204,21,0.12)",
  },
  {
    id: "jardineria",
    title: "Jardinería",
    subtitle: "Mangueras · motosierras · riego",
    icon: "🌿",
    gradient: "from-emerald-950/50 to-zinc-950",
    glow: "rgba(52,211,153,0.1)",
  },
];

export const NEXUS_SERVICES = [
  { title: "Cortes a medida", desc: "Hierro · madera · PVC · precisión láser", metric: "±1mm" },
  { title: "Envíos express", desc: "GBA sur · moto o camioneta refrigerada", metric: "24–48h" },
  { title: "Asesoramiento técnico", desc: "Electricistas y maestros certificados", metric: "Gratis" },
  { title: "Presupuestos obra", desc: "Listas para consorcios y contratistas", metric: "2h resp." },
];

export const NEXUS_FERRETERIA_CONFIG = {
  slug: NEXUS_FERRETERIA_SLUG,
  brand: "NEXUS",
  brandSub: "Ferretería Industrial",
  tagline: "Potencia, precisión y stock en tiempo real para tu obra",
  whatsapp: "5491123456666",
  addressLines: ["Depósito Central · Av. Industrial 890", "Carlos Spegazzini, Ezeiza"],
  hours: "Lun–Sáb 7:00 – 20:00 · retiro en 15 min",
  heroImage: img("photo-1581091226033-c8e1f05d2240", 2000),
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Carlos+Spegazzini,+Ezeiza&t=&z=14&ie=UTF8&iwloc=&output=embed",
  freeShippingFrom: 45000,
} as const;

function img(id: string, w = 800) {
  return `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;
}

// Valid unsplash IDs for tools/hardware
const toolImg = (id: string) => img(id);

export const NEXUS_PRODUCTS: NexusProduct[] = [
  {
    id: 1,
    name: "Taladro percutor brushless 18V",
    brand: "Milwaukee",
    category: "electricas",
    price: 289000,
    sku: "NX-EL-1842",
    stock: "high",
    image: toolImg("photo-1581091226033-c8e1f05d2240"),
    imageHover: toolImg("photo-1581094794351-3a0e0e0e0e0e"),
    specs: ["120 Nm", "2 baterías 5Ah", "LED shadowless"],
    featured: "large",
  },
  {
    id: 2,
    name: "Amoladora angular 4½\" 850W",
    brand: "DeWalt",
    category: "electricas",
    price: 98500,
    sku: "NX-EL-2210",
    stock: "high",
    image: toolImg("photo-1581094794351-3a0e0e0e0e0e"),
    imageHover: toolImg("photo-1581091226033-c8e1f05d2240"),
    specs: ["Anti-restart", "Embrague", "Mango side"],
  },
  {
    id: 3,
    name: "Látex interior premium 20L",
    brand: "Alba",
    category: "pintureria",
    price: 67800,
    sku: "NX-PT-8821",
    stock: "low",
    image: toolImg("photo-1562259949-e8e7689d7828"),
    imageHover: toolImg("photo-1589939705384-518dec35e0dc"),
    specs: ["Cobertura 12m²/L", "Bajo olor", "Blanco base"],
    featured: "wide",
  },
  {
    id: 4,
    name: "Cemento Portland x 50 kg",
    brand: "Loma Negra",
    category: "construccion",
    price: 14200,
    sku: "NX-CO-3301",
    stock: "high",
    image: toolImg("photo-1504307655304-ff356f1f672c"),
    imageHover: toolImg("photo-1541888946425-d81bb19240f5"),
    specs: ["CP40", "Uso general", "Palet x40"],
  },
  {
    id: 5,
    name: "Caño PVC presión 32mm x 3m",
    brand: "Fate",
    category: "plomeria",
    price: 8900,
    sku: "NX-PL-1192",
    stock: "high",
    image: toolImg("photo-1585704037720-a1954096d871"),
    imageHover: toolImg("photo-1558618666-fcd25c85cd64"),
    specs: ["PN10", "Rosca", "UVR"],
  },
  {
    id: 6,
    name: "Cable unipolar 2,5mm x 100m",
    brand: "Indiana",
    category: "electricidad",
    price: 45600,
    sku: "NX-EC-7740",
    stock: "high",
    image: toolImg("photo-1621905252507-b35492da74c5"),
    imageHover: toolImg("photo-1558618666-fcd25c85cd64"),
    specs: ["Cobre 99,9%", "Norma IRAM", "Rollo industrial"],
  },
  {
    id: 7,
    name: "Motosierra 45cc profesional",
    brand: "Stihl",
    category: "jardineria",
    price: 198000,
    sku: "NX-JA-5520",
    stock: "low",
    image: toolImg("photo-1558618666-fcd25c85cd64"),
    imageHover: toolImg("photo-1581091226033-c8e1f05d2240"),
    specs: ["Espada 18\"", "Anti-vibración", "Arranque fácil"],
  },
  {
    id: 8,
    name: "Juego llaves combinadas 12 pzas",
    brand: "Bahco",
    category: "construccion",
    price: 52400,
    sku: "NX-CO-8812",
    stock: "high",
    image: toolImg("photo-1581094794351-3a0e0e0e0e0e"),
    imageHover: toolImg("photo-1581091226033-c8e1f05d2240"),
    specs: ["Cromo vanadio", "Estuche rígido", "Métrico"],
  },
  {
    id: 9,
    name: "Tablero térmico 12 módulos",
    brand: "Schneider",
    category: "electricidad",
    price: 38900,
    sku: "NX-EC-1200",
    stock: "high",
    image: toolImg("photo-1621905252507-b35492da74c5"),
    imageHover: toolImg("photo-1581094794351-3a0e0e0e0e0e"),
    specs: ["IP40", "Barra tierra", "Tapas incluidas"],
  },
  {
    id: 10,
    name: "Rodillo microfibra pro 23cm",
    brand: "El Galgo",
    category: "pintureria",
    price: 12800,
    sku: "NX-PT-2301",
    stock: "high",
    image: toolImg("photo-1562259949-e8e7689d7828"),
    imageHover: toolImg("photo-1589939705384-518dec35e0dc"),
    specs: ["Anti-goteo", "Cabo ergonómico", "Repuesto incluido"],
  },
];

export const STOCK_LABELS: Record<NexusStock, { label: string; className: string }> = {
  high: { label: "Stock alto", className: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
  low: { label: "Últimas unidades", className: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
  out: { label: "Sin stock", className: "text-zinc-500 bg-zinc-500/10 border-zinc-600/30" },
};

export function formatNexusPrice(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export function isNexusFerreteriaSlug(slug: string): boolean {
  return slug === NEXUS_FERRETERIA_SLUG;
}

export function nexusWhatsAppLink(message: string): string {
  return `https://wa.me/${NEXUS_FERRETERIA_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function nexusCartWhatsApp(
  items: NexusCartItem[],
  total: number,
): string {
  const cfg = NEXUS_FERRETERIA_CONFIG;
  let msg = `*PEDIDO ${cfg.brand} ${cfg.brandSub}* 🔩\n\n`;
  items.forEach((i) => {
    msg += `*${i.quantity}x* ${i.name} (${i.brand})\n`;
    msg += `   SKU: ${i.sku} · ${formatNexusPrice(i.price * i.quantity)}\n`;
    msg += `   ${i.specs.join(" · ")}\n\n`;
  });
  msg += `*TOTAL: ${formatNexusPrice(total)}*`;
  msg += `\n\nSolicito presupuesto / confirmación de stock.`;
  return nexusWhatsAppLink(msg);
}
