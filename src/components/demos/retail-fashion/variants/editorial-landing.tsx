"use client";

/**
 * Variant B — Editorial.
 *
 * Visual identity:
 * - Instrument-Serif italic dominates (mixed-case, never ALL-CAPS).
 * - Full-bleed mood-photography hero with shadow-text overlay.
 * - Magazine-style asymmetric image+text spreads.
 * - "Looks de la temporada" lookbook in portrait slides.
 * - Slow scroll-into-view, gentle parallax. useMotionTransition('display').
 */

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import {
  type RetailFashionConfig,
  type RetailFashionProduct,
  getRetailFashionConfig,
} from "@/lib/retail-fashion-demos";
import {
  whatsappCartUrl,
  whatsappGeneralUrl,
  whatsappProductUrl,
} from "@/lib/fashion-whatsapp";
import { useMotionTransition } from "@/lib/motion";
import { DemoLeadForm } from "../../demo-lead-form";
import { FashionPhoto } from "../fashion-photo";
import { ScrollReveal, SpotlightCard } from "@/components/primitives";

type Props = { slug: string };

function EditorialNav({ brand }: { brand: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#1c1612]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/demos"
          className="text-[12px] tracking-[0.04em] text-[#e9d9c4] hover:text-white"
        >
          ← Showroom
        </Link>
        <span className="font-serif text-[18px] italic text-[#f3e7d6]">{brand}</span>
        <span className="text-[11px] tracking-[0.05em] text-[#c1a986]">N°03</span>
      </div>
    </header>
  );
}

