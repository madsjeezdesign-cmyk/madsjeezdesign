/** Central de Bebidas — distribuidora mayorista/minorista demo */

export const CENTRAL_BEBIDAS_SLUG = "central-bebidas";

export type BebidaCategoryId =
  | "cervezas"
  | "destilados"
  | "vinos"
  | "gaseosas"
  | "barriles";

export type StockLevel = "high" | "low" | "critical";

export type PurchaseMode = "retail" | "wholesale";

export type BebidaProduct = {
  id: number;
  name: string;
  brand: string;
  category: BebidaCategoryId;
  volume: string;
  unitPrice: number;
  bulkUnitPrice: number;
  bulkMin: number;
  bulkLabel: string;
  stock: StockLevel;
  image: string;
};

export type BebidaCartItem = BebidaProduct & {
  key: string;
  quantity: number;
};

export type BebidaCombo = {
  id: string;
  name: string;
  description: string;
  promoPrice: number;
  items: { productId: number; qty: number; label: string }[];
  image: string;
  badge?: string;
};

export type DeliveryMethod = "flete" | "express" | "deposito";

export const BEBIDA_CATEGORIES: { id: BebidaCategoryId | "all"; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "cervezas", label: "Cervezas" },
  { id: "destilados", label: "Destilados" },
  { id: "vinos", label: "Vinos y Espumantes" },
  { id: "gaseosas", label: "Gaseosas y Aguas" },
  { id: "barriles", label: "Barriles y Choperas" },
];

export const STOCK_LABELS: Record<StockLevel, { label: string; className: string }> = {
  high: { label: "Stock alto", className: "bg-lime-500/20 text-lime-400 border-lime-500/40" },
  low: { label: "Últimas unidades", className: "bg-amber-500/20 text-amber-400 border-amber-500/40" },
  critical: { label: "Crítico", className: "bg-red-500/20 text-red-400 border-red-500/40" },
};

export const CENTRAL_BEBIDAS_CONFIG = {
  slug: CENTRAL_BEBIDAS_SLUG,
  brand: "Central de Bebidas",
  tagline: "Distribuidora mayorista y minorista · entrega en el día",
  whatsapp: "5491123459999",
  phone: "+54 11 2345-9999",
  address: "Depósito Central · Av. Industrial 2840, Avellaneda",
  hours: "Lun–Sáb 7:00 – 22:00 · Dom 8:00 – 14:00",
  wholesaleDiscountPct: 18,
  shipping: {
    flete: 8500,
    express: 14500,
    deposito: 0,
  } as Record<DeliveryMethod, number>,
  deliveryZones: [
    "CABA y GBA sur (24–48 hs)",
    "GBA norte y oeste (48–72 hs)",
    "Zona sur cordón industrial (mismo día en moto)",
  ],
  heroSlides: [
    {
      image:
        "https://images.unsplash.com/photo-1608270586620-01048fecad0f?q=80&w=2000&auto=format&fit=crop",
      title: "Cervezas bien frías",
      subtitle: "Marcas líderes · precios por bulto",
    },
    {
      image:
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d44?q=80&w=2000&auto=format&fit=crop",
      title: "Destilados premium",
      subtitle: "Fernet · Gin · Vodka · stock inmediato",
    },
    {
      image:
        "https://images.unsplash.com/photo-1551024709-8f23f40f6386?q=80&w=2000&auto=format&fit=crop",
      title: "Combos para eventos",
      subtitle: "Armados listos · un clic al carrito",
    },
  ],
  flashOffers: [
    { id: "f1", title: "Combo Relámpago Fernet", endsAt: Date.now() + 3600000 * 5 },
    { id: "f2", title: "Pack Evento 50 personas", endsAt: Date.now() + 3600000 * 12 },
  ],
} as const;

