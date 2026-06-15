"use client";

/**
 * B2B AGENCY — archetype shell for restrained professional services.
 * Slugs: marketing, imprenta, arquitectos.
 * Vibe: editorial restraint. White + monospace + Instrument Serif at scale. NO color noise.
 */

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getCommerceConfig } from "@/lib/commerce-demos";
import { getDemoVisuals } from "@/lib/demo-assets";
import { useMotionTransition } from "@/lib/motion";
import { DemoLeadForm } from "../demo-lead-form";

type Props = { slug: string };

/** Slug-specific case-study style data. */
const AGENCY_META: Record<
  string,
  { promise: string; clientsLabel: string; clients: { name: string; sector: string; year: string }[] }
> = {
  marketing: {
    promise: "Trabajamos con marcas que valoran el detalle.",
    clientsLabel: "Marcas que confían",
    clients: [
      { name: "Estudio Lafayette", sector: "Hospitalidad", year: "2024" },
      { name: "Coral & Co.", sector: "Belleza DTC", year: "2024" },
      { name: "Maderera Norte", sector: "Industrial B2B", year: "2023" },
      { name: "Pampa Fintech", sector: "Servicios", year: "2023" },
    ],
  },
  imprenta: {
    promise: "Imprimimos sin atajos. Plazos cumplidos.",
    clientsLabel: "Clientes recientes",
    clients: [
      { name: "Editorial Cardo", sector: "Editorial", year: "2024" },
      { name: "Vermut Casa", sector: "Hospitalidad", year: "2024" },
      { name: "Marina Pampa", sector: "Náutica", year: "2023" },
      { name: "Bicicletería Sur", sector: "Retail", year: "2023" },
    ],
  },
  arquitectos: {
    promise: "Diseñamos espacios para vivir, no para fotografiar.",
    clientsLabel: "Proyectos seleccionados",
    clients: [
      { name: "Casa Patagonia", sector: "Residencial", year: "2024" },
      { name: "Estudio Belgrano", sector: "Comercial", year: "2024" },
      { name: "Galpón Vicente López", sector: "Renovación", year: "2023" },
      { name: "Lof Núñez", sector: "Interiorismo", year: "2023" },
    ],
  },
};

