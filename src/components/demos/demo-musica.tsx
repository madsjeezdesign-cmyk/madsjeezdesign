"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Guitar,
  Headphones,
  Mic2,
  Music2,
  Play,
  Star,
  Users,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DEMO_HEADING_CLASS, demoBodyStyle } from "@/lib/demo-art-direction";

const SLUG = "musica" as const;
const H = DEMO_HEADING_CLASS[SLUG];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;

const IMAGES = {
  cover:  img("photo-1511671782779-c97d3d27a1d4"),
  piano:  img("photo-1520523839897-bd0b52f945a0"),
  guitar: img("photo-1493225457124-a3eb161ffa5f"),
  class:  img("photo-1524117074681-31bd4de22ad3"),
  stage:  img("photo-1501612780327-45045538702b"),
};

const COURSES = [
  { icon: Piano, name: "Piano Clásico", level: "Principiante → Avanzado", seats: "3 cupos" },
  { icon: Guitar, name: "Guitarra Eléctrica", level: "Pop · Rock · Blues", seats: "2 cupos" },
  { icon: Mic2, name: "Canto & Técnica vocal", level: "Todos los niveles", seats: "4 cupos" },
  { icon: Music2, name: "Teoría Musical", level: "Lectura · Armonía · Composición", seats: "6 cupos" },
  { icon: Headphones, name: "Producción Digital", level: "DAW · Mezcla · Master", seats: "2 cupos" },
  { icon: Users, name: "Ensamble & Banda", level: "Conjunto · Repertorio vivo", seats: "1 grupo" },
];

function Piano(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M6 4v8M10 4v8M14 4v8M18 4v8M4 12h16" />
    </svg>
  );
}

