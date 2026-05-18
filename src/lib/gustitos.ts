/** GUSTITOS — hamburguesería cinematográfica premium demo */

export const GUSTITOS_SLUG = "gustitos";

export type GustitosCategoryId =
  | "burgers"
  | "combos"
  | "papas"
  | "bebidas"
  | "especiales"
  | "explosivas";

export type GustitosProduct = {
  id: number;
  name: string;
  category: GustitosCategoryId;
  description: string;
  price: number;
  image: string;
  imageHover: string;
  badge?: string;
  spicy?: boolean;
  featured?: "large" | "wide";
};

export type GustitosCartItem = GustitosProduct & {
  key: string;
  quantity: number;
  comboLabel?: string;
  comboAdd?: number;
};

export type GustitosComboOption = {
  id: string;
  label: string;
  priceAdd: number;
};

export const GUSTITOS_COMBOS: GustitosComboOption[] = [
  { id: "solo", label: "Solo burger", priceAdd: 0 },
  { id: "papas", label: "+ Papas crunch", priceAdd: 4200 },
  { id: "combo", label: "+ Papas + Bebida", priceAdd: 6800 },
];

export const GUSTITOS_CATEGORIES: {
  id: GustitosCategoryId;
  title: string;
  subtitle: string;
  emoji: string;
  gradient: string;
  glow: string;
}[] = [
  {
    id: "burgers",
    title: "Burgers",
    subtitle: "Smash · brioche · cheddar fundido",
    emoji: "🍔",
    gradient: "from-red-950/80 to-zinc-950",
    glow: "rgba(239,68,68,0.2)",
  },
  {
    id: "combos",
    title: "Combos",
    subtitle: "Papas + bebida · precio killer",
    emoji: "🔥",
    gradient: "from-orange-950/70 to-zinc-950",
    glow: "rgba(249,115,22,0.18)",
  },
  {
    id: "papas",
    title: "Papas",
    subtitle: "Truffle · cheddar · loaded",
    emoji: "🍟",
    gradient: "from-amber-950/60 to-zinc-950",
    glow: "rgba(251,191,36,0.15)",
  },
  {
    id: "bebidas",
    title: "Bebidas",
    subtitle: "Shakes · craft · zero",
    emoji: "🥤",
    gradient: "from-zinc-800/80 to-zinc-950",
    glow: "rgba(163,163,163,0.12)",
  },
  {
    id: "especiales",
    title: "Ediciones especiales",
    subtitle: "Limited drop semanal",
    emoji: "✨",
    gradient: "from-rose-950/50 to-zinc-950",
    glow: "rgba(244,63,94,0.12)",
  },
  {
    id: "explosivas",
    title: "Explosivas premium",
    subtitle: "Heat level máximo",
    emoji: "💥",
    gradient: "from-red-900/60 via-orange-950/50 to-zinc-950",
    glow: "rgba(220,38,38,0.25)",
  },
];

export const GUSTITOS_EXPERIENCE = [
  { title: "Carne artesanal", metric: "120g", desc: "Blend Angus · smash en plancha 400°C" },
  { title: "Ingredientes premium", metric: "24h", desc: "Brioche horneado · quesos importados" },
  { title: "Delivery express", metric: "35'", desc: "Moto térmica · tracking en vivo" },
  { title: "Sabores únicos", metric: "12+", desc: "Salsas house · ediciones rotativas" },
];

export const GUSTITOS_TESTIMONIALS = [
  { name: "Lu M.", text: "La Neon Heat me voló la cabeza. Pedí dos veces en la misma noche.", rating: 5 },
  { name: "Diego R.", text: "Se siente como pedir en una app de lujo. Las papas truffle son adictivas.", rating: 5 },
  { name: "Camila S.", text: "El combo GUSTITOS XXL vale cada peso. Viral total en stories.", rating: 5 },
  { name: "Martín P.", text: "Delivery en 30 min caliente. La mejor smash de la zona sur.", rating: 5 },
];

export const GUSTITOS_CONFIG = {
  slug: GUSTITOS_SLUG,
  brand: "GUSTITOS",
  tagline: "Street gourmet brutal · smash que hipnotiza",
  promo: "2x1 en combos jueves · código GUSTI24",
  whatsapp: "5491123458888",
  isOpen: true,
  addressLines: ["Local 12 · Av. del Fuego 220", "Carlos Spegazzini, Ezeiza"],
  hours: "Mar–Dom 18:00 – 01:00 · delivery hasta 00:30",
  deliveryFee: 3200,
  freeDeliveryFrom: 28000,
  heroImage: img("photo-1572802419224-296b0aeee0d9", 2200),
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Carlos+Spegazzini,+Ezeiza&t=&z=14&ie=UTF8&iwloc=&output=embed",
} as const;

