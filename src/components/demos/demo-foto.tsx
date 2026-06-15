"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Aperture,
  ArrowRight,
  Camera,
  Clapperboard,
  Film,
  Share2,
  MessageCircle,
  Play,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DEMO_HEADING_CLASS, demoBodyStyle } from "@/lib/demo-art-direction";
import { SpotlightCard } from "@/components/primitives";

const SLUG = "foto" as const;
const H = DEMO_HEADING_CLASS[SLUG];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=88`;

const IMAGES = {
  hero:     img("photo-1452587925148-ce544e77e70d"),
  product:  img("photo-1581291518857-4e27b48ff24e"),
  corp:     img("photo-1540575467063-178a50c2df87"),
  event:    img("photo-1511578314322-379afb476865"),
  portrait: img("photo-1531746020798-e6953c6e8e04"),
  studio:   img("photo-1542038784456-1ea8e935640e"),
};

const SPECIALTIES = [
  { icon: Camera, label: "Producto & e-commerce", desc: "Pack foto producto en fondo blanco, lifestyle y catálogo para tiendas." },
  { icon: Aperture, label: "Corporativo & prensa", desc: "Retrato ejecutivo, cobertura de eventos, headshots con entrega express." },
  { icon: Clapperboard, label: "Video comercial", desc: "Reels de marca, spots 30 seg y testimoniales con postproducción incluida." },
  { icon: Film, label: "Editorial & lookbook", desc: "Campañas de moda, catálogos estacionales y contenido para marcas." },
  { icon: Share2, label: "Contenido RRSS", desc: "Pack mensual de imágenes y video corto optimizados por plataforma." },
  { icon: Play, label: "Cobertura de eventos", desc: "Lanzamientos, fiestas corporativas y recitales con entrega en 48 h." },
];

const GALLERY = [
  { src: IMAGES.product, span: "md:col-span-1", aspect: "aspect-square" },
  { src: IMAGES.corp, span: "md:col-span-2", aspect: "aspect-[16/9]" },
  { src: IMAGES.event, span: "md:col-span-1", aspect: "aspect-[4/5]" },
  { src: IMAGES.portrait, span: "md:col-span-1", aspect: "aspect-[4/5]" },
  { src: IMAGES.studio, span: "md:col-span-1", aspect: "aspect-square" },
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

export function DemoFotoLanding() {
  getDemoVisuals(SLUG);
  const [active, setActive] = useState(0);

  const packages = [
    { name: "Mini Pack", price: "$45.000", items: ["2 hs estudio", "20 fotos editadas", "Uso comercial", "Entrega 5 días"] },
    { name: "Business", price: "$95.000", items: ["Día completo", "80 fotos editadas", "1 video 60 seg", "Entrega 48 h"], featured: true },
    { name: "Campaña", price: "$180.000", items: ["2 días de rodaje", "200 fotos", "3 videos", "Dirección de arte"] },
  ];

  return (
    <div style={demoBodyStyle(SLUG)} className="min-h-screen bg-[#111010] text-white">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-white/[0.07] bg-[#111010]/95 px-5 py-4 backdrop-blur-xl md:px-10">
        <div className="flex items-center gap-3">
          <Aperture className="h-5 w-5 text-amber-400" />
          <span className={`text-sm font-bold tracking-[0.1em] text-white uppercase ${H}`}>Lúmenes</span>
          <span className={`text-[10px] text-[color:var(--muted-body)] ${H}`}>Estudio fotográfico</span>
        </div>
        <div className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.04em] text-[color:var(--muted-body)] md:flex">
          {["Portfolio", "Servicios", "Packs", "Contacto"].map((n) => (
            <span key={n} className="cursor-pointer hover:text-amber-400 transition-colors">{n}</span>
          ))}
          <button type="button" className="rounded border border-amber-500/40 px-4 py-2 text-[10px] font-bold text-amber-400 hover:bg-amber-500/10 transition-colors">
            Reservar sesión
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative h-[88vh] min-h-[580px] overflow-hidden">
        <Image src={IMAGES.hero} alt="Lúmenes Estudio" fill className="object-cover object-center grayscale-[30%]" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#111010]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111010]/80 to-transparent" />

        {/* warm glow */}
        <div className="absolute bottom-1/3 left-1/3 h-80 w-80 rounded-full bg-amber-500/8 blur-[100px]" />

        <div className="absolute inset-0 flex items-end pb-20 px-5 md:px-10">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`mb-4 text-[10px] font-bold uppercase tracking-[0.04em] text-amber-400 ${H}`}
            >
              Fotografía · Video · Buenos Aires
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className={`text-6xl font-bold leading-[0.92] text-white md:text-8xl ${H}`}
            >
              Imágenes que
              <br />
              <span className="italic text-amber-400">venden.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.6 }}
              className="mt-5 max-w-md text-sm leading-loose text-zinc-400"
            >
              Producto, corporativo, video comercial y contenido para marcas. Estudio propio de 200 m² con infinity wall, ciclorama y set de iluminación LED RGB.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button type="button" className={`flex items-center gap-2 rounded border border-amber-400 bg-amber-500/10 px-7 py-3.5 font-bold text-amber-400 hover:bg-amber-500/20 transition-colors ${H}`}>
                Ver portfolio <ArrowRight className="h-4 w-4" />
              </button>
              <button type="button" className="flex items-center gap-2 rounded border border-white/10 px-7 py-3.5 text-sm text-zinc-400 hover:border-white/20 hover:text-white transition-colors">
                <MessageCircle className="h-4 w-4" /> Consultar
              </button>
            </motion.div>
          </div>
        </div>

        {/* shooting ticker */}
        <div className="absolute top-6 right-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-md">
          <span className="live-ping-dot" aria-hidden />
          <span className={`text-[10px] font-bold uppercase tracking-[0.04em] text-white/70 ${H}`}>Shooting disponible</span>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="px-5 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.04em] text-amber-500 ${H}`}>Portfolio</p>
            <h2 className={`text-3xl font-bold text-white md:text-5xl ${H}`}>Trabajos recientes</h2>
          </FadeUp>
          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
            {GALLERY.map((g, i) => (
              <FadeUp key={i} delay={i * 0.06} className={g.span}>
                <div className={`group relative overflow-hidden rounded-xl ${g.aspect}`}>
                  <Image src={g.src} alt="" fill className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="border-y border-white/[0.06] bg-[#0d0c0c] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.04em] text-amber-500 ${H}`}>Especialidades</p>
            <h2 className={`text-3xl font-bold text-white md:text-5xl ${H}`}>Lo que hacemos<br />mejor</h2>
          </FadeUp>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SPECIALTIES.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.07}>
                <div className="group flex gap-4 rounded-xl border border-white/[0.07] p-6 hover:border-amber-500/30 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className={`font-bold text-white ${H}`}>{s.label}</p>
                    <p className="mt-1.5 text-sm text-[color:var(--muted-body)]">{s.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.04em] text-amber-500 ${H}`}>Packs</p>
            <h2 className={`text-3xl font-bold text-white md:text-5xl ${H}`}>Precios transparentes</h2>
          </FadeUp>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {packages.map((p, i) => (
              <FadeUp key={p.name} delay={i * 0.1}>
                <SpotlightCard
                  variant="transparent"
                  glowColor="rgba(245,158,11,0.4)"
                  className={`!cursor-pointer !rounded-2xl !border !p-6 transition-all h-full ${
                    active === i
                      ? "!border-amber-500 !bg-amber-500/[0.06] shadow-[0_0_30px_rgba(245,158,11,0.1)]"
                      : p.featured
                        ? "!border-white/20 !bg-[#0d0c0c]"
                        : "!border-white/[0.07] !bg-[#0d0c0c] hover:!border-white/20"
                  }`}
                >
                <div onClick={() => setActive(i)} role="button" tabIndex={0}>
                  {p.featured && (
                    <span className={`mb-3 inline-block rounded-full bg-amber-500/20 px-3 py-1 text-[10px] font-bold text-amber-400 ${H}`}>
                      Más elegido
                    </span>
                  )}
                  <p className={`text-[11px] font-bold uppercase tracking-[0.04em] text-[color:var(--muted-body)] ${H}`}>{p.name}</p>
                  <p className={`mt-1 text-3xl font-black text-white ${H}`}>{p.price}</p>
                  <ul className="mt-5 space-y-2">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-zinc-400">
                        <span className="h-1 w-1 rounded-full bg-amber-400 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                  <button type="button" className={`mt-6 w-full rounded py-2.5 text-sm font-bold transition-colors ${
                    active === i ? "bg-amber-500 text-black" : "border border-white/10 text-zinc-400 hover:border-white/20"
                  } ${H}`}>
                    Consultar
                  </button>
                </div>
                </SpotlightCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-white/[0.06] bg-[#0d0c0c] px-5 py-16 md:px-10">
        <div className="mx-auto max-w-4xl">
          <FadeUp>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className={`text-2xl font-bold text-white md:text-4xl ${H}`}>¿Tenés un proyecto?<br />Hablemos.</h2>
                <p className="mt-2 text-sm text-[color:var(--muted-body)]">Respuesta en menos de 24 horas · Presupuesto sin cargo</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button type="button" className={`flex items-center gap-2 rounded bg-amber-500 px-7 py-3.5 font-bold text-black hover:bg-amber-400 transition-colors ${H}`}>
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </button>
                <button type="button" className="rounded border border-white/10 px-7 py-3.5 text-sm text-zinc-400 hover:border-white/20 hover:text-white transition-colors">
                  Ver Instagram
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <footer className="bg-[#111010] py-8 text-center text-xs text-zinc-700">Demo · MadsJeez Design</footer>
    </div>
  );
}

export { DemoFotoLanding as DemoFoto };
