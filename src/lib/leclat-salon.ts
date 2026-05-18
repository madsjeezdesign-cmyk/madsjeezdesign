/** L'Éclat Salón Boutique — peluquería y estética premium demo */

export const LECLAT_SALON_SLUG = "leclat-salon";

export type SalonCategoryId = "corte" | "color" | "tratamientos" | "manicuria";

export type SalonService = {
  id: string;
  name: string;
  price: number;
  duration: string;
  category: SalonCategoryId;
  description: string;
  includes: string[];
};

export type SalonStylist = {
  id: string;
  name: string;
  specialty: string;
  image: string;
};

export type SalonProduct = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

export type GalleryWork = {
  id: number;
  title: string;
  tag: string;
  image: string;
};

export type SalonBookingDraft = {
  serviceIds: string[];
  stylistId: string | null;
  date: string | null;
  time: string | null;
  period: "morning" | "afternoon" | null;
};

export const SALON_CATEGORIES: { id: SalonCategoryId | "all"; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "corte", label: "Corte & Peinado" },
  { id: "color", label: "Colormetría & Balayage" },
  { id: "tratamientos", label: "Tratamientos Premium" },
  { id: "manicuria", label: "Manicuría & Estética" },
];

export const LECLAT_CONFIG = {
  slug: LECLAT_SALON_SLUG,
  brand: "L'Éclat",
  brandSub: "Salón Boutique",
  tagline: "Potenciamos tu belleza natural con arte, ciencia y cuidado",
  phone: "+54 11 4567-8901",
  addressLines: ["Av. San Martín 892", "Carlos Spegazzini, Ezeiza"],
  hoursWeek: "Mar–Mié 10:00 – 19:00",
  hoursPeak: "Jue–Sáb 9:00 – 21:00 (días estrella)",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Carlos+Spegazzini,+Ezeiza&t=&z=14&ie=UTF8&iwloc=&output=embed",
  mapsDirectionsUrl:
    "https://www.google.com/maps/search/?api=1&query=Carlos+Spegazzini,+Ezeiza",
  heroSlides: [
    {
      image:
        "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=2000&auto=format&fit=crop",
      title: "Cabello radiante",
      subtitle: "Cortes de autor · peinados de fiesta",
    },
    {
      image:
        "https://images.unsplash.com/photo-1554519934-e32b1629d9ee?q=80&w=2000&auto=format&fit=crop",
      title: "Colormetría de alta fidelidad",
      subtitle: "Balayage · babylights · glossing",
    },
    {
      image:
        "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=2000&auto=format&fit=crop",
      title: "Ritual de bienestar",
      subtitle: "Keratina · nutrición · manicura spa",
    },
  ],
} as const;

const img = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const SALON_SERVICES: SalonService[] = [
  {
    id: "corte-signature",
    name: "Corte Signature",
    price: 28500,
    duration: "60 min",
    category: "corte",
    description: "Asesoría de imagen, lavado ritual y acabado con productos de lujo.",
    includes: ["Diagnóstico capilar", "Lavado aromático", "Styling"],
  },
  {
    id: "peinado-evento",
    name: "Peinado de Evento",
    price: 35000,
    duration: "75 min",
    category: "corte",
    description: "Updo, ondas Hollywood o textura editorial para tu ocasión especial.",
    includes: ["Fijación de larga duración", "Detalle de accesorios"],
  },
  {
    id: "balayage",
    name: "Balayage Lumière",
    price: 89000,
    duration: "180 min",
    category: "color",
    description: "Iluminación progresiva personalizada con técnica free-hand.",
    includes: ["Tono de consulta", "Olaplex incluido", "Secado modelo"],
  },
  {
    id: "babylights",
    name: "Babylights & Gloss",
    price: 72000,
    duration: "150 min",
    category: "color",
    description: "Reflejos ultra finos y baño de brillo espejo.",
    includes: ["Coloración", "Glossing", "Tratamiento sellador"],
  },
  {
    id: "raiz",
    name: "Retoque de Raíz",
    price: 42000,
    duration: "90 min",
    category: "color",
    description: "Cobertura impecable con match de tono perfecto.",
    includes: ["Aplicación raíz", "Blend en medios", "Secado"],
  },
  {
    id: "keratina",
    name: "Keratina Premium",
    price: 95000,
    duration: "150 min",
    category: "tratamientos",
    description: "Alisado nutritivo con reducción de frizz por hasta 4 meses.",
    includes: ["Lavado detox", "Aplicación keratina", "Planchado sellador"],
  },
  {
    id: "nutricion",
    name: "Ritual Nutrición Profunda",
    price: 38000,
    duration: "60 min",
    category: "tratamientos",
    description: "Máscara de reconstrucción con vapor ozono.",
    includes: ["Diagnóstico", "Máscara custom", "Masaje capilar"],
  },
  {
    id: "manicura",
    name: "Manicura Spa Gel",
    price: 22000,
    duration: "60 min",
    category: "manicuria",
    description: "Esmaltado en gel larga duración con cuidado de cutículas.",
    includes: ["Limado", "Cutículas", "Esmaltado gel"],
  },
  {
    id: "combo-glow",
    name: "Combo Glow Total",
    price: 115000,
    duration: "240 min",
    category: "tratamientos",
    description: "Corte + color gloss + ritual nutrición en una experiencia.",
    includes: ["Corte", "Gloss", "Nutrición", "Peinado final"],
  },
];

