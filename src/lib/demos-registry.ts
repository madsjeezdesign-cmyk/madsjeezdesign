/**
 * Demos de landings por rubro — rutas /demos/[slug].
 * No enlazadas desde la landing principal (acceso directo o desde este índice).
 */

export type DemoMeta = {
  slug: string;
  title: string;
  industry: string;
  tagline: string;
  accent: string;
  /** Clase Tailwind para preview card en índice */
  previewClass: string;
};

export const DEMOS: DemoMeta[] = [
  {
    slug: "ferreteria",
    title: "Ferretería del Oeste",
    industry: "Ferretería & construcción",
    tagline: "Stock real, envíos y retiro en el día",
    accent: "#ea580c",
    previewClass: "from-zinc-900 to-orange-950",
  },
  {
    slug: "restaurante",
    title: "La Mesa Norteña",
    industry: "Restaurante & bar",
    tagline: "Reservas, carta y delivery en un click",
    accent: "#9f1239",
    previewClass: "from-rose-950 to-amber-950",
  },
  {
    slug: "estetica",
    title: "Aura Estética",
    industry: "Salón & spa",
    tagline: "Turnos online y promos por WhatsApp",
    accent: "#d4af37",
    previewClass: "from-stone-900 to-rose-900/40",
  },
  {
    slug: "gimnasio",
    title: "Pulse Cross",
    industry: "Gimnasio & box",
    tagline: "Planes, horarios y comunidad",
    accent: "#bef264",
    previewClass: "from-zinc-950 to-lime-950/50",
  },
  {
    slug: "veterinaria",
    title: "Patitas Sanas",
    industry: "Veterinaria & pet shop",
    tagline: "Guardia, vacunas y tienda de mascotas",
    accent: "#14b8a6",
    previewClass: "from-teal-950 to-cyan-900",
  },
  {
    slug: "inmobiliaria",
    title: "Horizonte Propiedades",
    industry: "Inmobiliaria",
    tagline: "Tasaciones y portfolio premium",
    accent: "#c5a572",
    previewClass: "from-slate-950 to-slate-800",
  },
  {
    slug: "tech",
    title: "NexoLab Software",
    industry: "SaaS & tecnología",
    tagline: "Producto digital con trial y demos",
    accent: "#a78bfa",
    previewClass: "from-slate-950 via-violet-950/40 to-slate-950",
  },
  {
    slug: "floreria",
    title: "Jardín Urbano",
    industry: "Florería & eventos",
    tagline: "Ramos, bodas y suscripciones",
    accent: "#f472b6",
    previewClass: "from-emerald-950 to-pink-950/50",
  },
  {
    slug: "taller",
    title: "Garage 27",
    industry: "Taller mecánico",
    tagline: "Turnos, diagnóstico y presupuesto",
    accent: "#ef4444",
    previewClass: "from-zinc-950 to-red-950/60",
  },
  {
    slug: "abogados",
    title: "Bravo & Asociados",
    industry: "Estudio jurídico",
    tagline: "Áreas de práctica y consulta inicial",
    accent: "#e2c77c",
    previewClass: "from-neutral-950 to-amber-950/30",
  },
];

export const DEMO_SLUGS = DEMOS.map((d) => d.slug);

export function getDemoBySlug(slug: string): DemoMeta | undefined {
  return DEMOS.find((d) => d.slug === slug);
}
