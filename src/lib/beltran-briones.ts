/** Beltrán Briones — sub-demo inmobiliaria (inversión & educación). */

export const BELTRAN_BRIONES_SLUG = "inmobiliaria-beltran-briones";

export const PARENT_DEMO_SLUG = "inmobiliaria";

export function isBeltranBrionesSlug(slug: string): boolean {
  return slug === BELTRAN_BRIONES_SLUG;
}

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?q=85&w=${w}&auto=format&fit=crop`;

export const BELTRAN_BRIONES_CONFIG = {
  slug: BELTRAN_BRIONES_SLUG,
  brand: "Beltrán Briones",
  tagline: "Domina el Real Estate",
  eliteKicker: "Inversión inmobiliaria de élite · CABA & GBA",
  heroTitle: "BRIONES",
  heroSubtitle: "REAL ESTATE",
  legacyTagline: "Donde el capital se convierte en legado.",
  subtitle:
    "Estrategias de inversión y ventas inmobiliarias basadas en datos. Más de 320 operaciones cerradas. El método que está revolucionando el mercado argentino.",
  accent: "#f59e0b",
  accentDark: "#b45309",
  whatsapp: "5491123456789",
  email: "contacto@beltranbriones.com",
  phone: "+54 9 11 2345-6789",
  address: "Av. Corrientes 1234, Piso 8, CABA",
  heroImage: img("photo-1486406146926-c627a92ad1ab", 2400),
  heroImageAlt: "Torres de desarrollo inmobiliario premium en Buenos Aires",
  heroImage2: img("photo-1560518883-ce09059eeffa", 1600),
  bookImage: img("photo-1544947950-fa07a98d237f", 900),
  investCta: "Quiero invertir en ladrillos",
  bookCta: "Obtener el libro gratis",
  consultCta: "Consultá ahora",
  leadMagnetTitle: "Las 5 reglas de oro para tu primera inversión",
  leadMagnetSub:
    "Descargá gratis la guía que usamos con inversores que comenzaron desde cero y hoy tienen portafolios de +USD 500.000.",
  seoTitle: "Beltrán Briones | Inversión Inmobiliaria CABA & GBA",
  seoDescription:
    "Estrategias de inversión inmobiliaria en Buenos Aires. 320+ operaciones cerradas, +$48M gestionados. Calculadora ROI gratuita. Consultá hoy.",
  geoRegion: "AR-C",
  geoPlacename: "Buenos Aires, Argentina",
  geoPosition: "-34.603722;-58.381592",
} as const;

/** Stats animados en hero strip */
export const BELTRAN_STATS = [
  { value: 320, suffix: "+", label: "Operaciones cerradas" },
  { value: 48, prefix: "$", suffix: "M+", label: "USD gestionados" },
  { value: 1200, suffix: "+", label: "Inversores formados" },
  { value: 4.9, suffix: "★", label: "Calificación Google" },
] as const;

/** Pilares cinematográficos (sección legado). */
export const BELTRAN_LEGACY_PILLARS = [
  {
    number: "01",
    title: "Materialidad",
    text: "Ladrillo, hormigón y ubicación: activos que resisten ciclos inflacionarios y generan patrimonio real en dólares.",
  },
  {
    number: "02",
    title: "Estrategia",
    text: "ROI, cashflow y salida planificada. Cada operación con números antes que emociones. Datos que protegen tu capital.",
  },
  {
    number: "03",
    title: "Perpetuidad",
    text: "Construir legado familiar y portafolio que trascienda una sola generación. Patrimonio que trabaja por vos.",
  },
] as const;

/** Pilares educativos (conversión / método). */
export const BELTRAN_PILLARS = [
  {
    icon: "trending" as const,
    step: "01",
    title: "Diagnóstico de capital",
    text: "Analizamos tu situación patrimonial actual, definimos el perfil de riesgo y el horizonte de inversión óptimo.",
  },
  {
    icon: "search" as const,
    step: "02",
    title: "Selección de activos",
    text: "Identificamos propiedades con mayor delta precio/alquiler según zona, tipología y demanda proyectada.",
  },
  {
    icon: "building" as const,
    step: "03",
    title: "Estructura de la operación",
    text: "Arreglamos financiamiento, trust, escritura y toda la cadena documental sin que pierdas tiempo ni plata.",
  },
  {
    icon: "trending" as const,
    step: "04",
    title: "Gestión y escalada",
    text: "Administramos el activo, optimizamos el alquiler y planificamos cuándo y cómo escalar a la siguiente propiedad.",
  },
] as const;

/** Casos de éxito */
export const BELTRAN_CASES = [
  {
    persona: "Martín, contador. 38 años.",
    zona: "Palermo Hollywood · CABA",
    capital: "USD 85.000",
    roi: "9.4",
    plazo: "18 meses",
    tipo: "Departamento 2 amb. reciclado",
    quote: "Nunca pensé que podía entrar al mercado con ese capital. Hoy tengo 2 unidades.",
    img: img("photo-1560518883-ce09059eeffa", 600),
  },
  {
    persona: "Carolina, diseñadora. 31 años.",
    zona: "Villa Crespo · CABA",
    capital: "USD 55.000",
    roi: "11.2",
    plazo: "24 meses",
    tipo: "PH planta baja · remodelado",
    quote: "El método me enseñó a leer los números antes de firmar. Nadie me había explicado eso.",
    img: img("photo-1600585154340-be6161a56a0c", 600),
  },
  {
    persona: "Roberto, ingeniero. 52 años.",
    zona: "Belgrano R · CABA",
    capital: "USD 220.000",
    roi: "8.1",
    plazo: "12 meses",
    tipo: "Portafolio 3 unidades",
    quote: "Pasé de tener los dólares en el colchón a un portafolio que genera USD 1.800 mensuales.",
    img: img("photo-1486406146926-c627a92ad1ab", 600),
  },
] as const;

/** Testimonios */
export const BELTRAN_TESTIMONIALS = [
  {
    name: "Lucía R.",
    role: "Empresaria · GBA Norte",
    text: "Beltrán me acompañó en mi primera compra sin jerga ni vueltas. Cerré a precio de mercado y hoy el alquiler paga el 100% del crédito.",
    stars: 5,
    img: img("photo-1580489944761-15a19d654956", 200),
  },
  {
    name: "Diego M.",
    role: "Médico · CABA",
    text: "La calculadora me mostró que mi inversión daría un ROI del 8.7% anual. Fue exactamente eso. La transparencia es total.",
    stars: 5,
    img: img("photo-1507003211169-0a1dd7228f2d", 200),
  },
  {
    name: "Valeria T.",
    role: "Agente inmobiliaria formada",
    text: "Con el libro y el método cerré mi primera operación a los 2 meses. Comisión de USD 4.200. Lo mejor que hice este año.",
    stars: 5,
    img: img("photo-1438761681033-6461ffad8d80", 200),
  },
  {
    name: "Fernando G.",
    role: "Inversor recurrente · 6 propiedades",
    text: "Escalé de 1 a 6 unidades en 4 años siguiendo exactamente el sistema. Mis ahorros ahora trabajan solos.",
    stars: 5,
    img: img("photo-1472099645785-5658abf4ff4e", 200),
  },
  {
    name: "Andrea K.",
    role: "Independiente · CABA",
    text: "Pensé que el mercado no era para mí. Resultado: compré a USD 62.000 y hoy vale USD 81.000. En 20 meses.",
    stars: 5,
    img: img("photo-1544005313-94ddf0286df2", 200),
  },
] as const;
