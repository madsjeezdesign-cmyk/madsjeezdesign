/** Gelato & Co. — heladería artesanal premium demo */

export const GELATO_CO_SLUG = "gelato-co";

export type FlavorCategoryId = "chocolates" | "ddl" | "cremas" | "frutales";

export type GelatoSize = {
  id: string;
  label: string;
  subtitle: string;
  price: number;
  maxFlavors: number;
  image: string;
};

export type GelatoFlavor = {
  id: string;
  name: string;
  category: FlavorCategoryId;
  accent: string;
};

export type GelatoCartLine = {
  key: string;
  sizeId: string;
  sizeLabel: string;
  flavors: GelatoFlavor[];
  quantity: number;
  unitPrice: number;
};

export type DeliveryMode = "delivery" | "pickup";

export const FLAVOR_CATEGORIES: { id: FlavorCategoryId; label: string; accent: string }[] = [
  { id: "chocolates", label: "Chocolates", accent: "bg-amber-100 text-amber-900 border-amber-200" },
  { id: "ddl", label: "Dulces de Leche", accent: "bg-stone-200 text-stone-800 border-stone-300" },
  { id: "cremas", label: "Cremas", accent: "bg-rose-50 text-rose-900 border-rose-200" },
  { id: "frutales", label: "Frutales / Al Agua", accent: "bg-emerald-50 text-emerald-900 border-emerald-200" },
];

export const GELATO_CO_CONFIG = {
  slug: GELATO_CO_SLUG,
  brand: "Gelato & Co.",
  tagline: "Helado artesanal · cadena de frío · sabores de autor",
  isOpen: true,
  whatsapp: "5491123455555",
  addressLines: ["Av. San Martín 210", "Carlos Spegazzini, Ezeiza"],
  hoursWeek: "Lun–Mié 14:00 – 22:00",
  hoursPeak: "Jue–Dom y feriados 12:00 – 00:00 (pico tarde/noche)",
  deliveryFee: 2800,
  heroImage:
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=2000&auto=format&fit=crop",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Carlos+Spegazzini,+Ezeiza&t=&z=14&ie=UTF8&iwloc=&output=embed",
  mapsDirectionsUrl:
    "https://www.google.com/maps/search/?api=1&query=Carlos+Spegazzini,+Ezeiza",
} as const;

const img = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const GELATO_SIZES: GelatoSize[] = [
  {
    id: "1kg",
    label: "1 Kilo",
    subtitle: "Hasta 4 gustos",
    price: 18500,
    maxFlavors: 4,
    image: img("photo-1563805042-7684c019e1cb"),
  },
  {
    id: "half",
    label: "1/2 Kilo",
    subtitle: "Hasta 3 gustos",
    price: 11200,
    maxFlavors: 3,
    image: img("photo-1616046229478-9901c5536a45"),
  },
  {
    id: "quarter",
    label: "1/4 Kilo",
    subtitle: "Hasta 3 gustos",
    price: 6800,
    maxFlavors: 3,
    image: img("photo-1618220179428-22790b461013"),
  },
  {
    id: "cone",
    label: "Cucurucho Premium",
    subtitle: "Hasta 2 gustos",
    price: 4500,
    maxFlavors: 2,
    image: img("photo-1615873968403-89e068629265"),
  },
];

export const GELATO_FLAVORS: GelatoFlavor[] = [
  { id: "choc-amargo", name: "Chocolate Amargo", category: "chocolates", accent: "#78350f" },
  { id: "choc-blanco", name: "Chocolate Blanco", category: "chocolates", accent: "#d6d3d1" },
  { id: "choc-suizo", name: "Chocolate Suizo", category: "chocolates", accent: "#92400e" },
  { id: "ddl-clasico", name: "Dulce de Leche Clásico", category: "ddl", accent: "#a16207" },
  { id: "ddl-granizado", name: "Dulce de Leche Granizado", category: "ddl", accent: "#ca8a04" },
  { id: "ddl-coco", name: "DDL con Coco", category: "ddl", accent: "#eab308" },
  { id: "crema-vainilla", name: "Vainilla Bourbon", category: "cremas", accent: "#fef3c7" },
  { id: "tramontana", name: "Tramontana", category: "cremas", accent: "#fce7f3" },
  { id: "pistacho", name: "Pistacho Siciliano", category: "cremas", accent: "#86efac" },
  { id: "frutilla-crema", name: "Frutilla a la Crema", category: "frutales", accent: "#fda4af" },
  { id: "limon", name: "Limón al Agua", category: "frutales", accent: "#fef08a" },
  { id: "maracuya", name: "Maracuyá", category: "frutales", accent: "#fde047" },
  { id: "frambuesa", name: "Frambuesa", category: "frutales", accent: "#f9a8d4" },
];

export function formatGelatoPrice(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export function isGelatoCoSlug(slug: string): boolean {
  return slug === GELATO_CO_SLUG;
}

export function getGelatoSize(id: string): GelatoSize | undefined {
  return GELATO_SIZES.find((s) => s.id === id);
}

export function gelatoWhatsAppLink(message: string): string {
  return `https://wa.me/${GELATO_CO_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function gelatoCartWhatsApp(
  lines: GelatoCartLine[],
  totals: { subtotal: number; shipping: number; total: number },
  mode: DeliveryMode,
): string {
  const modeLabel =
    mode === "delivery"
      ? "Delivery Express (caja térmica)"
      : "Retiro por la sucursal";

  let msg = `*PEDIDO ${GELATO_CO_CONFIG.brand}* 🍨\n\n`;
  lines.forEach((line) => {
    const flavorNames = line.flavors.map((f) => f.name).join(", ");
    msg += `*${line.quantity}x* ${line.sizeLabel}\n`;
    msg += `   [${flavorNames}]\n`;
    msg += `   ${formatGelatoPrice(line.unitPrice * line.quantity)}\n`;
  });
  msg += `\nSubtotal: ${formatGelatoPrice(totals.subtotal)}`;
  if (mode === "delivery") msg += `\nEnvío: ${formatGelatoPrice(totals.shipping)}`;
  msg += `\n*TOTAL: ${formatGelatoPrice(totals.total)}*`;
  msg += `\n\n${modeLabel}`;
  msg += `\n\nConfirmar cadena de frío. ¡Gracias!`;
  return gelatoWhatsAppLink(msg);
}

export function calcGelatoTotals(
  lines: GelatoCartLine[],
  mode: DeliveryMode,
): { subtotal: number; shipping: number; total: number } {
  const cfg = GELATO_CO_CONFIG;
  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
  const shipping = lines.length > 0 && mode === "delivery" ? cfg.deliveryFee : 0;
  return { subtotal, shipping, total: subtotal + shipping };
}
