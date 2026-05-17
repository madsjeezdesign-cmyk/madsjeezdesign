"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  SHOWROOM_WEEKEND_CONFIG,
  weekendWhatsAppLink,
  type WeekendCartItem,
  type WeekendProduct,
} from "@/lib/showroom-weekend";
import { DemoLeadForm } from "../demo-lead-form";
import { ShowroomWeekendCart, ShowroomWeekendCartButton } from "./showroom-weekend-cart";
import { ShowroomWeekendCatalog } from "./showroom-weekend-catalog";
import { ShowroomWeekendFittingRoom } from "./showroom-weekend-fitting-room";
import { ShowroomWeekendSizeGuide } from "./showroom-weekend-size-guide";
import "./showroom-weekend.css";

const NAV = [
  { label: "Inicio", href: "#inicio" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Probador", href: "#probador" },
  { label: "Ubicación", href: "#showroom" },
];

const FAQ = [
  {
    q: "¿Tienen showroom físico?",
    a: `Sí, en ${SHOWROOM_WEEKEND_CONFIG.addressLines[0]}, Ezeiza. ${SHOWROOM_WEEKEND_CONFIG.hours}.`,
  },
  {
    q: "¿Cómo sé mi talle?",
    a: "Usá el Probador de Talles Virtual: ingresá busto, cintura y cadera en centímetros.",
  },
  {
    q: "¿Hacen envíos?",
    a: "Envíos a todo el país por Correo Argentino. El costo se coordina por WhatsApp al armar el pedido.",
  },
  {
    q: "¿Cupones de descuento?",
    a: "En la bolsa de compras probá WEEKEND10 (10% off) o ENVIOFREE (beneficio envío).",
  },
];

export function ShowroomWeekendLanding() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cfg = SHOWROOM_WEEKEND_CONFIG;
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [sizeFilter, setSizeFilter] = useState("all");
  const [cart, setCart] = useState<WeekendCartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3000);
  }, []);

  const addToCart = useCallback(
    (product: WeekendProduct, size: number) => {
      const key = `${product.id}-${size}`;
      setCart((prev) => {
        const ex = prev.find((i) => i.key === key);
        if (ex) return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + 1 } : i));
        return [...prev, { ...product, key, selectedSize: size, quantity: 1 }];
      });
      notify(`¡Sumado: ${product.name} (talle ${size})! ✨`);
      setCartOpen(true);
    },
    [notify],
  );

  const updateQty = useCallback((key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setCart((prev) => prev.filter((i) => i.key !== key));
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, cartOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("sw-visible")),
      { threshold: 0.08 },
    );
    rootRef.current?.querySelectorAll(".sw-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="sw-demo min-h-screen scroll-smooth bg-slate-950 font-sans text-slate-100 antialiased selection:bg-rose-500 selection:text-white">
      <div className="relative z-40 bg-gradient-to-r from-rose-600 via-pink-500 to-indigo-600 py-2 text-center text-[11px] font-bold uppercase tracking-widest text-white md:text-xs">
        ✦ Probá todo en el local · Paso de la Patria 324, Ezeiza · Talles 44 al 60 ✦
      </div>

      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button type="button" className="md:hidden" onClick={() => setMenuOpen(true)} aria-label="Menú">
            <Menu className="h-6 w-6" />
          </button>
          <a href="#inicio" className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text font-serif text-2xl font-black italic text-transparent">
              {cfg.brand}
            </span>
            <span className="rounded-full border border-rose-500/20 bg-slate-800 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-rose-400">
              {cfg.brandTag}
            </span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-bold text-slate-300 transition-colors hover:text-rose-400">
                {n.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setSizeGuideOpen(true)}
              className="rounded-full border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-xs font-bold text-slate-400 hover:border-rose-500/30 hover:text-rose-400"
            >
              📏 Guía de talles
            </button>
          </nav>
          <ShowroomWeekendCartButton count={cartCount} onClick={() => setCartOpen(true)} />
        </div>
        {menuOpen ? (
          <nav className="border-t border-slate-800 px-6 py-6 md:hidden">
            <button type="button" className="mb-4" onClick={() => setMenuOpen(false)} aria-label="Cerrar">
              <X className="h-6 w-6" />
            </button>
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="block py-2 text-lg font-bold text-slate-200">
                {n.label}
              </a>
            ))}
          </nav>
        ) : null}
      </header>

      <section id="inicio" className="relative flex min-h-[85vh] items-center overflow-hidden pt-12 pb-24">
        <div className="absolute inset-0 sw-grid-bg" />
        <div className="absolute top-20 right-10 h-96 w-96 animate-pulse rounded-full bg-pink-500/10 blur-[140px]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="space-y-8 text-center lg:col-span-7 lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-rose-400">
                <span className="h-2.5 w-2.5 animate-ping rounded-full bg-rose-500" />
                Showroom exclusivo · Ezeiza
              </span>
              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl md:text-7xl">
                Moda real con{" "}
                <span className="bg-gradient-to-r from-rose-500 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                  estilo & actitud.
                </span>
              </h1>
              <p className="mx-auto max-w-xl text-lg font-medium text-slate-400 lg:mx-0">
                Curva completa del{" "}
                <span className="rounded-md bg-rose-500/10 px-2 py-0.5 font-extrabold text-rose-400">talle 44 al 60</span>.
                Urbano, casual y sin límites de edad.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <a href="#catalogo" className="rounded-2xl bg-gradient-to-r from-rose-600 to-pink-500 px-8 py-4 text-center text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-rose-500/25 hover:scale-[1.02]">
                  Explorar colección
                </a>
                <a href="#probador" className="rounded-2xl border border-slate-800 bg-slate-900 px-8 py-4 text-center text-xs font-extrabold uppercase tracking-wider text-slate-200 hover:border-rose-500/30">
                  Probador inteligente
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-[4/5] max-w-[390px] overflow-hidden rounded-[2.5rem] border border-slate-800 shadow-2xl">
                <Image src={cfg.heroImage} alt="Showroom Weekend" fill className="object-cover" priority sizes="400px" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 backdrop-blur-md">
                  <p className="text-sm font-extrabold text-slate-100">Denim & blazers</p>
                  <p className="text-[11px] font-bold text-rose-400">Probá en el showroom</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-rose-500/10 bg-rose-950/20 py-5">
        {[0, 1].map((d) => (
          <div key={d} className="sw-marquee-track inline-flex whitespace-nowrap font-serif text-lg italic tracking-widest text-rose-400/80" aria-hidden={d === 1}>
            <span className="mx-8">WEEKEND ✦ TALLES 44-60 ✦ EL JAGÜEL ✦ PASO DE LA PATRIA 324 ✦</span>
            <span className="mx-8">WEEKEND ✦ TALLES 44-60 ✦ EL JAGÜEL ✦ PASO DE LA PATRIA 324 ✦</span>
          </div>
        ))}
      </div>

      <ShowroomWeekendFittingRoom onFilterSize={setSizeFilter} />
      <ShowroomWeekendCatalog sizeFilter={sizeFilter} onSizeFilterChange={setSizeFilter} onAddToCart={addToCart} />

      <section id="showroom" className="border-t border-slate-900 bg-slate-900/10 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900 p-8 md:p-12">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-5">
                <span className="inline-block rounded-full border border-rose-500/20 bg-rose-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-rose-400">
                  📍 Te esperamos
                </span>
                <h2 className="text-3xl font-black text-white sm:text-5xl">Vení a probártelo en vivo</h2>
                <p className="text-sm leading-relaxed text-slate-400 md:text-base">
                  Showroom Weekend en Ezeiza. Probadores amplios, buena iluminación y asesoramiento cálido.
                </p>
                <ul className="space-y-4 border-t border-slate-800 pt-6 text-sm">
                  <li>
                    <strong className="text-slate-200">Dirección:</strong>
                    <br />
                    {cfg.addressLines.map((l) => (
                      <span key={l} className="text-slate-400">
                        {l}
                        <br />
                      </span>
                    ))}
                  </li>
                  <li>
                    <strong className="text-slate-200">Horarios:</strong> {cfg.hours}
                  </li>
                </ul>
                <a
                  href={cfg.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white hover:bg-rose-600"
                >
                  🧭 Cómo llegar
                </a>
              </div>
              <div className="relative h-80 overflow-hidden rounded-3xl border border-slate-800 sm:h-96 lg:col-span-7">
                <iframe
                  src={cfg.mapsEmbedUrl}
                  className="sw-map-filter absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Showroom Weekend en Google Maps"
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/90 px-3.5 py-2.5 backdrop-blur-md">
                  <span className="h-2.5 w-2.5 animate-ping rounded-full bg-rose-500" />
                  <span className="text-xs font-bold text-slate-200">Paso de la Patria 324</span>
                </div>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-800">
                <Image src={cfg.heroImage} alt="Interior showroom" fill className="object-cover" sizes="50vw" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-800">
                <Image src={cfg.storeImage} alt="Vitrina Weekend" fill className="object-cover" sizes="50vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
        <h2 className="mb-10 text-center text-3xl font-black">Preguntas frecuentes</h2>
        <div className="space-y-4">
          {FAQ.map((item) => (
            <details key={item.q} className="group cursor-pointer rounded-2xl border border-slate-900 bg-slate-900/30 p-5">
              <summary className="flex justify-between font-bold text-slate-200">{item.q}</summary>
              <p className="mt-3 border-t border-slate-900 pt-3 text-sm leading-relaxed text-slate-400">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <DemoLeadForm
        slug={cfg.slug}
        brandLabel={`${cfg.brand} ${cfg.brandTag}`}
        kicker="Consultá esta demo"
        title="¿Te gusta este modelo tech para tu tienda?"
        sub="Probador virtual, cupones, carrito WhatsApp y mapa — adaptamos a tu marca."
        theme={{
          section: "bg-slate-900 text-slate-100",
          invert: false,
          label: "text-[10px] font-bold uppercase tracking-widest text-slate-500",
          input: "mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-rose-500 focus:outline-none",
          focus: "focus:border-rose-500",
          card: "rounded-3xl border border-slate-800 bg-slate-950 p-8 md:p-10",
          button: "rounded-xl bg-gradient-to-r from-rose-600 to-pink-500 px-8 py-3 text-xs font-bold uppercase tracking-widest text-white",
        }}
      />

      <footer className="border-t border-slate-900 pb-12 pt-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:text-left">
          <p className="font-serif text-3xl font-black italic text-rose-500">{cfg.brand}</p>
          <p className="mt-2 text-sm text-slate-400">{cfg.tagline}</p>
          <a href={cfg.instagramUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-bold text-rose-400 hover:underline">
            @{cfg.instagramHandle}
          </a>
          <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Showroom Weekend · Ezeiza</p>
        </div>
      </footer>

      <a
        href={weekendWhatsAppLink(cfg.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-2xl shadow-2xl hover:scale-110"
        aria-label="WhatsApp"
      >
        💬
      </a>

      {toast ? (
        <div className="fixed bottom-24 right-6 z-50 max-w-sm rounded-2xl border border-emerald-500/30 bg-emerald-950/90 px-5 py-4 text-sm font-bold text-emerald-200 backdrop-blur-md">
          {toast}
        </div>
      ) : null}

      <ShowroomWeekendCart open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onUpdateQty={updateQty} onRemove={removeItem} />
      <ShowroomWeekendSizeGuide open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}

export function DemoModaShowroomWeekend() {
  return <ShowroomWeekendLanding />;
}
