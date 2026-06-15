"use client";

/**
 * NEIGHBORHOOD WARMTH — archetype shell for barrio commerce.
 * Slugs: almacen, kiosco, carniceria, granja, libreria, supermercado.
 * Vibe: cálido, humano, editorial. Typography-led hero. Cream as accent (NOT body bg).
 */

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, MessageCircle, Clock } from "lucide-react";
import { getCommerceConfig } from "@/lib/commerce-demos";
import { getDemoVisuals } from "@/lib/demo-assets";
import { useMotionTransition } from "@/lib/motion";
import { DemoLeadForm } from "../demo-lead-form";
import { ScrollReveal, MagneticButton } from "@/components/primitives";

type Props = { slug: string };

/** Local barrio voice per slug — used in hero typography. */
const BARRIO_META: Record<
  string,
  { tagline: string; hours: string; address: string; signature: string }
> = {
  almacen: { tagline: "El almacén de la cuadra.", hours: "Lunes a sábado · 8 a 21", address: "Mitre 1240, barrio Sur", signature: "Mariano, tercera generación" },
  kiosco: { tagline: "Abierto cuando todos cierran.", hours: "Todos los días · 7 a 1am", address: "Esquina San Martín y Belgrano", signature: "El Kiosko desde el 92" },
  carniceria: { tagline: "El corte justo, recién hecho.", hours: "Martes a sábado · 8 a 13 y 17 a 20", address: "Av. Independencia 2890", signature: "Don Juan, parrillero" },
  granja: { tagline: "Lo cosechado de la semana.", hours: "Miércoles y sábados · feria", address: "Ruta 9 km 32, El Campo", signature: "Cinco familias productoras" },
  libreria: { tagline: "Libros, útiles y café.", hours: "Lunes a sábado · 9 a 20", address: "Calle Florida 458", signature: "Página & Tinta, desde 1978" },
  supermercado: { tagline: "Tu súper, del barrio de siempre.", hours: "Todos los días · 8 a 22", address: "Av. Boedo 1820", signature: "Mercado Familiar" },
};

