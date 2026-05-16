import {
  FALLBACK_SHOWCASE_FEATURES,
  SHOWCASE_FEATURES,
  type ShowcaseFeatures,
} from "@/lib/demo-showcase-features";

/**
 * Meta de presentación para tarjetas del índice /demos (estilo showcase).
 */
export type ShowcaseCardMeta = {
  features: ShowcaseFeatures;
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
  features: FALLBACK_SHOWCASE_FEATURES,
  color: "from-zinc-600/30",
  accent: "text-zinc-400",
  border: "group-hover:border-zinc-500/50",
  pitch: "Modelo de landing optimizado para tu rubro con contenido demo listo para adaptar.",
};

type ShowcaseStyleMeta = Omit<ShowcaseCardMeta, "features">;

export const SHOWCASE_BY_SLUG: Record<string, ShowcaseStyleMeta> = {
  ferreteria: {
    color: "from-orange-600/30",
    accent: "text-orange-400",
    border: "group-hover:border-orange-500/50",
    pitch:
      "Plataforma robusta para catálogos extensos, disponibilidad creíble y coordinación de entregas sin fricción.",
  },
  restaurante: {

    color: "from-red-600/30",
    accent: "text-red-400",
    border: "group-hover:border-red-500/50",
    pitch:
      "Experiencia gourmet digital: reservas, menú y CTA claros con fotografía y storytelling de sala.",
  },
  estetica: {

    color: "from-pink-600/30",
    accent: "text-pink-400",
    border: "group-hover:border-pink-500/50",
    pitch:
      "Interfaz minimal y relajante, pensada para conversión de turnos y presentación de protocolos premium.",
  },
  gimnasio: {

    color: "from-lime-600/30",
    accent: "text-lime-400",
    border: "group-hover:border-lime-500/50",
    pitch:
      "Energía y dinamismo: planes, open gym y señales de confianza para atletas y estudiantes.",
  },
  veterinaria: {

    color: "from-teal-600/30",
    accent: "text-teal-400",
    border: "group-hover:border-teal-500/50",
    pitch:
      "Portal integral para clínica y tienda: servicios, guardia y retail integrado en un solo flujo.",
  },
  inmobiliaria: {

    color: "from-amber-600/30",
    accent: "text-amber-400",
    border: "group-hover:border-amber-500/50",
    pitch:
      "Catálogo inmobiliario premium con jerarquía visual, datos verificables y CTAs de visita.",
  },
  tech: {

    color: "from-cyan-600/30",
    accent: "text-cyan-400",
    border: "group-hover:border-cyan-500/50",
    pitch:
      "Vanguardia cyber: métricas en vivo, terminal de comando, protocolos IA y embudo de auditoría Alpha.",
  },
  floreria: {

    color: "from-emerald-600/25",
    accent: "text-emerald-600",
    border: "group-hover:border-emerald-500/50",
    pitch:
      "Jardín Ensueño: tienda editorial, talleres botánicos, carrito demo y storytelling de vivero premium.",
  },
  taller: {

    color: "from-orange-600/30",
    accent: "text-orange-400",
    border: "group-hover:border-orange-500/50",
    pitch:
      "Motor Dynamics: hero industrial, servicios pro, galería de 6 fotos y turnos con estética racing.",
  },
  abogados: {

    color: "from-amber-600/25",
    accent: "text-amber-500",
    border: "group-hover:border-amber-500/50",
    pitch:
      "Varela & Asociados: prestigio jurídico, áreas elite, equipo, publicaciones y consulta confidencial.",
  },
  farmacia: {
    color: "from-cyan-600/30",
    accent: "text-cyan-500",
    border: "group-hover:border-cyan-500/50",
    pitch:
      "Medical Hub premium: catálogo e-commerce, telemedicina 24/7, laboratorio y carrito con estética clínica moderna.",
  },
  odontologia: {
    color: "from-blue-600/30",
    accent: "text-blue-500",
    border: "group-hover:border-blue-500/50",
    pitch:
      "Galénica Dental Elite: smile design, grid de especialidades, tecnología sin miedo y conversión de primera visita.",
  },
  contadores: {

    color: "from-slate-600/30",
    accent: "text-slate-400",
    border: "group-hover:border-slate-500/50",
    pitch:
      "Estudio contable con propuesta clara, credenciales y contacto sin ruido.",
  },
  musica: {

    color: "from-purple-600/30",
    accent: "text-purple-400",
    border: "group-hover:border-purple-500/50",
    pitch:
      "Escuela con ritmo propio: instrumentos, metodología y calendario visible para familias.",
  },
  detailing: {

    color: "from-blue-600/30",
    accent: "text-blue-400",
    border: "group-hover:border-blue-500/50",
    pitch:
      "Alto valor percibido: antes/después, procesos y upsell de protección y productos.",
  },
  panaderia: {

    color: "from-amber-600/30",
    accent: "text-amber-400",
    border: "group-hover:border-amber-500/50",
    pitch:
      "Marca artesanal con aromas en el copy, pedidos B2C/B2B y horarios de horno.",
  },
  viajes: {

    color: "from-cyan-600/30",
    accent: "text-cyan-400",
    border: "group-hover:border-cyan-500/50",
    pitch:
      "Viajes y eventos con storytelling de destino y confianza en cada etapa del itinerario.",
  },
  limpieza: {

    color: "from-indigo-600/30",
    accent: "text-indigo-400",
    border: "group-hover:border-indigo-500/50",
    pitch:
      "Servicios B2B con credibilidad operativa, certificaciones y propuestas por vertical.",
  },
  foto: {

    color: "from-yellow-600/25",
    accent: "text-amber-400",
    border: "group-hover:border-amber-500/50",
    pitch:
      "Portfolio cinematográfico: procesos, equipamiento y precios-paquete entendibles.",
  },
  optica: {

    color: "from-blue-600/30",
    accent: "text-blue-400",
    border: "group-hover:border-blue-500/50",
    pitch:
      "Salud visual y auditiva con educación del paciente y upsell ético de productos.",
  },
  heladeria: {

    color: "from-fuchsia-600/30",
    accent: "text-fuchsia-400",
    border: "group-hover:border-fuchsia-500/50",
    pitch:
      "Marca sensorial con estaciones, packs para fiestas y narrativa de ingredientes reales — el tipo de storytelling que buscan heladerías artesanales.",
  },
  lavadero: {

    color: "from-cyan-600/30",
    accent: "text-cyan-400",
    border: "group-hover:border-cyan-500/50",
    pitch:
      "Operación de alto volumen con control de filas, planes recurrentes y cross-sell de detailing sin ensuciar la propuesta.",
  },
  seguridad: {

    color: "from-emerald-600/30",
    accent: "text-emerald-400",
    border: "group-hover:border-emerald-500/50",
    pitch:
      "Confianza técnica: diagramas de cobertura, SLA de respuesta y bundles claros para hogar y PyME.",
  },
  yoga: {

    color: "from-violet-600/25",
    accent: "text-violet-500",
    border: "group-hover:border-violet-400/50",
    pitch:
      "Espacio calmado que prioriza agenda, claridad de estilos y conversión mobile-first para alumnos corporativos.",
  },
  hotel: {

    color: "from-amber-600/30",
    accent: "text-amber-400",
    border: "group-hover:border-amber-500/50",
    pitch:
      "Hospitalidad con tono editorial, upsells de experiencia y señales de confianza para visitantes internacionales.",
  },
  catering: {

    color: "from-red-600/30",
    accent: "text-red-400",
    border: "group-hover:border-red-500/50",
    pitch:
      "Propuestas B2B con menús por persona, requisitos dietéticos visibles y demostración de producción en vivo.",
  },
  paisajismo: {

    color: "from-green-600/30",
    accent: "text-green-400",
    border: "group-hover:border-green-500/50",
    pitch:
      "Portafolio de obra y mantenimiento con foco en sostenibilidad hídrica y contratos anuales transparentes.",
  },
  tattoo: {

    color: "from-rose-600/30",
    accent: "text-rose-400",
    border: "group-hover:border-rose-500/50",
    pitch:
      "Estudio con tono galería: calendario claro, políticas visibles y storytelling del proceso creativo.",
  },
  cerrajeria: {

    color: "from-yellow-600/25",
    accent: "text-yellow-400",
    border: "group-hover:border-yellow-500/50",
    pitch:
      "Servicio de confianza con geolocalización de móviles, garantías explícitas y catálogo técnico sin jerga innecesaria.",
  },
  coworking: {

    color: "from-sky-600/30",
    accent: "text-sky-400",
    border: "group-hover:border-sky-500/50",
    pitch:
      "Espacio flexible con ocupación en tiempo real, add-ons de tecnología y propuesta clara para equipos remotos.",
  },
  minecraft: {
    color: "from-emerald-600/30",
    accent: "text-emerald-400",
    border: "group-hover:border-emerald-500/50",
    pitch:
      "Hosting gamer con planes RAM/slots, modpacks en un click y señales de uptime para convertir clanes y comunidades.",
  },
  roblox: {
    color: "from-rose-600/30",
    accent: "text-rose-400",
    border: "group-hover:border-rose-500/50",
    pitch:
      "Infra para experiences privadas: escalado, métricas y moderación pensados para estudios y creadores.",
  },
  cs2: {
    color: "from-amber-600/30",
    accent: "text-amber-400",
    border: "group-hover:border-amber-500/50",
    pitch:
      "Servidores competitivos 128 tick con narrativa de hitreg, plugins de scrim y embudo de deploy inmediato.",
  },
  fivem: {
    color: "from-purple-600/30",
    accent: "text-purple-400",
    border: "group-hover:border-purple-500/50",
    pitch:
      "RP serio con stack ESX/QBCore visible, txAdmin y planes por slots para ciudades que escalan.",
  },
  muonline: {
    color: "from-yellow-600/25",
    accent: "text-yellow-400",
    border: "group-hover:border-yellow-500/50",
    pitch:
      "Season clásica con anti-hack, launcher y cash shop: lenguaje nostálgico con infra moderna.",
  },
  lineage2: {
    color: "from-indigo-600/30",
    accent: "text-indigo-400",
    border: "group-hover:border-indigo-500/50",
    pitch:
      "Chronicles y siege con geodata, rates claros y captación de GMs que buscan estabilidad.",
  },
  rust: {
    color: "from-red-600/30",
    accent: "text-red-400",
    border: "group-hover:border-red-500/50",
    pitch:
      "Wipes programados, Oxide y alertas Discord: conversión para comunidades survival exigentes.",
  },
  ark: {
    color: "from-teal-600/30",
    accent: "text-teal-400",
    border: "group-hover:border-teal-500/50",
    pitch:
      "Clusters y Workshop con backups de save: ideal para tribus PvE/PvP y admins de mods pesados.",
  },
  terraria: {
    color: "from-violet-600/30",
    accent: "text-violet-400",
    border: "group-hover:border-violet-500/50",
    pitch:
      "Co-op y tModLoader con worlds en la nube: tono accesible para grupos de amigos y streamers.",
  },
  palworld: {
    color: "from-cyan-600/30",
    accent: "text-cyan-400",
    border: "group-hover:border-cyan-500/50",
    pitch:
      "Dedicated co-op con saves protegidos y restarts: captación para comunidades Pal activas post-launch.",
  },
  streamer: {
    color: "from-violet-600/30",
    accent: "text-violet-400",
    border: "group-hover:border-violet-500/50",
    pitch:
      "Hub para streamers con overlays, donaciones y media kit: convierte viewers en sponsors y subs.",
  },
  youtuber: {
    color: "from-red-600/30",
    accent: "text-red-400",
    border: "group-hover:border-red-500/50",
    pitch:
      "Landing de canal con funnels de sponsors, lead magnets y biblioteca SEO para creadores long-form.",
  },
  tiktoker: {
    color: "from-cyan-600/30",
    accent: "text-cyan-300",
    border: "group-hover:border-cyan-400/50",
    pitch:
      "Link in bio mobile-first con UGC, formulario de marcas y tienda digital para creadores short-form.",
  },
  comunicadores: {
    color: "from-amber-600/30",
    accent: "text-amber-400",
    border: "group-hover:border-amber-500/50",
    pitch:
      "Sitio broadcast para podcasters y comunicadores: episodios, prensa, booking y sponsors en un solo hub.",
  },
  "taller-motos": {
    color: "from-orange-600/30",
    accent: "text-orange-400",
    border: "group-hover:border-orange-500/50",
    pitch:
      "Sitios para talleres de motos: turnos online, catálogo de repuestos, historial de service ",
  },
  celulares: {
    color: "from-blue-600/30",
    accent: "text-blue-400",
    border: "group-hover:border-blue-500/50",
    pitch:
      "E-commerce y local para casas de celulares: comparador de modelos, financiación, trade-in ",
  },
  almacen: {
    color: "from-amber-600/30",
    accent: "text-amber-400",
    border: "group-hover:border-amber-500/50",
    pitch:
      "Listas de precios, promos del día y pedidos por WhatsApp para almacenes de barrio. Simple,",
  },
  kiosco: {
    color: "from-yellow-600/30",
    accent: "text-yellow-400",
    border: "group-hover:border-yellow-500/50",
    pitch:
      "Micrositio para kioscos: combos, horario nocturno, delivery express y recargas. Ideal para",
  },
  libreria: {
    color: "from-amber-700/30",
    accent: "text-amber-300",
    border: "group-hover:border-amber-600/50",
    pitch:
      "Catálogo por curso, listas escolares descargables y reservas para librerías. Perfecto para",
  },
  bazar: {
    color: "from-pink-600/30",
    accent: "text-pink-400",
    border: "group-hover:border-pink-500/50",
    pitch:
      "Vitrina digital para bazares: temporada, regalería, decoración y ofertas por categoría. Co",
  },
  carniceria: {
    color: "from-red-600/30",
    accent: "text-red-400",
    border: "group-hover:border-red-500/50",
    pitch:
      "Menú de cortes, parrilleros, combos familiares y pedidos programados para carnicerías. Fot",
  },
  granja: {
    color: "from-green-600/30",
    accent: "text-green-400",
    border: "group-hover:border-green-500/50",
    pitch:
      "Sitios para granjas y productores: cajas semanales, suscripción, visitas educativas y vent",
  },
  computacion: {
    color: "from-cyan-600/30",
    accent: "text-cyan-400",
    border: "group-hover:border-cyan-500/50",
    pitch:
      "Armado de PCs, comparador de componentes, service técnico y financiación para casas de com",
  },
  ropa: {
    color: "from-fuchsia-600/30",
    accent: "text-fuchsia-400",
    border: "group-hover:border-fuchsia-500/50",
    pitch:
      "Lookbooks, filtros por talle, nueva colección y outlet para tiendas de ropa. Experiencia v",
  },
  supermercado: {
    color: "from-emerald-600/30",
    accent: "text-emerald-400",
    border: "group-hover:border-emerald-500/50",
    pitch:
      "Folletos digitales, ofertas por pasillo y pedidos programados para supermercados chicos y ",
  },
  barberia: {
    color: "from-slate-600/30",
    accent: "text-slate-300",
    border: "group-hover:border-slate-400/50",
    pitch:
      "Reservas online, barberos por estilo, membresía mensual y tienda de grooming para barbería",
  },
  marketing: {
    color: "from-violet-600/30",
    accent: "text-violet-400",
    border: "group-hover:border-violet-500/50",
    pitch:
      "Portfolios, casos de éxito, paquetes de servicios y funnels de leads para agencias de mark",
  },
  imprenta: {
    color: "from-indigo-600/30",
    accent: "text-indigo-400",
    border: "group-hover:border-indigo-500/50",
    pitch:
      "Cotizador online, catálogo de productos impresos y seguimiento de pedidos para imprentas. ",
  },
  motores: {
    color: "from-orange-700/30",
    accent: "text-orange-300",
    border: "group-hover:border-orange-600/50",
    pitch:
      "Landings para servicios de motores nafteros y diésel: diagnóstico, rectificación, garantía",
  },
  gasista: {
    color: "from-sky-600/30",
    accent: "text-sky-400",
    border: "group-hover:border-sky-500/50",
    pitch:
      "Sitios para gasistas matriculados: artefactos, certificaciones, zonas de cobertura y botón",
  },
  electricista: {
    color: "from-yellow-600/30",
    accent: "text-yellow-300",
    border: "group-hover:border-yellow-500/50",
    pitch:
      "Electricistas con portafolio de obras, presupuesto por foto y destacado de urgencias. Idea",
  },
  albanil: {
    color: "from-stone-600/30",
    accent: "text-stone-300",
    border: "group-hover:border-stone-400/50",
    pitch:
      "Portafolio de obras, presupuestos por metro cuadrado y testimonios para albañiles y equipo",
  },
  arquitectos: {
    color: "from-neutral-600/30",
    accent: "text-neutral-300",
    border: "group-hover:border-neutral-400/50",
    pitch:
      "Portfolios editoriales, procesos de diseño, renders y formulario de consulta para estudios",
  },
};

export function getShowcaseMeta(slug: string): ShowcaseCardMeta {
  const base = SHOWCASE_BY_SLUG[slug] ?? fallback;
  return {
    ...base,
    features: SHOWCASE_FEATURES[slug] ?? FALLBACK_SHOWCASE_FEATURES,
  };
}
