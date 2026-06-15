"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Eye,
  Glasses,
  Heart,
  MessageCircle,
  Scan,
  ShieldCheck,
  Sparkles,
  Volume2,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DEMO_HEADING_CLASS, demoBodyStyle } from "@/lib/demo-art-direction";
import { MagneticButton, SpotlightCard } from "@/components/primitives";

const SLUG = "optica" as const;
const H = DEMO_HEADING_CLASS[SLUG];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=88`;

const IMAGES = {
  hero:     img("photo-1574258495973-f010dfbb5371"),
  exam:     img("photo-1577401239170-897942555fb3"),
  lenses:   img("photo-1509281373149-e957c6296406"),
  frames:   img("photo-1516214104703-d870798883c5"),
  hearing:  img("photo-1598524374912-93a5e78b3cff"),
};

const SERVICES = [
  { icon: Scan, title: "Examen visual completo", desc: "Optometría computarizada, topografía corneal y campimetría. Sin cita previa.", tag: "Gratis" },
  { icon: Glasses, title: "Lentes progresivos", desc: "Cálculo de zona de lectura personalizado. Tecnología freeform digital.", tag: "Garantía" },
  { icon: Eye, title: "Lentes de contacto", desc: "Adaptación de lentes blandas, rígidas, tóricas y multifocales.", tag: "Trial" },
  { icon: Volume2, title: "Audiología", desc: "Audiometría tonal y vocal. Audífonos Signia, Phonak y Starkey.", tag: "Nuevo" },
  { icon: ShieldCheck, title: "Tratamientos ópticos", desc: "Anti-reflejo, fotocromáticos, UV360, filtro azul y polarizado premium.", tag: "Digital" },
  { icon: Heart, title: "Óptica infantil", desc: "Evaluación ortóptica, terapia visual y marcos ligeros para niños.", tag: "Especialidad" },
];

const BRANDS = ["Ray-Ban", "Oakley", "Silhouette", "Lindberg", "Prada", "Tom Ford", "Maui Jim", "Persol"];

const STEPS = [
  { n: "1", t: "Examen sin turno", d: "Accedés al examen visual sin cita previa en menos de 20 minutos." },
  { n: "2", t: "Asesoramiento", d: "Te ayudamos a elegir marcos según tu rostro, actividad y estilo." },
  { n: "3", t: "Laboratorio propio", d: "Montaje en el día para lentes de baja y media graduación." },
  { n: "4", t: "Seguimiento", d: "Control gratuito a los 30 días y ajustes sin costo de por vida." },
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

export function DemoOpticaLanding() {
  getDemoVisuals(SLUG);
  const [selectedService, setSelectedService] = useState(0);

  return (
    <div style={demoBodyStyle(SLUG)} className="min-h-screen bg-white text-[#08143a]">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-blue-100 bg-white/95 px-5 py-4 backdrop-blur-xl md:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
            <Eye className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className={`text-sm font-bold text-[#08143a] ${H}`}>Visión Clara</span>
            <span className="ml-2 hidden text-[10px] text-blue-500 md:inline">Óptica & Audiología</span>
          </div>
        </div>
        <div className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.04em] text-zinc-400 md:flex">
          {["Servicios", "Lentes", "Audiología", "Examen"].map((n) => (
            <span key={n} className="cursor-pointer hover:text-blue-600 transition-colors">{n}</span>
          ))}
          <button type="button" className="rounded-full bg-blue-600 px-5 py-2 text-[10px] font-bold text-white hover:bg-blue-500 transition-colors">
            Examen gratis
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#f0f4ff]">
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-center px-5 py-20 md:px-12 md:py-28">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span className={`text-[10px] font-bold uppercase tracking-[0.04em] text-blue-700 ${H}`}>
                Examen visual · sin turno · sin costo
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className={`text-5xl font-black leading-[0.92] tracking-tight text-[#08143a] md:text-7xl ${H}`}
            >
              Ver bien
              <br />
              <span className="text-blue-600">es un derecho,</span>
              <br />
              no un lujo
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
              className="mt-6 max-w-md text-sm leading-loose text-[color:var(--muted-body)]"
            >
              Examen visual gratuito, más de 2.000 marcos en stock, laboratorio propio con entrega en el día. Línea de audiología certificada.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <MagneticButton
                strength={8}
                className={`!bg-blue-600 hover:!bg-blue-500 !px-7 !py-3.5 !font-bold ${H}`}
                ariaLabel="Hacer examen visual"
              >
                <span className="text-white">Hacer examen visual</span> <ArrowRight className="h-4 w-4 text-white" />
              </MagneticButton>
              <button type="button" className="flex items-center gap-2 rounded-full border border-blue-200 px-7 py-3.5 text-sm font-semibold text-[color:var(--muted-body)] hover:bg-blue-50 transition-colors">
                Ver catálogo
              </button>
            </motion.div>

            {/* trust */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-5">
              {["Laboratorio propio", "Entrega en el día", "Garantía de por vida"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" /> {t}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="relative h-[55vh] lg:h-auto"
          >
            <Image src={IMAGES.hero} alt="Visión Clara Óptica" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-blue-900/10" />
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-blue-100 bg-blue-600">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-white/20 md:grid-cols-4">
          {[
            ["2.000+", "Marcos en stock"],
            ["25 min", "Examen completo"],
            ["24 h", "Entrega lentes"],
            ["15 años", "Trayectoria"],
          ].map(([v, l], i) => (
            <FadeUp key={l} delay={i * 0.07}>
              <div className="px-8 py-7 text-center">
                <p className={`text-3xl font-black text-white ${H}`}>{v}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.04em] text-blue-200">{l}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.04em] text-blue-600 ${H}`}>Servicios</p>
            <h2 className={`text-3xl font-black text-[#08143a] md:text-5xl ${H}`}>Todo lo que<br />necesita tu visión</h2>
          </FadeUp>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.06}>
                <SpotlightCard
                  variant="transparent"
                  glowColor="rgba(37,99,235,0.32)"
                  className={`!cursor-pointer !rounded-xl !border !p-6 transition-all h-full ${
                    selectedService === i
                      ? "!border-blue-400 !bg-blue-50 shadow-md"
                      : "!border-blue-100 hover:!border-blue-300 hover:shadow-sm"
                  }`}
                >
                  <div onClick={() => setSelectedService(i)} role="button" tabIndex={0}>
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                        <s.icon className="h-5 w-5" />
                      </div>
                      <span className={`rounded-full bg-blue-600/10 px-2.5 py-0.5 text-[9px] font-bold text-blue-600 ${H}`}>{s.tag}</span>
                    </div>
                    <h3 className={`mt-4 font-bold text-[#08143a] ${H}`}>{s.title}</h3>
                    <p className="mt-2 text-sm text-[color:var(--muted-body)]">{s.desc}</p>
                    <button type="button" className="mt-4 flex items-center gap-1 text-[11px] font-bold text-blue-600">
                      Más info <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </SpotlightCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className="border-y border-blue-100 bg-[#f0f4ff] px-5 py-12 md:px-10">
        <FadeUp>
          <div className="mx-auto max-w-6xl">
            <p className={`mb-6 text-center text-[10px] font-bold uppercase tracking-[0.04em] text-zinc-400 ${H}`}>Marcas que representamos</p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {BRANDS.map((b) => (
                <span key={b} className={`text-sm font-bold uppercase tracking-[0.04em] text-zinc-400 hover:text-blue-600 transition-colors cursor-pointer ${H}`}>
                  {b}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── PROCESS ── */}
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeUp>
              <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.04em] text-blue-600 ${H}`}>Tu visita</p>
              <h2 className={`text-3xl font-black text-[#08143a] md:text-5xl ${H}`}>De la puerta<br />a los lentes</h2>
              <div className="mt-8 space-y-5">
                {STEPS.map((s) => (
                  <div key={s.n} className="flex gap-5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">{s.n}</div>
                    <div>
                      <p className={`font-bold text-[#08143a] ${H}`}>{s.t}</p>
                      <p className="mt-1 text-sm text-[color:var(--muted-body)]">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.12}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image src={IMAGES.exam} alt="Examen visual" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className={`text-lg font-bold text-white ${H}`}>Examen visual completo gratis</p>
                  <p className="text-sm text-blue-200">Sin turno · sin compromiso</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#08143a] px-5 py-16 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <FadeUp>
            <h2 className={`text-3xl font-black text-white md:text-5xl ${H}`}>Tu examen visual<br />te espera hoy.</h2>
            <p className="mt-4 text-sm text-blue-300">Sin turno · sin costo · resultado inmediato</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" className={`flex items-center gap-2 rounded-full bg-blue-500 px-8 py-4 font-bold text-white hover:bg-blue-400 transition-colors ${H}`}>
                <MessageCircle className="h-4 w-4" /> Consultar por WhatsApp
              </button>
              <button type="button" className="rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                Ver catálogo online
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      <footer className="bg-white py-8 text-center text-xs text-zinc-400">Demo · MadsJeez Design</footer>
    </div>
  );
}

export { DemoOpticaLanding as DemoOptica };
