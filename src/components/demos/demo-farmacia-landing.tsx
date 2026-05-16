"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  ChevronRight,
  ClipboardList,
  Clock,
  Droplets,
  Heart,
  MapPin,
  Menu,
  Microscope,
  Minus,
  Phone,
  Plus,
  Search,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Star,
  Stethoscope,
  Truck,
  User,
  X,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DemoLeadForm } from "./demo-lead-form";
import "./demo-farmacia-premium.css";

const SLUG = "farmacia" as const;

type BadgeVariant = "primary" | "success" | "danger";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  discount?: number;
};

type CartLine = { id: string; name: string; price: number; qty: number };

const NAV_ITEMS = ["Medicamentos", "Belleza", "Nutrición", "Consultas", "Ofertas"] as const;

const PRODUCT_SEED: Omit<Product, "image">[] = [
  {
    id: "mv60",
    name: "Suplemento Multivitamínico Premium — 60 cápsulas",
    price: 24990,
    category: "Nutrición",
    discount: 15,
  },
  {
    id: "serum",
    name: "Serum facial ácido hialurónico Pure Hydra",
    price: 38500,
    category: "Dermocosmética",
  },
  {
    id: "tensi",
    name: "Monitor de presión arterial digital Elite",
    price: 85000,
    category: "Equipamiento",
    discount: 20,
  },
  {
    id: "whey",
    name: "Proteína isolatada Whey Premium chocolate",
    price: 54900,
    category: "Deportiva",
  },
  {
    id: "pañales",
    name: "Pack pañales premium M x72",
    price: 31500,
    category: "Bebés",
  },
  {
    id: "fps50",
    name: "Protector solar facial FPS 50+",
    price: 23800,
    category: "Dermocosmética",
    discount: 10,
  },
  {
    id: "electro",
    name: "Electrolitos hidratación x12 sobres",
    price: 7200,
    category: "OTC",
  },
  {
    id: "termo",
    name: "Termómetro digital infrarrojo sin contacto",
    price: 18900,
    category: "Equipamiento",
  },
];

function formatPrice(n: number) {
  return `$${n.toLocaleString("es-AR")}`;
}

