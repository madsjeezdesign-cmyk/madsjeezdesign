"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Clock,
  Coffee,
  Heart,
  Leaf,
  MessageCircle,
  Star,
  Wheat,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DEMO_HEADING_CLASS, demoBodyStyle } from "@/lib/demo-art-direction";
import { MagneticButton, SpotlightCard } from "@/components/primitives";

const SLUG = "panaderia" as const;
const H = DEMO_HEADING_CLASS[SLUG];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;

const IMAGES = {
  hero:      img("photo-1509440159596-0249088772ff"),
  bread:     img("photo-1585232350559-803ff7f94d52"),
  coffee:    img("photo-1495474472287-4d71bcdd2085"),
  croissant: img("photo-1555507036-ab794f4afe5e"),
  sourdough: img("photo-1549931319-a545dcf3bc7b"),
  team:      img("photo-1556909114-f6e7ad7d3136"),
};

const MENU = [
  { cat: "Panadería", items: ["Pan de masa madre", "Baguette francesa", "Pan de campo", "Focaccia romero", "Brioche manteca"] },
  { cat: "Viennoiserie", items: ["Croissant manteca", "Pain au chocolat", "Medialuna clásica", "Kouign-amann", "Danish de fruta"] },
  { cat: "Pastelería", items: ["Tarta de limón", "Carrot cake", "Financier avellanas", "Macaron", "Cheesecake New York"] },
  { cat: "Café de especialidad", items: ["Espresso origen Etiopía", "Flat white", "Aeropress filtrado", "Chai latte artesanal", "Matcha ceremonial"] },
];

const VALUES = [
  { icon: Wheat, title: "Fermentación lenta", desc: "48 horas mínimo de reposo. Sin apuro, sin levaduras industriales." },
  { icon: Leaf, title: "Ingredientes locales", desc: "Harina de molino propio, manteca de tambo y huevos de campo." },
  { icon: Clock, title: "Horneado diario", desc: "Primera hornada a las 6 AM. Producto fresco, nunca congelado." },
  { icon: Heart, title: "Sin conservantes", desc: "Lo que no vendemos antes del cierre, va a merenderos del barrio." },
];

