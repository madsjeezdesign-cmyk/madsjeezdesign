export const site = {
  name: "MadsJeez Design",
  tagline:
    "Páginas web, tiendas online, sistemas a medida y mantenimiento. Zona Sur y todo el país.",
  email: "madsjeezdesign@gmail.com",
  /** Para WhatsApp: 549 + área sin 0 + número */
  phoneDisplay: "11 2181-6064",
  phoneTel: "+541121816064",
  whatsapp: "https://wa.me/5491121816064",
  siteUrl: "https://madsjeezdesign.com",
  /** Trayectoria (mostrada en layout y sitio) */
  foundedYear: 2009,
  activeYear: 2026,
  experienceLabel: "2009—2026",
  address: {
    street: "Vigil 150",
    locality: "Carlos Spegazzini",
    partido: "Partido de Ezeiza",
    province: "Buenos Aires",
    country: "Argentina",
    /** Referencia aproximada para mapas */
    mapsQuery: "Vigil 150, Carlos Spegazzini, Buenos Aires",
  },
  hours: "Lunes a sábado · 10:00 a 20:00 hs",
};

export const yearsExperience = site.activeYear - site.foundedYear;

/** Qué hacemos: texto claro para la landing (Hyperlabs) */
export const whatWeDo = {
  headline:
    "Somos un estudio que programa y diseña tu presencia digital de punta a punta.",
  paragraphs: [
    "Hacemos sitios profesionales que explican bien tu negocio y generan consultas: landings, webs corporativas, catálogos, portfolios y tiendas online con pagos (Mercado Pago, Stripe u otros).",
    "También desarrollamos paneles de administración, turneros, integraciones con WhatsApp, ERPs y automatizaciones para que vendas y gestiones sin depender solo de planillas o redes sociales.",
    "Te acompañamos con dominio, hosting, SEO técnico básico y soporte cuando lo necesités. Laburamos con código moderno para que tu web cargue rápido y sea fácil de mantener.",
  ],
};

export const portfolioSites = [
  {
    title: "Landing promocional",
    category: "Landing",
    description:
      "Página de campaña con formulario, CTA y seguimiento. Lista para ads y redes.",
    tag: "Next.js",
    href: "#trabajos",
    status: "disponible" as const,
  },
  {
    title: "Sitio corporativo servicios",
    category: "Corporativo",
    description:
      "Secciones de servicios, equipo y contacto. Diseño sobrio y carga veloz.",
    tag: "React · SEO",
    href: "#trabajos",
    status: "consultar" as const,
  },
  {
    title: "Catálogo + WhatsApp",
    category: "Comercio",
    description:
      "Listado de productos con filtros y botón directo a WhatsApp para pedidos.",
    tag: "Mobile-first",
    href: "#trabajos",
    status: "disponible" as const,
  },
  {
    title: "Tienda con checkout",
    category: "E-commerce",
    description:
      "Carrito, pagos y panel de pedidos. Integración Mercado Pago / Stripe según proyecto.",
    tag: "E-commerce",
    href: "#trabajos",
    status: "consultar" as const,
  },
  {
    title: "Portfolio creativo",
    category: "Portfolio",
    description:
      "Galerías y casos para fotógrafos, estudios o profesionales independientes.",
    tag: "UI · Motion",
    href: "#trabajos",
    status: "disponible" as const,
  },
  {
    title: "Reservas y turnos",
    category: "Sistema",
    description:
      "Agenda online con confirmaciones. Ideal para servicios y consultorios.",
    tag: "Full stack",
    href: "#trabajos",
    status: "consultar" as const,
  },
];

export const websiteModels = [
  {
    id: "presencia",
    name: "Presencia",
    subtitle: "Empezá bien en internet",
    priceNote: "Consultar presupuesto",
    features: [
      "Hasta 5 secciones (inicio, servicios, nosotros, galería, contacto)",
      "Formulario de contacto y enlaces a WhatsApp / redes",
      "Diseño responsive y optimización básica de velocidad",
      "Dominio y puesta online asesorados",
    ],
    idealFor: "Profesionales, rubros locales y marcas que recién empiezan.",
  },
  {
    id: "negocio",
    name: "Negocio",
    subtitle: "Convertir visitas en clientes",
    priceNote: "Consultar presupuesto",
    features: [
      "Todo lo del modelo Presencia + más páginas o integraciones",
      "Blog o noticias, multi-idioma a pedido",
      "SEO técnico ampliado, analytics y objetivos de conversión",
      "CMS o panel liviano para que actualices textos e imágenes",
    ],
    idealFor: "Pymes, estudio de servicios y comercios que ya venden offline.",
  },
  {
    id: "tienda",
    name: "Tienda",
    subtitle: "Vendé online con carrito y pagos",
    priceNote: "Consultar presupuesto",
    features: [
      "Catálogo, carrito, stock y órdenes",
      "Pasarelas: Mercado Pago, Stripe u otras según necesidad",
      "Envíos y descuentos según alcance del proyecto",
      "Capacitación breve para cargar productos",
    ],
    idealFor: "Retail, mayoristas y emprendimientos con volumen de pedidos.",
  },
  {
    id: "a-medida",
    name: "A medida",
    subtitle: "Sistemas y aplicaciones web",
    priceNote: "Presupuesto por alcance",
    features: [
      "Dashboards, reportes, roles de usuario y APIs",
      "Integraciones: facturación, CRM, Mercado Libre, etc.",
      "Base de datos, deploy y mantenimiento acordado",
      "Documentación y entregas por etapas",
    ],
    idealFor: "Empresas que necesitan software propio, no solo una web estática.",
  },
];

