import {
  FALLBACK_SHOWCASE_FEATURES,
  SHOWCASE_FEATURES,
  type ShowcaseFeatures,
} from "@/lib/demo-showcase-features";
import { ANDREA_MARI_SLUG } from "@/lib/andrea-mari";
import { getRetailFashionConfig } from "@/lib/retail-fashion-demos";

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
  pitch:
    "Landing demo con módulos de conversión, galería, video, tienda y formulario — listos para adaptar a tu marca y rubro.",
};

type ShowcaseStyleMeta = Omit<ShowcaseCardMeta, "features">;

export const SHOWCASE_BY_SLUG: Record<string, ShowcaseStyleMeta> = {
  ferreteria: {
    color: "from-orange-600/30",
    accent: "text-orange-400",
    border: "group-hover:border-orange-500/50",
    pitch:
      "Ferretería del Oeste: catálogo con 2.000+ SKUs, stock por sucursal, envíos same-day y listas para obradores con cuenta corriente B2B.",
  },
  herreria: {
    color: "from-orange-600/35",
    accent: "text-orange-400",
    border: "group-hover:border-orange-500/50",
    pitch:
      "Forja Norte: fusión de hierro, madera noble y aluminio. Portones automatizados, parrillas integrales, mesas industriales y presupuesto con visita técnica en 48 h.",
  },
  restaurante: {

    color: "from-red-600/30",
    accent: "text-red-400",
    border: "group-hover:border-red-500/50",
    pitch:
      "La Mesa Norteña: carta digital con fotos de plato, reservas sin fricción, delivery por barrio y storytelling de sala que eleva el ticket.",
  },
  estetica: {

    color: "from-pink-600/30",
    accent: "text-pink-400",
    border: "group-hover:border-pink-500/50",
    pitch:
      "Aura Estética: turnos online, protocolos premium visibles, membresías y tienda home care con estética spa minimal.",
  },
  gimnasio: {

    color: "from-lime-600/30",
    accent: "text-lime-400",
    border: "group-hover:border-lime-500/50",
    pitch:
      "Pulse Cross: planes open gym y box, horarios en vivo, coaches destacados y shop de indumentaria para convertir visitas en socios.",
  },
  veterinaria: {

    color: "from-teal-600/30",
    accent: "text-teal-400",
    border: "group-hover:border-teal-500/50",
    pitch:
      "Patitas Sanas: guardia 24 h, vacunación, internación demo y pet shop integrado con recordatorios por WhatsApp.",
  },
  inmobiliaria: {

    color: "from-amber-600/30",
    accent: "text-amber-400",
    border: "group-hover:border-amber-500/50",
    pitch:
      "Horizonte Propiedades: fichas con datos verificables, tours virtuales, tasaciones online y captación de compradores calificados.",
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
      "Número Exacto: calendario AFIP/ARBA, balances para bancos, payroll outsourcing y videollamada de onboarding en 48 h.",
  },
  musica: {

    color: "from-purple-600/30",
    accent: "text-purple-400",
    border: "group-hover:border-purple-500/50",
    pitch:
      "Pentagrama: inscripciones por nivel, calendario de recitales, pagos online para familias y credenciales docentes visibles.",
  },
  detailing: {

    color: "from-blue-600/30",
    accent: "text-blue-400",
    border: "group-hover:border-blue-500/50",
    pitch:
      "Shine Autodetail: antes/después, paquetes cerámicos, coating y membresía mensual con reserva de slot online.",
  },
  panaderia: {

    color: "from-amber-600/30",
    accent: "text-amber-400",
    border: "group-hover:border-amber-500/50",
    pitch:
      "El Horno de Raíz: horno en vivo, encargues B2B, pedido anticipado y narrativa de masa madre que vende por aroma.",
  },
  viajes: {

    color: "from-cyan-600/30",
    accent: "text-cyan-400",
    border: "group-hover:border-cyan-500/50",
    pitch:
      "Atlas Experiencias: itinerarios a medida, MICE corporativo, seguro incluido y asesor humano visible en cada etapa.",
  },
  limpieza: {

    color: "from-indigo-600/30",
    accent: "text-indigo-400",
    border: "group-hover:border-indigo-500/50",
    pitch:
      "ProLimpio: propuestas B2B por m², certificaciones ISO demo, SLA de respuesta y vertical hotel/oficina/edificio.",
  },
  foto: {

    color: "from-yellow-600/25",
    accent: "text-amber-400",
    border: "group-hover:border-amber-500/50",
    pitch:
      "Lúmenes Estudio: packs corporativos y sociales, equipamiento listado, plazos claros y galería cinematográfica.",
  },
  optica: {

    color: "from-blue-600/30",
    accent: "text-blue-400",
    border: "group-hover:border-blue-500/50",
    pitch:
      "Visión Clara: examen visual, armazones premium, cristales progresivos y audiología con financiación transparente.",
  },
  heladeria: {

    color: "from-fuchsia-600/30",
    accent: "text-fuchsia-400",
    border: "group-hover:border-fuchsia-500/50",
    pitch:
      "Gelato Alborada: estaciones de sabor, eventos, franquicia demo y delivery nocturno con copy sensorial.",
  },
  lavadero: {

    color: "from-cyan-600/30",
    accent: "text-cyan-400",
    border: "group-hover:border-cyan-500/50",
    pitch:
      "Spin & Gloss: membresías sin fila, detailing express, flota PyME y app de reserva con ocupación en vivo.",
  },
  seguridad: {

    color: "from-emerald-600/30",
    accent: "text-emerald-400",
    border: "group-hover:border-emerald-500/50",
    pitch:
      "Vigilum Alarmas: diagramas de cobertura, botón de pánico, monitoreo 24/7 y bundles hogar/PyME sin jerga.",
  },
  yoga: {

    color: "from-violet-600/25",
    accent: "text-violet-500",
    border: "group-hover:border-violet-400/50",
    pitch:
      "Mat Lumen: estilos Hatha y Vinyasa, agenda mobile-first, packs corporativos y prueba de clase gratuita.",
  },
  hotel: {

    color: "from-amber-600/30",
    accent: "text-amber-400",
    border: "group-hover:border-amber-500/50",
    pitch:
      "Posada 9 Luces: suites boutique, spa 11–21 h, MICE hasta 12 pax y upsells de experiencias locales.",
  },
  catering: {

    color: "from-red-600/30",
    accent: "text-red-400",
    border: "group-hover:border-red-500/50",
    pitch:
      "Banquetes Origen: menús por persona, dietas visibles, producción en sitio y brief online para eventos B2B.",
  },
  paisajismo: {

    color: "from-green-600/30",
    accent: "text-green-400",
    border: "group-hover:border-green-500/50",
    pitch:
      "Verde Horizonte: diseño de jardín, riego inteligente, mantenimiento anual y portafolio antes/después.",
  },
  tattoo: {

    color: "from-rose-600/30",
    accent: "text-rose-400",
    border: "group-hover:border-rose-500/50",
    pitch:
      "Oráculo Ink Lab: flash book, lista de espera, políticas claras y galería de manga & piercing.",
  },
  cerrajeria: {

    color: "from-yellow-600/25",
    accent: "text-yellow-400",
    border: "group-hover:border-yellow-500/50",
    pitch:
      "Llaves 24 Sur: urgencias geolocalizadas, apertura sin daño, cerraduras smart y matrícula visible.",
  },
  coworking: {

    color: "from-sky-600/30",
    accent: "text-sky-400",
    border: "group-hover:border-sky-500/50",
    pitch:
      "Hub Muelle: day pass, salas con occupancy live, fibra dedicada y planes para equipos híbridos.",
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
      "Sitios para talleres de motos: turnos online, catálogo de repuestos, historial de service y presupuestos por WhatsApp. Pensado para captar clientes de barrio y delivery.",
  },
  celulares: {
    color: "from-blue-600/30",
    accent: "text-blue-400",
    border: "group-hover:border-blue-500/50",
    pitch:
      "E-commerce y local para casas de celulares: comparador de modelos, financiación, trade-in y garantía visible. Mobile-first para compras rápidas.",
  },
  almacen: {
    color: "from-amber-600/30",
    accent: "text-amber-400",
    border: "group-hover:border-amber-500/50",
    pitch:
      "Listas de precios, promos del día y pedidos por WhatsApp para almacenes de barrio. Simple, rápido y sin comisión innecesaria.",
  },
  kiosco: {
    color: "from-yellow-600/30",
    accent: "text-yellow-400",
    border: "group-hover:border-yellow-500/50",
    pitch:
      "Micrositio para kioscos: combos, horario nocturno, delivery express y recargas. Ideal para captar pedidos del barrio sin app propia.",
  },
  libreria: {
    color: "from-amber-700/30",
    accent: "text-amber-300",
    border: "group-hover:border-amber-600/50",
    pitch:
      "Catálogo por curso, listas escolares descargables y reservas para librerías. Perfecto para picos de inicio de clases y venta corporativa.",
  },
  bazar: {
    color: "from-pink-600/30",
    accent: "text-pink-400",
    border: "group-hover:border-pink-500/50",
    pitch:
      "Vitrina digital para bazares: temporada, regalería, decoración y ofertas por categoría. Conversión con WhatsApp y catálogo visual.",
  },
  carniceria: {
    color: "from-red-600/30",
    accent: "text-red-400",
    border: "group-hover:border-red-500/50",
    pitch:
      "Menú de cortes, parrilleros, combos familiares y pedidos programados para carnicerías. Fotos apetitosas y peso estimado en carrito demo.",
  },
  granja: {
    color: "from-green-600/30",
    accent: "text-green-400",
    border: "group-hover:border-green-500/50",
    pitch:
      "Sitios para granjas y productores: cajas semanales, suscripción, visitas educativas y venta directa sin intermediarios.",
  },
  computacion: {
    color: "from-cyan-600/30",
    accent: "text-cyan-400",
    border: "group-hover:border-cyan-500/50",
    pitch:
      "Armado de PCs, comparador de componentes, service técnico y financiación para casas de computación. Copy orientado a gamers y pymes.",
  },
  ropa: {
    color: "from-fuchsia-600/30",
    accent: "text-fuchsia-400",
    border: "group-hover:border-fuchsia-500/50",
    pitch:
      "Lookbooks, filtros por talle, nueva colección y outlet para tiendas de ropa. Experiencia visual tipo editorial con checkout demo.",
  },
  supermercado: {
    color: "from-emerald-600/30",
    accent: "text-emerald-400",
    border: "group-hover:border-emerald-500/50",
    pitch:
      "Folletos digitales, ofertas por pasillo y pedidos programados para supermercados chicos y medianos. Sin la complejidad de un e-commerce gigante.",
  },
  barberia: {
    color: "from-slate-600/30",
    accent: "text-slate-300",
    border: "group-hover:border-slate-400/50",
    pitch:
      "Reservas online, barberos por estilo, membresía mensual y tienda de grooming para barberías modernas. Estética urbana premium.",
  },
  marketing: {
    color: "from-violet-600/30",
    accent: "text-violet-400",
    border: "group-hover:border-violet-500/50",
    pitch:
      "Portfolios, casos de éxito, paquetes de servicios y funnels de leads para agencias de marketing. Posicionamiento premium B2B.",
  },
  imprenta: {
    color: "from-indigo-600/30",
    accent: "text-indigo-400",
    border: "group-hover:border-indigo-500/50",
    pitch:
      "Cotizador online, catálogo de productos impresos y seguimiento de pedidos para imprentas. Desde tarjetas hasta plotter.",
  },
  motores: {
    color: "from-orange-700/30",
    accent: "text-orange-300",
    border: "group-hover:border-orange-600/50",
    pitch:
      "Landings para servicios de motores nafteros y diésel: diagnóstico, rectificación, garantía y presupuestos técnicos con credibilidad industrial.",
  },
  gasista: {
    color: "from-sky-600/30",
    accent: "text-sky-400",
    border: "group-hover:border-sky-500/50",
    pitch:
      "Sitios para gasistas matriculados: artefactos, certificaciones, zonas de cobertura y botón de urgencia. Confianza y normativa visible.",
  },
  electricista: {
    color: "from-yellow-600/30",
    accent: "text-yellow-300",
    border: "group-hover:border-yellow-500/50",
    pitch:
      "Electricistas con portafolio de obras, presupuesto por foto y destacado de urgencias. Ideal para domicilios y locales comerciales.",
  },
  albanil: {
    color: "from-stone-600/30",
    accent: "text-stone-300",
    border: "group-hover:border-stone-400/50",
    pitch:
      "Portafolio de obras, presupuestos por metro cuadrado y testimonios para albañiles y equipos de reforma. Generá confianza antes de la visita.",
  },
  arquitectos: {
    color: "from-neutral-600/30",
    accent: "text-neutral-300",
    border: "group-hover:border-neutral-400/50",
    pitch:
      "Portfolios editoriales, procesos de diseño, renders y formulario de consulta para estudios de arquitectura. Estética minimal premium.",
  },
};

