"use client";

/**
 * ROPA — editorial e-commerce override.
 *
 * Identity: dark base #0e0e0f with cream #f3ede0 typographic accents and a
 * single muted blush hover. Italian serif (Instrument Serif) brand mark + sans
 * for body. Asymmetric hero: serif brand mark + season note left, large 4:5
 * portrait right. Lookbook = 4 large editorial photos (NOT thumbnails).
 * Product grid as 1 large featured + 2 medium pattern (NOT 3-col uniform).
 * Mock cart drawer. NO ALL-CAPS eyebrows beyond minimum.
 *
 * Voice: editorial sin clichés. "Colección invierno. Hecha en Buenos Aires."
 */

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from "lucide-react";
import { useMotionTransition } from "@/lib/motion";

const INK = "#0e0e0f";
const CREAM = "#f3ede0";
const PAPER = "#f8f5ed";
const MUTED = "#9a948a";
const BLUSH = "#b4715b";

const HERO_IMG =
  "https://images.unsplash.com/photo-1485518882345-15568b007407?auto=format&fit=crop&w=1600&q=80";

const LOOKBOOK = [
  {
    src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=80",
    title: "Look 01",
    note: "Abrigo paño negro, sweater de lana, pantalón sastre",
  },
  {
    src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80",
    title: "Look 02",
    note: "Camisa de algodón pesado, falda midi, botas oxford",
  },
  {
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
    title: "Look 03",
    note: "Trinchera, polera tejida, pantalón ancho",
  },
  {
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=80",
    title: "Look 04",
    note: "Conjunto de punto cardado, accesorios en cuero",
  },
] as const;

const PRODUCTS_FEATURED = {
  id: 1,
  name: "Abrigo paño Vasari",
  price: 198000,
  desc: "Paño doble cara italiano. Forrado en satín de algodón. Costura francesa.",
  img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=80",
};

const PRODUCTS = [
  {
    id: 2,
    name: "Camisa Salvador",
    price: 64000,
    img: "https://images.unsplash.com/photo-1602810316693-3667c854239a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    name: "Pantalón sastre Liébano",
    price: 78500,
    img: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    name: "Sweater Galimberti",
    price: 89000,
    img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    name: "Falda midi Pellegrino",
    price: 72000,
    img: "https://images.unsplash.com/photo-1487744480471-9ca1bca6fb7d?auto=format&fit=crop&w=1000&q=80",
  },
] as const;

type CartItem = { id: number; name: string; price: number; qty: number };

function priceFmt(n: number) {
  return `$${n.toLocaleString("es-AR")}`;
}