function img(id: string, w = 800) {
  return `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;
}

export const GUSTITOS_PRODUCTS: GustitosProduct[] = [
  {
    id: 1,
    name: "GUSTI Classic Smash",
    category: "burgers",
    description: "Smash 90g, cheddar doble, pepinillos, salsa GUSTI.",
    price: 10900,
    image: img("photo-1572802419224-296b0aeee0d9"),
    imageHover: img("photo-1550547660-d9450f859349"),
    badge: "Best seller",
    featured: "large",
  },
  {
    id: 2,
    name: "Neon Heat Doble",
    category: "explosivas",
    description: "Doble smash, pepper jack, jalapeños, salsa chipotle neon.",
    price: 14500,
    image: img("photo-1586190848861-99aa4a171e90"),
    imageHover: img("photo-1572802419224-296b0aeee0d9"),
    badge: "Explosiva",
    spicy: true,
    featured: "wide",
  },
  {
    id: 3,
    name: "Truffle Royale",
    category: "especiales",
    description: "Blend premium, manteca de trufa, cebolla caramelizada, rúcula.",
    price: 16800,
    image: img("photo-1550547660-d9450f859349"),
    imageHover: img("photo-1586190848861-99aa4a171e90"),
    badge: "Limited",
  },
  {
    id: 4,
    name: "Combo GUSTI XXL",
    category: "combos",
    description: "Doble bacon smash + papas loaded + shake vainilla.",
    price: 19900,
    image: img("photo-1572048572872-2394404cf1f3"),
    imageHover: img("photo-1572802419224-296b0aeee0d9"),
    badge: "Promo",
  },
  {
    id: 5,
    name: "Papas Cheddar Lava",
    category: "papas",
    description: "Papas corte grueso, cheddar fundido, bacon bits, verdeo.",
    price: 7200,
    image: img("photo-1616486338812-3dadae4b4ace"),
    imageHover: img("photo-1615874694520-474822394e73"),
  },
  {
    id: 6,
    name: "Papas Truffle Crunch",
    category: "papas",
    description: "Aceite de trufa, parmesano, hierbas, dip alioli.",
    price: 7800,
    image: img("photo-1615874694520-474822394e73"),
    imageHover: img("photo-1616486338812-3dadae4b4ace"),
  },
  {
    id: 7,
    name: "Shake Cheddar Salado",
    category: "bebidas",
    description: "Helado artesanal, toque salado, crumble de galleta.",
    price: 5900,
    image: img("photo-1582131503261-fca1d1c0589f"),
    imageHover: img("photo-1618221195710-dd6b41faaea6"),
  },
  {
    id: 8,
    name: "Cola Craft Zero",
    category: "bebidas",
    description: "500ml · edición house sin azúcar.",
    price: 3200,
    image: img("photo-1618221195710-dd6b41faaea6"),
    imageHover: img("photo-1582131503261-fca1d1c0589f"),
  },
  {
    id: 9,
    name: "Bacon Volcano",
    category: "explosivas",
    description: "Triple bacon, triple cheddar, salsa volcano, cebolla crispy.",
    price: 15200,
    image: img("photo-1572802419224-296b0aeee0d9"),
    imageHover: img("photo-1586190848861-99aa4a171e90"),
    spicy: true,
  },
  {
    id: 10,
    name: "Combo Duo Date",
    category: "combos",
    description: "2 smash classic + 2 papas + 2 bebidas.",
    price: 28900,
    image: img("photo-1572048572872-2394404cf1f3"),
    imageHover: img("photo-1550547660-d9450f859349"),
    badge: "2 personas",
  },
  {
    id: 11,
    name: "Midnight BBQ",
    category: "especiales",
    description: "Smash ahumado, onion rings, BBQ chipotle, coleslaw.",
    price: 13900,
    image: img("photo-1550547660-d9450f859349"),
    imageHover: img("photo-1572802419224-296b0aeee0d9"),
  },
  {
    id: 12,
    name: "GUSTI Kids",
    category: "burgers",
    description: "Mini smash, cheddar suave, papas kids incluidas.",
    price: 8900,
    image: img("photo-1572048572872-2394404cf1f3"),
    imageHover: img("photo-1572802419224-296b0aeee0d9"),
  },
];

export function formatGustitosPrice(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export function isGustitosSlug(slug: string): boolean {
  return slug === GUSTITOS_SLUG;
}

export function gustitosWhatsAppLink(message: string): string {
  return `https://wa.me/${GUSTITOS_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function gustitosCartWhatsApp(items: GustitosCartItem[], total: number): string {
  const cfg = GUSTITOS_CONFIG;
  let msg = `*PEDIDO ${cfg.brand}* 🍔🔥\n\n`;
  items.forEach((i) => {
    const unit = i.price + (i.comboAdd ?? 0);
    msg += `*${i.quantity}x* ${i.name}\n`;
    if (i.comboLabel && i.comboLabel !== "Solo burger") msg += `   ${i.comboLabel}\n`;
    msg += `   ${formatGustitosPrice(unit * i.quantity)}\n\n`;
  });
  msg += `*TOTAL: ${formatGustitosPrice(total)}*\n\nDelivery / retiro — confirmar tiempo.`;
  return gustitosWhatsAppLink(msg);
}
