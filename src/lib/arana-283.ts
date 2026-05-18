/** ARANA 283 — moda circular premium, Ezeiza */

export const ARANA_283_SLUG = "moda-arana-283";

export type AranaProduct = {
  id: number;
  title: string;
  category: string;
  brand: string;
  size: string;
  condition: string;
  conditionScore: number;
  price: number;
  emoji: string;
  image: string;
  desc: string;
};

export type AranaCalcResult = {
  accepted: boolean;
  cash?: number;
  credit?: number;
  demandScore: number;
  detail: string;
};

export type AranaStoreStatus = {
  open: boolean;
  text: string;
};

export const ARANA_283_CONFIG = {
  slug: ARANA_283_SLUG,
  brand: "ARANA 283",
  brandTag: "Moda Circular Futurista",
  tagline: "Ropa premium con vibe moderno · Ezeiza",
  instagramHandle: "arana283",
  instagramUrl: "https://www.instagram.com/arana283/",
  email: "arana283@gmail.com",
  whatsapp: "5491128300000",
  whatsappMessage:
    "¡Hola ARANA 283! Vengo desde la web y quiero hacer una consulta.",
  addressLines: ["Arana 283", "Ezeiza, Buenos Aires, Argentina"],
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3275.4053748882583!2d-58.5212705!3d-34.8549147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd0cce0e318a9%3A0xf4e42ab2ac7f4b85!2sARANA%20283%20compra-venta%20de%20ropa!5e0!3m2!1ses-419!2sar!4v1716000000000!5m2!1ses-419!2sar",
  mapsDirectionsUrl:
    "https://www.google.com/maps/place/ARANA+283+compra-venta+de+ropa/@-34.8549147,-58.5212705,17z/data=!3m1!4b1!4m6!3m5!1s0x95bcd0cce0e318a9:0xf4e42ab2ac7f4b85!8m2!3d-34.8549147!4d-58.5212705!16s%2Fg%2F11g2q8394f",
  heroImage: "/demos/arana-283/store-01.jpg",
  storeImage: "/demos/arana-283/store-02.jpg",
  hoursGeneral: "Lunes a Sábados: 10:00 hs a 19:00 hs",
  hoursReception: "Recepción de ropa: Mié y Sáb 10 a 17 hs",
  marqueeText: "ARANA 283 ✦ MODA CIRCULAR ✦ EZEIZA ✦ +20% CANJE ✦",
} as const;

const img = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const ARANA_PRODUCTS: AranaProduct[] = [
  {
    id: 1,
    title: "Campera Puffer Metalizada Streetwear",
    category: "abrigo",
    brand: "Nike",
    size: "L",
    condition: "Impecable (Como Nueva)",
    conditionScore: 10,
    price: 32000,
    emoji: "🧥",
    image: img("photo-1544022613-e87ca75a784a"),
    desc: "Prenda de alto impacto térmico y visual. Color gris metalizado con capucha desmontable y logos refractarios.",
  },
  {
    id: 2,
    title: "Jean Levi's 501 Original Vintage",
    category: "pantalon",
    brand: "Levi's",
    size: "42",
    condition: "Excelente Estado",
    conditionScore: 9,
    price: 28500,
    emoji: "👖",
    image: img("photo-1542272604-787c3835535d"),
    desc: "Mezclilla rígida original, importada. Azul lavado medio con terminación recta clásica.",
  },
  {
    id: 3,
    title: "Zapatillas Retro Dunk Low High-Contrast",
    category: "calzado",
    brand: "Adidas",
    size: "41",
    condition: "Nueva con Etiqueta",
    conditionScore: 10,
    price: 45000,
    emoji: "👟",
    image: img("photo-1595950653106-6c9ebd614d3a"),
    desc: "Pieza única de colección sin rodar. Se entrega en caja de fábrica.",
  },
  {
    id: 4,
    title: "Remera Oversized Heavy Graphic",
    category: "remera",
    brand: "Zara",
    size: "M",
    condition: "Excelente Estado",
    conditionScore: 9,
    price: 14000,
    emoji: "👕",
    image: img("photo-1521572267360-ee0c2909d518"),
    desc: "Algodón pesado premium de 24/1, corte boxy oversized. Estampa frontal cyber-punk.",
  },
  {
    id: 5,
    title: "Lentes de Sol Retro Futuristic",
    category: "accesorios",
    brand: "Otras",
    size: "Único",
    condition: "Nueva con Etiqueta",
    conditionScore: 10,
    price: 9500,
    emoji: "🕶️",
    image: img("photo-1511499767150-a48a237f0083"),
    desc: "Marcos negros ultra envolventes con protección UV400. Incluye estuche rígido.",
  },
  {
    id: 6,
    title: "Piloto Impermeable Neon Active",
    category: "abrigo",
    brand: "Otras",
    size: "XL",
    condition: "Buen Estado",
    conditionScore: 8,
    price: 21000,
    emoji: "🧥",
    image: img("photo-1539571696357-5a69c17a67c6"),
    desc: "Cortavientos premium impermeable con cierres termosellados. Ideal para días lluviosos.",
  },
];

export function isArana283Slug(slug: string): boolean {
  return slug === ARANA_283_SLUG;
}

export function formatAranaPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}

