"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  Landmark,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DEMO_HEADING_CLASS, demoBodyStyle } from "@/lib/demo-art-direction";

const SLUG = "contadores" as const;
const H = DEMO_HEADING_CLASS[SLUG];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;

const IMAGES = {
  cover: img("photo-1486312338219-ce68d2c6f44d"),
  team:  img("photo-1600880292203-757bb62b4baf"),
  chart: img("photo-1551288049-bebda4e38f71"),
  office:img("photo-1497366754035-f200968a6e72"),
};

const METRICS = [
  { val: "220+", label: "Clientes activos", sub: "PyME y profesionales" },
  { val: "12", label: "Especialistas CPA", sub: "Contadores matriculados" },
  { val: "$0", label: "Sorpresas fiscales", sub: "Calendario proactivo" },
  { val: "24 h", label: "SLA consultas", sub: "Días hábiles" },
];

const SERVICES = [
  {
    icon: FileCheck2,
    title: "Cumplimiento fiscal",
    desc: "AFIP · ARBA · Ingresos Brutos · Monotributo · Responsable Inscripto. Presentaciones sin demoras.",
  },
  {
    icon: BarChart3,
    title: "Reporting ejecutivo",
    desc: "P&L mensual, flujo de fondos y KPIs operativos en un dashboard que entendés desde el celular.",
  },
  {
    icon: Landmark,
    title: "Relación bancaria",
    desc: "Pack para gerente con ratios, proyección de flujo 6 meses y armado de carpeta de créditos.",
  },
  {
    icon: TrendingUp,
    title: "Planificación fiscal",
    desc: "Análisis de carga impositiva, puntos de recategorización y estrategia de retiro de utilidades.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance UIF",
    desc: "Reporte de operaciones sospechosas, convenio multilateral y control de retenciones sufridas.",
  },
  {
    icon: Calculator,
    title: "Payroll outsourcing",
    desc: "Liquidación de sueldos, aportes, ART y CCT. Recibos digitales con firma electrónica.",
  },
];

const STEPS = [
  { n: "01", t: "Kick-off 48 h", d: "Relevamos sistemas, usuarios y permisos. Plan de cuentas y reglas de imputación." },
  { n: "02", t: "Normalización", d: "Cierre paralelo al sistema anterior para validar diferencias y corregir sin riesgo." },
  { n: "03", t: "Primer informe", d: "Mes cerrado antes del día 8 hábil. Reunión de 15 minutos de variaciones." },
  { n: "04", t: "Operación continua", d: "Calendario tributario, alertas y dashboard actualizado en tiempo real." },
];

