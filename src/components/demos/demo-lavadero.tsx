"use client";

/**
 * LAVADERO — neighborhood laundry service.
 *
 * Identity: clean white + clear blue (#1e6fb8). NOT navy slop, NOT dark glass.
 * Body font Plus Jakarta. Display in Plus Jakarta too — utility, not editorial.
 * Layout move: sticky weight calculator on the right of hero. Pricing as a
 * simple table (NOT card spam). Map widget visible. WhatsApp CTA dominant.
 */

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { useMotionTransition } from "@/lib/motion";
import { DemoLeadForm } from "./demo-lead-form";
import { SpotlightCard } from "@/components/primitives";

const SLUG = "lavadero" as const;
const BRAND = "Lavandería del Pasaje";

const BLUE = "#1e6fb8";
const BLUE_DARK = "#155189";
const BLUE_LIGHT = "#e7f0f8";
const INK = "#0e1a26";
const PAPER = "#ffffff";
const SURFACE = "#f7f9fb";

const WA = "https://wa.me/5491100000000?text=Hola%2C%20quiero%20coordinar%20un%20retiro";

const PRICES = [
  { kg: "5 kg", time: "4 horas", price: "$3.400" },
  { kg: "8 kg", time: "4 horas", price: "$4.900" },
  { kg: "12 kg", time: "Mismo día", price: "$6.800" },
  { kg: "Frazada", time: "24 horas", price: "$5.200" },
  { kg: "Edredón 2 plazas", time: "24 horas", price: "$7.400" },
  { kg: "Camperón inverno", time: "24 horas", price: "$4.600" },
] as const;

const STEPS = [
  { n: 1, title: "Pedís retiro", desc: "WhatsApp o llamada. Coordinamos horario y dirección." },
  { n: 2, title: "Pasamos a buscarlo", desc: "Retiro gratis en zona Almagro, Caballito y Villa Crespo." },
  { n: 3, title: "Lavamos y planchamos", desc: "Detergente neutro hipoalergénico. Suavizante opcional." },
  { n: 4, title: "Te lo llevamos", desc: "Entrega 4 horas para cargas medianas. 24h para abrigos." },
] as const;

