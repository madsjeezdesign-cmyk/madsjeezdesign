/** Pizzería Nápoles — pizza artesanal y masa madre demo */

export const PIZZERIA_NAPOLES_SLUG = "pizzeria-napoles";

export type NapolesCategoryId = "pizzas" | "mitades" | "empanadas" | "bebidas";

export type NapolesProduct = {
  id: number;
  name: string;
  price: number;
  category: NapolesCategoryId;
  description: string;
  image: string;
  badge?: string;
};

export type HalfFlavor = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export type NapolesCartLine =
  | {
      kind: "product";
      key: string;
      productId: number;
      name: string;
      quantity: number;
      unitPrice: number;
      detail?: string;
    }
  | {
      kind: "half";
      key: string;
      halfA: HalfFlavor;
      halfB: HalfFlavor;
      quantity: number;
      unitPrice: number;
    }
  | {
      kind: "empanada";
      key: string;
      productId: number;
      name: string;
      quantity: number;
      unitPrice: number;
    };

export type DeliveryMode = "delivery" | "takeaway";

export const NAPOLES_CATEGORIES: { id: NapolesCategoryId; label: string }[] = [
  { id: "pizzas", label: "Pizzas Grandes" },
  { id: "mitades", label: "Armá tu Pizza" },
  { id: "empanadas", label: "Empanadas" },
  { id: "bebidas", label: "Bebidas" },
];

export const HALF_FLAVORS: HalfFlavor[] = [
  {
    id: "muzza",
    name: "Muzzarella",
    price: 14500,
    description: "Muzza de masa madre, salsa de tomates italianos, albahaca, oliva.",
  },
  {
    id: "napolitana",
    name: "Napolitana",
    price: 15800,
    description: "Muzza, rodajas de tomate, ajo, orégano.",
  },
  {
    id: "fugazza",
    name: "Fugazzeta",
    price: 16200,
    description: "Cebolla caramelizada, muzza, orégano.",
  },
  {
    id: "calabresa",
    name: "Calabresa",
    price: 16800,
    description: "Longaniza artesanal, muzza, ají molido.",
  },
  {
    id: "cuatro",
    name: "Cuatro Quesos",
    price: 17500,
    description: "Muzza, provolone, roquefort, parmesano.",
  },
  {
    id: "prosciutto",
    name: "Prosciutto",
    price: 18200,
    description: "Jamón crudo, rúcula, parmesano, oliva.",
  },
];

export const PIZZERIA_NAPOLES_CONFIG = {
  slug: PIZZERIA_NAPOLES_SLUG,
  brand: "Pizzería Nápoles",
  tagline: "Masa madre · horno de barro · sabor de barrio",
  ovenOn: true,
  whatsapp: "5491123456666",
  addressLines: ["Av. Belgrano 318", "Carlos Spegazzini, Ezeiza"],
  hoursWeek: "Lun 18:00 – 23:00",
  hoursNight: "Mar–Dom 18:00 – 01:00 (turno noche)",
  deliveryFee: 3200,
  empanadaDozenMin: 12,
  empanadaDozenDiscountPct: 10,
  heroImage:
    "https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=2000&auto=format&fit=crop",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Carlos+Spegazzini,+Ezeiza&t=&z=14&ie=UTF8&iwloc=&output=embed",
  mapsDirectionsUrl:
    "https://www.google.com/maps/search/?api=1&query=Carlos+Spegazzini,+Ezeiza",
} as const;

const img = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const NAPOLES_PRODUCTS: NapolesProduct[] = [
  {
    id: 1,
    name: "Muzzarella Clásica",
    price: 14500,
    category: "pizzas",
    description: "Muzza de masa madre, salsa de tomates italianos, albahaca fresca, oliva.",
    image: img("photo-1622880833523-7cf1c0bd4296"),
    badge: "Clásica",
  },
  {
    id: 2,
    name: "Napolitana",
    price: 15800,
    category: "pizzas",
    description: "Muzza, tomate en rodajas, ajo, orégano del Véneto.",
    image: img("photo-1564936281291-294551497d81"),
  },
  {
    id: 3,
    name: "Fugazzeta Rellena",
    price: 17200,
    category: "pizzas",
    description: "Cebolla, muzza, jamón cocido artesanal.",
    image: img("photo-1621538997517-58ce53933faa"),
  },
  {
    id: 4,
    name: "Calabresa Picante",
    price: 16800,
    category: "pizzas",
    description: "Longaniza, muzza, ají en oliva.",
    image: img("photo-1606152196365-d1ce5ea838b5"),
  },
  {
    id: 10,
    name: "Empanada Carne a cuchillo",
    price: 2200,
    category: "empanadas",
    description: "Carne cortada a cuchillo, cebolla, huevo.",
    image: img("photo-1612692177120-847e15b2815d"),
  },
  {
    id: 11,
    name: "Empanada Jamón y Queso",
    price: 2100,
    category: "empanadas",
    description: "Jamón cocido premium y muzza.",
    image: img("photo-1607018244619-dab6235709dd"),
  },
  {
    id: 12,
    name: "Empanada Humita",
    price: 2000,
    category: "empanadas",
    description: "Choclo cremoso, cebolla, morrón.",
    image: img("photo-1489564239502-7a532064e1c2"),
  },
  {
    id: 20,
    name: "Coca-Cola 1.5L",
    price: 3500,
    category: "bebidas",
    description: "Para compartir.",
    image: img("photo-1564936281403-f92f66f89ee0"),
  },
  {
    id: 21,
    name: "Cerveza artesanal",
    price: 4200,
    category: "bebidas",
    description: "Rubia 473ml.",
    image: img("photo-1680798671233-a6823e6e9a1e"),
  },
];

