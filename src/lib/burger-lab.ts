/** Burger Lab — hamburguesería smash premium demo */

export const BURGER_LAB_SLUG = "burger-lab";

export type BurgerCategoryId = "smash" | "papas" | "bebidas" | "combos";

export type BurgerExtra = {
  id: string;
  label: string;
  price: number;
};

export type BurgerComboOption = {
  id: string;
  label: string;
  priceAdd: number;
};

export type BurgerProduct = {
  id: number;
  name: string;
  basePrice: number;
  category: BurgerCategoryId;
  description: string;
  image: string;
  customizable: boolean;
  badge?: string;
};

export type BurgerCartLine = {
  key: string;
  productId: number;
  name: string;
  image: string;
  quantity: number;
  comboId: string;
  comboLabel: string;
  comboAdd: number;
  extras: BurgerExtra[];
  unitPrice: number;
};

export type DeliveryMode = "delivery" | "takeaway";

export const BURGER_CATEGORIES: { id: BurgerCategoryId; label: string }[] = [
  { id: "smash", label: "Smash" },
  { id: "papas", label: "Papas & Extras" },
  { id: "bebidas", label: "Bebidas" },
  { id: "combos", label: "Combos" },
];

export const BURGER_COMBO_OPTIONS: BurgerComboOption[] = [
  { id: "solo", label: "Simple (solo burger)", priceAdd: 0 },
  { id: "papas", label: "Con papas fritas", priceAdd: 4500 },
  { id: "papas-especial", label: "Con papas especiales", priceAdd: 6200 },
];

export const BURGER_EXTRAS: BurgerExtra[] = [
  { id: "bacon", label: "Extra bacon", price: 2800 },
  { id: "cheddar", label: "Extra cheddar", price: 2200 },
  { id: "huevo", label: "Huevo frito", price: 1500 },
  { id: "cebolla", label: "Cebolla crispy", price: 1200 },
];

export const BURGER_LAB_CONFIG = {
  slug: BURGER_LAB_SLUG,
  brand: "Burger Lab",
  tagline: "Smash real · queso derretido · pedido en 3 taps",
  isOpen: true,
  whatsapp: "5491123457777",
  phone: "+54 11 2345-7777",
  addressLines: ["Av. Mitre 456", "Carlos Spegazzini, Ezeiza"],
  hoursWeek: "Mar–Mié 18:00 – 00:00",
  hoursNight: "Jue–Dom 18:00 – 02:00 (horario nocturno)",
  deliveryFee: 3500,
  heroImage:
    "https://images.unsplash.com/photo-1632898658005-af95f6fa589c?q=80&w=2000&auto=format&fit=crop",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Carlos+Spegazzini,+Ezeiza&t=&z=14&ie=UTF8&iwloc=&output=embed",
  mapsDirectionsUrl:
    "https://www.google.com/maps/search/?api=1&query=Carlos+Spegazzini,+Ezeiza",
} as const;

