/** Aromas KyM — Editorial apothecary e-commerce demo.
 *  Channeling Aesop / Le Labo / Diptyque / Buly 1803.
 *  Reference site: aromaskym.com.ar (TiendaNube template — replace with editorial 10x).
 */

export const AROMAS_KYM_SLUG = "aromas-kym";

export type AKCategoryId = "velas" | "sahumerios" | "difusores" | "esencias" | "insumos";
export type AKAromaFamily = "citricos" | "florales" | "amaderados" | "dulces";

export type AKCategory = {
  id: AKCategoryId;
  label: string;
  blurb: string;
  count: number;
  image: string;
};

export type AKProduct = {
  id: number;
  name: string;
  category: AKCategoryId;
  family: AKAromaFamily;
  price: number;
  image: string;
  note: string;
  notesShort: string;
  format: string;
  badge?: string;
};

export type AKCartItem = AKProduct & { quantity: number };

export const AROMAS_KYM_CONFIG = {
  slug: AROMAS_KYM_SLUG,
  brand: "Aromas KyM",
  tagline: "Esencias, ceras y rituales para tu casa.",
  showroom: "Showroom · Spegazzini, Buenos Aires",
  shippingFee: 2400,
  values: [
    "Cera de soja 100%",
    "Mecha de algodón",
    "Envíos 48 h GBA",
    "Hecho a mano",
  ],
} as const;

// Cosmetic: Unsplash botanical & candle photo IDs
const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const AK_CATEGORIES: AKCategory[] = [
  {
    id: "velas",
    label: "Velas",
    blurb: "Cera de soja vertida en frasco de vidrio reutilizable.",
    count: 14,
    image: img("photo-1602874801006-e26a4b5c8c0a"),
  },
  {
    id: "sahumerios",
    label: "Sahumerios",
    blurb: "Hierbas y resinas atadas a mano · sahumadores ancestrales.",
    count: 9,
    image: img("photo-1602178141046-cd5832c6ee6f"),
  },
  {
    id: "difusores",
    label: "Difusores",
    blurb: "Aceites esenciales con varillas de ratán para una difusión sostenida.",
    count: 8,
    image: img("photo-1608571423902-eed4a5ad8108"),
  },
  {
    id: "esencias",
    label: "Esencias",
    blurb: "Aceites puros e hidrolatos — la materia prima del ritual.",
    count: 22,
    image: img("photo-1611243705534-58b06b8c4029"),
  },
  {
    id: "insumos",
    label: "Insumos",
    blurb: "Cera, mechas, pabilos, frascos y todo lo necesario para crear.",
    count: 31,
    image: img("photo-1582719471384-894fbb16e074"),
  },
];

export const AK_FAMILIES: { id: AKAromaFamily | "all"; label: string }[] = [
  { id: "all", label: "Todas las familias" },
  { id: "citricos", label: "Cítricos" },
  { id: "florales", label: "Florales" },
  { id: "amaderados", label: "Amaderados" },
  { id: "dulces", label: "Dulces" },
];

