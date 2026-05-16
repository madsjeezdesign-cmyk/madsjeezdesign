"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Droplets,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Share2,
  ShoppingBag,
  Sun,
  Wind,
  X,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DemoLeadForm } from "./demo-lead-form";
import "./demo-floreria-premium.css";

const SLUG = "floreria" as const;
const BRAND = "Jardín Ensueño";

type TabId = "inicio" | "tienda" | "talleres" | "nosotros";

type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
};

type CartLine = { id: string; name: string; price: number; qty: number };

function formatPrice(n: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
}

function useScrollReveal(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".je-scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.08 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef]);
}

function NavItem({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative py-2 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-500 ${
        active ? "text-emerald-800" : "text-stone-400 hover:text-emerald-700"
      }`}
    >
      {label}
      {active ? (
        <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-800" />
      ) : null}
    </button>
  );
}

function BlossomButton({
  children,
  primary,
  onClick,
  icon: Icon,
}: {
  children: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center gap-3 overflow-hidden rounded-full border px-8 py-4 transition-all duration-500 ${
        primary ? "border-emerald-800 bg-emerald-800 text-stone-50" : "border-emerald-800/20 text-emerald-800 hover:bg-emerald-50"
      }`}
    >
      <span className="relative z-10 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em]">
        {children}
        {Icon ? <Icon size={14} className="transition-transform group-hover:translate-x-1" /> : null}
      </span>
    </button>
  );
}

