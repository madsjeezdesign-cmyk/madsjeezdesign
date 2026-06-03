"use client";

/**
 * MODA URBANO CHIC — real streetwear drop.
 *
 * Identity: near-black #0a0a0a + electric chartreuse #d4ff3a + cement gray.
 * Plus Jakarta 800 (NOT serif italic, NOT French). English + Spanish slang OK.
 * Layout move: hero is a giant "DROP 03" type block left, product cutout silhouette
 * right with offset color block behind. Sticky countdown ticker. Product grid with
 * hover-reveal stock count. ONE marquee at bottom (not anywhere else).
 *
 * Voice: directa, slang. "Drop 03. Stock limitado. Ya."
 */

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useMotionTransition } from "@/lib/motion";

const INK = "#0a0a0a";
const PAPER = "#ffffff";
const ELECTRIC = "#d4ff3a";
const CEMENT = "#262626";
const MUTED = "#8a8a8a";

const DROP_PRODUCTS = [
  {
    id: 1,
    name: "Hoodie Block 03",
    price: "$72.000",
    stock: 14,
    img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    tag: "Sin reposición",
  },
  {
    id: 2,
    name: "Puffer Concrete",
    price: "$148.000",
    stock: 4,
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
    tag: "Quedan pocas",
  },
  {
    id: 3,
    name: "Cargo Pant Voltio",
    price: "$92.000",
    stock: 9,
    img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
    tag: "Drop 03",
  },
  {
    id: 4,
    name: "Set Urban Trio",
    price: "$184.000",
    stock: 7,
    img: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=80",
    tag: "Combo",
  },
  {
    id: 5,
    name: "Cap Lab 03",
    price: "$28.000",
    stock: 22,
    img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80",
    tag: "Restock",
  },
  {
    id: 6,
    name: "Tee Heavy Black",
    price: "$34.000",
    stock: 2,
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    tag: "Quedan 2",
  },
] as const;

const HERO_CUTOUT =
  "https://images.unsplash.com/photo-1612215047504-1fbeb9c00595?auto=format&fit=crop&w=1000&q=80";

function useCountdown(targetMs: number) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000 * 30);
    return () => window.clearInterval(id);
  }, []);

  if (now === null) return { dd: "--", hh: "--", mm: "--" };

  const ms = Math.max(0, targetMs - now);
  const dd = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hh = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mm = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  return {
    dd: String(dd).padStart(2, "0"),
    hh: String(hh).padStart(2, "0"),
    mm: String(mm).padStart(2, "0"),
  };
}

