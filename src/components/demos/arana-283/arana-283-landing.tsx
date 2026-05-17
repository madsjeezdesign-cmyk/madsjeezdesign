"use client";

import { Menu, ShoppingBag, Sparkles } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  ARANA_283_CONFIG,
  aranaWhatsAppLink,
  getAranaStoreStatus,
  type AranaProduct,
} from "@/lib/arana-283";
import { DemoLeadForm } from "../demo-lead-form";
import { Arana283Calculator } from "./arana-283-calculator";
import { Arana283Cart } from "./arana-283-cart";
import { Arana283Catalog } from "./arana-283-catalog";
import { Arana283Contact } from "./arana-283-contact";
import { Arana283Home } from "./arana-283-home";
import { Arana283Process } from "./arana-283-process";
import { Arana283ProductModal } from "./arana-283-product-modal";
import "./arana-283.css";

export type AranaTab = "inicio" | "proceso" | "catalogo" | "cotizador" | "contacto";

const NAV: { id: AranaTab; label: string }[] = [
  { id: "inicio", label: "Inicio" },
  { id: "proceso", label: "¿Cómo funciona?" },
  { id: "catalogo", label: "Catálogo" },
  { id: "cotizador", label: "Valuar ropa" },
  { id: "contacto", label: "Contacto" },
];

const MOBILE_NAV: { id: AranaTab; label: string; icon: string }[] = [
  { id: "inicio", label: "Inicio", icon: "🏠" },
  { id: "proceso", label: "Proceso", icon: "🔄" },
  { id: "catalogo", label: "Comprar", icon: "🏷️" },
  { id: "cotizador", label: "Vender", icon: "💼" },
  { id: "contacto", label: "Local", icon: "📍" },
];

