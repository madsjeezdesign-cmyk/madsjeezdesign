import type { ShowcaseFeatures } from "@/lib/demo-showcase-features";

export type RetailFashionProduct = {
  id: number;
  name: string;
  price: string;
  image: string;
  sizeHint?: string;
  badge?: string;
};

export type RetailFashionMedia = {
  id: string;
  image: string;
  alt: string;
  postUrl: string;
  kind: "image" | "video";
  /** MP4 para reels / stories (demo o CDN propio). */
  videoSrc?: string;
};

export type RetailFashionConfig = {
  slug: string;
  brand: string;
  /** Símbolo o monograma corto en nav (ej. ∞). */
  monogram: string;
  tagline: string;
  seasonBadge?: string;
  heroKicker: string;
  heroTitle: string;
  heroHighlight: string;
  heroImage: string;
  /** Video de fondo opcional en hero (MP4). */
  heroVideo?: string;
  collectionTitle: string;
  collectionSubtitle: string;
  shopTitle?: string;
  shopSubtitle?: string;
  products: RetailFashionProduct[];
  instagramHandle: string;
  instagramUrl: string;
  instagramFeed: string[];
  instagramMedia?: RetailFashionMedia[];
  marqueeItems: string[];
  addressLines: string[];
  mapsEmbedUrl: string;
  whatsapp: string;
  whatsappMessage: string;
  phoneDisplay?: string;
  footerLocation: string;
  showcasePitch: string;
  showcaseFeatures: ShowcaseFeatures;
};

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`;

const DEFAULT_FEATURES: ShowcaseFeatures = [
  "Carrito → WhatsApp por prenda",
  "Colección Otoño · Invierno",
  "Feed Instagram + video",
  "Hero editorial con parallax",
  "Checkout carrito en WhatsApp",
  "Mapa boutique + ubicación",
  "Botón WhatsApp flotante",
  "Lookbook shop premium",
  "Captación de leads demo",
];

const IG = "https://www.instagram.com/infinita_fashionstore/";
const AW = {
  hero: img("photo-1483986498270-0b4a805e0ed9", 2000),
  coat: img("photo-1539533018447-433ffade6dac"),
  knit: img("photo-1594938298603-c8148c4dae35"),
  blazer: img("photo-1591047139829-d91aecb6caea"),
  dress: img("photo-1496747613176-220222e2e72f"),
  pants: img("photo-1509631179647-0c500ba1417f"),
  leather: img("photo-1550614000-4b95d4ed79fa"),
  boots: img("photo-1543163521-1bf539c55dd2"),
  scarf: img("photo-1434389676629-43dffd6ac5f4"),
  editorial: img("photo-1469334031218-e382a71b716b"),
  street: img("photo-1515886657613-9f3515b0c78f"),
  window: img("photo-1483985988355-763728e1935b"),
};

function catalog(
  items: Omit<RetailFashionProduct, "id">[],
): RetailFashionProduct[] {
  return items.map((item, i) => ({ id: i + 1, ...item }));
}

function igMedia(
  items: Omit<RetailFashionMedia, "id">[],
): RetailFashionMedia[] {
  return items.map((item, i) => ({ id: `m${i + 1}`, ...item }));
}

const FILLER_PRODUCTS = [
  { name: "Abrigo Midi", price: "Consultar", image: AW.coat, badge: "OI" },
  { name: "Sweater Premium", price: "Consultar", image: AW.knit },
];

function enrichFashionConfig(config: RetailFashionConfig): RetailFashionConfig {
  const instagramMedia =
    config.instagramMedia ??
    igMedia(
      config.instagramFeed.map((image, i) => ({
        image,
        alt: `${config.brand} — look ${i + 1}`,
        postUrl: config.instagramUrl,
        kind: "image" as const,
      })),
    );

  const baseProducts =
    config.products.length >= 6
      ? config.products
      : catalog([
          ...config.products.map(({ id: _id, ...p }) => p),
          ...FILLER_PRODUCTS.slice(0, 6 - config.products.length),
        ]);

  return {
    ...config,
    seasonBadge: config.seasonBadge ?? "Otoño · Invierno 2025",
    shopTitle: config.shopTitle ?? "Tienda · Colección OI",
    shopSubtitle:
      config.shopSubtitle ??
      "Elegí tus prendas, armá el carrito y comprá por WhatsApp con un mensaje listo para enviar.",
    instagramMedia,
    products: baseProducts,
    whatsappMessage:
      config.whatsappMessage ??
      `Hola ${config.brand}! Quiero comprar desde su web (colección Otoño Invierno).`,
  };
}

export const RETAIL_FASHION_DEMOS: RetailFashionConfig[] = [
  {
    slug: "moda-infinita",
    brand: "INFINITA",
    monogram: "∞",
    tagline: "L'Élégance Absolue — Ezeiza",
    seasonBadge: "Otoño · Invierno 2025",
    heroKicker: "Nouvelle Collection OI",
    heroTitle: "L'Élégance",
    heroHighlight: "d'Hiver.",
    heroImage: AW.hero,
    heroVideo:
      "https://assets.mixkit.co/videos/preview/mixkit-woman-walking-in-a-hall-with-a-long-black-coat-39879-large.mp4",
    collectionTitle: "Édition Otoño Invierno",
    collectionSubtitle: "Laines · soie · silhouettes noires",
    shopTitle: "La Boutique en ligne",
    shopSubtitle:
      "Prendas de la temporada, inspiradas en el estilo de @infinita_fashionstore. Agregá al carrito y comprá por WhatsApp en un toque.",
    products: catalog([
      {
        name: "Abrigo Laine Long",
        price: "Consultar",
        image: AW.coat,
        sizeHint: "Talles S a XL",
        badge: "New in",
      },
      {
        name: "Blazer Structuré Noir",
        price: "Consultar",
        image: AW.blazer,
        sizeHint: "Últimas unidades",
      },
      {
        name: "Pull Cachemire",
        price: "Consultar",
        image: AW.knit,
        sizeHint: "Tonos tierra & noir",
        badge: "OI",
      },
      {
        name: "Robe Midi Hiver",
        price: "Consultar",
        image: AW.dress,
        sizeHint: "Ideal para eventos",
      },
      {
        name: "Pantalon Wide Laine",
        price: "Consultar",
        image: AW.pants,
        sizeHint: "Corte sastre",
      },
      {
        name: "Veste Cuir Éco",
        price: "Consultar",
        image: AW.leather,
        badge: "Best seller",
      },
      {
        name: "Écharpe & Accessoires",
        price: "Consultar",
        image: AW.scarf,
        sizeHint: "Regalo perfecto",
      },
      {
        name: "Bottes Talon Hiver",
        price: "Consultar",
        image: AW.boots,
        sizeHint: "Consultar talles",
      },
    ]),
    instagramHandle: "infinita_fashionstore",
    instagramUrl: IG,
    instagramFeed: [AW.editorial, AW.street, AW.window, AW.coat, AW.knit, AW.leather],
    instagramMedia: igMedia([
      { image: AW.editorial, alt: "Look INFINITA OI", postUrl: IG, kind: "image" },
      { image: AW.coat, alt: "Abrigos INFINITA", postUrl: IG, kind: "image" },
      {
        image: AW.street,
        alt: "Reel temporada",
        postUrl: IG,
        kind: "video",
        videoSrc:
          "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-with-a-black-and-white-outfit-3980-large.mp4",
      },
      { image: AW.knit, alt: "Sweaters", postUrl: IG, kind: "image" },
      { image: AW.window, alt: "Vitrina boutique", postUrl: IG, kind: "image" },
      {
        image: AW.dress,
        alt: "Noche & seda",
        postUrl: IG,
        kind: "video",
        videoSrc:
          "https://assets.mixkit.co/videos/preview/mixkit-young-woman-wearing-a-black-coat-39878-large.mp4",
      },
      { image: AW.leather, alt: "Cuero & noir", postUrl: IG, kind: "image" },
      { image: AW.boots, alt: "Calzado invierno", postUrl: IG, kind: "image" },
    ]),
    marqueeItems: ["OTOÑO INVIERNO", "EZEIZA", "HAUTE COUTURE", "INFINITA", "@infinita_fashionstore"],
    addressLines: ["Av. 1804 / Ezeiza Centro", "Provincia de Buenos Aires", "Argentina"],
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3275.4053748882583!2d-58.5246397!3d-34.8555769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd172cad14c9f%3A0xe47a7c6ac2df9239!2sINFINITA%20fashion%20store!5e0!3m2!1ses-419!2sar!4v1716000000000!5m2!1ses-419!2sar",
    whatsapp: "5491130033315",
    whatsappMessage:
      "Hola INFINITA! Vengo desde su página web y me gustaría consultar por prendas de Otoño Invierno.",
    phoneDisplay: "011 15-3003-3315",
    footerLocation: "INFINITA · Ezeiza",
    showcasePitch:
      "Demo real para @infinita_fashionstore: colección OI, carrito a WhatsApp 11-3003-3315, feed IG y video — lista para cerrar ventas.",
    showcaseFeatures: DEFAULT_FEATURES,
  },
  {
    slug: "moda-maison-elle",
    brand: "MAISON ELLE",
    monogram: "ME",
    tagline: "Silhouettes · Palermo",
    heroKicker: "Nueva Temporada",
    heroTitle: "Silueta",
    heroHighlight: "Atemporal.",
    heroImage: img("photo-1490481651871-ab68de25d574", 2000),
    collectionTitle: "Colección Primavera",
    collectionSubtitle: "Essentials de autor",
    products: [
      { id: 1, name: "Trench Camel", price: "Consultar", image: img("photo-1591047139829-d91aecb6caea") },
      { id: 2, name: "Vestido Lino", price: "Consultar", image: img("photo-1515372039744-b8f02a3ae446") },
      { id: 3, name: "Set Sastrero", price: "Consultar", image: img("photo-1509631179647-0c500ba1417f") },
      { id: 4, name: "Abrigo Lana", price: "Consultar", image: img("photo-1434389676629-43dffd6ac5f4") },
    ],
    instagramHandle: "maisonelle.boutique",
    instagramUrl: "https://www.instagram.com/",
    instagramFeed: [
      img("photo-1515886657613-9f3515b0c78f"),
      img("photo-1483985988355-763728e1935b"),
      img("photo-1539109136881-856bedc96a2b"),
      img("photo-1469334031218-e382a71b716b"),
    ],
    marqueeItems: ["PALERMO CHIC", "PRET A PORTER", "MAISON ELLE", "NEW DROP"],
    addressLines: ["Palermo, Ciudad de Buenos Aires", "Argentina"],
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016887987!2d-58.4262987!3d-34.588119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM1JzE3LjIiUyA1OMKwMjUnMzQuNyJX!5e0!3m2!1ses!2sar!4v1716000000000",
    whatsapp: "5491100000001",
    whatsappMessage: "Hola Maison Elle, quiero consultar por una prenda",
    footerLocation: "Maison Elle · Palermo",
    showcasePitch:
      "Boutique femenina Palermo: paleta neutra, grid editorial y CTA WhatsApp — mismo motor que INFINITA, otra identidad.",
    showcaseFeatures: DEFAULT_FEATURES,
  },
  {
    slug: "moda-atelier-noir",
    brand: "ATELIER NOIR",
    monogram: "AN",
    tagline: "Dark luxury · Recoleta",
    heroKicker: "Black Edition",
    heroTitle: "Noir",
    heroHighlight: "Éternel.",
    heroImage: img("photo-1509631179647-0c500ba1417f", 2000),
    collectionTitle: "Capsule Noire",
    collectionSubtitle: "Monocromo premium",
    products: [
      { id: 1, name: "Blazer Midnight", price: "Consultar", image: img("photo-1485968579580-b6d095142e6e") },
      { id: 2, name: "Vestido Satén", price: "Consultar", image: img("photo-1539008835657-9e8e9680c956") },
      { id: 3, name: "Capa Cuero", price: "Consultar", image: img("photo-1550614000-4b95d4ed79fa") },
      { id: 4, name: "Pantalón Wide", price: "Consultar", image: img("photo-1496747613176-220222e2e72f") },
    ],
    instagramHandle: "atelier.noir.store",
    instagramUrl: "https://www.instagram.com/",
    instagramFeed: [
      img("photo-1532453288672-3a27e9be9efd"),
      img("photo-1495385794356-15371f348c31"),
      img("photo-1483985988355-763728e1935b"),
      img("photo-1515886657613-9f3515b0c78f"),
    ],
    marqueeItems: ["DARK LUXURY", "RECOLETA", "ATELIER NOIR", "LIMITED"],
    addressLines: ["Recoleta, Ciudad de Buenos Aires", "Argentina"],
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.5!2d-58.393!3d-34.587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!5e0!3m2!1ses!2sar",
    whatsapp: "5491100000002",
    whatsappMessage: "Hola Atelier Noir, consulta por la colección",
    footerLocation: "Atelier Noir · Recoleta",
    showcasePitch: "Estética dark luxury para marcas premium: negro absoluto, tipografía serif y hover editorial.",
    showcaseFeatures: DEFAULT_FEATURES,
  },
  {
    slug: "moda-luna-boutique",
    brand: "LUNA",
    monogram: "☽",
    tagline: "Boutique nocturna · San Telmo",
    heroKicker: "Moonlight Drop",
    heroTitle: "Bajo la",
    heroHighlight: "Luna.",
    heroImage: img("photo-1539109136881-856bedc96a2b", 2000),
    collectionTitle: "Noche de Gala",
    collectionSubtitle: "Brillos y seda",
    products: [
      { id: 1, name: "Vestido Luna", price: "Consultar", image: img("photo-1515886657613-9f3515b0c78f") },
      { id: 2, name: "Top Brillo", price: "Consultar", image: img("photo-1539008835657-9e8e9680c956") },
      { id: 3, name: "Falda Plisada", price: "Consultar", image: img("photo-1496747613176-220222e2e72f") },
      { id: 4, name: "Kimono Seda", price: "Consultar", image: img("photo-1434389676629-43dffd6ac5f4") },
    ],
    instagramHandle: "luna.boutique.st",
    instagramUrl: "https://www.instagram.com/",
    instagramFeed: [
      img("photo-1469334031218-e382a71b716b"),
      img("photo-1509631179647-0c500ba1417f"),
      img("photo-1483985988355-763728e1935b"),
      img("photo-1532453288672-3a27e9be9efd"),
    ],
    marqueeItems: ["SAN TELMO", "NIGHT WEAR", "LUNA", "SILK"],
    addressLines: ["San Telmo, Ciudad de Buenos Aires", "Argentina"],
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285!2d-58.371!3d-34.621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!5e0!3m2!1ses!2sar",
    whatsapp: "5491100000003",
    whatsappMessage: "Hola Luna Boutique!",
    footerLocation: "Luna · San Telmo",
    showcasePitch: "San Telmo nocturno: seda, brillos y feed IG para locales con estética bohemia premium.",
    showcaseFeatures: DEFAULT_FEATURES,
  },
  {
    slug: "moda-silk-atelier",
    brand: "SILK",
    monogram: "S",
    tagline: "Alta costura · Belgrano",
    heroKicker: "Silk Session",
    heroTitle: "Pureza",
    heroHighlight: "Sedosa.",
    heroImage: img("photo-1515372039744-b8f02a3ae446", 2000),
    collectionTitle: "Archivo Seda",
    collectionSubtitle: "Piezas únicas",
    products: [
      { id: 1, name: "Blusa Seda", price: "Consultar", image: img("photo-1434389676629-43dffd6ac5f4") },
      { id: 2, name: "Palazzo Silk", price: "Consultar", image: img("photo-1515886657613-9f3515b0c78f") },
      { id: 3, name: "Scarf Print", price: "Consultar", image: img("photo-1539008835657-9e8e9680c956") },
      { id: 4, name: "Camisa Fluida", price: "Consultar", image: img("photo-1591047139829-d91aecb6caea") },
    ],
    instagramHandle: "silk.atelier.belgrano",
    instagramUrl: "https://www.instagram.com/",
    instagramFeed: [
      img("photo-1495385794356-15371f348c31"),
      img("photo-1515886657613-9f3515b0c78f"),
      img("photo-1483985988355-763728e1935b"),
      img("photo-1550614000-4b95d4ed79fa"),
    ],
    marqueeItems: ["BELGRANO", "SILK", "HAUTE", "ATELIER"],
    addressLines: ["Belgrano, Ciudad de Buenos Aires", "Argentina"],
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283!2d-58.457!3d-34.562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!5e0!3m2!1ses!2sar",
    whatsapp: "5491100000004",
    whatsappMessage: "Consulta Silk Atelier",
    footerLocation: "Silk · Belgrano",
    showcasePitch: "Belgrano premium: foco en seda y piezas fluidas, ideal para mostrar a ateliers locales.",
    showcaseFeatures: DEFAULT_FEATURES,
  },
  {
    slug: "moda-casa-nova",
    brand: "CASA NOVA",
    monogram: "CN",
    tagline: "Moda de autor · Villa Crespo",
    heroKicker: "Studio Drop",
    heroTitle: "Renacer",
    heroHighlight: "Con estilo.",
    heroImage: img("photo-1496747613176-220222e2e72f", 2000),
    collectionTitle: "Studio Collection",
    collectionSubtitle: "Diseño independiente",
    products: [
      { id: 1, name: "Chaqueta Patch", price: "Consultar", image: img("photo-1550614000-4b95d4ed79fa") },
      { id: 2, name: "Denim Nova", price: "Consultar", image: img("photo-1485968579580-b6d095142e6e") },
      { id: 3, name: "Top Crop", price: "Consultar", image: img("photo-1515886657613-9f3515b0c78f") },
      { id: 4, name: "Cargo Studio", price: "Consultar", image: img("photo-1509631179647-0c500ba1417f") },
    ],
    instagramHandle: "casanova.vc",
    instagramUrl: "https://www.instagram.com/",
    instagramFeed: [
      img("photo-1532453288672-3a27e9be9efd"),
      img("photo-1469334031218-e382a71b716b"),
      img("photo-1495385794356-15371f348c31"),
      img("photo-1539109136881-856bedc96a2b"),
    ],
    marqueeItems: ["VILLA CRESPO", "AUTOR", "CASA NOVA", "DROP"],
    addressLines: ["Villa Crespo, Ciudad de Buenos Aires", "Argentina"],
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284!2d-58.436!3d-34.598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!5e0!3m2!1ses!2sar",
    whatsapp: "5491100000005",
    whatsappMessage: "Hola Casa Nova!",
    footerLocation: "Casa Nova · Villa Crespo",
    showcasePitch: "Diseño independiente VC: look urbano-autor con la misma experiencia boutique que marcas francesas.",
    showcaseFeatures: DEFAULT_FEATURES,
  },
  {
    slug: "moda-linnea",
    brand: "LINNEA",
    monogram: "L",
    tagline: "Minimal nordic · Nordelta",
    heroKicker: "Soft Launch",
    heroTitle: "Líneas",
    heroHighlight: "Puras.",
    heroImage: img("photo-1434389676629-43dffd6ac5f4", 2000),
    collectionTitle: "Essentials",
    collectionSubtitle: "Minimal & clean",
    products: [
      { id: 1, name: "Coat Sand", price: "Consultar", image: img("photo-1591047139829-d91aecb6caea") },
      { id: 2, name: "Knit Beige", price: "Consultar", image: img("photo-1515372039744-b8f02a3ae446") },
      { id: 3, name: "Pant Wide", price: "Consultar", image: img("photo-1490481651871-ab68de25d574") },
      { id: 4, name: "Shirt White", price: "Consultar", image: img("photo-1485968579580-b6d095142e6e") },
    ],
    instagramHandle: "linnea.store",
    instagramUrl: "https://www.instagram.com/",
    instagramFeed: [
      img("photo-1483985988355-763728e1935b"),
      img("photo-1434389676629-43dffd6ac5f4"),
      img("photo-1515886657613-9f3515b0c78f"),
      img("photo-1509631179647-0c500ba1417f"),
    ],
    marqueeItems: ["NORDELTA", "MINIMAL", "LINNEA", "ESSENTIAL"],
    addressLines: ["Nordelta, Tigre", "Buenos Aires"],
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286!2d-58.65!3d-34.41!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!5e0!3m2!1ses!2sar",
    whatsapp: "5491100000006",
    whatsappMessage: "Hola Linnea, consulta por essentials",
    footerLocation: "Linnea · Nordelta",
    showcasePitch: "Minimal nordic para zonas residenciales: beige, líneas limpias y WhatsApp de alto ticket.",
    showcaseFeatures: DEFAULT_FEATURES,
  },
  {
    slug: "moda-maison-rose",
    brand: "MAISON ROSÉ",
    monogram: "MR",
    tagline: "Femme · Olivos",
    heroKicker: "Rosé Season",
    heroTitle: "Femme",
    heroHighlight: "Délicate.",
    heroImage: img("photo-1515886657613-9f3515b0c78f", 2000),
    collectionTitle: "Rosé Edit",
    collectionSubtitle: "Tonos suaves",
    products: [
      { id: 1, name: "Dress Blush", price: "Consultar", image: img("photo-1539008835657-9e8e9680c956") },
      { id: 2, name: "Set Rosé", price: "Consultar", image: img("photo-1515372039744-b8f02a3ae446") },
      { id: 3, name: "Bolero Knit", price: "Consultar", image: img("photo-1490481651871-ab68de25d574") },
      { id: 4, name: "Skirt Pleat", price: "Consultar", image: img("photo-1434389676629-43dffd6ac5f4") },
    ],
    instagramHandle: "maisonrose.olivos",
    instagramUrl: "https://www.instagram.com/",
    instagramFeed: [
      img("photo-1539109136881-856bedc96a2b"),
      img("photo-1515886657613-9f3515b0c78f"),
      img("photo-1495385794356-15371f348c31"),
      img("photo-1483985988355-763728e1935b"),
    ],
    marqueeItems: ["OLIVOS", "FEMME", "MAISON ROSÉ", "BLUSH"],
    addressLines: ["Olivos, Vicente López", "Buenos Aires"],
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285!2d-58.49!3d-34.51!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!5e0!3m2!1ses!2sar",
    whatsapp: "5491100000007",
    whatsappMessage: "Hola Maison Rosé!",
    footerLocation: "Maison Rosé · Olivos",
    showcasePitch: "Femme delicada zona norte: blush, serif y boutique map para comercios de festa y prêt-à-porter.",
    showcaseFeatures: DEFAULT_FEATURES,
  },
  {
    slug: "moda-urbano-chic",
    brand: "URBANO CHIC",
    monogram: "UC",
    tagline: "Street luxury · Caballito",
    heroKicker: "Street Drop",
    heroTitle: "Urbano",
    heroHighlight: "Sin límites.",
    heroImage: img("photo-1509631179647-0c500ba1417f", 2000),
    collectionTitle: "Street Edit",
    collectionSubtitle: "Luxury casual",
    products: [
      { id: 1, name: "Hoodie Premium", price: "Consultar", image: img("photo-1550614000-4b95d4ed79fa") },
      { id: 2, name: "Jacket Puffer", price: "Consultar", image: img("photo-1485968579580-b6d095142e6e") },
      { id: 3, name: "Set Urban", price: "Consultar", image: img("photo-1509631179647-0c500ba1417f") },
      { id: 4, name: "Cap Lab", price: "Consultar", image: img("photo-1496747613176-220222e2e72f") },
    ],
    instagramHandle: "urbano.chic.store",
    instagramUrl: "https://www.instagram.com/",
    instagramFeed: [
      img("photo-1532453288672-3a27e9be9efd"),
      img("photo-1550614000-4b95d4ed79fa"),
      img("photo-1469334031218-e382a71b716b"),
      img("photo-1483985988355-763728e1935b"),
    ],
    marqueeItems: ["CABALLITO", "STREET", "URBANO CHIC", "DROP"],
    addressLines: ["Caballito, Ciudad de Buenos Aires", "Argentina"],
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284!2d-58.44!3d-34.62!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!5e0!3m2!1ses!2sar",
    whatsapp: "5491100000008",
    whatsappMessage: "Hola Urbano Chic!",
    footerLocation: "Urbano Chic · Caballito",
    showcasePitch: "Street luxury: mismo layout editorial aplicado a moda urbana y drops limitados.",
    showcaseFeatures: DEFAULT_FEATURES,
  },
  {
    slug: "moda-vogue-estudio",
    brand: "VOGUE ESTUDIO",
    monogram: "VE",
    tagline: "Estudio de imagen · Microcentro",
    heroKicker: "Editorial Week",
    heroTitle: "Imagen",
    heroHighlight: "Total.",
    heroImage: img("photo-1483985988355-763728e1935b", 2000),
    collectionTitle: "Editorial",
    collectionSubtitle: "Estudio & retail",
    products: [
      { id: 1, name: "Look Editorial 01", price: "Consultar", image: img("photo-1469334031218-e382a71b716b") },
      { id: 2, name: "Look Editorial 02", price: "Consultar", image: img("photo-1539109136881-856bedc96a2b") },
      { id: 3, name: "Look Editorial 03", price: "Consultar", image: img("photo-1515886657613-9f3515b0c78f") },
      { id: 4, name: "Look Editorial 04", price: "Consultar", image: img("photo-1539008835657-9e8e9680c956") },
    ],
    instagramHandle: "vogue.estudio.ba",
    instagramUrl: "https://www.instagram.com/",
    instagramFeed: [
      img("photo-1495385794356-15371f348c31"),
      img("photo-1469334031218-e382a71b716b"),
      img("photo-1509631179647-0c500ba1417f"),
      img("photo-1532453288672-3a27e9be9efd"),
    ],
    marqueeItems: ["MICROCENTRO", "EDITORIAL", "VOGUE", "STUDIO"],
    addressLines: ["Microcentro, Ciudad de Buenos Aires", "Argentina"],
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284!2d-58.38!3d-34.60!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!5e0!3m2!1ses!2sar",
    whatsapp: "5491100000009",
    whatsappMessage: "Hola Vogue Estudio, quiero un look",
    footerLocation: "Vogue Estudio · CABA",
    showcasePitch: "Estudio + retail en microcentro: lookbook editorial para vender imagen y colección en un solo sitio.",
    showcaseFeatures: DEFAULT_FEATURES,
  },
];

export const RETAIL_FASHION_SLUGS = RETAIL_FASHION_DEMOS.map((d) => d.slug);

const BY_SLUG = new Map(RETAIL_FASHION_DEMOS.map((d) => [d.slug, d]));

export function isRetailFashionSlug(slug: string): boolean {
  return BY_SLUG.has(slug);
}

export function getRetailFashionConfig(slug: string): RetailFashionConfig | undefined {
  const raw = BY_SLUG.get(slug);
  return raw ? enrichFashionConfig(raw) : undefined;
}

export function whatsappUrl(config: RetailFashionConfig): string {
  return `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(config.whatsappMessage)}`;
}
