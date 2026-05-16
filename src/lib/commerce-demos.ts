/** Configuración por rubro para landings de comercio y oficios. */

export type CommercePlan = {
  name: string;
  line1: string;
  line2: string;
  line3: string;
  price: string;
  popular?: boolean;
};

export type CommerceDemoConfig = {
  slug: string;
  brand: string;
  tradeLabel: string;
  industryLabel: string;
  accent: string;
  heroKicker: string;
  heroTitle: string;
  heroHighlight: string;
  heroSub: string;
  stat1: string;
  stat2: string;
  stat3: string;
  plans: CommercePlan[];
  features: readonly string[];
  categories: readonly string[];
  payments: readonly string[];
  faq: readonly { q: string; a: string }[];
};

export const COMMERCE_DEMOS: CommerceDemoConfig[] = [
  {
    slug: "taller-motos",
    brand: "MotoForge",
    tradeLabel: "Taller de motos",
    industryLabel: "Service · motos & scooters",
    accent: "#f97316",
    heroKicker: "Service · repuestos · turnos",
    heroTitle: "Tu moto",
    heroHighlight: "a full.",
    heroSub:
      "Sitios para talleres de motos: turnos online, catálogo de repuestos, historial de service y presupuestos por WhatsApp. Pensado para captar clientes de barrio y delivery.",
    stat1: "Turnos hoy",
    stat2: "4.9 ★ local",
    stat3: "Service express",
    plans: [
      { name: "Básico", line1: "Landing + turnos", line2: "Catálogo 20 ítems", line3: "WhatsApp CTA", price: "$38.000" },
      { name: "Pro", line1: "Historial por patente", line2: "Presupuestos PDF", line3: "Promos service", popular: true, price: "$62.000" },
      { name: "Red", line1: "Multi-sucursal", line2: "Stock repuestos", line3: "Panel taller", price: "$98.000" },
    ],
    features: ["Turnos online", "Catálogo repuestos", "Historial service", "Presupuesto WhatsApp", "Promos estacionales", "Mapa y horarios"],
    categories: ["Service 10k", "Frenos", "Aceites", "Cubiertas", "Scooters", "Custom"],
    payments: ["Mercado Pago", "Transferencia", "Efectivo", "WhatsApp", "3 cuotas", "Delivery repuestos"],
    faq: [
      { q: "¿Puedo cargar marcas de moto?", a: "Sí, filtramos por marca y cilindrada en el catálogo demo." },
      { q: "¿Recordatorios de service?", a: "Incluimos avisos demo por WhatsApp según km o fecha." },
    ],
  },
  {
    slug: "celulares",
    brand: "CellPoint",
    tradeLabel: "Casa de celulares",
    industryLabel: "Retail · smartphones",
    accent: "#3b82f6",
    heroKicker: "Equipos · accesorios · garantía",
    heroTitle: "Tu tienda",
    heroHighlight: "conectada.",
    heroSub:
      "E-commerce y local para casas de celulares: comparador de modelos, financiación, trade-in y garantía visible. Mobile-first para compras rápidas.",
    stat1: "Stock en vivo",
    stat2: "Financiación",
    stat3: "Trade-in",
    plans: [
      { name: "Showcase", line1: "Landing catálogo", line2: "Hasta 40 modelos", line3: "WhatsApp ventas", price: "$42.000" },
      { name: "Store", line1: "Carrito demo", line2: "Financiación", line3: "Garantía extendida", popular: true, price: "$68.000" },
      { name: "Cadena", line1: "Multi-local", line2: "CRM leads", line3: "Comparador pro", price: "$105.000" },
    ],
    features: ["Catálogo por marca", "Financiación visible", "Trade-in calculator", "Garantía oficial", "Accesorios bundle", "Pickup en local"],
    categories: ["iPhone", "Samsung", "Xiaomi", "Accesorios", "Usados", "Reparación"],
    payments: ["Mercado Pago", "Tarjetas", "Transferencia", "Cuotas sin interés", "Efectivo", "WhatsApp"],
    faq: [
      { q: "¿Integración con proveedor?", a: "Podemos conectar stock demo por CSV o API de mayorista." },
      { q: "¿Página de reparaciones?", a: "Incluida en plan Store con formulario de ingreso." },
    ],
  },
  {
    slug: "almacen",
    brand: "Depósito Norte",
    tradeLabel: "Almacén & autoservicio",
    industryLabel: "Retail · barrio",
    accent: "#d97706",
    heroKicker: "Ofertas · delivery · fidelidad",
    heroTitle: "Tu almacén",
    heroHighlight: "digital.",
    heroSub:
      "Listas de precios, promos del día y pedidos por WhatsApp para almacenes de barrio. Simple, rápido y sin comisión innecesaria.",
    stat1: "Promo del día",
    stat2: "Delivery 40'",
    stat3: "Club barrio",
    plans: [
      { name: "Lista", line1: "Landing + precios", line2: "Promo destacada", line3: "Pedido WhatsApp", price: "$28.000" },
      { name: "Plus", line1: "Catálogo 200 ítems", line2: "Delivery zona", line3: "Cupones", popular: true, price: "$48.000" },
      { name: "Red", line1: "Varias sucursales", line2: "Mayorista", line3: "Panel stock", price: "$78.000" },
    ],
    features: ["Lista de precios", "Promos rotativas", "Pedido WhatsApp", "Zonas de envío", "Cupones barrio", "Horario extendido"],
    categories: ["Bebidas", "Fiambres", "Limpieza", "Snacks", "Enlatados", "Congelados"],
    payments: ["Efectivo", "Transferencia", "Mercado Pago", "Débito", "Fiado demo", "WhatsApp"],
    faq: [
      { q: "¿Actualizo precios fácil?", a: "Panel demo para cambiar ofertas en segundos." },
      { q: "¿Mínimo de pedido?", a: "Configurable por zona en plan Plus." },
    ],
  },
  {
    slug: "kiosco",
    brand: "Kiosko 24",
    tradeLabel: "Kiosco & maxikiosco",
    industryLabel: "Retail · rápido",
    accent: "#eab308",
    heroKicker: "Snacks · bebidas · recargas",
    heroTitle: "Tu kiosco",
    heroHighlight: "abierto.",
    heroSub:
      "Micrositio para kioscos: combos, horario nocturno, delivery express y recargas. Ideal para captar pedidos del barrio sin app propia.",
    stat1: "Abierto 24h",
    stat2: "Combo $",
    stat3: "Envío 25'",
    plans: [
      { name: "Express", line1: "Landing + combos", line2: "Menú 50 ítems", line3: "WhatsApp", price: "$22.000" },
      { name: "Night", line1: "Horario extendido", line2: "Delivery", line3: "Recargas demo", popular: true, price: "$38.000" },
      { name: "Cadena", line1: "Multi-kiosco", line2: "Promos central", line3: "Estadísticas", price: "$62.000" },
    ],
    features: ["Combos destacados", "Menú por categoría", "Delivery express", "Horario nocturno", "Recargas demo", "Ubicación maps"],
    categories: ["Snacks", "Bebidas", "Golosinas", "Cigarrillos", "Helados", "Combos"],
    payments: ["Efectivo", "Mercado Pago", "Transferencia", "QR", "WhatsApp", "Delivery"],
    faq: [
      { q: "¿Carta para delivery apps?", a: "Exportamos menú demo compatible con riders." },
      { q: "¿Promos por horario?", a: "Sí, happy hour nocturno en plan Night." },
    ],
  },
  {
    slug: "libreria",
    brand: "Página & Tinta",
    tradeLabel: "Librería & papelería",
    industryLabel: "Retail · útiles",
    accent: "#92400e",
    heroKicker: "Útiles · libros · universidad",
    heroTitle: "Tu librería",
    heroHighlight: "lista.",
    heroSub:
      "Catálogo por curso, listas escolares descargables y reservas para librerías. Perfecto para picos de inicio de clases y venta corporativa.",
    stat1: "Listas 2026",
    stat2: "Reserva pick-up",
    stat3: "Mayorista",
    plans: [
      { name: "Escolar", line1: "Landing + listas", line2: "Catálogo 150", line3: "PDF descarga", price: "$35.000" },
      { name: "Campus", line1: "Por curso/colegio", line2: "Reservas", line3: "B2B colegios", popular: true, price: "$58.000" },
      { name: "Red", line1: "Multi-sede", line2: "ERP demo", line3: "Envíos", price: "$92.000" },
    ],
    features: ["Listas escolares PDF", "Catálogo por nivel", "Reserva pick-up", "Ventas B2B", "Útiles destacados", "Blog tips estudio"],
    categories: ["Útiles", "Libros", "Universidad", "Arte", "Regalería", "Oficina"],
    payments: ["Efectivo", "Transferencia", "Mercado Pago", "Tarjetas", "Factura A demo", "WhatsApp"],
    faq: [
      { q: "¿Listas por colegio?", a: "Cada colegio con su pack descargable y carrito demo." },
      { q: "¿Stock en tiempo real?", a: "Opcional en plan Campus con panel simple." },
    ],
  },
  {
    slug: "bazar",
    brand: "Bazar Central",
    tradeLabel: "Bazar & variedades",
    industryLabel: "Retail · hogar",
    accent: "#ec4899",
    heroKicker: "Hogar · regalos · temporada",
    heroTitle: "Tu bazar",
    heroHighlight: "lleno.",
    heroSub:
      "Vitrina digital para bazares: temporada, regalería, decoración y ofertas por categoría. Conversión con WhatsApp y catálogo visual.",
    stat1: "Ofertas mes",
    stat2: "Regalería",
    stat3: "Envío CABA",
    plans: [
      { name: "Vitrina", line1: "Landing catálogo", line2: "80 productos", line3: "WhatsApp", price: "$32.000" },
      { name: "Temporada", line1: "Colecciones", line2: "Banners promo", line3: "Newsletter", popular: true, price: "$52.000" },
      { name: "Mayor", line1: "B2B mayorista", line2: "Multi-rubro", line3: "CRM", price: "$85.000" },
    ],
    features: ["Colecciones temporada", "Grid visual", "Ofertas destacadas", "Newsletter", "Mayorista demo", "Gift cards"],
    categories: ["Hogar", "Cocina", "Decoración", "Juguetes", "Regalos", "Liquidación"],
    payments: ["Mercado Pago", "Transferencia", "Efectivo", "3 cuotas", "WhatsApp", "Envío"],
    faq: [
      { q: "¿Cambio de temporada?", a: "Rotamos banners y categorías en un click demo." },
      { q: "¿Venta mayorista?", a: "Plan Mayor con lista de precios separada." },
    ],
  },
  {
    slug: "carniceria",
    brand: "Cortes Don Juan",
    tradeLabel: "Carnicería premium",
    industryLabel: "Food retail · cortes",
    accent: "#dc2626",
    heroKicker: "Cortes · parrilla · delivery",
    heroTitle: "Tus cortes",
    heroHighlight: "premium.",
    heroSub:
      "Menú de cortes, parrilleros, combos familiares y pedidos programados para carnicerías. Fotos apetitosas y peso estimado en carrito demo.",
    stat1: "Corte del día",
    stat2: "Delivery frío",
    stat3: "Parrillero",
    plans: [
      { name: "Mostrador", line1: "Landing + menú", line2: "20 cortes", line3: "Pedido WA", price: "$36.000" },
      { name: "Parrilla", line1: "Combos asado", line2: "Programar entrega", line3: "Recetas", popular: true, price: "$58.000" },
      { name: "Cadena", line1: "Sucursales", line2: "Mayorista", line3: "Suscripción", price: "$94.000" },
    ],
    features: ["Menú por corte", "Combos parrilla", "Delivery frío", "Recetas grill", "Pedido programado", "Mayorista"],
    categories: ["Vacuno", "Cerdo", "Pollo", "Achuras", "Elaborados", "Combos"],
    payments: ["Efectivo", "Transferencia", "Mercado Pago", "WhatsApp", "Delivery", "Seña demo"],
    faq: [
      { q: "¿Peso y precio por kg?", a: "Carrito demo con estimación y confirmación por WhatsApp." },
      { q: "¿Recetas incluidas?", a: "Plan Parrilla con blog de cocción y maridaje." },
    ],
  },
  {
    slug: "granja",
    brand: "Campo Vivo",
    tradeLabel: "Granja & agro",
    industryLabel: "Agro · productos frescos",
    accent: "#16a34a",
    heroKicker: "Huevos · verduras · suscripción",
    heroTitle: "Tu granja",
    heroHighlight: "fresca.",
    heroSub:
      "Sitios para granjas y productores: cajas semanales, suscripción, visitas educativas y venta directa sin intermediarios.",
    stat1: "Cosecha hoy",
    stat2: "Orgánico",
    stat3: "Suscripción",
    plans: [
      { name: "Huerta", line1: "Landing productos", line2: "Caja semanal", line3: "Maps", price: "$34.000" },
      { name: "Campo", line1: "Suscripción", line2: "Visitas tour", line3: "Mayorista", popular: true, price: "$56.000" },
      { name: "Coop", line1: "Productores red", line2: "Logística", line3: "Certificaciones", price: "$88.000" },
    ],
    features: ["Caja semanal", "Suscripción mensual", "Tour campo", "Certificaciones", "Mayorista restaurantes", "Recetas"],
    categories: ["Huevos", "Verduras", "Frutas", "Lácteos", "Miel", "Plantines"],
    payments: ["Transferencia", "Mercado Pago", "Efectivo", "Suscripción", "WhatsApp", "Envío"],
    faq: [
      { q: "¿Rutas de entrega?", a: "Definimos días por zona en plan Campo." },
      { q: "¿Página de visitas?", a: "Calendario demo para tours y talleres." },
    ],
  },
  {
    slug: "computacion",
    brand: "ChipHouse",
    tradeLabel: "Casa de computación",
    industryLabel: "Tech retail · hardware",
    accent: "#06b6d4",
    heroKicker: "PCs · notebooks · service",
    heroTitle: "Tu tech",
    heroHighlight: "store.",
    heroSub:
      "Armado de PCs, comparador de componentes, service técnico y financiación para casas de computación. Copy orientado a gamers y pymes.",
    stat1: "Armá tu PC",
    stat2: "Service 48h",
    stat3: "Garantía",
    plans: [
      { name: "Hardware", line1: "Catálogo componentes", line2: "50 SKUs", line3: "WhatsApp", price: "$45.000" },
      { name: "Gamer", line1: "Armador PC", line2: "Service tracking", line3: "Financiación", popular: true, price: "$72.000" },
      { name: "Corporate", line1: "B2B pymes", line2: "Leasing demo", line3: "Soporte SLA", price: "$115.000" },
    ],
    features: ["Armador de PC", "Catálogo componentes", "Tracking service", "Financiación", "Comparador specs", "Soporte remoto"],
    categories: ["Notebooks", "GPUs", "Periféricos", "Monitores", "Service", "Redes"],
    payments: ["Mercado Pago", "Tarjetas", "Transferencia", "Cuotas", "Factura A", "WhatsApp"],
    faq: [
      { q: "¿Configurador de PC?", a: "Plan Gamer con compatibilidad demo entre piezas." },
      { q: "¿Estado de reparación?", a: "Cliente consulta ticket con número de orden." },
    ],
  },
  {
    slug: "ropa",
    brand: "Urbana Moda",
    tradeLabel: "Tienda de ropa",
    industryLabel: "Fashion retail",
    accent: "#db2777",
    heroKicker: "Colecciones · talles · lookbook",
    heroTitle: "Tu estilo",
    heroHighlight: "online.",
    heroSub:
      "Lookbooks, filtros por talle, nueva colección y outlet para tiendas de ropa. Experiencia visual tipo editorial con checkout demo.",
    stat1: "Nueva colección",
    stat2: "Envío gratis +$",
    stat3: "Cambios 30d",
    plans: [
      { name: "Boutique", line1: "Lookbook web", line2: "60 prendas", line3: "Filtro talles", price: "$40.000" },
      { name: "Fashion", line1: "Colecciones", line2: "Carrito demo", line3: "Outlet", popular: true, price: "$65.000" },
      { name: "Multimarca", line1: "Varias marcas", line2: "CRM clientes", line3: "Influencer UGC", price: "$102.000" },
    ],
    features: ["Lookbook editorial", "Filtro talles/color", "Outlet sección", "Guía de medidas", "Wishlist", "Envíos"],
    categories: ["Mujer", "Hombre", "Niños", "Accesorios", "Outlet", "Nueva temp."],
    payments: ["Mercado Pago", "Tarjetas", "3 cuotas", "Transferencia", "Cambios demo", "WhatsApp"],
    faq: [
      { q: "¿Tabla de talles?", a: "Por prenda con guía visual en plan Fashion." },
      { q: "¿Integración Instagram?", a: "Feed shoppable demo en plan Multimarca." },
    ],
  },
  {
    slug: "supermercado",
    brand: "Mercado Familiar",
    tradeLabel: "Supermercado",
    industryLabel: "Supermercado · autoservicio",
    accent: "#059669",
    heroKicker: "Góndola · ofertas · delivery",
    heroTitle: "Tu súper",
    heroHighlight: "cerca.",
    heroSub:
      "Folletos digitales, ofertas por pasillo y pedidos programados para supermercados chicos y medianos. Sin la complejidad de un e-commerce gigante.",
    stat1: "Ofertas semana",
    stat2: "Delivery 2h",
    stat3: "Club puntos",
    plans: [
      { name: "Barrio", line1: "Folleto digital", line2: "300 SKU", line3: "Pedido WA", price: "$48.000" },
      { name: "Express", line1: "Pasillos online", line2: "Delivery slots", line3: "Puntos fidelidad", popular: true, price: "$78.000" },
      { name: "Cadena", line1: "Multi-sucursal", line2: "App demo", line3: "Mayorista", price: "$125.000" },
    ],
    features: ["Folleto semanal", "Pasillos categoría", "Slots delivery", "Club puntos", "Ofertas 2x1", "Pick-up"],
    categories: ["Lácteos", "Carnes", "Bebidas", "Limpieza", "Panadería", "Ofertas"],
    payments: ["Mercado Pago", "Débito", "Efectivo", "Transferencia", "Cuotas", "Delivery"],
    faq: [
      { q: "¿Cuántos productos?", a: "Hasta 300 en Barrio, ilimitado demo en Cadena." },
      { q: "¿Horarios de entrega?", a: "Slots configurables por franja horaria." },
    ],
  },
  {
    slug: "barberia",
    brand: "The Fade Club",
    tradeLabel: "Barbería & grooming",
    industryLabel: "Barbería · estilo",
    accent: "#64748b",
    heroKicker: "Turnos · barbas · membresía",
    heroTitle: "Tu corte",
    heroHighlight: "pro.",
    heroSub:
      "Reservas online, barberos por estilo, membresía mensual y tienda de grooming para barberías modernas. Estética urbana premium.",
    stat1: "Turnos hoy",
    stat2: "5 barberos",
    stat3: "Membresía",
    plans: [
      { name: "Chair", line1: "Landing + turnos", line2: "3 barberos", line3: "Precios", price: "$32.000" },
      { name: "Club", line1: "Membresía", line2: "Galería cortes", line3: "Shop grooming", popular: true, price: "$54.000" },
      { name: "Franquicia", line1: "Multi-sede", line2: "App reservas", line3: "CRM", price: "$89.000" },
    ],
    features: ["Reservas online", "Perfil barberos", "Membresía mensual", "Galería estilos", "Shop productos", "Recordatorios"],
    categories: ["Fade", "Barba", "Clásico", "Color", "Kids", "Combo"],
    payments: ["Efectivo", "Mercado Pago", "Transferencia", "Membresía", "Propina demo", "WhatsApp"],
    faq: [
      { q: "¿Recordatorio de turno?", a: "WhatsApp demo 2 h antes del corte." },
      { q: "¿Varios barberos?", a: "Agenda separada por profesional en plan Club." },
    ],
  },
  {
    slug: "marketing",
    brand: "Pulse Agency",
    tradeLabel: "Agencia de marketing",
    industryLabel: "Agencia · growth",
    accent: "#8b5cf6",
    heroKicker: "Ads · branding · funnels",
    heroTitle: "Tu marca",
    heroHighlight: "crece.",
    heroSub:
      "Portfolios, casos de éxito, paquetes de servicios y funnels de leads para agencias de marketing. Posicionamiento premium B2B.",
    stat1: "+120 clientes",
    stat2: "ROI track",
    stat3: "Full funnel",
    plans: [
      { name: "Starter", line1: "Landing agencia", line2: "3 casos", line3: "Form leads", price: "$55.000" },
      { name: "Growth", line1: "Portfolio pro", line2: "Blog + SEO", line3: "Calculadora ROI", popular: true, price: "$88.000" },
      { name: "Partner", line1: "White-label", line2: "CRM integrado", line3: "Dashboard", price: "$140.000" },
    ],
    features: ["Casos de éxito", "Paquetes servicios", "Blog SEO", "Form calificado", "Calculadora ROI", "Newsletter"],
    categories: ["Branding", "Performance", "Social", "SEO", "Content", "Automation"],
    payments: ["Transferencia", "USD demo", "Factura", "Cuotas", "Retainer", "Contrato"],
    faq: [
      { q: "¿Subdominio por cliente?", a: "Plan Partner incluye landings white-label demo." },
      { q: "¿Métricas en vivo?", a: "Dashboard demo con KPIs de campañas." },
    ],
  },
  {
    slug: "imprenta",
    brand: "PrintLab",
    tradeLabel: "Imprenta & gráfica",
    industryLabel: "Impresión · diseño",
    accent: "#4f46e5",
    heroKicker: "Tarjetas · gigantografía · packs",
    heroTitle: "Tu imprenta",
    heroHighlight: "rápida.",
    heroSub:
      "Cotizador online, catálogo de productos impresos y seguimiento de pedidos para imprentas. Desde tarjetas hasta plotter.",
    stat1: "24h express",
    stat2: "Cotizador",
    stat3: "Diseño incl.",
    plans: [
      { name: "Print", line1: "Catálogo productos", line2: "Cotizador básico", line3: "Upload arte", price: "$42.000" },
      { name: "Pro", line1: "Cotizador avanzado", line2: "Tracking pedido", line3: "Diseño opcional", popular: true, price: "$68.000" },
      { name: "Industrial", line1: "Plotter gran formato", line2: "B2B empresas", line3: "API pedidos", price: "$108.000" },
    ],
    features: ["Cotizador instantáneo", "Upload de archivos", "Tracking pedido", "Catálogo acabados", "Diseño gráfico", "Envío"],
    categories: ["Tarjetas", "Folletos", "Gigantografía", "Stickers", "Packaging", "Textil"],
    payments: ["Transferencia", "Mercado Pago", "Factura A", "50% seña", "Efectivo", "Cuenta DNI"],
    faq: [
      { q: "¿Qué formatos de archivo?", a: "PDF, AI, PNG con guía de sangrado incluida." },
      { q: "¿Plazos de entrega?", a: "Selector express o estándar en cotizador." },
    ],
  },
  {
    slug: "motores",
    brand: "MotorTech",
    tradeLabel: "Service técnico de motores",
    industryLabel: "Motores · industrial",
    accent: "#c2410c",
    heroKicker: "Rectificación · diagnóstico",
    heroTitle: "Tu motor",
    heroHighlight: "como nuevo.",
    heroSub:
      "Landings para servicios de motores nafteros y diésel: diagnóstico, rectificación, garantía y presupuestos técnicos con credibilidad industrial.",
    stat1: "Diagnóstico 3D",
    stat2: "Garantía 6m",
    stat3: "Flota pyme",
    plans: [
      { name: "Service", line1: "Landing servicios", line2: "Form diagnóstico", line3: "WhatsApp", price: "$44.000" },
      { name: "Industrial", line1: "Flotas pyme", line2: "Presupuesto PDF", line3: "Casos técnicos", popular: true, price: "$72.000" },
      { name: "Plant", line1: "Taller grande", line2: "SLA contratos", line3: "Portal cliente", price: "$118.000" },
    ],
    features: ["Diagnóstico online", "Servicios por tipo motor", "Galería antes/después", "Presupuesto técnico", "Contratos flota", "Garantía"],
    categories: ["Nafteros", "Diésel", "Rectificación", "Electrónica", "Flotas", "Marinos"],
    payments: ["Transferencia", "Factura A", "Cheque demo", "Financiación", "WhatsApp", "Cuenta corriente"],
    faq: [
      { q: "¿Fotos del trabajo?", a: "Galería técnica antes/después en plan Industrial." },
      { q: "¿Motores industriales?", a: "Sección dedicada con formulario de capacidad y horas." },
    ],
  },
  {
    slug: "gasista",
    brand: "GasSeguro",
    tradeLabel: "Gasista matriculado",
    industryLabel: "Oficio · gas",
    accent: "#0284c7",
    heroKicker: "Matrícula · artefactos · urgencias",
    heroTitle: "Tu hogar",
    heroHighlight: "seguro.",
    heroSub:
      "Sitios para gasistas matriculados: artefactos, certificaciones, zonas de cobertura y botón de urgencia. Confianza y normativa visible.",
    stat1: "Matriculado",
    stat2: "Urgencias",
    stat3: "Certificado",
    plans: [
      { name: "Hogar", line1: "Landing + zonas", line2: "Lista servicios", line3: "WhatsApp", price: "$30.000" },
      { name: "Pro", line1: "Certificados", line2: "Urgencia 24h", line3: "Form visita", popular: true, price: "$48.000" },
      { name: "Empresa", line1: "Comercios", line2: "Contratos", line3: "Recordatorios", price: "$78.000" },
    ],
    features: ["Matrícula visible", "Zonas de cobertura", "Botón urgencia", "Certificados gas", "Presupuesto visita", "Artefactos"],
    categories: ["Calefones", "Cocinas", "Calefacción", "Detección", "Hab. municipal", "Piletas"],
    payments: ["Efectivo", "Transferencia", "Mercado Pago", "Factura", "WhatsApp", "Obra mensual"],
    faq: [
      { q: "¿Certificado de artefacto?", a: "Descarga demo y solicitud de visita incluida." },
      { q: "¿Urgencias fuera de horario?", a: "CTA destacado con recargo en plan Pro." },
    ],
  },
  {
    slug: "electricista",
    brand: "VoltPro",
    tradeLabel: "Electricista",
    industryLabel: "Oficio · electricidad",
    accent: "#ca8a04",
    heroKicker: "Instalaciones · tableros · LED",
    heroTitle: "Tu red",
    heroHighlight: "al día.",
    heroSub:
      "Electricistas con portafolio de obras, presupuesto por foto y destacado de urgencias. Ideal para domicilios y locales comerciales.",
    stat1: "Urgencia 2h",
    stat2: "Garantía",
    stat3: "LED pro",
    plans: [
      { name: "Dom", line1: "Landing servicios", line2: "Galería obras", line3: "Form foto", price: "$28.000" },
      { name: "Pro", line1: "Presupuesto WA", line2: "Urgencias", line3: "Locales comerciales", popular: true, price: "$46.000" },
      { name: "Industrial", line1: "Tableros", line2: "Mantenimiento", line3: "Contratos", price: "$82.000" },
    ],
    features: ["Galería de obras", "Presupuesto por foto", "Urgencias", "Instalaciones LED", "Tableros", "Mantenimiento"],
    categories: ["Domicilio", "Comercial", "Tableros", "LED", "Urgencias", "Medición"],
    payments: ["Efectivo", "Transferencia", "Mercado Pago", "Factura", "WhatsApp", "Materiales aparte"],
    faq: [
      { q: "¿Envío fotos del problema?", a: "Form con upload para cotizar más rápido." },
      { q: "¿Trabajos en altura?", a: "Sección industrial con equipo certificado demo." },
    ],
  },
  {
    slug: "albanil",
    brand: "AlbaPro",
    tradeLabel: "Albañilería & reformas",
    industryLabel: "Construcción · reformas",
    accent: "#78716c",
    heroKicker: "Reformas · revoques · ampliaciones",
    heroTitle: "Tu obra",
    heroHighlight: "en marcha.",
    heroSub:
      "Portafolio de obras, presupuestos por metro cuadrado y testimonios para albañiles y equipos de reforma. Generá confianza antes de la visita.",
    stat1: "15 años exp.",
    stat2: "Presupuesto 48h",
    stat3: "Obra llave",
    plans: [
      { name: "Reforma", line1: "Landing + galería", line2: "Servicios lista", line3: "Form obra", price: "$32.000" },
      { name: "Obra", line1: "Presupuesto m²", line2: "Testimonios", line3: "Cronograma demo", popular: true, price: "$52.000" },
      { name: "Constructor", line1: "Equipos", line2: "Varias obras", line3: "Portal cliente", price: "$86.000" },
    ],
    features: ["Galería antes/después", "Presupuesto por m²", "Testimonios", "Cronograma obra", "Servicios lista", "Zonas"],
    categories: ["Revoques", "Ampliaciones", "Baños", "Pisos", "Exterior", "Llave en mano"],
    payments: ["Seña 30%", "Transferencia", "Efectivo", "Por avance", "Factura", "WhatsApp"],
    faq: [
      { q: "¿Visitas sin cargo?", a: "Configurable: primera visita demo sin costo en CABA." },
      { q: "¿Fotos de obras reales?", a: "Galería filtrable por tipo de reforma." },
    ],
  },
  {
    slug: "arquitectos",
    brand: "Línea Estudio",
    tradeLabel: "Estudio de arquitectura",
    industryLabel: "Arquitectura · diseño",
    accent: "#a8a29e",
    heroKicker: "Proyectos · renders · dirección",
    heroTitle: "Tu espacio",
    heroHighlight: "diseñado.",
    heroSub:
      "Portfolios editoriales, procesos de diseño, renders y formulario de consulta para estudios de arquitectura. Estética minimal premium.",
    stat1: "Renders 4K",
    stat2: "Premios",
    stat3: "Obra dir.",
    plans: [
      { name: "Studio", line1: "Portfolio", line2: "6 proyectos", line3: "Contacto", price: "$58.000" },
      { name: "Atelier", line1: "Renders", line2: "Proceso diseño", line3: "Blog", popular: true, price: "$92.000" },
      { name: "Signature", line1: "Obra completa", line2: "Portal cliente", line3: "Prensa", price: "$145.000" },
    ],
    features: ["Portfolio editorial", "Renders destacados", "Proceso en etapas", "Form consulta", "Blog arquitectura", "Prensa"],
    categories: ["Residencial", "Comercial", "Interiorismo", "Urbano", "Sustentable", "Renovación"],
    payments: ["Transferencia", "USD demo", "Por etapas", "Contrato", "Honorarios %", "Factura"],
    faq: [
      { q: "¿Tour virtual?", a: "Plan Atelier con recorridos 360 demo de proyectos." },
      { q: "¿Dirección de obra?", a: "Sección dedicada con alcance y cronograma." },
    ],
  },
];

export const COMMERCE_SLUGS = COMMERCE_DEMOS.map((d) => d.slug);

export function getCommerceConfig(slug: string): CommerceDemoConfig | undefined {
  return COMMERCE_DEMOS.find((d) => d.slug === slug);
}