export function RopaEditorialOverride() {
  const t = useMotionTransition("display");
  const tUi = useMotionTransition("ui");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  function add(p: { id: number; name: string; price: number }) {
    setCart((prev) => {
      const existing = prev.find((x) => x.id === p.id);
      if (existing) {
        return prev.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x));
      }
      return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1 }];
    });
    setOpen(true);
  }
  function decrement(id: number) {
    setCart((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x)).filter((x) => x.qty > 0),
    );
  }
  function increment(id: number) {
    setCart((prev) => prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)));
  }

  const totalItems = cart.reduce((acc, x) => acc + x.qty, 0);
  const totalPrice = cart.reduce((acc, x) => acc + x.price * x.qty, 0);

  return (
    <div
      className="relative min-h-screen antialiased"
      style={{
        background: INK,
        color: CREAM,
        fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
      }}
    >
      <header
        className="sticky top-0 z-40"
        style={{ background: `${INK}e0`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${CREAM}10` }}
      >
        <div className="mx-auto flex max-w-6xl items-baseline justify-between px-5 py-5 md:px-8">
          <div className="flex items-baseline gap-2">
            <span
              className="text-[1.55rem] leading-none tracking-[0.005em]"
              style={{ fontFamily: "var(--font-instrument), serif", color: CREAM }}
            >
              Casa Liébano
            </span>
            <span className="hidden text-[0.74rem] sm:inline" style={{ color: MUTED }}>
              · est. 2018
            </span>
          </div>
          <nav className="hidden items-center gap-7 text-[0.92rem] md:flex" style={{ color: MUTED }}>
            <a href="#coleccion">Colección</a>
            <a href="#lookbook">Lookbook</a>
            <a href="#tienda">Tienda</a>
            <a href="#showroom">Showroom</a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.86rem] transition-colors"
            style={{ border: `1px solid ${CREAM}33`, color: CREAM }}
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
            Bolsa
            {totalItems > 0 && (
              <span
                className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[0.74rem] font-semibold"
                style={{ background: CREAM, color: INK }}
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      <section className="relative">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-16 md:grid-cols-12 md:gap-14 md:px-8 md:pt-24">
          <motion.div
            className="md:col-span-6 md:pt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t}
          >
            <p className="text-[0.84rem]" style={{ color: MUTED }}>
              Otoño · Invierno 25 — Buenos Aires
            </p>
            <h1
              className="mt-5 leading-[0.92] tracking-[-0.015em]"
              style={{
                fontFamily: "var(--font-instrument), serif",
                fontSize: "clamp(3.2rem, 8vw, 6.4rem)",
                color: CREAM,
              }}
            >
              Colección
              <br />
              <span style={{ fontStyle: "italic" }}>invierno.</span>
              <br />
              Hecha en
              <br />
              <span style={{ color: BLUSH }}>Buenos Aires.</span>
            </h1>
            <p
              className="mt-7 max-w-md text-[1.02rem] leading-relaxed"
              style={{ color: `${CREAM}b3` }}
            >
              Veintidós piezas. Sastrería italiana sobre lana mendocina. Hechas
              de a una, en un taller del Once. Sin temporadas, sin descuentos.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#lookbook"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.96rem] transition-transform hover:scale-[1.01]"
                style={{ background: CREAM, color: INK }}
              >
                Ver lookbook <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#tienda"
                className="text-[0.96rem] underline underline-offset-[6px]"
                style={{ color: CREAM, textDecorationColor: `${CREAM}55` }}
              >
                Comprar la colección
              </a>
            </div>
          </motion.div>
          <motion.div
            className="md:col-span-6"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...t, delay: 0.1 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden" style={{ background: `${CREAM}10` }}>
              <Image
                src={HERO_IMG}
                alt="Lookbook invierno"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <p className="mt-3 text-[0.78rem]" style={{ color: MUTED }}>
              Look principal · campaña otoño-invierno
            </p>
          </motion.div>
        </div>
      </section>

      <section id="lookbook" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[0.84rem]" style={{ color: MUTED }}>
                Lookbook
              </p>
              <h2
                className="mt-2 leading-[1.05]"
                style={{
                  fontFamily: "var(--font-instrument), serif",
                  fontSize: "clamp(2rem, 4.6vw, 3.4rem)",
                  color: CREAM,
                }}
              >
                Cuatro looks. Una idea.
              </h2>
            </div>
            <a
              href="#tienda"
              className="hidden items-center gap-2 text-[0.92rem] md:inline-flex"
              style={{ color: BLUSH }}
            >
              Ver tienda <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-12">
            {LOOKBOOK.map((look, idx) => {
              const isOdd = idx % 2 === 0;
              const colSpan = isOdd
                ? "md:col-span-7"
                : "md:col-span-5 md:col-start-8 md:-mt-32";
              return (
                <motion.figure
                  key={look.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ ...t, delay: idx * 0.06 }}
                  className={colSpan}
                >
                  <div className="relative aspect-[4/5] overflow-hidden" style={{ background: `${CREAM}08` }}>
                    <Image
                      src={look.src}
                      alt={look.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <p
                      className="text-[1.1rem]"
                      style={{ fontFamily: "var(--font-instrument), serif", color: CREAM }}
                    >
                      {look.title}
                    </p>
                    <p className="mt-1 text-[0.88rem]" style={{ color: MUTED }}>
                      {look.note}
                    </p>
                  </figcaption>
                </motion.figure>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="tienda"
        className="py-24 md:py-32"
        style={{
          background: `${CREAM}06`,
          borderTop: `1px solid ${CREAM}10`,
          borderBottom: `1px solid ${CREAM}10`,
        }}
      >
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-2xl">
            <p className="text-[0.84rem]" style={{ color: MUTED }}>
              Tienda
            </p>
            <h2
              className="mt-2 leading-[1.05]"
              style={{
                fontFamily: "var(--font-instrument), serif",
                fontSize: "clamp(2rem, 4.6vw, 3.4rem)",
                color: CREAM,
              }}
            >
              Veintidós piezas en venta.{" "}
              <span style={{ fontStyle: "italic", color: BLUSH }}>
                Las cinco favoritas.
              </span>
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="relative aspect-[4/5] overflow-hidden" style={{ background: `${CREAM}08` }}>
                <Image
                  src={PRODUCTS_FEATURED.img}
                  alt={PRODUCTS_FEATURED.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <p
                    className="text-[1.3rem]"
                    style={{ fontFamily: "var(--font-instrument), serif", color: CREAM }}
                  >
                    {PRODUCTS_FEATURED.name}
                  </p>
                  <p className="mt-2 max-w-md text-[0.94rem]" style={{ color: MUTED }}>
                    {PRODUCTS_FEATURED.desc}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-3">
                  <span className="text-[1.05rem]" style={{ color: CREAM }}>
                    {priceFmt(PRODUCTS_FEATURED.price)}
                  </span>
                  <button
                    type="button"
                    onClick={() => add(PRODUCTS_FEATURED)}
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.86rem]"
                    style={{ background: CREAM, color: INK }}
                  >
                    Sumar <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-8 md:col-span-5">
              {PRODUCTS.slice(0, 2).map((p) => (
                <article key={p.id}>
                  <div className="relative aspect-[4/5] overflow-hidden" style={{ background: `${CREAM}08` }}>
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <p
                      className="text-[1.02rem]"
                      style={{ fontFamily: "var(--font-instrument), serif", color: CREAM }}
                    >
                      {p.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => add(p)}
                      className="text-[0.84rem] underline underline-offset-[5px]"
                      style={{ color: BLUSH, textDecorationColor: `${BLUSH}77` }}
                    >
                      {priceFmt(p.price)}
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="md:col-span-12 grid gap-8 md:grid-cols-2">
              {PRODUCTS.slice(2).map((p) => (
                <article key={p.id}>
                  <div className="relative aspect-[3/2] overflow-hidden" style={{ background: `${CREAM}08` }}>
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <p
                      className="text-[1.02rem]"
                      style={{ fontFamily: "var(--font-instrument), serif", color: CREAM }}
                    >
                      {p.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => add(p)}
                      className="text-[0.84rem] underline underline-offset-[5px]"
                      style={{ color: BLUSH, textDecorationColor: `${BLUSH}77` }}
                    >
                      {priceFmt(p.price)}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="showroom" className="py-24 md:py-32">
        <div className="mx-auto grid max-w-5xl gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <div>
            <p className="text-[0.84rem]" style={{ color: MUTED }}>
              Showroom
            </p>
            <h2
              className="mt-2 leading-[1.05]"
              style={{
                fontFamily: "var(--font-instrument), serif",
                fontSize: "clamp(1.85rem, 4vw, 2.8rem)",
                color: CREAM,
              }}
            >
              Visita con cita.
            </h2>
            <p className="mt-4 text-[1rem]" style={{ color: `${CREAM}b3` }}>
              Once, Buenos Aires. Atendemos con cita los miércoles a viernes
              entre las 14 y las 19. Se prueban todas las piezas antes de
              comprar. Pago con transferencia o crédito.
            </p>
            <a
              href="https://wa.me/5491100000000?text=Hola%20Casa%20Li%C3%A9bano%2C%20quiero%20visitar%20el%20showroom"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-[0.96rem]"
              style={{ color: BLUSH }}
            >
              Pedir cita por WhatsApp <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="space-y-2 text-[0.96rem]" style={{ color: `${CREAM}cc` }}>
            <p>
              <span style={{ color: MUTED }}>Dirección · </span> Pasteur 480, Once
            </p>
            <p>
              <span style={{ color: MUTED }}>Horario · </span> Mié a Vie · 14 a 19 hs
            </p>
            <p>
              <span style={{ color: MUTED }}>WhatsApp · </span> +54 9 11 0000 0000
            </p>
            <p>
              <span style={{ color: MUTED }}>Instagram · </span> @casa.liebano
            </p>
          </div>
        </div>
      </section>

      <footer
        className="py-9 text-center"
        style={{ borderTop: `1px solid ${CREAM}10`, color: `${CREAM}66` }}
      >
        <p className="text-[0.84rem]">© Casa Liébano · Buenos Aires · Demo</p>
      </footer>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar bolsa"
              className="fixed inset-0 z-[60]"
              style={{ background: "rgba(0,0,0,0.55)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={tUi}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col"
              style={{ background: INK, borderLeft: `1px solid ${CREAM}1a` }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ ...tUi, duration: 0.28 }}
            >
              <header
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: `1px solid ${CREAM}14` }}
              >
                <h3
                  className="text-[1.15rem]"
                  style={{ fontFamily: "var(--font-instrument), serif", color: CREAM }}
                >
                  Tu bolsa
                </h3>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar"
                  style={{ color: MUTED }}
                >
                  <X className="h-5 w-5" />
                </button>
              </header>
              <div className="flex-1 overflow-y-auto px-6 py-5">
                {cart.length === 0 ? (
                  <p className="mt-12 text-center text-[0.96rem]" style={{ color: MUTED }}>
                    Tu bolsa está vacía. <br />
                    Empezá por el lookbook.
                  </p>
                ) : (
                  <ul className="space-y-5">
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between gap-4 border-b pb-5"
                        style={{ borderColor: `${CREAM}10` }}
                      >
                        <div className="min-w-0">
                          <p
                            className="text-[0.98rem]"
                            style={{
                              color: CREAM,
                              fontFamily: "var(--font-instrument), serif",
                            }}
                          >
                            {item.name}
                          </p>
                          <p className="text-[0.84rem]" style={{ color: MUTED }}>
                            {priceFmt(item.price)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => decrement(item.id)}
                            className="flex h-7 w-7 items-center justify-center rounded-full"
                            style={{ border: `1px solid ${CREAM}33`, color: CREAM }}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-5 text-center text-[0.92rem]" style={{ color: CREAM }}>
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => increment(item.id)}
                            className="flex h-7 w-7 items-center justify-center rounded-full"
                            style={{ border: `1px solid ${CREAM}33`, color: CREAM }}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <footer
                className="px-6 py-5"
                style={{ borderTop: `1px solid ${CREAM}14`, background: `${PAPER}0a` }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.92rem]" style={{ color: MUTED }}>
                    Total
                  </span>
                  <span
                    className="text-[1.35rem]"
                    style={{ fontFamily: "var(--font-instrument), serif", color: CREAM }}
                  >
                    {priceFmt(totalPrice)}
                  </span>
                </div>
                <button
                  type="button"
                  disabled={cart.length === 0}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[0.95rem] transition-opacity disabled:opacity-40"
                  style={{ background: CREAM, color: INK }}
                >
                  Finalizar compra <ArrowRight className="h-4 w-4" />
                </button>
              </footer>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
