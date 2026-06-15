"use client";

import { JetBrains_Mono, Inter } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import {
  NEXUS_FERRETERIA_CONFIG,
  NEXUS_PRODUCTS,
  type NexusCartItem,
  type NexusCategoryId,
  type NexusProduct,
} from "@/lib/nexus-ferreteria";
import { DemoLeadForm } from "../demo-lead-form";
import { Navbar } from "./layout/navbar";
import { MiniCart } from "./layout/mini-cart";
import { SearchOverlay } from "./layout/search-overlay";
import { QuoteModal } from "./layout/quote-modal";
import { ScrollProgress } from "./layout/scroll-progress";
import { MobileDock } from "./layout/mobile-dock";
import { Hero } from "./sections/hero";
import { ToolsMarquee } from "./sections/marquee";
import { Categories } from "./sections/categories";
import { Services } from "./sections/services";
import { Catalog } from "./sections/catalog";
import { NexusFooter } from "./sections/footer";
import { QuickView } from "./product/quick-view";
import "./nexus-ferreteria.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-nx-mono",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-nx-sans",
  display: "swap",
});

export function DemoNexusFerreteria() {
  const cfg = NEXUS_FERRETERIA_CONFIG;
  const [cart, setCart] = useState<NexusCartItem[]>([]);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quickProduct, setQuickProduct] = useState<NexusProduct | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<NexusCategoryId | "all">("all");
  const [toast, setToast] = useState<string | null>(null);
  const [recentIds, setRecentIds] = useState<number[]>([]);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const inventoryCount = useMemo(() => 2847 + NEXUS_PRODUCTS.length * 12, []);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  }, []);

  const addToCart = useCallback(
    (product: NexusProduct, qty = 1) => {
      const key = `${product.id}`;
      setCart((prev) => {
        const ex = prev.find((i) => i.key === key);
        if (ex) {
          return prev.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + qty } : i,
          );
        }
        return [...prev, { ...product, key, quantity: qty }];
      });
      setRecentIds((prev) => [product.id, ...prev.filter((id) => id !== product.id)].slice(0, 4));
      notify("Agregado al carrito industrial");
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

  const scrollToCatalog = () => {
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className={`${mono.variable} ${sans.variable} min-h-screen bg-zinc-950 font-[family-name:var(--font-nx-sans)] text-zinc-100 antialiased`}
    >
      <ScrollProgress />
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        wishlistCount={wishlist.size}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenQuote={() => setQuoteOpen(true)}
      />
      <Hero onCta={scrollToCatalog} inventoryCount={inventoryCount} />
      <ToolsMarquee />
      <Categories active={categoryFilter} onSelect={setCategoryFilter} />
      <Services />
      <Catalog
        category={categoryFilter}
        wishlist={wishlist}
        onWishlist={toggleWishlist}
        onQuickView={setQuickProduct}
        onAdd={(p) => addToCart(p)}
      />
      {recentIds.length > 0 && (
        <section className="border-t border-white/5 bg-zinc-900/30 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="font-mono text-xs uppercase tracking-[0.04em] text-[color:var(--muted-body)]">
              Vistos recientemente
            </p>
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {recentIds.map((id) => {
                const p = NEXUS_PRODUCTS.find((x) => x.id === id);
                if (!p) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setQuickProduct(p)}
                    className="shrink-0 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 hover:border-orange-500/30"
                  >
                    {p.name}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}
      <NexusFooter />

      <DemoLeadForm
        slug={cfg.slug}
        brandLabel={`${cfg.brand} ${cfg.brandSub}`}
        kicker="¿Te gusta esta demo?"
        title="Ferretería industrial del futuro"
        sub="Hero brutalista, bento, Framer Motion, carrito WhatsApp y catálogo con filtros — para tu ferretería premium."
        theme={{
          section: "bg-zinc-950 text-zinc-100 border-t border-white/5",
          invert: false,
          label: "text-[10px] font-medium uppercase tracking-[0.04em] text-[color:var(--muted-body)]",
          input:
            "mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white focus:border-orange-500/50 focus:outline-none",
          focus: "focus:border-orange-500/50",
          card: "rounded-2xl border border-white/10 bg-zinc-900 p-8",
          button:
            "rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 px-8 py-3 text-xs font-bold uppercase tracking-[0.04em] text-black",
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
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={(p) => setQuickProduct(p)}
      />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
      <QuickView
        product={quickProduct}
        onClose={() => setQuickProduct(null)}
        onAdd={(p, qty) => addToCart(p, qty)}
      />
      <MobileDock
        cartCount={cartCount}
        onSearch={() => setSearchOpen(true)}
        onCart={() => setCartOpen(true)}
        onQuote={() => setQuoteOpen(true)}
      />

      <motion.a
        href="#catalogo"
        className="fixed bottom-24 right-4 z-40 hidden rounded-full bg-orange-600 px-5 py-3 text-xs font-bold uppercase text-black shadow-lg shadow-orange-500/40 lg:bottom-8 lg:block"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Ver catálogo
      </motion.a>

      <AnimatePresence>
        {toast ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 left-1/2 z-[70] -translate-x-1/2 rounded-lg border border-orange-500/30 bg-zinc-900/95 px-4 py-2 text-xs font-medium text-orange-300 shadow-lg backdrop-blur-md md:bottom-8"
          >
            {toast}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
