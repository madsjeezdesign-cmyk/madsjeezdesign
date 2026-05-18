/** The Barber Club — barbería premium demo */

export const THE_BARBER_CLUB_SLUG = "the-barber-club";

export type BarberService = {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  icon: string;
};

export type BarberPro = {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
};

export type BarberProduct = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

export type MembershipPlan = {
  id: string;
  name: string;
  price: number;
  badge?: string;
  features: string[];
  accent: string;
};

export type GalleryItem = {
  id: number;
  title: string;
  tag: string;
  image: string;
};

export type BookingDraft = {
  serviceId: string | null;
  barberId: string | null;
  date: string | null;
  time: string | null;
};

export const BARBER_CLUB_CONFIG = {
  slug: THE_BARBER_CLUB_SLUG,
  brand: "The Barber Club",
  tagline: "Grooming de autor · turnos premium",
  phone: "+54 11 5555-2830",
  whatsapp: "5491155552830",
  address: "Av. del Libertador 2830, Palermo, CABA",
  hours: "Lun–Sáb 10:00 – 21:00",
  heroImage:
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1600&auto=format&fit=crop",
} as const;

const img = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const BARBER_SERVICES: BarberService[] = [
  {
    id: "corte",
    name: "Corte de Pelo",
    price: 18500,
    duration: "45 min",
    description: "Corte a tijera y máquina con asesoramiento de estilo personalizado.",
    icon: "✂️",
  },
  {
    id: "barba",
    name: "Perfilado de Barba",
    price: 12000,
    duration: "30 min",
    description: "Perfilado con navaja, toalla caliente y bálsamo hidratante premium.",
    icon: "🪒",
  },
  {
    id: "combo",
    name: "Combo Premium",
    price: 26500,
    duration: "75 min",
    description: "Corte + barba + lavado energizante + masaje capilar express.",
    icon: "👑",
  },
];

export const BARBER_PROS: BarberPro[] = [
  {
    id: "mateo",
    name: "Mateo R.",
    specialty: "Fades & texturas",
    image: img("photo-1621605815971-fbc98d665ca0"),
    rating: 4.9,
  },
  {
    id: "diego",
    name: "Diego S.",
    specialty: "Barbas clásicas",
    image: img("photo-1622286342621-4bd786c2449a"),
    rating: 5,
  },
  {
    id: "luca",
    name: "Luca M.",
    specialty: "Color & styling",
    image: img("photo-1599351431202-1e0c36b1e6ea"),
    rating: 4.8,
  },
];

export const BARBER_PRODUCTS: BarberProduct[] = [
  {
    id: 1,
    name: "Cera Mate Signature",
    price: 8900,
    description: "Fijación media-alta, acabado natural sin residuos.",
    image: img("photo-1522338242992-e5a549dcb3cd", 400),
  },
  {
    id: 2,
    name: "Aceite de Barba Gold",
    price: 11200,
    description: "Argán y jojoba. Suaviza y da brillo controlado.",
    image: img("photo-1596755389375-c20601a6a0c8", 400),
  },
  {
    id: 3,
    name: "Champú Energizante",
    price: 7500,
    description: "Menta y cafeína. Limpieza profunda para cuero cabelludo.",
    image: img("photo-1571875257727-256c39da42af", 400),
  },
  {
    id: 4,
    name: "Aftershave Balm",
    price: 6800,
    description: "Calma la piel post afeitado con aloe y vitamina E.",
    image: img("photo-1556228720-195a672e8a03", 400),
  },
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "black",
    name: "Plan Black",
    price: 42000,
    features: [
      "2 cortes por mes",
      "10% off en productos",
      "Bebida de cortesía",
      "Reserva online prioritaria",
    ],
    accent: "border-zinc-600",
  },
  {
    id: "vip",
    name: "Plan VIP Gold",
    price: 68000,
    badge: "Más popular",
    features: [
      "Cortes ilimitados",
      "Perfilado de barba incluido",
      "Turnos prioritarios sin espera",
      "Tragos premium de cortesía",
      "20% off en shop",
    ],
    accent: "border-amber-500/60",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, title: "Skin Fade", tag: "Fade", image: img("photo-1622286342621-4bd786c2449a", 500) },
  { id: 2, title: "Beard Sculpt", tag: "Barba", image: img("photo-1621605815971-fbc98d665ca0", 500) },
  { id: 3, title: "Classic Pompadour", tag: "Clásico", image: img("photo-1503951914875-452162b0f3f1", 500) },
  { id: 4, title: "Textured Crop", tag: "Textura", image: img("photo-1599351431202-1e0c36b1e6ea", 500) },
  { id: 5, title: "Silver Blend", tag: "Color", image: img("photo-1620331315488-9ee3a09e1a40", 500) },
  { id: 6, title: "Executive Cut", tag: "Premium", image: img("photo-1593702279370-f8a3d0f3c2b6", 500) },
];

/** Mock occupied slots per barber+date key */
const OCCUPIED: Record<string, string[]> = {
  "mateo-2026-05-19": ["10:00", "11:30", "16:00"],
  "diego-2026-05-19": ["12:00", "15:00"],
  "luca-2026-05-20": ["10:30", "14:00", "18:30"],
};

const TIME_SLOTS = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
];

export function isTheBarberClubSlug(slug: string): boolean {
  return slug === THE_BARBER_CLUB_SLUG;
}

export function formatBarberPrice(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

export function getNextDays(count = 7): { key: string; label: string; weekday: string }[] {
  const days: { key: string; label: string; weekday: string }[] = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    if (d.getDay() === 0) continue; // skip Sunday
    const key = d.toISOString().slice(0, 10);
    days.push({
      key,
      label: d.toLocaleDateString("es-AR", { day: "numeric", month: "short" }),
      weekday: d.toLocaleDateString("es-AR", { weekday: "short" }),
    });
    if (days.length >= count) break;
  }
  return days.slice(0, count);
}

export function getAvailableSlots(barberId: string, date: string): { time: string; available: boolean }[] {
  const occupied = OCCUPIED[`${barberId}-${date}`] ?? [];
  return TIME_SLOTS.map((time) => ({
    time,
    available: !occupied.includes(time),
  }));
}

export function getServiceById(id: string | null) {
  return BARBER_SERVICES.find((s) => s.id === id);
}

export function getBarberById(id: string | null) {
  return BARBER_PROS.find((b) => b.id === id);
}
