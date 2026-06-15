"use client";

/**
 * Variant A — Nordic Minimal.
 *
 * Visual identity:
 * - Sans-serif display (Plus Jakarta tier), no serif H1.
 * - Whitespace-led, b/w + 1 muted sage accent.
 * - Text-only hero. No marquees. Single fade-up on enter.
 * - Asymmetric 2-col product grid (alternating 4:5 / 3:4 ratios).
 * - Editorial quote block instead of "Découvrir" French chrome.
 */

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
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
import { DemoLeadForm } from "../../demo-lead-form";
import { FashionPhoto } from "../fashion-photo";
import { ScrollReveal } from "@/components/primitives";

type Props = { slug: string };

const FADE_TRANSITION = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

function NordicNav({ brand }: { brand: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#e3e1dc] bg-[#f6f4ef]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className="text-[13px] font-medium tracking-[0.04em] text-[#1a1a1a]">
          {brand}
        </span>
        <nav className="hidden gap-9 text-[12px] text-[#5b5a55] md:flex">
          <a href="#objetos" className="hover:text-[#1a1a1a]">Objetos</a>
          <a href="#editorial" className="hover:text-[#1a1a1a]">Editorial</a>
          <a href="#tienda" className="hover:text-[#1a1a1a]">Tienda</a>
          <a href="#estudio" className="hover:text-[#1a1a1a]">Estudio</a>
        </nav>
        <Link
          href="/demos"
          className="text-[12px] text-[#5b5a55] underline-offset-4 hover:text-[#1a1a1a] hover:underline"
        >
          Volver
        </Link>
      </div>
    </header>
  );
}

