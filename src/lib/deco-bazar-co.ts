/** DecoBazar & Co. — bazar premium y diseño del hogar demo */

export const DECO_BAZAR_CO_SLUG = "deco-bazar-co";

export type DecoCategoryId = "cocina" | "vajilla" | "organizacion" | "mate";

export type DecoMaterialId = "ceramica" | "acero" | "vidrio" | "madera";

export type DecoBadge = "freeShipping" | "installments";

export type DecoStock = "available" | "low";

export type DecoProduct = {
  id: number;
  name: string;
  category: DecoCategoryId;
  material: DecoMaterialId;
  price: number;
  image: string;
  imageHover: string;
  stock: DecoStock;
  badges?: DecoBadge[];
};

export type DecoCartItem = DecoProduct & {
  key: string;
  quantity: number;
};

export type DecoCombo = {
  id: string;
  name: string;
  description: string;
  promoPrice: number;
  listPrice: number;
  image: string;
  items: { productId: number; qty: number; label: string }[];
};

export type DecoDeliveryMode = "shipping" | "pickup";

export type DecoRegionId = "gba-sur" | "gba-norte" | "interior";

export const DECO_CATEGORIES: { id: DecoCategoryId | "all"; label: string }[] = [
  { id: "all", label: "Todo el catálogo" },
  { id: "cocina", label: "Cocina y Cocción" },
  { id: "vajilla", label: "Vajilla y Vasos" },
  { id: "organizacion", label: "Organización" },
  { id: "mate", label: "Mate y Café" },
];

export const DECO_MATERIALS: { id: DecoMaterialId | "all"; label: string }[] = [
  { id: "all", label: "Todos los materiales" },
  { id: "ceramica", label: "Cerámica / Porcelana" },
  { id: "acero", label: "Acero Inoxidable" },
  { id: "vidrio", label: "Vidrio templado" },
  { id: "madera", label: "Madera Bamboo" },
];

export const DECO_NAV_CATEGORIES = DECO_CATEGORIES.filter((c) => c.id !== "all");

export const DECO_REGIONS: { id: DecoRegionId; label: string; shipping: number; days: string }[] = [
  { id: "gba-sur", label: "GBA Sur (Ezeiza, La Plata)", shipping: 3200, days: "2–4 días hábiles" },
  { id: "gba-norte", label: "GBA Norte y CABA", shipping: 4500, days: "3–5 días hábiles" },
  { id: "interior", label: "Interior del país", shipping: 7800, days: "5–8 días hábiles" },
];

export const DECO_BAZAR_CO_CONFIG = {
  slug: DECO_BAZAR_CO_SLUG,
  brand: "DecoBazar & Co.",
  tagline: "Diseño funcional para espacios que inspiran",
  addressLines: ["Showroom Av. Mitre 1420", "Carlos Spegazzini, Ezeiza"],
  hoursShowroom: "Lun–Vie 10:00 – 19:00 · Sáb 10:00 – 14:00",
  hoursDelivery: "Envíos lun–sáb · retiro sin costo en showroom",
  installmentCount: 3,
  installmentMin: 15000,
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Carlos+Spegazzini,+Ezeiza&t=&z=14&ie=UTF8&iwloc=&output=embed",
  heroImage:
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=2000&auto=format&fit=crop",
} as const;

const img = (id: string, w = 700) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const DECO_PRODUCTS: DecoProduct[] = [
  {
    id: 1,
    name: "Plato hondo Nordic 26 cm",
    category: "vajilla",
    material: "ceramica",
    price: 8900,
    image: img("photo-1618220179428-22790b461013"),
    imageHover: img("photo-1631679706909-1844bbd07221"),
    stock: "available",
    badges: ["freeShipping", "installments"],
  },
  {
    id: 2,
    name: "Set bowls cerámica mate x4",
    category: "vajilla",
    material: "ceramica",
    price: 24500,
    image: img("photo-1616046229478-9901c5536a45"),
    imageHover: img("photo-1631679706909-1844bbd07221"),
    stock: "available",
    badges: ["installments"],
  },
  {
    id: 3,
    name: "Cuchillo chef 20 cm acero",
    category: "cocina",
    material: "acero",
    price: 32800,
    image: img("photo-1564078516393-cf04bd966897"),
    imageHover: img("photo-1632829882891-5047ccc421bc"),
    stock: "available",
    badges: ["freeShipping"],
  },
  {
    id: 4,
    name: "Olla cacerola triple fondo 24 cm",
    category: "cocina",
    material: "acero",
    price: 68900,
    image: img("photo-1616486338812-3dadae4b4ace"),
    imageHover: img("photo-1632829882891-5047ccc421bc"),
    stock: "low",
    badges: ["installments"],
  },
  {
    id: 5,
    name: "Termo vidrio doble pared 1 L",
    category: "mate",
    material: "vidrio",
    price: 19500,
    image: img("photo-1554995207-c18c203602cb"),
    imageHover: img("photo-1615800002234-05c4d488696c"),
    stock: "available",
    badges: ["freeShipping", "installments"],
  },
  {
    id: 6,
    name: "Mate calabaza premium c/ base",
    category: "mate",
    material: "madera",
    price: 14200,
    image: img("photo-1615876234886-fd9a39fda97f"),
    imageHover: img("photo-1615800002234-05c4d488696c"),
    stock: "available",
  },
  {
    id: 7,
    name: "Organizador bambú cajones x3",
    category: "organizacion",
    material: "madera",
    price: 16800,
    image: img("photo-1615529182904-14819c35db37"),
    imageHover: img("photo-1632829882891-5047ccc421bc"),
    stock: "available",
    badges: ["freeShipping"],
  },
  {
    id: 8,
    name: "Canister vidrio hermético set x3",
    category: "organizacion",
    material: "vidrio",
    price: 22400,
    image: img("photo-1649083048770-82e8ffd80431"),
    imageHover: img("photo-1632829882891-5047ccc421bc"),
    stock: "available",
    badges: ["installments"],
  },
  {
    id: 9,
    name: "Vaso térmico acero 350 ml",
    category: "mate",
    material: "acero",
    price: 11800,
    image: img("photo-1616137422495-1e9e46e2aa77"),
    imageHover: img("photo-1554995207-c18c203602cb"),
    stock: "available",
    badges: ["freeShipping"],
  },
  {
    id: 10,
    name: "Tabla bamboo multiuso grande",
    category: "cocina",
    material: "madera",
    price: 15600,
    image: img("photo-1617103996702-96ff29b1c467"),
    imageHover: img("photo-1564078516393-cf04bd966897"),
    stock: "available",
  },
  {
    id: 11,
    name: "Copa vino cristal x6",
    category: "vajilla",
    material: "vidrio",
    price: 28900,
    image: img("photo-1618219944342-824e40a13285"),
    imageHover: img("photo-1618220179428-22790b461013"),
    stock: "low",
    badges: ["installments"],
  },
  {
    id: 12,
    name: "Sartén antiadherente 28 cm",
    category: "cocina",
    material: "acero",
    price: 41200,
    image: img("photo-1599696848652-f0ff23bc911f"),
    imageHover: img("photo-1616486338812-3dadae4b4ace"),
    stock: "available",
    badges: ["freeShipping", "installments"],
  },
];

