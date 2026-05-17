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
  fallbackImage?: string;
  alt: string;
};

import {
  ANDREA_MARI_IG_POSTS,
  andreaMariShopImage,
  buildAndreaMariInstagramFeed,
} from "@/lib/andrea-mari-instagram";

export const ANDREA_MARI_CONFIG = {
  slug: ANDREA_MARI_SLUG,
  brandLine1: "SHOWROOM",
  brandLine2: "Andrea Mari",
  tagline: "Moda vibrante en talles reales · Ezeiza",
  instagramHandle: "showroom_andreamari",
  instagramUrl: "https://www.instagram.com/showroom_andreamari/",
  whatsapp: "5491127458483",
  whatsappMessage:
    "¡Hola Showroom Andrea Mari! 💖 Vengo desde su web y quiero consultar por prendas en mi talle.",
  phoneDisplay: "011 2745-8483",
  addressLines: ["Showroom Andrea Mari", "Ezeiza, Buenos Aires", "Argentina"],
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3275.4053748882583!2d-58.5244127!3d-34.8503777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccbee8d83a9a7%3A0x2332ecef7525f8b8!2sShowroom%20Andrea%20Mari!5e0!3m2!1ses-419!2sar!4v1716000000000!5m2!1ses-419!2sar",
  heroImage: ANDREA_MARI_IG_POSTS[5]!.localPath,
  aboutImage: ANDREA_MARI_IG_POSTS[6]!.localPath,
  categoryColores: ANDREA_MARI_IG_POSTS[0]!.localPath,
  categoryComodidad: ANDREA_MARI_IG_POSTS[3]!.localPath,
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
    image: andreaMariShopImage(0),
    badge: "Fuego 🔥",
    isNew: true,
  },
  {
    id: 2,
    name: "Maxi Vestido Esmeralda",
    price: 45000,
    category: "Vestidos",
    sizes: ["48", "50", "52", "54", "58"],
    image: andreaMariShopImage(1),
    badge: "Nuevo",
    isNew: true,
  },
  {
    id: 3,
    name: "Camisa Mostaza Oversize",
    price: 31900,
    category: "Camisas",
    sizes: ["XL", "XXL", "3XL", "4XL"],
    image: andreaMariShopImage(2),
  },
  {
    id: 4,
    name: "Pantalón Sastrero Rubí",
    price: 36000,
    category: "Pantalones",
    sizes: ["48", "50", "52", "54", "56", "60"],
    image: andreaMariShopImage(3),
    badge: "Más vendido",
    isNew: true,
  },
  {
    id: 5,
    name: "Remera Básica Algodón",
    price: 18000,
    category: "Remeras",
    sizes: ["L", "XL", "XXL", "3XL", "4XL", "5XL"],
    image: andreaMariShopImage(4),
  },
  {
    id: 6,
    name: "Jean Wide Leg Clásico",
    price: 42000,
    category: "Jeans",
    sizes: ["46", "48", "50", "52", "54", "56"],
    image: andreaMariShopImage(5),
  },
  {
    id: 7,
    name: "Kimono Estampado Floral",
    price: 34000,
    category: "Abrigos",
    sizes: ["Único amplio (hasta 5XL)"],
    image: andreaMariShopImage(6),
    badge: "Premium",
    isNew: true,
  },
  {
    id: 8,
    name: "Sweater Tejido Naranja",
    price: 39000,
    category: "Abrigos",
    sizes: ["XL", "XXL", "3XL"],
    image: andreaMariShopImage(7),
  },
];

/** Feed Instagram: 12 posts reales (tienda usa ig-01…08, galería muestra los 12). */
export const ANDREA_MARI_INSTAGRAM: AndreaMariIgPost[] = buildAndreaMariInstagramFeed();

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
