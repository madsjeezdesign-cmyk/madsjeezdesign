"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Clock,
  Heart,
  IceCream,
  Leaf,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DEMO_HEADING_CLASS, demoBodyStyle } from "@/lib/demo-art-direction";

const SLUG = "heladeria" as const;
const H = DEMO_HEADING_CLASS[SLUG];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=88`;

const IMAGES = {
  hero:     img("photo-1563805042-7684c019e1cb"),
  gelato:   img("photo-1629845072047-4f7b3ef3f025"),
  shop:     img("photo-1497034825429-c343d7c6a68f"),
  fruits:   img("photo-1490474418585-ba9bad8fd0ea"),
  packing:  img("photo-1567206563064-6f60f40a2b57"),
};

type Flavor = { name: string; base: string; color: string; badge?: string };

const FLAVORS: Flavor[] = [
  { name: "Pistacho siciliano", base: "Leche", color: "bg-green-100 text-green-800", badge: "⭐ N°1" },
  { name: "Stracciatella artesanal", base: "Leche", color: "bg-zinc-100 text-zinc-800" },
  { name: "Frambuesa silvestre", base: "Agua", color: "bg-red-100 text-red-800", badge: "Temporada" },
  { name: "Dulce de leche crema", base: "Leche", color: "bg-amber-100 text-amber-800" },
  { name: "Limón Sorrento", base: "Agua", color: "bg-yellow-100 text-yellow-800" },
  { name: "Yogurt & frutos rojos", base: "Agua", color: "bg-pink-100 text-pink-800" },
  { name: "Chocolate 70%", base: "Leche", color: "bg-stone-100 text-stone-800" },
  { name: "Maracuyá & mango", base: "Agua", color: "bg-orange-100 text-orange-800", badge: "Nuevo" },
];

const SIZES = [
  { size: "Coppetta 1 gusto", price: "$1.800", icon: "🍦" },
  { size: "Coppetta 2 gustos", price: "$2.400", icon: "🍨" },
  { size: "Pote 500g", price: "$5.500", icon: "🫙" },
  { size: "Pote 1kg", price: "$9.800", icon: "🪣" },
  { size: "Torta helada 8p", price: "$28.000", icon: "🎂" },
  { size: "Encargo evento", price: "A consultar", icon: "🎉" },
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

export function DemoHeladeriaLanding() {
  getDemoVisuals(SLUG);
  const [activeBase, setActiveBase] = useState<"Todos" | "Leche" | "Agua">("Todos");

  const filtered = activeBase === "Todos" ? FLAVORS : FLAVORS.filter((f) => f.base === activeBase);

  return (
    <div style={demoBodyStyle(SLUG)} className="min-h-screen bg-[#fff9f5] text-[#1c0a18]">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-rose-100 bg-[#fff9f5]/95 px-5 py-4 backdrop-blur-xl md:px-10">
        <div className="flex items-center gap-3">
          <IceCream className="h-5 w-5 text-rose-500" />
          <span className={`text-sm font-bold text-[#1c0a18] ${H}`}>Gelato Alborada</span>
          <span className="hidden rounded-full bg-rose-50 px-2.5 py-0.5 text-[9px] font-bold text-rose-500 md:block">
            Artesanal italiano
          </span>
        </div>
        <div className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-widest text-stone-400 md:flex">
          {["Sabores", "Formatos", "Delivery", "Eventos"].map((n) => (
            <span key={n} className="cursor-pointer hover:text-rose-500 transition-colors">{n}</span>
          ))}
          <button type="button" className="rounded-full bg-rose-500 px-5 py-2 text-[10px] font-bold text-white hover:bg-rose-400 transition-colors">
            Ver carta
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* left text */}
          <div className="flex flex-col justify-center px-5 py-20 md:px-12 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 flex items-center gap-3"
            >
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-rose-400 text-rose-400" />
              ))}
              <span className="text-[11px] text-stone-400">Gelato artesanal premium</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className={`text-6xl font-bold leading-[0.9] text-[#1c0a18] md:text-8xl ${H}`}
            >
              El sabor
              <br />
              <span className="text-rose-500 italic">que no</span>
              <br />
              olvidás
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 max-w-sm text-sm leading-loose text-stone-500"
            >
              Gelato artesanal preparado con fruta fresca de estación, leche entera y pasta de pistacho siciliano importada. Sin colorantes, sin estabilizantes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button type="button" className={`flex items-center gap-2 rounded-full bg-rose-500 px-7 py-3.5 font-bold text-white hover:bg-rose-400 transition-colors ${H}`}>
                Ver sabores de hoy <ArrowRight className="h-4 w-4" />
              </button>
              <button type="button" className="flex items-center gap-2 rounded-full border border-rose-200 px-7 py-3.5 text-sm font-semibold text-stone-600 hover:bg-rose-50 transition-colors">
                <Truck className="h-4 w-4" /> Pedir delivery
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
              className="mt-10 flex flex-wrap gap-5">
              {[
                { icon: Leaf, t: "Sin conservantes" },
                { icon: Heart, t: "Fruta de estación" },
                { icon: Clock, t: "Hecho cada día" },
              ].map(({ icon: I, t }) => (
                <div key={t} className="flex items-center gap-1.5 text-[11px] text-stone-400">
                  <I className="h-3.5 w-3.5 text-rose-400" /> {t}
                </div>
              ))}
            </motion.div>
          </div>

          {/* hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85 }}
            className="relative h-[55vh] lg:h-auto"
          >
            <Image src={IMAGES.hero} alt="Gelato artesanal" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#fff9f5]/20 lg:hidden" />
          </motion.div>
        </div>
      </section>

      {/* ── FLAVORS ── */}
      <section className="border-y border-rose-100 bg-[#fef4f2] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <FadeUp>
              <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-rose-500 ${H}`}>Carta de sabores</p>
              <h2 className={`text-3xl font-bold text-[#1c0a18] md:text-5xl ${H}`}>Sabores<br />de esta semana</h2>
            </FadeUp>
            <div className="flex gap-2">
              {(["Todos", "Leche", "Agua"] as const).map((b) => (
                <button key={b} type="button" onClick={() => setActiveBase(b)}
                  className={`rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    activeBase === b ? "bg-rose-500 text-white" : "border border-rose-200 text-stone-400 hover:border-rose-300"
                  }`}>
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {filtered.map((f, i) => (
              <FadeUp key={f.name} delay={i * 0.04}>
                <div className={`group flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all hover:shadow-md ${f.color} border-transparent`}>
                  {f.badge && <span className="text-[10px] font-black">{f.badge}</span>}
                  {f.name}
                  <span className="rounded-full bg-black/5 px-2 py-0.5 text-[9px] uppercase tracking-wider">{f.base}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIZES ── */}
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-rose-500 ${H}`}>Formatos</p>
            <h2 className={`text-3xl font-bold text-[#1c0a18] md:text-5xl ${H}`}>Para cada ocasión</h2>
          </FadeUp>
          <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {SIZES.map((s, i) => (
              <FadeUp key={s.size} delay={i * 0.07}>
                <div className="flex items-center justify-between rounded-2xl border border-rose-100 bg-[#fff9f5] p-5 hover:border-rose-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{s.icon}</span>
                    <div>
                      <p className={`text-sm font-bold text-[#1c0a18] ${H}`}>{s.size}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-black text-rose-500 ${H}`}>{s.price}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="bg-[#1c0a18] px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <FadeUp>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src={IMAGES.gelato} alt="Gelato" fill className="object-cover" />
              </div>
              <div className="grid gap-3">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image src={IMAGES.fruits} alt="Frutas" width={300} height={150} className="h-full w-full object-cover" />
                </div>
                <div className="relative overflow-hidden rounded-2xl">
                  <Image src={IMAGES.shop} alt="Local" width={300} height={150} className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className={`mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-rose-400 ${H}`}>Nuestra historia</p>
            <h2 className={`text-4xl font-bold text-white md:text-5xl ${H}`}>Receta italiana.<br />Ingredientes locales.</h2>
            <div className="mt-6 space-y-4 text-sm leading-loose text-stone-400">
              <p>Aprendimos la técnica del gelato en Bolonia. Volvimos con la receta y empezamos a adaptarla con fruta local de temporada.</p>
              <p>Hoy preparamos entre 18 y 24 sabores por semana, cambiando la carta según lo que el mercado tiene mejor ese día.</p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[["24", "sabores"], ["0", "conservantes"], ["100%", "artesanal"]].map(([v, l]) => (
                <div key={l} className="text-center">
                  <p className={`text-2xl font-black text-rose-400 ${H}`}>{v}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-stone-500">{l}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── DELIVERY CTA ── */}
      <section className="bg-rose-500 px-5 py-14 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <FadeUp>
            <ShoppingBag className="mx-auto h-8 w-8 text-white/80" />
            <h2 className={`mt-3 text-3xl font-bold text-white md:text-5xl ${H}`}>Pedidos a domicilio<br />y encargues de eventos.</h2>
            <p className="mt-3 text-sm text-rose-100">Tortas heladas · potes multi-gusto · catering gelato</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button type="button" className={`flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-bold text-rose-600 hover:bg-rose-50 transition-colors ${H}`}>
                <MessageCircle className="h-4 w-4" /> Pedir por WhatsApp
              </button>
              <button type="button" className="flex items-center gap-2 rounded-full border border-white/40 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                <Sparkles className="h-4 w-4" /> Ver horarios
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      <footer className="bg-[#fff9f5] py-8 text-center text-xs text-stone-400">Demo · MadsJeez Design</footer>
    </div>
  );
}

export { DemoHeladeriaLanding as DemoHeladeria };
