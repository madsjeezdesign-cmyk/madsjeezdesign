"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Calendar,
  Compass,
  Globe,
  MapPin,
  MessageCircle,
  Plane,
  Ship,
  Star,
  Users,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DEMO_HEADING_CLASS, demoBodyStyle } from "@/lib/demo-art-direction";
import { MagneticButton, SpotlightCard } from "@/components/primitives";

const SLUG = "viajes" as const;
const H = DEMO_HEADING_CLASS[SLUG];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=88`;

const IMAGES = {
  hero:      img("photo-1476514525535-07fb3b4ae5f1"),
  machu:     img("photo-1526392060635-9d6019884377"),
  santorini: img("photo-1533104816931-20fa691ff6ca"),
  japan:     img("photo-1493976040374-85c8e12f0c0e"),
  maldives:  img("photo-1506905925346-21bda4d32df4"),
  patagonia: img("photo-1531761535209-83234a4b3bab"),
};

const DESTINATIONS = [
  { name: "Machu Picchu & Cusco", country: "Perú", days: 9, price: "USD 2.450", img: IMAGES.machu, tag: "Cultura" },
  { name: "Santorini & Atenas", country: "Grecia", days: 12, price: "USD 4.200", img: IMAGES.santorini, tag: "Romantico" },
  { name: "Japón completo", country: "Tokio → Kioto → Osaka", days: 16, price: "USD 5.800", img: IMAGES.japan, tag: "Tendencia" },
  { name: "Maldivas exclusivo", country: "All-inclusive", days: 7, price: "USD 6.900", img: IMAGES.maldives, tag: "Lujo" },
  { name: "Patagonia argentina", country: "El Calafate · Chalten", days: 8, price: "USD 1.900", img: IMAGES.patagonia, tag: "Aventura" },
];

const SERVICES = [
  { icon: Plane, title: "Aéreos & conexiones", desc: "Búsqueda de tarifas y combinaciones óptimas, emisión con seguro." },
  { icon: Ship, title: "Cruceros de lujo", desc: "MSC · Costa · Royal Caribbean. Selección de cabina y excursiones." },
  { icon: Globe, title: "Circuitos a medida", desc: "Itinerario día a día según tus intereses, guía local y traslados." },
  { icon: Users, title: "Grupos & corporativo", desc: "Viajes de incentivo, convenciones y experiencias team building." },
];

const PROCESS = [
  { n: "01", t: "Consultamos", d: "Entendemos tus sueños, presupuesto y fechas disponibles." },
  { n: "02", t: "Diseñamos", d: "Propuesta personalizada con opciones A, B y C en 48 horas." },
  { n: "03", t: "Confirmamos", d: "Reservas con seña. El resto al completar el pago antes de salir." },
  { n: "04", t: "Viajás", d: "Asistencia 24/7 durante todo el viaje. Un contacto directo." },
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

export function DemoViajesLanding() {
  getDemoVisuals(SLUG);
  const [activeTab, setActiveTab] = useState<string>("Todos");

  const tabs = ["Todos", "Aventura", "Romantico", "Lujo", "Cultura"];

  return (
    <div style={demoBodyStyle(SLUG)} className="min-h-screen bg-[#040f1a] text-white">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-white/[0.07] bg-[#040f1a]/95 px-5 py-4 backdrop-blur-xl md:px-10">
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-teal-400" />
          <span className={`text-sm font-bold tracking-wide text-white ${H}`}>ATLAS EXPERIENCIAS</span>
        </div>
        <div className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.04em] text-[color:var(--muted-body)] md:flex">
          {["Destinos", "Cruceros", "Grupos", "Contacto"].map((n) => (
            <span key={n} className="cursor-pointer hover:text-teal-400 transition-colors">{n}</span>
          ))}
          <button type="button" className="rounded-full bg-teal-500 px-5 py-2 text-[10px] font-bold text-black hover:bg-teal-400 transition-colors">
            Armar viaje
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative h-[92vh] min-h-[600px] overflow-hidden">
        <Image src={IMAGES.hero} alt="Viajes a medida" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040f1a]/60 via-[#040f1a]/30 to-[#040f1a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040f1a]/70 to-transparent" />

        {/* teal glow */}
        <div className="absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-teal-500/10 blur-[140px]" />

        <div className="absolute inset-0 flex flex-col items-start justify-center px-5 md:px-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5"
            >
              <Globe className="h-3.5 w-3.5 text-teal-400" />
              <span className={`text-[10px] font-bold uppercase tracking-[0.04em] text-teal-400 ${H}`}>
                Agencia boutique · desde 2010
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className={`text-6xl font-black leading-[0.9] tracking-tight text-white md:text-8xl lg:text-[110px] ${H}`}
            >
              El mundo
              <br />
              <span className="text-teal-400">diseñado</span>
              <br />
              para vos
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32, duration: 0.6 }}
              className="mt-6 max-w-lg text-sm leading-loose text-zinc-300 md:text-base"
            >
              Aéreos, cruceros, circuitos a medida y viajes de grupos. Más de 3.000 clientes viajaron con nosotros. Un asesor dedicado desde el primer WhatsApp hasta que volvés.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44, duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <MagneticButton
                strength={10}
                className={`!bg-teal-500 hover:!bg-teal-400 !px-7 !py-3.5 !font-bold ${H}`}
                ariaLabel="Armar mi viaje"
              >
                <Compass className="h-4 w-4 text-black" /> <span className="text-black">Armar mi viaje</span>
              </MagneticButton>
              <button type="button" className="flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                Ver destinos 2026
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-8"
            >
              {[["3.000+", "viajeros"], ["100+", "destinos"], ["24/7", "asistencia"]].map(([v, l]) => (
                <div key={l} className="text-center">
                  <p className={`text-2xl font-black text-teal-400 ${H}`}>{v}</p>
                  <p className="text-[10px] uppercase tracking-[0.04em] text-[color:var(--muted-body)]">{l}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="h-8 w-5 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <div className="h-1.5 w-1 rounded-full bg-teal-400" />
          </div>
        </motion.div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <FadeUp>
              <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.04em] text-teal-500 ${H}`}>Destinos</p>
              <h2 className={`text-3xl font-black text-white md:text-5xl ${H}`}>Favoritos<br />de esta temporada</h2>
            </FadeUp>
            {/* tab filters */}
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.04em] transition-colors ${
                    activeTab === tab
                      ? "bg-teal-500 text-black"
                      : "border border-white/10 text-[color:var(--muted-body)] hover:border-teal-500/30 hover:text-teal-400"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {DESTINATIONS.map((dest, i) => (
              <FadeUp key={dest.name} delay={i * 0.07}>
                <div className="group relative overflow-hidden rounded-2xl">
                  <div className="relative aspect-[4/3]">
                    <Image src={dest.img} alt={dest.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    <div className="flex justify-between">
                      <span className={`rounded-full bg-teal-500 px-3 py-1 text-[10px] font-bold text-black ${H}`}>{dest.tag}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-[11px] text-white/80">4.9</span>
                      </div>
                    </div>
                    <div>
                      <p className={`text-xl font-black text-white ${H}`}>{dest.name}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[11px] text-zinc-300">
                          <MapPin className="h-3 w-3" /> {dest.country}
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-zinc-300">
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {dest.days} días</span>
                          <span className="font-bold text-teal-400">{dest.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="border-y border-white/[0.07] bg-[#06111e] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.04em] text-teal-500 ${H}`}>Lo que hacemos</p>
            <h2 className={`text-3xl font-black text-white md:text-5xl ${H}`}>Cada viaje es<br />una historia única</h2>
          </FadeUp>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.07}>
                <SpotlightCard
                  variant="transparent"
                  glowColor="rgba(20,184,166,0.45)"
                  className="!flex !flex-col !gap-4 !rounded-2xl !border-white/[0.07] !bg-[#060d18] !p-6 hover:!border-teal-500/30 transition-colors h-full"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className={`font-bold text-white ${H}`}>{s.title}</p>
                    <p className="mt-2 text-sm text-[color:var(--muted-body)]">{s.desc}</p>
                  </div>
                </SpotlightCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-4xl">
          <FadeUp>
            <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.04em] text-teal-500 ${H}`}>Cómo funciona</p>
            <h2 className={`text-3xl font-black text-white md:text-5xl ${H}`}>De la idea<br />al pasaje</h2>
          </FadeUp>
          <div className="mt-12 space-y-6">
            {PROCESS.map((s, i) => (
              <FadeUp key={s.n} delay={i * 0.08}>
                <div className="flex gap-6 items-start">
                  <span className={`shrink-0 text-4xl font-black text-teal-500/20 ${H}`}>{s.n}</span>
                  <div className="flex-1 border-l border-white/[0.07] pl-6 pb-4">
                    <p className={`font-bold text-white ${H}`}>{s.t}</p>
                    <p className="mt-1 text-sm text-[color:var(--muted-body)]">{s.d}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden px-5 py-20 md:px-10">
        <div className="absolute inset-0">
          <Image src={IMAGES.santorini} alt="Destino" fill className="object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040f1a] via-[#040f1a]/80 to-[#040f1a]/60" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <FadeUp>
            <h2 className={`text-4xl font-black text-white md:text-6xl ${H}`}>¿A dónde querés ir?<br /><span className="text-teal-400">Hablemos.</span></h2>
            <p className="mt-4 text-sm text-zinc-400">Consulta gratuita · propuesta en 48 horas · sin compromiso</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button type="button" className={`flex items-center gap-2 rounded-full bg-teal-500 px-8 py-4 font-bold text-black hover:bg-teal-400 transition-colors ${H}`}>
                <MessageCircle className="h-4 w-4" /> Consultar por WhatsApp <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      <footer className="bg-[#040f1a] py-8 text-center text-xs text-zinc-700">Demo · MadsJeez Design</footer>
    </div>
  );
}

export { DemoViajesLanding as DemoViajes };
