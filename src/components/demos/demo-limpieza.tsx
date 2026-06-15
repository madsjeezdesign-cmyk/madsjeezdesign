"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Droplets,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DEMO_HEADING_CLASS, demoBodyStyle } from "@/lib/demo-art-direction";
import { MagneticButton, SpotlightCard } from "@/components/primitives";

const SLUG = "limpieza" as const;
const H = DEMO_HEADING_CLASS[SLUG];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;

const IMAGES = {
  hero:    img("photo-1581578731548-c64695cc6952"),
  office:  img("photo-1497366811353-6870744d04b2"),
  clinic:  img("photo-1586773860418-d37222d8fce3"),
  hotel:   img("photo-1631049307264-da0ec9d70304"),
};

const SERVICES = [
  {
    icon: Building2,
    title: "Oficinas & corporativo",
    desc: "Limpieza diaria, vidriería exterior, sanitización de cocinas y gestión de residuos.",
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    icon: Droplets,
    title: "Clínicas & salud",
    desc: "Protocolo hospitalario, productos certificados y registro de cada servicio.",
    color: "bg-sky-500/10 text-sky-500",
  },
  {
    icon: Building2,
    title: "Plantas industriales",
    desc: "Limpieza de maquinaria, pisos industriales y manejo de residuos especiales.",
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    icon: Sparkles,
    title: "Eventos & post-obra",
    desc: "Limpieza profunda post construcción, eventos corporativos y congresos.",
    color: "bg-teal-500/10 text-teal-500",
  },
  {
    icon: ShieldCheck,
    title: "Sanitización ISO",
    desc: "Aplicación de desinfectantes de alto nivel con certificación de proceso.",
    color: "bg-sky-500/10 text-sky-500",
  },
  {
    icon: ClipboardCheck,
    title: "Auditoría de calidad",
    desc: "Checklist digital, supervisores in situ y reporte fotográfico por turno.",
    color: "bg-teal-500/10 text-teal-500",
  },
];

const METRICS = [
  { val: "180+", label: "Clientes activos", icon: Building2 },
  { val: "450", label: "Operarios capacitados", icon: Users },
  { val: "99.2%", label: "Satisfacción", icon: Star },
  { val: "ISO", label: "Certificado", icon: ShieldCheck },
];

