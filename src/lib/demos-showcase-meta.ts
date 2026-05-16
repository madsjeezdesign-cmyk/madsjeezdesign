/**
 * Meta de presentación para tarjetas del índice /demos (estilo showcase).
 */
export type ShowcaseCardMeta = {
  features: [string, string, string];
  /** Tailwind: overlay tint, ej. from-orange-600/30 */
  color: string;
  /** Tailwind: texto acento, ej. text-orange-400 */
  accent: string;
  /** Tailwind: borde hover del grupo */
  border: string;
  /** Pitch extendido (además del tagline del registry si querés combinar en UI) */
  pitch: string;
};

const fallback: ShowcaseCardMeta = {
  features: ["Responsive", "Performance", "Conversión"],
  color: "from-zinc-600/30",
  accent: "text-zinc-400",
  border: "group-hover:border-zinc-500/50",
  pitch: "Modelo de landing optimizado para tu rubro con contenido demo listo para adaptar.",
};

export const SHOWCASE_BY_SLUG: Record<string, ShowcaseCardMeta> = {
  ferreteria: {
    features: ["Control de stock", "Envíos y logística", "Panel / catálogo"],
    color: "from-orange-600/30",
    accent: "text-orange-400",
    border: "group-hover:border-orange-500/50",
    pitch:
      "Plataforma robusta para catálogos extensos, disponibilidad creíble y coordinación de entregas sin fricción.",
  },
  restaurante: {
    features: ["Reservas online", "Carta y delivery", "Experiencia visual"],
    color: "from-red-600/30",
    accent: "text-red-400",
    border: "group-hover:border-red-500/50",
    pitch:
      "Experiencia gourmet digital: reservas, menú y CTA claros con fotografía y storytelling de sala.",
  },
  estetica: {
    features: ["Agenda de turnos", "Catálogo de servicios", "WhatsApp CTA"],
    color: "from-pink-600/30",
    accent: "text-pink-400",
    border: "group-hover:border-pink-500/50",
    pitch:
      "Interfaz minimal y relajante, pensada para conversión de turnos y presentación de protocolos premium.",
  },
  gimnasio: {
    features: ["Planes y membresías", "Horarios en vivo", "Comunidad"],
    color: "from-lime-600/30",
    accent: "text-lime-400",
    border: "group-hover:border-lime-500/50",
    pitch:
      "Energía y dinamismo: planes, open gym y señales de confianza para atletas y estudiantes.",
  },
  veterinaria: {
    features: ["Turnos & urgencias", "Pet shop", "Historias clínicas"],
    color: "from-teal-600/30",
    accent: "text-teal-400",
    border: "group-hover:border-teal-500/50",
    pitch:
      "Portal integral para clínica y tienda: servicios, guardia y retail integrado en un solo flujo.",
  },
  inmobiliaria: {
    features: ["Portfolio filtrable", "Tours & fichas", "Leads calientes"],
    color: "from-amber-600/30",
    accent: "text-amber-400",
    border: "group-hover:border-amber-500/50",
    pitch:
      "Catálogo inmobiliario premium con jerarquía visual, datos verificables y CTAs de visita.",
  },
  tech: {
    features: ["Trial / pricing", "Docs & API", "SLA & compliance"],
    color: "from-violet-600/30",
    accent: "text-violet-400",
    border: "group-hover:border-violet-500/50",
    pitch:
      "Landing SaaS con narrativa de producto, prueba social técnica y embudo de signup claro.",
  },
  floreria: {
    features: ["Catálogo & ramos", "Eventos", "Suscripciones"],
    color: "from-fuchsia-600/30",
    accent: "text-fuchsia-400",
    border: "group-hover:border-fuchsia-500/50",
    pitch:
      "Venta emocional con temporadas, bundles y delivery: storytelling floral de alto impacto.",
  },
  taller: {
    features: ["Turnos mecánica", "Diagnóstico PDF", "Presupuesto online"],
    color: "from-red-600/30",
    accent: "text-red-400",
    border: "group-hover:border-red-500/50",
    pitch:
      "Oferta de servicios clara, urgencias y transparencia antes de levantar el capó.",
  },
  abogados: {
    features: ["Áreas de práctica", "Consulta inicial", "Confidencialidad"],
    color: "from-yellow-600/25",
    accent: "text-yellow-500/90",
    border: "group-hover:border-yellow-500/50",
    pitch:
      "Estudio con tono institucional, jerarquía de servicios y captación seria de leads.",
  },
  farmacia: {
    features: ["Turno & delivery", "Obras sociales", "OTC destacado"],
    color: "from-emerald-600/30",
    accent: "text-emerald-400",
    border: "group-hover:border-emerald-500/50",
    pitch:
      "Salud accesible: información útil, canales de contacto y estructura para e-farmacia.",
  },
  odontologia: {
    features: ["Tratamientos", "Financiación", "Urgencias"],
    color: "from-sky-600/30",
    accent: "text-sky-400",
    border: "group-hover:border-sky-500/50",
    pitch:
      "Clínica con foco en diagnóstico digital, confianza y conversión de primera visita.",
  },
  contadores: {
    features: ["Servicios impositivos", "PyME & monotributo", "Reporting"],
    color: "from-slate-600/30",
    accent: "text-slate-400",
    border: "group-hover:border-slate-500/50",
    pitch:
      "Estudio contable con propuesta clara, credenciales y contacto sin ruido.",
  },
  musica: {
    features: ["Cursos & niveles", "Exámenes", "Inscripción"],
    color: "from-purple-600/30",
    accent: "text-purple-400",
    border: "group-hover:border-purple-500/50",
    pitch:
      "Escuela con ritmo propio: instrumentos, metodología y calendario visible para familias.",
  },
  detailing: {
    features: ["Paquetes detailing", "PPF & cerámico", "Turnos"],
    color: "from-blue-600/30",
    accent: "text-blue-400",
    border: "group-hover:border-blue-500/50",
    pitch:
      "Alto valor percibido: antes/después, procesos y upsell de protección y productos.",
  },
  panaderia: {
    features: ["Catálogo fresco", "Encargues", "Café & lunch"],
    color: "from-amber-600/30",
    accent: "text-amber-400",
    border: "group-hover:border-amber-500/50",
    pitch:
      "Marca artesanal con aromas en el copy, pedidos B2C/B2B y horarios de horno.",
  },
  viajes: {
    features: ["Cotizador / paquetes", "Corporativo MICE", "Soporte 24/7"],
    color: "from-cyan-600/30",
    accent: "text-cyan-400",
    border: "group-hover:border-cyan-500/50",
    pitch:
      "Viajes y eventos con storytelling de destino y confianza en cada etapa del itinerario.",
  },
  limpieza: {
    features: ["Facility", "Industrias & clínicas", "SLA KPI"],
    color: "from-indigo-600/30",
    accent: "text-indigo-400",
    border: "group-hover:border-indigo-500/50",
    pitch:
      "Servicios B2B con credibilidad operativa, certificaciones y propuestas por vertical.",
  },
  foto: {
    features: ["Packs foto & video", "E-commerce & hero", "Rush options"],
    color: "from-yellow-600/25",
    accent: "text-amber-400",
    border: "group-hover:border-amber-500/50",
    pitch:
      "Portfolio cinematográfico: procesos, equipamiento y precios-paquete entendibles.",
  },
  optica: {
    features: ["Examen & armazones", "Cristales progresivos", "Audiología"],
    color: "from-blue-600/30",
    accent: "text-blue-400",
    border: "group-hover:border-blue-500/50",
    pitch:
      "Salud visual y auditiva con educación del paciente y upsell ético de productos.",
  },
};

export function getShowcaseMeta(slug: string): ShowcaseCardMeta {
  return SHOWCASE_BY_SLUG[slug] ?? fallback;
}
