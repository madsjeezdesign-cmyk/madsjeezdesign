/** Showroom Andrea Mari — moda vibrante, talles reales (Ezeiza). */

export const ANDREA_MARI_SLUG = "moda-andrea-mari";

export type AndreaMariProduct = {
  id: number;
  name: string;
  price: number;
  category: string;
  sizes: string[];
  image: string;
  badge?: string;
  isNew?: boolean;
};

export type AndreaMariIgPost = {
  code: string;
  postUrl: string;
  image: string;
  alt: string;
};

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`;

export const ANDREA_MARI_CONFIG = {
  slug: ANDREA_MARI_SLUG,
  brandLine1: "SHOWROOM",
  brandLine2: "Andrea Mari",
  tagline: "Moda vibrante en talles reales · Ezeiza",
  instagramHandle: "showroom_andreamari",
  instagramUrl: "https://www.instagram.com/showroom_andreamari/",
  whatsapp: "5491112345678",
  whatsappMessage:
    "¡Hola Showroom Andrea Mari! 💖 Vengo desde su web y quiero consultar por prendas en mi talle.",
  phoneDisplay: "Consultar por WhatsApp",
  addressLines: ["Showroom Andrea Mari", "Ezeiza, Buenos Aires", "Argentina"],
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3275.4053748882583!2d-58.5244127!3d-34.8503777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccbee8d83a9a7%3A0x2332ecef7525f8b8!2sShowroom%20Andrea%20Mari!5e0!3m2!1ses-419!2sar!4v1716000000000!5m2!1ses-419!2sar",
  heroImage: img("photo-1573081156886-068d876bc85a", 1920),
  aboutImage: img("photo-1605518216938-7c31b7b14ad0", 1000),
  categoryColores: img("photo-1618932260643-eee4a2f652a6"),
  categoryComodidad: img("photo-1554412933-514a83d2f3c8"),
  marqueeItems: [
    "LA BELLEZA NO TIENE TALLE",
    "CURVA COMPLETA",
    "TALLES REALES",
    "SIENTETE PODEROSA",
    "ENVÍOS A TODO EL PAÍS",
  ],
} as const;

export const ANDREA_MARI_PRODUCTS: AndreaMariProduct[] = [
  {
    id: 1,
    name: "Blusa Magenta Plisada",
    price: 28500,
    category: "Blusas",
    sizes: ["46", "48", "50", "52", "54", "56"],
    image: img("photo-1618932260643-eee4a2f652a6", 600),
    badge: "Fuego 🔥",
    isNew: true,
  },
  {
    id: 2,
    name: "Maxi Vestido Esmeralda",
    price: 45000,
    category: "Vestidos",
    sizes: ["48", "50", "52", "54", "58"],
    image: img("photo-1612336307429-8a898d10e223", 600),
    badge: "Nuevo",
    isNew: true,
  },
  {
    id: 3,
    name: "Camisa Mostaza Oversize",
    price: 31900,
    category: "Camisas",
    sizes: ["XL", "XXL", "3XL", "4XL"],
    image: img("photo-1554412933-514a83d2f3c8", 600),
  },
  {
    id: 4,
    name: "Pantalón Sastrero Rubí",
    price: 36000,
    category: "Pantalones",
    sizes: ["48", "50", "52", "54", "56", "60"],
    image: img("photo-1584273143981-41c073dfe8f8", 600),
    badge: "Más vendido",
    isNew: true,
  },
  {
    id: 5,
    name: "Remera Básica Algodón",
    price: 18000,
    category: "Remeras",
    sizes: ["L", "XL", "XXL", "3XL", "4XL", "5XL"],
    image: img("photo-1525507119028-ed4c629a60a3", 600),
  },
  {
    id: 6,
    name: "Jean Wide Leg Clásico",
    price: 42000,
    category: "Jeans",
    sizes: ["46", "48", "50", "52", "54", "56"],
    image: img("photo-1516762689617-e1cffcef479d", 600),
  },
  {
    id: 7,
    name: "Kimono Estampado Floral",
    price: 34000,
    category: "Abrigos",
    sizes: ["Único amplio (hasta 5XL)"],
    image: img("photo-1564257631407-4deec1c99aaf", 600),
    badge: "Premium",
    isNew: true,
  },
  {
    id: 8,
    name: "Sweater Tejido Naranja",
    price: 39000,
    category: "Abrigos",
    sizes: ["XL", "XXL", "3XL"],
    image: img("photo-1608228068998-c6f966144e05", 600),
  },
];

/** Feed Instagram — enlaces reales; imágenes editoriales hasta cargar CDN/local. */
export const ANDREA_MARI_INSTAGRAM: AndreaMariIgPost[] = [
  {
    code: "DXur_8_FgPQ",
    postUrl: "https://www.instagram.com/showroom_andreamari/p/DXur_8_FgPQ/",
    image: img("photo-1572804013307-27b4c0459515", 600),
    alt: "Look colorido Andrea Mari",
  },
  {
    code: "DXurftaFlEW",
    postUrl: "https://www.instagram.com/showroom_andreamari/p/DXurftaFlEW/",
    image: img("photo-1485230891167-1ddfc6a23c2b", 600),
    alt: "Conjunto curva completa",
  },
  {
    code: "DXurA7rFv9k",
    postUrl: "https://www.instagram.com/showroom_andreamari/p/DXurA7rFv9k/",
    image: img("photo-1469334031218-e382a71b716b", 600),
    alt: "Blusa vibrante",
  },
  {
    code: "DXuqnCDFofV",
    postUrl: "https://www.instagram.com/showroom_andreamari/p/DXuqnCDFofV/",
    image: img("photo-1515886657613-9f3515b0c78f", 600),
    alt: "Estilo empoderado",
  },
  {
    code: "DXuqDgTlgvK",
    postUrl: "https://www.instagram.com/showroom_andreamari/p/DXuqDgTlgvK/",
    image: img("photo-1539109136881-856bedc96a2b", 600),
    alt: "Nueva colección",
  },
  {
    code: "DXsFi3olpgi",
    postUrl: "https://www.instagram.com/showroom_andreamari/p/DXsFi3olpgi/",
    image: img("photo-1483985988355-763728e1935b", 600),
    alt: "Talles reales",
  },
  {
    code: "DXsFAvQFl8B",
    postUrl: "https://www.instagram.com/showroom_andreamari/p/DXsFAvQFl8B/",
    image: img("photo-1496747613176-220222e2e72f", 600),
    alt: "Vestido maxi",
  },
  {
    code: "DXsD1yfFq_B",
    postUrl: "https://www.instagram.com/showroom_andreamari/p/DXsD1yfFq_B/",
    image: img("photo-1509631179647-0c500ba1417f", 600),
    alt: "Pantalón calce perfecto",
  },
  {
    code: "DXsCqtEFrPc",
    postUrl: "https://www.instagram.com/showroom_andreamari/p/DXsCqtEFrPc/",
    image: img("photo-1591047139829-d91aecb6caea", 600),
    alt: "Abrigo temporada",
  },
  {
    code: "DXsBaRKkjKE",
    postUrl: "https://www.instagram.com/showroom_andreamari/p/DXsBaRKkjKE/",
    image: img("photo-1434389676629-43dffd6ac5f4", 600),
    alt: "Look boutique Ezeiza",
  },
];

export function isAndreaMariSlug(slug: string): boolean {
  return slug === ANDREA_MARI_SLUG;
}

export function formatAndreaPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}

export function andreaWhatsAppBase(): string {
  return `https://wa.me/${ANDREA_MARI_CONFIG.whatsapp}`;
}