const ANDREA_MARI_SHOWCASE: ShowcaseCardMeta = {
  color: "from-fuchsia-600/35",
  accent: "text-fuchsia-300",
  border: "group-hover:border-fuchsia-400/50",
  pitch:
    "Showroom Andrea Mari: moda vibrante en talles reales, carrito con precios ARS → WhatsApp, feed Instagram y mapa en Ezeiza.",
  features: [
    "Carrito → WhatsApp con total ARS",
    "Talles reales · curva completa",
    "Feed Instagram (12 posts reales)",
    "Fotos reales del showroom",
    "Mapa Google del local",
    "Paleta fucsia · dorado · océano",
    "Categorías y lookbook",
    "Envíos a todo el país",
    "Formulario de leads demo",
  ],
};

export function getShowcaseMeta(slug: string): ShowcaseCardMeta {
  if (slug === ANDREA_MARI_SLUG) return ANDREA_MARI_SHOWCASE;

  const fashion = getRetailFashionConfig(slug);
  if (fashion) {
    return {
      color: "from-zinc-500/25",
      accent: "text-zinc-200",
      border: "group-hover:border-white/40",
      pitch: fashion.showcasePitch,
      features: fashion.showcaseFeatures,
    };
  }
  const base = SHOWCASE_BY_SLUG[slug] ?? fallback;
  return {
    ...base,
    features: SHOWCASE_FEATURES[slug] ?? FALLBACK_SHOWCASE_FEATURES,
  };
}
