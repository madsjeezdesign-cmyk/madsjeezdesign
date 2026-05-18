/** Luna Petit & Co. — lujo infantil premium demo */

export const LUNA_PETIT_CO_SLUG = "luna-petit-co";

export type LunaCategoryId = "bebes" | "ninas" | "ninos" | "new" | "essentials";

export type LunaProduct = {
  id: number;
  name: string;
  category: LunaCategoryId;
  price: number;
  compareAt?: number;
  image: string;
  imageHover: string;
  sizes: string[];
  colors: { id: string; name: string; hex: string }[];
  badge?: "new" | "bestseller";
  featured?: "large" | "wide" | "tall";
};

export type LunaCartItem = LunaProduct & {
  key: string;
  size: string;
  colorId: string;
  quantity: number;
};

export const LUNA_CATEGORIES: {
  id: LunaCategoryId;
  title: string;
  subtitle: string;
  image: string;
  gradient: string;
}[] = [
  {
    id: "bebes",
    title: "Bebés",
    subtitle: "0–24 meses · algodón orgánico",
    image: img("photo-1515488042361-ee00e0ddd4e4"),
    gradient: "from-rose-100/80 to-[#F8F6F2]",
  },
  {
    id: "ninas",
    title: "Niñas",
    subtitle: "Vestidos y sets delicados",
    image: img("photo-1612423284934-2850a4ea6b0f"),
    gradient: "from-sky-100/60 to-[#F8F6F2]",
  },
  {
    id: "ninos",
    title: "Niños",
    subtitle: "Confort y estilo atemporal",
    image: img("photo-1546213290-e1b492ab3eee"),
    gradient: "from-stone-200/50 to-[#F8F6F2]",
  },
  {
    id: "new",
    title: "New Collection",
    subtitle: "Otoño · edición limitada",
    image: img("photo-1567958451986-2de427a4a0be"),
    gradient: "from-amber-50/80 to-[#F8F6F2]",
  },
  {
    id: "essentials",
    title: "Premium Essentials",
    subtitle: "Básicos de lujo diario",
    image: img("photo-1573879500655-98f2012dd1db"),
    gradient: "from-neutral-100/80 to-[#F8F6F2]",
  },
];

export const LUNA_PETIT_CO_CONFIG = {
  slug: LUNA_PETIT_CO_SLUG,
  brand: "Luna Petit & Co.",
  tagline: "Lujo suave para los primeros años",
  whatsapp: "5491123458888",
  freeShippingFrom: 85000,
  addressLines: ["Showroom · Av. Mitre 220", "Carlos Spegazzini, Ezeiza"],
  hours: "Mar–Sáb 10:00 – 19:00 · asesoría de talles con cita",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Carlos+Spegazzini,+Ezeiza&t=&z=14&ie=UTF8&iwloc=&output=embed",
  heroImage: img("photo-1515488042361-ee00e0ddd4e4", 2000),
} as const;