const STATS = [
  { val: "18 años", label: "Trayectoria" },
  { val: "340+", label: "Alumnos formados" },
  { val: "8", label: "Profesores en planta" },
  { val: "Trinity", label: "Exámenes certificados" },
];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export function DemoMusicaLanding() {
  getDemoVisuals(SLUG);

  return (
    <div style={demoBodyStyle(SLUG)} className="min-h-screen bg-[#12082a] text-white">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-white/[0.07] bg-[#12082a]/90 px-5 py-4 backdrop-blur-xl md:px-10">
        <div className="flex items-center gap-3">
          <Music2 className="h-5 w-5 text-violet-400" />
          <span className={`text-sm font-bold tracking-widest text-white uppercase ${H}`}>Pentagrama</span>
          <span className="hidden rounded-sm bg-violet-500/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-violet-400 md:block">Escuela de música</span>
        </div>
        <div className="hidden items-center gap-6 text-[11px] font-semibold uppercase tracking-widest text-zinc-500 md:flex">
          {["Cursos", "Horarios", "Exámenes", "Contacto"].map((n) => (
            <span key={n} className="cursor-pointer hover:text-violet-300 transition-colors">{n}</span>
          ))}
          <button type="button" className="rounded-full bg-violet-600 px-5 py-2 text-[10px] font-bold text-white hover:bg-violet-500 transition-colors">
            Inscripción 2026
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* background image full bleed */}
        <div className="relative h-[85vh] min-h-[560px]">
          <Image src={IMAGES.cover} alt="Escuela de música Pentagrama" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12082a] via-[#12082a]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12082a] via-transparent to-[#12082a]/40" />

          <div className="absolute inset-0 flex items-center px-5 md:px-10">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 flex items-center gap-3"
              >
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-violet-400 text-violet-400" />
                ))}
                <span className="text-[11px] text-zinc-400">+ de 340 músicos formados</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1 }}
                className={`text-6xl font-bold leading-[0.93] tracking-tight text-white md:text-8xl ${H}`}
              >
                Donde la música
                <br />
                <span className="italic text-violet-300">se convierte</span>
                <br />
                en lenguaje
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-6 max-w-md text-sm leading-loose text-zinc-300 md:text-base"
              >
                Piano, guitarra, canto, producción y ensamble. Clases individuales y grupales con maestros egresados del conservatorio. Exámenes Trinity College London certificados.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.5 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <button type="button" className={`flex items-center gap-2 rounded-full bg-violet-600 px-7 py-3.5 font-bold text-white hover:bg-violet-500 transition-colors ${H}`}>
                  Inscribirme ahora <ArrowRight className="h-4 w-4" />
                </button>
                <button type="button" className="flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                  <Play className="h-4 w-4 fill-white" /> Ver clases demo
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-white/[0.07] bg-[#1a0f34]">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-white/[0.07] md:grid-cols-4">
          {STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.08}>
              <div className="px-8 py-8 text-center">
                <p className={`text-3xl font-bold text-violet-300 md:text-4xl ${H}`}>{s.val}</p>
                <p className="mt-2 text-[12px] uppercase tracking-widest text-zinc-500">{s.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── COURSES ── */}
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="flex items-end justify-between">
              <div>
                <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-violet-500 ${H}`}>Cursos 2026</p>
                <h2 className={`text-3xl font-bold text-white md:text-5xl ${H}`}>Un instrumento<br />o todos a la vez</h2>
              </div>
              <button type="button" className="hidden items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors md:flex">
                Ver grilla completa <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </FadeUp>

          <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {COURSES.map((c, i) => (
              <FadeUp key={c.name} delay={i * 0.07}>
                <div className="group flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-[#1a0f34] p-6 transition-all hover:border-violet-500/30 hover:bg-[#1f1040]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 transition-colors">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold text-white ${H}`}>{c.name}</p>
                    <p className="mt-1 text-[12px] text-zinc-500">{c.level}</p>
                    <span className="mt-3 inline-block rounded-full bg-violet-500/15 px-3 py-1 text-[10px] font-bold text-violet-400">
                      {c.seats}
                    </span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPLIT STORY ── */}
      <section className="border-y border-white/[0.07] px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <FadeUp>
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/[0.07]">
              <Image src={IMAGES.class} alt="Clase de música" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 to-transparent" />
              {/* vinyl record decorative */}
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border-4 border-violet-500/20 opacity-50" />
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full border-2 border-violet-500/30 opacity-50" />
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className={`mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-violet-500 ${H}`}>Metodología</p>
            <h2 className={`text-4xl font-bold text-white md:text-5xl ${H}`}>Teoría que<br />se aprende tocando</h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-400">
              <p>No separamos la teoría de la práctica. Desde el primer día el alumno toca, escucha y crea — el solfeo aparece como herramienta cuando el oído ya entendió el concepto.</p>
              <p>Para los que apuntan a exámenes internacionales, preparamos repertorio Trinity/ABRSM con simulacros desde 6 meses antes del examen.</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: "Clases 1 a 1", desc: "Progreso a tu ritmo" },
                { label: "Grupos reducidos", desc: "Máx. 4 alumnos" },
                { label: "Clases híbridas", desc: "Presencial + online" },
                { label: "Exámenes Trinity", desc: "London certificados" },
              ].map((b) => (
                <div key={b.label} className="rounded-xl border border-white/[0.07] p-4">
                  <p className={`text-sm font-bold text-violet-300 ${H}`}>{b.label}</p>
                  <p className="mt-1 text-[11px] text-zinc-500">{b.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── STAGE IMAGE ── */}
      <section className="relative h-64 overflow-hidden md:h-96">
        <Image src={IMAGES.stage} alt="Recital Pentagrama" fill className="object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12082a] via-[#12082a]/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <FadeUp>
            <div className="text-center">
              <p className={`text-2xl font-bold text-white md:text-4xl ${H}`}>Recital de fin de año</p>
              <p className="mt-2 text-sm text-zinc-400">Escenario real · público · experiencia completa</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="bg-gradient-to-r from-violet-900 to-indigo-900 px-5 py-16 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <FadeUp>
            <h2 className={`text-3xl font-bold text-white md:text-5xl ${H}`}>Inscripciones abiertas.<br />Cupos muy limitados.</h2>
            <p className="mt-4 text-sm text-violet-200">Clases de prueba gratuita disponibles para nuevos alumnos</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" className={`rounded-full bg-white px-8 py-3.5 font-bold text-violet-900 hover:bg-violet-50 transition-colors ${H}`}>
                Reservar clase de prueba
              </button>
              <button type="button" className="rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                Ver horarios y aranceles
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      <footer className="bg-[#0d0520] py-8 text-center text-xs text-zinc-600">Demo · MadsJeez Design</footer>
    </div>
  );
}

export { DemoMusicaLanding as DemoMusica };