const HOURS = [
  { day: "Lunes a viernes", time: "7:00 – 19:00" },
  { day: "Sábados", time: "7:00 – 14:00" },
  { day: "Domingos", time: "8:00 – 13:00" },
];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export function DemoPanaderiaLanding() {
  getDemoVisuals(SLUG);

  return (
    <div style={demoBodyStyle(SLUG)} className="min-h-screen bg-[#faf7f2] text-[#1a1208]">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-[#e8e0d0] bg-[#faf7f2]/95 px-5 py-4 backdrop-blur-xl md:px-10">
        <div className="flex items-center gap-3">
          <Wheat className="h-5 w-5 text-amber-700" />
          <div>
            <span className={`text-sm font-bold text-[#1a1208] ${H}`}>El Horno de Raíz</span>
            <span className="ml-2 hidden text-[10px] text-amber-700 md:inline">Panadería artesanal</span>
          </div>
        </div>
        <div className="hidden items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.04em] text-stone-400 md:flex">
          {["Menú", "Horarios", "Pedidos corp.", "Nosotros"].map((n) => (
            <span key={n} className="cursor-pointer hover:text-amber-800 transition-colors">{n}</span>
          ))}
          <button type="button" className="rounded-full bg-amber-800 px-5 py-2 text-[10px] font-bold text-white hover:bg-amber-700 transition-colors">
            Pedir pan
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative">
        <div className="grid lg:grid-cols-2">
          {/* text side */}
          <div className="flex flex-col justify-center px-5 py-20 md:px-12 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 flex items-center gap-2"
            >
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              ))}
              <span className="text-[11px] text-stone-400">Más de 8 años horneando</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className={`text-6xl font-bold leading-[0.92] tracking-tight text-[#1a1208] md:text-7xl lg:text-8xl ${H}`}
            >
              Pan de
              <br />
              <span className="italic text-amber-700">verdad.</span>
              <br />
              De masa
              <br />
              madre.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 max-w-sm text-sm leading-loose text-stone-500"
            >
              Fermentación lenta 48 horas, harina de molino local, sin aditivos. Viennoiserie con manteca europea y café de especialidad con origen rotativo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button type="button" className={`flex items-center gap-2 rounded-full bg-amber-800 px-7 py-3.5 font-bold text-white hover:bg-amber-700 transition-colors ${H}`}>
                Ver menú de hoy <ArrowRight className="h-4 w-4" />
              </button>
              <button type="button" className="flex items-center gap-2 rounded-full border border-amber-200 px-7 py-3.5 text-sm font-semibold text-stone-600 hover:bg-amber-50 transition-colors">
                Pedidos corporativos
              </button>
            </motion.div>

            {/* hours preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10 flex items-center gap-6"
            >
              <div className="flex items-center gap-2 text-[11px] text-stone-400">
                <Clock className="h-3.5 w-3.5 text-amber-700" /> Abre hoy 7:00 AM
              </div>
              <div className="flex items-center gap-2 text-[11px] text-stone-400">
                <Coffee className="h-3.5 w-3.5 text-amber-700" /> Café de especialidad
              </div>
            </motion.div>
          </div>

          {/* image side */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative h-[60vh] lg:h-auto"
          >
            <Image src={IMAGES.hero} alt="Pan artesanal" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#faf7f2]/20 lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ── VALUES STRIP ── */}
      <section className="border-y border-[#e8e0d0] bg-[#f5f0e8]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {VALUES.map((v, i) => (
            <FadeUp key={v.title} delay={i * 0.08}>
              <div className="flex flex-col items-center gap-3 p-8 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                  <v.icon className="h-5 w-5 text-amber-700" />
                </div>
                <p className={`text-sm font-bold text-[#1a1208] ${H}`}>{v.title}</p>
                <p className="text-[11px] leading-relaxed text-stone-500">{v.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── MENU ── */}
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.04em] text-amber-700 ${H}`}>Lo que horneamos</p>
            <h2 className={`text-3xl font-bold text-[#1a1208] md:text-5xl ${H}`}>El menú de<br />hoy</h2>
          </FadeUp>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {MENU.map((section, i) => (
              <FadeUp key={section.cat} delay={i * 0.08}>
                <SpotlightCard
                  variant="transparent"
                  glowColor="rgba(180,83,9,0.3)"
                  className="h-full rounded-2xl border border-[#e8e0d0] bg-[#f5f0e8] p-6"
                >
                  <p className={`mb-4 text-[10px] font-bold uppercase tracking-[0.04em] text-amber-700 ${H}`}>{section.cat}</p>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-center justify-between border-b border-[#e8e0d0] pb-2 text-sm text-[#1a1208]">
                        <span>{item}</span>
                        <ChevronRight className="h-4 w-4 text-amber-700/40" />
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY SPLIT ── */}
      <section className="bg-[#f5f0e8] px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <FadeUp>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image src={IMAGES.sourdough} alt="Masa madre" fill className="object-cover" />
              </div>
              <div className="grid gap-3">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image src={IMAGES.croissant} alt="Croissant" width={400} height={200} className="h-full w-full object-cover" />
                </div>
                <div className="relative overflow-hidden rounded-2xl">
                  <Image src={IMAGES.coffee} alt="Café" width={400} height={200} className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className={`mb-3 text-[10px] font-bold uppercase tracking-[0.04em] text-amber-700 ${H}`}>Nuestra historia</p>
            <h2 className={`text-4xl font-bold text-[#1a1208] md:text-5xl ${H}`}>Ocho años de levadura, fuego y oficio</h2>
            <div className="mt-6 space-y-4 text-sm leading-loose text-stone-500">
              <p>Empezamos en casa, con una madre de levadura que viajó desde San Francisco. Hoy horneamos más de 200 kg de pan por día sin perder ni un gramo de artesanía.</p>
              <p>Cada harina tiene su origen declarado. La molienda es semanal, el reposo es sagrado y el horno nunca se apaga antes de las 8 PM.</p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[["8+", "años"], ["200 kg", "diarios"], ["0", "congelados"]].map(([v, l]) => (
                <div key={l} className="text-center">
                  <p className={`text-2xl font-black text-amber-700 ${H}`}>{v}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.04em] text-stone-400">{l}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── HORARIOS ── */}
      <section className="border-y border-[#e8e0d0] px-5 py-16 md:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <FadeUp>
              <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.04em] text-amber-700 ${H}`}>Horarios</p>
              <h2 className={`text-3xl font-bold text-[#1a1208] ${H}`}>Primera hornada<br />a las 6 AM</h2>
              <div className="mt-6 space-y-3">
                {HOURS.map((h) => (
                  <div key={h.day} className="flex items-center justify-between border-b border-[#e8e0d0] pb-3">
                    <span className="text-sm text-stone-600">{h.day}</span>
                    <span className={`text-sm font-bold text-[#1a1208] ${H}`}>{h.time}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="rounded-2xl bg-amber-800 p-8 text-white">
                <p className={`text-lg font-bold ${H}`}>Pedidos corporativos</p>
                <p className="mt-2 text-sm text-amber-200">Desayunos de trabajo, eventos, cajas regalo con etiqueta personalizada.</p>
                <div className="mt-4 text-sm text-amber-200 space-y-1">
                  <p>✓ Mínimo 10 personas</p>
                  <p>✓ 48 hs de anticipación</p>
                  <p>✓ Entrega en sede</p>
                </div>
                <button type="button" className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 font-bold text-amber-800 hover:bg-amber-50 transition-colors ${H}`}>
                  <MessageCircle className="h-4 w-4" /> Consultar por WhatsApp
                </button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-[#1a1208] px-5 py-20 md:px-10">
        <div className="pointer-events-none absolute inset-0 opacity-5"
          style={{ backgroundImage: `url("${IMAGES.bread}")`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(4px)" }}
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <FadeUp>
            <h2 className={`text-4xl font-bold text-[#faf7f2] md:text-6xl ${H}`}>Hecho hoy.<br />Listo al mediodía.</h2>
            <p className="mt-4 text-sm text-stone-400">Encargues online · pick up en local · delivery zona sur</p>
            <div className="mt-8 inline-flex">
              <MagneticButton
                variant="primary"
                strength={10}
                className={`!bg-amber-500 hover:!bg-amber-400 rounded-full px-10 py-4 font-bold !text-black ${H}`}
                ariaLabel="Encargar por WhatsApp"
              >
                Encargar por WhatsApp <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </section>

      <footer className="bg-[#faf7f2] py-8 text-center text-xs text-stone-400">Demo · MadsJeez Design</footer>
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export { DemoPanaderiaLanding as DemoPanaderia };
