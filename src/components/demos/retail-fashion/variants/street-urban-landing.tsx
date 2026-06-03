"use client";

/**
 * Variant C — Street / Urban.
 *
 * Visual identity:
 * - Heavy condensed sans-serif (oswald-style), not necessarily ALL-CAPS.
 * - Strong color blocks (electric yellow accent on near-black canvas).
 * - Split hero with "DROP 03" type-block + product cutout.
 * - Sticky drop counter; product grid with hover-reveal stock count.
 * - ONE marquee max, at bottom. Snappy hovers, ui transitions.
 */

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
import { DemoLeadForm } from "../../demo-lead-form";
import { FashionPhoto } from "../fashion-photo";

type Props = { slug: string };

/** Stable pseudo-random stock per product (no Math.random in render). */
function stockOf(productId: number): number {
  // Range 2..14
  return 2 + ((productId * 7919) % 13);
}

/** Countdown to "next drop" — fixed offset so we never trigger hydration churn. */
function useDropCountdown(): { dd: string; hh: string; mm: string } {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000 * 30);
    return () => window.clearInterval(id);
  }, []);

  if (!now) return { dd: "--", hh: "--", mm: "--" };

  // Next drop is 7 days from first render (rounded to midnight) — purely visual.
  const dropAt = new Date(now);
  dropAt.setDate(dropAt.getDate() + 7);
  dropAt.setHours(0, 0, 0, 0);
  const ms = Math.max(0, dropAt.getTime() - now.getTime());
  const dd = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hh = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mm = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  return {
    dd: String(dd).padStart(2, "0"),
    hh: String(hh).padStart(2, "0"),
    mm: String(mm).padStart(2, "0"),
  };
}

function StreetNav({ brand }: { brand: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#f6f55a]/30 bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/demos" className="text-[11px] tracking-[0.05em] text-zinc-400 hover:text-[#f6f55a]">
          ← Volver
        </Link>
        <span className="font-sans text-[18px] font-bold tracking-[-0.01em] text-white">
          {brand}
        </span>
        <span className="hidden text-[11px] tracking-[0.05em] text-[#f6f55a] md:inline">
          Drop 03
        </span>
      </div>
    </header>
  );
}

function StreetDropTicker({ countdown }: { countdown: { dd: string; hh: string; mm: string } }) {
  return (
    <div className="sticky top-[57px] z-30 border-b border-[#f6f55a]/40 bg-[#f6f55a] text-[#0a0a0a]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2 text-[11px] tracking-[0.05em]">
        <span className="font-bold">Próximo drop</span>
        <span className="font-mono">
          {countdown.dd}d : {countdown.hh}h : {countdown.mm}m
        </span>
      </div>
    </div>
  );
}

