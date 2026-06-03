"use client";

/**
 * TRADE TRUST — archetype shell for licensed-trade demos.
 * Slugs: gasista, motores, taller-motos, electricista, albanil.
 * Vibe: rigor profesional + urgencia confiable. Light theme, asymmetric photo-led hero.
 * NO glassmorphism. NO ALL-CAPS eyebrows on every section. NO 3-col pricing replicated.
 */

import Image from "next/image";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Phone, MapPin, Clock, ArrowRight, Award } from "lucide-react";
import { getCommerceConfig } from "@/lib/commerce-demos";
import { getDemoVisuals } from "@/lib/demo-assets";
import { useMotionTransition } from "@/lib/motion";
import { DemoLeadForm } from "../demo-lead-form";

type Props = { slug: string };

/** Slug-specific trust signals (matrícula, años, zona) overlaid on the shared config. */
const TRADE_META: Record<
  string,
  { matricula: string; years: string; zone: string; emergency: string }
> = {
  gasista: { matricula: "Matrícula MA-12480", years: "15 años", zone: "CABA + GBA Sur", emergency: "Urgencias 24/7" },
  motores: { matricula: "Reg. técnico SRT", years: "22 años", zone: "Planta + a domicilio", emergency: "Garantía 6 meses" },
  "taller-motos": { matricula: "Concesionario oficial", years: "12 años", zone: "Lomas + sur", emergency: "Service 24h" },
  electricista: { matricula: "Matrícula ENRE-7382", years: "10 años", zone: "CABA + zona norte", emergency: "Urgencias 2h" },
  albanil: { matricula: "Reg. constructor 3829", years: "18 años", zone: "AMBA completo", emergency: "Visita gratuita" },
};

