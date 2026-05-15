export const site = {
  name: "MadsJeez Design",
  tagline: "Desarrollo web para comercios y empresas que quieren crecer",
  email: "hola@madsjeezdesign.com",
  phone: "+54 351 555 0142",
  location: "Córdoba, Argentina · Remoto en LATAM",
  whatsapp: "https://wa.me/543515550142",
  siteUrl: "https://madsjeezdesign.com",
};

export const stats = [
  { value: "87+", label: "Proyectos entregados" },
  { value: "96%", label: "Clientes que nos recomiendan" },
  { value: "<1.2s", label: "Tiempo de carga promedio" },
  { value: "6", label: "Especialistas en el equipo" },
];

export const services = [
  {
    title: "Landing pages",
    description:
      "Páginas de conversión para campañas, lanzamientos y captación de leads. Diseño claro, copy orientado a venta y formularios que funcionan.",
    highlights: ["SEO técnico", "Mobile-first", "Analytics integrado"],
  },
  {
    title: "Sitios corporativos",
    description:
      "Presencia profesional para empresas y estudios. Transmití confianza desde el primer scroll con una web rápida, accesible y fácil de actualizar.",
    highlights: ["CMS editable", "Multi-idioma", "Hosting incluido"],
  },
  {
    title: "E-commerce & tiendas",
    description:
      "Tiendas online con catálogo, carrito, pagos y envíos. Conectamos Mercado Pago, Stripe y tus canales de venta actuales.",
    highlights: ["Mercado Pago", "Inventario", "Panel de pedidos"],
  },
  {
    title: "Portfolios & marcas",
    description:
      "Mostrá tu trabajo con impacto visual. Ideal para creativos, arquitectos, fotógrafos y profesionales que venden por reputación.",
    highlights: ["Galerías", "Animaciones", "Dominio propio"],
  },
  {
    title: "Aplicaciones web",
    description:
      "Dashboards, paneles de administración, reservas online y herramientas internas. Software a medida que resuelve procesos reales.",
    highlights: ["Auth seguro", "APIs", "Base de datos"],
  },
  {
    title: "Integraciones & automatización",
    description:
      "Conectamos tu web con WhatsApp, CRM, facturación, Mercado Libre y más. Menos trabajo manual, más tiempo para vender.",
    highlights: ["Webhooks", "Sincronización", "Reportes"],
  },
];

export const technologies = [
  { name: "TypeScript", category: "Lenguaje" },
  { name: "JavaScript", category: "Lenguaje" },
  { name: "Python", category: "Lenguaje" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Vue.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Base de datos" },
  { name: "MongoDB", category: "Base de datos" },
  { name: "Supabase", category: "Backend" },
  { name: "Prisma", category: "Backend" },
  { name: "GraphQL", category: "API" },
  { name: "REST APIs", category: "API" },
  { name: "Stripe", category: "Pagos" },
  { name: "Mercado Pago", category: "Pagos" },
  { name: "AWS", category: "Cloud" },
  { name: "Vercel", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "React Native", category: "Mobile" },
  { name: "Flutter", category: "Mobile" },
  { name: "WordPress", category: "CMS" },
  { name: "Shopify", category: "E-commerce" },
];

export const process = [
  {
    step: "01",
    title: "Escuchamos",
    description:
      "Una llamada de 30 minutos para entender tu negocio, tu cliente ideal y qué necesitás que haga la web.",
  },
  {
    step: "02",
    title: "Propuesta clara",
    description:
      "Te enviamos alcance, plazos y presupuesto sin letra chica. Sabés exactamente qué vas a recibir.",
  },
  {
    step: "03",
    title: "Diseño & desarrollo",
    description:
      "Iteramos contigo en prototipos antes de codear. Ves avances reales cada semana, no sorpresas al final.",
  },
  {
    step: "04",
    title: "Lanzamiento & soporte",
    description:
      "Publicamos, configuramos dominio y analytics. Te capacitamos y quedamos disponibles post-lanzamiento.",
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
    tags: ["Next.js", "SEO local", "WhatsApp API"],
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
    tags: ["React", "PostgreSQL", "Resend"],
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
      "No entendíamos nada de páginas web. Velora nos explicó todo en castellano, sin tecnicismos, y en dos meses ya estábamos vendiendo online.",
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
  title: "Cómo empezó MadsJeez Design",
  paragraphs: [
    "MadsJeez nació en 2019 cuando ayudamos a la ferretería de un vecino a armar una página simple con WhatsApp. No era un proyecto ambicioso: era un comerciante que perdía ventas porque no aparecía en Google. Cuando en tres meses las consultas se triplicaron, entendimos que había un vacío enorme: miles de negocios locales con buen producto y cero presencia digital.",
    "Durante la pandemia trabajamos noches y fines de semana. Cada cliente llegaba por referido de otro. No teníamos oficina ni logo pulido; teníamos compromiso de responder el mismo día y de entregar algo que funcionara de verdad, no solo que se viera bien en una captura.",
    "En 2022 sumamos diseño y backend al equipo. Ese año cerramos nuestro primer marketplace y portal B2B. Fue el momento en que dejamos de ser 'los que hacen páginas' y pasamos a construir productos digitales completos.",
    "Hoy somos un estudio en Córdoba con clientes en Argentina y la región. Seguimos siendo un equipo chico, pero con estándares grandes: código revisado, deploys en Railway, bases en Supabase y soporte humano después del lanzamiento. Porque una web que nadie mantiene, muere.",
  ],
  milestones: [
    { year: "2019", event: "Primer proyecto: ferretería de barrio" },
    { year: "2021", event: "20 comercios online en plena pandemia" },
    { year: "2022", event: "Equipo de 4 · Primer cliente B2B" },
    { year: "2024", event: "87 proyectos · Presencia en 3 países" },
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