function EditorialHero({ config }: { config: RetailFashionConfig }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const transition = useMotionTransition("display", "display");

  return (
    <section ref={ref} className="relative h-[100vh] w-full overflow-hidden bg-[#0f0c0a]">
      <motion.div style={{ y }} className="absolute inset-0 -top-[10%] h-[120%] w-full">
        <FashionPhoto
          src={config.heroImage}
          alt={`Portada ${config.brand}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/85" />
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        className="relative z-10 flex h-full items-end pb-24 md:pb-28"
      >
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-6 text-[11px] tracking-[0.06em] text-[#e9d9c4]">
            {config.heroKicker}
          </p>
          <h1
            className="max-w-3xl font-serif text-[clamp(3rem,8.5vw,7rem)] font-normal leading-[0.95] text-[#fbf5ec]"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.5)" }}
          >
            <span className="italic">{config.heroTitle}</span>{" "}
            <span className="font-light">{config.heroHighlight}</span>
          </h1>
          <p className="mt-8 max-w-md font-serif text-[17px] italic leading-relaxed text-[#e9d9c4]">
            "{config.tagline}"
          </p>
        </div>
      </motion.div>
    </section>
  );
}

function EditorialIntro({ config }: { config: RetailFashionConfig }) {
  const reduce = useReducedMotion();
  const transition = useMotionTransition("display", "display");
  return (
    <section className="bg-[#fbf5ec] py-28 md:py-36">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={transition}
        className="mx-auto max-w-3xl px-6"
      >
        <p className="text-[11px] tracking-[0.06em] text-[#8b6c4a]">{config.collectionTitle}</p>
        <p className="mt-6 font-serif text-[clamp(1.4rem,2.8vw,2rem)] italic leading-[1.5] text-[#1c1612]">
          {config.collectionSubtitle}. Una pieza para la noche que no termina —
          tejida con tiempo, mostrada con luz natural, lista para vivir.
        </p>
        <div className="mt-10 inline-flex items-center gap-3 text-[12px] tracking-[0.04em] text-[#8b6c4a]">
          Edición {config.seasonBadge}
          <span aria-hidden>·</span>
          {config.brand}
        </div>
      </motion.div>
    </section>
  );
}

function EditorialSpread({
  product,
  index,
  config,
  onAdd,
}: {
  product: RetailFashionProduct;
  index: number;
  config: RetailFashionConfig;
  onAdd: (p: RetailFashionProduct) => void;
}) {
  const reverse = index % 2 === 1;
  const reduce = useReducedMotion();
  const transition = useMotionTransition("display", "display");
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={transition}
      className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-12 md:gap-16 md:py-28"
    >
      <div
        className={`md:col-span-7 ${reverse ? "md:order-2" : ""}`}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ece2cf]">
          <FashionPhoto
            src={product.image}
            fallbackSrc={product.fallbackImage}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 60vw"
          />
        </div>
      </div>
      <div className={`md:col-span-5 ${reverse ? "md:order-1 md:pr-8" : "md:pl-4"}`}>
        <p className="text-[11px] tracking-[0.06em] text-[#8b6c4a]">
          N°{String(index + 1).padStart(2, "0")} · Look
        </p>
        <h3 className="mt-4 font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] italic leading-tight text-[#1c1612]">
          {product.name}
        </h3>
        <p className="mt-4 text-[14px] leading-[1.7] text-[#5b4533]">
          {product.price}. Pieza fotografiada en estudio, número limitado.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onAdd(product)}
            className="border border-[#1c1612] px-6 py-3 text-[11px] tracking-[0.06em] text-[#1c1612] transition-colors hover:bg-[#1c1612] hover:text-[#fbf5ec]"
          >
            Reservar pieza
          </button>
          <a
            href={whatsappProductUrl(config, product)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-2 py-3 text-[12px] italic text-[#8b6c4a] underline-offset-4 hover:text-[#1c1612] hover:underline"
          >
            Consultar por WhatsApp <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function EditorialLookbook({ config }: { config: RetailFashionConfig }) {
  const media = config.instagramMedia ?? [];
  return (
    <section className="overflow-hidden bg-[#1c1612] py-24 text-[#fbf5ec] md:py-32">
      <ScrollReveal className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.06em] text-[#c1a986]">
              Lookbook
            </p>
            <h3 className="mt-3 font-serif text-[clamp(1.75rem,3vw,2.5rem)] italic">
              Looks de la temporada
            </h3>
          </div>
          <a
            href={config.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[12px] italic text-[#e9d9c4] underline-offset-4 hover:text-white hover:underline"
          >
            Ver completo en @{config.instagramHandle}
          </a>
        </div>
      </ScrollReveal>

      <div className="relative">
        <div className="flex gap-6 overflow-x-auto scroll-smooth px-6 pb-6 [scrollbar-width:none] md:px-[max(1.5rem,calc((100vw-72rem)/2))] [&::-webkit-scrollbar]:hidden">
          {media.slice(0, 8).map((m, i) => (
            <a
              key={m.id}
              href={m.postUrl}
              target="_blank"
              rel="noreferrer"
              className="block w-[70vw] shrink-0 md:w-[28rem]"
            >
              <SpotlightCard
                variant="transparent"
                glowColor="rgba(233,217,196,0.18)"
                size={260}
                className="relative aspect-[3/4] w-full overflow-hidden !rounded-none bg-black/40"
              >
                <FashionPhoto
                  src={m.image}
                  fallbackSrc={m.fallbackImage}
                  alt={m.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                  sizes="(max-width:768px) 70vw, 28rem"
                />
                <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent px-5 py-4">
                  <p className="font-serif text-[14px] italic text-[#fbf5ec]">
                    Look N°{String(i + 1).padStart(2, "0")}
                  </p>
                </div>
              </SpotlightCard>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorialBoutique({ config }: { config: RetailFashionConfig }) {
  return (
    <section className="bg-[#fbf5ec] py-24 md:py-32">
      <ScrollReveal className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2">
        <div>
          <p className="text-[11px] tracking-[0.06em] text-[#8b6c4a]">Maison</p>
          <h3 className="mt-3 font-serif text-[clamp(1.75rem,3vw,2.5rem)] italic text-[#1c1612]">
            Visitanos
          </h3>
          <p className="mt-6 max-w-md text-[14px] leading-[1.7] text-[#5b4533]">
            {config.addressLines.join(" · ")}
          </p>
          <div className="mt-10 flex gap-3">
            <a
              href={whatsappGeneralUrl(config)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1c1612] px-6 py-3 text-[11px] tracking-[0.06em] text-[#fbf5ec] hover:bg-[#2b2218]"
            >
              <MessageCircle className="h-4 w-4" /> Agendar visita
            </a>
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-3 py-3 text-[12px] italic text-[#8b6c4a] underline-offset-4 hover:text-[#1c1612] hover:underline"
            >
              @{config.instagramHandle}
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden">
          <iframe
            src={config.mapsEmbedUrl}
            className="absolute inset-0 h-full w-full border-0 grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Ubicación ${config.brand}`}
          />
        </div>
      </ScrollReveal>
    </section>
  );
}

