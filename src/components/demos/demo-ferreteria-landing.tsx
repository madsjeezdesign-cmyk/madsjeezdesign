"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  Box,
  Drill,
  Key,
  MessageCircle,
  Paintbrush,
  Plus,
  Trash2,
  X,
  ShoppingCart,
  Monitor,
  Smartphone,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DemoLeadForm } from "./demo-lead-form";
import "./demo-ferreteria-premium.css";

const SLUG = "ferreteria" as const;

type StockLevel = "stock" | "low";

type Product = {
  id: string;
  ref: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: StockLevel;
};

type CartLine = { id: string; name: string; price: number; qty: number };

const PRODUCTS: Omit<Product, "image">[] = [
  {
    id: "mk-2024",
    ref: "REF: MK-2024",
    name: "Taladro percutor Bosch",
    description: "Línea Blue Professional. 750 W con control electrónico de velocidad y maletín.",
    price: 32500,
    stock: "stock",
  },
  {
    id: "al-77",
    ref: "REF: AL-77",
    name: "Alba látex satinado",
    description: "Balde 20 litros. Máxima lavabilidad y acabado sedoso para interiores premium.",
    price: 41200,
    stock: "low",
  },
  {
    id: "st-set",
    ref: "REF: ST-SET",
    name: "Set Stanley Fatmax",
    description: "Juego de 6 destornilladores punta magnética con grip ergonómico de alta fricción.",
    price: 12400,
    stock: "stock",
  },
  {
    id: "wd-40p",
    ref: "REF: WD-40P",
    name: "Pack mantenimiento",
    description: "Incluye WD-40 400 ml + lubricante de cadenas + cepillo de limpieza técnica.",
    price: 8900,
    stock: "stock",
  },
];

const GUIDES = [
  {
    tag: "Guía de 5 minutos",
    title: "Â¿Canilla perdiendo agua?",
    text: "Te enseñamos a cambiar el cuerito paso a paso y qué herramientas necesitás para no romper nada.",
    image: "photo-1584622650111-993a426fbf0a",
  },
  {
    tag: "Técnicas pro",
    title: "Pintá como un profesional",
    text: "El secreto está en la preparación. Descubrí cómo lijar y enduir correctamente antes de abrir el tacho.",
    image: "photo-1562259949-e8e7689d7828",
  },
] as const;

function formatPrice(n: number) {
  return `$${n.toLocaleString("es-AR")}`;
}