export const stats = [
  { value: `${site.activeYear - site.foundedYear}+`, label: "Años de experiencia" },
  { value: "100%", label: "Código y diseño a medida" },
  { value: "Lun—Sáb", label: "10—20 hs atención" },
  { value: "GBA Sur", label: "Carlos Spegazzini · Ezeiza" },
];

export const services = [
  {
    title: "Páginas y landings",
    description:
      "Webs que cuentan qué ofrecés y llevan al cliente a escribirte o comprar. Ideal para campañas y lanzamientos.",
    highlights: ["Rápidas", "Mobile-first", "Formularios y WhatsApp"],
  },
  {
    title: "Sitios corporativos",
    description:
      "Presencia seria para tu empresa: servicios, casos, equipo y contacto claro.",
    highlights: ["SEO", "Mantenimiento", "Dominio y hosting"],
  },
  {
    title: "Tiendas online",
    description:
      "E-commerce con carrito, pagos con Mercado Pago u otros y gestión de pedidos.",
    highlights: ["Catálogo", "Pagos", "Panel de ventas"],
  },
  {
    title: "Portfolios y marcas",
    description:
      "Mostrá trabajos, proyectos o catálogo visual con una estética alineada a tu marca.",
    highlights: ["Galerías", "Branding web", "Velocidad"],
  },
  {
    title: "Sistemas y apps web",
    description:
      "Reservas, turneros, paneles internos, reportes y lo que tu operación necesite en el navegador.",
    highlights: ["TypeScript", "APIs", "Bases de datos"],
  },
  {
    title: "Integraciones",
    description:
      "Conectamos tu web con herramientas que ya usás: envíos, facturación, stock, redes.",
    highlights: ["Webhooks", "Automatización", "Soporte"],
  },
];

