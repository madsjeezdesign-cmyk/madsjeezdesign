/** Masa Madre & Co. — panadería artesanal demo */

export const MASA_MADRE_CO_SLUG = "masa-madre-co";

export type BakeryCategoryId = "panes" | "facturas" | "pasteleria" | "combos";

export type BakeryProduct = {
  id: number;
  name: string;
  price: number;
  category: BakeryCategoryId;
  image: string;
  description: string;
  ingredients: string;
  badge?: string;
};

export type BakeryCartItem = BakeryProduct & {
  key: string;
  quantity: number;
};

export type OvenStatus = "now" | "soon" | "ready";

export type OvenItem = {
  id: string;
  product: string;
  status: OvenStatus;
  minutes?: number;
  emoji: string;
};

export const BAKERY_CATEGORIES: { id: BakeryCategoryId | "all"; label: string }[] = [
  { id: "all", label: "Todo" },
  { id: "panes", label: "Panes Artesanales" },
  { id: "facturas", label: "Facturas y Facturería" },
  { id: "pasteleria", label: "Pastelería" },
  { id: "combos", label: "Combos / Catering" },
];

export const MASA_MADRE_CONFIG = {
  slug: MASA_MADRE_CO_SLUG,
  brand: "Masa Madre & Co.",
  tagline: "Panadería y pastelería artesanal · fermentación lenta",
  whatsapp: "5491123456789",
  phone: "+54 11 2345-6789",
  addressLines: ["Av. San Martín 1248", "Carlos Spegazzini, Ezeiza, Buenos Aires"],
  hoursWeek: "Lun–Vie 7:00 – 20:00",
  hoursWeekend: "Sáb, Dom y feriados 7:00 – 21:30",
  deliveryFee: 3200,
  heroImage:
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1600&auto=format&fit=crop",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Carlos+Spegazzini,+Provincia+de+Buenos+Aires&t=&z=14&ie=UTF8&iwloc=&output=embed",
  mapsDirectionsUrl:
    "https://www.google.com/maps/search/?api=1&query=Carlos+Spegazzini,+Ezeiza,+Buenos+Aires",
} as const;

const img = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const BAKERY_PRODUCTS: BakeryProduct[] = [
  {
    id: 1,
    name: "Pan de Campo Masa Madre",
    price: 4500,
    category: "panes",
    image: img("photo-1549931319-a545dcf3bc73"),
    description: "Corteza crujiente, miga alveolada y aroma a fermentación de 48 hs.",
    ingredients: "Harina orgánica, masa madre, agua filtrada, sal marina",
    badge: "Estrella",
  },
  {
    id: 2,
    name: "Focaccia al Romero",
    price: 5200,
    category: "panes",
    image: img("photo-1521335629791-ce4aec67dd15"),
    description: "Aceite de oliva extra virgen y romero fresco del huerto.",
    ingredients: "Harina 00, levadura, romero, aceite de oliva, sal",
  },
  {
    id: 3,
    name: "Baguette Tradicional",
    price: 3800,
    category: "panes",
    image: img("photo-1621261027519-a71ac66d5a68"),
    description: "Corteza fina y crujiente, ideal para sándwiches y picadas.",
    ingredients: "Harina, agua, levadura, sal",
  },
  {
    id: 4,
    name: "Croissant 100% Manteca",
    price: 2800,
    category: "facturas",
    image: img("photo-1637228393246-c38a4b3d2011"),
    description: "Hojaldrado francés con laminado de 27 capas.",
    ingredients: "Manteca clarificada, harina, huevos, azúcar impalpable",
    badge: "Recién horneado",
  },
  {
    id: 5,
    name: "Medialunas de Manteca",
    price: 2200,
    category: "facturas",
    image: img("photo-1615873968403-89e068629265"),
    description: "Dulces y saladas — clásicas porteñas con toque artesanal.",
    ingredients: "Manteca, harina, azúcar, yema de huevo",
  },
  {
    id: 6,
    name: "Facturas de Crema",
    price: 3200,
    category: "facturas",
    image: img("photo-1578985545062-69928b1d9587"),
    description: "Relleno de crema pastelera de vainilla bourbon.",
    ingredients: "Hojaldre, crema pastelera, azúcar glas",
  },
  {
    id: 7,
    name: "Brownie Cacao 70%",
    price: 4800,
    category: "pasteleria",
    image: img("photo-1583316174775-bd6dc0e9f298"),
    description: "Interior húmedo, trozos de nuez pecana tostada.",
    ingredients: "Chocolate belga, manteca, huevos, nueces",
  },
  {
    id: 8,
    name: "Tarta Frutos Rojos",
    price: 8900,
    category: "pasteleria",
    image: img("photo-1565958011703-44f9829ba187"),
    description: "Base de masa quebrada y crema de queso con frutos de estación.",
    ingredients: "Frambuesas, arándanos, queso crema, masa sable",
    badge: "Porción entera",
  },
  {
    id: 9,
    name: "Alfajor Artesanal DDL",
    price: 3500,
    category: "pasteleria",
    image: img("photo-1571115177098-24ec42ed204d"),
    description: "Doble galleta de maicena con dulce de leche casero.",
    ingredients: "Maicena, manteca, dulce de leche, coco",
  },
  {
    id: 10,
    name: "Desayuno Office (6 pers.)",
    price: 18500,
    category: "combos",
    image: img("photo-1572715376701-98568319fd0b"),
    description: "Mix de facturas, jugo natural y café de especialidad.",
    ingredients: "Medialunas, croissants, café, jugo naranja",
    badge: "Catering",
  },
  {
    id: 11,
    name: "Box Merienda Familiar",
    price: 24000,
    category: "combos",
    image: img("photo-1564759296729-771e78c26df7"),
    description: "Selección surtida de panes, facturas y pastelería mini.",
    ingredients: "Surtido artesanal del día",
  },
  {
    id: 12,
    name: "Catering Eventos Premium",
    price: 45000,
    category: "combos",
    image: img("photo-1476224203421-9ac39bcb3327"),
    description: "Tabla de panes, dips y mini postres para 15 personas.",
    ingredients: "Panes, focaccia, dips, brownies mini",
    badge: "Encargue 48 hs",
  },
];