export const AK_PRODUCTS: AKProduct[] = [
  {
    id: 1,
    name: "Vela de Soja · Bergamota & Cedro",
    category: "velas",
    family: "amaderados",
    price: 14800,
    image: img("photo-1602874801006-e26a4b5c8c0a"),
    note: "Una calma de madera tibia, abierta por la frescura cítrica de la bergamota calabresa.",
    notesShort: "60 h de quemado · 200 g",
    format: "Frasco vidrio 200 ml",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Vela de Soja · Lavanda de Provenza",
    category: "velas",
    family: "florales",
    price: 13200,
    image: img("photo-1603006905003-be475563bc59"),
    note: "Camp de lavanda al atardecer. Floral, herbal, sedante. Para el cuarto al final del día.",
    notesShort: "55 h de quemado · 180 g",
    format: "Frasco vidrio 180 ml",
  },
  {
    id: 3,
    name: "Vela de Soja · Higo & Hojas Verdes",
    category: "velas",
    family: "dulces",
    price: 14800,
    image: img("photo-1599751449128-eb7249c3d6b1"),
    note: "Higo maduro, leche de almendras y hojas recién cortadas. Veranos en el jardín del sur.",
    notesShort: "60 h de quemado · 200 g",
    format: "Frasco vidrio 200 ml",
    badge: "Nuevo",
  },
  {
    id: 4,
    name: "Sahumerio · Palo Santo + Romero",
    category: "sahumerios",
    family: "amaderados",
    price: 4800,
    image: img("photo-1602178141046-cd5832c6ee6f"),
    note: "Atado a mano con palo santo certificado de Loja y romero serrano del valle de Calamuchita.",
    notesShort: "Atado 10 cm · 4 piezas",
    format: "Caja kraft x 4",
  },
  {
    id: 5,
    name: "Sahumerio · Lavanda + Salvia",
    category: "sahumerios",
    family: "florales",
    price: 4600,
    image: img("photo-1599751449128-eb7249c3d6b1"),
    note: "Lavanda silvestre y salvia blanca para purificar el ambiente antes de meditar o dormir.",
    notesShort: "Atado 10 cm · 3 piezas",
    format: "Caja kraft x 3",
  },
  {
    id: 6,
    name: "Difusor · Linen & Cashmere",
    category: "difusores",
    family: "amaderados",
    price: 19800,
    image: img("photo-1608571423902-eed4a5ad8108"),
    note: "Tela recién lavada al sol, cachemira y un cierre de ámbar gris. Pensado para el living.",
    notesShort: "4 meses · 8 varillas",
    format: "Frasco vidrio 250 ml",
    badge: "Lo más pedido",
  },
  {
    id: 7,
    name: "Difusor · Limón Siciliano",
    category: "difusores",
    family: "citricos",
    price: 18400,
    image: img("photo-1611243705534-58b06b8c4029"),
    note: "Cítrico nítido con un fondo de menta verde. Despierta los espacios chicos.",
    notesShort: "4 meses · 8 varillas",
    format: "Frasco vidrio 250 ml",
  },
  {
    id: 8,
    name: "Home Spray · Lluvia de Verano",
    category: "difusores",
    family: "florales",
    price: 8900,
    image: img("photo-1620916566256-32de63bd24fa"),
    note: "Tierra mojada, jazmín nocturno y un aire de petricor. Una niebla para refrescar al instante.",
    notesShort: "200 ml · spray fino",
    format: "Frasco vidrio 200 ml",
  },
  {
    id: 9,
    name: "Esencia · Bergamota Italiana",
    category: "esencias",
    family: "citricos",
    price: 6800,
    image: img("photo-1611243705534-58b06b8c4029"),
    note: "Aceite esencial puro destilado al vapor. Para sumar al humidificador o crear tu propia mezcla.",
    notesShort: "30 ml · 100% puro",
    format: "Frasco ámbar 30 ml",
  },
  {
    id: 10,
    name: "Esencia · Lavanda Mailette",
    category: "esencias",
    family: "florales",
    price: 6400,
    image: img("photo-1603006905003-be475563bc59"),
    note: "Variedad clásica de Provenza, destilación lenta. Floral, herbal, profundamente sedante.",
    notesShort: "30 ml · 100% puro",
    format: "Frasco ámbar 30 ml",
  },
  {
    id: 11,
    name: "Esencia · Sándalo Mysore",
    category: "esencias",
    family: "amaderados",
    price: 12800,
    image: img("photo-1582719471384-894fbb16e074"),
    note: "Madera profunda y lechosa. El acorde de fondo del ritual nocturno por excelencia.",
    notesShort: "15 ml · 100% puro",
    format: "Frasco ámbar 15 ml",
    badge: "Edición limitada",
  },
  {
    id: 12,
    name: "Esencia · Vainilla de Madagascar",
    category: "esencias",
    family: "dulces",
    price: 9400,
    image: img("photo-1599751449128-eb7249c3d6b1"),
    note: "Vainilla cremosa de la isla. Para cierres dulces, gourmand y reconfortantes.",
    notesShort: "30 ml · 100% puro",
    format: "Frasco ámbar 30 ml",
  },
  {
    id: 13,
    name: "Cera de Soja · Pellets",
    category: "insumos",
    family: "amaderados",
    price: 5400,
    image: img("photo-1582719471384-894fbb16e074"),
    note: "Cera vegetal 100% soja, sin parafina ni OGM. Punto de fusión bajo, quemado limpio.",
    notesShort: "500 g · pellets",
    format: "Bolsa kraft 500 g",
  },
  {
    id: 14,
    name: "Mechas de Algodón Pre-enceradas",
    category: "insumos",
    family: "amaderados",
    price: 2800,
    image: img("photo-1602874801006-e26a4b5c8c0a"),
    note: "Algodón trenzado libre de plomo, pre-enceradas. Tres tamaños para distintos diámetros.",
    notesShort: "Pack x 25 · 10 cm",
    format: "Pack x 25",
  },
  {
    id: 15,
    name: "Frascos Vidrio Apothecary",
    category: "insumos",
    family: "amaderados",
    price: 6200,
    image: img("photo-1608571423902-eed4a5ad8108"),
    note: "Vidrio templado de calidad farmacéutica. Listos para verter cera tibia.",
    notesShort: "Set x 6 · 200 ml",
    format: "Set x 6 unidades",
  },
  {
    id: 16,
    name: "Hidrolato de Rosa Damascena",
    category: "esencias",
    family: "florales",
    price: 7800,
    image: img("photo-1611243705534-58b06b8c4029"),
    note: "Agua floral destilada de pétalos frescos. Tónico, perfume sutil, base de cosmética.",
    notesShort: "100 ml · destilado a vapor",
    format: "Frasco vidrio 100 ml",
  },
  {
    id: 17,
    name: "Vela de Soja · Café & Cardamomo",
    category: "velas",
    family: "dulces",
    price: 14800,
    image: img("photo-1602874801006-e26a4b5c8c0a"),
    note: "Café tostado al alba con un giro de cardamomo verde. Para mañanas lentas de domingo.",
    notesShort: "60 h de quemado · 200 g",
    format: "Frasco vidrio 200 ml",
  },
  {
    id: 18,
    name: "Sahumerio · Eucaliptus + Menta",
    category: "sahumerios",
    family: "citricos",
    price: 4400,
    image: img("photo-1602178141046-cd5832c6ee6f"),
    note: "Eucaliptus medicinal y menta peperina. Despeja el ambiente y aclara la cabeza.",
    notesShort: "Atado 10 cm · 3 piezas",
    format: "Caja kraft x 3",
  },
];

// 6 featured for bento layout
export const AK_FEATURED_IDS = [1, 6, 11, 3, 5, 9] as const;

// 3-step storytelling
export const AK_STORYTELLING = [
  {
    step: "i.",
    title: "Cera y mecha.",
    text: "Derretimos cera de soja a 80°C en baño maría. La mecha de algodón, centrada con una pinza, anclada al fondo del frasco con un punto de cera previa.",
  },
  {
    step: "ii.",
    title: "Fragancia y reposo.",
    text: "A los 65°C sumamos la fragancia — siempre por debajo del 10% del peso total. Mezclamos sesenta segundos en un sentido, sesenta en el otro. Vertemos. Esperamos.",
  },
  {
    step: "iii.",
    title: "Curado de 14 días.",
    text: "La vela necesita reposo. Catorce días en lugar fresco y oscuro para que la cera asiente y la fragancia se integre. Recién entonces sale al ritual.",
  },
] as const;

export function formatAKPrice(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export function isAromasKymSlug(slug: string): boolean {
  return slug === AROMAS_KYM_SLUG;
}

export function getAKProduct(id: number): AKProduct | undefined {
  return AK_PRODUCTS.find((p) => p.id === id);
}