export function UrbanoChicStreetOverride() {
  const t = useMotionTransition("display");
  const target = (() => {
    // 6 days from "today" — visual only, no hydration churn.
    if (typeof window === "undefined") return Date.now() + 6 * 86400000;
    return Date.now() + 6 * 86400000;
  })();
  const cd = useCountdown(target);

  const wa =
    "https://wa.me/5491100000008?text=Hola%20Urbano%20Chic!%20Quiero%20reservar%20del%20Drop%2003";

  return (
    <div
      className="relative min-h-screen overflow-x-hidden antialiased"
      style={{
        background: INK,
        color: PAPER,
        fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
      }}
    >
      <header
        className="sticky top-0 z-40"
        style={{ background: `${INK}f0`, borderBottom: `1px solid ${PAPER}10`, backdropFilter: "blur(10px)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center text-[0.85rem] font-black"
              style={{ background: ELECTRIC, color: INK }}
            >
              UC
            </div>
            <span className="text-[1rem] font-black tracking-[-0.01em]" style={{ color: PAPER }}>
              URBANO CHIC
            </span>
          </div>
          <nav
            className="hidden items-center gap-7 text-[0.84rem] font-bold md:flex"
            style={{ color: MUTED }}
          >
            <a href="#drop">Drop 03</a>
            <a href="#release">Release</a>
            <a href="#sizing">Sizing</a>
          </nav>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-[0.84rem] font-black"
            style={{ background: ELECTRIC, color: INK }}
          >
            Reservar
          </a>
        </div>
      </header>

      {/* DROP COUNTDOWN STICKY TICKER */}
      <div
        className="sticky top-[57px] z-30 border-b"
        style={{ background: ELECTRIC, color: INK, borderColor: `${INK}33` }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-2.5 text-[0.82rem] font-bold md:px-8">
          <span>Próximo drop · 6 días</span>
          <span className="font-mono tabular-nums tracking-[0.04em]">
            {cd.dd}d : {cd.hh}h : {cd.mm}m
          </span>
        </div>
      </div>

      {/* HERO — giant type block + offset cutout */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-end gap-10 px-5 pb-20 pt-16 md:grid-cols-12 md:gap-8 md:pb-28 md:pt-24 md:px-8">
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t}
          >
            <p
              className="mb-5 inline-block px-2.5 py-1 text-[0.74rem] font-black tracking-[0.04em]"
              style={{ background: ELECTRIC, color: INK }}
            >
              DROP 03 · STOCK LIMITADO
            </p>
            <h1
              className="leading-[0.84] tracking-[-0.035em]"
              style={{
                fontSize: "clamp(3.6rem, 12vw, 9rem)",
                fontWeight: 900,
                color: PAPER,
              }}
            >
              URBANO
              <br />
              <span style={{ color: ELECTRIC }}>SIN</span>
              <br />
              LÍMITES.
            </h1>
            <p className="mt-7 max-w-md text-[0.96rem] leading-relaxed" style={{ color: `${PAPER}99` }}>
              22 piezas. Sin reposición. Caballito + envío a todo el país. Pago
              en cuotas. Si volás del color, no volvemos a hacer.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#drop"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-[0.92rem] font-black transition-transform hover:scale-[1.02]"
                style={{ background: ELECTRIC, color: INK }}
              >
                Ver Drop 03 <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-[0.92rem] font-bold"
                style={{ border: `1px solid ${PAPER}33`, color: PAPER }}
              >
                <MessageCircle className="h-4 w-4" />
                Reservar por WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...t, delay: 0.1 }}
          >
            <div className="relative ml-auto w-full max-w-md">
              <div
                className="absolute inset-0 -translate-x-4 translate-y-4"
                style={{ background: ELECTRIC }}
                aria-hidden
              />
              <div className="relative aspect-[3/4] overflow-hidden" style={{ background: CEMENT }}>
                <Image
                  src={HERO_CUTOUT}
                  alt="Urbano Chic Drop 03"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              </div>
              <span
                className="absolute -right-3 -top-3 rotate-3 px-3 py-1 text-[0.74rem] font-black tracking-[0.04em]"
                style={{ background: PAPER, color: INK }}
              >
                N°03
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DROP PRODUCT GRID — hover reveals stock */}
      <section id="drop" className="py-20 md:py-28" style={{ background: INK }}>
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div
            className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b pb-6"
            style={{ borderColor: `${PAPER}10` }}
          >
            <div>
              <p className="text-[0.78rem] font-black tracking-[0.04em]" style={{ color: ELECTRIC }}>
                STREET EDIT
              </p>
              <h2
                className="mt-2 leading-[0.92] tracking-[-0.025em]"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 900,
                  color: PAPER,
                }}
              >
                DROP 03
              </h2>
            </div>
            <p className="max-w-xs text-[0.86rem] leading-snug" style={{ color: MUTED }}>
              Stock real, no se repone. Hoodies, puffer, cargo, accesorios.
              Numerado 1 al 22.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {DROP_PRODUCTS.map((p) => {
              const low = p.stock <= 5;
              return (
                <article
                  key={p.id}
                  className="group relative overflow-hidden"
                  style={{ background: CEMENT, border: `1px solid ${PAPER}10` }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <span
                      className="absolute left-2 top-2 px-2 py-0.5 text-[0.7rem] font-black tracking-[0.03em]"
                      style={{
                        background: low ? "#ff3b3b" : ELECTRIC,
                        color: low ? PAPER : INK,
                      }}
                    >
                      {low ? `Quedan ${p.stock}` : p.tag}
                    </span>
                    {/* hover stock reveal */}
                    <div
                      className="absolute bottom-0 left-0 right-0 translate-y-full px-3 py-2 text-[0.74rem] font-bold transition-transform duration-300 group-hover:translate-y-0"
                      style={{ background: `${INK}cc`, color: PAPER }}
                    >
                      Stock real: {p.stock}u · sin reposición
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3.5">
                    <div>
                      <p className="text-[0.86rem] font-black uppercase tracking-[-0.005em]" style={{ color: PAPER }}>
                        {p.name}
                      </p>
                      <p className="mt-0.5 text-[0.82rem]" style={{ color: MUTED }}>
                        {p.price}
                      </p>
                    </div>
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 text-[0.74rem] font-black"
                      style={{ background: ELECTRIC, color: INK }}
                      aria-label={`Reservar ${p.name} por WhatsApp`}
                    >
                      Reservar
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="release" className="py-20 md:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <div>
            <p className="text-[0.78rem] font-black tracking-[0.04em]" style={{ color: ELECTRIC }}>
              RELEASE INFO
            </p>
            <h3
              className="mt-2 leading-[0.95] tracking-[-0.02em]"
              style={{
                fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
                fontWeight: 900,
                color: PAPER,
              }}
            >
              CÓMO COMPRAR EL DROP.
            </h3>
            <p className="mt-4 text-[0.96rem] leading-relaxed" style={{ color: `${PAPER}99` }}>
              Reservás por WhatsApp con el código de la pieza. Pasás a retirar
              en Caballito o pedís envío. Pago con transferencia (10% off),
              tarjeta hasta 3 cuotas o efectivo en local. No se repone stock.
            </p>
          </div>
          <ul className="space-y-3 text-[0.94rem]" style={{ color: `${PAPER}cc` }}>
            <li className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: `${PAPER}14` }}>
              <span style={{ color: MUTED }}>Reservas</span>
              <span style={{ color: PAPER }}>WhatsApp 11 0000 0008</span>
            </li>
            <li className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: `${PAPER}14` }}>
              <span style={{ color: MUTED }}>Pickup</span>
              <span style={{ color: PAPER }}>Caballito · CABA</span>
            </li>
            <li className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: `${PAPER}14` }}>
              <span style={{ color: MUTED }}>Envíos</span>
              <span style={{ color: PAPER }}>OCA / Andreani</span>
            </li>
            <li className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: `${PAPER}14` }}>
              <span style={{ color: MUTED }}>Cuotas</span>
              <span style={{ color: PAPER }}>3 sin interés</span>
            </li>
            <li className="flex items-baseline justify-between">
              <span style={{ color: MUTED }}>Cambios</span>
              <span style={{ color: PAPER }}>15 días — solo talle</span>
            </li>
          </ul>
        </div>
      </section>

      {/* SINGLE allowed marquee — bottom */}
      <div
        className="overflow-hidden border-y py-3"
        style={{ background: ELECTRIC, color: INK, borderColor: `${INK}33` }}
      >
        <div className="flex whitespace-nowrap" style={{ animation: "uc-mq 22s linear infinite" }}>
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
              {["CABALLITO", "DROP 03", "STOCK LIMITADO", "SIN REPOSICIÓN", "URBANO CHIC"].map((label) => (
                <span
                  key={`${dup}-${label}`}
                  className="mx-6 text-[0.86rem] font-black tracking-[0.04em]"
                >
                  {label} ·
                </span>
              ))}
            </div>
          ))}
        </div>
        <style>{`
          @keyframes uc-mq { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          @media (prefers-reduced-motion: reduce) {
            [style*="animation: uc-mq"] { animation: none !important; }
          }
        `}</style>
      </div>

      <footer
        className="py-9 text-center"
        style={{ background: INK, color: MUTED }}
      >
        <p className="text-[0.84rem] font-bold tracking-[0.03em]">
          © URBANO CHIC · CABALLITO · DEMO
        </p>
      </footer>
    </div>
  );
}