export const DECO_COMBOS: DecoCombo[] = [
  {
    id: "set-vajilla-18",
    name: "Set de Vajilla x18 piezas",
    description: "Platos, bowls y tazas cerámica Nordic — mesa lista",
    promoPrice: 89900,
    listPrice: 112000,
    image: img("photo-1631679706909-1844bbd07221", 900),
    items: [
      { productId: 1, qty: 6, label: "Plato hondo Nordic" },
      { productId: 2, qty: 1, label: "Set bowls x4" },
      { productId: 11, qty: 1, label: "Copas cristal x6" },
    ],
  },
  {
    id: "combo-mate-premium",
    name: "Combo Mate Premium",
    description: "Mate, termo y vaso térmico — ritual completo",
    promoPrice: 38900,
    listPrice: 45500,
    image: img("photo-1615800002234-05c4d488696c", 900),
    items: [
      { productId: 6, qty: 1, label: "Mate calabaza" },
      { productId: 5, qty: 1, label: "Termo vidrio 1L" },
      { productId: 9, qty: 1, label: "Vaso térmico" },
    ],
  },
  {
    id: "kit-cocina-base",
    name: "Kit Cocina Base",
    description: "Cuchillo chef, tabla y sartén — arranque profesional",
    promoPrice: 74900,
    listPrice: 89600,
    image: img("photo-1632829882891-5047ccc421bc", 900),
    items: [
      { productId: 3, qty: 1, label: "Cuchillo chef" },
      { productId: 10, qty: 1, label: "Tabla bamboo" },
      { productId: 12, qty: 1, label: "Sartén 28 cm" },
    ],
  },
];

export function formatDecoPrice(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export function isDecoBazarCoSlug(slug: string): boolean {
  return slug === DECO_BAZAR_CO_SLUG;
}

export function getDecoProduct(id: number): DecoProduct | undefined {
  return DECO_PRODUCTS.find((p) => p.id === id);
}

export function searchDecoSuggestions(query: string, limit = 6): string[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const names = DECO_PRODUCTS.map((p) => p.name).filter((n) => n.toLowerCase().includes(q));
  const combos = DECO_COMBOS.map((c) => c.name).filter((n) => n.toLowerCase().includes(q));
  return [...new Set([...names, ...combos])].slice(0, limit);
}

export function calcDecoTotals(
  items: DecoCartItem[],
  mode: DecoDeliveryMode,
  region: DecoRegionId,
): {
  subtotal: number;
  shipping: number;
  total: number;
  installmentAmount: number | null;
} {
  const cfg = DECO_BAZAR_CO_CONFIG;
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const regionData = DECO_REGIONS.find((r) => r.id === region)!;
  const shipping = items.length > 0 && mode === "shipping" ? regionData.shipping : 0;
  const total = subtotal + shipping;
  const installmentAmount =
    total >= cfg.installmentMin ? Math.ceil(total / cfg.installmentCount) : null;
  return { subtotal, shipping, total, installmentAmount };
}

export function buildDecoOrderSummary(
  items: DecoCartItem[],
  totals: ReturnType<typeof calcDecoTotals>,
  mode: DecoDeliveryMode,
  region: DecoRegionId,
): string {
  const regionLabel = DECO_REGIONS.find((r) => r.id === region)?.label ?? region;
  const modeLabel =
    mode === "shipping" ? "Envío a domicilio (correo/flete)" : "Retiro gratuito en showroom";
  let lines = items.map(
    (i) => `${i.quantity}x ${i.name} — ${formatDecoPrice(i.price * i.quantity)}`,
  );
  return [
    ...lines,
    "",
    `Subtotal: ${formatDecoPrice(totals.subtotal)}`,
    totals.shipping > 0 ? `Envío (${regionLabel}): ${formatDecoPrice(totals.shipping)}` : "Retiro: sin cargo",
    `Total: ${formatDecoPrice(totals.total)}`,
    totals.installmentAmount
      ? `${DECO_BAZAR_CO_CONFIG.installmentCount} cuotas sin interés: ${formatDecoPrice(totals.installmentAmount)}`
      : "",
    modeLabel,
  ]
    .filter(Boolean)
    .join("\n");
}
