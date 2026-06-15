"use client";

import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LUNA_PETIT_CO_CONFIG,
  type LunaCartItem,
  type LunaCategoryId,
  type LunaProduct,
} from "@/lib/luna-petit-co";
import { DemoLeadForm } from "../demo-lead-form";
import { LunaNavbar } from "./layout/navbar";
import { LunaMiniCart } from "./layout/mini-cart";
import { SearchOverlay } from "./layout/search-overlay";
import { ScrollProgress } from "./layout/scroll-progress";
import { MobileDock } from "./layout/mobile-dock";
import { LunaHero } from "./sections/hero";
import { LunaCategories } from "./sections/categories";
import { LunaProductBento } from "./sections/product-bento";
import { LunaTrust } from "./sections/trust";
import { LunaTestimonials } from "./sections/testimonials";
import { LunaFooter } from "./sections/footer";
import { QuickView } from "./product/quick-view";
import { ScrollReveal } from "@/components/primitives";
import "./luna-petit-co.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-lp-serif",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-lp-sans",
  display: "swap",
});

export function LunaPetitCoLanding() {
  const cfg = LUNA_PETIT_CO_CONFIG;
  const [cart, setCart] = useState<LunaCartItem[]>([]);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickProduct, setQuickProduct] = useState<LunaProduct | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<LunaCategoryId | "all">("all");
  const [toast, setToast] = useState<string | null>(null);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const addToCart = useCallback(
    (product: LunaProduct, size: string, colorId: string) => {
      const key = `${product.id}-${colorId}-${size}`;
      setCart((prev) => {
        const ex = prev.find((i) => i.key === key);
        if (ex) {
          return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + 1 } : i));
        }
        return [
          ...prev,
          {
            ...product,
            key,
            size,
            colorId,
            quantity: 1,
          },
        ];
      });
      notify("Agregado a tu bolsa");
      setCartOpen(true);
    },
    [notify],
  );

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const updateQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0),
    );
  };

  const defaultAdd = (p: LunaProduct) => addToCart(p, p.sizes[0], p.colors[0].id);

  return (
    <motion.div
      className={`${serif.variable} ${sans.variable} lp-root min-h-screen bg-[#F8F6F2] font-[family-name:var(--font-lp-sans)] text-neutral-800 antialiased`}
    >
      <ScrollProgress />
      <LunaNavbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        wishCount={wishlist.size}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onNav={scrollTo}
      />
      <LunaHero onShop={() => scrollTo("coleccion")} />
      <LunaCategories
        onSelect={(id) => {
          setCategoryFilter(id);
          scrollTo("coleccion");
        }}
      />
      <LunaProductBento
        filter={categoryFilter}
        wishlist={wishlist}
        onWishlist={toggleWishlist}
        onQuickView={setQuickProduct}
        onAdd={defaultAdd}
      />
      <LunaTrust />
      <ScrollReveal>
        <LunaTestimonials />
      </ScrollReveal>
      <LunaFooter />

      <DemoLeadForm
        slug={cfg.slug}
        brandLabel={cfg.brand}
        kicker="¿Te gusta esta demo?"
        title="Lujo infantil cinematográfico"
        sub="Hero editorial, bento grid, Framer Motion y e-commerce premium — para tu marca kids."
        theme={{
          section: "bg-neutral-900 text-neutral-100",
          invert: false,
          label: "text-[10px] font-medium uppercase tracking-[0.04em] text-neutral-500",
          input:
            "mt-2 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-neutral-400 focus:outline-none",
          focus: "focus:border-neutral-400",
          card: "rounded-2xl border border-neutral-800 bg-neutral-950 p-8",
          button: "rounded-full bg-[#F8F6F2] px-8 py-3 text-xs font-medium uppercase tracking-[0.04em] text-neutral-900",
        }}
      />

      <AnimatePresence>
        {toast ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-neutral-200/60 bg-white/90 px-4 py-2 text-xs font-medium text-neutral-800 shadow-lg backdrop-blur-md md:bottom-8"
          >
            {toast}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <MobileDock
        cartCount={cartCount}
        onHome={() => scrollTo("inicio")}
        onSearch={() => setSearchOpen(true)}
        onCart={() => setCartOpen(true)}
        onCollection={() => scrollTo("coleccion")}
      />

      <LunaMiniCart
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={(key) => setCart((prev) => prev.filter((i) => i.key !== key))}
      />
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={(p) => setQuickProduct(p)}
      />
      <QuickView
        product={quickProduct}
        onClose={() => setQuickProduct(null)}
        onAdd={addToCart}
      />
    </motion.div>
  );
}

export function DemoLunaPetitCo() {
  return <LunaPetitCoLanding />;
}