export function B2bAgencyLanding({ slug }: Props) {
  const config = getCommerceConfig(slug);
  const v = config ? getDemoVisuals(slug) : null;
  const t = useMotionTransition("display");
  const meta = AGENCY_META[slug] ?? {
    promise: "Trabajamos con foco en el detalle.",
    clientsLabel: "Clientes",
    clients: [
      { name: "Cliente A", sector: "Sector", year: "2024" },
      { name: "Cliente B", sector: "Sector", year: "2024" },
      { name: "Cliente C", sector: "Sector", year: "2023" },
      { name: "Cliente D", sector: "Sector", year: "2023" },
    ],
  };

  if (!config || !v) return null;

  return (
    <div className="relative min-h-screen bg-white font-[family-name:var(--font-demo-b-commerce)] text-[#0d0d0d] antialiased">
      {/* HEADER — minimal mono mark */}
      <header className="border-b border-[#e5e5e5] px-6 py-5 md:px-12">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-baseline gap-4">
            <span className="font-[family-name:var(--font-jetbrains)] text-sm tracking-tight text-[#0d0d0d]">
              {config.brand.toLowerCase().replace(/\s+/g, "-")}
            </span>
            <span className="hidden text-xs text-[#9a9a9a] md:inline">/ {config.tradeLabel}</span>
          </div>
          <nav className="flex items-center gap-8 font-[family-name:var(--font-jetbrains)] text-xs text-[#4d4d4d]">
            <a href="#proceso" className="hover:text-[#0d0d0d]">proceso</a>
            <a href="#trabajos" className="hover:text-[#0d0d0d]">trabajos</a>
            <a href="#contacto" className="hover:text-[#0d0d0d]">contacto</a>
          </nav>
        </div>
      </header>

      {/* HERO — typography at scale */}
      <section className="px-6 py-24 md:px-12 md:py-40">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t}
          >
            <p className="font-[family-name:var(--font-jetbrains)] text-xs text-[#4d4d4d]">
              {config.tradeLabel.toLowerCase()} / desde 2014
            </p>
            <h1 className="mt-10 max-w-4xl font-[family-name:var(--font-instrument)] text-5xl leading-[1.02] tracking-[-0.02em] text-[#0d0d0d] md:text-[6.5rem]">
              {meta.promise}
            </h1>
            <div className="mt-16 grid gap-12 md:grid-cols-[1fr_240px]">
              <p className="max-w-xl text-base leading-relaxed text-[#3a3a3a] md:text-lg">
                {config.heroSub}
              </p>
              <a
                href="#contacto"
                className="group inline-flex items-baseline gap-1.5 self-end border-b border-[#0d0d0d] pb-1 font-[family-name:var(--font-jetbrains)] text-sm text-[#0d0d0d]"
              >
                <span>Empezar un proyecto</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS — hairline rows, NO numbered scaffolding visible as 01/02/03 */}
      <section id="proceso" className="border-t border-[#e5e5e5] px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-5xl">
          <p className="font-[family-name:var(--font-jetbrains)] text-xs text-[#4d4d4d]">cómo trabajamos</p>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-instrument)] text-3xl leading-tight text-[#0d0d0d] md:text-5xl">
            Un proceso simple, conversado y entregable a tiempo.
          </h2>
          <dl className="mt-16 divide-y divide-[#e5e5e5] border-t border-[#e5e5e5]">
            {config.features.slice(0, 4).map((feature, i) => (
              <div key={feature} className="grid grid-cols-[100px_1fr] gap-6 py-8 md:grid-cols-[160px_1fr_320px]">
                <dt className="font-[family-name:var(--font-jetbrains)] text-xs text-[#4d4d4d]">
                  paso {String(i + 1).padStart(2, "0")}
                </dt>
                <dd className="font-[family-name:var(--font-instrument)] text-xl text-[#0d0d0d] md:text-2xl">
                  {feature}
                </dd>
                <dd className="hidden text-sm leading-relaxed text-[#4d4d4d] md:block">
                  {config.faq[i % config.faq.length]?.a ?? config.heroSub.slice(0, 120)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* TRABAJOS — wide table-like layout */}
      <section id="trabajos" className="border-t border-[#e5e5e5] bg-[#fafafa] px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-5xl">
          <p className="font-[family-name:var(--font-jetbrains)] text-xs text-[#4d4d4d]">
            {meta.clientsLabel.toLowerCase()}
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-instrument)] text-3xl leading-tight text-[#0d0d0d] md:text-5xl">
            Selección reciente
          </h2>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="border-y border-[#d4d4d4] text-left font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.04em] text-[#4d4d4d]">
                  <th className="py-3 pr-6">Cliente</th>
                  <th className="py-3 pr-6">Sector</th>
                  <th className="py-3 pr-6">Año</th>
                  <th className="py-3 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {meta.clients.map((c) => (
                  <tr key={c.name} className="border-b border-[#e5e5e5] transition-colors hover:bg-white">
                    <td className="py-5 pr-6 font-[family-name:var(--font-instrument)] text-xl text-[#0d0d0d] md:text-2xl">
                      {c.name}
                    </td>
                    <td className="py-5 pr-6 text-sm text-[#3a3a3a]">{c.sector}</td>
                    <td className="py-5 pr-6 font-[family-name:var(--font-jetbrains)] text-xs text-[#4d4d4d]">
                      {c.year}
                    </td>
                    <td className="py-5 text-right">
                      <a href="#contacto" className="inline-flex items-center gap-1 font-[family-name:var(--font-jetbrains)] text-xs text-[#0d0d0d] hover:underline">
                        ver caso <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* QUOTE — large serif italic */}
      <section className="border-t border-[#e5e5e5] px-6 py-32 md:px-12 md:py-40">
        <div className="mx-auto max-w-3xl">
          <p className="font-[family-name:var(--font-instrument)] text-3xl italic leading-snug text-[#0d0d0d] md:text-[2.75rem]">
            "Es la primera vez que un equipo nos entrega antes de la fecha y con menos correcciones de las pactadas. Volveríamos a contratarlos sin dudar."
          </p>
          <div className="mt-10 font-[family-name:var(--font-jetbrains)] text-xs text-[#4d4d4d]">
            <p>{meta.clients[0]?.name}</p>
            <p className="mt-1 text-[#9a9a9a]">{meta.clients[0]?.sector} · {meta.clients[0]?.year}</p>
          </div>
        </div>
      </section>

      {/* CTA — single line at bottom */}
      <section className="border-y border-[#e5e5e5] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 md:flex-row md:items-baseline">
          <p className="font-[family-name:var(--font-instrument)] text-2xl text-[#0d0d0d] md:text-4xl">
            ¿Trabajamos juntos?
          </p>
          <a
            href="#contacto"
            className="group inline-flex items-baseline gap-2 border-b border-[#0d0d0d] pb-1 font-[family-name:var(--font-jetbrains)] text-sm text-[#0d0d0d]"
          >
            <span>Escribinos</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </section>

      <div id="contacto">
        <DemoLeadForm
          slug={slug}
          brandLabel={`${config.brand} · ${config.tradeLabel}`}
          theme={v.lead}
          kicker="Iniciar conversación"
          title="Brief inicial"
          sub="Te respondemos en 24 h con propuesta y agenda."
        />
      </div>

      <footer className="px-6 py-10 font-[family-name:var(--font-jetbrains)] text-xs text-[#9a9a9a] md:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} {config.brand}</span>
          <span>{config.tradeLabel} / Buenos Aires</span>
        </div>
      </footer>
    </div>
  );
}
