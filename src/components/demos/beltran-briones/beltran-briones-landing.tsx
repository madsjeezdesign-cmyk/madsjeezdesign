"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  Building2,
  Calculator,
  Mail,
  MessageCircle,
  Star,
  TrendingUp,
} from "lucide-react";
import {
  BELTRAN_BRIONES_CONFIG,
  BELTRAN_LEGACY_PILLARS,
  BELTRAN_PILLARS,
} from "@/lib/beltran-briones";
import "./beltran-briones.css";

const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

function calcRoi(propertyPrice: number, monthlyRent: number, expenses: number): string {
  if (propertyPrice <= 0) return "0.00";
  const annualRent = (monthlyRent - expenses) * 12;
  return ((annualRent / propertyPrice) * 100).toFixed(2);
}

const PILLAR_ICONS = {
  trending: TrendingUp,
  building: Building2,
  book: BookOpen,
} as const;

export function BeltranBrionesLanding() {
  const cfg = BELTRAN_BRIONES_CONFIG;
  const [scrollY, setScrollY] = useState(0);
  const [propertyPrice, setPropertyPrice] = useState(100_000);
  const [monthlyRent, setMonthlyRent] = useState(400);
  const [expenses, setExpenses] = useState(100);
  const [roiManual, setRoiManual] = useState<string | null>(null);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSent, setLeadSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const buildingHeight = Math.min(scrollY / 1.1, 580);
  const textProgress = Math.min(Math.max(((scrollY - 50) / 300) * 100, 0), 100);
  const heroScale = 1 + scrollY * 0.0001;

  const roiComputed = useMemo(
    () => calcRoi(propertyPrice, monthlyRent, expenses),
    [propertyPrice, monthlyRent, expenses],
  );
  const roiDisplay = roiManual ?? roiComputed;

  const runCalculate = useCallback(() => {
    setRoiManual(calcRoi(propertyPrice, monthlyRent, expenses));
  }, [propertyPrice, monthlyRent, expenses]);

  const waInvest = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(
    "Hola Beltrán, quiero información para invertir en ladrillos.",
  )}`;
  const waBook = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(
    "Hola, quiero el libro / curso para aprender a vender propiedades.",
  )}`;

  function handleLead(e: React.FormEvent) {
    e.preventDefault();
    if (!leadEmail.trim()) return;
    setLeadSent(true);
  }

  return (
    <div className="bb-root min-h-screen overflow-x-hidden bg-[#020202] font-sans text-gray-100 selection:bg-amber-500 selection:text-black">
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.04]"
        style={{ backgroundImage: NOISE_BG }}
        aria-hidden
      />

      {/* Hero cinematográfico */}
      <section className="relative flex h-[150vh] flex-col items-center justify-start pt-[18vh]">
        <div
          className="bb-hero-bg pointer-events-none fixed inset-0 -z-10 scale-105"
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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#020202]/40 via-[#020202]/80 to-[#020202]" />

        <div className="sticky top-[18vh] z-10 px-4 text-center">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.8em] text-amber-500">
            {cfg.eliteKicker}
          </p>

          <div className="relative inline-block px-2 md:px-10">
            <h1
              className="bb-hero-title text-[clamp(4.5rem,22vw,16rem)] font-black leading-none tracking-[-0.05em] text-white drop-shadow-[0_0_80px_rgba(255,255,255,0.2)]"
              style={{
                WebkitMaskImage: `linear-gradient(to top, black ${textProgress}%, transparent ${textProgress + 5}%)`,
                maskImage: `linear-gradient(to top, black ${textProgress}%, transparent ${textProgress + 5}%)`,
              }}
            >
              {cfg.heroTitle}
            </h1>

            {textProgress > 0 && textProgress < 98 && (
              <div
                className="absolute right-0 left-0 z-20 h-1.5 bg-amber-400 blur-sm shadow-[0_0_20px_rgba(251,191,36,0.8)]"
                style={{
                  bottom: `${textProgress}%`,
                  opacity: 1 - textProgress / 100,
                }}
                aria-hidden
              />
            )}
          </div>

          <p className="mt-8 text-xl font-light tracking-[0.3em] text-gray-400 italic md:text-3xl">
            {cfg.legacyTagline}
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={waInvest}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-amber-500/40 bg-amber-500 px-8 py-3.5 text-xs font-bold tracking-widest text-black uppercase transition hover:bg-amber-400"
            >
              {cfg.investCta}
            </a>
            <a
              href={waBook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/20 bg-white/5 px-8 py-3.5 text-xs font-bold tracking-widest text-white uppercase backdrop-blur-sm transition hover:border-amber-500/40"
            >
              {cfg.bookCta}
            </a>
          </div>
        </div>
      </section>

      {/* Estructura del legado + torre */}
      <section className="relative mx-auto flex max-w-7xl flex-col items-center gap-20 px-6 py-32 md:flex-row md:gap-32 md:py-40">
        <div className="z-20 flex-1 space-y-8">
          <Award className="h-10 w-10 text-amber-500" aria-hidden />
          <h2 className="text-5xl leading-[0.9] font-black tracking-tighter md:text-8xl">
            ESTRUCTURA
            <br />
            <span className="text-amber-500">DEL LEGADO</span>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-zinc-400 md:text-base">
            {cfg.subtitle}
          </p>
          <a
            href="#calculadora"
            className="inline-flex text-xs font-bold tracking-[0.25em] text-amber-500 uppercase hover:text-amber-400"
          >
            Calcular ROI →
          </a>
        </div>

        <div className="relative flex h-[420px] flex-1 items-end justify-center md:h-[600px]">
          <div
            className="bb-tower relative flex w-56 flex-col items-center justify-end overflow-hidden border-x border-amber-500/30 bg-[#0a0a0a] transition-[height] duration-[2000ms] ease-out md:w-72"
            style={{ height: `${buildingHeight}px` }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-full border-t border-amber-500/10 py-3 first:border-t-0"
                style={{
                  opacity: buildingHeight > i * 40 ? 1 : 0.15,
                  background:
                    i % 2 === 0
                      ? "linear-gradient(90deg, transparent, rgba(245,158,11,0.06), transparent)"
                      : undefined,
                }}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-amber-500/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Pilares elite */}
      <section className="bg-[#0a0a0a] py-24 md:py-40">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3 md:gap-10">
          {BELTRAN_LEGACY_PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              className="cursor-pointer border border-white/5 p-10 transition-all duration-700 hover:border-amber-500/30 md:p-16"
            >
              <Star className="mb-8 text-amber-500 md:mb-10" size={40} strokeWidth={1.25} aria-hidden />
              <h3 className="mb-4 text-3xl font-black md:text-5xl">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-500">{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Método (pilares educativos) */}
      <section className="border-y border-white/5 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-black tracking-tight md:text-4xl">
            El método <span className="text-amber-500">Beltrán Briones</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {BELTRAN_PILLARS.map((p) => {
              const Icon = PILLAR_ICONS[p.icon];
              return (
                <article
                  key={p.title}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <Icon className="mb-4 h-7 w-7 text-amber-500" aria-hidden />
                  <h3 className="mb-2 font-bold text-white">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-500">{p.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calculadora ROI */}
      <section id="calculadora" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 md:p-10">
          <div className="mb-8 flex items-center gap-3">
            <Calculator className="h-8 w-8 text-amber-500" aria-hidden />
            <h2 className="text-2xl font-bold md:text-3xl">Calculadora de rentabilidad (ROI)</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-zinc-400">
                  Valor de propiedad (USD)
                </span>
                <input
                  type="number"
                  min={0}
                  value={propertyPrice}
                  onChange={(e) => {
                    setRoiManual(null);
                    setPropertyPrice(Number(e.target.value) || 0);
                  }}
                  className="bb-input w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-zinc-400">
                  Alquiler mensual (USD)
                </span>
                <input
                  type="number"
                  min={0}
                  value={monthlyRent}
                  onChange={(e) => {
                    setRoiManual(null);
                    setMonthlyRent(Number(e.target.value) || 0);
                  }}
                  className="bb-input w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-zinc-400">
                  Gastos / expensas (USD)
                </span>
                <input
                  type="number"
                  min={0}
                  value={expenses}
                  onChange={(e) => {
                    setRoiManual(null);
                    setExpenses(Number(e.target.value) || 0);
                  }}
                  className="bb-input w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
                />
              </label>
              <button
                type="button"
                onClick={runCalculate}
                className="w-full rounded-lg bg-amber-500 py-3 text-sm font-bold text-black transition hover:bg-amber-400"
              >
                Calcular rentabilidad
              </button>
            </div>

            <div className="flex flex-col items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 text-center">
              <span className="mb-2 text-sm font-bold text-amber-500 uppercase">
                Tu rentabilidad anual es de
              </span>
              <span className="text-5xl font-black text-amber-400 md:text-6xl">{roiDisplay}%</span>
              <p className="mt-4 text-sm text-zinc-500 italic">
                &ldquo;Los números no mienten. ¿Esta inversión se ajusta a tu estrategia?&rdquo;
              </p>
              <a
                href={waInvest}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:underline"
              >
                <MessageCircle className="h-4 w-4" />
                Consultar con Beltrán
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lead magnet */}
      <section className="border-t border-amber-500/20 bg-gradient-to-br from-amber-950/40 to-[#020202] px-6 py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="md:max-w-md">
            <h3 className="mb-4 text-2xl font-bold md:text-3xl">{cfg.leadMagnetTitle}</h3>
            <p className="text-zinc-400">{cfg.leadMagnetSub}</p>
          </div>
          {leadSent ? (
            <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-6 py-4 text-sm font-medium text-amber-200">
              ¡Listo! Revisá tu bandeja (demo).
            </p>
          ) : (
            <form
              onSubmit={handleLead}
              className="flex w-full max-w-md flex-col gap-2 rounded-lg border border-white/10 bg-[#0a0a0a] p-2 sm:flex-row"
            >
              <input
                type="email"
                required
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                placeholder="Tu email"
                className="min-w-0 flex-1 rounded-md bg-transparent p-3 text-white outline-none placeholder:text-zinc-600"
              />
              <button
                type="submit"
                className="rounded-md bg-amber-500 px-6 py-3 text-sm font-bold whitespace-nowrap text-black hover:bg-amber-400"
              >
                Enviar
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 text-center text-sm text-zinc-500 sm:flex-row sm:text-left">
          <p>
            <strong className="text-white">{cfg.brand}</strong> · Demo{" "}
            <Link href="/demos" className="text-amber-500 hover:underline">
              MadsJeez Design
            </Link>
          </p>
          <a
            href={`mailto:${cfg.email}`}
            className="inline-flex items-center gap-2 font-medium text-amber-500 hover:underline"
          >
            <Mail className="h-4 w-4" />
            {cfg.email}
          </a>
        </div>
      </footer>
    </div>
  );
}


