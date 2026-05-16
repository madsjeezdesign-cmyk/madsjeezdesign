import {
  FALLBACK_SHOWCASE_FEATURES,
  SHOWCASE_FEATURES,
} from "@/lib/demo-showcase-features";
import { getDemoBySlug } from "@/lib/demos-registry";

export type DemoNavLink = { href: string; label: string };

export type DemoCapabilityCard = {
  title: string;
  description: string;
};

export type DemoTrustItem = {
  label: string;
  detail: string;
};

export type DemoQuickAction = {
  href: string;
  label: string;
  sub: string;
};

/** Demos con bloques enriquecidos al final vía DemoEnhancements (evitar duplicar en shell). */
export const LEGACY_ENHANCED_SLUGS = new Set([
  "contadores",
  "musica",
  "detailing",
  "panaderia",
  "viajes",
  "limpieza",
  "foto",
  "optica",
  "heladeria",
  "lavadero",
  "seguridad",
  "yoga",
  "hotel",
  "catering",
  "paisajismo",
  "tattoo",
  "cerrajeria",
  "coworking",
]);

const DEFAULT_NAV: DemoNavLink[] = [
  { href: "#top", label: "Inicio" },
  { href: "#demo-capacidades", label: "Opciones" },
  { href: "#demo-galeria", label: "Galería" },
  { href: "#demo-contacto", label: "Contacto" },
];

const NAV_OVERRIDES: Partial<Record<string, DemoNavLink[]>> = {
  contadores: [
    { href: "#top", label: "Inicio" },
    { href: "#demo-capacidades", label: "Servicios" },
    { href: "#demo-galeria", label: "Casos" },
    { href: "#demo-contacto", label: "Consulta" },
  ],
  hotel: [
    { href: "#top", label: "Inicio" },
    { href: "#demo-capacidades", label: "Habitaciones" },
    { href: "#demo-galeria", label: "Galería" },
    { href: "#demo-contacto", label: "Reservar" },
  ],
  yoga: [
    { href: "#top", label: "Inicio" },
    { href: "#demo-capacidades", label: "Clases" },
    { href: "#demo-galeria", label: "Estudio" },
    { href: "#demo-contacto", label: "Prueba" },
  ],
};

function describeFeature(title: string, industry: string): string {
  const t = title.toLowerCase();
  if (t.includes("galería") || t.includes("portfolio"))
    return `Muestra trabajos reales de ${industry} con carga rápida, orden por categoría y textos SEO local.`;
  if (t.includes("video"))
    return "Hero en video con fallback MP4, poster optimizado y reproducción mobile sin bloquear scroll.";
  if (t.includes("whatsapp") || t.includes("chat"))
    return "Botón flotante y CTAs que abren conversación con mensaje prearmado según servicio elegido.";
  if (t.includes("form") || t.includes("lead") || t.includes("consulta"))
    return "Formulario con validación, rubro preseleccionado y aviso de respuesta en menos de 24 h hábiles.";
  if (t.includes("e-commerce") || t.includes("tienda") || t.includes("shop"))
    return "Carrito demo con variantes, stock visual y checkout simulado listo para Mercado Pago o transferencia.";
  if (t.includes("testimonio"))
    return "Reseñas verificables con rol, rubro y métrica de satisfacción para reducir fricción de compra.";
  if (t.includes("faq"))
    return "Preguntas frecuentes por etapa del funnel: precios, tiempos, garantías y zonas de cobertura.";
  if (t.includes("presupuesto") || t.includes("cotiz"))
    return "Flujo guiado: elegís alcance, adjuntás fotos opcionales y recibís rango estimado antes de la visita.";
  if (t.includes("turno") || t.includes("reserva") || t.includes("agenda"))
    return "Calendario visual con franjas, recordatorios y bloqueo de feriados integrado al CRM del negocio.";
  if (t.includes("mapa") || t.includes("zona") || t.includes("sucursal"))
    return "Mapa con sucursales, horarios y CTA a Google Maps o Waze en un toque desde mobile.";
  if (t.includes("blog") || t.includes("prensa"))
    return "Notas y casos de estudio que posicionan autoridad y alimentan campañas de remarketing.";
  return `Módulo ${title} pensado para ${industry}: diseño responsive, copy claro y métricas de conversión.`;
}

export function getDemoNavLinks(slug: string): DemoNavLink[] {
  return NAV_OVERRIDES[slug] ?? DEFAULT_NAV;
}

export function getDemoCapabilityCards(slug: string): DemoCapabilityCard[] {
  const demo = getDemoBySlug(slug);
  const industry = demo?.industry ?? "tu rubro";
  const features = SHOWCASE_FEATURES[slug] ?? FALLBACK_SHOWCASE_FEATURES;
  const unique = [...new Set(features.map((f) => f.trim()).filter(Boolean))].slice(0, 9);
  return unique.map((title) => ({
    title,
    description: describeFeature(title, industry),
  }));
}

export function getDemoTrustItems(slug: string): DemoTrustItem[] {
  const demo = getDemoBySlug(slug);
  const industry = demo?.industry ?? "tu negocio";
  return [
    {
      label: "Respuesta ágil",
      detail: "Consultas demo atendidas en menos de 24 h con plantilla adaptable a tu equipo.",
    },
    {
      label: "Rubro especializado",
      detail: `Copy y jerarquía visual calibrados para ${industry}, no plantillas genéricas.`,
    },
    {
      label: "Listo para escalar",
      detail: "Arquitectura Next.js: blog, tienda, turnos o CRM según lo que necesites después.",
    },
    {
      label: "Marca consistente",
      detail: "Tipografías, paleta y fotografía alineadas a tu identidad en desktop y mobile.",
    },
  ];
}

export function getDemoQuickActions(slug: string): DemoQuickAction[] {
  const demo = getDemoBySlug(slug);
  const brand = demo?.title ?? "Tu marca";
  return [
    {
      href: "#demo-contacto",
      label: "Pedir presupuesto",
      sub: `Formulario demo para ${brand}`,
    },
    {
      href: "#demo-galeria",
      label: "Ver trabajos",
      sub: "Galería con fotos de referencia del rubro",
    },
    {
      href: "#demo-capacidades",
      label: "Explorar módulos",
      sub: "9 capacidades típicas de tu industria",
    },
    {
      href: "/demos",
      label: "Más demos",
      sub: "Showroom MADSJEEZ · otros rubros",
    },
  ];
}

export function shouldRenderSiteExtrasInShell(slug: string): boolean {
  return !LEGACY_ENHANCED_SLUGS.has(slug);
}