export const INITIAL_OVEN_BOARD: OvenItem[] = [
  { id: "1", product: "Facturas de crema", status: "now", emoji: "🥐" },
  { id: "2", product: "Pan lactal integral", status: "soon", minutes: 15, emoji: "🍞" },
  { id: "3", product: "Croissants manteca", status: "now", emoji: "🥖" },
  { id: "4", product: "Focaccia romero", status: "ready", emoji: "🫒" },
  { id: "5", product: "Brownies cacao", status: "soon", minutes: 22, emoji: "🍫" },
];

export function formatBakeryPrice(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export function isMasaMadreCoSlug(slug: string): boolean {
  return slug === MASA_MADRE_CO_SLUG;
}

export function masaMadreWhatsAppLink(message: string): string {
  return `https://wa.me/${MASA_MADRE_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function masaMadreCartWhatsApp(
  items: BakeryCartItem[],
  subtotal: number,
  shipping: number,
  deliveryMethod: "pickup" | "delivery",
): string {
  const deliveryStr =
    deliveryMethod === "pickup"
      ? "📍 Retiro en el local (Gratis) — Carlos Spegazzini, Ezeiza"
      : `🚚 Envío a domicilio — ${formatBakeryPrice(shipping)}`;

  let msg = `¡Hola ${MASA_MADRE_CONFIG.brand}! 🥖 Pedido desde la web:\n\n`;
  items.forEach((item) => {
    const line = item.price * item.quantity;
    msg += `• ${item.quantity}x ${item.name}\n   ${formatBakeryPrice(line)}\n`;
  });
  msg += `\n📦 Subtotal: ${formatBakeryPrice(subtotal)}`;
  if (deliveryMethod === "delivery") {
    msg += `\n🚛 Envío: ${formatBakeryPrice(shipping)}`;
    msg += `\n💵 Total: ${formatBakeryPrice(subtotal + shipping)}`;
  } else {
    msg += `\n💵 Total: ${formatBakeryPrice(subtotal)}`;
  }
  msg += `\n${deliveryStr}`;
  msg += `\n\n¿Me confirman disponibilidad? ¡Gracias!`;
  return masaMadreWhatsAppLink(msg);
}