export function TradeTrustLanding({ slug }: Props) {
  const config = getCommerceConfig(slug);
  const v = config ? getDemoVisuals(slug) : null;
  const t = useMotionTransition("display");
  const meta = TRADE_META[slug] ?? {
    matricula: "Matriculado",
    years: "Años de oficio",
    zone: "Zona local",
    emergency: "Urgencias",
  };

  const accent = config?.accent ?? "#0284c7";
  const ink = useMemo(() => {
    // Derived ink-strong from accent — used for headings & primary buttons.
    return accent;
  }, [accent]);

  if (!config || !v) return null;

  return (
    <div
      className="relative min-h-screen bg-[#fafaf7] font-[family-name:var(--font-demo-b-commerce)] text-[#171717] antialiased"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      {/* HEADER — minimal hairline, no glass */}
      <header className="sticky top-0 z-50 border-b border-[#e6e3dc] bg-[#fafaf7]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-baseline gap-3">
            <span
              className="font-[family-name:var(--font-demo-h-commerce)] text-xl font-medium tracking-tight md:text-2xl"
              style={{ color: ink }}
            >
              {config.brand}
            </span>
            <span className="hidden text-xs text-[#6f6a5e] md:inline">·</span>
            <span className="hidden text-xs text-[#6f6a5e] md:inline">{config.tradeLabel}</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-[#3a3a36] md:flex">
            <a href="#servicios" className="hover:text-[color:var(--accent)]">Servicios</a>
            <a href="#trabajos" className="hover:text-[color:var(--accent)]">Trabajos</a>
            <a href="#testimonios" className="hover:text-[color:var(--accent)]">Clientes</a>
            <a href="#contacto" className="hover:text-[color:var(--accent)]">Contacto</a>
          </nav>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white shadow-sm transition-transform hover:scale-[1.02]"
            style={{ background: ink }}
          >
            <Phone className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </header>

      {/* HERO — asymmetric: text left, photo right (90/110 columns feel) */}
      <section className="relative px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_1.15fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d8d3c6] bg-white px-3 py-1.5 text-xs text-[#3a3a36]">
              <ShieldCheck className="h-3.5 w-3.5" style={{ color: ink }} />
              <span>{meta.matricula}</span>
            </div>
            <h1 className="font-[family-name:var(--font-demo-h-commerce)] text-4xl font-medium leading-[1.05] tracking-tight text-[#171717] md:text-6xl">
              {config.heroTitle}
              <span style={{ color: ink }}> {config.heroHighlight}</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#3a3a36] md:text-lg">
              {config.heroSub}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
                style={{ background: ink }}
              >
                Pedir visita <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center gap-2 rounded-full border border-[#d8d3c6] bg-white px-6 py-3 text-sm font-medium text-[#171717] hover:border-[#171717]"
              >
                Ver servicios
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={t}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-[#e6e3dc] bg-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)] md:aspect-[5/6]">
              <Image
                src={v.cover}
                alt={`Trabajo de ${config.tradeLabel}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-sm border border-[#e6e3dc] bg-white px-5 py-4 shadow-md md:block">
              <p className="text-[10px] uppercase tracking-wider text-[#7a7568]">Garantía escrita</p>
              <p className="mt-1 font-[family-name:var(--font-demo-h-commerce)] text-2xl font-medium text-[#171717]">
                {meta.emergency}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BAND — 4 columns, hairline dividers, no card noise */}
      <section className="border-y border-[#e6e3dc] bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-[#e6e3dc] md:grid-cols-4">
          {[
            { icon: Award, label: "Matrícula", value: meta.matricula },
            { icon: Clock, label: "Experiencia", value: meta.years },
            { icon: MapPin, label: "Cobertura", value: meta.zone },
            { icon: ShieldCheck, label: "Respaldo", value: meta.emergency },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 px-5 py-6 md:px-7">
              <item.icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ink }} />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#7a7568]">{item.label}</p>
                <p className="mt-1 text-sm font-medium text-[#171717]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES — long table-like rows, NOT cards */}
      <section id="servicios" className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="font-[family-name:var(--font-demo-h-commerce)] text-3xl font-medium tracking-tight text-[#171717] md:text-5xl">
              Servicios
            </h2>
            <p className="hidden max-w-xs text-sm text-[#6f6a5e] md:block">
              Trabajo certificado, presupuesto sin cargo y garantía escrita.
            </p>
          </div>
          <ul className="divide-y divide-[#e6e3dc] border-t border-[#e6e3dc]">
            {config.features.map((feature, i) => (
              <li
                key={feature}
                className="group flex items-center justify-between gap-4 py-5 transition-colors hover:bg-white"
              >
                <div className="flex items-baseline gap-5">
                  <span className="w-7 text-xs tabular-nums text-[#9c9684]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-medium text-[#171717] md:text-lg">{feature}</span>
                </div>
                <span className="text-xs text-[#6f6a5e]">{config.categories[i % config.categories.length]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BEFORE/AFTER GALLERY — 3 photos full width with caption hairline */}
      <section id="trabajos" className="border-t border-[#e6e3dc] bg-white px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 font-[family-name:var(--font-demo-h-commerce)] text-3xl font-medium tracking-tight text-[#171717] md:text-4xl">
            Trabajos recientes
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[v.a, v.b, v.c].map((src, i) => (
              <figure key={i} className="space-y-3">
                <div className="relative aspect-[4/5] overflow-hidden border border-[#e6e3dc] bg-[#f3efe6]">
                  <Image src={src} alt={`Obra ${i + 1}`} fill className="object-cover" sizes="33vw" />
                </div>
                <figcaption className="flex items-center justify-between text-xs text-[#6f6a5e]">
                  <span>{config.categories[i] ?? "Trabajo terminado"}</span>
                  <span>{meta.zone}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — single sliding row */}
      <section id="testimonios" className="px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 font-[family-name:var(--font-demo-h-commerce)] text-3xl font-medium tracking-tight text-[#171717] md:text-4xl">
            Lo que dicen los clientes
          </h2>
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
            {[0, 1, 2].map((i) => {
              const sample = config.faq[i % config.faq.length];
              return (
                <article
                  key={i}
                  className="min-w-[280px] max-w-sm shrink-0 snap-start border border-[#e6e3dc] bg-white p-6"
                >
                  <p className="text-sm leading-relaxed text-[#3a3a36]">
                    "{sample?.a ?? "Resolvieron rápido y a buen precio. Muy recomendable."}"
                  </p>
                  <p className="mt-5 text-xs text-[#7a7568]">
                    Cliente · {config.categories[i % config.categories.length]} · {meta.zone}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* URGENCY CTA — full-width band */}
      <section className="border-y border-[#e6e3dc] bg-[#171717] px-5 py-16 text-white md:px-8 md:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs text-[#a8a299]">{meta.emergency}</p>
            <h3 className="mt-2 font-[family-name:var(--font-demo-h-commerce)] text-3xl font-medium md:text-4xl">
              {config.heroTitle} {config.heroHighlight}
            </h3>
            <p className="mt-3 max-w-md text-sm text-[#cfcabe]">
              Llamanos al WhatsApp y coordinamos la visita. Presupuesto sin cargo en {meta.zone}.
            </p>
          </div>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-[#171717] transition-transform hover:scale-[1.02]"
            style={{ background: accent }}
          >
            <Phone className="h-4 w-4" /> Pedir visita
          </a>
        </div>
      </section>

      <div id="contacto">
        <DemoLeadForm
          slug={slug}
          brandLabel={`${config.brand} · ${config.tradeLabel}`}
          theme={v.lead}
          kicker="Consulta directa"
          title="Pedinos un presupuesto"
          sub={`Te respondemos por WhatsApp. ${meta.zone}.`}
        />
      </div>

      <footer className="border-t border-[#e6e3dc] bg-white px-5 py-10 text-center text-xs text-[#6f6a5e] md:px-8">
        © {new Date().getFullYear()} {config.brand} · {meta.matricula} · {meta.zone}
      </footer>
    </div>
  );
}