const img = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const BEBIDA_PRODUCTS: BebidaProduct[] = [
  {
    id: 1,
    name: "Quilmes Cristal",
    brand: "Quilmes",
    category: "cervezas",
    volume: "473 ml x24",
    unitPrice: 1850,
    bulkUnitPrice: 1520,
    bulkMin: 6,
    bulkLabel: "Bulto x24",
    stock: "high",
    image: img("photo-1608270586620-01048fecad0f"),
  },
  {
    id: 2,
    name: "Stella Artois",
    brand: "Stella",
    category: "cervezas",
    volume: "330 ml x24",
    unitPrice: 2100,
    bulkUnitPrice: 1750,
    bulkMin: 6,
    bulkLabel: "Bulto x24",
    stock: "high",
    image: img("photo-1535958636472-d7eeef527c0d"),
  },
  {
    id: 3,
    name: "Fernet Branca",
    brand: "Branca",
    category: "destilados",
    volume: "750 ml",
    unitPrice: 12400,
    bulkUnitPrice: 10200,
    bulkMin: 6,
    bulkLabel: "Caja x6",
    stock: "high",
    image: img("photo-1470337458703-46ad1756a187"),
  },
  {
    id: 4,
    name: "Gin Bombay Sapphire",
    brand: "Bombay",
    category: "destilados",
    volume: "750 ml",
    unitPrice: 28900,
    bulkUnitPrice: 24500,
    bulkMin: 3,
    bulkLabel: "Caja x3",
    stock: "low",
    image: img("photo-1514362545857-3bc16c4c7d44"),
  },
  {
    id: 5,
    name: "Vodka Smirnoff",
    brand: "Smirnoff",
    category: "destilados",
    volume: "750 ml",
    unitPrice: 9800,
    bulkUnitPrice: 8200,
    bulkMin: 6,
    bulkLabel: "Caja x6",
    stock: "high",
    image: img("photo-1551538827-9bcdc4c7d167"),
  },
  {
    id: 6,
    name: "Malbec Trapiche",
    brand: "Trapiche",
    category: "vinos",
    volume: "750 ml",
    unitPrice: 4200,
    bulkUnitPrice: 3500,
    bulkMin: 12,
    bulkLabel: "Caja x12",
    stock: "high",
    image: img("photo-1510812431401-41d2bd2722f3"),
  },
  {
    id: 7,
    name: "Espumante Chandon",
    brand: "Chandon",
    category: "vinos",
    volume: "750 ml",
    unitPrice: 18500,
    bulkUnitPrice: 15800,
    bulkMin: 6,
    bulkLabel: "Caja x6",
    stock: "low",
    image: img("photo-1547595628-c61a29f496f0"),
  },
  {
    id: 8,
    name: "Coca-Cola",
    brand: "Coca-Cola",
    category: "gaseosas",
    volume: "2.25 L x6",
    unitPrice: 3200,
    bulkUnitPrice: 2650,
    bulkMin: 4,
    bulkLabel: "Pack x6",
    stock: "high",
    image: img("photo-1622483767028-3ff66d7f2d92"),
  },
  {
    id: 9,
    name: "Sprite",
    brand: "Sprite",
    category: "gaseosas",
    volume: "2.25 L x6",
    unitPrice: 2900,
    bulkUnitPrice: 2400,
    bulkMin: 4,
    bulkLabel: "Pack x6",
    stock: "high",
    image: img("photo-1625772299848-fca379cf8783"),
  },
  {
    id: 10,
    name: "Agua mineral",
    brand: "Villavicencio",
    category: "gaseosas",
    volume: "2 L x6",
    unitPrice: 1800,
    bulkUnitPrice: 1450,
    bulkMin: 6,
    bulkLabel: "Pack x6",
    stock: "critical",
    image: img("photo-1548839140-29a4e9608603"),
  },
  {
    id: 11,
    name: "Barril Schneider",
    brand: "Schneider",
    category: "barriles",
    volume: "30 L",
    unitPrice: 42000,
    bulkUnitPrice: 38500,
    bulkMin: 2,
    bulkLabel: "Dúo barriles",
    stock: "low",
    image: img("photo-1571613317784-ef00d0cc0ae4"),
  },
  {
    id: 12,
    name: "Chopera alquiler",
    brand: "Central",
    category: "barriles",
    volume: "Evento 48 hs",
    unitPrice: 15000,
    bulkUnitPrice: 12000,
    bulkMin: 2,
    bulkLabel: "Pack eventos",
    stock: "high",
    image: img("photo-1578662996442-48f60103fc96"),
  },
];

