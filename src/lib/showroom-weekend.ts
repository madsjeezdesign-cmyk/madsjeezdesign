/** Showroom Weekend — moda curva real, El Jagüel / Ezeiza */

export const SHOWROOM_WEEKEND_SLUG = "moda-showroom-weekend";

export type WeekendProduct = {
  id: number;
  name: string;
  price: number;
  category: string;
  sizes: number[];
  image: string;
  badge?: string;
  description: string;
  rating: number;
  reviews: number;
};

export type WeekendShape = {
  name: string;
  desc: string;
  advice: string;
  scaleWaist: number;
  scaleHips: number;
  scaleBust: number;
};

export type WeekendSizeResult = {
  size: number | string;
  shape: WeekendShape;
  type: string;
};

export const SHOWROOM_WEEKEND_CONFIG = {
  slug: SHOWROOM_WEEKEND_SLUG,
  brand: "WEEKEND",
  brandTag: "Showroom",
  tagline: "Moda real con estilo & actitud · Talles 44 al 60",
  instagramHandle: "showroom_andreamari",
  instagramUrl: "https://www.instagram.com/showroom_andreamari/",
  whatsapp: "5491136453000",
  whatsappMessage:
    "¡Hola Showroom Weekend! ☀️ Vengo desde su web y quiero consultar por prendas en mi talle.",
  phoneDisplay: "WhatsApp directo",
  addressLines: [
    "Paso de la Patria 324",
    "B1804 Ezeiza, Provincia de Buenos Aires",
    "Showroom · Faro Recalada 306, El Jagüel",
  ],
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3275.4!2d-58.5219898!3d-34.8555301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd18afc79879f%3A0x842b4ba5f92a30e1!2sShowroom%20Weekend!5e0!3m2!1ses-419!2sar!4v1700000000000!5m2!1ses-419!2sar",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=-34.8555301,-58.5219898",
  heroImage: "/demos/showroom-weekend/store-01.jpg",
  storeImage: "/demos/showroom-weekend/store-02.jpg",
  hours: "Viernes y Sábados de 16:00 a 20:00 hs",
  coupons: {
    WEEKEND10: 10,
    ENVIOFREE: 5,
  } as Record<string, number>,
} as const;

const img = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const WEEKEND_PRODUCTS: WeekendProduct[] = [
  {
    id: 1,
    name: "Jeans Wide Leg Sunset Glow",
    price: 43500,
    category: "Jeans",
    sizes: [44, 46, 48, 50, 52, 54],
    image: img("photo-1541099649105-f69ad21f3246"),
    badge: "Más vendido 🔥",
    description:
      "Denim premium super elastizado con excelente rebote. Calce perfecto que abraza tus curvas sin apretar.",
    rating: 4.9,
    reviews: 124,
  },
  {
    id: 2,
    name: "Sweater Tejido Coral Bloom",
    price: 38900,
    category: "Abrigos",
    sizes: [46, 48, 50, 52, 54],
    image: img("photo-1516762689617-e1cffcef479d"),
    badge: "Nueva temporada ✨",
    description:
      "Tejido oversize abrigado y súper suave en color coral vibrante. Una explosión de energía para el invierno.",
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 3,
    name: "Camisa Lino Oversize Sand",
    price: 32000,
    category: "Tops",
    sizes: [44, 46, 48, 50, 52],
    image: img("photo-1607746882042-944635dfe10e"),
    badge: "Fresco & chic",
    description:
      "Lino de alta calidad, corte amplio ideal para usar abierto con top abajo o anudado.",
    rating: 4.7,
    reviews: 56,
  },
  {
    id: 4,
    name: "Jean Súper Oxford Street",
    price: 45000,
    category: "Jeans",
    sizes: [46, 48, 50, 52, 54, 56, 58],
    image: img("photo-1576995853123-5a10305d93c0"),
    badge: "Súper rebote 10/10",
    description:
      "Oxford icónico tiro ultra alto. El calce de piernas más estilizado en talle real.",
    rating: 5,
    reviews: 201,
  },
  {
    id: 5,
    name: "Campera Denim Soft Weekend",
    price: 49500,
    category: "Abrigos",
    sizes: [44, 48, 52, 56, 60],
    image: img("photo-1556905055-8f358a7a47b2"),
    badge: "Últimos disponibles",
    description:
      "Denim prelavado ultra suave con flex. Comodidad absoluta en sintonía con tu actitud.",
    rating: 4.9,
    reviews: 74,
  },
  {
    id: 6,
    name: "Top Rib Ámbar Ribbed",
    price: 19500,
    category: "Tops",
    sizes: [44, 46, 48, 50, 52, 54],
    image: img("photo-1515886657613-9f3515b0c78f"),
    badge: "Básico premium",
    description:
      "Morfología clásica con morley de algodón pesado. No transparenta y contiene perfectamente.",
    rating: 4.6,
    reviews: 42,
  },
  {
    id: 7,
    name: "Blazer Sastrero Fuchsia Power",
    price: 52000,
    category: "Abrigos",
    sizes: [48, 50, 52, 54, 56, 58],
    image: img("photo-1548624149-f140c6a2e6f0"),
    badge: "Impactante 🌟",
    description:
      "Corte estructurado con elástico interno para máxima comodidad. Tono fucsia neón de alto impacto.",
    rating: 4.9,
    reviews: 93,
  },
  {
    id: 8,
    name: "Túnica Fluid Eclipse",
    price: 36000,
    category: "Tops",
    sizes: [46, 48, 50, 52, 54, 56],
    image: img("photo-1595777457583-95e059d581b8"),
    badge: "Colección especial",
    description:
      "Satén premium fluido. Mangas Oxford ligeras y caída perfecta que aporta sofisticación.",
    rating: 4.8,
    reviews: 31,
  },
];

