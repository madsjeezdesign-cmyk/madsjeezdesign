"use client";

/**
 * RETAIL GRID — archetype shell for real product-first retail.
 * Slugs: ropa, bazar, computacion, celulares, barberia.
 * Vibe: e-commerce snappy. Split hero with product grid. Asymmetric featured collection.
 */

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { ShoppingBag, Plus, Heart, Search } from "lucide-react";
import { getCommerceConfig } from "@/lib/commerce-demos";
import { getDemoVisuals } from "@/lib/demo-assets";
import { useMotionTransition } from "@/lib/motion";
import { DemoLeadForm } from "../demo-lead-form";

type Props = { slug: string };

/** Per-slug product seed — real-feel SKUs for the hero grid. */
const RETAIL_SEED: Record<
  string,
  { hero: string; cta: string; products: { name: string; price: string; tag: string }[] }
> = {
  ropa: {
    hero: "Lo último de la temporada.",
    cta: "Comprar ahora",
    products: [
      { name: "Camisa lino oversize", price: "$48.900", tag: "Nuevo" },
      { name: "Pantalón cargo recto", price: "$62.500", tag: "Best seller" },
      { name: "Vestido midi tencel", price: "$74.000", tag: "Edición" },
      { name: "Buzo wash naranja", price: "$54.200", tag: "Drop 03" },
    ],
  },
  bazar: {
    hero: "Tu casa, mejor servida.",
    cta: "Ver colección",
    products: [
      { name: "Set copas vino artesanal x6", price: "$38.900", tag: "Cocina" },
      { name: "Cesto fibra natural L", price: "$24.500", tag: "Decoración" },
      { name: "Vajilla porcelana x12", price: "$148.000", tag: "Premium" },
      { name: "Lámpara linen kraft", price: "$67.000", tag: "Hogar" },
    ],
  },
  computacion: {
    hero: "Armá tu setup. Sin vueltas.",
    cta: "Configurar PC",
    products: [
      { name: "RTX 4070 Super 12GB", price: "$1.149.000", tag: "Gaming" },
      { name: "Ryzen 7 7700X", price: "$489.500", tag: "CPU" },
      { name: "Monitor 27\" 165Hz", price: "$395.000", tag: "Display" },
      { name: "Teclado mecánico K2", price: "$148.900", tag: "Periférico" },
    ],
  },
  celulares: {
    hero: "Modelos al día. Garantía oficial.",
    cta: "Ver catálogo",
    products: [
      { name: "iPhone 15 128GB", price: "$1.589.000", tag: "Apple" },
      { name: "Galaxy S24 256GB", price: "$1.279.000", tag: "Samsung" },
      { name: "Xiaomi 14T 256GB", price: "$789.000", tag: "Best price" },
      { name: "Pixel 8a 128GB", price: "$649.000", tag: "Google" },
    ],
  },
  barberia: {
    hero: "Tu corte. Tu estilo.",
    cta: "Reservar turno",
    products: [
      { name: "Pomada matte 100ml", price: "$14.500", tag: "Grooming" },
      { name: "Aceite barba clásico", price: "$11.900", tag: "Cuidado" },
      { name: "Champú anticaspa", price: "$9.800", tag: "Hair" },
      { name: "Kit afeitado completo", price: "$48.000", tag: "Premium" },
    ],
  },
};

