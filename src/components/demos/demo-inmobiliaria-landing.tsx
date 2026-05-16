"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Globe,
  MapPin,
  Phone,
  Quote,
  Share2,
  X,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DemoLeadForm } from "./demo-lead-form";
import "./demo-inmobiliaria-premium.css";

const SLUG = "inmobiliaria" as const;
const BRAND = "Horizonte Propiedades";

const PROPERTIES = [
  {
    id: "mare",
    location: "Ibiza, España",
    name: "Villa Mare",
    price: "€14.500.000",
    description:
      "Arquitectura orgánica integrada en el acantilado. 1.200 m² de mármol travertino, domótica total y vistas infinitas al Mediterráneo.",
    tags: ["6 suites", "Infinity pool", "Spa privado"],
    imageKey: "b" as const,
    offset: false,
  },
  {
    id: "atelier",
    location: "Madrid, Salamanca",
    name: "Atelier Penthouse",
    price: "€8.200.000",
    description:
      "Reforma integral de autor en edificio clásico. Techos de 4 metros, carpintería artesanal y terraza privada de 150 m².",
    tags: ["4 dormitorios", "Cava de vinos", "Concierge 24/7"],
    imageKey: "c" as const,
    offset: true,
  },
  {
    id: "horizonte",
    location: "Punta del Este, Uruguay",
    name: "Residencia Horizonte",
    price: "USD 6.800.000",
    description:
      "Frente al mar con doble altura, madera termotratada y sistema domótico KNX. Parcela cerrada con acceso directo a playa privada.",
    tags: ["5 suites", "Helipuerto cercano", "Wine cellar"],
    imageKey: "d" as const,
    offset: false,
  },
] as const;

const AGENTS = [
  {
    name: "Valentina Ríos",
    role: "Directora · residencias off-market",
    markets: "Madrid · Ibiza",
    imageKey: "e" as const,
  },
  {
    name: "Martín Albornoz",
    role: "Senior advisor · inversión patrimonial",
    markets: "CABA · Punta del Este",
    imageKey: "a" as const,
  },
  {
    name: "Camila Ferreyra",
    role: "Interiorismo & llave en mano",
    markets: "Barcelona · Málaga",
    imageKey: "cover" as const,
  },
] as const;

const PROCESS = [
  { n: "01", title: "Brief privado", text: "Definimos presupuesto, zona y estilo de vida en reunión confidencial." },
  { n: "02", title: "Curaduría off-market", text: "Acceso a activos no publicados y visitas con NDA firmado." },
  { n: "03", title: "Due diligence", text: "Legal, fiscal y técnica con despachos asociados en cada jurisdicción." },
  { n: "04", title: "Entrega legado", text: "Firma, staging final y gestión post-venta para family offices." },
] as const;

const MARKETS = ["Madrid", "Barcelona", "Málaga", "Punta del Este", "Miami", "Londres"] as const;

