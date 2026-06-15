"use client";

import { Bebas_Neue, DM_Sans } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import {
  GUSTITOS_CONFIG,
  GUSTITOS_PRODUCTS,
  type GustitosCartItem,
  type GustitosCategoryId,
  type GustitosComboOption,
  type GustitosProduct,
} from "@/lib/gustitos";
import { DemoLeadForm } from "../demo-lead-form";
import { Navbar } from "./layout/navbar";
import { MiniCart } from "./layout/mini-cart";
import { ComboBuilder } from "./layout/combo-builder";
import { ScrollProgress } from "./layout/scroll-progress";
import { MobileDock } from "./layout/mobile-dock";
import { Hero } from "./sections/hero";
import { FoodMarquee } from "./sections/marquee";
import { Categories } from "./sections/categories";
import { MenuBento } from "./sections/menu-bento";
import { Experience } from "./sections/experience";
import { Testimonials } from "./sections/testimonials";
import { GustitosFooter } from "./sections/footer";
import { QuickView } from "./menu/quick-view";
import "./gustitos.css";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gu-display",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-gu-sans",
  display: "swap",
});

export function DemoGustitos() {
  const cfg = GUSTITOS_CONFIG;
  const [cart, setCart] = useState<GustitosCartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<GustitosCategoryId | "all">("all");
  const [quickProduct, setQuickProduct] = useState<GustitosProduct | null>(null);
  const [builderProduct, setBuilderProduct] = useState<GustitosProduct | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [recentIds, setRecentIds] = useState<number[]>([]);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = useMemo(
    () => cart.reduce((s, i) => s + (i.price + (i.comboAdd ?? 0)) * i.quantity, 0),
    [cart],
  );

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  }, []);

  const addWithCombo = useCallback(
    (product: GustitosProduct, combo: GustitosComboOption, qty: number) => {
      const key = `${product.id}-${combo.id}`;
      setCart((prev) => {
        const ex = prev.find((i) => i.key === key);
        if (ex) {
          return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + qty } : i));
        }
        return [
          ...prev,
          {
            ...product,
            key,
            quantity: qty,
            comboLabel: combo.label,
            comboAdd: combo.priceAdd,
          },
        ];
      });
      setRecentIds((prev) => [product.id, ...prev.filter((id) => id !== product.id)].slice(0, 4));
      notify("🔥 Agregado al carrito");
      setCartOpen(true);
    },
    [notify],
  );

  const openBuilder = (p: GustitosProduct) => {
    setQuickProduct(null);
    setBuilderProduct(p);
  };

  const updateQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0),
    );
  };

  const scrollMenu = () => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.div
      className={`${display.variable} ${sans.variable} min-h-screen bg-zinc-950 font-[family-name:var(--font-gu-sans)] text-zinc-100 antialiased`}
    >
      <ScrollProgress />
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setCartOpen(true)}
        onOrder={scrollMenu}
      />
      <Hero onOrder={scrollMenu} />
      <FoodMarquee />
      <Categories active={categoryFilter} onSelect={setCategoryFilter} />
      <MenuBento
        filter={categoryFilter}
        onQuick={setQuickProduct}
        onAdd={openBuilder}
      />
      {recentIds.length > 0 && (
        <section className="border-t border-white/5 py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="text-xs uppercase tracking-widest text-[color:var(--muted-body)]">Pediste recientemente</p>
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {recentIds.map((id) => {
                const p = GUSTITOS_PRODUCTS.find((x) => x.id === id);
                if (!p) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => openBuilder(p)}
                    className="shrink-0 rounded-xl border border-red-500/20 bg-zinc-900 px-4 py-2 text-sm text-zinc-300"
                  >
                    {p.name}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}
      <Experience />
      <Testimonials />
      <GustitosFooter />

      <DemoLeadForm
        slug={cfg.slug}
        brandLabel={cfg.brand}
        kicker="¿Te gusta esta demo?"
        title="Hamburguesería viral cinematográfica"
        sub="Hero brutal, bento menú, combo builder, carrito WhatsApp y motion premium — para tu marca food."
        theme={{
          section: "bg-zinc-950 text-zinc-100 border-t border-red-500/10",
          invert: false,
          label: "text-[10px] font-medium uppercase tracking-widest text-[color:var(--muted-body)]",
          input:
            "mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white focus:border-red-500/50 focus:outline-none",
          focus: "focus:border-red-500/50",
          card: "rounded-2xl border border-white/10 bg-zinc-900 p-8",
          button:
            "rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-8 py-3 text-xs font-bold uppercase tracking-widest text-white",
        }}
      />

      <MiniCart
        open={cartOpen}
        items={cart}
        total={cartTotal}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={(key) => setCart((prev) => prev.filter((i) => i.key !== key))}
      />
      <QuickView
        product={quickProduct}
        onClose={() => setQuickProduct(null)}
        onCustomize={() => quickProduct && openBuilder(quickProduct)}
      />
      <ComboBuilder
        product={builderProduct}
        onClose={() => setBuilderProduct(null)}
        onAdd={addWithCombo}
      />
      <MobileDock
        cartCount={cartCount}
        onCart={() => setCartOpen(true)}
        onOrder={scrollMenu}
      />

      <motion.a
        href="#menu"
        className="fixed bottom-24 right-4 z-40 hidden rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-5 py-3 text-xs font-bold uppercase text-white shadow-lg shadow-red-500/40 lg:bottom-8 lg:block"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.97 }}
      >
        Ordenar
      </motion.a>

      <AnimatePresence>
        {toast ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-24 left-1/2 z-[70] -translate-x-1/2 rounded-xl border border-red-500/30 bg-zinc-900/95 px-4 py-2 text-sm text-red-300 backdrop-blur-md md:bottom-8"
          >
            {toast}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
