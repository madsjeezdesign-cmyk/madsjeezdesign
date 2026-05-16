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
  ferreteria: { badge: "Retail Pro", subtitle: "Arquitectura de alta carga", primaryBtnDarkText: true },
  restaurante: { badge: "Gourmet Tech", subtitle: "Experiencia de elite" },
  estetica: { badge: "Beauty Cloud", subtitle: "Minimalismo de lujo" },
  gimnasio: { badge: "Performance", subtitle: "Conversión deportiva" },
  veterinaria: { badge: "Pet Care", subtitle: "Clínica + retail" },
  inmobiliaria: { badge: "Luxury RE", subtitle: "Portfolio premium" },
  tech: { badge: "Vanguardia OS", subtitle: "Infra & IA soberana" },
  floreria: { badge: "Jardín Ensueño", subtitle: "Florería & vivero" },
  taller: { badge: "Motor Dynamics", subtitle: "Tuning & diagnóstico" },
  abogados: { badge: "Varela & Asoc.", subtitle: "Estudio jurídico elite" },
  farmacia: { badge: "Medical Hub", subtitle: "Galénica 24/7" },
  odontologia: { badge: "Dental Elite", subtitle: "Galénica" },
  contadores: { badge: "Finance Hub", subtitle: "PyME sin fricción" },
  musica: { badge: "Academy", subtitle: "Inscripción digital" },
  detailing: { badge: "Auto Spa", subtitle: "Alto valor percibido" },
  panaderia: { badge: "Artisan", subtitle: "Marca sensorial" },
  viajes: { badge: "Travel OS", subtitle: "Itinerarios a medida" },
  limpieza: { badge: "Facility B2B", subtitle: "Operación certificada" },
  foto: { badge: "Studio Pro", subtitle: "Producción visual" },
  optica: { badge: "Vision Care", subtitle: "Salud visual" },
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
  "taller-motos": { badge: "Service", subtitle: "Motos" },
  celulares: { badge: "Tech", subtitle: "Celulares" },
  almacen: { badge: "Barrio", subtitle: "Almacén" },
  kiosco: { badge: "24h", subtitle: "Kiosco" },
  libreria: { badge: "Escolar", subtitle: "Librería" },
  bazar: { badge: "Hogar", subtitle: "Bazar" },
  carniceria: { badge: "Fresh", subtitle: "Carnicería" },
  granja: { badge: "Agro", subtitle: "Granja" },
  computacion: { badge: "PC", subtitle: "Computación" },
  ropa: { badge: "Moda", subtitle: "Indumentaria" },
  supermercado: { badge: "Súper", subtitle: "Góndola" },
  barberia: { badge: "Fade", subtitle: "Barbería" },
  marketing: { badge: "Growth", subtitle: "Agencia" },
  imprenta: { badge: "Print", subtitle: "Gráfica" },
  motores: { badge: "Motor", subtitle: "Rectificación" },
  gasista: { badge: "Gas", subtitle: "Matriculado" },
  electricista: { badge: "Volt", subtitle: "Electricidad" },
  albanil: { badge: "Obra", subtitle: "Reformas" },
  arquitectos: { badge: "Studio", subtitle: "Arquitectura" },
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
