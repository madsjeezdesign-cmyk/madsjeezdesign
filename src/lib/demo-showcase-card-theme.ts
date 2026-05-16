/** Etiquetas cortas y subtítulos premium para cartillas del índice /demos. */

export type ShowcaseCardTheme = {
  badge: string;
  subtitle: string;
  accentHex: string;
  accentGlow: string;
  /** Texto oscuro en botón primario (ej. amber) */
  primaryBtnDarkText?: boolean;
};

function glow(hex: string, alpha = 0.12): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const themes: Record<string, Omit<ShowcaseCardTheme, "accentHex" | "accentGlow">> = {
  ferreteria: { badge: "Ferretería del Oeste", subtitle: "Stock · envíos · B2B", primaryBtnDarkText: true },
  herreria: { badge: "Forja Premium", subtitle: "Obras y presupuesto online", primaryBtnDarkText: true },
  restaurante: { badge: "La Mesa Norteña", subtitle: "Reservas · carta · delivery" },
  estetica: { badge: "Aura Estética", subtitle: "Turnos · protocolos spa" },
  gimnasio: { badge: "Pulse Cross", subtitle: "Planes · comunidad" },
  veterinaria: { badge: "Patitas Sanas", subtitle: "Guardia · pet shop" },
  inmobiliaria: { badge: "Horizonte", subtitle: "Tasaciones · fichas premium" },
  tech: { badge: "Vanguardia OS", subtitle: "Infra & IA soberana" },
  floreria: { badge: "Jardín Ensueño", subtitle: "Florería & vivero" },
  taller: { badge: "Motor Dynamics", subtitle: "Tuning & diagnóstico" },
  abogados: { badge: "Varela & Asoc.", subtitle: "Estudio jurídico elite" },
  farmacia: { badge: "Medical Hub", subtitle: "Galénica 24/7" },
  odontologia: { badge: "Dental Elite", subtitle: "Galénica" },
  contadores: { badge: "Número Exacto", subtitle: "AFIP · balances · PyME" },
  musica: { badge: "Pentagrama", subtitle: "Inscripciones · recitales" },
  detailing: { badge: "Shine Autodetail", subtitle: "Coating · membresía" },
  panaderia: { badge: "El Horno de Raíz", subtitle: "Masa madre · encargues" },
  viajes: { badge: "Atlas Experiencias", subtitle: "MICE · itinerarios" },
  limpieza: { badge: "ProLimpio", subtitle: "B2B · SLA · certificaciones" },
  foto: { badge: "Lúmenes Estudio", subtitle: "Corporativo · social" },
  optica: { badge: "Visión Clara", subtitle: "Examen · armazones" },
  heladeria: { badge: "Gelato Lab", subtitle: "Temporada y delivery" },
  lavadero: { badge: "Wash Tech", subtitle: "Alto volumen" },
  seguridad: { badge: "Secure IoT", subtitle: "Monitoreo 24/7" },
  yoga: { badge: "Wellness", subtitle: "Studio híbrido" },
  hotel: { badge: "Boutique", subtitle: "Hospitalidad editorial" },
  catering: { badge: "Events B2B", subtitle: "Producción en sitio" },
  paisajismo: { badge: "Green Pro", subtitle: "Diseño + mantenimiento" },
  tattoo: { badge: "Ink Studio", subtitle: "Galería creativa" },
  cerrajeria: { badge: "Access Tech", subtitle: "Urgencias 24 h" },
  coworking: { badge: "Flex Space", subtitle: "Equipos híbridos" },
  minecraft: { badge: "Game Host", subtitle: "Modpacks & Java" },
  roblox: { badge: "Experience", subtitle: "Escalado RP" },
  cs2: { badge: "128 Tick", subtitle: "Competitivo" },
  fivem: { badge: "FiveM RP", subtitle: "Economía seria" },
  muonline: { badge: "Legacy MMORPG", subtitle: "Season custom" },
  lineage2: { badge: "Chronicle", subtitle: "Mid-rate estable" },
  rust: { badge: "Survival", subtitle: "Wipes & Oxide" },
  ark: { badge: "Cluster", subtitle: "Workshop ASA" },
  terraria: { badge: "tModLoader", subtitle: "Co-op worlds" },
  palworld: { badge: "Dedicated", subtitle: "Co-op pals" },
  streamer: { badge: "Live", subtitle: "Twitch & Kick" },
  youtuber: { badge: "Studio", subtitle: "Long-form" },
  tiktoker: { badge: "Viral", subtitle: "Short-form" },
  comunicadores: { badge: "On air", subtitle: "Podcast & prensa" },
  "taller-motos": { badge: "MotoForge", subtitle: "Turnos · repuestos · service" },
  celulares: { badge: "CellPoint", subtitle: "Catálogo · financiación · trade-in" },
  almacen: { badge: "Depósito Norte", subtitle: "Promos · delivery barrio" },
  kiosco: { badge: "Kiosko 24", subtitle: "Combos · recargas · noche" },
  libreria: { badge: "Página & Tinta", subtitle: "Listas escolares · reservas" },
  bazar: { badge: "Bazar Central", subtitle: "Temporada · regalería" },
  carniceria: { badge: "Cortes Don Juan", subtitle: "Cortes · parrilla · pedidos" },
  granja: { badge: "Campo Vivo", subtitle: "Cajas · visitas · directo" },
  computacion: { badge: "ChipHouse", subtitle: "Armado · service · gamers" },
  ropa: { badge: "Urbana Moda", subtitle: "Lookbook · outlet · talles" },
  supermercado: { badge: "Mercado Familiar", subtitle: "Ofertas · folleto digital" },
  barberia: { badge: "The Fade Club", subtitle: "Reservas · membresía" },
  marketing: { badge: "Pulse Agency", subtitle: "Casos · funnels B2B" },
  imprenta: { badge: "PrintLab", subtitle: "Cotizador · plotter" },
  motores: { badge: "MotorTech", subtitle: "Rectificación · diagnóstico" },
  gasista: { badge: "GasSeguro", subtitle: "Matrícula · urgencias" },
  electricista: { badge: "VoltPro", subtitle: "Obras · presupuesto foto" },
  albanil: { badge: "AlbaPro", subtitle: "Reformas · m² claro" },
  arquitectos: { badge: "Línea Estudio", subtitle: "Renders · consulta" },
};

export function getShowcaseCardTheme(slug: string, accentHex: string): ShowcaseCardTheme {
  const t = themes[slug] ?? {
    badge: "Demo Pro",
    subtitle: "Landing optimizada",
  };
  return {
    ...t,
    accentHex,
    accentGlow: glow(accentHex),
  };
}
