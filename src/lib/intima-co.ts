/** Íntima & Co. — lencería premium demo */

export const INTIMA_CO_SLUG = "intima-co";

export type IntimaCategoryId = "algodon" | "encaje" | "sleepwear" | "packs";

export type IntimaColorVariant = {
  id: string;
  name: string;
  hex: string;
  image: string;
};

export type IntimaProduct = {
  id: number;
  name: string;
  category: IntimaCategoryId;
  price: number;
  description: string;
  sizeType: "bra" | "apparel";
  sizes: string[];
  colors: IntimaColorVariant[];
  defaultColorId: string;
};

export type IntimaPackItem = {
  id: string;
  name: string;
  price: number;
  colors: IntimaColorVariant[];
  defaultColorId: string;
};

export type IntimaCartLine = {
  key: string;
  productId: number;
  name: string;
  colorId: string;
  colorName: string;
  colorHex: string;
  size: string;
  unitPrice: number;
  quantity: number;
  isPackLine?: boolean;
};

export type IntimaDeliveryMode = "discrete" | "pickup";

export const INTIMA_CATEGORIES: { id: IntimaCategoryId | "all"; label: string }[] = [
  { id: "all", label: "Toda la colección" },
  { id: "algodon", label: "Línea Algodón (Diario)" },
  { id: "encaje", label: "Encaje & Ocasión" },
  { id: "sleepwear", label: "Sleepwear" },
  { id: "packs", label: "Packs Especiales" },
];

export const INTIMA_CO_CONFIG = {
  slug: INTIMA_CO_SLUG,
  brand: "Íntima & Co.",
  tagline: "Calce perfecto · confort diario · elegancia discreta",
  topBanner: "Envíos discretos a todo el país · 3 y 6 cuotas sin interés",
  addressLines: ["Showroom · Av. Mitre 520", "Carlos Spegazzini, Ezeiza"],
  hoursShowroom: "Lun–Vie 11:00 – 19:00 · Sáb 10:00 – 14:00",
  hoursAsesoria: "Asesoramiento de talles con cita previa",
  packDiscountPct: 15,
  packRequired: 3,
  shippingDiscrete: 3800,
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Carlos+Spegazzini,+Ezeiza&t=&z=14&ie=UTF8&iwloc=&output=embed",
  heroImage:
    "https://images.unsplash.com/photo-1761333478911-1ad6a29aca36?q=80&w=2000&auto=format&fit=crop",
} as const;

const img = (id: string, w = 700) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const colors = {
  blanco: { id: "blanco", name: "Blanco", hex: "#faf9f7", image: img("photo-1763633923421-52ded65c0cb2") },
  negro: { id: "negro", name: "Negro", hex: "#1c1917", image: img("photo-1758672992749-3855de546662") },
  nude: { id: "nude", name: "Nude", hex: "#e7d5c4", image: img("photo-1758520387423-9b8034d909d4") },
  borgona: { id: "borgona", name: "Borgoña", hex: "#7f1d1d", image: img("photo-1758520387423-9b8034d909d4") },
};

export const INTIMA_PRODUCTS: IntimaProduct[] = [
  {
    id: 1,
    name: "Corpiño algodón premium",
    category: "algodon",
    price: 28900,
    description: "Copas suaves · tirantes regulables",
    sizeType: "bra",
    sizes: ["85", "90", "95", "100", "105"],
    colors: [colors.blanco, colors.negro, colors.nude],
    defaultColorId: "nude",
  },
  {
    id: 2,
    name: "Bombacha clásica algodón",
    category: "algodon",
    price: 12800,
    description: "Cintura media · costuras planas",
    sizeType: "apparel",
    sizes: ["S", "M", "L", "XL"],
    colors: [colors.blanco, colors.negro, colors.nude],
    defaultColorId: "blanco",
  },
  {
    id: 3,
    name: "Conjunto encaje delicado",
    category: "encaje",
    price: 42500,
    description: "Encaje francés · forro algodón",
    sizeType: "bra",
    sizes: ["85", "90", "95", "100"],
    colors: [colors.negro, colors.borgona, colors.nude],
    defaultColorId: "negro",
  },
  {
    id: 4,
    name: "Body encaje ocasión",
    category: "encaje",
    price: 38900,
    description: "Escote profundo · cierre posterior",
    sizeType: "apparel",
    sizes: ["S", "M", "L"],
    colors: [colors.negro, colors.borgona],
    defaultColorId: "borgona",
  },
  {
    id: 5,
    name: "Pijama satén premium",
    category: "sleepwear",
    price: 56800,
    description: "Camisón + short · tacto sedoso",
    sizeType: "apparel",
    sizes: ["S", "M", "L", "XL"],
    colors: [colors.nude, colors.negro, colors.blanco],
    defaultColorId: "nude",
  },
  {
    id: 6,
    name: "Bata kimono algodón",
    category: "sleepwear",
    price: 44200,
    description: "Caída fluida · bolsillos laterales",
    sizeType: "apparel",
    sizes: ["S", "M", "L"],
    colors: [colors.blanco, colors.nude],
    defaultColorId: "blanco",
  },
  {
    id: 7,
    name: "Pack esencial diario x3",
    category: "packs",
    price: 32900,
    description: "3 bombachas algodón · colores surtidos",
    sizeType: "apparel",
    sizes: ["S", "M", "L", "XL"],
    colors: [colors.blanco, colors.nude],
    defaultColorId: "nude",
  },
  {
    id: 8,
    name: "Bóxer hombre algodón",
    category: "algodon",
    price: 14200,
    description: "Elasticidad 4 vías · cintura suave",
    sizeType: "apparel",
    sizes: ["S", "M", "L", "XL"],
    colors: [colors.negro, colors.blanco, colors.nude],
    defaultColorId: "negro",
  },
  {
    id: 9,
    name: "Colaless encaje invisible",
    category: "encaje",
    price: 15600,
    description: "Sin costuras visibles · ultraligera",
    sizeType: "apparel",
    sizes: ["S", "M", "L"],
    colors: [colors.nude, colors.negro],
    defaultColorId: "nude",
  },
  {
    id: 10,
    name: "Camisón midi sleep",
    category: "sleepwear",
    price: 38400,
    description: "Viscosa premium · bordado sutil",
    sizeType: "apparel",
    sizes: ["S", "M", "L"],
    colors: [colors.blanco, colors.borgona],
    defaultColorId: "blanco",
  },
];