export function RetailGridLanding({ slug }: Props) {
  const config = getCommerceConfig(slug);
  const v = config ? getDemoVisuals(slug) : null;
  const tSnap = useMotionTransition("snap");
  const tUi = useMotionTransition("ui");
  const tDisp = useMotionTransition("display");
  const [activeCat, setActiveCat] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const seed = RETAIL_SEED[slug] ?? {
    hero: "Lo último, acá.",
    cta: "Ver tienda",
    products: [
      { name: "Producto 1", price: "$9.900", tag: "Nuevo" },
      { name: "Producto 2", price: "$14.500", tag: "Best" },
      { name: "Producto 3", price: "$19.900", tag: "Drop" },
      { name: "Producto 4", price: "$24.500", tag: "Edición" },
    ],
  };

  if (!config || !v) return null;

  const accent = config.accent;

  return (
    <div
      className="relative min-h-screen bg-[#0d0d0d] font-[family-name:var(--font-demo-b-commerce)] text-[#fafafa] antialiased"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      {/* HEADER — clean retail nav with cart */}
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0d0d0d]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-8">
            <span className="font-[family-name:var(--font-demo-h-commerce)] text-xl font-medium tracking-tight text-white">
              {config.brand}
            </span>
            <nav className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
              {config.categories.slice(0, 4).map((cat) => (
                <a key={cat} href="#catalogo" className="hover:text-white">{cat}</a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="rounded-full border border-white/10 p-2 text-white/70 hover:text-white">
              <Search className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="relative inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-white/80 hover:text-white"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden md:inline">Carrito</span>
              {cartCount > 0 ? (
                <span
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-[#0d0d0d]"
                  style={{ background: accent }}
                >
                  {cartCount}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      {/* HERO — split: brand left, product peek right */}
      <section className="px-5 pb-12 pt-12 md:px-8 md:pb-16 md:pt-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tDisp}
          >
            <p className="text-xs text-white/50">{config.tradeLabel}</p>
            <h1 className="mt-5 font-[family-name:var(--font-demo-h-commerce)] text-5xl font-medium leading-[1.02] tracking-tight text-white md:text-7xl">
              {seed.hero}
            </h1>
            <p className="mt-6 max-w-md text-base text-white/65">{config.heroSub}</p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="#catalogo"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-[#0d0d0d] transition-transform hover:scale-[1.02]"
                style={{ background: accent }}
              >
                {seed.cta}
              </a>
              <a
                href="#colecciones"
                className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/85 hover:border-white"
              >
                Lo nuevo
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {seed.products.slice(0, 4).map((p, i) => (
              <motion.button
                key={p.name}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...tDisp, delay: 0.08 + i * 0.06 }}
                onClick={() => setCartCount((c) => c + 1)}
                className="group relative overflow-hidden rounded-sm border border-white/10 bg-[#161616] text-left transition-colors hover:border-white/30"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={[v.cover, v.a, v.b, v.c][i % 4]!}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <span
                    className="absolute left-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-medium text-[#0d0d0d]"
                    style={{ background: accent }}
                  >
                    {p.tag}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3 p-3.5">
                  <div>
                    <p className="text-xs leading-tight text-white">{p.name}</p>
                    <p className="mt-1 text-sm font-medium text-white">{p.price}</p>
                  </div>
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors group-hover:border-white group-hover:text-white"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* LO NUEVO — rotating strip */}
      <section id="colecciones" className="border-y border-white/8 bg-[#101010] py-8">
        <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-5 md:px-8">
          <p className="shrink-0 text-xs text-white/50">Lo nuevo →</p>
          {config.features.map((f) => (
            <span key={f} className="shrink-0 text-sm text-white/75">
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* CATEGORY NAV — sticky pill row */}
      <section id="catalogo" className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-[family-name:var(--font-demo-h-commerce)] text-3xl font-medium tracking-tight md:text-5xl">
              Catálogo
            </h2>
            <p className="hidden text-xs text-white/50 md:block">
              {seed.products.length * 8} productos · stock en vivo
            </p>
          </div>
          <div className="-mx-1 mb-8 flex gap-2 overflow-x-auto px-1 pb-1">
            {config.categories.map((cat, i) => {
              const active = activeCat === i;
              return (
                <motion.button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCat(i)}
                  transition={tSnap}
                  className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                    active ? "border-white bg-white text-[#0d0d0d]" : "border-white/15 text-white/75 hover:border-white/40"
                  }`}
                >
                  {cat}
                </motion.button>
              );
            })}
          </div>

          {/* FEATURED COLLECTION — asymmetric 1-2-1 grid */}
          <motion.div
            key={activeCat}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={tUi}
            className="grid gap-4 md:grid-cols-4 md:grid-rows-2"
          >
            <article className="relative overflow-hidden rounded-sm border border-white/10 bg-[#161616] md:col-span-2 md:row-span-2">
              <div className="relative aspect-[4/5] md:aspect-auto md:h-full">
                <Image src={v.cover} alt={seed.products[0]!.name} fill className="object-cover" sizes="50vw" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/85 to-transparent p-5">
                <div>
                  <p className="text-xs text-white/70">{seed.products[0]!.tag}</p>
                  <p className="mt-1 text-xl font-medium text-white">{seed.products[0]!.name}</p>
                  <p className="mt-1 text-sm text-white">{seed.products[0]!.price}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setCartCount((c) => c + 1)}
                  className="rounded-full px-4 py-2 text-xs font-medium text-[#0d0d0d]"
                  style={{ background: accent }}
                >
                  Agregar
                </button>
              </div>
            </article>

            {seed.products.slice(1).map((p, i) => (
              <article
                key={p.name}
                className="group relative overflow-hidden rounded-sm border border-white/10 bg-[#161616] transition-colors hover:border-white/30"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={[v.a, v.b, v.c][i]!}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="25vw"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white/85 hover:text-white"
                    aria-label="Favorito"
                  >
                    <Heart className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="flex items-start justify-between gap-2 p-3.5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.04em] text-white/45">{p.tag}</p>
                    <p className="mt-1 text-sm leading-tight text-white">{p.name}</p>
                    <p className="mt-1 text-sm font-medium text-white">{p.price}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCartCount((c) => c + 1)}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-white hover:text-white"
                    aria-label="Agregar al carrito"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS — small chips */}
      <section className="border-y border-white/8 bg-[#0a0a0a] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs text-white/50">Compran y vuelven</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              "Llegó en 24 h. Calidad real.",
              "Lo mejor en relación precio-calidad.",
              "El sitio carga rapidísimo.",
              "Atención impecable por WhatsApp.",
              "Cambio sin problema.",
            ].map((quote) => (
              <span key={quote} className="rounded-full border border-white/12 bg-[#141414] px-4 py-2 text-xs text-white/80">
                "{quote}"
              </span>
            ))}
          </div>
        </div>
      </section>

      <div id="contacto">
        <DemoLeadForm
          slug={slug}
          brandLabel={`${config.brand} · ${config.tradeLabel}`}
          theme={v.lead}
          kicker="Tienda online"
          title="Te respondemos por WhatsApp"
          sub="Consultas de stock, talles y envíos."
        />
      </div>

      <footer className="border-t border-white/8 px-5 py-10 text-center text-xs text-white/45 md:px-8">
        © {new Date().getFullYear()} {config.brand} · {config.tradeLabel}
      </footer>
    </div>
  );
}