export function EditorialLanding({ slug }: Props) {
  const config = getRetailFashionConfig(slug);
  const [cart, setCart] = useState<RetailFashionProduct[]>([]);

  const onAdd = (p: RetailFashionProduct) => {
    setCart((prev) => (prev.some((x) => x.id === p.id) ? prev : [...prev, p]));
  };

  const wa = useMemo(() => (config ? whatsappGeneralUrl(config) : "#"), [config]);

  if (!config) return null;

  return (
    <div className="min-h-screen bg-[#fbf5ec] font-sans text-[#1c1612] antialiased">
      <EditorialNav brand={config.brand} />
      <EditorialHero config={config} />
      <EditorialIntro config={config} />

      <div className="bg-[#fbf5ec]">
        {config.products.map((product, i) => (
          <EditorialSpread
            key={product.id}
            product={product}
            index={i}
            config={config}
            onAdd={onAdd}
          />
        ))}
      </div>

      <EditorialLookbook config={config} />

      {cart.length > 0 ? (
        <div className="bg-[#fbf5ec] pb-16 text-center">
          <p className="text-[12px] tracking-[0.04em] text-[#8b6c4a]">
            {cart.length} {cart.length === 1 ? "pieza reservada" : "piezas reservadas"}
          </p>
          <a
            href={whatsappCartUrl(config, cart)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-[#1c1612] px-8 py-3 text-[11px] tracking-[0.06em] text-[#fbf5ec] hover:bg-[#2b2218]"
          >
            Cerrar reserva por WhatsApp
          </a>
        </div>
      ) : null}

      <EditorialBoutique config={config} />

      <DemoLeadForm
        slug={slug}
        brandLabel={config.brand}
        kicker="Consultá esta demo"
        title="Editorial para tu marca."
        sub="Adaptamos voz, fotografía y narrativa de temporada con tu identidad."
        theme={{
          section: "bg-[#1c1612] text-[#fbf5ec]",
          invert: false,
          label: "text-[11px] tracking-[0.06em] text-[#c1a986]",
          input:
            "mt-2 w-full border-0 border-b border-white/20 bg-transparent px-0 py-3 text-[14px] text-[#fbf5ec] outline-none",
          focus: "focus:border-[#e9d9c4]",
          card: "border border-white/10 bg-[#241a13] p-8 md:p-10",
          button:
            "bg-[#e9d9c4] px-6 py-3 text-[11px] tracking-[0.06em] text-[#1c1612] hover:bg-[#f3e7d6]",
        }}
      />

      <footer className="border-t border-[#1c1612]/10 bg-[#fbf5ec] py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 md:flex-row md:items-center">
          <span className="font-serif text-[18px] italic text-[#1c1612]">{config.brand}</span>
          <span className="text-[11px] text-[#8b6c4a]">© 2026 · {config.footerLocation}</span>
        </div>
      </footer>

      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center bg-[#1c1612] text-[#fbf5ec] shadow-md transition-transform hover:scale-[1.03]"
        aria-label={`WhatsApp ${config.brand}`}
      >
        <MessageCircle className="h-5 w-5" strokeWidth={1.25} />
      </a>
    </div>
  );
}