export const INTIMA_PACK_ITEMS: IntimaPackItem[] = [
  { id: "bomb-clasica", name: "Bombacha clásica", price: 12800, colors: [colors.blanco, colors.negro, colors.nude], defaultColorId: "nude" },
  { id: "bomb-colaless", name: "Colaless encaje", price: 15600, colors: [colors.nude, colors.negro], defaultColorId: "nude" },
  { id: "boxer-hombre", name: "Bóxer algodón", price: 14200, colors: [colors.negro, colors.blanco], defaultColorId: "negro" },
  { id: "bomb-encaje", name: "Bombacha encaje", price: 16800, colors: [colors.borgona, colors.negro], defaultColorId: "negro" },
];

export function formatIntimaPrice(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export function isIntimaCoSlug(slug: string): boolean {
  return slug === INTIMA_CO_SLUG;
}

export function getIntimaProduct(id: number): IntimaProduct | undefined {
  return INTIMA_PRODUCTS.find((p) => p.id === id);
}

export function getIntimaColor(product: IntimaProduct | IntimaPackItem, colorId: string): IntimaColorVariant {
  return product.colors.find((c) => c.id === colorId) ?? product.colors[0];
}

/** Mock: diferencia busto − bajo busto → talle argentino */
export function calculateBraSize(bustCm: number, underbustCm: number): string | null {
  if (bustCm < 70 || underbustCm < 60 || bustCm <= underbustCm) return null;
  const diff = bustCm - underbustCm;
  if (diff < 12) return "80";
  if (diff < 14) return "85";
  if (diff < 16) return "90";
  if (diff < 18) return "95";
  if (diff < 20) return "100";
  if (diff < 22) return "105";
  return "110";
}

/** Mock: contorno cadera → talle apparel */
export function calculateApparelSize(hipCm: number): string | null {
  if (hipCm < 80) return null;
  if (hipCm < 92) return "S";
  if (hipCm < 100) return "M";
  if (hipCm < 108) return "L";
  return "XL";
}

export function calcIntimaTotals(
  lines: IntimaCartLine[],
  mode: IntimaDeliveryMode,
  packDiscountApplied: number,
): { subtotal: number; discount: number; shipping: number; total: number } {
  const cfg = INTIMA_CO_CONFIG;
  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
  const discount = packDiscountApplied;
  const shipping = lines.length > 0 && mode === "discrete" ? cfg.shippingDiscrete : 0;
  const total = Math.max(0, subtotal - discount + shipping);
  return { subtotal, discount, shipping, total };
}

export function buildIntimaOrderSummary(
  lines: IntimaCartLine[],
  totals: ReturnType<typeof calcIntimaTotals>,
  mode: IntimaDeliveryMode,
): string {
  const modeLabel =
    mode === "discrete" ? "Envío discreto a domicilio" : "Retiro gratuito en showroom";
  const rows = lines.map(
    (l) =>
      `${l.quantity}x ${l.name} — ${l.colorName} · Talle ${l.size} — ${formatIntimaPrice(l.unitPrice * l.quantity)}`,
  );
  return [
    ...rows,
    "",
    `Subtotal: ${formatIntimaPrice(totals.subtotal)}`,
    totals.discount > 0 ? `Descuento pack: -${formatIntimaPrice(totals.discount)}` : "",
    totals.shipping > 0 ? `Envío discreto: ${formatIntimaPrice(totals.shipping)}` : "",
    `Total: ${formatIntimaPrice(totals.total)}`,
    modeLabel,
  ]
    .filter(Boolean)
    .join("\n");
}
