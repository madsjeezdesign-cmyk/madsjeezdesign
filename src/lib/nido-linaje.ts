/** Nido & Linaje | Home Textiles — blanquería premium demo */

export const NIDO_LINAJE_SLUG = "nido-linaje";

export type LinajeCategoryId = "cama" | "bano" | "aromas";

export type LinajeSizeId = "twin" | "queen" | "king" | "super";

export type LinajeColorId = "white" | "sand" | "pearl" | "olive";

export type LinajeSize = {
  id: LinajeSizeId;
  label: string;
  priceFactor: number;
};

export type LinajeColor = {
  id: LinajeColorId;
  label: string;
  hex: string;
};

export type LinajeProduct = {
  id: number;
  name: string;
  basePrice: number;
  category: LinajeCategoryId;
  image: string;
  tagline: string;
  composition: string;
  details: string[];
  badge?: string;
};

export type LinajeCartItem = LinajeProduct & {
  key: string;
  size: LinajeSize;
  color: LinajeColor;
  unitPrice: number;
  quantity: number;
};

export const LINAJE_CATEGORIES: { id: LinajeCategoryId | "all"; label: string }[] = [
  { id: "all", label: "Todas las colecciones" },
  { id: "cama", label: "Línea Cama" },
  { id: "bano", label: "Línea Baño" },
  { id: "aromas", label: "Aromas & Complementos" },
];

export const LINAJE_SIZES: LinajeSize[] = [
  { id: "twin", label: "Twin", priceFactor: 1 },
  { id: "queen", label: "Queen", priceFactor: 1.15 },
  { id: "king", label: "King", priceFactor: 1.28 },
  { id: "super", label: "Super King", priceFactor: 1.42 },
];

export const LINAJE_COLORS: LinajeColor[] = [
  { id: "white", label: "Blanco Puro", hex: "#FAFAF8" },
  { id: "sand", label: "Arena", hex: "#D4C4A8" },
  { id: "pearl", label: "Gris Perla", hex: "#B8B5B0" },
  { id: "olive", label: "Verde Oliva", hex: "#8A8B73" },
];