export const BEBIDA_COMBOS: BebidaCombo[] = [
  {
    id: "combo-fernet",
    name: "Combo Promo Fernet + Gaseosa",
    description: "6 Fernet Branca 750cc + 4 Coca-Cola 2.25L",
    promoPrice: 98500,
    badge: "Más vendido",
    image: img("photo-1470337458703-46ad1756a187"),
    items: [
      { productId: 3, qty: 6, label: "Fernet Branca 750cc" },
      { productId: 8, qty: 4, label: "Coca-Cola 2.25L" },
    ],
  },
  {
    id: "combo-cumple",
    name: "Combo Cumpleaños 30 pers.",
    description: "2 barriles + gaseosas + hielo simbólico",
    promoPrice: 118000,
    image: img("photo-1571613317784-ef00d0cc0ae4"),
    items: [
      { productId: 11, qty: 2, label: "Barril Schneider 30L" },
      { productId: 8, qty: 6, label: "Coca-Cola 2.25L" },
      { productId: 9, qty: 4, label: "Sprite 2.25L" },
    ],
  },
  {
    id: "combo-gin",
    name: "Combo Barra Gin Tonic",
    description: "3 Bombay + 6 Sprite + 2 Chandon",
    promoPrice: 142000,
    badge: "Eventos",
    image: img("photo-1514362545857-3bc16c4c7d44"),
    items: [
      { productId: 4, qty: 3, label: "Gin Bombay 750ml" },
      { productId: 9, qty: 6, label: "Sprite 2.25L" },
      { productId: 7, qty: 2, label: "Chandon 750ml" },
    ],
  },
];

export function formatBebidaPrice(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export function getLineUnitPrice(product: BebidaProduct, qty: number, mode: PurchaseMode): number {
  const useBulk = mode === "wholesale" || qty >= product.bulkMin;
  return useBulk ? product.bulkUnitPrice : product.unitPrice;
}

export function getLineTotal(product: BebidaProduct, qty: number, mode: PurchaseMode): number {
  return getLineUnitPrice(product, qty, mode) * qty;
}

export function getRetailEquivalent(product: BebidaProduct, qty: number): number {
  return product.unitPrice * qty;
}

export function isCentralBebidasSlug(slug: string): boolean {
  return slug === CENTRAL_BEBIDAS_SLUG;
}

export function getBebidaProduct(id: number): BebidaProduct | undefined {
  return BEBIDA_PRODUCTS.find((p) => p.id === id);
}

export function bebidasWhatsAppLink(message: string): string {
  return `https://wa.me/${CENTRAL_BEBIDAS_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function bebidasCartWhatsApp(
  items: BebidaCartItem[],
  mode: PurchaseMode,
  totals: { subtotal: number; wholesaleSave: number; shipping: number; total: number },
  delivery: DeliveryMethod,
): string {
  const deliveryLabels: Record<DeliveryMethod, string> = {
    flete: "Envío programado en flete",
    express: "Envío express en el día (motos)",
    deposito: "Retiro en depósito central",
  };

  let msg = `*PEDIDO ${CENTRAL_BEBIDAS_CONFIG.brand}*\n`;
  msg += `Modo: ${mode === "wholesale" ? "MAYORISTA" : "MINORISTA"}\n\n`;
  items.forEach((item) => {
    const unit = getLineUnitPrice(item, item.quantity, mode);
    msg += `*${item.quantity}x* ${item.name} ${item.volume}\n`;
    msg += `   ${formatBebidaPrice(unit)} c/u · ${formatBebidaPrice(unit * item.quantity)}\n`;
  });
  msg += `\nSubtotal: ${formatBebidaPrice(totals.subtotal)}`;
  if (totals.wholesaleSave > 0) {
    msg += `\nDesc. mayorista/bulto: -${formatBebidaPrice(totals.wholesaleSave)}`;
  }
  msg += `\nEnvío: ${formatBebidaPrice(totals.shipping)}`;
  msg += `\n*TOTAL: ${formatBebidaPrice(totals.total)}*`;
  msg += `\n\nEntrega: ${deliveryLabels[delivery]}`;
  msg += `\n\nConfirmar stock y horario. Gracias.`;
  return bebidasWhatsAppLink(msg);
}

export function calcCartTotals(
  items: BebidaCartItem[],
  mode: PurchaseMode,
  delivery: DeliveryMethod,
): { subtotal: number; wholesaleSave: number; shipping: number; total: number } {
  let subtotal = 0;
  let retailEquiv = 0;
  items.forEach((item) => {
    subtotal += getLineTotal(item, item.quantity, mode);
    retailEquiv += getRetailEquivalent(item, item.quantity);
  });
  const wholesaleSave = Math.max(0, retailEquiv - subtotal);
  const shipping = items.length > 0 ? CENTRAL_BEBIDAS_CONFIG.shipping[delivery] : 0;
  return { subtotal, wholesaleSave, shipping, total: subtotal + shipping };
}