export const SALON_STYLISTS: SalonStylist[] = [
  {
    id: "valentina",
    name: "Valentina M.",
    specialty: "Especialista en Balayage",
    image: img("photo-1554519934-e32b1629d9ee"),
  },
  {
    id: "camila",
    name: "Camila R.",
    specialty: "Colormetría & eventos",
    image: img("photo-1562322140-8baeececf3df"),
  },
  {
    id: "lucia",
    name: "Lucía P.",
    specialty: "Cortes & tratamientos",
    image: img("photo-1629397685944-7073f5589754"),
  },
];

export const SALON_PRODUCTS: SalonProduct[] = [
  {
    id: 1,
    name: "Champú Sin Sulfatos",
    price: 18500,
    description: "Limpieza suave · color protegido",
    image: img("photo-1675034743339-0b0747047727"),
  },
  {
    id: 2,
    name: "Aceite Reparador Midnight",
    price: 24000,
    description: "Brillo instantáneo · puntas selladas",
    image: img("photo-1634449571017-5fecfd26ad76"),
  },
  {
    id: 3,
    name: "Máscara Nutrición 5",
    price: 21000,
    description: "Reconstrucción profunda en casa",
    image: img("photo-1695527081848-1e46c06e6458"),
  },
  {
    id: 4,
    name: "Spray Térmico Shield",
    price: 16500,
    description: "Protección hasta 230°C",
    image: img("photo-1712213396688-c6f2d536671f"),
  },
];

export const SALON_GALLERY: GalleryWork[] = [
  {
    id: 1,
    title: "Balayage caramelo",
    tag: "Antes / Después",
    image: img("photo-1554519934-e32b1629d9ee"),
  },
  {
    id: 2,
    title: "Bob glass hair",
    tag: "Tendencia",
    image: img("photo-1619367901998-73b3a70b3898"),
  },
  {
    id: 3,
    title: "Updo de gala",
    tag: "Evento",
    image: img("photo-1613754773306-532ec48b0de5"),
  },
  {
    id: 4,
    title: "Rubio perla",
    tag: "Colormetría",
    image: img("photo-1581674210501-c760093514e8"),
  },
  {
    id: 5,
    title: "Nutrición brillo",
    tag: "Tratamiento",
    image: img("photo-1582095133179-bfd08e2fc6b3"),
  },
  {
    id: 6,
    title: "Manicura nude",
    tag: "Estética",
    image: img("photo-1593702288056-7927b442d0fa"),
  },
];

const MORNING_SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
const AFTERNOON_SLOTS = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "18:00"];

const OCCUPIED: Record<string, string[]> = {
  "valentina-2026-05-20": ["10:00", "15:00"],
  "camila-2026-05-21": ["11:30", "16:30"],
};

export function formatSalonPrice(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export function isLeclatSalonSlug(slug: string): boolean {
  return slug === LECLAT_SALON_SLUG;
}

export function getSalonService(id: string): SalonService | undefined {
  return SALON_SERVICES.find((s) => s.id === id);
}

export function getStylistById(id: string | null): SalonStylist | undefined {
  return SALON_STYLISTS.find((s) => s.id === id);
}

export function getSelectedServices(ids: string[]): SalonService[] {
  return SALON_SERVICES.filter((s) => ids.includes(s.id));
}

export function getServicesTotal(ids: string[]): number {
  return getSelectedServices(ids).reduce((s, svc) => s + svc.price, 0);
}

export function getNextSalonDays(count = 8): { key: string; label: string; weekday: string }[] {
  const days: { key: string; label: string; weekday: string }[] = [];
  const now = new Date();
  for (let i = 1; i <= 14 && days.length < count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    if (d.getDay() === 0) continue;
    const key = d.toISOString().slice(0, 10);
    days.push({
      key,
      label: d.toLocaleDateString("es-AR", { day: "numeric", month: "short" }),
      weekday: d.toLocaleDateString("es-AR", { weekday: "short" }),
    });
  }
  return days;
}

export function getSalonSlots(
  stylistId: string,
  date: string,
  period: "morning" | "afternoon",
): { time: string; available: boolean }[] {
  const base = period === "morning" ? MORNING_SLOTS : AFTERNOON_SLOTS;
  const occupied = OCCUPIED[`${stylistId}-${date}`] ?? [];
  return base.map((time) => ({ time, available: !occupied.includes(time) }));
}