const TESTIMONIALS = [
  { q: "Pasamos de planilla caótica a un dashboard que entiendo en el celular.", a: "Laura B.", role: "Retail moda" },
  { q: "Nos salvaron el cierre para presentarle al fondo ángel en tiempo récord.", a: "Tomás A.", role: "Startup SaaS" },
  { q: "Precio fijo mensual, sin sorpresas ni llamadas de último momento.", a: "Miguel F.", role: "Distribuidor" },
];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function DemoContadoresLanding() {
  const v = getDemoVisuals(SLUG);

  return (
    <div style={demoBodyStyle(SLUG)} className="min-h-screen bg-[#09090f] text-white">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-white/[0.06] bg-[#09090f]/90 px-5 py-4 backdrop-blur-xl md:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-amber-500">
            <Calculator className="h-4 w-4 text-black" />
          </div>
          <span className={`text-sm font-bold tracking-tight text-white ${H}`}>NÚMERO EXACTO</span>
        </div>
        <div className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-widest text-[color:var(--muted-body)] md:flex">
          <span className="cursor-pointer hover:text-white transition-colors">Servicios</span>
          <span className="cursor-pointer hover:text-white transition-colors">Proceso</span>
          <span className="cursor-pointer hover:text-white transition-colors">Equipo</span>
          <button type="button" className="rounded bg-amber-500 px-4 py-2 text-[10px] font-bold text-black hover:bg-amber-400 transition-colors">
            Agendar llamada
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden px-5 pb-24 pt-16 md:px-10 md:pt-24">
        {/* grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(251,191,36,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className={`text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400 ${H}`}>
                  Estudio contable · cloud · desde 2012
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className={`text-5xl font-black leading-[0.92] tracking-tight text-white md:text-7xl ${H}`}
              >
                Contabilidad
                <br />
                <span className="text-amber-400">que habla</span>
                <br />
                con tu banco
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-6 max-w-lg text-sm leading-relaxed text-zinc-400 md:text-base"
              >
                Monotributo, responsable inscripto, SAS y sociedades. Presentaciones AFIP y ARBA, balances auditables, payroll outsourcing y carpetas para créditos bancarios. Integramos extractos vía banca electrónica.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <button type="button" className={`flex items-center gap-2 rounded bg-amber-500 px-6 py-3 text-sm font-bold text-black hover:bg-amber-400 transition-colors ${H}`}>
                  Cotizar plan <ArrowRight className="h-4 w-4" />
                </button>
                <button type="button" className="flex items-center gap-2 rounded border border-white/10 px-6 py-3 text-sm font-semibold text-zinc-400 hover:border-white/30 hover:text-white transition-colors">
                  Ver servicios
                </button>
              </motion.div>

              {/* trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex flex-wrap items-center gap-5"
              >
                {["AFIP registrado", "Firma digital", "ISO 27001 data"].map((b) => (
                  <div key={b} className="flex items-center gap-1.5 text-[11px] text-[color:var(--muted-body)]">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-500" /> {b}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/[0.07]">
                <Image src={IMAGES.cover} alt="Estudio contable" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-amber-950/30" />
              </div>
              {/* floating metric card */}
              <div className="absolute -bottom-4 -left-4 rounded-lg border border-white/10 bg-[#0d0d16] p-4 shadow-2xl md:-left-8">
                <p className={`text-2xl font-black text-amber-400 ${H}`}>$0</p>
                <p className="mt-0.5 text-[11px] text-[color:var(--muted-body)]">Sorpresas fiscales</p>
                <div className="mt-2 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-1 w-5 rounded-full bg-amber-500" />
                  ))}
                </div>
              </div>
              <div className="absolute -right-4 top-6 rounded-lg border border-white/10 bg-[#0d0d16] p-4 shadow-2xl md:-right-6">
                <TrendingUp className="h-5 w-5 text-amber-400" />
                <p className={`mt-1 text-lg font-black text-white ${H}`}>220+</p>
                <p className="text-[10px] text-[color:var(--muted-body)]">Clientes activos</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── METRICS STRIP ── */}
      <section className="border-y border-white/[0.07] bg-[#0d0d16]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/[0.07] md:grid-cols-4">
          {METRICS.map((m, i) => (
            <FadeUp key={m.label} delay={i * 0.08}>
              <div className="px-8 py-8 text-center">
                <p className={`text-4xl font-black text-amber-400 ${H}`}>{m.val}</p>
                <p className="mt-2 text-sm font-semibold text-white">{m.label}</p>
                <p className="mt-1 text-[11px] text-[color:var(--muted-body)]">{m.sub}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500 ${H}`}>Servicios</p>
            <h2 className={`text-3xl font-black text-white md:text-4xl ${H}`}>Menos improvisación,<br />más previsibilidad fiscal</h2>
          </FadeUp>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.07}>
                <div className="group flex flex-col gap-4 rounded-xl border border-white/[0.07] bg-[#0d0d16] p-6 transition-all hover:border-amber-500/30 hover:bg-[#111118]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-white ${H}`}>{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-body)]">{s.desc}</p>
                  </div>
                  <ChevronRight className="mt-auto h-4 w-4 text-[color:var(--muted-body)] group-hover:text-amber-500 transition-colors" />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="border-y border-white/[0.07] bg-[#0d0d16] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <FadeUp>
              <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500 ${H}`}>Onboarding</p>
              <h2 className={`text-3xl font-black text-white md:text-4xl ${H}`}>En dos semanas tenés balances normalizados</h2>
              <div className="mt-10 space-y-6">
                {STEPS.map((s) => (
                  <div key={s.n} className="flex gap-5">
                    <span className={`shrink-0 text-3xl font-black text-amber-500/30 ${H}`}>{s.n}</span>
                    <div className="border-l border-white/[0.07] pl-5">
                      <p className={`font-bold text-white ${H}`}>{s.t}</p>
                      <p className="mt-1 text-sm text-[color:var(--muted-body)]">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/[0.07]">
                <Image src={IMAGES.team} alt="Equipo contable" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className={`text-lg font-bold text-white ${H}`}>Primera consulta sin costo</p>
                  <p className="mt-1 text-sm text-zinc-400">30 minutos por videollamada · cupos limitados</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500 ${H}`}>Referencias</p>
            <h2 className={`text-3xl font-black text-white md:text-4xl ${H}`}>Lo que dicen<br />nuestros clientes</h2>
          </FadeUp>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <FadeUp key={t.a} delay={i * 0.1}>
                <div className="flex flex-col justify-between rounded-xl border border-white/[0.07] bg-[#0d0d16] p-6">
                  <p className="text-sm leading-relaxed text-zinc-300 italic">"{t.q}"</p>
                  <div className="mt-6 border-t border-white/[0.07] pt-4">
                    <p className={`text-sm font-bold text-white ${H}`}>{t.a}</p>
                    <p className="text-[11px] text-[color:var(--muted-body)]">{t.role}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="relative overflow-hidden bg-amber-500 px-5 py-16 md:px-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <FadeUp>
            <h2 className={`text-3xl font-black text-black md:text-5xl ${H}`}>Primera consulta sin costo.<br />Cupos disponibles este mes.</h2>
            <p className="mt-4 text-sm text-black/70">30 minutos · sin compromiso · respuesta en 24 h hábiles</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" className={`flex items-center gap-2 rounded bg-black px-8 py-3 font-bold text-white hover:bg-zinc-800 transition-colors ${H}`}>
                <MessageCircle className="h-4 w-4" /> Agendar por WhatsApp
              </button>
              <button type="button" className="rounded border border-black/20 px-8 py-3 text-sm font-semibold text-black/70 hover:border-black/40 hover:text-black transition-colors">
                Ver planes y precios
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-[color:var(--muted-body)] bg-[#09090f]">Demo · MadsJeez Design</footer>
    </div>
  );
}

export { DemoContadoresLanding as DemoContadores };