const SECTORS = [
  { name: "Oficinas corporativas", img: IMAGES.office },
  { name: "Clínicas y hospitales", img: IMAGES.clinic },
  { name: "Hoteles premium", img: IMAGES.hotel },
];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export function DemoLimpiezaLanding() {
  getDemoVisuals(SLUG);

  return (
    <div style={demoBodyStyle(SLUG)} className="min-h-screen bg-white text-[#0a1a14]">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-emerald-100 bg-white/95 px-5 py-4 backdrop-blur-xl md:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-600">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className={`text-sm font-bold text-[#0a1a14] ${H}`}>ProLimpio</span>
          <span className="hidden rounded bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.04em] text-emerald-700 md:block">
            Facility Management
          </span>
        </div>
        <div className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.04em] text-zinc-400 md:flex">
          {["Servicios", "Sectores", "Empresa", "Contacto"].map((n) => (
            <span key={n} className="cursor-pointer hover:text-emerald-600 transition-colors">{n}</span>
          ))}
          <button type="button" className="rounded bg-emerald-600 px-4 py-2 text-[10px] font-bold text-white hover:bg-emerald-500 transition-colors">
            Pedir presupuesto
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-center px-5 py-20 md:px-12 md:py-28 lg:py-32">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span className={`text-[10px] font-bold uppercase tracking-[0.04em] text-emerald-700 ${H}`}>
                ISO 9001 · 15 años de trayectoria
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className={`text-5xl font-black leading-[0.93] tracking-tight text-[#0a1a14] md:text-7xl ${H}`}
            >
              Limpieza
              <br />
              <span className="text-emerald-600">profesional</span>
              <br />
              sin excusas
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.6 }}
              className="mt-6 max-w-md text-sm leading-loose text-[color:var(--muted-body)]"
            >
              Edificios corporativos, clínicas, plantas industriales y eventos. Operarios propios con uniforme, equipo certificado y supervisor de turno en cada servicio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <MagneticButton
                strength={8}
                className={`!rounded !bg-emerald-600 hover:!bg-emerald-500 !px-7 !py-3.5 !font-bold ${H}`}
                ariaLabel="Pedir presupuesto"
              >
                <span className="text-white">Pedir presupuesto</span> <ArrowRight className="h-4 w-4 text-white" />
              </MagneticButton>
              <button type="button" className="flex items-center gap-2 rounded border border-emerald-200 px-7 py-3.5 text-sm font-semibold text-[color:var(--muted-body)] hover:bg-emerald-50 transition-colors">
                Ver sectores
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
              className="mt-10 flex flex-wrap gap-5">
              {["Personal en relación de dependencia", "Supervisión en turno", "Reporte fotográfico"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> {t}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="relative h-[60vh] lg:h-auto"
          >
            <Image src={IMAGES.hero} alt="Limpieza profesional" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-emerald-900/10" />
          </motion.div>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section className="border-y border-emerald-100 bg-emerald-50">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-emerald-100 md:grid-cols-4">
          {METRICS.map((m, i) => (
            <FadeUp key={m.label} delay={i * 0.08}>
              <div className="flex flex-col items-center gap-1.5 px-8 py-8 text-center">
                <m.icon className="h-5 w-5 text-emerald-500" />
                <p className={`text-3xl font-black text-[#0a1a14] ${H}`}>{m.val}</p>
                <p className="text-[11px] uppercase tracking-[0.04em] text-zinc-400">{m.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.04em] text-emerald-600 ${H}`}>Servicios</p>
            <h2 className={`text-3xl font-black text-[#0a1a14] md:text-5xl ${H}`}>Cobertura integral<br />por sector</h2>
          </FadeUp>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.07}>
                <SpotlightCard
                  variant="transparent"
                  glowColor="rgba(16,185,129,0.35)"
                  className="!rounded-xl !border-emerald-100 !bg-white !p-6 shadow-sm hover:!border-emerald-300 hover:shadow-md transition-all h-full"
                >
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className={`mt-4 font-bold text-[#0a1a14] ${H}`}>{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-body)]">{s.desc}</p>
                </SpotlightCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTORS ── */}
      <section className="border-y border-emerald-100 bg-emerald-50 px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.04em] text-emerald-600 ${H}`}>Sectores</p>
            <h2 className={`text-3xl font-black text-[#0a1a14] md:text-4xl ${H}`}>Donde operamos</h2>
          </FadeUp>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {SECTORS.map((s, i) => (
              <FadeUp key={s.name} delay={i * 0.1}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={s.img} alt={s.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a14]/80 to-transparent" />
                  <p className={`absolute bottom-5 left-5 text-lg font-bold text-white ${H}`}>{s.name}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-4xl">
          <FadeUp>
            <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.04em] text-emerald-600 ${H}`}>Proceso</p>
            <h2 className={`text-3xl font-black text-[#0a1a14] md:text-5xl ${H}`}>Del relevamiento<br />al reporte</h2>
          </FadeUp>
          <div className="mt-10 space-y-0">
            {[
              { n: "1", t: "Visita de relevamiento", d: "Medimos, relevamos accesos y requisitos especiales sin costo." },
              { n: "2", t: "Propuesta en 24 h", d: "Servicio, frecuencia, personal asignado y precio fijo mensual." },
              { n: "3", t: "Inicio de servicio", d: "Supervisión en el primer turno y checklist entregado al cliente." },
              { n: "4", t: "Reporte mensual", d: "Incidencias, fotos, horas efectivas y NPS del responsable." },
            ].map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.08}>
                <div className="flex gap-6 border-b border-emerald-100 py-6">
                  <span className={`text-4xl font-black text-emerald-200 ${H}`}>{step.n}</span>
                  <div>
                    <p className={`font-bold text-[#0a1a14] ${H}`}>{step.t}</p>
                    <p className="mt-1 text-sm text-[color:var(--muted-body)]">{step.d}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-emerald-700 px-5 py-16 md:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className={`text-2xl font-black text-white md:text-4xl ${H}`}>Presupuesto gratuito<br />en 24 horas.</h2>
              <p className="mt-2 text-sm text-emerald-200">Relevamiento sin costo · propuesta personalizada</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <button type="button" className={`flex items-center gap-2 rounded bg-white px-7 py-3.5 font-bold text-emerald-700 hover:bg-emerald-50 transition-colors ${H}`}>
                <MessageCircle className="h-4 w-4" /> WhatsApp directo
              </button>
              <button type="button" className="rounded border border-white/30 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                Formulario de contacto
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white py-8 text-center text-xs text-zinc-400">Demo · MadsJeez Design</footer>
    </div>
  );
}

export { DemoLimpiezaLanding as DemoLimpieza };