export function getAranaStoreStatus(now = new Date()): AranaStoreStatus {
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const baTime = new Date(utc + 3600000 * -3);
  const day = baTime.getDay();
  const hours = baTime.getHours();

  if (day >= 1 && day <= 6) {
    if (hours >= 10 && hours < 19) {
      if ((day === 3 || day === 6) && hours >= 10 && hours < 17) {
        return { open: true, text: "Abierto hoy — ¡Recibiendo lotes de ropa ahora!" };
      }
      return { open: true, text: "Abierto hoy — Venta y consultas (recepción Mié/Sáb)" };
    }
    return { open: false, text: "Cerrado — Abrimos mañana a las 10:00 hs" };
  }
  return { open: false, text: "Cerrado hoy domingo — Abrimos el lunes a las 10:00 hs" };
}

export function calculateAranaValuation(
  calcType: string,
  calcBrand: string,
  calcCondition: string,
): AranaCalcResult {
  let baseVal = 0;
  let score = 100;

  switch (calcType) {
    case "abrigo":
      baseVal = 40000;
      break;
    case "pantalon":
      baseVal = 28000;
      break;
    case "remera":
      baseVal = 15000;
      break;
    case "calzado":
      baseVal = 35000;
      break;
    default:
      baseVal = 16000;
  }

  switch (calcBrand) {
    case "premium":
      baseVal *= 1.4;
      break;
    case "shopping":
      baseVal *= 1.0;
      break;
    case "comun":
      baseVal *= 0.6;
      break;
  }

  let accepted = true;
  switch (calcCondition) {
    case "new":
      baseVal *= 1.25;
      score = 100;
      break;
    case "excellent":
      baseVal *= 1.0;
      score = 85;
      break;
    case "good":
      baseVal *= 0.7;
      score = 70;
      break;
    case "worn":
      baseVal *= 0.3;
      score = 40;
      accepted = false;
      break;
  }

  if (accepted) {
    const cashValue = Math.round((baseVal * 0.3) / 100) * 100;
    const creditValue = Math.round((cashValue * 1.2) / 100) * 100;
    return {
      accepted: true,
      cash: cashValue,
      credit: creditValue,
      demandScore: score,
      detail: "Prenda apta bajo los estándares de Arana 283.",
    };
  }

  return {
    accepted: false,
    demandScore: score,
    detail: "Las prendas desgastadas o con detalles no superan los filtros de calidad actuales.",
  };
}

export function aranaWhatsAppLink(message: string): string {
  return `https://wa.me/${ARANA_283_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function aranaCartWhatsApp(items: AranaProduct[]): string {
  let msg = `🔥 ¡Hola ARANA 283! Vengo desde la web y quiero reservar estas prendas para probarme en el local:\n\n`;
  items.forEach((item, index) => {
    msg += `📍 *Prenda ${index + 1}:* ${item.title}\n🏷️ *Marca:* ${item.brand} | *Talle:* ${item.size}\n💵 *Precio:* ${formatAranaPrice(item.price)}\n\n`;
  });
  msg += `👉 ¿Me confirman disponibilidad en Arana 283, Ezeiza? ¡Gracias!`;
  return aranaWhatsAppLink(msg);
}

export function aranaSingleProductWhatsApp(product: AranaProduct): string {
  const msg = `🔥 ¡Hola ARANA 283! Quiero reservar para probarme:\n\n📌 *${product.title}*\n🏷️ ${product.brand} · Talle ${product.size}\n💵 ${formatAranaPrice(product.price)}\n\n¿Sigue disponible?`;
  return aranaWhatsAppLink(msg);
}

export function aranaCotizacionWhatsApp(
  calcType: string,
  calcBrand: string,
  calcCondition: string,
  values: AranaCalcResult,
): string {
  if (!values.accepted || values.cash == null || values.credit == null) return "#";

  const typeLabel = calcType.toUpperCase();
  const condLabel =
    calcCondition === "new"
      ? "Nueva con etiqueta"
      : calcCondition === "excellent"
        ? "Excelente"
        : "Buen estado";
  const brandLabel =
    calcBrand === "premium"
      ? "Premium/Importada"
      : calcBrand === "shopping"
        ? "Nacional de Shopping"
        : "Básica";

  const msg = `⚡ ¡Hola ARANA 283! Usé el cotizador virtual y quiero coordinar recepción de ropa:\n\n👗 *Prenda:* ${typeLabel}\n🔖 *Marca:* ${brandLabel}\n✨ *Estado:* ${condLabel}\n💵 *Estimación:* ${formatAranaPrice(values.cash)} (efectivo) / ${formatAranaPrice(values.credit)} (canje)\n\n¿Qué días puedo pasar a entregar el lote?`;
  return aranaWhatsAppLink(msg);
}

export const ARANA_FAQ = [
  {
    q: "¿Qué días puedo llevar ropa para vender?",
    a: "Recibimos prendas los miércoles y sábados de 10:00 a 17:00 hs en Arana 283. Sin turno previo; por orden de llegada.",
  },
  {
    q: "¿Cuáles son los requisitos de aceptación?",
    a: "Temporada vigente, marcas reconocidas o de shopping, y estado impecable: limpias, planchadas, sin manchas ni roturas.",
  },
  {
    q: "¿Efectivo o canje?",
    a: "Efectivo o transferencia al instante. Con canje recibís un 20% extra de valor para usar en el local.",
  },
  {
    q: "¿Las prendas de la web son únicas?",
    a: "Sí. Cada pieza tiene stock único en un talle. Reservá por WhatsApp para probártela en el local.",
  },
] as const;