export function NeighborhoodWarmthLanding({ slug }: Props) {
  const config = getCommerceConfig(slug);
  const v = config ? getDemoVisuals(slug) : null;
  const t = useMotionTransition("display");
  const meta = BARRIO_META[slug] ?? {
    tagline: "Tu comercio del barrio.",
    hours: "Horario extendido",
    address: "En tu barrio",
    signature: "Comercio familiar",
  };

  const accent = config?.accent ?? "#b45309";

  if (!config || !v) return null;

  return (
    <div
      className="relative min-h-screen bg-[#fbfaf6] font-[family-name:var(--font-demo-b-commerce)] text-[#26211b] antialiased"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      {/* HEADER — small, friendly, no nav bar drama */}
      <header className="border-b border-[#e8e2d3] px-5 py-5 md:px-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <p className="font-[family-name:var(--font-instrument)] text-2xl italic leading-none text-[#26211b] md:text-3xl">
              {config.brand}
            </p>
            <p className="mt-1 text-[11px] text-[#766c5b]">{config.tradeLabel}</p>
          </div>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white"
            style={{ background: accent }}
          >
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
          </a>
        </div>
      </header>

      {/* HERO — editorial, big serif + sans split */}
      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t}
          >
            <p className="text-sm text-[#9b8e75]">{meta.address}</p>
            <h1 className="mt-6 font-[family-name:var(--font-instrument)] text-5xl italic leading-[0.95] tracking-tight text-[#26211b] md:text-[5.5rem]">
              {meta.tagline}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#574e3f]">
              {config.heroSub}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t, delay: 0.15 }}
            className="mt-12 grid items-end gap-8 md:grid-cols-[1fr_240px]"
          >
            <div className="flex flex-col gap-4 text-sm text-[#574e3f]">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" style={{ color: accent }} />
                <span>{meta.hours}</span>
                <span
                  className="live-ping-dot ml-1"
                  style={{ background: accent, "--brand-cyan": accent } as React.CSSProperties}
                  aria-hidden
                />
                <span className="text-[11px] text-[#8a7d63]">abierto ahora</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" style={{ color: accent }} />
                <span>{meta.address}</span>
              </div>
              <div className="mt-3">
                <MagneticButton
                  href="#contacto"
                  variant="primary"
                  strength={6}
                  className="text-white"
                >
                  <MessageCircle className="h-4 w-4" /> Pedinos por WhatsApp
                </MagneticButton>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-[#e8e2d3]">
              <Image
                src={v.cover}
                alt={config.industryLabel}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 240px"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT WE HAVE TODAY — hand-noted style list, cream accent surface */}
      <ScrollReveal as="section" className="border-y border-[#e8e2d3] bg-[#f4ecdb] px-5 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <p className="text-xs text-[#8a7d63]">Hoy en el mostrador</p>
            <h2 className="mt-2 font-[family-name:var(--font-instrument)] text-4xl italic leading-tight text-[#26211b] md:text-5xl">
              Lo que tenemos esta semana
            </h2>
          </div>
          <div className="grid gap-x-10 gap-y-5 md:grid-cols-2">
            {config.categories.map((cat, i) => (
              <div
                key={cat}
                className="flex items-baseline justify-between gap-4 border-b border-[#d9cdb0] pb-4"
              >
                <span className="font-[family-name:var(--font-instrument)] text-xl text-[#26211b]">
                  {cat}
                </span>
                <span className="text-xs italic text-[#8a7d63]">
                  {config.features[i % config.features.length]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* HOW WE REACH YOU — delivery / pickup / whatsapp */}
      <ScrollReveal as="section" className="px-5 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 font-[family-name:var(--font-instrument)] text-3xl italic text-[#26211b] md:text-4xl">
            Cómo te llegamos
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Por WhatsApp", body: "Mandanos el pedido y lo dejamos listo para retirar." },
              { title: "Delivery del barrio", body: "Repartimos en bici en la zona. Sin app, sin recargo loco." },
              { title: "En el local", body: meta.hours },
            ].map((card) => (
              <div key={card.title}>
                <p className="font-[family-name:var(--font-instrument)] text-2xl text-[#26211b]">
                  {card.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#574e3f]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* TESTIMONIAL — single large block, italic serif */}
      <section className="border-y border-[#e8e2d3] bg-white px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="font-[family-name:var(--font-instrument)] text-3xl italic leading-snug text-[#26211b] md:text-4xl"
          >
            "Vengo desde que era chica. Acá te conocen el nombre, el barrio y hasta lo que le gusta al perro."
          </p>
          <p className="mt-8 text-sm text-[#766c5b]">Vecina del barrio · cliente desde 2009</p>
        </div>
      </section>

      {/* MAPA / DIRECCIÓN */}
      <section className="px-5 py-20 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-xs text-[#8a7d63]">Encontranos</p>
            <h2 className="mt-2 font-[family-name:var(--font-instrument)] text-3xl italic text-[#26211b] md:text-4xl">
              En el barrio
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#574e3f]">
              {meta.address}. {meta.hours}.
            </p>
            <p className="mt-4 text-sm italic text-[#8a7d63]">— {meta.signature}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-[#e8e2d3]">
            <Image src={v.b} alt="El local" fill className="object-cover" sizes="(max-width: 768px) 100vw, 60vw" />
          </div>
        </div>
      </section>

      <div id="contacto">
        <DemoLeadForm
          slug={slug}
          brandLabel={`${config.brand} · ${config.tradeLabel}`}
          theme={v.lead}
          kicker="Escribinos"
          title="Hacenos tu pedido"
          sub={`Te contestamos rápido por WhatsApp. ${meta.hours}.`}
        />
      </div>

      <footer className="border-t border-[#e8e2d3] bg-[#fbfaf6] px-5 py-10 text-center text-xs text-[#8a7d63] md:px-10">
        © {new Date().getFullYear()} {config.brand} · {meta.address} · {meta.signature}
      </footer>
    </div>
  );
}