function Badge({ children, variant = "primary" }: { children: React.ReactNode; variant?: BadgeVariant }) {
  const styles: Record<BadgeVariant, string> = {
    primary: "bg-cyan-500/10 text-cyan-600 border-cyan-200",
    success: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    danger: "bg-rose-500/10 text-rose-600 border-rose-200",
  };
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${styles[variant]}`}
    >
      {children}
    </span>
  );
}

function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (p: Product) => void;
}) {
  return (
    <article className="farm-product-card group relative overflow-hidden rounded-2xl border border-slate-100 bg-white hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10">
      {product.discount ? (
        <div className="absolute left-4 top-4 z-10 rounded bg-rose-500 px-2 py-1 text-[10px] font-black text-white">
          -{product.discount}%
        </div>
      ) : null}
      <button
        type="button"
        aria-label="Favorito"
        className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-slate-400 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-rose-500"
      >
        <Heart size={16} />
      </button>
      <div className="flex aspect-square w-full items-center justify-center overflow-hidden bg-slate-50 p-8">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-5">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-cyan-600">{product.category}</p>
        <h3 className="mb-3 min-h-[40px] line-clamp-2 text-sm font-semibold leading-snug text-slate-800">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-xl font-black text-slate-900">{formatPrice(product.price)}</span>
            {product.discount ? (
              <span className="ml-2 text-xs text-slate-400 line-through">
                {formatPrice(Math.round(product.price * 1.2))}
              </span>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => onAdd(product)}
            className="rounded-xl bg-slate-900 p-2.5 text-white shadow-lg shadow-slate-900/20 transition-colors hover:bg-cyan-600 active:scale-95"
            aria-label="Agregar al carrito"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}

function ServiceIcon({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Stethoscope;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-8 text-center transition-all hover:border-cyan-500/20">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 shadow-inner transition-all duration-500 group-hover:bg-cyan-600 group-hover:text-white">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h4 className="mb-2 font-bold uppercase tracking-tighter text-slate-900">{title}</h4>
      <p className="text-xs leading-relaxed text-slate-500">{description}</p>
    </div>
  );
}

export function DemoFarmaciaLanding() {
  const v = getDemoVisuals(SLUG);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const products: Product[] = useMemo(
    () =>
      PRODUCT_SEED.map((p, i) => ({
        ...p,
        image: [v.cover, v.a, v.b, v.c, v.d, v.e, v.a, v.b][i] ?? v.cover,
      })),
    [v],
  );

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = cartOpen || mobileNav ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, mobileNav]);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      if (ex) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const adjustQty = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  }, []);

  return (
    <div className="farm-premium min-h-screen bg-white font-[family-name:var(--font-demo-b-farmacia)] text-slate-900 antialiased">
      {/* Cart overlay + panel */}
      <div
        className={`fixed inset-0 z-[200] transition-opacity duration-300 ${
          cartOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!cartOpen}
      >
        <button
          type="button"
          aria-label="Cerrar carrito"
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setCartOpen(false)}
        />
        <aside
          className={`farm-cart-panel fixed right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl ${cartOpen ? "is-open" : ""}`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 p-6 md:p-8">
            <div>
              <h2 className="font-[family-name:var(--font-demo-h-farmacia)] text-2xl font-bold tracking-tight text-slate-900">
                Tu pedido
              </h2>
              <p className="mt-1 text-xs text-slate-500">{cartCount} artículo{cartCount === 1 ? "" : "s"}</p>
            </div>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
              aria-label="Cerrar"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 md:pt-4">
            {cart.length === 0 ? (
              <p className="py-16 text-center text-sm text-slate-500">
                El carrito está vacío. Explorá el catálogo y agregá productos.
              </p>
            ) : (
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-semibold text-slate-800">{item.name}</p>
                      <p className="mt-1 text-sm font-bold text-cyan-600">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white p-1">
                      <button
                        type="button"
                        onClick={() => adjustQty(item.id, -1)}
                        className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        aria-label="Menos cantidad"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="min-w-[1.5rem] text-center text-sm font-bold tabular-nums">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => adjustQty(item.id, 1)}
                        className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        aria-label="Más cantidad"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-slate-100 p-6 md:p-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">Total demo</span>
              <span className="text-2xl font-black text-slate-900">{formatPrice(cartTotal)}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setCartOpen(false);
                document.getElementById(`lead-${SLUG}`)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full rounded-xl bg-cyan-600 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-600/25 transition-colors hover:bg-cyan-700"
            >
              Finalizar pedido
            </button>
          </div>
        </aside>
      </div>

      {/* Nav */}
      <header
        className={`fixed top-0 z-[100] w-full transition-all duration-300 ${
          scrolled ? "border-b border-slate-200/80 bg-white/95 py-3 shadow-sm backdrop-blur-md" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          <Link href="/demos" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-lg shadow-cyan-600/30">
              <Droplets size={22} strokeWidth={2} />
            </div>
            <div>
              <p className="font-[family-name:var(--font-demo-h-farmacia)] text-lg font-bold tracking-tight text-slate-900 md:text-xl">
                Galénica
              </p>
              <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-cyan-600">Medical Hub</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={item === "Ofertas" ? "#catalogo" : item === "Consultas" ? "#servicios" : "#catalogo"}
                className="text-[11px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-cyan-600"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:border-cyan-500/30 hover:text-cyan-600"
              aria-label="Abrir carrito"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-600 px-1 text-[10px] font-black text-white">
                  {cartCount}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setMobileNav((o) => !o)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 lg:hidden"
              aria-label={mobileNav ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileNav ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileNav ? (
          <div className="border-t border-slate-100 bg-white px-4 py-6 lg:hidden">
            <nav className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={item === "Consultas" ? "#servicios" : "#catalogo"}
                  onClick={() => setMobileNav(false)}
                  className="text-left text-lg font-semibold text-slate-800"
                >
                  {item}
                </a>
              ))}
              <a
                href={`#lead-${SLUG}`}
                onClick={() => setMobileNav(false)}
                className="text-left text-lg font-semibold text-cyan-600"
              >
                Contacto
              </a>
            </nav>
          </div>
        ) : null}
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-cyan-50/80 via-white to-white pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="pointer-events-none absolute right-0 top-0 h-[50vh] w-[50vw] rounded-full bg-cyan-400/10 blur-[100px]" aria-hidden />
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative z-10">
              <Badge variant="success">Farmacia 24/7</Badge>
              <h1 className="mt-6 font-[family-name:var(--font-demo-h-farmacia)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 md:text-6xl lg:text-[3.5rem]">
                Tu salud, <span className="text-cyan-600">nuestra ciencia</span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600 md:text-lg">
                Medicamentos, dermocosmética y telemedicina en un solo hub. Envío express CABA y GBA con recetas digitales.
              </p>
              <form
                className="mt-8 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <label className="relative flex-1">
                  <span className="sr-only">Buscar productos</span>
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    placeholder="Buscar medicamentos, vitaminas, cuidado..."
                    className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-sm text-slate-900 shadow-sm outline-none transition-colors focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-cyan-600"
                >
                  Buscar <ArrowRight size={18} />
                </button>
              </form>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                <span className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  4.9 · 12k reseñas
                </span>
                <span className="hidden h-4 w-px bg-slate-200 sm:block" />
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-cyan-600" />
                  ANMAT demo
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-100 shadow-2xl shadow-cyan-500/10">
                <Image
                  src={v.cover}
                  alt="Farmacia Galénica Medical Hub"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-white/90 p-4 backdrop-blur-md md:bottom-6 md:left-6 md:right-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-600">Retiro en 45 min</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">12 sucursales activas en CABA y GBA</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature bar */}
        <section className="border-y border-slate-100 bg-slate-50 py-6">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 md:grid-cols-4 md:px-8 md:gap-8">
            {[
              { icon: Truck, label: "Envío express", sub: "Mismo día CABA" },
              { icon: Stethoscope, label: "Telemedicina", sub: "24/7 con receta" },
              { icon: Microscope, label: "Laboratorio", sub: "Resultados online" },
              { icon: ShieldCheck, label: "Obras sociales", sub: "Cobertura demo" },
            ].map((feat) => (
              <div key={feat.label} className="flex items-center gap-3 md:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600">
                  <feat.icon size={22} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-900">{feat.label}</p>
                  <p className="text-[11px] text-slate-500">{feat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Catalog */}
        <section id="catalogo" className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-cyan-600">Catálogo premium</p>
                <h2 className="mt-2 font-[family-name:var(--font-demo-h-farmacia)] text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                  Productos destacados
                </h2>
                <p className="mt-3 max-w-xl text-sm text-slate-500">
                  OTC, nutrición y equipamiento médico. Precios demo en pesos argentinos.
                </p>
              </div>
              <a
                href="#servicios"
                className="inline-flex items-center gap-2 text-sm font-bold text-cyan-600 hover:text-cyan-700"
              >
                Ver servicios <ChevronRight size={18} />
              </a>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} />
              ))}
            </div>
          </div>
        </section>

        {/* Dark services / telemedicine */}
        <section id="servicios" className="bg-slate-900 py-20 text-white md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <Badge variant="primary">Telemedicina 24/7</Badge>
                <h2 className="mt-6 font-[family-name:var(--font-demo-h-farmacia)] text-3xl font-bold tracking-tight md:text-5xl">
                  Consultá sin salir de casa
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-400 md:text-base">
                  Videoconsulta con matriculados, receta electrónica y seguimiento farmacéutico. Ideal para renovaciones y
                  orientación OTC.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    { icon: Activity, title: "Clínica general", desc: "Turnos en menos de 15 minutos, 24 h." },
                    { icon: User, title: "Pediatría y adultos", desc: "Historial compartido con tu farmacia de cabecera." },
                    { icon: ClipboardList, title: "Receta digital", desc: "Envío directo al mostrador para retiro o delivery." },
                    { icon: Clock, title: "Guardia nocturna", desc: "Derivación a centros asociados si hace falta presencial." },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-white">{item.title}</p>
                        <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => document.getElementById(`lead-${SLUG}`)?.scrollIntoView({ behavior: "smooth" })}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-cyan-500"
                >
                  Pedir turno <ArrowRight size={18} />
                </button>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
                <Image src={v.a} alt="Telemedicina Galénica" fill className="object-cover" sizes="50vw" />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* ServiceIcon grid */}
        <section className="bg-slate-50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-12 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-cyan-600">Servicios integrados</p>
              <h2 className="mt-2 font-[family-name:var(--font-demo-h-farmacia)] text-3xl font-bold text-slate-900 md:text-4xl">
                Todo el ecosistema de salud
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <ServiceIcon
                icon={Stethoscope}
                title="Consultas"
                description="Videollamada con profesionales matriculados y derivación inteligente."
              />
              <ServiceIcon
                icon={Microscope}
                title="Laboratorio"
                description="Análisis clínicos con resultados en portal y alertas por WhatsApp demo."
              />
              <ServiceIcon
                icon={Truck}
                title="Delivery"
                description="Cadena de frío para biológicos y entrega programada en ventana horaria."
              />
              <ServiceIcon
                icon={Heart}
                title="Programas"
                description="Diabetes, hipertensión y adherencia con recordatorios personalizados."
              />
            </div>
          </div>
        </section>

        {/* Store locator */}
        <section id="sucursales" className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-cyan-600">Sucursales</p>
                <h2 className="mt-2 font-[family-name:var(--font-demo-h-farmacia)] text-3xl font-bold text-slate-900 md:text-4xl">
                  Encontrá tu farmacia más cercana
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  Mapa interactivo con stock en tiempo real, horarios extendidos y retiro express sin fila.
                </p>
                <ul className="mt-8 space-y-3 text-sm text-slate-700">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
                    <span>
                      <strong className="text-slate-900">Palermo</strong> — Av. Santa Fe 3200 · 24 h
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
                    <span>
                      <strong className="text-slate-900">Belgrano</strong> — Cabildo 2100 · 8 a 22 h
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
                    <span>
                      <strong className="text-slate-900">La Plata</strong> — Calle 50 & 6 · Laboratorio propio
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
                <Image
                  src={v.b}
                  alt="Mapa de sucursales Galénica"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-white/95 p-4 backdrop-blur-sm">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Cerca tuyo</p>
                    <p className="text-sm font-bold text-slate-900">3 sucursales a menos de 2 km</p>
                  </div>
                  <button
                    type="button"
                    className="rounded-xl bg-cyan-600 px-4 py-2 text-xs font-bold text-white hover:bg-cyan-700"
                  >
                    Ver mapa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <DemoLeadForm
        slug={SLUG}
        brandLabel="Galénica Medical Hub"
        theme={v.lead}
        kicker="Medical Hub"
        title="Pedí turno o cotizá online"
        sub="Catálogo, telemedicina y laboratorio en un solo hub de salud."
      />

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-14 text-slate-400">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600 text-white">
                  <Droplets size={20} />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-demo-h-farmacia)] text-lg font-bold text-white">Galénica</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-cyan-500">Medical Hub</p>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed">
                Demo de farmacia premium: e-commerce, telemedicina y logística para tu marca de salud.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Enlaces</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href="#catalogo" className="hover:text-cyan-400">
                    Catálogo
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="hover:text-cyan-400">
                    Telemedicina
                  </a>
                </li>
                <li>
                  <a href="#sucursales" className="hover:text-cyan-400">
                    Sucursales
                  </a>
                </li>
                <li>
                  <a href={`#lead-${SLUG}`} className="hover:text-cyan-400">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Compartir demo</p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-cyan-600/50 hover:text-white"
              >
                <Share2 size={16} />
                Compartir
              </button>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-8 text-xs md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Galénica Medical Hub · Demo Velora Digital</p>
            <Link href="/demos" className="font-medium text-cyan-500 hover:text-cyan-400">
              Volver al catálogo de demos
            </Link>
          </div>
        </div>
      </footer>

      {/* FABs */}
      <a
        href="tel:+541100000000"
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-2xl transition-transform hover:scale-105 md:bottom-8 md:left-8"
        aria-label="Llamar"
      >
        <Phone size={22} />
      </a>
      <button
        type="button"
        onClick={() => document.getElementById(`lead-${SLUG}`)?.scrollIntoView({ behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-cyan-600 px-5 py-4 text-sm font-bold text-white shadow-2xl shadow-cyan-600/30 transition-transform hover:scale-105 md:bottom-8 md:right-8"
      >
        <ClipboardList size={20} />
        <span className="hidden sm:inline">Cargar receta</span>
      </button>
    </div>
  );
}
