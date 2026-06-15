"use client";

import { CheckCircle2, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  buildCartLineKey,
  burgerCartWhatsApp,
  BURGER_LAB_CONFIG,
  type BurgerCartLine,
  type BurgerExtra,
  type BurgerProduct,
  type DeliveryMode,
} from "@/lib/burger-lab";
import { DemoLeadForm } from "../demo-lead-form";
import { BurgerLabCart } from "./burger-lab-cart";
import { BurgerLabCustomizeModal } from "./burger-lab-customize-modal";
import { BurgerLabFooter } from "./burger-lab-footer";
import { BurgerLabHero } from "./burger-lab-hero";
import { BurgerLabMenu } from "./burger-lab-menu";
import { BurgerLabNavbar } from "./burger-lab-navbar";
import "./burger-lab.css";

export function BurgerLabLanding() {
  const cfg = BURGER_LAB_CONFIG;
  const [cart, setCart] = useState<BurgerCartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [customizeProduct, setCustomizeProduct] = useState<BurgerProduct | null>(null);
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const cartCount = cart.reduce((s, l) => s + l.quantity, 0);
  const cartSubtotal = useMemo(
    () => cart.reduce((s, l) => s + l.unitPrice * l.quantity, 0),
    [cart],
  );

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2500);
  }, []);

  const addLine = useCallback(
    (product: BurgerProduct, payload: {
      comboId: string;
      comboLabel: string;
      comboAdd: number;
      extras: BurgerExtra[];
      unitPrice: number;
    }) => {
      const key = buildCartLineKey(
        product.id,
        payload.comboId,
        payload.extras.map((e) => e.id),
      );
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
            image: product.image,
            quantity: 1,
            comboId: payload.comboId,
            comboLabel: payload.comboLabel,
            comboAdd: payload.comboAdd,
            extras: payload.extras,
            unitPrice: payload.unitPrice,
          },
        ];
      });
      notify("Agregado al carrito 🔥");
      setCartOpen(true);
    },
    [notify],
  );

  const addSimple = useCallback(
    (product: BurgerProduct) => {
      addLine(product, {
        comboId: "solo",
        comboLabel: "Simple",
        comboAdd: 0,
        extras: [],
        unitPrice: product.basePrice,
      });
    },
    [addLine],
  );

  const handleWhatsApp = (mode: DeliveryMode) => {
    const shipping = mode === "delivery" ? cfg.deliveryFee : 0;
    const subtotal = cart.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
    const url = burgerCartWhatsApp(cart, { subtotal, shipping, total: subtotal + shipping }, mode);
    setWaUrl(url);
    setCartOpen(false);
    setConfirmOpen(true);
  };

  return (
    <div className="bl-demo min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased selection:bg-amber-500/30">
      <BurgerLabNavbar cartCount={cartCount} cartTotal={cartSubtotal} onOpenCart={() => setCartOpen(true)} />
      <BurgerLabHero />
      <BurgerLabMenu
        onSelectProduct={setCustomizeProduct}
        onAddSimple={addSimple}
      />
      <BurgerLabFooter />

      <DemoLeadForm
        slug={cfg.slug}
        brandLabel={cfg.brand}
        kicker="¿Te gusta esta demo?"
        title="Hamburguesería smash con armado de burger"
        sub="Modal de extras, carrito WhatsApp y menú por categorías — listo para tu local."
        theme={{
          section: "bg-zinc-900 text-zinc-100",
          invert: false,
          label: "text-[10px] font-black uppercase tracking-widest text-[color:var(--muted-body)]",
          input:
            "mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none",
          focus: "focus:border-amber-500",
          card: "rounded-xl border border-zinc-800 bg-zinc-950 p-8",
          button:
            "rounded-xl bg-amber-500 px-8 py-3 text-xs font-black uppercase tracking-widest text-zinc-950",
        }}
      />

      {toast ? (
        <div className="fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-bold text-amber-400 border border-amber-500/30">
          {toast}
        </div>
      ) : null}

      {confirmOpen && waUrl ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4">
          <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <button
              type="button"
              onClick={() => setConfirmOpen(false)}
              className="absolute right-4 top-4 text-[color:var(--muted-body)]"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
            <CheckCircle2 className="mx-auto h-14 w-14 text-green-500" />
            <h3 className="mt-4 text-xl font-black uppercase text-white">¡Pedido listo!</h3>
            <p className="mt-2 text-sm text-zinc-400">Enviá el detalle a cocina por WhatsApp</p>
            <Link
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-full rounded-xl bg-green-600 py-3.5 text-sm font-black uppercase text-white"
            >
              Abrir WhatsApp
            </Link>
            <button
              type="button"
              onClick={() => {
                setConfirmOpen(false);
                setCart([]);
              }}
              className="mt-3 text-xs font-bold text-[color:var(--muted-body)]"
            >
              Cerrar y vaciar
            </button>
          </div>
        </div>
      ) : null}

      <BurgerLabCustomizeModal
        product={customizeProduct}
        onClose={() => setCustomizeProduct(null)}
        onAdd={(payload) => customizeProduct && addLine(customizeProduct, payload)}
      />

      <BurgerLabCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={cart}
        onRemove={(key) => setCart((prev) => prev.filter((l) => l.key !== key))}
        onWhatsApp={handleWhatsApp}
      />
    </div>
  );
}

export function DemoBurgerLab() {
  return <BurgerLabLanding />;
}