export const technologies = [
  { name: "TypeScript", category: "Lenguaje" },
  { name: "JavaScript", category: "Lenguaje" },
  { name: "Python", category: "Lenguaje" },
  { name: "HTML / CSS", category: "Web" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Vue.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Datos" },
  { name: "MongoDB", category: "Datos" },
  { name: "Supabase", category: "Backend / BaaS" },
  { name: "Prisma", category: "ORM" },
  { name: "REST & GraphQL", category: "APIs" },
  { name: "Mercado Pago", category: "Pagos" },
  { name: "Stripe", category: "Pagos" },
  { name: "Docker", category: "Deploy" },
  { name: "Railway / Vercel", category: "Cloud" },
  { name: "WordPress", category: "CMS" },
  { name: "Shopify", category: "E-commerce" },
  { name: "React Native", category: "Mobile" },
];

export const process = [
  {
    step: "01",
    title: "Escuchamos",
    description:
      "Nos contás qué vendés, a quién y qué querés lograr con la web o el sistema.",
  },
  {
    step: "02",
    title: "Propuesta",
    description:
      "Te pasamos alcance, tiempos y presupuesto claro antes de arrancar.",
  },
  {
    step: "03",
    title: "Diseño y desarrollo",
    description:
      "Implementamos con revisiones; ves avances reales durante el proyecto.",
  },
  {
    step: "04",
    title: "Publicación y soporte",
    description:
      "Te dejamos online, capacitamos si hace falta y damos soporte acordado.",
  },
];

export const cases = [
  {
    client: "Ferretería El Tornillo",
    industry: "Comercio local",
    result: "+180% consultas por WhatsApp",
    period: "3 meses",
    description:
      "Landing con catálogo destacado y botón de contacto directo. Pasaron de depender del local físico a recibir pedidos todos los días.",
    metrics: [
      { label: "Consultas/mes", before: "42", after: "118" },
      { label: "Tasa rebote", before: "68%", after: "31%" },
    ],
    tags: ["Next.js", "SEO local", "WhatsApp"],
  },
  {
    client: "Boutique Alma",
    industry: "Moda & retail",
    result: "2.400 pedidos el primer año",
    period: "12 meses",
    description:
      "Tienda online con carrito, Mercado Pago y gestión de stock. Integración con Instagram Shopping para vender donde ya tenían audiencia.",
    metrics: [
      { label: "Conversión", before: "—", after: "3.2%" },
      { label: "Ticket promedio", before: "—", after: "$18.500" },
    ],
    tags: ["E-commerce", "Mercado Pago", "Panel admin"],
  },
  {
    client: "Clínica Dental Sonrisa",
    industry: "Salud",
    result: "−40% llamadas perdidas",
    period: "6 meses",
    description:
      "Sistema de turnos online con recordatorios por email. Los pacientes reservan a cualquier hora sin saturar la recepción.",
    metrics: [
      { label: "Turnos online", before: "0%", after: "72%" },
      { label: "No-shows", before: "18%", after: "9%" },
    ],
    tags: ["React", "PostgreSQL", "Email"],
  },
  {
    client: "Distribuidora Norte",
    industry: "B2B / Mayorista",
    result: "Catálogo B2B en 5 semanas",
    period: "5 semanas",
    description:
      "Portal con precios por cliente, pedidos recurrentes y exportación a Excel. Reemplazaron PDFs por correo con una herramienta que escala.",
    metrics: [
      { label: "Pedidos digitales", before: "12%", after: "64%" },
      { label: "Errores pedido", before: "8%", after: "1.5%" },
    ],
    tags: ["Next.js", "Auth", "Prisma"],
  },
];

export const testimonials = [
  {
    quote:
      "No entendíamos nada de páginas web. MadsJeez nos explicó todo en castellano, sin tecnicismos, y en dos meses ya estábamos vendiendo online.",
    author: "Marcelo Gutiérrez",
    role: "Dueño, Ferretería El Tornillo",
  },
  {
    quote:
      "La velocidad de la tienda se nota. Nuestros clientes dejan de abandonar el carrito y el panel de pedidos nos ahorra horas cada semana.",
    author: "Carolina Méndez",
    role: "Fundadora, Boutique Alma",
  },
  {
    quote:
      "Profesionales, cumplieron plazos y el sistema de turnos cambió la operación de la clínica. Lo recomiendo sin dudar.",
    author: "Dr. Pablo Ruiz",
    role: "Director, Clínica Dental Sonrisa",
  },
];

export const team = [
  {
    name: "Mateo Ríos",
    role: "Co-fundador & Lead Developer",
    bio: "10 años construyendo productos web. Obsesionado con performance y código mantenible.",
    initials: "MR",
  },
  {
    name: "Lucía Fernández",
    role: "Co-fundadora & Estrategia digital",
    bio: "Traduce objetivos de negocio en soluciones digitales. Ex-consultora de marketing para pymes.",
    initials: "LF",
  },
  {
    name: "Diego Morales",
    role: "Diseño UI/UX",
    bio: "Cada pixel tiene un propósito. Especialista en interfaces que convierten visitantes en clientes.",
    initials: "DM",
  },
  {
    name: "Ana Castillo",
    role: "Backend & Integraciones",
    bio: "Arquitecta de APIs, bases de datos y conexiones con Mercado Pago, Stripe y ERPs.",
    initials: "AC",
  },
  {
    name: "Tomás Vega",
    role: "Frontend & Performance",
    bio: "Lighthouse en verde. Optimiza cada proyecto para Core Web Vitals y SEO técnico.",
    initials: "TV",
  },
  {
    name: "Sofía Herrera",
    role: "Gestión de proyectos & clientes",
    bio: "Tu contacto directo. Coordina plazos, entregas y asegura que nada se pierda en el camino.",
    initials: "SH",
  },
];

export const story = {
  title: "MadsJeez desde 2009",
  paragraphs: [
    "MadsJeez Design arrancó en 2009 con un enfoque simple: que los comercios y profesionales de la zona y de todo el país tengan una web que funcione de verdad, no solo una tarjeta digital sin visitas.",
    "Con el tiempo fuimos sumando tiendas online, sistemas de turnos, integraciones con pagos y herramientas internas para empresas que necesitaban dejar de depender solo del teléfono o del Excel.",
    "Hoy atendemos desde Carlos Spegazzini (Partido de Ezeiza, Buenos Aires), con horario de lunes a sábado de 10 a 20 hs, y seguimos trabajando con stack moderno: TypeScript, React, Next.js, bases de datos y deploy profesional.",
    "Si buscás alguien que te explique el proceso sin vueltas y te entregue código mantenible, estamos para charlar.",
  ],
  milestones: [
    { year: "2009", event: "Inicio del estudio — webs para pymes y comercios" },
    { year: "2015", event: "E-commerce e integraciones con pagos" },
    { year: "2020", event: "Sistemas a medida, paneles y automatización" },
    { year: "2026", event: "Stack actual: Next.js, Supabase, cloud, mobile-ready" },
  ],
};

export const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#tecnologias", label: "Tecnologías" },
  { href: "#casos", label: "Casos" },
  { href: "#equipo", label: "Equipo" },
  { href: "#historia", label: "Historia" },
  { href: "#contacto", label: "Contacto" },
];