function img(id: string, w = 800) {
  return `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;
}

export const LUNA_PRODUCTS: LunaProduct[] = [
  {
    id: 1,
    name: "Body algodón orgánico",
    category: "bebes",
    price: 18900,
    image: img("photo-1573879500655-98f2012dd1db"),
    imageHover: img("photo-1567958451986-2de427a4a0be"),
    sizes: ["RN", "3M", "6M", "12M"],
    colors: [
      { id: "crema", name: "Crema", hex: "#F8F6F2" },
      { id: "rosa", name: "Rosa empolvado", hex: "#E8D5D0" },
    ],
    badge: "bestseller",
    featured: "large",
  },
  {
    id: 2,
    name: "Set recién nacido gift",
    category: "bebes",
    price: 45800,
    compareAt: 52000,
    image: img("photo-1515488042361-ee00e0ddd4e4"),
    imageHover: img("photo-1573879500655-98f2012dd1db"),
    sizes: ["RN", "3M"],
    colors: [{ id: "natural", name: "Natural", hex: "#EDE8E0" }],
    badge: "new",
    featured: "wide",
  },
  {
    id: 3,
    name: "Vestido tul bordado",
    category: "ninas",
    price: 38900,
    image: img("photo-1612423284934-2850a4ea6b0f"),
    imageHover: img("photo-1567958451986-2de427a4a0be"),
    sizes: ["2", "4", "6", "8"],
    colors: [
      { id: "blush", name: "Blush", hex: "#E8C4C0" },
      { id: "ivory", name: "Ivory", hex: "#FAF7F2" },
    ],
    featured: "tall",
  },
  {
    id: 4,
    name: "Cardigan cachemira kids",
    category: "ninas",
    price: 52400,
    image: img("photo-1567958451986-2de427a4a0be"),
    imageHover: img("photo-1612423284934-2850a4ea6b0f"),
    sizes: ["4", "6", "8", "10"],
    colors: [{ id: "stone", name: "Piedra", hex: "#C4B8AE" }],
    badge: "new",
  },
  {
    id: 5,
    name: "Pantalón jogger premium",
    category: "ninos",
    price: 24800,
    image: img("photo-1546213290-e1b492ab3eee"),
    imageHover: img("photo-1612423284934-2850a4ea6b0f"),
    sizes: ["4", "6", "8", "10", "12"],
    colors: [
      { id: "gris", name: "Gris suave", hex: "#9CA3AF" },
      { id: "navy", name: "Marino", hex: "#3D4F5F" },
    ],
  },
  {
    id: 6,
    name: "Camisa lino editorial",
    category: "ninos",
    price: 31200,
    image: img("photo-1546213290-e1b492ab3eee"),
    imageHover: img("photo-1515488042361-ee00e0ddd4e4"),
    sizes: ["6", "8", "10", "12"],
    colors: [{ id: "blanco", name: "Blanco", hex: "#FAFAF8" }],
    badge: "bestseller",
  },
  {
    id: 7,
    name: "Abrigo lana merino",
    category: "new",
    price: 78900,
    compareAt: 89000,
    image: img("photo-1567958451986-2de427a4a0be"),
    imageHover: img("photo-1573879500655-98f2012dd1db"),
    sizes: ["12M", "18M", "2", "4"],
    colors: [{ id: "camel", name: "Camel", hex: "#C4A574" }],
    badge: "new",
    featured: "large",
  },
  {
    id: 8,
    name: "Pijama satén kids",
    category: "essentials",
    price: 35600,
    image: img("photo-1573879500655-98f2012dd1db"),
    imageHover: img("photo-1515488042361-ee00e0ddd4e4"),
    sizes: ["2", "4", "6", "8"],
    colors: [
      { id: "sky", name: "Celeste", hex: "#C5D9E8" },
      { id: "cream", name: "Crema", hex: "#F5F0E8" },
    ],
  },
  {
    id: 9,
    name: "Pack bodies x3",
    category: "essentials",
    price: 42900,
    image: img("photo-1515488042361-ee00e0ddd4e4"),
    imageHover: img("photo-1573879500655-98f2012dd1db"),
    sizes: ["RN", "3M", "6M"],
    colors: [{ id: "mix", name: "Surtido", hex: "#E8E0D8" }],
    featured: "wide",
  },
  {
    id: 10,
    name: "Zapatillas cuero suave",
    category: "bebes",
    price: 38500,
    image: img("photo-1612423284934-2850a4ea6b0f"),
    imageHover: img("photo-1515488042361-ee00e0ddd4e4"),
    sizes: ["18", "19", "20", "21"],
    colors: [{ id: "sand", name: "Arena", hex: "#D4C4B0" }],
  },
];

export const LUNA_TESTIMONIALS = [
  { name: "Valentina M.", text: "La calidad del algodón es increíble. Se siente boutique parisina.", rating: 5 },
  { name: "Lucía R.", text: "Envío discreto y empaque precioso. Mi bebé luce como en un editorial.", rating: 5 },
  { name: "Carolina S.", text: "Los talles son exactos. Por fin una marca que entiende curvas de crecimiento.", rating: 5 },
  { name: "Mariana P.", text: "El vestido de tul es una obra de arte. Vale cada peso.", rating: 5 },
];

export function formatLunaPrice(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export function isLunaPetitCoSlug(slug: string): boolean {
  return slug === LUNA_PETIT_CO_SLUG;
}

export function getLunaProduct(id: number): LunaProduct | undefined {
  return LUNA_PRODUCTS.find((p) => p.id === id);
}