export function andreaWhatsAppLink(message: string): string {
  return `${andreaWhatsAppBase()}?text=${encodeURIComponent(message)}`;
}

export function andreaProductWhatsApp(product: AndreaMariProduct): string {
  const sizes = product.sizes.join(", ");
  return andreaWhatsAppLink(
    [
      `¡Hola Showroom Andrea Mari! 💖`,
      `Quiero esta prenda de su web:`,
      ``,
      `✨ ${product.name}`,
      `💰 ${formatAndreaPrice(product.price)}`,
      `📐 Talles: ${sizes}`,
      ``,
      `¿Tienen stock en mi talle? ¡Gracias!`,
    ].join("\n"),
  );
}

export type AndreaCartItem = AndreaMariProduct & { quantity: number; selectedSize: string };

export function andreaCartWhatsApp(items: AndreaCartItem[]): string {
  if (items.length === 0) return andreaWhatsAppLink(ANDREA_MARI_CONFIG.whatsappMessage);

  let total = 0;
  const lines = items.map((item) => {
    const sub = item.price * item.quantity;
    total += sub;
    return `✨ ${item.quantity}x ${item.name}\n   Talle: ${item.selectedSize} — ${formatAndreaPrice(sub)}`;
  });

  return andreaWhatsAppLink(
    [
      `¡Hola Showroom Andrea Mari! 💖 Me encantaron estas prendas:`,
      ``,
      ...lines,
      ``,
      `🛍️ Total estimado: ${formatAndreaPrice(total)}`,
      ``,
      `¿Me confirman disponibilidad y envío? ¡Gracias! 🥰`,
    ].join("\n"),
  );
}
