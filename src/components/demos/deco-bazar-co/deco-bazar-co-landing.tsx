"use client";

import { CheckCircle2, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import {
  buildDecoOrderSummary,
  calcDecoTotals,
  DECO_BAZAR_CO_CONFIG,
  getDecoProduct,
  type DecoCartItem,
  type DecoCategoryId,
  type DecoCombo,
  type DecoDeliveryMode,
  type DecoProduct,
  type DecoRegionId,
} from "@/lib/deco-bazar-co";
import { DemoLeadForm } from "../demo-lead-form";
import { DecoBazarCoCart } from "./deco-bazar-co-cart";
import { DecoBazarCoCatalog } from "./deco-bazar-co-catalog";
import { DecoBazarCoCombos } from "./deco-bazar-co-combos";
import { DecoBazarCoFooter } from "./deco-bazar-co-footer";
import { DecoBazarCoHero } from "./deco-bazar-co-hero";
import { DecoBazarCoNavbar } from "./deco-bazar-co-navbar";
import "./deco-bazar-co.css";

export function DecoBazarCoLanding() {
  const cfg = DECO_BAZAR_CO_CONFIG;
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<DecoCategoryId | "all">("all");
  const [cart, setCart] = useState<DecoCartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [orderSummary, setOrderSummary] = useState("");

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const previewTotals = useMemo(() => calcDecoTotals(cart, "pickup", "gba-sur"), [cart]);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2500);
  }, []);

  const addProduct = useCallback(
    (product: DecoProduct, quantity: number) => {
      const key = String(product.id);
      setCart((prev) => {
        const ex = prev.find((i) => i.key === key);
        if (ex) {
          return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + quantity } : i));
        }
        return [...prev, { ...product, key, quantity }];
      });
      notify(`${quantity}x ${product.name} agregado`);
      setCartOpen(true);
    },
    [notify],
  );

  const addCombo = useCallback(
    (combo: DecoCombo) => {
      setCart((prev) => {
        let next = [...prev];
        combo.items.forEach((it) => {
          const product = getDecoProduct(it.productId);
          if (!product) return;
          const key = String(product.id);
          const ex = next.find((i) => i.key === key);
          if (ex) {
            next = next.map((i) =>
              i.key === key ? { ...i, quantity: i.quantity + it.qty } : i,
            );
          } else {
            next.push({ ...product, key, quantity: it.qty });
          }
        });
        return next;
      });
      notify(`Set "${combo.name}" agregado`);
      setCartOpen(true);
    },
    [notify],
  );

  const updateQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0),
    );
  };

  const handleCheckout = (mode: DecoDeliveryMode, region: DecoRegionId) => {
    const totals = calcDecoTotals(cart, mode, region);
    setOrderSummary(buildDecoOrderSummary(cart, totals, mode, region));
    setCartOpen(false);
    setSuccessOpen(true);
  };

  return (
    <div className="dbz-demo min-h-screen bg-white font-sans text-zinc-800 antialiased selection:bg-zinc-200">
      <DecoBazarCoNavbar
        search={search}
        onSearch={setSearch}
        cartCount={cartCount}
        cartTotal={previewTotals.total}
        onOpenCart={() => setCartOpen(true)}
        onCategoryNav={(id) => setCategoryFilter(id as DecoCategoryId)}
      />
      <DecoBazarCoHero />
      <DecoBazarCoCatalog
        search={search}
        categoryFilter={categoryFilter}
        onCategoryFilter={setCategoryFilter}
        onAdd={addProduct}
      />
      <DecoBazarCoCombos onAddCombo={addCombo} />
      <DecoBazarCoFooter />

      <DemoLeadForm
        slug={cfg.slug}
        brandLabel={cfg.brand}
        kicker="¿Te gusta esta demo?"
        title="E-commerce retail con filtros y checkout"
        sub="Catálogo multi-filtro, hover de producto, sets promocionales y carrito con cuotas — para tu bazar."
        theme={{
          section: "bg-zinc-900 text-zinc-100",
          invert: false,
          label: "text-[10px] font-medium uppercase tracking-widest text-[color:var(--muted-body)]",
          input:
            "mt-2 w-full rounded-xl border border-zinc-600 bg-zinc-950 px-4 py-3 text-sm text-white focus:border-zinc-400 focus:outline-none",
          focus: "focus:border-zinc-400",
          card: "rounded-2xl border border-zinc-700 bg-zinc-950 p-8",
          button:
            "rounded-full bg-[#5c6b4a] px-8 py-3 text-xs font-medium uppercase tracking-widest text-white",
        }}
      />

      {toast ? (
        <div className="fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 shadow-lg">
          {toast}
        </div>
      ) : null}

      {successOpen ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-zinc-900/20 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-zinc-100 bg-white p-8 shadow-xl">
            <button
              type="button"
              onClick={() => setSuccessOpen(false)}
              className="absolute right-4 top-4 text-zinc-400"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
            <CheckCircle2 className="mx-auto h-14 w-14 text-[#5c6b4a]" strokeWidth={1.25} />
            <h3 className="mt-4 text-center text-2xl font-light text-zinc-900">¡Compra confirmada!</h3>
            <p className="mt-2 text-center text-sm font-light text-[color:var(--muted-body)]">
              Resumen listo para despachar
            </p>
            <pre className="mt-6 max-h-48 overflow-y-auto rounded-xl bg-zinc-50 p-4 text-left text-[11px] font-light leading-relaxed text-[color:var(--muted-body)] whitespace-pre-wrap">
              {orderSummary}
            </pre>
            <button
              type="button"
              onClick={() => {
                setSuccessOpen(false);
                setCart([]);
              }}
              className="mt-6 w-full rounded-full bg-zinc-800 py-3.5 text-xs font-medium uppercase tracking-wider text-white"
            >
              Cerrar y nuevo pedido
            </button>
          </div>
        </div>
      ) : null}

      <DecoBazarCoCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={(key) => setCart((prev) => prev.filter((i) => i.key !== key))}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export function DemoDecoBazarCo() {
  return <DecoBazarCoLanding />;
}