function NordicHero({ config }: { config: RetailFashionConfig }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative bg-[#f6f4ef] pb-28 pt-40 md:pb-36 md:pt-48">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={FADE_TRANSITION}
          className="grid grid-cols-1 gap-12 md:grid-cols-12"
        >
          <div className="md:col-span-8">
            <p className="mb-8 text-[11px] tracking-[0.08em] text-[#7d8475]">
              {config.heroKicker}
            </p>
            <h1 className="text-[clamp(2.5rem,6vw,4.75rem)] font-light leading-[1.05] tracking-[-0.025em] text-[#1a1a1a]">
              {config.heroTitle}{" "}
              <span className="text-[#7d8475]">{config.heroHighlight}</span>
            </h1>
            <p className="mt-10 max-w-md text-[15px] leading-[1.7] text-[#5b5a55]">
              {config.tagline}. {config.collectionSubtitle}
            </p>
          </div>
          <div className="md:col-span-4 md:pt-2">
            <div className="flex items-center justify-between border-t border-[#1a1a1a]/15 pt-4 md:flex-col md:items-end md:gap-6">
              <span className="text-[11px] tracking-[0.06em] text-[#5b5a55]">
                ({config.monogram})
              </span>
              <span className="text-[11px] tracking-[0.06em] text-[#5b5a55]">
                {config.seasonBadge}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function NordicQuote({ config }: { config: RetailFashionConfig }) {
  return (
    <section id="editorial" className="border-y border-[#e3e1dc] bg-[#fbf9f5] py-24 md:py-32">
      <ScrollReveal className="mx-auto max-w-3xl px-6 text-left">
        <p className="text-[11px] tracking-[0.08em] text-[#7d8475]">Nota del estudio</p>
        <p className="mt-6 text-[clamp(1.5rem,2.6vw,2.25rem)] font-light leading-[1.4] tracking-[-0.01em] text-[#1a1a1a]">
          "{config.collectionTitle}. {config.collectionSubtitle}. Cada pieza, una pausa."
        </p>
        <p className="mt-8 text-[12px] tracking-[0.04em] text-[#5b5a55]">
          — Atelier {config.brand}
        </p>
      </ScrollReveal>
    </section>
  );
}

function NordicProductCard({
  product,
  ratio,
  config,
  onAdd,
}: {
  product: RetailFashionProduct;
  ratio: "4/5" | "3/4";
  config: RetailFashionConfig;
  onAdd: (p: RetailFashionProduct) => void;
}) {
  return (
    <article className="group">
      <div
        className="relative w-full overflow-hidden bg-[#ece9e2]"
        style={{ aspectRatio: ratio }}
      >
        <FashionPhoto
          src={product.image}
          fallbackSrc={product.fallbackImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.02]"
          sizes="(max-width:768px) 100vw, 50vw"
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="text-[15px] font-medium leading-tight text-[#1a1a1a]">
            {product.name}
          </h3>
          <p className="mt-1 text-[12px] text-[#7d8475]">{product.price}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onAdd(product)}
            className="text-[11px] tracking-[0.06em] text-[#1a1a1a] underline-offset-4 hover:underline"
          >
            Agregar
          </button>
          <span className="h-3 w-px bg-[#1a1a1a]/15" aria-hidden />
          <a
            href={whatsappProductUrl(config, product)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[0.06em] text-[#7d8475] underline-offset-4 hover:text-[#1a1a1a] hover:underline"
          >
            Consultar
          </a>
        </div>
      </div>
    </article>
  );
}

function NordicShop({
  config,
  cart,
  onAdd,
}: {
  config: RetailFashionConfig;
  cart: RetailFashionProduct[];
  onAdd: (p: RetailFashionProduct) => void;
}) {
  return (
    <section id="objetos" className="bg-[#f6f4ef] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] tracking-[0.08em] text-[#7d8475]">Objetos</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] font-light tracking-[-0.02em] text-[#1a1a1a]">
              Piezas para usar cada día.
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-[1.7] text-[#5b5a55]">
            {config.shopSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
          {config.products.map((product, i) => (
            <NordicProductCard
              key={product.id}
              product={product}
              ratio={i % 2 === 0 ? "4/5" : "3/4"}
              config={config}
              onAdd={onAdd}
            />
          ))}
        </div>

        {cart.length > 0 ? (
          <div className="mt-16 border-t border-[#1a1a1a]/15 pt-8 text-center">
            <p className="text-[12px] tracking-[0.04em] text-[#5b5a55]">
              {cart.length} {cart.length === 1 ? "pieza" : "piezas"} en tu selección
            </p>
            <a
              href={whatsappCartUrl(config, cart)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block border border-[#1a1a1a] px-8 py-3 text-[12px] tracking-[0.06em] text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-[#f6f4ef]"
            >
              Cerrar selección por WhatsApp
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function NordicStudio({ config }: { config: RetailFashionConfig }) {
  return (
    <section id="estudio" className="bg-[#1a1a1a] py-24 text-[#f6f4ef] md:py-32">
      <ScrollReveal className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2">
        <div>
          <p className="text-[11px] tracking-[0.08em] text-[#9aa093]">Estudio</p>
          <h3 className="mt-3 text-[clamp(1.5rem,2.6vw,2.25rem)] font-light leading-tight tracking-[-0.02em]">
            Cita previa.<br />Sin apuro.
          </h3>
          <p className="mt-6 text-[14px] leading-[1.7] text-[#c9cdc4]">
            {config.addressLines.join(" · ")}
          </p>
          <div className="mt-10 flex gap-4">
            <a
              href={whatsappGeneralUrl(config)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#f6f4ef] px-6 py-3 text-[11px] tracking-[0.08em] text-[#f6f4ef] transition-colors hover:bg-[#f6f4ef] hover:text-[#1a1a1a]"
            >
              Reservar visita
            </a>
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-2 py-3 text-[11px] tracking-[0.08em] text-[#c9cdc4] hover:text-[#f6f4ef]"
            >
              @{config.instagramHandle}
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <FashionPhoto
            src={config.heroImage}
            alt={`Estudio ${config.brand}`}
            fill
            className="object-cover grayscale"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </div>
      </ScrollReveal>
    </section>
  );
}

function NordicFooter({ config }: { config: RetailFashionConfig }) {
  return (
    <footer className="border-t border-[#e3e1dc] bg-[#f6f4ef] py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 md:flex-row md:items-center">
        <span className="text-[12px] tracking-[0.04em] text-[#1a1a1a]">{config.brand}</span>
        <span className="text-[11px] text-[#7d8475]">© 2026 · {config.footerLocation}</span>
      </div>
    </footer>
  );
}

export function NordicMinimalLanding({ slug }: Props) {
  const config = getRetailFashionConfig(slug);
  const [cart, setCart] = useState<RetailFashionProduct[]>([]);

  const onAdd = (p: RetailFashionProduct) => {
    setCart((prev) => (prev.some((x) => x.id === p.id) ? prev : [...prev, p]));
  };

  const wa = useMemo(() => (config ? whatsappGeneralUrl(config) : "#"), [config]);

  if (!config) return null;

  return (
    <div className="min-h-screen bg-[#f6f4ef] font-sans text-[#1a1a1a] antialiased">
      <NordicNav brand={config.brand} />
      <NordicHero config={config} />
      <NordicQuote config={config} />
      <div id="tienda">
        <NordicShop config={config} cart={cart} onAdd={onAdd} />
      </div>
      <NordicStudio config={config} />

      <DemoLeadForm
        slug={slug}
        brandLabel={config.brand}
        kicker="Consultá esta demo"
        title="Misma estética para tu boutique."
        sub="Adaptamos marca, fotos, Instagram y WhatsApp con respeto por la quietud."
        theme={{
          section: "bg-[#fbf9f5] text-[#1a1a1a]",
          invert: true,
          label: "text-[11px] tracking-[0.06em] text-[#7d8475]",
          input:
            "mt-2 w-full border-0 border-b border-[#1a1a1a]/15 bg-transparent px-0 py-3 text-[14px] text-[#1a1a1a] outline-none",
          focus: "focus:border-[#1a1a1a]",
          card: "border border-[#e3e1dc] bg-[#f6f4ef] p-8 md:p-10",
          button:
            "bg-[#1a1a1a] px-6 py-3 text-[11px] tracking-[0.06em] text-[#f6f4ef] hover:bg-[#2a2a2a]",
        }}
      />

      <NordicFooter config={config} />

      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center bg-[#1a1a1a] text-[#f6f4ef] shadow-md transition-transform hover:scale-[1.03]"
        aria-label={`WhatsApp ${config.brand}`}
      >
        <MessageCircle className="h-5 w-5" strokeWidth={1.25} />
      </a>
    </div>
  );
}
