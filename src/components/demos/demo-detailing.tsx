"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Droplets,
  MessageCircle,
  Shield,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DEMO_HEADING_CLASS, demoBodyStyle } from "@/lib/demo-art-direction";

const SLUG = "detailing" as const;
const H = DEMO_HEADING_CLASS[SLUG];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=88`;

const IMAGES = {
  hero:    img("photo-1621438460965-a1b60a34f1a3"),
  ceramic: img("photo-1617531653332-bd46c16f4d68"),
  ppf:     img("photo-1609776881745-bb9d4ee06d1e"),
  interior:img("photo-1503376780353-7e6692767b70"),
  before:  img("photo-1543465077-db45d34b88a5"),
};

const PACKAGES = [
  {
    name: "Express Detail",
    price: "$35.000",
    time: "2–3 hs",
    accent: "border-zinc-700",
    features: ["Lavado exterior premium", "Aspirado interior", "Tratamiento plásticos", "Abrillantado básico"],
  },
  {
    name: "Full Correction",
    price: "$95.000",
    time: "1 día",
    accent: "border-sky-500",
    featured: true,
    features: ["Pulido en 3 etapas", "Corrección de hologramas", "Paint decontamination", "Sellador de pintura", "Protección de llantas"],
  },
  {
    name: "Ceramic Pro 9H",
    price: "$220.000",
    time: "3 días",
    accent: "border-zinc-700",
    features: ["Pulido competo previo", "Ceramic coating 9H", "Garantía 5 años", "Certificado de aplicación", "Kit mantenimiento"],
  },
];

const PROCESS = [
  { n: "1", icon: Droplets, title: "Descontaminación química", desc: "Iron remover, clay bar y decontaminación de brea para partir desde cero." },
  { n: "2", icon: Sparkles, title: "Corrección de pintura", desc: "Pulido en 2 o 3 etapas con DA y roto según dureza de la pintura." },
  { n: "3", icon: Shield, title: "Protección permanente", desc: "Ceramic coating, PPF o sellador de cera de carnauba premium según necesidad." },
  { n: "4", icon: Zap, title: "Control final UV", desc: "Inspección con lámpara UV y luz LED para verificar cobertura 100%." },
];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export function DemoDetailingLanding() {
  getDemoVisuals(SLUG);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={demoBodyStyle(SLUG)} className="min-h-screen bg-black text-white">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-white/[0.05] bg-black/95 px-5 py-4 backdrop-blur-xl md:px-10">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-sky-400" />
          <span className={`text-sm font-black uppercase tracking-[0.15em] text-white ${H}`}>SHINE AUTODETAIL</span>
        </div>
        <div className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-widest text-zinc-600 md:flex">
          {["Servicios", "Ceramic", "PPF", "Galería"].map((n) => (
            <span key={n} className="cursor-pointer hover:text-sky-400 transition-colors">{n}</span>
          ))}
          <button type="button" className="rounded border border-sky-500/50 px-4 py-2 text-[10px] font-bold text-sky-400 hover:bg-sky-500/10 transition-colors">
            Reservar slot
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <Image src={IMAGES.hero} alt="Detailing profesional" fill className="object-cover object-center" priority />
        {/* dark overlay with cyan gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        {/* cyan glow */}
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-sky-500/10 blur-[120px]" />

        <div className="absolute inset-0 flex items-center px-5 md:px-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-6 inline-flex items-center gap-2"
            >
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-sky-400 text-sky-400" />
              ))}
              <span className="ml-1 text-[11px] text-sky-400/80">Certified Ceramic Pro Installer</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className={`text-6xl font-black uppercase leading-[0.88] tracking-tight text-white md:text-8xl lg:text-[110px] ${H}`}
            >
              Detail
              <br />
              <span className="text-sky-400">beyond</span>
              <br />
              clean
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 max-w-lg text-sm leading-loose text-zinc-400 md:text-base"
            >
              Pulido profesional, corrección de pintura, ceramic coating 9H y PPF. Instalación certificada con garantía de por vida. Agenda cerrada con cupos muy limitados.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button type="button" className={`flex items-center gap-2 rounded border border-sky-400 bg-sky-500/10 px-7 py-3.5 font-bold text-sky-400 hover:bg-sky-500/20 transition-colors ${H}`}>
                Reservar slot <ArrowRight className="h-4 w-4" />
              </button>
              <button type="button" className="flex items-center gap-2 rounded border border-white/10 px-7 py-3.5 text-sm font-semibold text-zinc-400 hover:border-white/20 hover:text-white transition-colors">
                Ver trabajos
              </button>
            </motion.div>
          </div>
        </div>

        {/* scrolling ticker */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/[0.06] bg-black/80 py-3 backdrop-blur">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className={`mr-12 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-600 ${H}`}>
                CERAMIC PRO 9H &nbsp;·&nbsp; PPF XPEL &nbsp;·&nbsp; PAINT CORRECTION &nbsp;·&nbsp; WINDOW TINTING &nbsp;·&nbsp; VINYL WRAP &nbsp;
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-sky-500 ${H}`}>El proceso</p>
            <h2 className={`text-3xl font-black uppercase text-white md:text-5xl ${H}`}>Cuatro etapas.<br />Un resultado perfecto.</h2>
          </FadeUp>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.08}>
                <div className="relative flex flex-col gap-4 rounded-xl border border-white/[0.07] bg-[#080808] p-6 hover:border-sky-500/30 transition-colors">
                  <span className={`absolute right-4 top-4 text-5xl font-black text-sky-500/[0.06] ${H}`}>{p.n}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className={`font-bold text-white ${H}`}>{p.title}</p>
                    <p className="mt-2 text-sm text-zinc-500">{p.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="border-y border-white/[0.06] bg-[#050505] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-sky-500 ${H}`}>Paquetes</p>
            <h2 className={`text-3xl font-black uppercase text-white md:text-5xl ${H}`}>Protección a tu medida</h2>
          </FadeUp>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PACKAGES.map((pkg, i) => (
              <FadeUp key={pkg.name} delay={i * 0.1}>
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative flex flex-col rounded-2xl border bg-[#0a0a0a] p-7 transition-all duration-300 ${
                    pkg.featured ? "border-sky-500 shadow-[0_0_40px_rgba(14,165,233,0.15)]" : hovered === i ? "border-zinc-600" : "border-white/[0.07]"
                  }`}
                >
                  {pkg.featured && (
                    <span className={`absolute -top-3 left-6 rounded-full bg-sky-500 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-black ${H}`}>
                      Más popular
                    </span>
                  )}
                  <p className={`text-[11px] font-bold uppercase tracking-widest text-zinc-500 ${H}`}>{pkg.name}</p>
                  <p className={`mt-2 text-4xl font-black text-white ${H}`}>{pkg.price}</p>
                  <p className="text-[11px] text-zinc-600">{pkg.time} de trabajo</p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-zinc-400">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-500" /> {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={`mt-8 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold transition-colors ${
                      pkg.featured
                        ? "bg-sky-500 text-black hover:bg-sky-400"
                        : "border border-white/10 text-zinc-300 hover:border-white/25 hover:text-white"
                    } ${H}`}
                  >
                    Consultar disponibilidad <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERAMIC CLOSE-UP ── */}
      <section className="relative h-80 overflow-hidden md:h-[500px]">
        <Image src={IMAGES.ceramic} alt="Ceramic coating 9H" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex items-center px-5 md:px-10">
          <FadeUp>
            <div className="max-w-lg">
              <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-sky-400 ${H}`}>Ceramic Pro 9H</p>
              <h2 className={`text-3xl font-black text-white md:text-5xl ${H}`}>Dureza 9H.<br />Brillo de por vida.</h2>
              <p className="mt-4 text-sm text-zinc-400">La única protección permanente con garantía registrada. Resistencia química, UV y rayones superficiales.</p>
              <button type="button" className={`mt-6 flex items-center gap-2 rounded border border-sky-400/50 px-6 py-3 font-bold text-sky-400 hover:bg-sky-500/10 transition-colors ${H}`}>
                Más información <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-sky-900/40 to-black px-5 py-16 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <FadeUp>
            <h2 className={`text-3xl font-black uppercase text-white md:text-5xl ${H}`}>Agenda cerrada.<br />Cupos muy limitados.</h2>
            <p className="mt-4 text-sm text-zinc-500">Presupuesto sin cargo · respuesta en menos de 2 horas</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" className={`flex items-center gap-2 rounded bg-sky-500 px-8 py-3.5 font-bold text-black hover:bg-sky-400 transition-colors ${H}`}>
                <MessageCircle className="h-4 w-4" /> WhatsApp directo
              </button>
              <button type="button" className="rounded border border-white/10 px-8 py-3.5 text-sm font-semibold text-zinc-400 hover:border-white/20 hover:text-white transition-colors">
                Ver galería de trabajos
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      <footer className="bg-black py-8 text-center text-xs text-zinc-700">Demo · MadsJeez Design</footer>
    </div>
  );
}

export { DemoDetailingLanding as DemoDetailing };
