"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  Calculator,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Shield,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  BELTRAN_BRIONES_CONFIG,
  BELTRAN_CASES,
  BELTRAN_LEGACY_PILLARS,
  BELTRAN_PILLARS,
  BELTRAN_STATS,
  BELTRAN_TESTIMONIALS,
} from "@/lib/beltran-briones";
import { BrickWallTitle } from "./brick-wall-title";
import "./beltran-briones.css";

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function calcRoi(propertyPrice: number, monthlyRent: number, expenses: number): number {
  if (propertyPrice <= 0) return 0;
  const annualRent = (monthlyRent - expenses) * 12;
  return (annualRent / propertyPrice) * 100;
}

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("es-AR", { maximumFractionDigits: decimals });
}

const PILLAR_ICONS = {
  trending: TrendingUp,
  building: Building2,
  book: BookOpen,
  search: Search,
} as const;

/* ─── Scroll reveal hook ────────────────────────────────────────────────────── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll(".bb-reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ─── Animated counter ──────────────────────────────────────────────────────── */
function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            setValue(ease * target);
            if (t < 1) requestAnimationFrame(tick);
            else setValue(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="bb-counter">
      {prefix}
      {fmt(value, decimals)}
      {suffix}
    </span>
  );
}

/* ─── Main component ────────────────────────────────────────────────────────── */
export function BeltranBrionesLanding() {
  const cfg = BELTRAN_BRIONES_CONFIG;
  const rootRef = useScrollReveal();

  /* Scroll */
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const stickyVisible = scrollY > 120;
  const buildingHeight = Math.min(scrollY / 1.1, 560);
  const heroScale = 1 + scrollY * 0.00008;

  /* ROI calculator */
  const [propertyPrice, setPropertyPrice] = useState(120_000);
  const [monthlyRent, setMonthlyRent] = useState(550);
  const [expenses, setExpenses] = useState(120);
  const roiRaw = calcRoi(propertyPrice, monthlyRent, expenses);
  const roiDisplay = roiRaw.toFixed(2);
  const plazoFijo = 3.5; // referencia
  const roiVsPlazo = (roiRaw - plazoFijo).toFixed(2);

  /* Testimonials */
  const [testiIdx, setTestiIdx] = useState(0);
  const nextTesti = useCallback(() => setTestiIdx((i) => (i + 1) % BELTRAN_TESTIMONIALS.length), []);
  const prevTesti = useCallback(() => setTestiIdx((i) => (i - 1 + BELTRAN_TESTIMONIALS.length) % BELTRAN_TESTIMONIALS.length), []);

  /* Lead */
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSent, setLeadSent] = useState(false);

  const waInvest = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent("Hola Beltrán, quiero información para invertir en ladrillos.")}`;
  const waBook = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent("Hola, quiero el libro / guía para aprender a invertir en real estate.")}`;
  const waCalc = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(`Hola Beltrán, calculé un ROI de ${roiDisplay}% en mi propiedad. ¿Podemos hablar?`)}`;

  function handleLead(e: React.FormEvent) {
    e.preventDefault();
    if (!leadEmail.trim()) return;
    setLeadSent(true);
  }

  /* Schema JSON-LD */
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://beltranbriones.com/#person",
        name: "Beltrán Briones",
        jobTitle: "Inversor & formador inmobiliario",
        url: "https://beltranbriones.com",
        telephone: cfg.phone,
        email: cfg.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Buenos Aires",
          addressRegion: "CABA",
          addressCountry: "AR",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://beltranbriones.com/#website",
        url: "https://beltranbriones.com",
        name: "Beltrán Briones · Real Estate",
        inLanguage: "es-AR",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Cuánto necesito para invertir en propiedades en Buenos Aires?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Con USD 50.000 ya podés acceder a operaciones rentables en zonas como Villa Crespo, Palermo o Caballito. El método Beltrán Briones te muestra cómo maximizar ese capital.",
            },
          },
          {
            "@type": "Question",
            name: "¿Qué ROI promedio tienen las inversiones inmobiliarias en CABA?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "El promedio del mercado está entre 4% y 12% anual en USD dependiendo de la zona y la tipología. Con nuestra estrategia de selección, los inversores logran entre 8% y 11%.",
            },
          },
        ],
      },
    ],
  });

  return (
    <div ref={rootRef} className="bb-root min-h-screen overflow-x-hidden bg-[#020202] text-gray-100 selection:bg-amber-500 selection:text-black">
      {/* Grain */}
      <div className="bb-grain" aria-hidden />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      />

      {/* ── Sticky Nav ─────────────────────────────────────────────────────── */}
      <nav className={`bb-sticky-nav flex items-center justify-between px-5 py-3.5 md:px-10 ${stickyVisible ? "is-visible" : ""}`}>
        <span className="text-sm font-black tracking-tight text-white">
          BELTRÁN <span className="text-amber-500">BRIONES</span>
        </span>
        <div className="flex items-center gap-3">
          <a href="#calculadora" className="hidden text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-amber-500 transition-colors md:block">
            Calculadora ROI
          </a>
          <a href={waInvest} target="_blank" rel="noopener noreferrer" className="bb-btn-primary py-2.5 px-5 text-[10px]">
            Invertir ahora
          </a>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative flex h-[160vh] flex-col items-center justify-start overflow-hidden pt-[14vh]">
        {/* Bg */}
        <div
          className="bb-hero-bg pointer-events-none fixed inset-0 -z-10"
          style={{ transform: `scale(${heroScale})` }}
          aria-hidden
        >
          <Image
            src={cfg.heroImage}
            alt={cfg.heroImageAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#020202]/50 via-[#020202]/75 to-[#020202]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#020202]/20 via-transparent to-[#020202]/20" />

        {/* Content sticky */}
        <div className="sticky top-[14vh] z-10 px-4 text-center">
          <div className="bb-reveal mb-5 inline-flex items-center gap-2.5 rounded-full border border-amber-500/25 bg-amber-500/8 px-5 py-2 is-visible">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-amber-400">
              {cfg.eliteKicker}
            </span>
          </div>

          {/* H1 construido ladrillo por ladrillo (código de referencia) */}
          <div className="relative inline-block px-2 md:px-8">
            <BrickWallTitle word={cfg.heroTitle} brickDelayMs={40} autoStartDelayMs={800} />
            <div className="bb-hero-title mt-4 text-[clamp(1.2rem,5vw,4rem)] font-black leading-none tracking-[0.25em] text-amber-500 drop-shadow-[0_0_40px_rgba(245,158,11,0.35)]">
              {cfg.heroSubtitle}
            </div>
          </div>

          <p className="mt-8 max-w-xl mx-auto text-base font-light tracking-widest text-gray-400 italic md:text-xl">
            {cfg.legacyTagline}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={waInvest} target="_blank" rel="noopener noreferrer" className="bb-btn-primary">
              <Building2 className="h-4 w-4" />
              {cfg.investCta}
            </a>
            <a href={waBook} target="_blank" rel="noopener noreferrer" className="bb-btn-secondary">
              <BookOpen className="h-4 w-4" />
              {cfg.bookCta}
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-[color:var(--muted-body)]">
            <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-amber-600" />Operaciones verificadas</span>
            <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-amber-600" />4.9★ en Google</span>
            <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-amber-600" />+1.200 inversores</span>
          </div>
        </div>
      </section>

      {/* ── Stats strip ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 border-y border-amber-500/12 bg-[#080808]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-amber-500/10 md:grid-cols-4">
          {BELTRAN_STATS.map((stat, i) => (
            <div key={stat.label} className={`bb-stat-card flex flex-col items-center justify-center px-6 py-10 text-center bb-reveal bb-reveal-delay-${i + 1}`}>
              <div className="mb-1 text-4xl font-black text-white md:text-5xl">
                <AnimatedCounter
                  target={stat.value}
                  prefix={"prefix" in stat ? stat.prefix : ""}
                  suffix={stat.suffix}
                  decimals={"prefix" in stat ? 0 : stat.suffix === "★" ? 1 : 0}
                />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--muted-body)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dual track ──────────────────────────────────────────────────────── */}
      <section className="px-4 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="bb-reveal mb-14 text-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.6em] text-amber-500">¿Cuál es tu objetivo?</p>
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">
              Elegí tu camino<br />
              <span className="bb-gold-shimmer">al Real Estate.</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Inversor */}
            <div className="bb-track-card bb-track-gold bb-reveal rounded-2xl border p-10 md:p-14">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
                <Building2 className="h-7 w-7 text-amber-500" />
              </div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-amber-500">Track A</p>
              <h3 className="mb-4 text-3xl font-black text-white md:text-4xl">Quiero invertir<br />mi capital</h3>
              <p className="mb-8 leading-relaxed text-zinc-400">
                Tenés dólares y querés que trabajen en ladrillos. Te guío desde la selección de la propiedad, la estructura de la operación y la gestión del activo para maximizar tu rentabilidad anual.
              </p>
              <ul className="mb-10 space-y-3 text-sm text-zinc-300">
                {["Análisis de zona y comparables", "Estructura legal y financiera", "Gestión del alquiler", "Estrategia de salida planificada"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href={waInvest} target="_blank" rel="noopener noreferrer" className="bb-btn-primary w-full justify-center">
                Invertir en ladrillos <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            {/* Agente */}
            <div className="bb-track-card bb-reveal rounded-2xl border border-white/8 bg-white/[0.025] p-10 md:p-14">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[color:var(--muted-body)]">Track B</p>
              <h3 className="mb-4 text-3xl font-black text-white md:text-4xl">Quiero vender<br />propiedades</h3>
              <p className="mb-8 leading-relaxed text-zinc-400">
                Aprendé el método completo para hacer tus primeras operaciones, dominar el cierre de alto ticket y construir una cartera de clientes que te genere comisiones consistentes.
              </p>
              <ul className="mb-10 space-y-3 text-sm text-zinc-300">
                {["Formación desde cero (sin experiencia previa)", "Scripts de venta y manejo de objeciones", "Cómo cerrar a precio de lista", "Comunidad de agentes activos"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[color:var(--muted-body)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href={waBook} target="_blank" rel="noopener noreferrer" className="bb-btn-secondary w-full justify-center">
                Obtener el libro gratis <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="bb-sep mx-auto max-w-6xl" />

      {/* ── Estructura del legado + torre ────────────────────────────────────── */}
      <section className="relative mx-auto flex max-w-7xl flex-col items-center gap-16 px-4 py-24 md:flex-row md:gap-24 md:py-36">
        <div className="flex-1 space-y-8">
          <Award className="h-10 w-10 text-amber-500" aria-hidden />
          <h2 className="bb-reveal text-5xl font-black leading-[0.92] tracking-tighter md:text-7xl">
            ESTRUCTURA
            <br />
            <span className="text-amber-500">DEL LEGADO</span>
          </h2>
          <p className="bb-reveal max-w-lg text-base leading-relaxed text-zinc-400">
            {cfg.subtitle}
          </p>
          <a href="#calculadora" className="bb-reveal inline-flex items-center gap-2 text-sm font-bold tracking-wider text-amber-500 uppercase hover:text-amber-400">
            Calcular mi ROI <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="relative flex h-[380px] flex-1 items-end justify-center md:h-[560px]">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020202] to-transparent z-10" />
          <div
            className="bb-tower relative flex w-52 flex-col items-center justify-end overflow-hidden border-x border-amber-500/25 bg-[#080808] md:w-64"
            style={{ height: `${buildingHeight}px` }}
          >
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="w-full border-t border-amber-500/10 py-2.5 first:border-t-0"
                style={{
                  opacity: buildingHeight > i * 36 ? 1 : 0.12,
                  background: i % 3 === 0 ? "linear-gradient(90deg, transparent, rgba(245,158,11,0.05), transparent)" : undefined,
                }}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-amber-500/15 to-transparent" />
          </div>
          {/* Side numbers */}
          {BELTRAN_LEGACY_PILLARS.map((p, i) => (
            <div
              key={p.number}
              className={`absolute text-right ${i === 0 ? "bottom-1/3 -left-4 md:left-0" : i === 1 ? "bottom-1/2 -left-4 md:left-0" : "bottom-2/3 -left-4 md:left-0"}`}
            >
              <div className="text-[10px] font-black text-amber-500/60">{p.number}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pilares */}
      <section className="bg-[#080808] py-20 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          {BELTRAN_LEGACY_PILLARS.map((pillar, i) => (
            <article
              key={pillar.title}
              className={`bb-reveal bb-reveal-delay-${i + 1} cursor-pointer rounded-2xl border border-white/6 p-10 transition-all duration-500 hover:border-amber-500/25 hover:bg-white/[0.02] md:p-12`}
            >
              <span className="mb-6 block text-3xl font-black text-amber-500/30">{pillar.number}</span>
              <h3 className="mb-4 text-2xl font-black tracking-tight md:text-3xl">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-[color:var(--muted-body)]">{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Método 4 pasos ──────────────────────────────────────────────────── */}
      <section className="px-4 py-24 md:py-36">
        <div className="mx-auto max-w-5xl">
          <div className="bb-reveal mb-16 text-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.6em] text-amber-500">Cómo trabajamos</p>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              El método <span className="text-amber-500">Beltrán Briones</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[color:var(--muted-body)]">
              Cuatro fases que llevaron a más de 320 inversores a cerrar sus primeras operaciones rentables.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {BELTRAN_PILLARS.map((step, i) => {
              const Icon = PILLAR_ICONS[step.icon] ?? TrendingUp;
              return (
                <article
                  key={step.step}
                  className={`bb-reveal bb-reveal-delay-${(i % 2) + 1} group flex gap-6 rounded-2xl border border-white/6 bg-white/[0.015] p-8 transition-all hover:border-amber-500/20 md:p-10`}
                >
                  <div className="bb-step-num flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-black text-amber-500">
                    {step.step}
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <Icon className="h-5 w-5 text-amber-500/70" />
                      <h3 className="font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-[color:var(--muted-body)]">{step.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <div className="bb-sep mx-auto max-w-6xl" />

      {/* ── ROI Calculator ──────────────────────────────────────────────────── */}
      <section id="calculadora" className="px-4 py-24 md:py-36">
        <div className="mx-auto max-w-5xl">
          <div className="bb-reveal mb-12 text-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.6em] text-amber-500">Herramienta gratuita</p>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">Calculadora de<br />rentabilidad (ROI)</h2>
            <p className="mx-auto mt-4 max-w-md text-[color:var(--muted-body)]">
              Ajustá los valores y descubrí cuánto puede rendir tu propiedad. Comparalo con un plazo fijo.
            </p>
          </div>

          <div className="bb-calc-panel bb-reveal rounded-3xl p-8 md:p-14">
            <div className="grid gap-14 md:grid-cols-2">
              {/* Sliders */}
              <div className="space-y-10">
                {/* Precio */}
                <div>
                  <div className="mb-3 flex justify-between">
                    <label className="text-sm font-medium text-zinc-400">Valor de la propiedad</label>
                    <span className="text-sm font-black text-amber-400">USD {fmt(propertyPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min={30000} max={500000} step={5000}
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    className="bb-slider w-full"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-zinc-700">
                    <span>USD 30k</span><span>USD 500k</span>
                  </div>
                </div>
                {/* Alquiler */}
                <div>
                  <div className="mb-3 flex justify-between">
                    <label className="text-sm font-medium text-zinc-400">Alquiler mensual</label>
                    <span className="text-sm font-black text-amber-400">USD {fmt(monthlyRent)}</span>
                  </div>
                  <input
                    type="range"
                    min={100} max={3000} step={50}
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Number(e.target.value))}
                    className="bb-slider w-full"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-zinc-700">
                    <span>USD 100</span><span>USD 3.000</span>
                  </div>
                </div>
                {/* Gastos */}
                <div>
                  <div className="mb-3 flex justify-between">
                    <label className="text-sm font-medium text-zinc-400">Gastos mensuales</label>
                    <span className="text-sm font-black text-white">USD {fmt(expenses)}</span>
                  </div>
                  <input
                    type="range"
                    min={0} max={800} step={20}
                    value={expenses}
                    onChange={(e) => setExpenses(Number(e.target.value))}
                    className="bb-slider w-full"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-zinc-700">
                    <span>USD 0</span><span>USD 800</span>
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="flex flex-col gap-6">
                <div className="bb-roi-result flex flex-col items-center justify-center rounded-2xl p-8 text-center">
                  <Calculator className="mb-3 h-6 w-6 text-amber-500/60" />
                  <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-amber-500">Tu rentabilidad anual</span>
                  <span className="text-7xl font-black text-amber-400 md:text-8xl">{roiDisplay}%</span>
                  <span className="mt-2 text-xs text-[color:var(--muted-body)] italic">sobre precio de compra</span>
                </div>
                {/* Comparison */}
                <div className="rounded-xl border border-white/6 bg-white/[0.02] p-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[color:var(--muted-body)]">Tu propiedad</span>
                    <span className="font-black text-amber-400">{roiDisplay}% anual</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[color:var(--muted-body)]">Plazo fijo ref.</span>
                    <span className="font-bold text-zinc-400">{plazoFijo.toFixed(1)}% anual</span>
                  </div>
                  <div className="bb-sep" />
                  <div className="flex justify-between text-sm font-black">
                    <span className="text-zinc-400">Diferencial</span>
                    <span className={Number(roiVsPlazo) >= 0 ? "text-green-400" : "text-red-400"}>
                      {Number(roiVsPlazo) >= 0 ? "+" : ""}{roiVsPlazo}%
                    </span>
                  </div>
                </div>
                <p className="text-center text-xs text-[color:var(--muted-body)] italic">
                  "Los números no mienten. ¿Esta inversión encaja con tu estrategia?"
                </p>
                <a
                  href={waCalc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bb-btn-primary w-full justify-center"
                >
                  <MessageCircle className="h-4 w-4" />
                  Consultá este ROI con Beltrán
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Casos de éxito ──────────────────────────────────────────────────── */}
      <section className="bg-[#080808] px-4 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="bb-reveal mb-14 text-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.6em] text-amber-500">Resultados reales</p>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Casos de éxito
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {BELTRAN_CASES.map((c, i) => (
              <article key={c.persona} className={`bb-case-card bb-reveal bb-reveal-delay-${i + 1} rounded-2xl overflow-hidden border border-white/6`}>
                <div className="relative h-52 w-full">
                  <Image src={c.img} alt={c.zona} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                </div>
                <div className="bb-case-content p-8">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">{c.zona}</span>
                    <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-[10px] font-black text-amber-400">ROI {c.roi}%</span>
                  </div>
                  <h3 className="mb-2 font-bold text-white">{c.persona}</h3>
                  <p className="mb-4 text-xs text-[color:var(--muted-body)]">{c.tipo} · Capital: {c.capital} · Plazo: {c.plazo}</p>
                  <blockquote className="border-l-2 border-amber-500/30 pl-4 text-sm italic leading-relaxed text-zinc-400">
                    "{c.quote}"
                  </blockquote>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonios ─────────────────────────────────────────────────────── */}
      <section className="px-4 py-24 md:py-36">
        <div className="mx-auto max-w-4xl">
          <div className="bb-reveal mb-14 text-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.6em] text-amber-500">Lo que dicen nuestros inversores</p>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">Testimonios</h2>
          </div>

          <div className="relative bb-reveal">
            {/* Main testimonial */}
            {(() => {
              const t = BELTRAN_TESTIMONIALS[testiIdx]!;
              return (
                <div className="bb-testimonial rounded-2xl border border-white/8 bg-white/[0.025] p-10 md:p-14">
                  <div className="bb-quote-mark mb-2">&ldquo;</div>
                  <blockquote className="mb-8 text-lg leading-relaxed text-zinc-200 md:text-xl">
                    {t.text}
                  </blockquote>
                  <div className="flex items-center gap-5">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-amber-500/25">
                      <Image src={t.img} alt={t.name} fill className="object-cover" sizes="56px" />
                    </div>
                    <div>
                      <div className="font-bold text-white">{t.name}</div>
                      <div className="text-xs text-[color:var(--muted-body)]">{t.role}</div>
                      <div className="mt-1 flex gap-0.5">
                        {Array.from({ length: t.stars }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Controls */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {BELTRAN_TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setTestiIdx(i)}
                    className={`h-1.5 rounded-full transition-all ${i === testiIdx ? "w-8 bg-amber-500" : "w-1.5 bg-zinc-700"}`}
                    aria-label={`Testimonio ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={prevTesti} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-amber-500/40" aria-label="Anterior">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button type="button" onClick={nextTesti} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-amber-500/40" aria-label="Siguiente">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bb-sep mx-auto max-w-6xl" />

      {/* ── Lead magnet / libro ──────────────────────────────────────────────── */}
      <section className="px-4 py-24 md:py-36">
        <div className="mx-auto max-w-5xl">
          <div className="bb-reveal overflow-hidden rounded-3xl border border-amber-500/18 bg-gradient-to-br from-amber-950/30 via-[#0d0a00] to-[#020202]">
            <div className="grid gap-10 p-10 md:grid-cols-2 md:gap-0 md:p-0">
              {/* Text */}
              <div className="flex flex-col justify-center md:p-14">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.6em] text-amber-500">Lead magnet · Descarga gratis</p>
                <h2 className="mb-4 text-3xl font-black md:text-4xl">{cfg.leadMagnetTitle}</h2>
                <p className="mb-8 leading-relaxed text-zinc-400">{cfg.leadMagnetSub}</p>
                {leadSent ? (
                  <div className="flex items-center gap-3 rounded-xl border border-amber-500/25 bg-amber-500/10 px-6 py-4">
                    <CheckCircle2 className="h-5 w-5 text-amber-500" />
                    <span className="text-sm font-medium text-amber-200">¡Listo! Revisá tu bandeja (demo)</span>
                  </div>
                ) : (
                  <form onSubmit={handleLead} className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      required
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="Tu email"
                      className="bb-input min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-[color:var(--muted-body)]"
                    />
                    <button type="submit" className="bb-btn-primary whitespace-nowrap">
                      Descargar gratis
                    </button>
                  </form>
                )}
              </div>
              {/* Image */}
              <div className="relative hidden min-h-[300px] overflow-hidden md:block">
                <Image
                  src={cfg.bookImage}
                  alt="Guía de inversión inmobiliaria Beltrán Briones"
                  fill
                  className="object-cover object-center"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d0a00] to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA final ───────────────────────────────────────────────────────── */}
      <section className="bb-cta-final px-4 py-28 md:py-40">
        <div className="bb-reveal mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.6em] text-amber-500">¿Listo para dar el primer paso?</p>
          <h2 className="mb-6 text-5xl font-black leading-[0.92] tracking-tighter md:text-7xl">
            Tu portafolio<br />
            <span className="text-amber-500">empieza hoy.</span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-zinc-400">
            Más de 320 inversores ya tomaron la decisión. Tu capital puede generar patrimonio real en Buenos Aires. La próxima operación puede ser la tuya.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={waInvest} target="_blank" rel="noopener noreferrer" className="bb-btn-primary text-sm px-10 py-5">
              <MessageCircle className="h-5 w-5" />
              Hablá con Beltrán ahora
            </a>
            <a href="#calculadora" className="bb-btn-secondary px-10 py-5">
              <Calculator className="h-5 w-5" />
              Calculá tu ROI primero
            </a>
          </div>
          <p className="mt-8 text-[10px] font-bold uppercase tracking-widest text-zinc-700">
            Sin compromiso · Respuesta en menos de 24 h · +1.200 inversores confían en el método
          </p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 bg-[#080808] px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h4 className="mb-4 text-2xl font-black tracking-tight">
              BELTRÁN <span className="text-amber-500">BRIONES</span>
            </h4>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-[color:var(--muted-body)]">
              Inversión inmobiliaria de élite y formación para agentes en el mercado de Buenos Aires. Más de 320 operaciones cerradas.
            </p>
            <div className="space-y-3 text-sm text-[color:var(--muted-body)]">
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-amber-600" />
                {cfg.address}
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-amber-600" />
                {cfg.phone}
              </p>
              <a href={`mailto:${cfg.email}`} className="flex items-center gap-3 hover:text-amber-500 transition-colors">
                <Mail className="h-4 w-4 shrink-0 text-amber-600" />
                {cfg.email}
              </a>
            </div>
          </div>
          <div>
            <h6 className="mb-6 text-[10px] font-bold uppercase tracking-[0.4em] text-white">Servicios</h6>
            <ul className="space-y-3 text-sm text-[color:var(--muted-body)]">
              {["Asesoría de inversión", "Gestión de activos", "Formación para agentes", "Calculadora ROI"].map((item) => (
                <li key={item}><a href={waInvest} className="hover:text-amber-500 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h6 className="mb-6 text-[10px] font-bold uppercase tracking-[0.4em] text-white">Zonas</h6>
            <ul className="space-y-3 text-sm text-[color:var(--muted-body)]">
              {["Palermo · CABA", "Belgrano · CABA", "Villa Crespo · CABA", "GBA Norte", "GBA Sur"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-amber-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-6xl border-t border-white/5 pt-8 flex flex-col items-center justify-between gap-4 text-[10px] text-zinc-700 sm:flex-row">
          <p>© 2025 Beltrán Briones · Inversión Inmobiliaria · Buenos Aires, Argentina</p>
          <Link href="/demos" className="text-amber-600/70 hover:text-amber-500 transition-colors">
            Demo MadsJeez Design →
          </Link>
        </div>
      </footer>

      {/* ── WhatsApp sticky ─────────────────────────────────────────────────── */}
      <a
        href={waInvest}
        target="_blank"
        rel="noopener noreferrer"
        className="bb-wa-btn"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </a>
    </div>
  );
}
