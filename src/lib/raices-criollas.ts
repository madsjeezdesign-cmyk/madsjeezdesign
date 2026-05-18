/** Raíces Criollas — pulpería premium y productos regionales demo */

export const RAICES_CRIOLLAS_SLUG = "raices-criollas";

export type RaicesCategoryId = "mates" | "cuchilleria" | "fiambres" | "marroquineria";

export type RaicesMaterialId = "alpaca" | "madera" | "ahumados";

export type RaicesProduct = {
  id: number;
  name: string;
  category: RaicesCategoryId;
  material: RaicesMaterialId;
  origin: string;
  description: string;
  price: number;
  image: string;
};

export type RaicesBoxSizeId = "mediana" | "premium";

export type RaicesBoxPick = {
  id: string;
  name: string;
  price: number;
  slots: number;
};

export type RaicesCartProductLine = {
  kind: "product";
  key: string;
  productId: number;
  name: string;
  origin: string;
  unitPrice: number;
  quantity: number;
};

export type RaicesCartBoxLine = {
  kind: "box";
  key: string;
  boxSizeId: RaicesBoxSizeId;
  boxLabel: string;
  items: RaicesBoxPick[];
  unitPrice: number;
  quantity: number;
};

export type RaicesCartLine = RaicesCartProductLine | RaicesCartBoxLine;

export type RaicesDeliveryMode = "nacional" | "express" | "pickup";

export const RAICES_CATEGORIES: { id: RaicesCategoryId | "all"; label: string }[] = [
  { id: "all", label: "Toda la pulpería" },
  { id: "mates", label: "Mates e Insumos" },
  { id: "cuchilleria", label: "Cuchillería Artesanal" },
  { id: "fiambres", label: "Fiambres & Quesos de Campo" },
  { id: "marroquineria", label: "Marroquinería (Cueros)" },
];

export const RAICES_MATERIALS: { id: RaicesMaterialId | "all"; label: string }[] = [
  { id: "all", label: "Todos los tipos" },
  { id: "alpaca", label: "Alpaca / Plata" },
  { id: "madera", label: "Madera Caldén / Algarrobo" },
  { id: "ahumados", label: "Ahumados y Madurados" },
];

export const RAICES_NAV_CATEGORIES = RAICES_CATEGORIES.filter((c) => c.id !== "all");

export const RAICES_BOX_SIZES: {
  id: RaicesBoxSizeId;
  label: string;
  subtitle: string;
  maxSlots: number;
  basePrice: number;
}[] = [
  { id: "mediana", label: "Caja Mediana", subtitle: "Hasta 4 piezas regionales", maxSlots: 4, basePrice: 8500 },
  { id: "premium", label: "Caja Premium", subtitle: "Hasta 6 piezas + moño artesanal", maxSlots: 6, basePrice: 12800 },
];

export const RAICES_CRIOLLAS_CONFIG = {
  slug: RAICES_CRIOLLAS_SLUG,
  brand: "Raíces Criollas",
  tagline: "Mates de autor · fiambres de campo · tradición argentina",
  topBanner: "Envíos premium a todo el país · Cuotas sin interés",
  whatsapp: "5491123457777",
  addressLines: ["Pulpería & Showroom · Av. Belgrano 890", "Carlos Spegazzini, Ezeiza"],
  hoursShowroom: "Mar–Sáb 10:00 – 20:00 · Dom 10:00 – 14:00",
  hoursAlmacen: "Despachos lun–vie hasta las 18:00",
  heroImage:
    "https://images.unsplash.com/photo-1619926096619-5956ab4dfb1b?q=80&w=2000&auto=format&fit=crop",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Carlos+Spegazzini,+Ezeiza&t=&z=14&ie=UTF8&iwloc=&output=embed",
  shipping: {
    nacional: 5200,
    express: 8900,
    pickup: 0,
  } as Record<RaicesDeliveryMode, number>,
} as const;