export const NIDO_LINAJE_CONFIG = {
  slug: NIDO_LINAJE_SLUG,
  brand: "Nido & Linaje",
  brandSub: "Home Textiles",
  tagline: "El arte del descanso, tejido en percal de autor",
  shippingFee: 4500,
  ticker: [
    "Envíos premium a todo el país",
    "12 cuotas sin interés en colecciones seleccionadas",
    "Empaque de regalo sin cargo en compras superiores a $180.000",
    "Garantía de suavidad por 365 noches",
  ],
  heroSlides: [
    {
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2000&auto=format&fit=crop",
      title: "Lino europeo lavado",
      subtitle: "Transpirabilidad y caída natural",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522771739844-6a9f47ddef43?q=80&w=2000&auto=format&fit=crop",
      title: "Sábanas de algodón egipcio",
      subtitle: "600 hilos · tacto sedoso",
    },
    {
      image:
        "https://images.unsplash.com/photo-1616628182501-68f1f9c5d833?q=80&w=2000&auto=format&fit=crop",
      title: "Camas perfectamente tendidas",
      subtitle: "Colección Couture Otoño",
    },
  ],
} as const;

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const LINAJE_PRODUCTS: LinajeProduct[] = [
  {
    id: 1,
    name: "Juego de Sábanas Percal Supremo",
    basePrice: 189000,
    category: "cama",
    image: img("photo-1631049307264-da0ec9d70304"),
    tagline: "Suavidad de hotel cinco estrellas en tu hogar",
    composition: "Algodón Egipcio de 600 hilos · Percal long-staple",
    details: ["Costuras francesas", "Bolsillo profundo 40 cm", "Pre-lavado sin encogimiento"],
    badge: "Signature",
  },
  {
    id: 2,
    name: "Edredón Plumón Europeo",
    basePrice: 425000,
    category: "cama",
    image: img("photo-1615874959474-d609969a20ed"),
    tagline: "Relleno hipoalergénico · cubierta de seda natural",
    composition: "Plumón 90/10 certificado RDS · Funda 100% algodón satinado",
    details: ["Cámara de aire termorregulada", "Lavable en seco", "Funda interior incluida"],
  },
  {
    id: 3,
    name: "Funda Nórdica Lino Lavado",
    basePrice: 156000,
    category: "cama",
    image: img("photo-1522771739844-6a9f47ddef43"),
    tagline: "Lino europeo de primera selección",
    composition: "Lino lavado europeo de primera selección · 160 GSM",
    details: ["Textura lived-in", "Transpirable todo el año", "Botones de nácar"],
  },
  {
    id: 4,
    name: "Almohada Memory Cloud",
    basePrice: 89000,
    category: "cama",
    image: img("photo-1631889993959-d71b9654a9cd"),
    tagline: "Soporte cervical ergonómico",
    composition: "Espuma viscoelástica certificada CertiPUR · Funda bambú",
    details: ["Altura ajustable", "Funda desmontable", "Hipoalergénica"],
  },
  {
    id: 5,
    name: "Toalla Spa Supima",
    basePrice: 42000,
    category: "bano",
    image: img("photo-1620626011761-996317578b04"),
    tagline: "Gramaje 800 GSM · absorción instantánea",
    composition: "Algodón Supima 100% · Ribete satinado",
    details: ["Secado rápido", "Doble felpa", "Hecho en Portugal"],
    badge: "Best Seller",
  },
  {
    id: 6,
    name: "Set Toalla + Alfombra",
    basePrice: 118000,
    category: "bano",
    image: img("photo-1583847268969-b28ff8f12287"),
    tagline: "Experiencia spa en suite",
    composition: "Algodón orgánico GOTS · Tintes naturales",
    details: ["Incluye 2 toallas + 1 alfombra", "Packaging de regalo", "Antibacterial natural"],
  },
  {
    id: 7,
    name: "Bata de Felpa Premium",
    basePrice: 134000,
    category: "bano",
    image: img("photo-1616628182501-68f1f9c5d833"),
    tagline: "Caída fluida · cinturón de satén",
    composition: "Microfibra premium · Forro de algodón",
    details: ["Bolsillos profundos", "Tallas unisex", "Lavado delicado"],
  },
  {
    id: 8,
    name: "Difusor Linen & Cashmere",
    basePrice: 38000,
    category: "aromas",
    image: img("photo-1608571423902-eed4a5ad8108"),
    tagline: "Notas de lino, cachemira y ámbar gris",
    composition: "Aceites esenciales de Grasse · Varillas de ratán",
    details: ["Duración 4 meses", "Frasco de vidrio reciclado", "Sin parabenos"],
  },
  {
    id: 9,
    name: "Vela Soja Artesanal",
    basePrice: 24000,
    category: "aromas",
    image: img("photo-1603006905003-9fa55f0c4c0e"),
    tagline: "Cera de soja orgánica · mecha de algodón",
    composition: "Cera de soja certificada · Fragancia de autor",
    details: ["50 hs de combustión", "Recipiente reutilizable", "Hecha a mano"],
  },
  {
    id: 10,
    name: "Spray Almohada Sueño Profundo",
    basePrice: 18500,
    category: "aromas",
    image: img("photo-1608571423902-eed4a5ad8108"),
    tagline: "Lavanda de Provenza y cedro blanco",
    composition: "Agua floral destilada · Aceites puros",
    details: ["100 ml", "Apto para niños", "Vegano"],
  },
];

export function formatLinajePrice(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export function getLinajeUnitPrice(basePrice: number, size: LinajeSize): number {
  return Math.round(basePrice * size.priceFactor);
}

export function isNidoLinajeSlug(slug: string): boolean {
  return slug === NIDO_LINAJE_SLUG;
}

export function getLinajeProduct(id: number): LinajeProduct | undefined {
  return LINAJE_PRODUCTS.find((p) => p.id === id);
}

export function buildCartKey(productId: number, sizeId: string, colorId: string): string {
  return `${productId}-${sizeId}-${colorId}`;
}