function ProductCard({
  title,
  price,
  category,
  image,
  onAdd,
}: Product & { onAdd: () => void }) {
  return (
    <article className="group cursor-pointer">
      <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl bg-stone-100">
        <Image src={image} alt={title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" sizes="280px" />
        <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            aria-label="Favorito"
            className="rounded-full bg-white/90 p-3 text-stone-800 shadow-sm backdrop-blur-sm transition-colors hover:bg-emerald-800 hover:text-white"
          >
            <Heart size={16} />
          </button>
          <button
            type="button"
            aria-label="Añadir al carrito"
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="rounded-full bg-white/90 p-3 text-stone-800 shadow-sm backdrop-blur-sm transition-colors hover:bg-emerald-800 hover:text-white"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full translate-y-full bg-gradient-to-t from-emerald-950/60 to-transparent p-4 transition-transform duration-500 group-hover:translate-y-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white">Añadir al carrito</p>
        </div>
      </div>
      <div className="text-center">
        <p className="mb-1 text-[10px] uppercase tracking-widest text-stone-400">{category}</p>
        <h3 className="font-serif-display text-lg italic text-stone-800">{title}</h3>
        <p className="mt-1 text-sm font-medium text-emerald-800">{formatPrice(price)}</p>
      </div>
    </article>
  );
}

export function DemoFloreriaLanding() {
  const v = getDemoVisuals(SLUG);
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef);

  const [activeTab, setActiveTab] = useState<TabId>("inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [shopFilter, setShopFilter] = useState<"todo" | "flores" | "plantas">("todo");

  const products: Product[] = useMemo(
    () => [
      { id: "p1", title: "Bruma Silvestre", price: 45000, category: "Ramos", image: v.a },
      { id: "p2", title: "Monstera Deliciosa", price: 32000, category: "Interiores", image: v.b },
      { id: "p3", title: "Caja de Peonías", price: 68000, category: "Especiales", image: v.c },
      { id: "p4", title: "Olivo en Maceta", price: 55000, category: "Árboles", image: v.d ?? v.c },
      { id: "p5", title: "Orquídea Phalaenopsis", price: 38000, category: "Flores", image: v.e ?? v.a },
      { id: "p6", title: "Suculenta Zen", price: 12000, category: "Plantas", image: v.cover },
    ],
    [v],
  );

  const filteredProducts = useMemo(() => {
    if (shopFilter === "flores") return products.filter((p) => p.category === "Ramos" || p.category === "Flores" || p.category === "Especiales");
    if (shopFilter === "plantas") return products.filter((p) => p.category === "Interiores" || p.category === "Plantas" || p.category === "Árboles");
    return products;
  }, [products, shopFilter]);

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = cartOpen || isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, isMenuOpen]);

  const scrollTo = useCallback((id: string, tab: TabId) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const addToCart = useCallback((p: Product) => {
    setCart((prev) => {
      const found = prev.find((x) => x.id === p.id);
      if (found) return prev.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x));
      return [...prev, { id: p.id, name: p.title, price: p.price, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const workshops = [
    { title: "Arreglo floral de autor", date: "Sáb 15 · 10 h", spots: "6 cupos", desc: "Composición en jarra con flores de estación y técnicas de follaje." },
    { title: "Kokedama & musgo", date: "Dom 23 · 11 h", spots: "8 cupos", desc: "Esferas vivientes para interior con guía de riego por inmersión." },
    { title: "Huerta en balcón", date: "Sáb 6 · 17 h", spots: "10 cupos", desc: "Sustratos, polinización y cosecha en espacios reducidos." },
  ] as const;

  return (
    <div
      ref={rootRef}
      className="je-premium min-h-screen bg-stone-50 font-[family-name:var(--font-demo-b-floreria)] text-stone-900 selection:bg-emerald-200"
    >
      <header
        className={`fixed top-0 z-[100] flex w-full items-center justify-between px-6 py-6 transition-all duration-500 md:px-12 ${
          scrolled ? "bg-white/90 shadow-sm backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-8 lg:gap-16">
          <button type="button" onClick={() => scrollTo("inicio", "inicio")} className="group flex cursor-pointer items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-800 text-white transition-transform group-hover:rotate-12">
              <Leaf size={20} />
            </div>
            <div className="flex flex-col leading-none text-left">
              <span className="font-serif-display text-xl font-bold italic tracking-tight text-stone-900">
                Jardín<span className="text-emerald-800">Ensueño</span>
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-stone-400">Florería & Vivero</span>
            </div>
          </button>

          <nav className="hidden gap-8 lg:flex lg:gap-10">
            <NavItem label="Inicio" active={activeTab === "inicio"} onClick={() => scrollTo("inicio", "inicio")} />
            <NavItem label="Tienda" active={activeTab === "tienda"} onClick={() => scrollTo("tienda", "tienda")} />
            <NavItem label="Talleres" active={activeTab === "talleres"} onClick={() => scrollTo("talleres", "talleres")} />
            <NavItem label="Nosotros" active={activeTab === "nosotros"} onClick={() => scrollTo("nosotros", "nosotros")} />
          </nav>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button type="button" aria-label="Buscar" className="hidden p-2 text-stone-600 transition-colors hover:text-emerald-800 sm:flex">
            <Search size={20} />
          </button>
          <button
            type="button"
            aria-label="Carrito"
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-stone-600 transition-colors hover:text-emerald-800"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 ? (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-800 text-[8px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </button>
          <button type="button" className="lg:hidden" onClick={() => setIsMenuOpen(true)} aria-label="Menú">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-[110] flex flex-col bg-stone-900 p-10 text-stone-50">
          <button type="button" className="mb-20 self-end" onClick={() => setIsMenuOpen(false)} aria-label="Cerrar">
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {(
              [
                ["INICIO", "inicio", "inicio"],
                ["TIENDA", "tienda", "tienda"],
                ["TALLERES", "talleres", "talleres"],
                ["NOSOTROS", "nosotros", "nosotros"],
                ["CONTACTO", "lead-floreria", "nosotros"],
              ] as const
            ).map(([label, id, tab]) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  if (id === "lead-floreria") {
                    setIsMenuOpen(false);
                    document.getElementById(`lead-${SLUG}`)?.scrollIntoView({ behavior: "smooth" });
                  } else scrollTo(id, tab);
                }}
                className="text-left font-serif-display text-5xl italic transition-colors hover:text-emerald-400"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* Cart */}
      <div
        className={`fixed inset-0 z-[200] transition-opacity ${cartOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!cartOpen}
      >
        <button type="button" aria-label="Cerrar carrito" className="absolute inset-0 bg-stone-900/40" onClick={() => setCartOpen(false)} />
        <aside
          className={`je-cart-panel fixed right-0 top-0 flex h-full w-full max-w-md flex-col bg-white p-8 shadow-2xl md:p-10 ${cartOpen ? "is-open" : ""}`}
        >
          <div className="mb-8 flex items-center justify-between">
            <h3 className="font-serif-display text-2xl italic text-stone-900">Tu selección</h3>
            <button type="button" onClick={() => setCartOpen(false)} aria-label="Cerrar">
              <X size={24} />
            </button>
          </div>
          {cart.length === 0 ? (
            <p className="text-sm text-stone-500">El carrito está vacío. Explorá la colección de temporada.</p>
          ) : (
            <ul className="flex-1 space-y-4 overflow-y-auto">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between border-b border-stone-100 pb-4 text-sm">
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span className="font-medium text-emerald-800">{formatPrice(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-8 border-t border-stone-100 pt-6">
            <div className="mb-4 flex justify-between font-medium">
              <span>Total demo</span>
              <span className="text-emerald-800">{formatPrice(cartTotal)}</span>
            </div>
            <BlossomButton primary onClick={() => document.getElementById(`lead-${SLUG}`)?.scrollIntoView({ behavior: "smooth" })}>
              Finalizar pedido
            </BlossomButton>
          </div>
        </aside>
      </div>

      <main>
        {/* Hero */}
        <section id="inicio" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-stone-50 pt-20">
          <div className="absolute right-[-5%] top-20 h-[40vw] w-[40vw] animate-pulse rounded-full bg-emerald-100/50 blur-[120px]" aria-hidden />
          <div className="absolute bottom-[-10%] left-[-5%] h-[30vw] w-[30vw] rounded-full bg-amber-50 blur-[100px]" aria-hidden />

          <div className="container relative z-10 mx-auto grid items-center gap-16 px-6 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-800/10 bg-emerald-800/5 px-4 py-1.5">
                <Leaf size={14} className="text-emerald-700" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-800">Temporada de Orquídeas</span>
              </div>
              <h1 className="font-serif-display text-6xl leading-[1.1] tracking-tight text-stone-900 md:text-[5.5rem]">
                Cultivamos <br /> <span className="italic text-emerald-800">emociones</span> que florecen.
              </h1>
              <p className="max-w-lg text-lg font-light leading-relaxed text-stone-500">
                Bienvenidos a nuestro refugio botánico. Arreglos artesanales y plantas exóticas curadas para transformar cualquier espacio en un jardín personal.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <BlossomButton primary icon={ArrowRight} onClick={() => scrollTo("tienda", "tienda")}>
                  Explorar Tienda
                </BlossomButton>
                <BlossomButton onClick={() => scrollTo("talleres", "talleres")}>Nuestros Servicios</BlossomButton>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
                <Image src={v.cover} alt="Ramo elegante" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="je-bounce-slow absolute -bottom-8 -left-8 z-20 flex items-center gap-4 rounded-2xl bg-white p-8 shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <Sun size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Felicidad Diaria</p>
                  <p className="font-serif-display text-xl italic text-stone-800">100% Frescura</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-stone-100 py-24">
          <div className="container mx-auto grid gap-12 px-6 md:grid-cols-3">
            {[
              { icon: Wind, title: "Envío Delicado", desc: "Transportamos tus plantas con el cuidado que merecen, garantizando que lleguen impecables." },
              { icon: Droplets, title: "Cuidado Experto", desc: "Cada ejemplar incluye guía personalizada de riego y mantenimiento botánico." },
              { icon: Sun, title: "Luz y Vida", desc: "Especies adaptadas a distintos niveles de iluminación para tu hogar u oficina." },
            ].map((feat) => (
              <div key={feat.title} className="je-scroll-reveal space-y-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-emerald-800 shadow-sm">
                  <feat.icon size={28} />
                </div>
                <h3 className="font-serif-display text-xl italic text-stone-800">{feat.title}</h3>
                <p className="mx-auto max-w-xs text-sm leading-relaxed text-stone-500">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Entrega */}
        <section className="border-y border-emerald-800/10 bg-emerald-800/5 py-8">
          <div className="container mx-auto flex flex-wrap items-center justify-center gap-8 px-6 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-emerald-800 md:gap-16">
            <span>Envío mismo día CABA</span>
            <span className="hidden h-4 w-px bg-emerald-800/20 md:block" />
            <span>Eventos & bodas</span>
            <span className="hidden h-4 w-px bg-emerald-800/20 md:block" />
            <span>Suscripciones semanales</span>
            <span className="hidden h-4 w-px bg-emerald-800/20 md:block" />
            <span>Vivero con especies raras</span>
          </div>
        </section>

        {/* Shop */}
        <section id="tienda" className="bg-stone-50 py-28 md:py-32">
          <div className="container mx-auto px-6">
            <div className="je-scroll-reveal mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
              <div className="max-w-xl">
                <h5 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-800">Favoritos de la Casa</h5>
                <h2 className="font-serif-display text-5xl leading-tight text-stone-900">
                  Nuestra Colección <br /> <span className="italic">de Temporada.</span>
                </h2>
              </div>
              <div className="flex gap-2">
                {(
                  [
                    ["todo", "Todo"],
                    ["flores", "Flores"],
                    ["plantas", "Plantas"],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setShopFilter(key)}
                    className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest ${
                      shopFilter === key ? "border-b-2 border-emerald-800 text-emerald-800" : "text-stone-400 hover:text-emerald-800"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} {...p} onAdd={() => addToCart(p)} />
              ))}
            </div>
            {v.shop ? (
              <div className="je-scroll-reveal mt-20 rounded-3xl border border-emerald-800/10 bg-white p-8 md:p-12">
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-800">{v.shop.eyebrow ?? "Delivery"}</p>
                <h3 className="mt-2 font-serif-display text-3xl italic text-stone-900">{v.shop.headline}</h3>
                <p className="mt-3 max-w-2xl text-sm text-stone-500">{v.shop.sub}</p>
                <ul className="mt-8 grid gap-4 md:grid-cols-3">
                  {v.shop.products.map((prod) => (
                    <li key={prod.id} className="rounded-2xl border border-stone-100 bg-stone-50 p-5">
                      <p className="font-medium text-stone-800">{prod.name}</p>
                      <p className="mt-1 text-sm text-emerald-800">{prod.price}</p>
                      {prod.note ? <p className="mt-1 text-xs text-stone-400">{prod.note}</p> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>

        {/* Talleres */}
        <section id="talleres" className="bg-white py-28 md:py-32">
          <div className="container mx-auto px-6">
            <div className="je-scroll-reveal mb-16 max-w-2xl">
              <h5 className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-800">Experiencias vivas</h5>
              <h2 className="font-serif-display text-5xl text-stone-900">
                Talleres <span className="italic">botánicos.</span>
              </h2>
              <p className="mt-4 text-stone-500">Cupos limitados en nuestro invernadero. Incluyen materiales y refrigerio herbal.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {workshops.map((w, i) => (
                <article
                  key={w.title}
                  className="je-scroll-reveal rounded-3xl border border-stone-100 bg-stone-50 p-8 transition-shadow hover:shadow-lg"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800">{w.spots}</span>
                  <h3 className="mt-4 font-serif-display text-2xl italic text-stone-900">{w.title}</h3>
                  <p className="mt-2 text-sm font-medium text-stone-600">{w.date}</p>
                  <p className="mt-4 text-sm leading-relaxed text-stone-500">{w.desc}</p>
                  <button
                    type="button"
                    onClick={() => document.getElementById(`lead-${SLUG}`)?.scrollIntoView({ behavior: "smooth" })}
                    className="mt-6 text-[10px] font-bold uppercase tracking-widest text-emerald-800 hover:underline"
                  >
                    Reservar lugar →
                  </button>
                  {i === 0 ? (
                    <div className="relative mt-6 h-40 overflow-hidden rounded-2xl">
                      <Image src={v.b} alt="" fill className="object-cover" sizes="400px" />
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Historia */}
        <section id="nosotros" className="overflow-hidden bg-white py-28 md:py-32">
          <div className="container mx-auto grid items-center gap-20 px-6 lg:grid-cols-2">
            <div className="je-scroll-reveal relative grid grid-cols-2 gap-4">
              <div className="relative mt-12 aspect-square overflow-hidden rounded-3xl shadow-lg">
                <Image src={v.d ?? v.a} alt="Invernadero" fill className="object-cover" sizes="50vw" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-3xl shadow-lg">
                <Image src={v.e ?? v.b} alt="Cuidado de plantas" fill className="object-cover" sizes="50vw" />
              </div>
              <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-8 border-white bg-amber-100 shadow-xl">
                <p className="text-center font-bold leading-none text-amber-900">
                  <span className="text-2xl">25</span>
                  <br />
                  <span className="text-[10px] uppercase">Años</span>
                </p>
              </div>
            </div>
            <div className="je-scroll-reveal space-y-8">
              <h5 className="text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-800">Legado Botánico</h5>
              <h2 className="font-serif-display text-5xl leading-tight text-stone-900">
                Tradición que <span className="italic">echa raíces.</span>
              </h2>
              <p className="leading-loose text-stone-500">
                Desde 1999, Jardín Ensueño nació como un puesto de flores local. Hoy somos un centro botánico dedicado a la conservación y el diseño floral artesanal: cada planta cuenta una historia única.
              </p>
              <ul className="space-y-4">
                {[
                  "Flores de cultivo orgánico y local.",
                  "Diseños personalizados para eventos únicos.",
                  "Vivero especializado en especies raras.",
                ].map((li) => (
                  <li key={li} className="flex items-center gap-3 text-sm font-medium text-stone-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-800" />
                    {li}
                  </li>
                ))}
              </ul>
              <BlossomButton icon={ArrowRight} onClick={() => document.getElementById(`lead-${SLUG}`)?.scrollIntoView({ behavior: "smooth" })}>
                Conoce nuestra Historia
              </BlossomButton>
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="bg-stone-100 py-24">
          <div className="container mx-auto px-6">
            <h2 className="je-scroll-reveal mb-12 text-center font-serif-display text-4xl italic text-stone-900">Lo que dicen nuestros jardines</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { q: "El ramo de novia superó cualquier referencia de Pinterest.", a: "Camila R.", r: "Boda · Palermo" },
                { q: "Las monstera llegaron perfectas. La guía de riego es oro.", a: "Martín L.", r: "Plantas interior" },
                { q: "Suscripción semanal que alegra la oficina entera.", a: "Studio Verde", r: "Corp. · Microcentro" },
              ].map((t) => (
                <blockquote key={t.a} className="je-scroll-reveal rounded-2xl bg-white p-8 shadow-sm">
                  <p className="text-sm italic leading-relaxed text-stone-600">&ldquo;{t.q}&rdquo;</p>
                  <footer className="mt-6">
                    <p className="font-medium text-stone-800">{t.a}</p>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400">{t.r}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="relative mx-6 mb-32 overflow-hidden rounded-[4rem] bg-emerald-900 py-24 text-emerald-50 shadow-2xl">
          <Leaf className="absolute right-0 top-0 rotate-12 p-10 opacity-10" size={200} aria-hidden />
          <div className="container relative z-10 mx-auto max-w-3xl px-6 text-center">
            <h2 className="mb-8 font-serif-display text-4xl italic md:text-5xl">Únete a nuestro club botánico</h2>
            <p className="mb-12 text-lg text-emerald-200/80">
              Consejos de cuidado mensual y acceso anticipado a ediciones limitadas de temporada.
            </p>
            <form
              className="mx-auto flex max-w-lg flex-col gap-4 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                document.getElementById(`lead-${SLUG}`)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <input
                type="email"
                placeholder="Tu correo electrónico..."
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-white placeholder:text-emerald-300 focus:bg-white/20 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-amber-100 px-10 py-4 text-[10px] font-bold uppercase tracking-widest text-emerald-900 transition-colors hover:bg-white"
              >
                Suscribirme
              </button>
            </form>
          </div>
        </section>
      </main>

      <DemoLeadForm
        slug={SLUG}
        brandLabel={BRAND}
        theme={v.lead}
        kicker="Pedido o consulta"
        title="Coordinemos tu entrega o evento"
        sub="Mismo flujo de contacto del sitio principal. Etiquetamos tu consulta como demo florería."
      />

      <footer className="bg-stone-900 pb-12 pt-24 text-stone-400">
        <div className="container mx-auto px-6">
          <div className="mb-24 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Leaf className="text-emerald-500" />
                <span className="font-serif-display text-2xl italic text-white">Jardín Ensueño</span>
              </div>
              <p className="text-sm leading-loose">
                Llevamos la serenidad de la naturaleza a tu puerta. Especialistas en diseño floral y plantas exóticas.
              </p>
              <div className="flex gap-4">
                {[Share2, Share2].map((Icon, i) => (
                  <div
                    key={i}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-stone-800 transition-all hover:border-emerald-800 hover:bg-emerald-800"
                  >
                    <Icon size={18} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-8 text-[11px] font-bold uppercase tracking-[0.3em] text-white">Navegación</h4>
              <ul className="space-y-4 text-sm">
                {["Catálogo de Flores", "Plantas de Exterior", "Cuidado Botánico", "Preguntas Frecuentes"].map((item) => (
                  <li key={item} className="cursor-pointer transition-colors hover:text-emerald-400">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-8 text-[11px] font-bold uppercase tracking-[0.3em] text-white">Contacto</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="shrink-0 text-emerald-500" /> Av. del Libertador 4200, CABA
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="shrink-0 text-emerald-500" /> +54 11 4567 8900
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="shrink-0 text-emerald-500" /> hola@jardinensueno.demo
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-8 text-[11px] font-bold uppercase tracking-[0.3em] text-white">Horario</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between">
                  <span>Lunes - Viernes:</span> <span className="text-stone-100">09:00 - 20:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sábados:</span> <span className="text-stone-100">10:00 - 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Domingos:</span> <span className="text-emerald-500">Cerrado</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-12 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-600">
              © {new Date().getFullYear()} JARDÍN ENSUEÑO · HECHO CON AMOR Y CLOROFILA
            </p>
            <p className="mt-4 text-[10px] text-stone-600">
              <Link href="/demos" className="text-emerald-600 hover:text-emerald-400">
                Volver al showroom
              </Link>
            </p>
          </div>
        </div>
      </footer>

      <button
        type="button"
        aria-label="WhatsApp"
        onClick={() => document.getElementById(`lead-${SLUG}`)?.scrollIntoView({ behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-2xl transition-transform hover:scale-110"
      >
        <Phone size={24} />
      </button>
    </div>
  );
}
