"use client";

import { CheckCircle2, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import {
  MASA_MADRE_CONFIG,
  type BakeryCartItem,
  type BakeryProduct,
} from "@/lib/masa-madre-co";
import { DemoLeadForm } from "../demo-lead-form";
import { MasaMadreCoCart } from "./masa-madre-co-cart";
import { MasaMadreCoContact } from "./masa-madre-co-contact";
import { MasaMadreCoHero } from "./masa-madre-co-hero";
import { MasaMadreCoMenu } from "./masa-madre-co-menu";
import { MasaMadreCoNavbar } from "./masa-madre-co-navbar";
import { MasaMadreCoOven } from "./masa-madre-co-oven";
import "./masa-madre-co.css";

export function MasaMadreCoLanding() {
  const cfg = MASA_MADRE_CONFIG;
  const [cart, setCart] = useState<BakeryCartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [waModal, setWaModal] = useState<string | null>(null);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2800);
  }, []);

  const addToCart = useCallback(
    (product: BakeryProduct, quantity: number) => {
      const key = String(product.id);
      setCart((prev) => {
        const ex = prev.find((i) => i.key === key);
        if (ex) {
          return prev.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + quantity } : i,
          );
        }
        return [...prev, { ...product, key, quantity }];
      });
      notify(`${quantity}x ${product.name} en el carrito 🥐`);
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

  return (
    <div className="mmc-demo min-h-screen bg-stone-100 font-sans text-stone-800 antialiased selection:bg-orange-200">
      <MasaMadreCoNavbar cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <MasaMadreCoHero />
      <MasaMadreCoOven />
      <MasaMadreCoMenu onAdd={addToCart} />
      <MasaMadreCoContact />

      <footer className="border-t border-stone-200 bg-orange-50/50 py-10 text-center text-xs text-stone-500">
        <p className="font-serif text-lg font-bold text-orange-900">{cfg.brand}</p>
        <p className="mt-2">{cfg.addressLines.join(" · ")}</p>
        <p className="mt-6">© {new Date().getFullYear()} {cfg.brand} — Demo interactiva</p>
      </footer>

      <DemoLeadForm
        slug={cfg.slug}
        brandLabel={cfg.brand}
        kicker="¿Te gusta esta demo?"
        title="Panadería con pedidos y horno en vivo"
        sub="Menú por categorías, carrito WhatsApp y tablero del horno — listo para tu negocio."
        theme={{
          section: "bg-stone-900 text-stone-100",
          invert: false,
          label: "text-[10px] font-bold uppercase tracking-widest text-stone-500",
          input:
            "mt-2 w-full rounded-xl border border-stone-700 bg-stone-950 px-4 py-3 text-sm text-white focus:border-orange-500 focus:outline-none",
          focus: "focus:border-orange-500",
          card: "rounded-3xl border border-stone-700 bg-stone-950 p-8",
          button:
            "rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-8 py-3 text-xs font-bold uppercase tracking-widest text-white",
        }}
      />

      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-xl border border-orange-200 bg-white px-5 py-3 text-sm font-bold text-orange-800 shadow-xl">
          {toast}
        </div>
      ) : null}

      {waModal ? (
        <div className="fixed inset-0 z-[85] flex items-center justify-center bg-stone-900/60 p-4 backdrop-blur-sm">
          <div className="relative mmc-animate-in w-full max-w-md rounded-2xl border border-orange-200 bg-white p-8 text-center shadow-2xl">
            <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
            <h3 className="mt-4 font-serif text-2xl font-bold text-stone-900">¡Pedido listo!</h3>
            <p className="mt-3 text-sm text-stone-600">
              Abrí WhatsApp para enviar el detalle de tu compra a {cfg.brand}. En producción, esto
              se envía automáticamente.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={waModal}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-xs font-black uppercase tracking-widest text-white hover:bg-green-700"
              >
                <MessageCircle className="h-5 w-5" />
                Abrir WhatsApp
              </Link>
              <button
                type="button"
                onClick={() => {
                  setWaModal(null);
                  setCart([]);
                }}
                className="text-xs font-bold text-stone-500 hover:text-stone-800"
              >
                Cerrar y vaciar carrito
              </button>
            </div>
            <button
              type="button"
              onClick={() => setWaModal(null)}
              className="absolute right-4 top-4 text-stone-400 hover:text-stone-700"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : null}

      <MasaMadreCoCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onCheckout={(url) => {
          setCartOpen(false);
          setWaModal(url);
        }}
      />
    </div>
  );
}

export function DemoMasaMadreCo() {
  return <MasaMadreCoLanding />;
}
