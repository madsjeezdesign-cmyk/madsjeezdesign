/** Beltrán Briones — sub-demo inmobiliaria (inversión & educación). */

export const BELTRAN_BRIONES_SLUG = "inmobiliaria-beltran-briones";

export const PARENT_DEMO_SLUG = "inmobiliaria";

export function isBeltranBrionesSlug(slug: string): boolean {
  return slug === BELTRAN_BRIONES_SLUG;
}

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const BELTRAN_BRIONES_CONFIG = {
  slug: BELTRAN_BRIONES_SLUG,
  brand: "Beltrán Briones",
  tagline: "Domina el Real Estate",
  eliteKicker: "Desarrollo inmobiliario de elite",
  heroTitle: "BRIONES",
  legacyTagline: "Arquitectura de legado eterno.",
  subtitle:
    "Estrategias de inversión y ventas inmobiliarias basadas en datos. Aprendé del método que revolucionó el mercado.",
  accent: "#f59e0b",
  whatsapp: "5491123456789",
  email: "contacto@beltranbriones.demo",
  heroImage: img("photo-1486406146926-c627a92ad1ab", 2200),
  heroImageAlt: "Torres de desarrollo inmobiliario",
  investCta: "Quiero invertir en ladrillos",
  bookCta: "Aprender a vender (libro)",
  leadMagnetTitle: "¿Querés mis mejores estrategias?",
  leadMagnetSub:
    "Descargá gratis las 5 reglas de oro para comprar tu primer departamento en CABA sin caer en trampas.",
} as const;

/** Pilares cinematográficos (sección legado). */
export const BELTRAN_LEGACY_PILLARS = [
  {
    title: "Materialidad",
    text: "Ladrillo, hormigón y ubicación: activos que resisten ciclos y generan patrimonio real.",
  },
  {
    title: "Estrategia",
    text: "ROI, cashflow y salida planificada. Cada operación con números antes que emociones.",
  },
  {
    title: "Perpetuidad",
    text: "Construir legado familiar y portafolio que trascienda una sola generación.",
  },
] as const;

/** Pilares educativos (conversión / método). */
export const BELTRAN_PILLARS = [
  {
    icon: "trending" as const,
    title: "Inversión con datos",
    text: "ROI, cashflow y comparables antes de firmar. Sin emociones que cuesten caro.",
  },
  {
    icon: "building" as const,
    title: "Ventas de alto ticket",
    text: "Scripts, objeciones y cierre para propiedades premium en CABA y GBA.",
  },
  {
    icon: "book" as const,
    title: "Formación & libro",
    text: "Metodología paso a paso para pasar de cero a tu primera operación rentable.",
  },
] as const;
