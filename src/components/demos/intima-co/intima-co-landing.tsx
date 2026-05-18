"use client";

import { CheckCircle2, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import {
  buildIntimaOrderSummary,
  calcIntimaTotals,
  getIntimaColor,
  INTIMA_CO_CONFIG,
  type IntimaCartLine,
  type IntimaCategoryId,
  type IntimaDeliveryMode,
  type IntimaProduct,
} from "@/lib/intima-co";
import { DemoLeadForm } from "../demo-lead-form";
import { IntimaCoCart } from "./intima-co-cart";
import { IntimaCoCatalog } from "./intima-co-catalog";
import { IntimaCoFooter } from "./intima-co-footer";
import { IntimaCoHero } from "./intima-co-hero";
import { IntimaCoNavbar } from "./intima-co-navbar";
import { IntimaCoPackBuilder, type PackSelection } from "./intima-co-pack-builder";
import { IntimaCoSizeCalculator } from "./intima-co-size-calculator";
import "./intima-co.css";

export function IntimaCoLanding() {
  const cfg = INTIMA_CO_CONFIG;
  const [categoryFilter, setCategoryFilter] = useState<IntimaCategoryId | "all">("all");
  const [sizeHighlight, setSizeHighlight] = useState<string | null>(null);
  const [cart, setCart] = useState<IntimaCartLine[]>([]);
  const [packDiscount, setPackDiscount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderSummary, setOrderSummary] = useState("");

  const cartCount = cart.reduce((s, l) => s + l.quantity, 0);
  const previewTotals = useMemo(
    () => calcIntimaTotals(cart, "pickup", packDiscount),
    [cart, packDiscount],
  );

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2500);
  }, []);

  const scrollTo = (sel: string) => {
    document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" });
  };

  const addProduct = useCallback(
    (product: IntimaProduct, colorId: string, size: string) => {
      const color = getIntimaColor(product, colorId);
      const key = `p-${product.id}-${colorId}-${size}`;
      setCart((prev) => {
        const ex = prev.find((l) => l.key === key);
        if (ex) {
          return prev.map((l) => (l.key === key ? { ...l, quantity: l.quantity + 1 } : l));
        }
        return [
          ...prev,
          {
            key,
            productId: product.id,
            name: product.name,
            colorId,
            colorName: color.name,
            colorHex: color.hex,
            size,
            unitPrice: product.price,
            quantity: 1,
          },
        ];
      });
      notify("Agregado al carrito");
      setCartOpen(true);
    },
    [notify],
  );

  const addPack = useCallback(
    (selections: PackSelection[], discount: number) => {
      const subtotal = selections.reduce((s, x) => s + x.price, 0);
      const total = subtotal - discount;
      const key = `pack-${Date.now()}`;
      setCart((prev) => [
        ...prev,
        {
          key,
          productId: 0,
          name: `Pack x${selections.length} esenciales`,
          colorId: "mix",
          colorName: selections.map((s) => `${s.itemName} (${s.color.name})`).join(", "),
          colorHex: "#e7d5c4",
          size: "—",
          unitPrice: total,
          quantity: 1,
          isPackLine: true,
        },
      ]);
      setPackDiscount((d) => d + discount);
      notify(`Pack agregado · ahorrás ${discount > 0 ? "15%" : ""}`);
      setCartOpen(true);
    },
    [notify],
  );

  const updateQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((l) => (l.key === key ? { ...l, quantity: l.quantity + delta } : l))
        .filter((l) => l.quantity > 0),
    );
  };

  const handleCheckout = (mode: IntimaDeliveryMode) => {
    const totals = calcIntimaTotals(cart, mode, packDiscount);
    setOrderSummary(buildIntimaOrderSummary(cart, totals, mode));
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <div className="ic-demo min-h-screen bg-stone-50 font-sans text-stone-800 antialiased selection:bg-rose-100">
      <IntimaCoNavbar
        cartCount={cartCount}
        cartTotal={previewTotals.total}
        onOpenCart={() => setCartOpen(true)}
        onNav={scrollTo}
      />
      <IntimaCoHero onCta={() => scrollTo("#catalogo")} />
      <IntimaCoCatalog
        categoryFilter={categoryFilter}
        onCategoryFilter={setCategoryFilter}
        sizeHighlight={sizeHighlight}
        onAdd={addProduct}
      />
      <IntimaCoSizeCalculator
        onViewSize={(size) => {
          setSizeHighlight(size);
          scrollTo("#catalogo");
        }}
      />
      <IntimaCoPackBuilder onAddPack={addPack} />
      <IntimaCoFooter />

      <DemoLeadForm
        slug={cfg.slug}
        brandLabel={cfg.brand}
        kicker="¿Te gusta esta demo?"
        title="Lencería premium con calculadora de talles"
        sub="Variantes de color, packs con descuento y checkout elegante — para tu marca íntima."
        theme={{
          section: "bg-stone-900 text-stone-100",
          invert: false,
          label: "text-[10px] font-light uppercase tracking-widest text-stone-500",
          input:
            "mt-2 w-full rounded-xl border border-stone-600 bg-stone-950 px-4 py-3 text-sm text-white focus:border-rose-300 focus:outline-none",
          focus: "focus:border-rose-300",
          card: "rounded-2xl border border-stone-700 bg-stone-950 p-8",
          button:
            "rounded-full bg-stone-100 px-8 py-3 text-xs font-light uppercase tracking-widest text-stone-900",
        }}
      />

      {toast ? (
        <div className="fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-rose-100 bg-white/95 px-4 py-2 text-xs font-light text-stone-700 shadow-lg backdrop-blur">
          {toast}
        </div>
      ) : null}

      {checkoutOpen ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-stone-900/15 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-stone-200/80 bg-stone-50 p-8 shadow-xl">
            <button
              type="button"
              onClick={() => setCheckoutOpen(false)}
              className="absolute right-4 top-4 text-stone-400"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>
            <CheckCircle2 className="mx-auto h-14 w-14 text-rose-400/90" strokeWidth={1.25} />
            <h3 className="mt-4 text-center font-serif text-2xl text-stone-900">Compra confirmada</h3>
            <p className="mt-2 text-center text-sm font-light text-stone-500">
              Resumen de tu pedido — envío discreto garantizado
            </p>
            <pre className="mt-6 max-h-48 overflow-y-auto rounded-2xl border border-stone-200/60 bg-white/80 p-4 text-left text-[11px] font-light leading-relaxed text-stone-600 whitespace-pre-wrap">
              {orderSummary}
            </pre>
            <button
              type="button"
              onClick={() => {
                setCheckoutOpen(false);
                setCart([]);
                setPackDiscount(0);
              }}
              className="mt-6 w-full rounded-full bg-stone-900 py-3.5 text-xs font-light uppercase tracking-[0.2em] text-stone-50"
            >
              Cerrar y nuevo pedido
            </button>
          </div>
        </div>
      ) : null}

      <IntimaCoCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={cart}
        packDiscount={packDiscount}
        onUpdateQty={updateQty}
        onRemove={(key) => setCart((prev) => prev.filter((l) => l.key !== key))}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export function DemoIntimaCo() {
  return <IntimaCoLanding />;
}
