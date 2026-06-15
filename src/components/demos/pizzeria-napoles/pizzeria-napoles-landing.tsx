"use client";

import { CheckCircle2, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  calcCartTotals,
  countEmpanadas,
  napolesCartWhatsApp,
  PIZZERIA_NAPOLES_CONFIG,
  type DeliveryMode,
  type HalfFlavor,
  type NapolesCartLine,
  type NapolesProduct,
} from "@/lib/pizzeria-napoles";
import { DemoLeadForm } from "../demo-lead-form";
import { PizzeriaNapolesCart } from "./pizzeria-napoles-cart";
import { PizzeriaNapolesFooter } from "./pizzeria-napoles-footer";
import { PizzeriaNapolesHero } from "./pizzeria-napoles-hero";
import { PizzeriaNapolesMenu } from "./pizzeria-napoles-menu";
import { PizzeriaNapolesNavbar } from "./pizzeria-napoles-navbar";
import "./pizzeria-napoles.css";

export function PizzeriaNapolesLanding() {
  const cfg = PIZZERIA_NAPOLES_CONFIG;
  const [cart, setCart] = useState<NapolesCartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const previewTotals = useMemo(() => calcCartTotals(cart, "takeaway"), [cart]);
  const cartCount = cart.reduce((s, l) => s + l.quantity, 0);
  const empanadaInCart = countEmpanadas(cart);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2500);
  }, []);

  const addProduct = useCallback(
    (p: NapolesProduct) => {
      const key = `p-${p.id}`;
      setCart((prev) => {
        const ex = prev.find((l) => l.key === key && l.kind === "product");
        if (ex && ex.kind === "product") {
          return prev.map((l) => (l.key === key && l.kind === "product" ? { ...l, quantity: l.quantity + 1 } : l));
        }
        return [
          ...prev,
          {
            kind: "product",
            key,
            productId: p.id,
            name: p.name,
            quantity: 1,
            unitPrice: p.price,
          },
        ];
      });
      notify(`${p.name} agregada`);
      setCartOpen(true);
    },
    [notify],
  );

  const addHalf = useCallback(
    (halfA: HalfFlavor, halfB: HalfFlavor, unitPrice: number) => {
      const key = `half-${halfA.id}-${halfB.id}`;
      setCart((prev) => {
        const ex = prev.find((l) => l.key === key && l.kind === "half");
        if (ex && ex.kind === "half") {
          return prev.map((l) => (l.key === key && l.kind === "half" ? { ...l, quantity: l.quantity + 1 } : l));
        }
        return [
          ...prev,
          { kind: "half", key, halfA, halfB, quantity: 1, unitPrice },
        ];
      });
      notify(`Pizza ${halfA.name}/${halfB.name} agregada`);
      setCartOpen(true);
    },
    [notify],
  );

  const addEmpanadas = useCallback(
    (p: NapolesProduct, qty: number) => {
      const key = `emp-${p.id}`;
      setCart((prev) => {
        const ex = prev.find((l) => l.key === key && l.kind === "empanada");
        if (ex && ex.kind === "empanada") {
          return prev.map((l) =>
            l.key === key && l.kind === "empanada" ? { ...l, quantity: l.quantity + qty } : l,
          );
        }
        return [
          ...prev,
          {
            kind: "empanada",
            key,
            productId: p.id,
            name: p.name,
            quantity: qty,
            unitPrice: p.price,
          },
        ];
      });
      notify(`${qty}x ${p.name}`);
      setCartOpen(true);
    },
    [notify],
  );

  const handleWhatsApp = (mode: DeliveryMode) => {
    const totals = calcCartTotals(cart, mode);
    setWaUrl(napolesCartWhatsApp(cart, totals, mode));
    setCartOpen(false);
    setConfirmOpen(true);
  };

  return (
    <div className="pn-demo min-h-screen bg-zinc-900 font-sans text-stone-200 antialiased selection:bg-red-500/30">
      <PizzeriaNapolesNavbar
        cartCount={cartCount}
        cartTotal={previewTotals.total}
        onOpenCart={() => setCartOpen(true)}
      />
      <PizzeriaNapolesHero />
      <PizzeriaNapolesMenu
        empanadaTotalInCart={empanadaInCart}
        onAddProduct={addProduct}
        onAddHalf={addHalf}
        onAddEmpanadas={addEmpanadas}
      />
      <PizzeriaNapolesFooter />

      <DemoLeadForm
        slug={cfg.slug}
        brandLabel={cfg.brand}
        kicker="¿Te gusta esta demo?"
        title="Pizzería con mitades y docena de empanadas"
        sub="Menú por categorías, pizza mitad/mitad, WhatsApp y descuento por 12 empanadas."
        theme={{
          section: "bg-zinc-950 text-stone-100",
          invert: false,
          label: "text-[10px] font-bold uppercase tracking-[0.04em] text-stone-500",
          input:
            "mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white focus:border-red-500 focus:outline-none",
          focus: "focus:border-red-500",
          card: "rounded-xl border border-zinc-800 bg-zinc-900 p-8",
          button:
            "rounded-xl bg-red-600 px-8 py-3 text-xs font-bold uppercase tracking-[0.04em] text-white",
        }}
      />

      {toast ? (
        <div className="fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 rounded-xl border border-red-500/40 bg-zinc-800 px-4 py-2 text-xs font-bold text-red-300">
          {toast}
        </div>
      ) : null}

      {confirmOpen && waUrl ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4">
          <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <button
              type="button"
              onClick={() => setConfirmOpen(false)}
              className="absolute right-4 top-4 text-stone-500"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
            <CheckCircle2 className="mx-auto h-14 w-14 text-green-500" />
            <h3 className="mt-4 text-xl font-serif text-stone-100">¡Pedido al horno!</h3>
            <p className="mt-2 text-sm text-stone-400">Enviá el detalle por WhatsApp</p>
            <Link
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-full rounded-xl bg-green-600 py-3.5 text-sm font-bold uppercase text-white"
            >
              Abrir WhatsApp
            </Link>
            <button
              type="button"
              onClick={() => {
                setConfirmOpen(false);
                setCart([]);
              }}
              className="mt-3 text-xs font-bold text-stone-500"
            >
              Cerrar y vaciar
            </button>
          </div>
        </div>
      ) : null}

      <PizzeriaNapolesCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={cart}
        onRemove={(key) => setCart((prev) => prev.filter((l) => l.key !== key))}
        onWhatsApp={handleWhatsApp}
      />
    </div>
  );
}

export function DemoPizzeriaNapoles() {
  return <PizzeriaNapolesLanding />;
}
