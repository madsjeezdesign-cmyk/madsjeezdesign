/** Cerrajería Central — cerrajería integral y seguridad demo */

export const CERRAJERIA_CENTRAL_SLUG = "cerrajeria-central";

export type KeyTypeId = "yale" | "cruz" | "computada" | "auto-chip";

export type SecurityCategoryId = "digital" | "candados" | "alta" | "cajas";

export type CentralCartProductLine = {
  kind: "product";
  key: string;
  productId: number;
  name: string;
  specs: string;
  unitPrice: number;
  quantity: number;
};

export type CentralCartServiceLine = {
  kind: "service";
  key: string;
  serviceLabel: string;
  keyTypeLabel: string;
  copies: number;
  unitPrice: number;
  quantity: 1;
};

export type CentralCartLine = CentralCartProductLine | CentralCartServiceLine;

export type CentralDeliveryMode = "shipping" | "install" | "pickup";

export const KEY_TYPES: {
  id: KeyTypeId;
  label: string;
  pricePerCopy: number;
  eta: string;
}[] = [
  { id: "yale", label: "Llave Común / Yale", pricePerCopy: 2800, eta: "En el acto (5 min)" },
  { id: "cruz", label: "Llave Cruz", pricePerCopy: 4200, eta: "10–15 min" },
  { id: "computada", label: "Llave Computada Alta Seguridad", pricePerCopy: 18500, eta: "Reserva 24–48 hs" },
  { id: "auto-chip", label: "Llave de Auto con Chip", pricePerCopy: 45000, eta: "Requiere código · 48 hs" },
];

export const SECURITY_CATEGORIES: { id: SecurityCategoryId | "all"; label: string }[] = [
  { id: "all", label: "Todo el catálogo" },
  { id: "digital", label: "Cerraduras Digitales / Biométricas" },
  { id: "candados", label: "Candados Reforzados" },
  { id: "alta", label: "Alta Seguridad (Trabex / Prive)" },
  { id: "cajas", label: "Cajas Fuertes" },
];

export type SecurityProduct = {
  id: number;
  name: string;
  category: SecurityCategoryId;
  brand: string;
  price: number;
  image: string;
  specs: {
    boltDiameter?: string;
    latchType?: string;
    combinations?: string;
    extra?: string;
  };
};

export const CERRAJERIA_CENTRAL_CONFIG = {
  slug: CERRAJERIA_CENTRAL_SLUG,
  brand: "Cerrajería Central",
  tagline: "Urgencias 24 hs · copias · cerraduras · instalación certificada",
  phoneUrgency: "+54 11 5555-2424",
  whatsapp: "5491155552424",
  coverage: "GBA sur · Ezeiza · La Plata · CABA zona sur · urgencias en ruta",
  addressLines: ["Taller Mecánico · Av. San Martín 1580", "Carlos Spegazzini, Ezeiza"],
  hoursShop: "Lun–Sáb 8:00 – 20:00 · copias en el acto hasta las 19:00",
  hoursUrgency: "Urgencias 24/7 los 365 días",
  heroImage:
    "https://images.unsplash.com/photo-1634979149798-e9a118734e93?q=80&w=2000&auto=format&fit=crop",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Carlos+Spegazzini,+Ezeiza&t=&z=14&ie=UTF8&iwloc=&output=embed",
  shippingProduct: 4500,
  installFee: 12000,
} as const;

const img = (id: string, w = 700) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const SECURITY_PRODUCTS: SecurityProduct[] = [
  {
    id: 1,
    name: "Cerradura biométrica Wi-Fi",
    category: "digital",
    brand: "SmartLock Pro",
    price: 189000,
    image: img("photo-1685886069739-c1b96bba7953"),
    specs: {
      boltDiameter: "20 mm acero",
      latchType: "Pestillo reversible",
      extra: "Huella + PIN + app · batería 12 meses",
    },
  },
  {
    id: 2,
    name: "Teclado numérico mural",
    category: "digital",
    brand: "SecurePad",
    price: 98500,
    image: img("photo-1733244766159-f58f4184fd38"),
    specs: {
      boltDiameter: "18 mm",
      latchType: "Monopunto",
      combinations: "6 dígitos programables",
    },
  },
  {
    id: 3,
    name: "Candado reforzado 70 mm",
    category: "candados",
    brand: "Armored",
    price: 42800,
    image: img("photo-1635237393049-55046279ebb8"),
    specs: {
      boltDiameter: "10 mm endurecido",
      extra: "Cuerpo bronce · doble bloqueo",
    },
  },
  {
    id: 4,
    name: "Candado alta seguridad 80 mm",
    category: "candados",
    brand: "Titan",
    price: 67200,
    image: img("photo-1634979149798-e9a118734e93"),
    specs: {
      boltDiameter: "12 mm boron",
      extra: "Anti-taladro · grillete acero cementado",
    },
  },
  {
    id: 5,
    name: "Cilindro Trabex MAX",
    category: "alta",
    brand: "Trabex",
    price: 89500,
    image: img("photo-1733244766159-f58f4184fd38"),
    specs: {
      boltDiameter: "32 mm europeo",
      latchType: "Doble embrague",
      combinations: "Llave de puntos + tarjeta",
    },
  },
  {
    id: 6,
    name: "Cerradura Prive A2",
    category: "alta",
    brand: "Prive",
    price: 124000,
    image: img("photo-1685886069739-c1b96bba7953"),
    specs: {
      boltDiameter: "35 mm",
      latchType: "Multipunto 3 pestillos",
      extra: "Certificación clase 3",
    },
  },
  {
    id: 7,
    name: "Caja fuerte empotrar 40 L",
    category: "cajas",
    brand: "VaultHome",
    price: 245000,
    image: img("photo-1635237393049-55046279ebb8"),
    specs: {
      extra: "Anclaje químico incluido · fuego 30 min",
      combinations: "Electrónica + llave de emergencia",
    },
  },
  {
    id: 8,
    name: "Caja fuerte ignífuga 60 L",
    category: "cajas",
    brand: "VaultHome",
    price: 389000,
    image: img("photo-1634979149798-e9a118734e93"),
    specs: {
      extra: "60 min fuego · sensor de inclinación",
      combinations: "Biométrica + teclado",
    },
  },
];