export function DemoFerreteriaLanding() {
  const v = getDemoVisuals(SLUG);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [category, setCategory] = useState<"all" | "tools" | "paint">("all");

  const products: Product[] = useMemo(
    () =>
      PRODUCTS.map((p, i) => ({
        ...p,
        image: [v.cover, v.a, v.b, v.c][i] ?? v.cover,
      })),
    [v.a, v.b, v.c, v.cover],
  );

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((s, i) => s + i.price * i.qty, 0),
    [cart],
  );

  const toggleCart = useCallback(() => setCartOpen((o) => !o), []);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const filteredProducts =
    category === "tools"
      ? products.filter((p) => p.id === "mk-2024" || p.id === "st-set" || p.id === "wd-40p")
      : category === "paint"
        ? products.filter((p) => p.id === "al-77")
        : products;

  return (
    <div className="ferre-premium relative min-h-screen overflow-x-hidden bg-[#0a0a0a] font-[family-name:var(--font-demo-b-ferreteria)] text-slate-200 antialiased selection:bg-orange-500/30">
      <div className="ferre-grain" aria-hidden />

      {/* Overlay carrito */}
      <button
        type="button"
        aria-label="Cerrar carrito"
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 z-[150] bg-black/80 backdrop-blur-md transition-opacity duration-500 ${
          cartOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel carrito */}
      <aside
        className={`ferre-cart-panel fixed right-0 top-0 z-[200] flex h-full w-full max-w-md flex-col p-8 md:p-10 ${
          cartOpen ? "is-open" : ""
        }`}
        aria-hidden={!cartOpen}
      >
        <div className="mb-12 flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-demo-h-ferreteria)] text-4xl font-black italic tracking-tighter text-white">
            TU PEDIDO
          </h2>
          <button
            type="button"
            onClick={toggleCart}
            className="flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-white/10"
            aria-label="Cerrar"
          >
            <X className="h-8 w-8" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto pr-2">
          {cart.length === 0 ? (
            <p className="py-20 text-center font-mono text-xs uppercase italic tracking-widest text-zinc-600">
              Esperando materiales...
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-3xl border border-white/5 bg-white/5 p-6"
              >
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-widest text-zinc-300">{item.name}</h5>
                  <p className="font-black italic text-[#ff5e00]">{formatPrice(item.price * item.qty)}</p>
                  <p className="mt-1 text-[9px] font-bold uppercase text-zinc-600">Cant: {item.qty}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="p-3 text-zinc-600 transition-colors hover:text-red-500"
                  aria-label="Quitar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-10 border-t border-white/5 pt-10">
          <div className="mb-8 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Total estimado</span>
            <span className="font-[family-name:var(--font-demo-h-ferreteria)] text-5xl font-black text-white">
              {formatPrice(cartTotal)}
            </span>
          </div>
          <button type="button" className="ferre-btn-premium w-full py-7 text-sm font-black uppercase tracking-[0.2em]">
            Confirmar con el ferretero
          </button>
        </div>
      </aside>

      {/* Nav */}
      <nav className="ferre-glass-nav fixed top-0 z-50 w-full px-4 py-4 md:px-8 md:py-5">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-white shadow-[0_0_20px_rgba(255,94,0,0.5)]">
                <Box className="h-5 w-5" />
              </div>
              <h1 className="font-[family-name:var(--font-demo-h-ferreteria)] text-xl font-black italic tracking-tighter text-white md:text-2xl">
                FDO <span className="text-orange-600">.</span>
              </h1>
            </div>
            <div className="hidden h-6 w-px bg-white/10 xl:block" />
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 xl:block">
              Est. 1984 Â· GBA Sur
            </span>
          </div>

          <div className="hidden items-center gap-8 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 lg:flex">
            <a href="#shop" className="transition-colors hover:text-orange-500">
              Catálogo
            </a>
            <a href="#servicios" className="transition-colors hover:text-orange-500">
              Servicios
            </a>
            <a href="#guias" className="transition-colors hover:text-orange-500">
              Guías DIY
            </a>
            <a href="#contacto-ferre" className="border-b border-orange-500 pb-1 text-white">
              Chat directo
            </a>
          </div>

          <button type="button" onClick={toggleCart} className="group relative">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 transition-all hover:border-orange-500 md:gap-4 md:px-6 md:py-3">
              <ShoppingCart className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-orange-500" />
              <span className="font-mono text-xs font-bold">{cartCount}</span>
            </div>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="overflow-hidden px-4 pb-24 pt-36 md:px-8 md:pb-32 md:pt-48">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-orange-600/20 bg-orange-600/10 px-4 py-2">
                <span className="h-2 w-2 animate-ping rounded-full bg-orange-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">
                  Envíos en el día activos
                </span>
              </div>
              <h2 className="ferre-title-shimmer mb-10 font-[family-name:var(--font-demo-h-ferreteria)] text-5xl font-black italic leading-[0.85] tracking-tighter md:text-7xl lg:text-[7.5rem]">
                CONSTRUÍ
                <br />
                TU <span className="text-orange-600">LEGADO.</span>
              </h2>
              <p className="mb-12 max-w-2xl text-lg font-light leading-relaxed text-zinc-400 md:text-xl">
                Mucho más que una ferretería de barrio. Somos el aliado técnico que tu hogar y tus proyectos
                necesitan. Herramientas premium, asesoramiento honesto y stock real en depósito.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <a
                  href="#shop"
                  className="ferre-btn-premium inline-flex px-10 py-5 text-xs font-black uppercase tracking-widest md:px-12 md:py-6"
                >
                  Explorar catálogo
                </a>
                <div className="flex items-center gap-4 border-l border-white/10 pl-6 md:pl-8">
                  <div>
                    <p className="font-mono text-2xl font-bold">4.9/5</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Google reviews</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative lg:col-span-5">
              <div className="group relative z-10 overflow-hidden rounded-[3rem] border border-white/5 md:rounded-[4rem]">
                <div className="relative aspect-[4/5] min-h-[420px] w-full md:min-h-[650px]">
                  <Image
                    src={v.cover}
                    alt=""
                    fill
                    className="object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                    <p className="font-[family-name:var(--font-demo-h-ferreteria)] text-3xl font-black italic text-white md:text-4xl">
                      EDICIÓNN
                      <br />
                      PROFESIONAL
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="bg-[#0d0d0d] px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-8 md:grid-cols-3">
          {[
            {
              icon: Key,
              title: "Copia de llaves",
              text: "Duplicado computarizado en el acto. Trabajamos con llaves multipunto, doble paleta y de seguridad.",
            },
            {
              icon: Paintbrush,
              title: "Centro de color",
              text: "Sistema tintométrico digital. Creamos el color exacto que buscás en base a una muestra o código.",
            },
            {
              icon: Drill,
              title: "Alquiler de máquinas",
              text: "Rotomartillos, andamios y hormigoneras por día. No compres lo que podés alquilar por un solo uso.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="ferre-info-pill group">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 transition-colors group-hover:bg-orange-600">
                <Icon className="h-7 w-7 text-orange-500 group-hover:text-white" />
              </div>
              <h4 className="mb-4 font-[family-name:var(--font-demo-h-ferreteria)] text-2xl font-bold uppercase text-white">
                {title}
              </h4>
              <p className="text-sm leading-relaxed text-zinc-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="px-4 py-20 md:px-8 md:py-40">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 flex flex-col items-end justify-between gap-8 md:mb-24 md:flex-row">
            <div>
              <h3 className="mb-4 font-[family-name:var(--font-demo-h-ferreteria)] text-4xl font-black uppercase italic tracking-tighter text-white md:text-5xl">
                Stock de alta
                <br />
                performance
              </h3>
              <div className="flex gap-3">
                <div className="h-0.5 w-12 bg-orange-600" />
                <div className="h-0.5 w-4 bg-white/10" />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-widest">
              {(
                [
                  ["all", "Todo"],
                  ["tools", "Maquinaria"],
                  ["paint", "Pinturas"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCategory(key)}
                  className={`rounded-full px-6 py-3 font-bold transition-all md:px-8 ${
                    category === key
                      ? "bg-white text-black"
                      : "border border-white/10 hover:bg-white/5"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 xl:gap-10">
            {filteredProducts.map((product) => (
              <div key={product.id} className="ferre-product-card group flex flex-col p-8 md:p-10">
                <div className="mb-8 flex items-start justify-between">
                  <div
                    className={`flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider ${
                      product.stock === "stock" ? "text-green-500" : "text-orange-500"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        product.stock === "stock" ? "bg-green-500" : "bg-orange-500"
                      }`}
                    />
                    {product.stock === "stock" ? "En stock" : "Últimos 3"}
                  </div>
                  <span className="font-mono text-[10px] text-zinc-600">
                    {product.ref}
                  </span>
                </div>
                <div className="relative mb-8 aspect-square overflow-hidden rounded-[2rem] bg-zinc-900/50">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 90vw, 280px"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <h4 className="mb-4 font-[family-name:var(--font-demo-h-ferreteria)] text-xl font-black uppercase italic text-white md:text-2xl">
                    {product.name}
                  </h4>
                  <p className="mb-8 flex-1 text-xs font-light leading-relaxed text-zinc-500">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-8">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Precio final</p>
                    <p className="font-[family-name:var(--font-demo-h-ferreteria)] text-3xl font-black italic text-white">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black shadow-xl transition-all hover:bg-orange-600 hover:text-white active:scale-95"
                    aria-label={`Agregar ${product.name}`}
                  >
                    <Plus className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guías */}
      <section id="guias" className="border-y border-white/5 bg-[#0a0a0a] px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-12 md:mb-20">
            <h3 className="mb-4 font-[family-name:var(--font-demo-h-ferreteria)] text-4xl font-black uppercase italic text-white">
              Consejos del <span className="text-orange-600">experto</span>
            </h3>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500">
              No solo te vendemos, te enseñamos.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            {GUIDES.map((g, i) => (
              <div
                key={g.title}
                className="flex cursor-pointer flex-col items-center gap-6 rounded-[2rem] border border-white/5 bg-white/5 p-6 transition-all hover:border-orange-600/30 md:flex-row md:rounded-[3rem] md:p-8"
              >
                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-[1.5rem] md:h-40 md:w-40">
                  <Image
                    src={`https://images.unsplash.com/${g.image}?auto=format&fit=crop&w=400&q=80`}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <div>
                  <span className="mb-2 block text-[9px] font-black uppercase tracking-widest text-orange-500">
                    {g.tag}
                  </span>
                  <h5 className="mb-3 text-xl font-black text-white md:text-2xl">{g.title}</h5>
                  <p className="mb-4 text-sm text-zinc-500">{g.text}</p>
                  <span className="text-xs font-bold text-white">Leer guía →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DemoLeadForm
        slug={SLUG}
        brandLabel="Ferretería del Oeste"
        title="Pedido grande o consulta técnica"
        sub="Dejanos tu lista preliminar: un vendedor confirma stock, alternativas de marca y ventana de entrega."
        theme={v.lead}
        kicker="Consultá con el ferretero"
      />

      {/* Footer */}
      <footer className="px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-4 md:gap-20">
          <div className="md:col-span-2">
            <h4 className="mb-8 font-[family-name:var(--font-demo-h-ferreteria)] text-4xl font-black uppercase italic tracking-tighter text-white">
              FDO <span className="text-orange-600">.</span>
            </h4>
            <p className="mb-8 max-w-sm italic leading-relaxed text-zinc-500">
              La ferretería que construyó el barrio desde 1984. Hoy digitalizamos la confianza de siempre para
              llevarte la mejor calidad a tu puerta.
            </p>
            <div className="flex gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                <Monitor className="h-5 w-5" />
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                <Smartphone className="h-5 w-5" />
              </span>
            </div>
          </div>
          <div>
            <h6 className="mb-8 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-white">
              Explorar
            </h6>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
              <li>
                <a href="#shop" className="hover:text-orange-500">
                  Máquinas PRO
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-orange-500">
                  Servicios taller
                </a>
              </li>
              <li>
                <a href="#guias" className="hover:text-orange-500">
                  Guías DIY
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="mb-8 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-white">
              Contacto
            </h6>
            <div className="space-y-4 text-xs font-bold text-zinc-400">
              <p className="flex items-center gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-orange-600" />
                GBA Sur Â· Carlos Spegazzini
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-orange-600" />
                011 4567-8910
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-orange-600" />
                pedidos@ferreteriaoeste.demo
              </p>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-16 max-w-[1600px] border-t border-white/5 pt-8 text-center text-[10px] text-zinc-600">
          Demo visual Â· MadsJeez Design Â·{" "}
          <Link href="/demos" className="text-orange-500/80 hover:text-orange-400">
            Volver al showroom
          </Link>
        </p>
      </footer>

      <a
        href="#contacto-ferre"
        className="fixed bottom-8 right-8 z-[100] flex h-16 w-16 items-center justify-center rounded-[1.5rem] border border-white/10 bg-green-600 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:scale-110 md:bottom-12 md:right-12 md:h-20 md:w-20 md:rounded-[2rem]"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-8 w-8 md:h-10 md:w-10" />
      </a>
    </div>
  );
}

export { DemoFerreteriaLanding as DemoFerreteria };
