"use client";

import { CheckCircle2, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  bebidasCartWhatsApp,
  calcCartTotals,
  CENTRAL_BEBIDAS_CONFIG,
  getBebidaProduct,
  type BebidaCartItem,
  type BebidaCombo,
  type BebidaProduct,
  type DeliveryMethod,
  type PurchaseMode,
} from "@/lib/central-bebidas";
import { DemoLeadForm } from "../demo-lead-form";
import { CentralBebidasCart } from "./central-bebidas-cart";
import { CentralBebidasCatalog } from "./central-bebidas-catalog";
import { CentralBebidasCombos } from "./central-bebidas-combos";
import { CentralBebidasFooter } from "./central-bebidas-footer";
import { CentralBebidasHero } from "./central-bebidas-hero";
import { CentralBebidasNavbar } from "./central-bebidas-navbar";
import "./central-bebidas.css";

export function CentralBebidasLanding() {
  const cfg = CENTRAL_BEBIDAS_CONFIG;
  const [mode, setMode] = useState<PurchaseMode>("retail");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<BebidaCartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const previewTotals = useMemo(() => calcCartTotals(cart, mode, "deposito"), [cart, mode]);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2500);
  }, []);

  const addProduct = useCallback(
    (product: BebidaProduct, quantity: number) => {
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
    (combo: BebidaCombo) => {
      setCart((prev) => {
        let next = [...prev];
        combo.items.forEach((it) => {
          const product = getBebidaProduct(it.productId);
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
      notify(`Combo "${combo.name}" agregado`);
      setCartOpen(true);
    },
    [notify],
  );

  const updateQty = useCallback((key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setCart((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const handleCheckout = (delivery: DeliveryMethod) => {
    const totals = calcCartTotals(cart, mode, delivery);
    setWaUrl(bebidasCartWhatsApp(cart, mode, totals, delivery));
    setCartOpen(false);
    setConfirmOpen(true);
  };

  return (
    <div className="cdb-demo min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased selection:bg-lime-500/30">
      <CentralBebidasNavbar
        mode={mode}
        onMode={setMode}
        search={search}
        onSearch={setSearch}
        cartCount={cartCount}
        cartTotal={previewTotals.subtotal}
        onOpenCart={() => setCartOpen(true)}
      />
      <CentralBebidasHero />
      <CentralBebidasCombos onAddCombo={addCombo} />
      <CentralBebidasCatalog mode={mode} search={search} onAdd={addProduct} />
      <CentralBebidasFooter />

      <DemoLeadForm
        slug={cfg.slug}
        brandLabel={cfg.brand}
        kicker="¿Te gusta esta demo?"
        title="Distribuidora B2B/B2C de bebidas"
        sub="Mayorista, combos, carrito WhatsApp y filtros — lista para tu depósito."
        theme={{
          section: "bg-zinc-900 text-zinc-100",
          invert: false,
          label: "text-[10px] font-bold uppercase tracking-[0.04em] text-[color:var(--muted-body)]",
          input:
            "mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white focus:border-lime-500 focus:outline-none",
          focus: "focus:border-lime-500",
          card: "rounded-xl border border-zinc-800 bg-zinc-950 p-8",
          button:
            "rounded-xl bg-lime-500 px-8 py-3 text-xs font-black uppercase tracking-[0.04em] text-zinc-950",
        }}
      />

      {toast ? (
        <div className="fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 rounded-xl border border-lime-500/30 bg-zinc-900 px-4 py-2 text-xs font-bold text-lime-400 shadow-xl">
          {toast}
        </div>
      ) : null}

      {confirmOpen && waUrl ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <button
              type="button"
              onClick={() => setConfirmOpen(false)}
              className="absolute right-4 top-4 text-[color:var(--muted-body)] hover:text-white"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
            <CheckCircle2 className="mx-auto h-14 w-14 text-lime-500" />
            <h3 className="mt-4 text-xl font-black uppercase text-white">Pedido confirmado</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Listo para el depósito. Enviá el detalle por WhatsApp al operario.
            </p>
            <Link
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-black uppercase text-white hover:bg-green-500"
            >
              <MessageCircle className="h-5 w-5" />
              Enviar pedido a WhatsApp
            </Link>
            <button
              type="button"
              onClick={() => {
                setConfirmOpen(false);
                setCart([]);
              }}
              className="mt-4 text-xs font-bold text-[color:var(--muted-body)] hover:text-zinc-300"
            >
              Cerrar y vaciar carrito
            </button>
          </div>
        </div>
      ) : null}

      <CentralBebidasCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        mode={mode}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export function DemoCentralBebidas() {
  return <CentralBebidasLanding />;
}
