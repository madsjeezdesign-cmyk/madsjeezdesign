"use client";

import { CheckCircle2, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  calcGelatoTotals,
  gelatoCartWhatsApp,
  GELATO_CO_CONFIG,
  type DeliveryMode,
  type GelatoCartLine,
  type GelatoFlavor,
  type GelatoSize,
} from "@/lib/gelato-co";
import { DemoLeadForm } from "../demo-lead-form";
import { GelatoCoCart } from "./gelato-co-cart";
import { GelatoCoFlavorPicker } from "./gelato-co-flavor-picker";
import { GelatoCoFooter } from "./gelato-co-footer";
import { GelatoCoHero } from "./gelato-co-hero";
import { GelatoCoNavbar } from "./gelato-co-navbar";
import { GelatoCoSizes } from "./gelato-co-sizes";
import "./gelato-co.css";

export function GelatoCoLanding() {
  const cfg = GELATO_CO_CONFIG;
  const [cart, setCart] = useState<GelatoCartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [pickerSize, setPickerSize] = useState<GelatoSize | null>(null);
  const [activeSizeId, setActiveSizeId] = useState<string | null>(null);
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const cartCount = cart.reduce((s, l) => s + l.quantity, 0);
  const previewTotals = useMemo(() => calcGelatoTotals(cart, "pickup"), [cart]);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2500);
  }, []);

  const openPicker = (size: GelatoSize) => {
    setActiveSizeId(size.id);
    setPickerSize(size);
  };

  const addPot = useCallback(
    (size: GelatoSize, flavors: GelatoFlavor[]) => {
      const key = `${size.id}-${flavors.map((f) => f.id).sort().join("-")}-${Date.now()}`;
      setCart((prev) => [
        ...prev,
        {
          key,
          sizeId: size.id,
          sizeLabel: size.label,
          flavors,
          quantity: 1,
          unitPrice: size.price,
        },
      ]);
      setPickerSize(null);
      notify("Pote agregado al carrito");
      setCartOpen(true);
    },
    [notify],
  );

  const handleWhatsApp = (mode: DeliveryMode) => {
    const totals = calcGelatoTotals(cart, mode);
    setWaUrl(gelatoCartWhatsApp(cart, totals, mode));
    setCartOpen(false);
    setConfirmOpen(true);
  };

  return (
    <div className="gc-demo min-h-screen bg-stone-50 font-sans text-stone-800 antialiased selection:bg-rose-200">
      <GelatoCoNavbar
        cartCount={cartCount}
        cartTotal={previewTotals.total}
        onOpenCart={() => setCartOpen(true)}
      />
      <GelatoCoHero />
      <GelatoCoSizes activeSizeId={activeSizeId} onChoose={openPicker} />
      <GelatoCoFooter />

      <DemoLeadForm
        slug={cfg.slug}
        brandLabel={cfg.brand}
        kicker="¿Te gusta esta demo?"
        title="Heladería con límite de gustos por pote"
        sub="Configurador por tamaño, carrito WhatsApp y cadena de frío — para tu gelatería."
        theme={{
          section: "bg-stone-900 text-stone-100",
          invert: false,
          label: "text-[10px] font-semibold uppercase tracking-widest text-stone-500",
          input:
            "mt-2 w-full rounded-xl border border-stone-600 bg-stone-950 px-4 py-3 text-sm text-white focus:border-rose-400 focus:outline-none",
          focus: "focus:border-rose-400",
          card: "rounded-2xl border border-stone-700 bg-stone-950 p-8",
          button:
            "rounded-full bg-rose-400 px-8 py-3 text-xs font-bold uppercase tracking-widest text-stone-900",
        }}
      />

      {toast ? (
        <div className="fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-rose-600 shadow-lg border border-rose-100">
          {toast}
        </div>
      ) : null}

      {confirmOpen && waUrl ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-stone-900/25 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-xl">
            <button type="button" onClick={() => setConfirmOpen(false)} className="absolute right-4 top-4 text-stone-400" aria-label="Cerrar">
              <X className="h-5 w-5" />
            </button>
            <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
            <h3 className="mt-4 font-serif text-2xl text-stone-900">¡Pedido listo!</h3>
            <p className="mt-2 text-sm text-stone-500">Enviá el detalle al despachador</p>
            <Link
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-full rounded-full bg-green-600 py-3.5 text-sm font-bold uppercase text-white"
            >
              Abrir WhatsApp
            </Link>
            <button
              type="button"
              onClick={() => {
                setConfirmOpen(false);
                setCart([]);
              }}
              className="mt-3 text-xs font-semibold text-stone-400"
            >
              Cerrar y vaciar
            </button>
          </div>
        </div>
      ) : null}

      <GelatoCoFlavorPicker
        size={pickerSize}
        onClose={() => setPickerSize(null)}
        onAdd={(flavors) => pickerSize && addPot(pickerSize, flavors)}
      />

      <GelatoCoCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={cart}
        onRemove={(key) => setCart((prev) => prev.filter((l) => l.key !== key))}
        onWhatsApp={handleWhatsApp}
      />
    </div>
  );
}

export function DemoGelatoCo() {
  return <GelatoCoLanding />;
}