const img = (id: string, w = 700) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const RAICES_PRODUCTS: RaicesProduct[] = [
  {
    id: 1,
    name: "Mate calabaza virola alpaca",
    category: "mates",
    material: "alpaca",
    origin: "San Antonio de Areco",
    description: "Calabaza curada · virola grabada a mano",
    price: 48500,
    image: img("photo-1609525313344-a56b96f20718"),
  },
  {
    id: 2,
    name: "Termo Stanley 1L edición campo",
    category: "mates",
    material: "madera",
    origin: "Importado · curado local",
    description: "Mantiene temperatura 24 hs",
    price: 89200,
    image: img("photo-1624128082323-beb6b8b508db"),
  },
  {
    id: 3,
    name: "Bombilla chata alpaca 18 cm",
    category: "mates",
    material: "alpaca",
    origin: "Tandil",
    description: "Pico recto · diseño tradicional",
    price: 22400,
    image: img("photo-1646314230198-e27c375e1a2a"),
  },
  {
    id: 4,
    name: "Cuchillo criollo 14\" acero 440",
    category: "cuchilleria",
    material: "madera",
    origin: "Tandil",
    description: "Mango caldén · funda de cuero",
    price: 67800,
    image: img("photo-1549889450-0e0fb9c1d668"),
  },
  {
    id: 5,
    name: "Chaira y afilador set artesanal",
    category: "cuchilleria",
    material: "madera",
    origin: "Azul",
    description: "Para mantener filo de asador",
    price: 18900,
    image: img("photo-1679310249395-ae267ae0d273"),
  },
  {
    id: 6,
    name: "Salame tandilero ahumado",
    category: "fiambres",
    material: "ahumados",
    origin: "Tandil",
    description: "Curado 60 días · peso aprox. 400 g",
    price: 12800,
    image: img("photo-1673716575331-60b042589b8d"),
  },
  {
    id: 7,
    name: "Queso de campo semiduro",
    category: "fiambres",
    material: "ahumados",
    origin: "Tandil",
    description: "Horma 500 g · pasta compacta",
    price: 14200,
    image: img("photo-1681389158414-adf7f9583f24"),
  },
  {
    id: 8,
    name: "Bondiola braseada al horno de barro",
    category: "fiambres",
    material: "ahumados",
    origin: "Lobos",
    description: "Loncheada al momento",
    price: 16500,
    image: img("photo-1668401181398-a4bb0d62f124"),
  },
  {
    id: 9,
    name: "Faja de cuero repujado",
    category: "marroquineria",
    material: "madera",
    origin: "Areco",
    description: "Cuero vacuno · hebilla alpaca",
    price: 35600,
    image: img("photo-1543738066-49621e5b1f87"),
  },
  {
    id: 10,
    name: "Bolso matero cuero suela",
    category: "marroquineria",
    material: "madera",
    origin: "San Antonio de Areco",
    description: "Compartimento termo · forro lienzo",
    price: 52400,
    image: img("photo-1629385907123-0fda67d8f7ef"),
  },
  {
    id: 11,
    name: "Yerba premium campo sur",
    category: "mates",
    material: "ahumados",
    origin: "Misiones",
    description: "Selección sin palo · 1 kg",
    price: 6800,
    image: img("photo-1762207654337-73ccc93a80c4"),
  },
  {
    id: 12,
    name: "Tabla asado cuchillos x3",
    category: "cuchilleria",
    material: "madera",
    origin: "Tandil",
    description: "Madera algarrobo · incluye chaira",
    price: 94500,
    image: img("photo-1585166512582-d0bfcfc479ce"),
  },
];

export const RAICES_BOX_PICKS: RaicesBoxPick[] = [
  { id: "salame", name: "Salame tandilero", price: 12800, slots: 1 },
  { id: "queso", name: "Queso de campo", price: 14200, slots: 1 },
  { id: "bondiola", name: "Bondiola braseada", price: 16500, slots: 1 },
  { id: "escabeche", name: "Frasco escabeche mixto", price: 8900, slots: 1 },
  { id: "vino", name: "Malbec reserva 750 ml", price: 11200, slots: 2 },
  { id: "dulce", name: "Dulce de leche artesanal", price: 5600, slots: 1 },
  { id: "mermelada", name: "Mermelada de membrillo", price: 4800, slots: 1 },
  { id: "aceite", name: "Aceite de oliva serrano", price: 9200, slots: 1 },
];

export function formatRaicesPrice(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export function isRaicesCriollasSlug(slug: string): boolean {
  return slug === RAICES_CRIOLLAS_SLUG;
}

export function getRaicesBoxSize(id: RaicesBoxSizeId) {
  return RAICES_BOX_SIZES.find((b) => b.id === id)!;
}

export function calcBoxTotal(sizeId: RaicesBoxSizeId, picks: RaicesBoxPick[]): number {
  const size = getRaicesBoxSize(sizeId);
  return size.basePrice + picks.reduce((s, p) => s + p.price, 0);
}

export function calcBoxSlotsUsed(picks: RaicesBoxPick[]): number {
  return picks.reduce((s, p) => s + p.slots, 0);
}

export function calcRaicesTotals(
  lines: RaicesCartLine[],
  mode: RaicesDeliveryMode,
): { subtotal: number; shipping: number; total: number } {
  const cfg = RAICES_CRIOLLAS_CONFIG;
  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
  const shipping = lines.length > 0 ? cfg.shipping[mode] : 0;
  return { subtotal, shipping, total: subtotal + shipping };
}

export function raicesWhatsAppLink(message: string): string {
  return `https://wa.me/${RAICES_CRIOLLAS_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function raicesCartWhatsApp(
  lines: RaicesCartLine[],
  totals: { subtotal: number; shipping: number; total: number },
  mode: RaicesDeliveryMode,
): string {
  const cfg = RAICES_CRIOLLAS_CONFIG;
  const modeLabels: Record<RaicesDeliveryMode, string> = {
    nacional: "Envío nacional por correo",
    express: "Envío express flete/moto",
    pickup: "Retiro gratuito en local",
  };

  let msg = `*PEDIDO ${cfg.brand}* 🇦🇷\n\n`;
  lines.forEach((line) => {
    if (line.kind === "product") {
      msg += `*${line.quantity}x* ${line.name}\n`;
      msg += `   Origen: ${line.origin}\n`;
      msg += `   ${formatRaicesPrice(line.unitPrice * line.quantity)}\n`;
    } else {
      msg += `*${line.quantity}x* ${line.boxLabel}\n`;
      msg += `   ${line.items.map((i) => i.name).join(" · ")}\n`;
      msg += `   ${formatRaicesPrice(line.unitPrice * line.quantity)}\n`;
    }
  });
  msg += `\nSubtotal: ${formatRaicesPrice(totals.subtotal)}`;
  if (totals.shipping > 0) msg += `\nEnvío: ${formatRaicesPrice(totals.shipping)}`;
  msg += `\n*TOTAL: ${formatRaicesPrice(totals.total)}*`;
  msg += `\n\n${modeLabels[mode]}`;
  msg += `\n\nGracias — atención personalizada Raíces Criollas.`;
  return raicesWhatsAppLink(msg);
}
