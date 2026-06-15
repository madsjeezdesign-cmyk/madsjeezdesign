"use client";

import { CheckCircle2, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  calcRaicesTotals,
  raicesCartWhatsApp,
  RAICES_CRIOLLAS_CONFIG,
  type RaicesCartLine,
  type RaicesCategoryId,
  type RaicesDeliveryMode,
  type RaicesProduct,
} from "@/lib/raices-criollas";
import { DemoLeadForm } from "../demo-lead-form";
import { RaicesCriollasBoxBuilder, type BuiltBox } from "./raices-criollas-box-builder";
import { RaicesCriollasCart } from "./raices-criollas-cart";
import { RaicesCriollasCatalog } from "./raices-criollas-catalog";
import { RaicesCriollasFooter } from "./raices-criollas-footer";
import { RaicesCriollasHero } from "./raices-criollas-hero";
import { RaicesCriollasNavbar } from "./raices-criollas-navbar";
import "./raices-criollas.css";

export function RaicesCriollasLanding() {
  const cfg = RAICES_CRIOLLAS_CONFIG;
  const [categoryFilter, setCategoryFilter] = useState<RaicesCategoryId | "all">("all");
  const [cart, setCart] = useState<RaicesCartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [waOpen, setWaOpen] = useState(false);
  const [waUrl, setWaUrl] = useState<string | null>(null);

  const cartCount = cart.reduce((s, l) => s + l.quantity, 0);
  const previewTotals = useMemo(() => calcRaicesTotals(cart, "pickup"), [cart]);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2500);
  }, []);

  const addProduct = useCallback(
    (product: RaicesProduct) => {
      const key = `p-${product.id}`;
      setCart((prev) => {
        const ex = prev.find((l) => l.key === key);
        if (ex && ex.kind === "product") {
          return prev.map((l) =>
            l.key === key && l.kind === "product" ? { ...l, quantity: l.quantity + 1 } : l,
          );
        }
        return [
          ...prev,
          {
            kind: "product",
            key,
            productId: product.id,
            name: product.name,
            origin: product.origin,
            unitPrice: product.price,
            quantity: 1,
          },
        ];
      });
      notify(`${product.name} agregado`);
      setCartOpen(true);
    },
    [notify],
  );

  const addBox = useCallback(
    (box: BuiltBox) => {
      const key = `box-${box.sizeId}-${Date.now()}`;
      setCart((prev) => [
        ...prev,
        {
          kind: "box",
          key,
          boxSizeId: box.sizeId,
          boxLabel: box.label,
          items: box.items,
          unitPrice: box.totalPrice,
          quantity: 1,
        },
      ]);
      notify("Caja personalizada agregada");
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

  const handleCheckout = (mode: RaicesDeliveryMode) => {
    const totals = calcRaicesTotals(cart, mode);
    setWaUrl(raicesCartWhatsApp(cart, totals, mode));
    setCartOpen(false);
    setWaOpen(true);
  };

  return (
    <div className="rc-demo min-h-screen bg-stone-50 font-sans text-stone-800 antialiased selection:bg-amber-200">
      <RaicesCriollasNavbar
        cartCount={cartCount}
        cartTotal={previewTotals.total}
        onOpenCart={() => setCartOpen(true)}
        onCategoryNav={(id) => setCategoryFilter(id as RaicesCategoryId)}
      />
      <RaicesCriollasHero />
      <RaicesCriollasCatalog
        categoryFilter={categoryFilter}
        onCategoryFilter={setCategoryFilter}
        onAdd={addProduct}
      />
      <RaicesCriollasBoxBuilder onAddBox={addBox} />
      <RaicesCriollasFooter />

      <DemoLeadForm
        slug={cfg.slug}
        brandLabel={cfg.brand}
        kicker="¿Te gusta esta demo?"
        title="Pulpería premium con armador de cajas"
        sub="Catálogo regional, configurador de regalo y pedido WhatsApp — para tu tienda de campo."
        theme={{
          section: "bg-stone-900 text-stone-100",
          invert: false,
          label: "text-[10px] font-medium uppercase tracking-[0.04em] text-stone-500",
          input:
            "mt-2 w-full rounded-xl border border-stone-600 bg-stone-950 px-4 py-3 text-sm text-white focus:border-amber-600 focus:outline-none",
          focus: "focus:border-amber-600",
          card: "rounded-2xl border border-stone-700 bg-stone-950 p-8",
          button:
            "rounded-full bg-amber-800 px-8 py-3 text-xs font-semibold uppercase tracking-[0.04em] text-amber-50",
        }}
      />

      {toast ? (
        <div className="fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-medium text-amber-900 shadow-lg">
          {toast}
        </div>
      ) : null}

      {waOpen && waUrl ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-stone-900/25 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-stone-200 bg-stone-50 p-8 text-center shadow-xl">
            <button
              type="button"
              onClick={() => setWaOpen(false)}
              className="absolute right-4 top-4 text-stone-400"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
            <CheckCircle2 className="mx-auto h-14 w-14 text-amber-700" />
            <h3 className="mt-4 font-serif text-2xl text-stone-900">¡Pedido listo!</h3>
            <p className="mt-2 text-sm text-stone-500">Enviá el detalle por WhatsApp para atención personalizada</p>
            <Link
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-green-600 py-3.5 text-sm font-semibold uppercase text-white hover:bg-green-500"
            >
              <MessageCircle className="h-5 w-5" />
              Abrir WhatsApp
            </Link>
            <button
              type="button"
              onClick={() => {
                setWaOpen(false);
                setCart([]);
              }}
              className="mt-3 text-xs font-medium text-stone-400"
            >
              Cerrar y vaciar carrito
            </button>
          </div>
        </div>
      ) : null}

      <RaicesCriollasCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={cart}
        onUpdateQty={updateQty}
        onRemove={(key) => setCart((prev) => prev.filter((l) => l.key !== key))}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export function DemoRaicesCriollas() {
  return <RaicesCriollasLanding />;
}