function useVanCursor() {
  const mainRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (mainRef.current) {
        mainRef.current.style.left = `${e.clientX}px`;
        mainRef.current.style.top = `${e.clientY}px`;
      }
      if (auraRef.current) {
        auraRef.current.style.left = `${e.clientX}px`;
        auraRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return {
    mainRef,
    auraRef,
    hovering,
    onEnter: useCallback(() => setHovering(true), []),
    onLeave: useCallback(() => setHovering(false), []),
  };
}

function useScrollReveal(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".van-scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef]);
}

export function DemoInmobiliariaLanding() {
  const v = getDemoVisuals(SLUG);
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef);
  const { mainRef, auraRef, hovering, onEnter, onLeave } = useVanCursor();

  const imageMap = {
    cover: v.cover,
    a: v.a,
    b: v.b,
    c: v.c,
    d: v.d ?? v.b,
    e: v.e ?? v.c,
  };

  const [headerGlass, setHeaderGlass] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [dossierOpen, setDossierOpen] = useState(false);
  const [portfolioIndex, setPortfolioIndex] = useState(0);

  const toggleDossier = useCallback(() => setDossierOpen((o) => !o), []);
  const closeDossier = useCallback(() => setDossierOpen(false), []);

  const visibleProperties = useMemo(() => {
    return [0, 1].map((i) => PROPERTIES[(portfolioIndex + i) % PROPERTIES.length]);
  }, [portfolioIndex]);

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollPct(height > 0 ? (winScroll / height) * 100 : 0);
      setHeaderGlass(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = dossierOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [dossierOpen]);

  const interactive = { onMouseEnter: onEnter, onMouseLeave: onLeave };

  return (
    <div
      ref={rootRef}
      className="van-premium relative min-h-screen overflow-x-hidden bg-[#0d0d0d] font-[family-name:var(--font-demo-b-inmobiliaria)] text-[#f5f2ed] antialiased selection:bg-[#a68966]/30"
    >
      <div className="van-scroll-line" style={{ width: `${scrollPct}%` }} aria-hidden />
      <div ref={mainRef} className="van-cursor-main hidden md:block" aria-hidden />
      <div
        ref={auraRef}
        className={`van-cursor-aura hidden md:block ${hovering ? "is-hover" : ""}`}
        aria-hidden
      />

      {/* Header */}
      <header
        className={`fixed top-0 z-[100] flex w-full items-center justify-between px-6 py-8 transition-all duration-700 md:px-12 ${
          headerGlass ? "van-glass-header py-5 md:py-6" : "md:py-10"
        }`}
      >
        <div className="flex items-center gap-8 md:gap-12">
          <div className="flex flex-col">
            <span className="font-[family-name:var(--font-demo-h-inmobiliaria)] text-2xl leading-none tracking-[0.15em] text-white md:text-4xl">
              HORIZONTE
            </span>
            <span className="mt-2 text-[7px] uppercase tracking-[0.8em] text-[#a68966]">
              Patrimonio & arquitectura
            </span>
          </div>
          <nav className="hidden gap-10 text-[9px] font-semibold tracking-[0.4em] text-white/40 xl:flex xl:gap-12">
            <a href="#proyectos" className="transition-colors hover:text-[#a68966]" {...interactive}>
              PORTFOLIO
            </a>
            <a href="#nosotros" className="transition-colors hover:text-[#a68966]" {...interactive}>
              LA FIRMA
            </a>
            <a href="#inversiones" className="transition-colors hover:text-[#a68966]" {...interactive}>
              ESTRATEGIA
            </a>
            <a href="#agentes" className="transition-colors hover:text-[#a68966]" {...interactive}>
              ASESORES
            </a>
            <a href="#contacto" className="transition-colors hover:text-[#a68966]" {...interactive}>
              CONTACTO
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-6 md:gap-8">
          <div className="hidden flex-col text-right md:flex">
            <span className="text-[9px] uppercase tracking-widest text-white/30">
              Atención privada
            </span>
            <span className="text-xs font-light tracking-widest text-[#a68966]">
              +54 11 4800 2200
            </span>
          </div>
          <button
            type="button"
            aria-label="Menú"
            className="flex h-10 w-10 flex-col items-end justify-center gap-1.5 group"
          >
            <span className="h-px w-8 bg-white transition-all group-hover:bg-[#a68966]" />
            <span className="h-px w-5 bg-white transition-all group-hover:bg-[#a68966]" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-black/40" />
          <Image
            src={imageMap.cover}
            alt="Residencia de lujo"
            fill
            priority
            className="van-ken-burns object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative z-20 max-w-5xl px-6 text-center md:px-8">
          <h5 className="mb-10 text-[10px] font-bold uppercase tracking-[1em] text-[#a68966] md:mb-12">
            Colección de residencias triple A
          </h5>
          <h1 className="mb-12 font-[family-name:var(--font-demo-h-inmobiliaria)] text-5xl italic leading-[0.9] md:text-7xl lg:text-[9rem]">
            Donde el diseño <br />
            <span className="not-italic text-white">se vuelve legado.</span>
          </h1>
          <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:gap-12">
            <button
              type="button"
              onClick={() =>
                document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" })
              }
              className="van-btn-vanguard"
              {...interactive}
            >
              Ver propiedades disponibles
            </button>
            <div className="flex items-center gap-6">
              <span className="h-px w-12 bg-[#a68966]/50 md:w-16" />
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/50">
                Explore el tour cinematográfico
              </span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 opacity-30">
          <span className="van-vertical-text text-[8px] uppercase tracking-[0.5em]">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Mercados */}
      <section className="border-y border-white/5 bg-white/[0.02] py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-6 md:gap-12 md:px-12">
          {MARKETS.map((m) => (
            <span
              key={m}
              className="text-[9px] font-semibold uppercase tracking-[0.35em] text-white/30"
            >
              {m}
            </span>
          ))}
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="bg-white/[0.02] py-24 md:py-40">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:gap-32 md:px-12 lg:grid-cols-2">
          <div className="van-scroll-reveal">
            <h5 className="mb-8 text-[10px] font-bold uppercase tracking-[0.5em] text-[#a68966]">
              Nuestra visión
            </h5>
            <h2 className="mb-10 font-[family-name:var(--font-demo-h-inmobiliaria)] text-4xl leading-tight text-white md:text-6xl">
              No vendemos metros cuadrados,{" "}
              <span className="italic text-[#a68966]">curamos experiencias de vida.</span>
            </h2>
            <div className="space-y-8 text-lg font-light leading-relaxed text-white/50">
              <p>
                En {BRAND}, seleccionamos únicamente activos triple A que cumplen con tres pilares
                innegociables: arquitectura de vanguardia, materiales nobles y ubicaciones que
                redefinen el mapa del lujo.
              </p>
              <p>
                Nuestra red global de inversores accede a oportunidades fuera del mercado, con
                privacidad y exclusividad que el alto nivel requiere.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-white/10 pt-10 md:mt-16 md:gap-12 md:pt-12">
              {[
                { v: "15+", l: "Años de excelencia" },
                { v: "€2B+", l: "Activos gestionados" },
                { v: "98%", l: "Clientela recurrente" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="mb-2 font-[family-name:var(--font-demo-h-inmobiliaria)] text-2xl text-[#a68966] md:text-3xl">
                    {s.v}
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-white/30">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="van-scroll-reveal relative" style={{ transitionDelay: "0.3s" }}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={imageMap.a}
                alt="Detalle de arquitectura de lujo"
                fill
                className="object-cover grayscale transition-all duration-1000 hover:grayscale-0"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-8 -left-6 max-w-xs border border-[#a68966]/20 bg-[#2d241e] p-8 md:-bottom-10 md:-left-10 md:p-12">
              <Quote className="mb-6 h-8 w-8 text-[#a68966]" strokeWidth={1.25} />
              <p className="font-[family-name:var(--font-demo-h-inmobiliaria)] text-lg italic text-white/80 md:text-xl">
                &ldquo;La verdadera sofisticación es la simplicidad absoluta.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="proyectos" className="py-24 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-16 flex flex-col items-end justify-between gap-8 md:mb-32 md:flex-row">
            <h2 className="font-[family-name:var(--font-demo-h-inmobiliaria)] text-4xl text-white md:text-7xl">
              Residencias <br />
              <span className="italic text-[#a68966]">destacadas.</span>
            </h2>
            <div className="flex gap-4">
              <button
                type="button"
                aria-label="Anterior"
                onClick={() =>
                  setPortfolioIndex((i) => (i === 0 ? PROPERTIES.length - 1 : i - 1))
                }
                className="flex h-12 w-12 items-center justify-center border border-white/10 transition-all hover:border-[#a68966] md:h-14 md:w-14"
                {...interactive}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Siguiente"
                onClick={() => setPortfolioIndex((i) => (i + 1) % PROPERTIES.length)}
                className="flex h-12 w-12 items-center justify-center border border-white/10 transition-all hover:border-[#a68966] md:h-14 md:w-14"
                {...interactive}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid gap-12 md:grid-cols-2 md:gap-20">
            {visibleProperties.map((prop, idx) => (
              <article
                key={prop.id}
                className={`van-property-frame van-scroll-reveal group ${prop.offset && idx === 1 ? "md:mt-20" : ""}`}
                style={{ transitionDelay: `${idx * 0.2}s` }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={imageMap[prop.imageKey]}
                    alt={prop.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute left-6 top-6 bg-[#0d0d0d]/60 px-4 py-1 text-[8px] uppercase tracking-[0.3em] backdrop-blur-md">
                    {prop.location}
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <h3 className="font-[family-name:var(--font-demo-h-inmobiliaria)] text-3xl italic text-white md:text-4xl">
                      {prop.name}
                    </h3>
                    <span className="shrink-0 text-sm font-semibold tracking-widest text-[#a68966]">
                      {prop.price}
                    </span>
                  </div>
                  <p className="mb-8 text-sm font-light leading-relaxed text-white/40 md:mb-10">
                    {prop.description}
                  </p>
                  <div className="flex flex-wrap gap-6 border-t border-white/5 pt-6 text-[9px] uppercase tracking-widest text-white/30 md:gap-10 md:pt-8">
                    {prop.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={toggleDossier}
                    className="mt-8 text-[9px] font-bold uppercase tracking-widest text-[#a68966] hover:text-white"
                    {...interactive}
                  >
                    Solicitar dossier privado →
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Tercera propiedad full width */}
          <article className="van-property-frame van-scroll-reveal group mt-16 md:mt-24">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[280px] lg:min-h-[400px]">
                <Image
                  src={imageMap.e}
                  alt={PROPERTIES[2].name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="50vw"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-14">
                <span className="mb-4 text-[8px] uppercase tracking-[0.3em] text-[#a68966]">
                  {PROPERTIES[2].location}
                </span>
                <h3 className="mb-6 font-[family-name:var(--font-demo-h-inmobiliaria)] text-3xl italic md:text-5xl">
                  {PROPERTIES[2].name}
                </h3>
                <p className="mb-8 font-light leading-relaxed text-white/40">
                  {PROPERTIES[2].description}
                </p>
                <span className="text-lg font-semibold tracking-widest text-[#a68966]">
                  {PROPERTIES[2].price}
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Proceso */}
      <section className="border-y border-white/5 bg-[#2d241e]/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h5 className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.5em] text-[#a68966]">
            Método Horizonte
          </h5>
          <h2 className="mb-14 text-center font-[family-name:var(--font-demo-h-inmobiliaria)] text-3xl text-white md:mb-20 md:text-5xl">
            De la primera reunión a la <span className="italic text-[#a68966]">llave en mano.</span>
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, i) => (
              <div
                key={step.n}
                className="van-scroll-reveal border border-white/5 bg-[#0d0d0d]/50 p-8"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span className="font-[family-name:var(--font-demo-h-inmobiliaria)] text-3xl text-[#a68966]">
                  {step.n}
                </span>
                <h4 className="mb-3 mt-4 text-sm font-bold uppercase tracking-widest">{step.title}</h4>
                <p className="text-sm font-light leading-relaxed text-white/40">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inversiones / concierge */}
      <section id="inversiones" className="relative py-24 md:py-40">
        <div className="pointer-events-none absolute inset-0 bg-[#a68966] opacity-[0.02]" aria-hidden />
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:gap-24 md:px-12 lg:grid-cols-2">
          <div className="relative order-2 min-h-[400px] lg:order-1 lg:min-h-[600px]">
            <Image
              src={imageMap.c}
              alt="Servicio de concierge inmobiliario"
              fill
              className="object-cover grayscale brightness-50"
              sizes="50vw"
            />
          </div>
          <div className="van-scroll-reveal order-1 lg:order-2">
            <h5 className="mb-8 text-[10px] font-bold uppercase tracking-[0.5em] text-[#a68966]">
              Servicio private wealth
            </h5>
            <h2 className="mb-10 font-[family-name:var(--font-demo-h-inmobiliaria)] text-4xl text-white md:text-6xl">
              Gestión de activos para el <span className="italic">family office.</span>
            </h2>
            <p className="mb-10 text-lg font-light leading-relaxed text-white/40 md:mb-12">
              Nuestro departamento de concierge real estate se encarga de todo: búsqueda discreta,
              gestión legal y interiorismo llave en mano.
            </p>
            <ul className="mb-12 space-y-5 text-sm font-light tracking-widest text-white/60 md:mb-16">
              {[
                "Acceso a listados off-market",
                "Due diligence legal & fiscal",
                "Proyectos de interiorismo de autor",
                "Tasaciones certificadas para patrimonio",
              ].map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <Check className="h-4 w-4 shrink-0 text-[#a68966]" />
                  {item}
                </li>
              ))}
            </ul>
            <button type="button" onClick={toggleDossier} className="van-btn-vanguard" {...interactive}>
              Solicitar dossier privado
            </button>
          </div>
        </div>
      </section>

      {/* Agentes */}
      <section id="agentes" className="bg-white/[0.02] py-24 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
            <div>
              <h5 className="mb-4 text-[10px] font-bold uppercase tracking-[0.5em] text-[#a68966]">
                Equipo directivo
              </h5>
              <h2 className="font-[family-name:var(--font-demo-h-inmobiliaria)] text-4xl text-white md:text-5xl">
                Sus asesores <span className="italic text-[#a68966]">de confianza.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm font-light text-white/40">
              Cada operación es liderada por un senior advisor con trayectoria en mercados
              internacionales y red verificada de compradores institucionales.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {AGENTS.map((agent, i) => (
              <article
                key={agent.name}
                className="van-scroll-reveal group border border-white/5 bg-[#111111]"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={imageMap[agent.imageKey]}
                    alt={agent.name}
                    fill
                    className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                    sizes="33vw"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h4 className="font-[family-name:var(--font-demo-h-inmobiliaria)] text-xl text-white md:text-2xl">
                    {agent.name}
                  </h4>
                  <p className="mt-2 text-[10px] uppercase tracking-widest text-[#a68966]">
                    {agent.role}
                  </p>
                  <p className="mt-4 flex items-center gap-2 text-xs text-white/40">
                    <MapPin className="h-3 w-3" />
                    {agent.markets}
                  </p>
                  <button
                    type="button"
                    onClick={toggleDossier}
                    className="mt-6 flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-white/50 hover:text-[#a68966]"
                    {...interactive}
                  >
                    <Phone className="h-3 w-3" />
                    Agendar reunión
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <DemoLeadForm
        slug={SLUG}
        brandLabel={BRAND}
        theme={v.lead}
        kicker="Captá leads calificados"
        title="Solicitá una propuesta personalizada"
        sub="Portfolio filtrable, fichas verificables y respuesta en menos de 24 h hábiles."
      />

      {/* Footer */}
      <footer id="contacto" className="border-t border-white/5 bg-black pt-24 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-24 grid gap-16 lg:grid-cols-2 lg:gap-40 md:mb-40">
            <div>
              <h4 className="mb-10 font-[family-name:var(--font-demo-h-inmobiliaria)] text-4xl text-white md:mb-12 md:text-7xl">
                Construyamos su <br />
                <span className="italic text-[#a68966]">próximo capítulo.</span>
              </h4>
              <form
                className="space-y-10"
                onSubmit={(e) => {
                  e.preventDefault();
                  document.getElementById("lead-inmobiliaria")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <div className="relative">
                  <label className="absolute -top-6 text-[8px] uppercase tracking-[0.4em] text-white/20">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    className="w-full border-b border-white/10 bg-transparent py-4 text-xs uppercase tracking-widest text-white outline-none transition-colors focus:border-[#a68966]"
                  />
                </div>
                <div className="relative">
                  <label className="absolute -top-6 text-[8px] uppercase tracking-[0.4em] text-white/20">
                    Email corporativo
                  </label>
                  <input
                    type="email"
                    className="w-full border-b border-white/10 bg-transparent py-4 text-xs uppercase tracking-widest text-white outline-none transition-colors focus:border-[#a68966]"
                  />
                </div>
                <button type="submit" className="group flex items-center gap-6" {...interactive}>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#a68966]">
                    Enviar consulta
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#a68966]/30 transition-all group-hover:bg-[#a68966] group-hover:text-[#0d0d0d]">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              </form>
            </div>
            <div className="grid grid-cols-2 gap-12 md:gap-20">
              <div>
                <h5 className="mb-8 text-[9px] font-bold uppercase tracking-[0.4em] text-[#a68966] md:mb-12">
                  Oficinas centrales
                </h5>
                <ul className="space-y-6 text-[10px] font-light leading-loose tracking-widest text-white/40">
                  <li>
                    BUENOS AIRES
                    <br />
                    Av. del Libertador 5800
                    <br />
                    C1428 CABA
                  </li>
                  <li>
                    MADRID
                    <br />
                    Calle de Claudio Coello, 45
                    <br />
                    28001 Salamanca
                  </li>
                  <li>
                    PUNTA DEL ESTE
                    <br />
                    Ruta 10 km 182
                    <br />
                    Maldonado
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="mb-8 text-[9px] font-bold uppercase tracking-[0.4em] text-[#a68966] md:mb-12">
                  Explorar
                </h5>
                <ul className="space-y-5 text-[10px] font-bold tracking-widest text-white/40">
                  <li>
                    <a href="#inversiones" className="transition-colors hover:text-white">
                      INVERSIONES
                    </a>
                  </li>
                  <li>
                    <a href="#agentes" className="transition-colors hover:text-white">
                      ASESORES
                    </a>
                  </li>
                  <li>
                    <Link href="#lead-inmobiliaria" className="transition-colors hover:text-white">
                      MEMBRESÍA VIP
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-12 md:flex-row md:pt-16">
            <span className="text-[8px] uppercase tracking-[0.8em] text-white/10">
              © {new Date().getFullYear()} {BRAND.toUpperCase()} · DEMO
            </span>
            <div className="flex gap-8 md:gap-10">
              <Share2 className="h-4 w-4 cursor-pointer text-white/20 transition-colors hover:text-[#a68966]" />
              <Globe className="h-4 w-4 cursor-pointer text-white/20 transition-colors hover:text-[#a68966]" />
            </div>
          </div>
        </div>
      </footer>

      {/* Modal dossier */}
      <div
        className={`fixed inset-0 z-[200] transition-opacity duration-300 ${dossierOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!dossierOpen}
      >
        <button
          type="button"
          aria-label="Cerrar"
          onClick={closeDossier}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />
        <aside className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col justify-center overflow-y-auto border-l border-white/5 bg-[#0d0d0d] p-10 md:p-14">
          <button
            type="button"
            onClick={closeDossier}
            className="absolute right-6 top-6 text-white/30 hover:text-[#a68966]"
            aria-label="Cerrar panel"
          >
            <X className="h-8 w-8" />
          </button>
          <h3 className="mb-4 font-[family-name:var(--font-demo-h-inmobiliaria)] text-4xl italic text-white">
            Dossier <span className="text-[#a68966]">privado</span>
          </h3>
          <p className="mb-10 text-sm text-white/40">
            Recibí fichas técnicas, planos y comparables off-market bajo NDA.
          </p>
          <form
            className="space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              closeDossier();
              document.getElementById("lead-inmobiliaria")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <input
              type="text"
              placeholder="NOMBRE"
              className="w-full border-b border-white/10 bg-transparent py-3 text-xs tracking-widest outline-none focus:border-[#a68966]"
            />
            <input
              type="email"
              placeholder="EMAIL CORPORATIVO"
              className="w-full border-b border-white/10 bg-transparent py-3 text-xs tracking-widest outline-none focus:border-[#a68966]"
            />
            <select className="w-full border-b border-white/10 bg-transparent py-3 text-xs tracking-widest outline-none">
              <option className="bg-black">Compra residencial</option>
              <option className="bg-black">Inversión patrimonial</option>
              <option className="bg-black">Tasación certificada</option>
            </select>
            <button type="submit" className="van-btn-vanguard w-full text-center">
              Enviar solicitud
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}

export { DemoInmobiliariaLanding as DemoInmobiliaria };
