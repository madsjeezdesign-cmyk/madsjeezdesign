/**
 * Demos de landings por rubro — rutas /demos/[slug].
 * Índice en /demos (sin enlace obligatorio desde la home).
 */

export type DemoMeta = {
  slug: string;
  title: string;
  industry: string;
  tagline: string;
  accent: string;
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
  {
    slug: "farmacia",
    title: "Farmacia Del Parque",
    industry: "Farmacia & salud",
    tagline: "Turno electrónico, obras sociales y delivery",
    accent: "#22c55e",
    previewClass: "from-emerald-950 to-green-900",
  },
  {
    slug: "odontologia",
    title: "Sonrisa Studio Dental",
    industry: "Odontología & implantes",
    tagline: "Diagnóstico digital, financiación y urgencias",
    accent: "#38bdf8",
    previewClass: "from-sky-950 to-cyan-950",
  },
  {
    slug: "contadores",
    title: "Número Exacto",
    industry: "Estudio contable & impuestos",
    tagline: "Monotributo, PyME y auditorías",
    accent: "#94a3b8",
    previewClass: "from-slate-900 to-slate-950",
  },
  {
    slug: "musica",
    title: "Pentagrama",
    industry: "Escuela de música",
    tagline: "Instrumentos, ensamble y examen Trinity demo",
    accent: "#c084fc",
    previewClass: "from-violet-950 to-fuchsia-950/50",
  },
  {
    slug: "detailing",
    title: "Shine Autodetail",
    industry: "Detailing & protección cerámica",
    tagline: "Pulido, PPF y tratamiento de interiores",
    accent: "#38bdf8",
    previewClass: "from-slate-950 to-blue-950/40",
  },
  {
    slug: "panaderia",
    title: "El Horno de Raíz",
    industry: "Panadería & café de especialidad",
    tagline: "Masa madre, pastelería y pedidos corporativos",
    accent: "#eab308",
    previewClass: "from-amber-950 to-orange-950/40",
  },
  {
    slug: "viajes",
    title: "Atlas Experiencias",
    industry: "Agencia de viajes & eventos",
    tagline: "Aéreos, cruceros y viajes a medida",
    accent: "#2dd4bf",
    previewClass: "from-teal-950 to-indigo-950/60",
  },
  {
    slug: "limpieza",
    title: "ProLimpio",
    industry: "Limpieza & facility",
    tagline: "Edificios, clínicas y plantas industriales demo",
    accent: "#818cf8",
    previewClass: "from-indigo-950 to-slate-900",
  },
  {
    slug: "foto",
    title: "Lúmenes Estudio",
    industry: "Fotografía & video comercial",
    tagline: "Producto, corporativo y cobertura de eventos",
    accent: "#f59e0b",
    previewClass: "from-zinc-900 to-amber-950/30",
  },
  {
    slug: "optica",
    title: "Visión Clara",
    industry: "Óptica & audiología",
    tagline: "Examen visual, lentes progresivos y audífonos",
    accent: "#60a5fa",
    previewClass: "from-blue-950 to-slate-950",
  },
];

export const DEMO_SLUGS = DEMOS.map((d) => d.slug);

export function getDemoBySlug(slug: string): DemoMeta | undefined {
  return DEMOS.find((d) => d.slug === slug);
}