export function DemoLavaderoLanding() {
  const v = getDemoVisuals(SLUG);
  const t = useMotionTransition("display");
  const [weight, setWeight] = useState(8);

  const estimate = useMemo(() => {
    const base = Math.round(weight * 610);
    const rounded = Math.round(base / 100) * 100;
    const eta = weight <= 5 ? "4 horas" : weight <= 8 ? "4 horas" : weight <= 12 ? "Mismo día" : "24 horas";
    return { price: rounded, eta };
  }, [weight]);

  return (
    <div
      className="relative min-h-screen antialiased"
      style={{
        background: PAPER,
        color: INK,
        fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
      }}
    >
      <header
        className="sticky top-0 z-40"
        style={{
          background: `${PAPER}f2`,
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${INK}10`,
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl text-[0.95rem] font-bold"
              style={{ background: BLUE, color: PAPER }}
            >
              LP
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[1.02rem] font-semibold">{BRAND}</span>
              <span className="text-[0.74rem]" style={{ color: `${INK}80` }}>
                Almagro · Caballito · V. Crespo
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-[0.92rem] md:flex" style={{ color: `${INK}b0` }}>
            <a href="#precios">Precios</a>
            <a href="#como">Cómo es</a>
            <a href="#zona">Zona</a>
          </nav>

          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[0.88rem] font-semibold transition-transform hover:scale-[1.02]"
            style={{ background: BLUE, color: PAPER }}
          >
            <MessageCircle className="h-4 w-4" />
            Pedir retiro
          </a>
        </div>
      </header>

      <section className="relative">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-12 md:gap-14 md:px-8 md:py-24">
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t}
          >
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.78rem]"
              style={{ background: BLUE_LIGHT, color: BLUE_DARK }}
            >
              <span
                className="live-ping-dot"
                style={{ background: BLUE } as React.CSSProperties}
                aria-hidden
              />
              <Truck className="h-3.5 w-3.5" />
              Retiro y entrega gratis en zona
            </div>

            <h1
              className="leading-[1.02] tracking-[-0.025em]"
              style={{
                fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
                fontWeight: 700,
                color: INK,
              }}
            >
              Lo retiro,
              <br />
              lo lavo,
              <br />
              <span style={{ color: BLUE }}>te lo llevo.</span>
            </h1>

            <p
              className="mt-6 max-w-md text-[1.04rem] leading-relaxed"
              style={{ color: `${INK}b0` }}
            >
              Lavandería de barrio. Retiro y entrega en el día sobre cargas de
              hasta 12 kilos. Frazadas y edredones en 24 horas. Sin tu auto, sin
              cargar la bolsa.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-[0.96rem] font-semibold transition-transform hover:scale-[1.02]"
                style={{ background: BLUE, color: PAPER }}
              >
                <MessageCircle className="h-4 w-4" />
                Coordinar retiro
              </a>
              <a
                href="tel:+5491100000000"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-[0.96rem] font-medium"
                style={{ border: `1px solid ${INK}20`, color: INK }}
              >
                <Phone className="h-4 w-4" />
                11 0000 0000
              </a>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.86rem]" style={{ color: `${INK}88` }}>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4" style={{ color: BLUE }} />
                Entrega en 4h hasta 8kg
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" style={{ color: BLUE }} />
                Detergente hipoalergénico
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4" style={{ color: BLUE }} />
                Suavizante opcional sin costo
              </span>
            </div>
          </motion.div>

          <motion.aside
            className="md:col-span-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...t, delay: 0.1 }}
          >
            <SpotlightCard
              variant="transparent"
              glowColor={`${BLUE}55`}
              size={280}
              className="!rounded-3xl !p-0 !border-0"
            >
            <div
              className="rounded-3xl p-7 md:p-8"
              style={{
                background: SURFACE,
                border: `1px solid ${INK}10`,
                boxShadow: `0 30px 80px -50px ${INK}40`,
              }}
            >
              <div className="flex items-center gap-2 text-[0.82rem]" style={{ color: BLUE_DARK }}>
                <Calculator className="h-4 w-4" />
                Calculá tu lavado
              </div>
              <h3
                className="mt-2 text-[1.5rem] font-semibold leading-tight"
                style={{ color: INK }}
              >
                Pesá la bolsa y te decimos cuánto.
              </h3>

              <label className="mt-7 block text-[0.86rem]" style={{ color: `${INK}99` }}>
                Peso aproximado (kg)
              </label>
              <div className="mt-2 flex items-baseline gap-3">
                <span
                  className="text-[3.5rem] leading-none font-bold tracking-[-0.03em]"
                  style={{ color: INK }}
                >
                  {weight}
                </span>
                <span className="text-[1.05rem]" style={{ color: `${INK}80` }}>
                  kg
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={15}
                step={1}
                value={weight}
                onChange={(e) => setWeight(parseInt(e.target.value, 10))}
                className="mt-4 w-full"
                style={{ accentColor: BLUE }}
                aria-label="Peso aproximado"
              />
              <div className="mt-1 flex justify-between text-[0.74rem]" style={{ color: `${INK}66` }}>
                <span>3 kg</span>
                <span>15 kg</span>
              </div>

              <div
                className="mt-7 flex items-end justify-between border-t pt-5"
                style={{ borderColor: `${INK}14` }}
              >
                <div>
                  <p className="text-[0.78rem]" style={{ color: `${INK}88` }}>
                    Estimado
                  </p>
                  <p
                    className="mt-1 text-[2rem] font-bold leading-none tracking-[-0.02em]"
                    style={{ color: BLUE_DARK }}
                  >
                    ${estimate.price.toLocaleString("es-AR")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[0.78rem]" style={{ color: `${INK}88` }}>
                    Entrega
                  </p>
                  <p className="mt-1 text-[1.05rem] font-semibold" style={{ color: INK }}>
                    {estimate.eta}
                  </p>
                </div>
              </div>

              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[0.95rem] font-semibold"
                style={{ background: BLUE, color: PAPER }}
              >
                Reservar este lavado <ArrowRight className="h-4 w-4" />
              </a>

              <p className="mt-3 text-[0.76rem]" style={{ color: `${INK}66` }}>
                Estimación orientativa. Cargas medianas a pleno. Frazadas y
                edredones cotizamos aparte.
              </p>
            </div>
            </SpotlightCard>
          </motion.aside>
        </div>
      </section>

      <section id="como" className="py-20 md:py-24" style={{ background: SURFACE }}>
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-2xl">
            <p className="text-[0.84rem]" style={{ color: BLUE_DARK }}>
              Cómo es
            </p>
            <h2
              className="mt-2 text-[clamp(1.9rem,4vw,2.8rem)] font-semibold leading-[1.1]"
              style={{ color: INK }}
            >
              Cuatro pasos. Cero vueltas.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...t, delay: i * 0.06 }}
                className="rounded-2xl p-6"
                style={{ background: PAPER, border: `1px solid ${INK}10` }}
              >
                <div
                  className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-[0.85rem] font-bold"
                  style={{ background: BLUE_LIGHT, color: BLUE_DARK }}
                >
                  {s.n}
                </div>
                <h3 className="text-[1.05rem] font-semibold" style={{ color: INK }}>
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed" style={{ color: `${INK}99` }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="precios" className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="max-w-xl">
            <p className="text-[0.84rem]" style={{ color: BLUE_DARK }}>
              Precios
            </p>
            <h2
              className="mt-2 text-[clamp(1.9rem,4vw,2.8rem)] font-semibold leading-[1.1]"
              style={{ color: INK }}
            >
              Sin sorpresas. Lo que ves es lo que pagás.
            </h2>
            <p className="mt-3 text-[0.98rem]" style={{ color: `${INK}99` }}>
              Retiro y entrega incluidos en zona. Detergente y suavizante
              hipoalergénicos, sin recargo.
            </p>
          </div>

          <div
            className="mt-10 overflow-hidden rounded-3xl"
            style={{ border: `1px solid ${INK}10`, background: PAPER }}
          >
            {PRICES.map((row, i) => (
              <div
                key={row.kg}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-6 px-6 py-5"
                style={{
                  borderTop: i > 0 ? `1px solid ${INK}0d` : "none",
                }}
              >
                <div>
                  <p className="text-[1.02rem] font-semibold" style={{ color: INK }}>
                    {row.kg}
                  </p>
                </div>
                <div
                  className="hidden text-[0.86rem] sm:block"
                  style={{ color: `${INK}88` }}
                >
                  Entrega: {row.time}
                </div>
                <div className="text-[1.1rem] font-bold tabular-nums" style={{ color: BLUE_DARK }}>
                  {row.price}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 text-[0.86rem]" style={{ color: `${INK}80` }}>
            Lavado en seco y artículos especiales (alfombras, plumones): se
            cotiza por foto en WhatsApp.
          </p>
        </div>
      </section>

      <section id="zona" className="py-20 md:py-28" style={{ background: SURFACE }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 md:gap-14 md:px-8">
          <div>
            <p className="text-[0.84rem]" style={{ color: BLUE_DARK }}>
              Zona de retiro
            </p>
            <h2
              className="mt-2 text-[clamp(1.7rem,3.5vw,2.4rem)] font-semibold leading-[1.1]"
              style={{ color: INK }}
            >
              Almagro, Caballito y Villa Crespo.
            </h2>
            <p className="mt-4 text-[0.98rem]" style={{ color: `${INK}99` }}>
              Pasamos a buscar tu bolsa en bici eléctrica, sin contaminar y sin
              demorarte el día. Si estás fuera de la zona, escribinos y
              coordinamos.
            </p>

            <ul className="mt-6 space-y-2.5">
              {[
                { label: "Local", val: "Av. Corrientes 4750, Almagro" },
                { label: "Horario", val: "Lun a sáb · 9 a 19 hs" },
                { label: "WhatsApp", val: "+54 9 11 0000 0000" },
              ].map((row) => (
                <li
                  key={row.label}
                  className="flex items-center justify-between border-b py-2"
                  style={{ borderColor: `${INK}10` }}
                >
                  <span className="text-[0.86rem]" style={{ color: `${INK}80` }}>
                    {row.label}
                  </span>
                  <span className="text-[0.96rem] font-medium" style={{ color: INK }}>
                    {row.val}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-[0.84rem]" style={{ background: BLUE_LIGHT, color: BLUE_DARK }}>
              <MapPin className="h-4 w-4" />
              Retiros: lunes a viernes hasta las 18 hs
            </div>
          </div>

          <div className="relative h-[360px] overflow-hidden rounded-3xl md:h-[460px]" style={{ border: `1px solid ${INK}10` }}>
            <Image
              src={v.b}
              alt="Local de lavandería"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              className="absolute bottom-5 left-5 rounded-2xl px-4 py-3 text-[0.88rem]"
              style={{ background: PAPER, color: INK, boxShadow: `0 12px 40px -10px ${INK}40` }}
            >
              <p className="font-semibold">Av. Corrientes 4750</p>
              <p style={{ color: `${INK}88` }}>Almagro · CABA</p>
            </div>
          </div>
        </div>
      </section>

      <DemoLeadForm
        slug={SLUG}
        brandLabel={BRAND}
        theme={{
          ...v.lead,
          invert: true,
          section: "py-20 md:py-28",
          card: "rounded-3xl p-7 md:p-10",
          label: "text-[0.84rem]",
          input: "mt-1 w-full border-b border-[#0e1a26]/15 bg-transparent px-0 py-3 text-[0.96rem] text-[#0e1a26] outline-none focus:border-[#1e6fb8]",
          button: "w-full rounded-xl bg-[#1e6fb8] py-3.5 text-[0.95rem] font-semibold text-white",
          focus: "focus:border-[#1e6fb8]",
        }}
        kicker="Coordiná tu primer retiro"
        title="Empezá hoy"
        sub="Te respondemos por WhatsApp en menos de 15 minutos en horario comercial."
      />

      <footer
        className="border-t py-9"
        style={{ borderColor: `${INK}14`, background: PAPER }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-[0.84rem] md:flex-row md:px-8">
          <span style={{ color: `${INK}80` }}>© {BRAND} · Almagro CABA</span>
          <span style={{ color: `${INK}66` }}>Demo · Mads Jeez Design</span>
        </div>
      </footer>
    </div>
  );
}

export { DemoLavaderoLanding as DemoLavadero };