export function formatCentralPrice(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export function isCerrajeriaCentralSlug(slug: string): boolean {
  return slug === CERRAJERIA_CENTRAL_SLUG;
}

export function getKeyType(id: KeyTypeId) {
  return KEY_TYPES.find((k) => k.id === id)!;
}

export function quoteKeyCopies(typeId: KeyTypeId, copies: number): number {
  const t = getKeyType(typeId);
  return t.pricePerCopy * Math.max(1, copies);
}

export function calcCentralTotals(
  lines: CentralCartLine[],
  mode: CentralDeliveryMode,
): { subtotal: number; shipping: number; total: number } {
  const cfg = CERRAJERIA_CENTRAL_CONFIG;
  const subtotal = lines.reduce((s, l) => {
    if (l.kind === "product") return s + l.unitPrice * l.quantity;
    return s + l.unitPrice;
  }, 0);
  const hasProducts = lines.some((l) => l.kind === "product");
  let shipping = 0;
  if (lines.length > 0) {
    if (mode === "shipping" && hasProducts) shipping = cfg.shippingProduct;
    if (mode === "install") shipping = cfg.installFee;
  }
  return { subtotal, shipping, total: subtotal + shipping };
}

export function centralWhatsAppLink(message: string): string {
  return `https://wa.me/${CERRAJERIA_CENTRAL_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function centralCartWhatsApp(
  lines: CentralCartLine[],
  totals: ReturnType<typeof calcCentralTotals>,
  mode: CentralDeliveryMode,
): string {
  const cfg = CERRAJERIA_CENTRAL_CONFIG;
  const modeLabels: Record<CentralDeliveryMode, string> = {
    shipping: "Envío de productos",
    install: "Instalación a domicilio",
    pickup: "Retiro en taller",
  };

  let msg = `*PEDIDO ${cfg.brand}* 🔐\n\n`;
  lines.forEach((line) => {
    if (line.kind === "service") {
      msg += `*SERVICIO:* ${line.serviceLabel}\n`;
      msg += `   Tipo: ${line.keyTypeLabel}\n`;
      msg += `   Copias: ${line.copies}\n`;
      msg += `   ${formatCentralPrice(line.unitPrice)}\n\n`;
    } else {
      msg += `*${line.quantity}x* ${line.name}\n`;
      msg += `   Ficha: ${line.specs}\n`;
      msg += `   ${formatCentralPrice(line.unitPrice * line.quantity)}\n\n`;
    }
  });
  msg += `Subtotal: ${formatCentralPrice(totals.subtotal)}`;
  if (totals.shipping > 0) msg += `\n${modeLabels[mode]}: ${formatCentralPrice(totals.shipping)}`;
  msg += `\n*TOTAL: ${formatCentralPrice(totals.total)}*`;
  msg += `\n\n${modeLabels[mode]}`;
  msg += `\n\nConfirmar compatibilidad técnica antes de despacho.`;
  return centralWhatsAppLink(msg);
}

export function formatProductSpecs(p: SecurityProduct): string {
  const parts: string[] = [];
  if (p.specs.boltDiameter) parts.push(`Perno ${p.specs.boltDiameter}`);
  if (p.specs.latchType) parts.push(p.specs.latchType);
  if (p.specs.combinations) parts.push(p.specs.combinations);
  if (p.specs.extra) parts.push(p.specs.extra);
  return parts.join(" · ");
}