export function formatNapolesPrice(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export function isPizzeriaNapolesSlug(slug: string): boolean {
  return slug === PIZZERIA_NAPOLES_SLUG;
}

export function getNapolesProduct(id: number): NapolesProduct | undefined {
  return NAPOLES_PRODUCTS.find((p) => p.id === id);
}

export function getHalfFlavor(id: string): HalfFlavor | undefined {
  return HALF_FLAVORS.find((f) => f.id === id);
}

/** Precio mitad/mitad = mitad más cara (regla típica pizzería) */
export function calcHalfPizzaPrice(a: HalfFlavor, b: HalfFlavor): number {
  return Math.max(a.price, b.price);
}

export function countEmpanadas(lines: NapolesCartLine[]): number {
  return lines
    .filter((l): l is Extract<NapolesCartLine, { kind: "empanada" }> => l.kind === "empanada")
    .reduce((s, l) => s + l.quantity, 0);
}

export function calcCartTotals(
  lines: NapolesCartLine[],
  mode: DeliveryMode,
): { subtotal: number; empanadaDiscount: number; shipping: number; total: number; empanadaCount: number } {
  const cfg = PIZZERIA_NAPOLES_CONFIG;
  let subtotal = 0;
  let empanadaSubtotal = 0;

  lines.forEach((line) => {
    const lineTotal = line.unitPrice * line.quantity;
    subtotal += lineTotal;
    if (line.kind === "empanada") empanadaSubtotal += lineTotal;
  });

  const empanadaCount = countEmpanadas(lines);
  let empanadaDiscount = 0;
  if (empanadaCount >= cfg.empanadaDozenMin) {
    empanadaDiscount = Math.round(empanadaSubtotal * (cfg.empanadaDozenDiscountPct / 100));
  }

  const afterDiscount = subtotal - empanadaDiscount;
  const shipping = lines.length > 0 && mode === "delivery" ? cfg.deliveryFee : 0;

  return {
    subtotal,
    empanadaDiscount,
    shipping,
    total: afterDiscount + shipping,
    empanadaCount,
  };
}

export function napolesWhatsAppLink(message: string): string {
  return `https://wa.me/${PIZZERIA_NAPOLES_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function napolesCartWhatsApp(
  lines: NapolesCartLine[],
  totals: ReturnType<typeof calcCartTotals>,
  mode: DeliveryMode,
): string {
  const modeLabel = mode === "delivery" ? "Delivery (envío a domicilio)" : "Retiro por el local";
  let msg = `*PEDIDO ${PIZZERIA_NAPOLES_CONFIG.brand}* 🍕\n\n`;

  lines.forEach((line) => {
    if (line.kind === "half") {
      msg += `*${line.quantity}x* Pizza Mitad ${line.halfA.name} / Mitad ${line.halfB.name}\n`;
      msg += `   ${formatNapolesPrice(line.unitPrice * line.quantity)}\n`;
    } else if (line.kind === "empanada") {
      msg += `*${line.quantity}x* ${line.name}\n`;
      msg += `   ${formatNapolesPrice(line.unitPrice * line.quantity)}\n`;
    } else {
      msg += `*${line.quantity}x* ${line.name}\n`;
      if (line.detail) msg += `   ${line.detail}\n`;
      msg += `   ${formatNapolesPrice(line.unitPrice * line.quantity)}\n`;
    }
  });

  msg += `\nSubtotal: ${formatNapolesPrice(totals.subtotal)}`;
  if (totals.empanadaDiscount > 0) {
    msg += `\nDesc. docena empanadas: -${formatNapolesPrice(totals.empanadaDiscount)}`;
  }
  if (mode === "delivery") msg += `\nEnvío: ${formatNapolesPrice(totals.shipping)}`;
  msg += `\n*TOTAL: ${formatNapolesPrice(totals.total)}*`;
  msg += `\n\n${modeLabel}`;
  msg += `\n\nConfirmar tiempo de horno. ¡Gracias!`;
  return napolesWhatsAppLink(msg);
}
