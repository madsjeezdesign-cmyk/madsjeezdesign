/** Configuración por plataforma para landings de creadores y comunicadores. */

export type CreatorPlan = {
  name: string;
  /** Primera línea del plan (entregable principal). */
  ram: string;
  /** Segunda línea (alcance / frecuencia). */
  slots: string;
  /** Tercera línea (extras). */
  storage: string;
  price: string;
  popular?: boolean;
};

export type CreatorDemoConfig = {
  slug: string;
  brand: string;
  platformLabel: string;
  industryLabel: string;
  accent: string;
  heroKicker: string;
  heroTitle: string;
  heroHighlight: string;
  heroSub: string;
  statLive: string;
  statFollowers: string;
  statEngagement: string;
  plans: CreatorPlan[];
  features: readonly string[];
  integrations: readonly string[];
  platforms: readonly string[];
  faq: readonly { q: string; a: string }[];
};

export const CREATOR_DEMOS: CreatorDemoConfig[] = [
  {
    slug: "streamer",
    brand: "NeoStream",
    platformLabel: "Twitch & Kick",
    industryLabel: "Streamer · gaming & IRL",
    accent: "#9146ff",
    heroKicker: "Overlay pack · panels · alerts",
    heroTitle: "Tu canal",
    heroHighlight: "en vivo.",
    heroSub:
      "Landings para streamers: overlays, bot de moderación, página de donaciones, media kit y calendario de collabs. Todo listo para monetizar sin perder estética.",
    statLive: "EN VIVO",
    statFollowers: "18.4k viewers",
    statEngagement: "Subs + bits",
    plans: [
      { name: "Starter", ram: "Landing + links", slots: "3 overlays", storage: "Panel básico", price: "$24.900" },
      { name: "Creator", ram: "Media kit PDF", slots: "Alerts Pro", popular: true, storage: "Bot mods demo", price: "$48.500" },
      { name: "Partner", ram: "Página sponsors", slots: "VOD hub", storage: "Shop merch", price: "$89.000" },
    ],
    features: [
      "Overlay OBS / Streamlabs",
      "Página de donaciones",
      "Media kit descargable",
      "Calendario de streams",
      "Bot moderación Discord",
      "Panel de sponsors",
    ],
    integrations: ["Streamlabs", "StreamElements", "Ko-fi", "Discord", "Spotify", "Nightbot"],
    platforms: ["Twitch", "Kick", "YouTube Live", "Discord"],
    faq: [
      { q: "¿Incluye diseño de emotes?", a: "En plan Partner podés sumar pack de emotes demo con guía de subida a Twitch." },
      { q: "¿Puedo vender merch?", a: "Sí, integramos catálogo demo con Printful o tu proveedor." },
    ],
  },
  {
    slug: "youtuber",
    brand: "FrameLab",
    platformLabel: "YouTube",
    industryLabel: "Creador long-form",
    accent: "#ff0000",
    heroKicker: "Thumbnails · funnels · sponsors",
    heroTitle: "Tu marca",
    heroHighlight: "en frame.",
    heroSub:
      "Sitios para YouTubers con funnels de sponsors, biblioteca de videos, lead magnets y página de membresías. Pensado para conversión y SEO de canal.",
    statLive: "Nuevo video",
    statFollowers: "240k subs",
    statEngagement: "CTR 8.2%",
    plans: [
      { name: "Solo", ram: "Landing canal", slots: "5 thumbs/mes", storage: "Link bio", price: "$32.000" },
      { name: "Studio", ram: "Media kit + rates", slots: "Página sponsors", popular: true, storage: "Newsletter", price: "$58.000" },
      { name: "Network", ram: "Multi-canal", slots: "Course hub", storage: "Team access", price: "$112.000" },
    ],
    features: [
      "Grid de videos destacados",
      "Página media kit sponsors",
      "Captura emails lead magnet",
      "Tarifas y CTA a agents",
      "Blog / comunidad",
      "Analytics demo integrado",
    ],
    integrations: ["YouTube API", "Patreon", "Beehiiv", "Notion", "Calendly", "Stripe"],
    platforms: ["YouTube", "Shorts", "Instagram", "X", "LinkedIn"],
    faq: [
      { q: "¿SEO para videos?", a: "Plantillas de landing optimizadas para keywords de tu nicho y schema de canal." },
      { q: "¿Página de cursos?", a: "Plan Network incluye hub de productos digitales con checkout demo." },
    ],
  },
  {
    slug: "tiktoker",
    brand: "ViralPulse",
    platformLabel: "TikTok & Reels",
    industryLabel: "Short-form · viral",
    accent: "#25f4ee",
    heroKicker: "Link in bio · UGC · brands",
    heroTitle: "Tu feed",
    heroHighlight: "convierte.",
    heroSub:
      "Experiencias mobile-first para TikTokers: link in bio con métricas, press kit UGC, formulario de marcas y tienda de presets digitales.",
    statLive: "Trending",
    statFollowers: "1.2M followers",
    statEngagement: "UGC ready",
    plans: [
      { name: "Bio", ram: "Link in bio pro", slots: "3 bloques UGC", storage: "Preset LUT demo", price: "$19.800" },
      { name: "Creator", ram: "Press kit web", slots: "Form marcas", popular: true, storage: "Shop digital", price: "$42.000" },
      { name: "Agency", ram: "Multi-creador", slots: "CRM collabs", storage: "White-label", price: "$78.000" },
    ],
    features: [
      "Link in bio animado",
      "Stats sociales en vivo",
      "Formulario UGC marcas",
      "Tienda presets / ebooks",
      "Galería de mejor video",
      "WhatsApp CTA",
    ],
    integrations: ["TikTok", "Instagram", "CapCut", "Stan Store", "Whatsapp", "Mailchimp"],
    platforms: ["TikTok", "Reels", "Shorts", "Snapchat"],
    faq: [
      { q: "¿Sirve para marcas?", a: "Incluimos página de rates UGC y formulario brief para agencias." },
      { q: "¿Mobile first?", a: "100%: probamos en iOS/Android antes de entregar." },
    ],
  },
  {
    slug: "comunicadores",
    brand: "OnAir Media",
    platformLabel: "Podcast & radio",
    industryLabel: "Comunicadores · prensa",
    accent: "#f59e0b",
    heroKicker: "Podcast · conferencias · prensa",
    heroTitle: "Tu voz",
    heroHighlight: "con autoridad.",
    heroSub:
      "Sitios para podcasters, conductores y comunicadores: episodios, prensa, booking de charlas, sponsors y newsletter. Estética broadcast premium.",
    statLive: "On air",
    statFollowers: "45k oyentes",
    statEngagement: "Top 50 charts",
    plans: [
      { name: "Show", ram: "Landing podcast", slots: "Feed RSS", storage: "Press page", price: "$36.000" },
      { name: "Host", ram: "Booking charlas", slots: "Media kit audio", popular: true, storage: "Newsletter", price: "$64.000" },
      { name: "Network", ram: "Multi-programa", slots: "Red de shows", storage: "Portal sponsors", price: "$118.000" },
    ],
    features: [
      "Reproductor episodios",
      "Página prensa / EPK",
      "Formulario booking",
      "Sponsors y partners",
      "Transcripciones SEO",
      "Suscripción email",
    ],
    integrations: ["Spotify", "Apple Podcasts", "YouTube", "Riverside", "Descript", "Calendly"],
    platforms: ["Spotify", "Apple", "YouTube", "Radio", "LinkedIn"],
    faq: [
      { q: "¿Importa mi RSS?", a: "Conectamos feed demo y diseñamos archivo por temporada." },
      { q: "¿Prensa y TV?", a: "Incluimos sección media con fotos, bio y contacto booker." },
    ],
  },
];

export const CREATOR_SLUGS = CREATOR_DEMOS.map((d) => d.slug);

export function getCreatorConfig(slug: string): CreatorDemoConfig | undefined {
  return CREATOR_DEMOS.find((d) => d.slug === slug);
}