const img = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const BURGER_PRODUCTS: BurgerProduct[] = [
  {
    id: 1,
    name: "Doble Bacon Smash",
    basePrice: 12500,
    category: "smash",
    description: "Doble carne 120g, triple cheddar, bacon crujiente, salsa secreta.",
    image: img("photo-1632898658005-af95f6fa589c"),
    customizable: true,
    badge: "Best seller",
  },
  {
    id: 2,
    name: "Classic Smash",
    basePrice: 9800,
    category: "smash",
    description: "Carne 90g, cheddar fundido, pepinillos, cebolla y mostaza.",
    image: img("photo-1627378378955-a3f4e406c5de"),
    customizable: true,
  },
  {
    id: 3,
    name: "Lab Heat",
    basePrice: 13200,
    category: "smash",
    description: "Doble smash, jalapeños, cheddar pepper jack, salsa chipotle.",
    image: img("photo-1632898657999-ae6920976661"),
    customizable: true,
    badge: "Picante",
  },
  {
    id: 4,
    name: "Papas Smash Fries",
    basePrice: 6500,
    category: "papas",
    description: "Papas finas, sal de ajo, queso rallado y verdeo.",
    image: img("photo-1632898657953-f41f81bfa892"),
    customizable: false,
  },
  {
    id: 5,
    name: "Papas Cheddar & Bacon",
    basePrice: 8900,
    category: "papas",
    description: "Papas cargadas, cheddar líquido, bacon y verdeo.",
    image: img("photo-1632898658030-ead731d252d4"),
    customizable: false,
  },
  {
    id: 6,
    name: "Aros de Cebolla",
    basePrice: 5200,
    category: "papas",
    description: "Crujientes, rebozados, dip de mostaza miel.",
    image: img("photo-1626869300069-eb1c0866feea"),
    customizable: false,
  },
  {
    id: 7,
    name: "Coca-Cola 500ml",
    basePrice: 2800,
    category: "bebidas",
    description: "Bien fría.",
    image: img("photo-1692197275931-0793e08efcc1"),
    customizable: false,
  },
  {
    id: 8,
    name: "Cerveza artesanal",
    basePrice: 4500,
    category: "bebidas",
    description: "IPA local 473ml.",
    image: img("photo-1626869300065-3bfc3a8b2e42"),
    customizable: false,
  },
  {
    id: 9,
    name: "Combo Lab Night",
    basePrice: 18900,
    category: "combos",
    description: "Doble Bacon + papas especiales + bebida.",
    image: img("photo-1664232802830-592394491fd2"),
    customizable: false,
    badge: "Combo",
  },
  {
    id: 10,
    name: "Combo Pareja Smash",
    basePrice: 22900,
    category: "combos",
    description: "2 Classic Smash + 2 papas + 2 bebidas.",
    image: img("photo-1761315413237-cc3bca353af9"),
    customizable: false,
  },
];

export function formatBurgerPrice(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export function isBurgerLabSlug(slug: string): boolean {
  return slug === BURGER_LAB_SLUG;
}

export function getBurgerProduct(id: number): BurgerProduct | undefined {
  return BURGER_PRODUCTS.find((p) => p.id === id);
}

export function calcUnitPrice(
  basePrice: number,
  comboAdd: number,
  extras: BurgerExtra[],
): number {
  return basePrice + comboAdd + extras.reduce((s, e) => s + e.price, 0);
}

export function buildCartLineKey(
  productId: number,
  comboId: string,
  extraIds: string[],
): string {
  return `${productId}-${comboId}-${extraIds.sort().join(",")}`;
}

export function burgerLabWhatsAppLink(message: string): string {
  return `https://wa.me/${BURGER_LAB_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function burgerCartWhatsApp(
  lines: BurgerCartLine[],
  totals: { subtotal: number; shipping: number; total: number },
  mode: DeliveryMode,
): string {
  const modeLabel = mode === "delivery" ? "Delivery (envío a domicilio)" : "Take Away (retiro en local)";

  let msg = `*PEDIDO ${BURGER_LAB_CONFIG.brand}* 🍔\n\n`;
  lines.forEach((line) => {
    const extras =
      line.extras.length > 0 ? ` (${line.extras.map((e) => e.label).join(", ")})` : "";
    msg += `*${line.quantity}x* ${line.name}\n`;
    msg += `   ${line.comboLabel}${extras}\n`;
    msg += `   ${formatBurgerPrice(line.unitPrice * line.quantity)}\n`;
  });
  msg += `\nSubtotal: ${formatBurgerPrice(totals.subtotal)}`;
  if (mode === "delivery") {
    msg += `\nEnvío: ${formatBurgerPrice(totals.shipping)}`;
  }
  msg += `\n*TOTAL: ${formatBurgerPrice(totals.total)}*`;
  msg += `\n\n${modeLabel}`;
  msg += `\n\nConfirmar tiempo de preparación. ¡Gracias!`;
  return burgerLabWhatsAppLink(msg);
}