export const WEEKEND_SILHOUETTES: Record<string, WeekendShape> = {
  hourglass: {
    name: "Reloj de arena",
    desc: "Tus curvas están balanceadas con una cintura bien definida.",
    advice: "Los jeans wide leg y vestidos entallados potenciarán tu silueta soñada.",
    scaleWaist: 0.65,
    scaleHips: 1.05,
    scaleBust: 1.0,
  },
  pear: {
    name: "Cuchara / pera",
    desc: "Tus caderas son más amplias que tu busto y hombros.",
    advice: "Nuestros jeans Oxford y remeras llamativas arriba balancearán tu look.",
    scaleWaist: 0.72,
    scaleHips: 1.2,
    scaleBust: 0.85,
  },
  apple: {
    name: "Manzana / ovalada",
    desc: "Tu silueta es más redondeada, con volumen en la zona media.",
    advice: "Blusas fluidas y jeans de tiro ultra alto te darán confort premium.",
    scaleWaist: 1.05,
    scaleHips: 0.98,
    scaleBust: 1.0,
  },
  rectangle: {
    name: "Rectangular",
    desc: "Tus medidas de busto, cintura y cadera son bastante similares.",
    advice: "Blazers abiertos o camisas oversize suman dinamismo y profundidad.",
    scaleWaist: 0.92,
    scaleHips: 0.95,
    scaleBust: 0.95,
  },
};

export function isShowroomWeekendSlug(slug: string): boolean {
  return slug === SHOWROOM_WEEKEND_SLUG;
}

export function formatWeekendPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}

export function calculateWeekendSize(
  busto: number,
  cintura: number,
  cadera: number,
): WeekendSizeResult {
  let size: number | string = 44;
  if (cadera > 132 || busto > 123 || cintura > 107) {
    size = "56 al 60 (curva mayor)";
  } else if (cadera > 126 || busto > 116 || cintura > 100) {
    size = 54;
  } else if (cadera > 121 || busto > 111 || cintura > 95) {
    size = 52;
  } else if (cadera > 116 || busto > 106 || cintura > 90) {
    size = 50;
  } else if (cadera > 111 || busto > 101 || cintura > 85) {
    size = 48;
  } else if (cadera > 106 || busto > 96 || cintura > 80) {
    size = 46;
  }

  let shapeKey = "rectangle";
  const waistToHip = cintura / cadera;
  const bustToHip = busto / cadera;

  if (waistToHip <= 0.75) {
    shapeKey = bustToHip >= 0.95 ? "hourglass" : "pear";
  } else if (waistToHip >= 0.88) {
    shapeKey = "apple";
  }

  return {
    size,
    shape: WEEKEND_SILHOUETTES[shapeKey]!,
    type: shapeKey,
  };
}

export type WeekendCartItem = WeekendProduct & {
  key: string;
  selectedSize: number;
  quantity: number;
};

export function weekendWhatsAppLink(message: string): string {
  return `https://wa.me/${SHOWROOM_WEEKEND_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function weekendCartWhatsApp(
  items: WeekendCartItem[],
  totals: { total: number },
  discount: { code: string; percent: number },
  deliveryMethod: "pickup" | "delivery",
): string {
  const deliveryStr =
    deliveryMethod === "pickup"
      ? "📍 Retiro en local (Paso de la Patria 324 / El Jagüel)"
      : "📦 Envío a coordinar por Correo Argentino";

  let msg = `¡Hola Showroom Weekend! ☀️ Vengo desde la web. Quiero encargar:\n\n`;
  items.forEach((item) => {
    const sub = item.price * item.quantity;
    msg += `⚡ ${item.quantity}x ${item.name}\n   Talle ${item.selectedSize} — ${formatWeekendPrice(sub)}\n`;
  });
  if (discount.percent > 0) {
    msg += `\n🏷️ Cupón: ${discount.code} (${discount.percent}% OFF)`;
  }
  msg += `\n💵 Total estimado: ${formatWeekendPrice(totals.total)}`;
  msg += `\n🚛 ${deliveryStr}`;
  msg += `\n\n¿Me confirman stock? ¡Gracias! 🥰`;
  return weekendWhatsAppLink(msg);
}
