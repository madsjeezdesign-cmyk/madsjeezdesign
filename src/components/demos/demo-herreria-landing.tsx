"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Anvil,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  DoorOpen,
  Flame,
  Hammer,
  Layers,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Ruler,
  Share2,
  Shield,
  Sparkles,
  Star,
  Table,
  UtensilsCrossed,
  Wrench,
  X,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { site } from "@/lib/data";
import { DemoLeadForm } from "./demo-lead-form";
import "./demo-herreria-premium.css";

const SLUG = "herreria" as const;
const BRAND = "Forja Norte";
const TAGLINE = "Fusión & diseño industrial";

const NAV = [
  { label: "Portones", href: "#portones" },
  { label: "Parrillas", href: "#parrillas" },
  { label: "Mesas", href: "#mesas" },
  { label: "Materiales", href: "#materiales" },
  { label: "Obras", href: "#obras" },
  { label: "Contacto", href: "#contacto" },
] as const;

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82`;

function ForgeBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF4D00]">
      <Flame size={12} className="animate-pulse" />
      {children}
    </div>
  );
}

function ForgeCard({
  title,
  category,
  image,
  description,
}: {
  title: string;
  category: string;
  image: string;
  description: string;
}) {
  return (
    <article className="herr-forge-card group relative overflow-hidden rounded-[24px] border border-white/5 bg-[#1A1A1A]">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image}
          alt={`${title} — ${category}`}
          fill
          className="object-cover opacity-70 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-500 group-hover:-translate-y-1 md:p-8">
        <p className="mb-2 text-[9px] font-black uppercase tracking-[0.3em] text-[#FF4D00]">{category}</p>
        <h3 className="mb-3 font-[family-name:var(--font-demo-h-herreria)] text-xl font-bold uppercase tracking-tighter text-white md:text-2xl">
          {title}
        </h3>
        <p className="max-w-[260px] text-xs leading-relaxed text-gray-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {description}
        </p>
        <span className="mt-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white transition-colors group-hover:text-[#FF4D00]">
          Ver proyecto <ArrowUpRight size={14} />
        </span>
      </div>
    </article>
  );
}

const SPECIALTIES = [
  {
    icon: DoorOpen,
    title: "Portones",
    desc: "Diseños minimalistas con marcos de hierro pesado y lamas de aluminio anodizado. Livianos al motor, impenetrables al exterior.",
    href: "#portones",
  },
  {
    icon: UtensilsCrossed,
    title: "Parrillas",
    desc: "Emparrillados de hierro macizo, fogoneros reforzados y mesadas en maderas duras tratadas para intemperie.",
    href: "#parrillas",
  },
  {
    icon: Table,
    title: "Mesas industriales",
    desc: "Bases en acero soldado TIG coronadas con tapas de Quebracho, Guayubira o Petiribí macizo.",
    href: "#mesas",
  },
] as const;

const PORTFOLIO = [
  {
    title: "Portón minimal Alu-Iron",
    category: "Portones automáticos",
    image: img("photo-1600566753086-00f18efc2297", 1000),
    description: "Estructura tubular de alta densidad con perfiles de aluminio negro mate. Cero mantenimiento.",
  },
  {
    title: "Mesa Guayubira X",
    category: "Mobiliario industrial",
    image: img("photo-1577140917170-285929fb55b7", 1000),
    description: "Tapa maciza de 2\" sobre base estructural con soldaduras pulidas invisibles.",
  },
  {
    title: "Parrilla Fuego Cruzado",
    category: "Sistemas de asado",
    image: img("photo-1598514982205-f36b96d1e8d4", 1000),
    description: "Hierro en V, recolector inox, fogonero colgante y frente en madera tratada.",
  },
  {
    title: "Baranda vidrio + acero",
    category: "Residencial premium",
    image: img("photo-1541888942225-d81a192d04db", 1000),
    description: "Pasamanos en acero inoxidable con anclajes ocultos y vidrio templado.",
  },
  {
    title: "Escalera caracol",
    category: "Interior · loft",
    image: img("photo-1590649837877-78513ad8d0e8", 1000),
    description: "Estructura helicoidal calculada con peldaños en chapa antideslizante.",
  },
  {
    title: "Pérgola comercial",
    category: "Local · terraza",
    image: img("photo-1503387762-592deb58ef4a", 1000),
    description: "Cubierta en hierro con tratamiento anticorrosivo y canal de lluvia integrado.",
  },
] as const;

const MATERIALS = [
  {
    title: "Hierro estructural",
    desc: "La columna vertebral. Espesores industriales (mín. 2 mm) para que nada se deforme ni ceda.",
    icon: Hammer,
  },
  {
    title: "Maderas nativas",
    desc: "El alma de la pieza. Quebracho, Guayubira y Petiribí con hidrolaca poliuretánica antimanchas.",
    icon: Layers,
  },
  {
    title: "Aluminio aeronáutico",
    desc: "Menos peso en motores de portones y resistencia total a la corrosión marina.",
    icon: Shield,
  },
] as const;

const MATERIAL_IMAGES = [
  { src: img("photo-1504198458649-3128b932f49e", 1000), alt: "Detalle de hierro estructural en taller" },
  { src: img("photo-1610444319451-b0e6fa7f88da", 1000), alt: "Madera noble para mesadas y frentes" },
  { src: img("photo-1533090161767-e6ffed986c88", 1000), alt: "Taller de herrería y soldadura" },
] as const;

const SERVICES = [
  {
    title: "Barandas & balcones",
    desc: "Minimalistas o clásicas con terminación anticorrosiva y soldadura TIG.",
    icon: Layers,
  },
  {
    title: "Escaleras & estructuras",
    desc: "Caracol, rectas y pérgolas calculadas para carga y normativa local.",
    icon: Ruler,
  },
  {
    title: "Herrería artística",
    desc: "Faroles, rejas decorativas y detalles forjados a mano en yunque.",
    icon: Sparkles,
  },
  {
    title: "Reparación & refuerzo",
    desc: "Restauración de estructuras oxidadas y mantenimiento programado.",
    icon: Wrench,
  },
  {
    title: "Proyecto llave en mano",
    desc: "Boceto, fabricación e instalación con garantía escrita.",
    icon: Anvil,
  },
] as const;

const STEPS = [
  {
    n: "01",
    title: "Consulta en obra",
    text: "Medimos, fotografiamos y definimos estilo, plazos y presupuesto orientativo.",
  },
  {
    n: "02",
    title: "Diseño & planos",
    text: "Boceto, renders y plano de fabricación con materiales y terminaciones.",
  },
  {
    n: "03",
    title: "Forja en taller",
    text: "Corte, soldadura TIG/MIG y tratamiento anticorrosivo en 400 m² propios.",
  },
  {
    n: "04",
    title: "Instalación",
    text: "Montaje, nivelación y entrega con garantía escrita y manual de cuidado.",
  },
] as const;

const FAQ = [
  {
    q: "¿Cuánto tarda un portón a medida?",
    a: "Entre 3 y 5 semanas según automatización y acabados. Te damos cronograma firmado al aprobar el diseño.",
  },
  {
    q: "¿Trabajan con arquitectos?",
    a: "Sí. Entregamos planos DXF, memoria de cálculo demo y coordinación en obra con tu estudio.",
  },
  {
    q: "¿Qué garantía ofrecen?",
    a: "5 años en estructura soldada y 2 años en motores y herrajes demo. Todo por escrito.",
  },
  {
    q: "¿Puedo combinar hierro con madera en exteriores?",
    a: "Absolutamente. Usamos maderas tratadas y separadores térmicos para evitar humedad en el metal.",
  },
] as const;

const HOOKS = [
  { val: "48 h", label: "Presupuesto PDF" },
  { val: "5 años", label: "Garantía estructura" },
  { val: "400 m²", label: "Taller propio" },
  { val: "840+", label: "Obras entregadas" },
] as const;

function useScrollReveal(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".herr-scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.08 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef]);
}

export function DemoHerreriaLanding() {
  const rootRef = useRef<HTMLDivElement>(null);
  const v = getDemoVisuals(SLUG);
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useScrollReveal(rootRef);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileNav ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNav]);

  const scrollToLead = useCallback(() => {
    document.getElementById(`lead-${SLUG}`)?.scrollIntoView({ behavior: "smooth" });
    setMobileNav(false);
  }, []);

  return (
    <div
      ref={rootRef}
      id="top"
      className="herr-premium relative min-h-screen overflow-x-hidden bg-[#0A0A0A] font-[family-name:var(--font-demo-b-herreria)] text-gray-200 antialiased selection:bg-[#FF4D00] selection:text-white"
    >
      <div className="herr-grain" aria-hidden />
      <div className="herr-ember-glow pointer-events-none fixed inset-0 z-0" aria-hidden />

      <header
        className={`fixed top-0 z-[100] w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-white/5 bg-[#0A0A0A]/90 py-4 shadow-2xl backdrop-blur-xl"
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 md:px-8 lg:px-16">
          <Link href="#top" className="group flex cursor-pointer items-center gap-3">
            <div className="flex h-12 w-12 rotate-3 items-center justify-center rounded-lg bg-[#FF4D00] text-black transition-all duration-500 group-hover:rotate-0">
              <Hammer size={24} strokeWidth={2.5} />
            </div>
            <div>
              <span className="block font-[family-name:var(--font-demo-h-herreria)] text-xl font-black uppercase leading-none tracking-tighter text-white md:text-2xl">
                {BRAND}
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-gray-500">{TAGLINE}</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex xl:gap-12">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 transition-colors hover:text-[#FF4D00]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollToLead}
              className="hidden rounded-full border border-white/10 bg-white/5 px-6 py-3 text-[10px] font-black uppercase tracking-widest shadow-lg transition-all hover:bg-[#FF4D00] hover:text-white md:inline-flex"
            >
              Pedir presupuesto
            </button>
            <button
              type="button"
              className="rounded-lg border border-white/10 p-2.5 text-gray-300 lg:hidden"
              onClick={() => setMobileNav(true)}
              aria-label="Menú"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {mobileNav ? (
        <div className="fixed inset-0 z-[110] bg-[#0A0A0A]/98 p-6 backdrop-blur-xl lg:hidden">
          <div className="flex justify-end">
            <button type="button" onClick={() => setMobileNav(false)} aria-label="Cerrar">
              <X size={28} className="text-white" />
            </button>
          </div>
          <nav className="mt-12 flex flex-col gap-5">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileNav(false)}
                className="font-[family-name:var(--font-demo-h-herreria)] text-2xl font-black uppercase text-white"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={scrollToLead}
              className="mt-6 rounded-xl bg-[#FF4D00] py-4 text-sm font-black uppercase tracking-widest text-black"
            >
              Pedir presupuesto
            </button>
          </nav>
        </div>
      ) : null}

      <section className="relative z-10 flex min-h-screen items-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={v.cover}
            alt="Taller de herrería con chispas de soldadura"
            fill
            priority
            className="object-cover opacity-30 grayscale-[50%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/50" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-8 md:px-8 lg:px-16">
          <div className="max-w-4xl space-y-6 md:space-y-8">
            <ForgeBadge>Hierro · Madera · Aluminio</ForgeBadge>
            <h1 className="font-[family-name:var(--font-demo-h-herreria)] text-5xl font-black uppercase leading-[0.88] tracking-tighter text-white drop-shadow-2xl md:text-7xl lg:text-[5.5rem]">
              La fusión
              <br />
              <span className="herr-gradient-text">perfecta.</span>
            </h1>
            <p className="max-w-2xl text-base font-medium leading-relaxed text-gray-300 md:text-lg">
              Elevamos la herrería al diseño de autor. Combinamos la robustez del hierro, la calidez de la madera noble
              y la ligereza del aluminio para portones, parrillas y mesas que resisten una vida entera.
            </p>
            <div className="flex flex-wrap gap-4 pt-4 md:gap-6">
              <button
                type="button"
                onClick={() => document.getElementById("obras")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-4 rounded-xl bg-[#FF4D00] px-8 py-4 text-[11px] font-black uppercase tracking-widest text-black shadow-[0_20px_40px_-10px_rgba(255,77,0,0.4)] transition-all hover:bg-white md:px-10 md:py-5"
              >
                Ver proyectos <ChevronRight size={18} />
              </button>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-[11px] font-black uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:bg-white/10 md:px-10 md:py-5"
              >
                WhatsApp directo
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8 md:grid-cols-4 md:gap-6">
              {HOOKS.map((h) => (
                <div key={h.label}>
                  <p className="font-[family-name:var(--font-demo-h-herreria)] text-2xl font-black text-[#FF4D00] md:text-3xl">
                    {h.val}
                  </p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-gray-500">{h.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="especialidades" className="relative z-20 mx-auto max-w-7xl px-4 pb-8 md:px-8 lg:px-16">
        <div className="grid gap-6 md:grid-cols-3 md:gap-8 lg:-mt-32">
          {SPECIALTIES.map((s, i) => (
            <article
              key={s.title}
              id={s.href.slice(1)}
              className="herr-scroll-reveal herr-specialty-card group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#121212]/95 p-8 shadow-2xl backdrop-blur-xl md:p-10"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="pointer-events-none absolute right-0 top-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
                <s.icon size={120} />
              </div>
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-[#FF4D00] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#FF4D00] group-hover:text-black">
                <s.icon size={32} strokeWidth={2} />
              </div>
              <h3 className="mb-4 font-[family-name:var(--font-demo-h-herreria)] text-2xl font-bold uppercase tracking-tighter text-white">
                {s.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-400">{s.desc}</p>
              <div className="h-1 w-12 rounded-full bg-[#FF4D00] transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </section>

      <section id="servicios" className="relative z-10 border-y border-white/5 bg-[#121212] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <div className="herr-scroll-reveal mb-14 max-w-2xl">
            <div className="herr-title-line mb-6" />
            <ForgeBadge>Servicios integrales</ForgeBadge>
            <h2 className="mt-4 font-[family-name:var(--font-demo-h-herreria)] text-3xl font-black uppercase tracking-tighter text-white md:text-5xl">
              Más que portones y parrillas
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Un solo equipo para obra civil, arquitectura y particulares. Desde el boceto hasta el último tornillo.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <article
                key={s.title}
                className="herr-scroll-reveal rounded-2xl border border-white/5 bg-[#1A1A1A] p-6"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#FF4D00]/20 bg-[#FF4D00]/10 text-[#FF4D00]">
                  <s.icon size={22} />
                </div>
                <h3 className="font-bold uppercase tracking-tight text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="obras" className="relative z-10 py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <div className="herr-scroll-reveal mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <ForgeBadge>Galería de trabajos</ForgeBadge>
              <h2 className="font-[family-name:var(--font-demo-h-herreria)] text-4xl font-black uppercase tracking-tighter text-white md:text-6xl lg:text-7xl">
                Obras a medida
              </h2>
            </div>
            <p className="max-w-xs border-l-2 border-[#FF4D00] pl-6 text-sm font-bold uppercase tracking-widest text-gray-400">
              El equilibrio exacto entre la frialdad del metal y la calidez de la madera.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO.map((w, i) => (
              <div key={w.title} className="herr-scroll-reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <ForgeCard {...w} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="materiales" className="relative z-10 overflow-hidden border-y border-white/5 bg-[#121212] py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
            <div className="herr-scroll-reveal space-y-8">
              <h2 className="font-[family-name:var(--font-demo-h-herreria)] text-4xl font-black uppercase leading-[1.05] tracking-tighter text-white md:text-5xl lg:text-6xl">
                Nuestra <span className="text-[#FF4D00]">alquimia</span>
                <br />
                material.
              </h2>
              <p className="text-base font-medium leading-relaxed text-gray-400 md:text-lg">
                No limitamos la visión a un solo material. Combinamos estratégicamente tres elementos para piezas que
                soportan el tiempo y deslumbran visualmente.
              </p>
              <div className="space-y-4 pt-4">
                {MATERIALS.map((item, i) => (
                  <div
                    key={item.title}
                    className="herr-scroll-reveal flex gap-5 rounded-2xl border border-white/5 bg-white/5 p-5 transition-colors hover:border-[#FF4D00]/50"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black text-[#FF4D00]">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-white">{item.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={scrollToLead}
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#FF4D00] hover:text-white"
              >
                Pedir asesoría de materiales <ArrowRight size={14} />
              </button>
            </div>
            <div className="herr-scroll-reveal relative min-h-[480px] overflow-hidden rounded-[40px] lg:min-h-[720px]">
              <div className="absolute inset-0 grid grid-rows-3 gap-4">
                {MATERIAL_IMAGES.map((m) => (
                  <div key={m.alt} className="relative min-h-[140px] overflow-hidden rounded-3xl">
                    <Image
                      src={m.src}
                      alt={m.alt}
                      fill
                      className="object-cover opacity-80 transition-opacity duration-500 hover:opacity-100"
                      sizes="50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="proceso" className="relative z-10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="herr-scroll-reveal relative min-h-[420px] overflow-hidden rounded-[32px] border border-white/5 lg:min-h-[560px]">
              <Image
                src={v.e ?? v.cover}
                alt="Herrero forjando en taller Forja Norte"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-black/70 p-5 backdrop-blur-md">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#FF4D00]">Taller operativo</p>
                <p className="mt-1 text-sm font-semibold text-white">400 m² · TIG/MIG · Pintura electrostática</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF4D00]" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                    Turnos de visita demo
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="herr-scroll-reveal herr-title-line mb-6" />
              <div className="herr-scroll-reveal">
                <ForgeBadge>Proceso en 4 pasos</ForgeBadge>
                <h2 className="mt-4 font-[family-name:var(--font-demo-h-herreria)] text-3xl font-black uppercase tracking-tighter text-white md:text-4xl">
                  Sin sorpresas en obra
                </h2>
              </div>
              <ol className="mt-10 space-y-8">
                {STEPS.map((step, i) => (
                  <li
                    key={step.n}
                    className="herr-scroll-reveal flex gap-6"
                    style={{ transitionDelay: `${i * 70}ms` }}
                  >
                    <span className="font-[family-name:var(--font-demo-h-herreria)] text-4xl font-black leading-none text-[#FF4D00]/40">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="font-bold uppercase tracking-tight text-white">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-400">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/5 bg-[#121212] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <div className="herr-scroll-reveal mb-10 text-center">
            <ForgeBadge>Preguntas frecuentes</ForgeBadge>
            <h2 className="mt-4 font-[family-name:var(--font-demo-h-herreria)] text-2xl font-black uppercase text-white md:text-4xl">
              Antes de cotizar
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => {
              const open = openFaq === i;
              return (
                <button
                  key={item.q}
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="herr-scroll-reveal w-full rounded-2xl border border-white/5 bg-[#1A1A1A] p-5 text-left transition-colors hover:border-[#FF4D00]/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-bold uppercase tracking-wide text-white">{item.q}</span>
                    <ChevronRight
                      size={18}
                      className={`shrink-0 text-[#FF4D00] transition-transform ${open ? "rotate-90" : ""}`}
                    />
                  </div>
                  {open ? <p className="mt-4 text-sm leading-relaxed text-gray-400">{item.a}</p> : null}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <div className="herr-scroll-reveal mb-12 text-center">
            <ForgeBadge>Clientes</ForgeBadge>
            <h2 className="mt-4 font-[family-name:var(--font-demo-h-herreria)] text-3xl font-black uppercase text-white md:text-4xl">
              Confianza forjada en obra
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "El portón quedó impecable: aluminio liviano y estructura que no se mueve. Cumplieron el plazo al día.",
                name: "María G.",
                role: "Palermo · Portón Alu-Iron",
              },
              {
                quote:
                  "La parrilla integrada con mesada de Guayubira es el centro de la casa. Soldaduras que parecen de exposición.",
                name: "Diego L.",
                role: "San Isidro · Parrilla Fuego Cruzado",
              },
              {
                quote:
                  "Coordinaron con nuestro estudio de arquitectura. Planos, renders y montaje sin fricción en obra.",
                name: "Estudio R&V",
                role: "Belgrano · Barandas & pérgola",
              },
            ].map((t) => (
              <blockquote
                key={t.name}
                className="herr-scroll-reveal rounded-2xl border border-white/5 bg-[#1A1A1A] p-8"
              >
                <div className="mb-4 flex gap-0.5 text-[#FF4D00]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-gray-300">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-6 border-t border-white/10 pt-4">
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contacto"
        className="relative z-10 border-t border-[#FF4D00]/20 bg-gradient-to-b from-[#FF4D00]/5 to-transparent py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <div className="herr-scroll-reveal mb-12 rounded-2xl border border-[#FF4D00]/30 bg-[#FF4D00]/10 p-6 text-center md:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FF4D00]">Oferta demo</p>
            <p className="mt-2 font-[family-name:var(--font-demo-h-herreria)] text-xl font-black uppercase text-white md:text-2xl">
              Presupuesto PDF + visita técnica sin cargo
            </p>
            <p className="mt-2 text-sm text-gray-400">Respondemos en menos de 48 h hábiles · CABA & GBA</p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="herr-scroll-reveal">
              <ForgeBadge>Contacto directo</ForgeBadge>
              <h2 className="mt-4 font-[family-name:var(--font-demo-h-herreria)] text-3xl font-black uppercase tracking-tighter text-white md:text-5xl">
                Contanos tu proyecto
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-400">
                Medidas, fotos del espacio y tipo de pieza. Te devolvemos rango de inversión y cronograma antes de la
                visita.
              </p>
              <ul className="mt-8 space-y-4 text-sm font-bold uppercase tracking-widest text-gray-400">
                <li className="flex items-center gap-4">
                  <MapPin size={18} className="text-[#FF4D00]" />
                  Buenos Aires · GBA norte y sur
                </li>
                <li className="flex items-center gap-4">
                  <Phone size={18} className="text-[#FF4D00]" />
                  +54 11 5555-0192
                </li>
                <li className="flex items-center gap-4">
                  <Mail size={18} className="text-[#FF4D00]" />
                  taller@forjanorte.demo
                </li>
              </ul>
              <div className="mt-8 flex gap-3">
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 p-3 text-gray-400 transition-colors hover:border-[#FF4D00] hover:text-[#FF4D00]"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={20} />
                </a>
                <button
                  type="button"
                  className="rounded-full border border-white/10 p-3 text-gray-400 transition-colors hover:border-[#FF4D00] hover:text-[#FF4D00]"
                  aria-label="Compartir"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>
            <div className="herr-scroll-reveal rounded-3xl border border-white/10 bg-[#1A1A1A]/80 p-6 md:p-10">
              <DemoLeadForm
                slug={SLUG}
                brandLabel={BRAND}
                theme={v.lead}
                kicker="Hierro · madera · aluminio"
                title="Pedí presupuesto de fusión industrial"
                sub="Portones, parrillas y mesas a medida. Visitá el taller demo y recibí presupuesto PDF en 48 h."
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-[#FF4D00]/20 bg-[#050505] pt-20 pb-12">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <div className="mb-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
            <div className="space-y-6 lg:col-span-2">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FF4D00] text-black">
                  <Hammer size={24} />
                </div>
                <span className="font-[family-name:var(--font-demo-h-herreria)] text-2xl font-black uppercase tracking-tighter text-white">
                  {BRAND}
                </span>
              </div>
              <p className="max-w-md text-sm font-medium uppercase leading-loose tracking-widest text-gray-500">
                Maestros en la fusión de hierro, aluminio y madera. Diseños industriales creados para resistir una vida
                entera.
              </p>
            </div>
            <div>
              <h5 className="mb-6 text-[10px] font-black uppercase tracking-[0.4em] text-white">Fabricación</h5>
              <ul className="space-y-3 text-xs font-bold uppercase tracking-widest text-gray-500">
                {["Portones automatizados", "Parrillas de alto rendimiento", "Mesas industriales", "Escaleras a medida"].map(
                  (item) => (
                    <li key={item} className="cursor-default transition-colors hover:text-white">
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h5 className="mb-6 text-[10px] font-black uppercase tracking-[0.4em] text-white">Zona de obra</h5>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                CABA · Zona Norte · Zona Sur · La Plata
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-600">
              © {new Date().getFullYear()} {BRAND} · Demo {site.name}
            </p>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF4D00]" />
              <span className="text-[9px] font-black uppercase tracking-widest text-white">Taller operativo</span>
            </div>
          </div>
        </div>
      </footer>

      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="herr-float-cta fixed bottom-8 right-6 z-[200] flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF4D00] text-black shadow-[0_20px_50px_-10px_rgba(255,77,0,0.5)] transition-transform hover:-translate-y-1 md:bottom-10 md:right-10 md:h-20 md:w-20"
        aria-label="WhatsApp"
      >
        <MessageCircle size={28} strokeWidth={2.5} />
      </a>
    </div>
  );
}
