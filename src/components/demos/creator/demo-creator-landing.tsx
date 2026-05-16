"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Headphones,
  Mic,
  Package,
  Radio,
  Share2,
  Sparkles,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";
import { getCreatorConfig } from "@/lib/creator-demos";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DemoLeadForm } from "../demo-lead-form";
import "./demo-creator-premium.css";

type Props = { slug: string };

function useScrollReveal(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".cr-scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef]);
}

export function CreatorLanding({ slug }: Props) {
  const config = getCreatorConfig(slug);
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef);

  const [bookingOpen, setBookingOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedPlan, setSelectedPlan] = useState("");

  const v = config ? getDemoVisuals(slug) : null;

  const accentDim = useMemo(() => {
    if (!config) return "rgba(145,70,255,0.15)";
    const hex = config.accent.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, 0.15)`;
  }, [config]);

  useEffect(() => {
    if (!config) return;
    const popular = config.plans.find((p) => p.popular)?.name ?? config.plans[0]?.name ?? "";
    setSelectedPlan(popular);
  }, [config]);

  const toggleBooking = useCallback(() => setBookingOpen((o) => !o), []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = bookingOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [bookingOpen]);

  if (!config || !v) return null;

  const style = {
    "--cr-accent": config.accent,
    "--cr-accent-dim": accentDim,
  } as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      className="cr-premium relative min-h-screen overflow-x-hidden bg-[#050508] font-[family-name:var(--font-demo-b-creator)] text-slate-100 antialiased"
      style={style}
    >
      <div className="cr-grid-bg pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="cr-glow-orb -left-28 top-16 h-[28rem] w-[28rem]" aria-hidden />
      <div className="cr-glow-orb -right-24 bottom-32 h-72 w-72 opacity-25" aria-hidden />

      <header className="cr-glass fixed top-0 z-[100] w-full px-4 py-4 md:px-10 md:py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg border"
              style={{ borderColor: config.accent, color: config.accent }}
            >
              <Radio className="h-5 w-5" />
            </div>
            <div>
              <p className="font-[family-name:var(--font-demo-h-creator)] text-xl font-normal uppercase tracking-wide text-white md:text-2xl">
                {config.brand}
              </p>
              <p className="text-[9px] uppercase tracking-[0.35em] text-slate-500">{config.platformLabel}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 lg:flex">
            <a href="#planes" className="hover:text-[color:var(--cr-accent)]">
              Paquetes
            </a>
            <a href="#features" className="hover:text-[color:var(--cr-accent)]">
              Hub
            </a>
            <a href="#stack" className="hover:text-[color:var(--cr-accent)]">
              Stack
            </a>
            <a href="#faq" className="hover:text-[color:var(--cr-accent)]">
              FAQ
            </a>
            <a href="#demo-capacidades" className="hover:text-[color:var(--cr-accent)]">
              Módulos
            </a>
            <a href="#demo-contacto" className="hover:text-[color:var(--cr-accent)]">
              Contacto
            </a>
          </nav>
          <button type="button" onClick={toggleBooking} className="cr-btn-primary px-5 py-2.5 text-[10px] md:px-6">
            Reservar
          </button>
        </div>
      </header>

      <section className="relative flex min-h-screen items-center pt-24">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em]">
              <span className="cr-pulse-dot h-2 w-2 rounded-full" style={{ background: config.accent }} />
              {config.heroKicker}
            </div>
            <h1 className="mb-6 font-[family-name:var(--font-demo-h-creator)] text-5xl font-normal uppercase leading-[0.92] tracking-tight md:text-7xl lg:text-[5.5rem]">
              {config.heroTitle}
              <br />
              <span style={{ color: config.accent }}>{config.heroHighlight}</span>
            </h1>
            <p className="mb-10 max-w-xl text-base font-light leading-relaxed text-slate-400 md:text-lg">
              {config.heroSub}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button type="button" onClick={toggleBooking} className="cr-btn-primary px-8 py-4 text-[11px]">
                Lanzar mi hub
              </button>
              <a href="#planes" className="cr-btn-ghost inline-flex items-center gap-2 px-6 py-4">
                Ver paquetes <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-12 flex flex-wrap gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4" style={{ color: config.accent }} />
                {config.statLive}
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" style={{ color: config.accent }} />
                {config.statFollowers}
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" style={{ color: config.accent }} />
                {config.statEngagement}
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={v.cover}
                alt={config.industryLabel}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
              <div className="cr-glass absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl p-4 md:bottom-6 md:left-6 md:right-6 md:p-5">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-slate-500">Estado del hub</p>
                  <p className="text-sm font-bold text-white">{config.industryLabel}</p>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-black uppercase"
                  style={{ background: accentDim, color: config.accent }}
                >
                  Live
                </span>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 hidden rounded-xl border border-white/10 bg-[#0c0c12] p-4 md:block">
              <Video className="mb-2 h-5 w-5" style={{ color: config.accent }} />
              <p className="text-2xl font-black">4.9</p>
              <p className="text-[9px] uppercase tracking-widest text-slate-500">Rating marcas</p>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/5 bg-[#0c0c12]/80 py-4">
        <div className="cr-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-12 px-8">
              {config.platforms.map((plat) => (
                <span
                  key={`${dup}-${plat}`}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.35em] text-slate-500"
                >
                  <Share2 className="h-3 w-3" style={{ color: config.accent }} />
                  {plat}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="planes" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-10">
          <div className="mb-14 text-center md:mb-16">
            <h2 className="font-[family-name:var(--font-demo-h-creator)] text-4xl font-normal uppercase tracking-tight md:text-6xl">
              Elegí tu <span style={{ color: config.accent }}>paquete</span>
            </h2>
            <p className="mt-4 text-sm text-slate-500">Precios demo en ARS · sin permanencia · entrega guiada</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {config.plans.map((plan) => (
              <article
                key={plan.name}
                className={`cr-plan-card cr-scroll-reveal rounded-2xl p-8 ${plan.popular ? "is-popular" : ""}`}
              >
                {plan.popular ? (
                  <span
                    className="mb-4 inline-block rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-widest"
                    style={{ background: accentDim, color: config.accent }}
                  >
                    Más elegido
                  </span>
                ) : (
                  <span className="mb-4 block h-6" />
                )}
                <h3 className="text-xl font-black uppercase tracking-wider">{plan.name}</h3>
                <p className="mt-6 font-[family-name:var(--font-demo-h-creator)] text-4xl font-normal md:text-5xl">
                  {plan.price}
                  <span className="text-sm font-normal text-slate-500">/mes</span>
                </p>
                <ul className="mt-8 space-y-3 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 shrink-0" style={{ color: config.accent }} />
                    {plan.ram}
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 shrink-0" style={{ color: config.accent }} />
                    {plan.slots}
                  </li>
                  <li className="flex items-center gap-2">
                    <Package className="h-4 w-4 shrink-0" style={{ color: config.accent }} />
                    {plan.storage}
                  </li>
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlan(plan.name);
                    toggleBooking();
                  }}
                  className={`mt-10 w-full py-3 text-[10px] font-black uppercase tracking-widest ${
                    plan.popular ? "cr-btn-primary" : "cr-btn-ghost"
                  }`}
                >
                  Reservar paquete
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-white/5 bg-[#0c0c12]/50 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-10 lg:grid-cols-2">
          <div className="cr-scroll-reveal">
            <h2 className="mb-8 font-[family-name:var(--font-demo-h-creator)] text-3xl font-normal uppercase md:text-5xl">
              Tu hub <span style={{ color: config.accent }}>pro</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {config.features.map((f) => (
                <div key={f} className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <Mic className="mt-0.5 h-4 w-4 shrink-0" style={{ color: config.accent }} />
                  <span className="text-sm text-slate-400">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="cr-scroll-reveal relative aspect-video overflow-hidden rounded-2xl border border-white/10 lg:aspect-[4/3]">
            <Image src={v.a} alt="Vista del hub" fill className="object-cover" sizes="50vw" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#050508]/85 to-transparent" />
          </div>
        </div>
      </section>

      <section id="stack" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-10">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-demo-h-creator)] text-3xl font-normal uppercase md:text-5xl">
                Stack & <span style={{ color: config.accent }}>tools</span>
              </h2>
              <p className="mt-2 text-sm text-slate-500">Integraciones listas para conectar en producción</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {config.integrations.map((tool) => (
              <span
                key={tool}
                className="rounded-lg border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 transition-colors hover:border-[color:var(--cr-accent)] hover:text-white"
              >
                {tool}
              </span>
            ))}
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="relative h-48 overflow-hidden rounded-xl md:h-56">
              <Image src={v.b} alt="" fill className="object-cover opacity-85" sizes="33vw" />
            </div>
            <div className="relative h-48 overflow-hidden rounded-xl md:h-56">
              <Image src={v.c} alt="" fill className="object-cover opacity-85" sizes="33vw" />
            </div>
            <div className="relative h-48 overflow-hidden rounded-xl md:h-56">
              <Image src={v.d ?? v.b} alt="" fill className="object-cover opacity-85" sizes="33vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="cr-scroll-reveal mx-4 mb-20 md:mx-10">
        <div
          className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 rounded-2xl border p-8 md:flex-row md:p-12"
          style={{ borderColor: accentDim, background: `linear-gradient(135deg, ${accentDim}, transparent)` }}
        >
          <div className="flex items-start gap-4">
            <Headphones className="h-10 w-10 shrink-0" style={{ color: config.accent }} />
            <div>
              <h3 className="text-xl font-black uppercase tracking-wider">Soporte creator 24/7</h3>
              <p className="mt-2 max-w-lg text-sm text-slate-400">
                Te acompañamos con media kit, collabs, monetización y optimización mobile para {config.platformLabel}.
              </p>
            </div>
          </div>
          <Link href={`#lead-${slug}`} className="cr-btn-primary shrink-0 px-8 py-4 text-[10px]">
            Hablar con el equipo
          </Link>
        </div>
      </section>

      <section id="faq" className="border-t border-white/5 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 md:px-10">
          <h2 className="mb-12 text-center font-[family-name:var(--font-demo-h-creator)] text-3xl font-normal uppercase md:text-4xl">
            Preguntas frecuentes
          </h2>
          <div className="space-y-4">
            {config.faq.map((item, i) => {
              const open = openFaq === i;
              return (
                <button
                  key={item.q}
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="cr-glass w-full rounded-xl p-6 text-left"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-bold uppercase tracking-wider">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                      style={{ color: config.accent }}
                    />
                  </div>
                  {open ? <p className="mt-4 text-sm leading-relaxed text-slate-400">{item.a}</p> : null}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div id="demo-contacto">
        <DemoLeadForm
          slug={slug}
          brandLabel={`${config.brand} · ${config.platformLabel}`}
          theme={v.lead}
          kicker="Brief de proyecto"
          title="Contanos tu canal o programa"
          sub="Te respondemos con propuesta, timeline y mockups en menos de 24 h."
        />
      </div>

      <footer className="border-t border-white/5 px-4 py-12 text-center text-[10px] uppercase tracking-[0.4em] text-slate-600 md:px-10">
        © {new Date().getFullYear()} {config.brand} · Demo {config.industryLabel} · Marcas de terceros son referencia
        ilustrativa
      </footer>

      <div
        className={`fixed inset-0 z-[200] transition-opacity ${bookingOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!bookingOpen}
      >
        <button
          type="button"
          aria-label="Cerrar"
          onClick={closeBooking}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />
        <aside className="cr-glass absolute right-0 top-0 flex h-full w-full max-w-md flex-col justify-center p-8 md:p-12">
          <button type="button" onClick={closeBooking} className="absolute right-6 top-6 text-slate-500 hover:text-white">
            <X className="h-8 w-8" />
          </button>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: config.accent }}>
            Reserva · {config.platformLabel}
          </p>
          <h3 className="mt-4 font-[family-name:var(--font-demo-h-creator)] text-3xl font-normal uppercase">
            Lanzar mi hub
          </h3>
          <p className="mt-4 text-sm text-slate-400">Paquete seleccionado: {selectedPlan}</p>
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              closeBooking();
              document.getElementById(`lead-${slug}`)?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <input
              type="text"
              placeholder="Nombre o handle"
              className="w-full border-b border-white/10 bg-transparent py-3 text-sm outline-none focus:border-[color:var(--cr-accent)]"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border-b border-white/10 bg-transparent py-3 text-sm outline-none focus:border-[color:var(--cr-accent)]"
            />
            <select
              className="w-full border-b border-white/10 bg-transparent py-3 text-sm outline-none"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              {config.plans.map((p) => (
                <option key={p.name} value={p.name} className="bg-[#0c0c12]">
                  {p.name} — {p.price}/mes
                </option>
              ))}
            </select>
            <button type="submit" className="cr-btn-primary w-full py-4 text-[10px]">
              Enviar brief demo
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