function StreetHero({ config }: { config: RetailFashionConfig }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] pb-20 pt-32 md:pb-28 md:pt-36">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-end gap-12 px-5 md:grid-cols-12 md:gap-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-7"
        >
          <p className="mb-4 inline-block bg-[#f6f55a] px-2 py-1 text-[10px] font-bold tracking-[0.05em] text-[#0a0a0a]">
            DROP 03 · {config.seasonBadge}
          </p>
          <h1 className="font-sans text-[clamp(3.5rem,12vw,9rem)] font-black uppercase leading-[0.85] tracking-[-0.03em] text-white">
            {config.heroTitle}
            <br />
            <span className="text-[#f6f55a]">{config.heroHighlight}</span>
          </h1>
          <p className="mt-8 max-w-md text-[14px] leading-[1.6] text-zinc-400">
            Última colección. Stock limitado. Sin floreos. {config.tagline}.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#drop"
              className="inline-flex items-center gap-2 bg-[#f6f55a] px-6 py-3 text-[12px] font-bold tracking-[0.04em] text-[#0a0a0a] transition-transform hover:scale-[1.02]"
            >
              Ver drop <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={whatsappGeneralUrl(config)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-[12px] font-bold tracking-[0.04em] text-white hover:border-[#f6f55a] hover:text-[#f6f55a]"
            >
              Reservar
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, x: 24, rotate: 3 }}
          animate={{ opacity: 1, x: 0, rotate: 2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5"
        >
          <div className="relative ml-auto w-full max-w-md">
            <div className="absolute inset-0 -translate-x-3 translate-y-3 bg-[#f6f55a]" aria-hidden />
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
              <FashionPhoto
                src={config.heroImage}
                alt={`${config.brand} drop`}
                fill
                priority
                className="object-cover"
                sizes="(max-width:768px) 100vw, 40vw"
              />
            </div>
            <span className="absolute -top-3 right-3 rotate-3 bg-white px-3 py-1 text-[10px] font-bold tracking-[0.05em] text-[#0a0a0a]">
              N°{(config.products[0]?.id ?? 1).toString().padStart(2, "0")}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StreetProductCard({
  product,
  config,
  onAdd,
}: {
  product: RetailFashionProduct;
  config: RetailFashionConfig;
  onAdd: (p: RetailFashionProduct) => void;
}) {
  const stock = stockOf(product.id);
  const low = stock <= 4;
  return (
    <article className="group relative overflow-hidden border border-white/10 bg-[#111]">
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
        <FashionPhoto
          src={product.image}
          fallbackSrc={product.fallbackImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          sizes="(max-width:768px) 50vw, 33vw"
        />
        <span
          className={`absolute left-3 top-3 px-2 py-0.5 text-[10px] font-bold tracking-[0.05em] ${
            low ? "bg-[#ff4d4d] text-white" : "bg-[#f6f55a] text-[#0a0a0a]"
          }`}
        >
          {low ? `Quedan ${stock}` : `Stock ${stock}`}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-[14px] font-bold uppercase tracking-[-0.01em] text-white">
          {product.name}
        </h3>
        <p className="mt-1 text-[12px] text-zinc-400">{product.price}</p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onAdd(product)}
            className="flex-1 bg-[#f6f55a] px-3 py-2 text-[11px] font-bold tracking-[0.04em] text-[#0a0a0a] transition-transform hover:scale-[1.01]"
          >
            Agregar
          </button>
          <a
            href={whatsappProductUrl(config, product)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center border border-white/20 px-3 py-2 text-[11px] font-bold tracking-[0.04em] text-white hover:border-[#f6f55a] hover:text-[#f6f55a]"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

function StreetDrop({
  config,
  cart,
  onAdd,
}: {
  config: RetailFashionConfig;
  cart: RetailFashionProduct[];
  onAdd: (p: RetailFashionProduct) => void;
}) {
  return (
    <section id="drop" className="bg-[#0a0a0a] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-[11px] tracking-[0.06em] text-[#f6f55a]">Drop 03</p>
            <h2 className="mt-2 font-sans text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.9] tracking-[-0.02em] text-white">
              {config.collectionTitle}
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-[1.5] text-zinc-400">
            {config.collectionSubtitle} · Stock real, no se repone.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {config.products.map((p) => (
            <StreetProductCard key={p.id} product={p} config={config} onAdd={onAdd} />
          ))}
        </div>

        {cart.length > 0 ? (
          <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-center">
            <span className="text-[11px] tracking-[0.05em] text-zinc-400">
              {cart.length} piezas en tu bolsa
            </span>
            <a
              href={whatsappCartUrl(config, cart)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#f6f55a] px-7 py-3 text-[12px] font-bold tracking-[0.04em] text-[#0a0a0a] hover:scale-[1.02]"
            >
              Reservar drop por WhatsApp
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function StreetMarquee({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden border-y border-white/10 bg-[#f6f55a] py-3 text-[#0a0a0a]">
      <div className="flex animate-[rf-marquee_18s_linear_infinite] whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
            {items.map((label) => (
              <span
                key={`${dup}-${label}`}
                className="mx-8 inline-flex items-center text-[12px] font-bold tracking-[0.06em]"
              >
                {label} <span className="ml-8 text-[#0a0a0a]/40">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function StreetFooter({ config }: { config: RetailFashionConfig }) {
  return (
    <footer className="bg-[#0a0a0a] py-12 text-zinc-400">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 md:grid-cols-3">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.05em] text-white">
            {config.brand}
          </p>
          <p className="mt-2 text-[12px] leading-[1.6]">{config.tagline}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#f6f55a]">
            Local
          </p>
          <p className="mt-2 text-[12px] leading-[1.6]">
            {config.addressLines.join(" · ")}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#f6f55a]">
            Online
          </p>
          <p className="mt-2 text-[12px] leading-[1.6]">
            @{config.instagramHandle}
            <br />© 2026 · {config.footerLocation}
          </p>
        </div>
      </div>
    </footer>
  );
}

export function StreetUrbanLanding({ slug }: Props) {
  const config = getRetailFashionConfig(slug);
  const [cart, setCart] = useState<RetailFashionProduct[]>([]);
  const countdown = useDropCountdown();
  const wa = useMemo(() => (config ? whatsappGeneralUrl(config) : "#"), [config]);

  const onAdd = (p: RetailFashionProduct) => {
    setCart((prev) => (prev.some((x) => x.id === p.id) ? prev : [...prev, p]));
  };

  if (!config) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-white antialiased">
      <StreetNav brand={config.brand} />
      <StreetDropTicker countdown={countdown} />
      <StreetHero config={config} />
      <StreetDrop config={config} cart={cart} onAdd={onAdd} />

      <DemoLeadForm
        slug={slug}
        brandLabel={config.brand}
        kicker="Consultá esta demo"
        title="¿Sumás drops a tu marca?"
        sub="Drops, contador y stock real conectados a WhatsApp. Sin templates."
        theme={{
          section: "bg-[#0a0a0a] text-white",
          invert: false,
          label: "text-[11px] font-bold tracking-[0.05em] text-[#f6f55a]",
          input:
            "mt-2 w-full border-0 border-b border-white/20 bg-transparent px-0 py-3 text-[14px] text-white outline-none",
          focus: "focus:border-[#f6f55a]",
          card: "border border-white/10 bg-[#111] p-8 md:p-10",
          button:
            "bg-[#f6f55a] px-6 py-3 text-[11px] font-bold tracking-[0.04em] text-[#0a0a0a] hover:bg-[#fffd6e]",
        }}
      />

      <StreetMarquee items={config.marqueeItems} />
      <StreetFooter config={config} />

      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center bg-[#f6f55a] text-[#0a0a0a] shadow-md transition-transform hover:scale-[1.05]"
        aria-label={`WhatsApp ${config.brand}`}
      >
        <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
      </a>
    </div>
  );
}