export function Arana283Landing() {
  const cfg = ARANA_283_CONFIG;
  const [tab, setTab] = useState<AranaTab>("inicio");
  const [cart, setCart] = useState<AranaProduct[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<AranaProduct | null>(null);
  const [storeStatus, setStoreStatus] = useState(getAranaStoreStatus());
  const [toasts, setToasts] = useState<{ id: number; message: string; type: string }[]>([]);

  const addToast = useCallback((message: string, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const addToCart = useCallback(
    (product: AranaProduct) => {
      if (cart.some((i) => i.id === product.id)) {
        addToast("Esta prenda única ya está en tu bolsa.", "warning");
        return;
      }
      setCart((prev) => [...prev, product]);
      addToast("Agregado a tu bolsa de reserva");
      setCartOpen(true);
    },
    [cart, addToast],
  );

  useEffect(() => {
    const tick = () => setStoreStatus(getAranaStoreStatus());
    tick();
    const id = window.setInterval(tick, 60000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = cartOpen || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, menuOpen]);

  const navBtn = (id: AranaTab) =>
    `transition-colors hover:text-purple-400 ${tab === id ? "text-purple-400" : "text-slate-400"}`;

  return (
    <div className="arana-demo min-h-screen overflow-x-hidden bg-[#09090b] pb-16 font-sans text-slate-100 selection:bg-purple-600 selection:text-white md:pb-0">
      <div className="pointer-events-none fixed right-5 top-5 z-[100] max-w-sm space-y-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center gap-3 rounded-xl border-l-4 border-purple-500 bg-slate-900/95 p-4 text-xs font-semibold shadow-2xl backdrop-blur-md"
          >
            <Sparkles className="h-5 w-5 shrink-0 text-purple-400" />
            {t.message}
          </div>
        ))}
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#09090b]/85 backdrop-blur-lg">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button type="button" className="flex items-center gap-3" onClick={() => setTab("inicio")}>
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-xl font-extrabold text-white shadow-lg shadow-purple-500/20">
              A
            </div>
            <div>
              <span className="block bg-gradient-to-r from-white via-slate-100 to-purple-400 bg-clip-text text-lg font-black tracking-widest text-transparent">
                {cfg.brand}
              </span>
              <span className="-mt-1 block text-[9px] font-extrabold uppercase tracking-[0.25em] text-pink-500">
                {cfg.brandTag}
              </span>
            </div>
          </button>

          <nav className="hidden space-x-8 text-xs font-bold uppercase tracking-wider md:flex">
            {NAV.map((n) => (
              <button key={n.id} type="button" onClick={() => setTab(n.id)} className={navBtn(n.id)}>
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900 p-2.5 hover:border-purple-500 hover:text-purple-400"
              aria-label="Bolsa"
            >
              <ShoppingBag className="h-5 w-5" />
              {cart.length > 0 ? (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 animate-bounce items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-[10px] font-black text-white ring-2 ring-[#09090b]">
                  {cart.length}
                </span>
              ) : null}
            </button>
            <a
              href={aranaWhatsAppLink(cfg.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg sm:flex"
            >
              WhatsApp
            </a>
            <button type="button" className="p-2 text-slate-400 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav className="space-y-3 border-b border-slate-900 px-4 py-5 md:hidden">
            {NAV.map((n) => (
              <button
                key={n.id}
                type="button"
                className="block w-full py-2 text-left text-sm font-bold text-slate-200"
                onClick={() => {
                  setTab(n.id);
                  setMenuOpen(false);
                }}
              >
                {n.label}
              </button>
            ))}
            <a
              href={aranaWhatsAppLink(cfg.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 py-3.5 text-center text-xs font-black uppercase text-white"
            >
              WhatsApp
            </a>
          </nav>
        ) : null}
      </header>

      {tab === "inicio" ? <Arana283Home storeStatus={storeStatus} onTab={(t) => setTab(t as AranaTab)} /> : null}
      {tab === "proceso" ? <Arana283Process onTab={(t) => setTab(t as AranaTab)} /> : null}
      {tab === "catalogo" ? (
        <Arana283Catalog onAddToCart={addToCart} onSelectProduct={setSelectedProduct} />
      ) : null}
      {tab === "cotizador" ? <Arana283Calculator onToast={addToast} /> : null}
      {tab === "contacto" ? <Arana283Contact /> : null}

      <DemoLeadForm
        slug={cfg.slug}
        brandLabel={cfg.brand}
        kicker="Consultá esta demo"
        title="¿Te gusta este modelo para tu tienda circular?"
        sub="Catálogo, cotizador, carrito WhatsApp y mapa — adaptamos a tu marca."
        theme={{
          section: "bg-slate-950 text-slate-100",
          invert: false,
          label: "text-[10px] font-bold uppercase tracking-widest text-slate-500",
          input:
            "mt-2 w-full rounded-xl border border-slate-700 bg-[#09090b] px-4 py-3 text-sm text-white focus:border-purple-500 focus:outline-none",
          focus: "focus:border-purple-500",
          card: "rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-10",
          button:
            "rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-3 text-xs font-bold uppercase tracking-widest text-white",
        }}
      />

      <footer className="border-t border-slate-900 bg-slate-950 py-16 pb-24 text-xs text-slate-500 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid grid-cols-1 gap-8 border-b border-slate-900 pb-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <span className="block bg-gradient-to-r from-white to-purple-400 bg-clip-text text-lg font-black tracking-widest text-transparent">
                {cfg.brand}
              </span>
              <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-400">{cfg.tagline}</p>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-black uppercase tracking-widest text-white">Secciones</h4>
              <ul className="space-y-2 text-[11px] text-slate-400">
                {NAV.map((n) => (
                  <li key={n.id}>
                    <button type="button" onClick={() => setTab(n.id)} className="hover:text-purple-400">
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-black uppercase tracking-widest text-white">Contacto</h4>
              <p className="text-[11px] leading-relaxed text-slate-400">
                {cfg.addressLines[0]}
                <br />
                {cfg.email}
              </p>
              <a href={cfg.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block font-bold text-pink-400 hover:underline">
                @{cfg.instagramHandle}
              </a>
            </div>
          </div>
          <p className="text-center text-[10px] text-slate-600 md:text-left">
            © {new Date().getFullYear()} {cfg.brand} — Todos los derechos reservados.
          </p>
        </div>
      </footer>

      <nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-around border-t border-slate-800 bg-[#09090b]/90 py-2 backdrop-blur-lg md:hidden">
        {MOBILE_NAV.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => setTab(n.id)}
            className={`flex flex-col items-center py-1 text-[9px] font-black uppercase ${tab === n.id ? "text-purple-400" : "text-slate-500"}`}
          >
            <span className="mb-0.5 text-base">{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>

      <Arana283Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onRemove={(id) => setCart((prev) => prev.filter((i) => i.id !== id))}
      />
      <Arana283ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />
    </div>
  );
}

export function DemoModaArana283() {
  return <Arana283Landing />;
}
