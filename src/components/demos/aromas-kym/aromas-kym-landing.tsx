"use client";

import { Check, Lock, X } from "lucide-react";
import { useCallback, useState } from "react";
import {
  AROMAS_KYM_CONFIG,
  type AKAromaFamily,
  type AKCartItem,
  type AKCategoryId,
  type AKProduct,
} from "@/lib/aromas-kym";
import { DemoLeadForm } from "../demo-lead-form";
import { AromasKymCartDrawer } from "./aromas-kym-cart-drawer";
import { AromasKymCategorias } from "./aromas-kym-categorias";
import { AromasKymColeccion } from "./aromas-kym-coleccion";
import { AromasKymDestacados } from "./aromas-kym-destacados";
import { AromasKymFooter } from "./aromas-kym-footer";
import { AromasKymHero } from "./aromas-kym-hero";
import { AromasKymNavbar } from "./aromas-kym-navbar";
import { AromasKymNewsletter } from "./aromas-kym-newsletter";
import { AromasKymStorytelling } from "./aromas-kym-storytelling";
import "./aromas-kym.css";

export function AromasKymLanding() {
  const cfg = AROMAS_KYM_CONFIG;
  const [cart, setCart] = useState<AKCartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [externalCategory, setExternalCategory] = useState<AKCategoryId | "all">("all");

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  }, []);

  const bumpCart = useCallback(() => {
    setCartBump(true);
    window.setTimeout(() => setCartBump(false), 420);
  }, []);

  const addToCart = useCallback(
    (product: AKProduct) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      bumpCart();
      notify(`${product.name.split(" · ")[0]} sumado al carrito`);
      setCartOpen(true);
    },
    [bumpCart, notify]
  );

  const updateQty = useCallback((id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  // Navbar category selection — typed-safe pass-through
  const handleSelectCategory = (raw: string) => {
    // allow only known category ids
    const valid = ["velas", "sahumerios", "difusores", "esencias", "insumos"] as const;
    if ((valid as readonly string[]).includes(raw)) {
      setExternalCategory(raw as AKCategoryId);
    } else {
      setExternalCategory("all");
    }
  };

  return (
    <div className="ak-demo min-h-screen font-sans antialiased">
      <AromasKymNavbar
        cartCount={cartCount}
        cartBump={cartBump}
        onOpenCart={() => setCartOpen(true)}
        onSelectCategory={handleSelectCategory}
      />

      <AromasKymHero />
      <AromasKymCategorias onSelectCategory={handleSelectCategory} />
      <AromasKymDestacados onAdd={addToCart} />
      <AromasKymStorytelling />
      <AromasKymColeccion onAdd={addToCart} externalCategory={externalCategory} />
      <AromasKymNewsletter />

      {/* Lead form — kept consistent with other premium demos */}
      <DemoLeadForm
        slug={cfg.slug}
        brandLabel={cfg.brand}
        kicker="¿Te gusta esta demo?"
        title="E-commerce editorial de aromaterapia & insumos"
        sub="Catálogo curado, storytelling de marca, filtros por familia aromática y checkout limpio — adaptamos a tu marca."
        theme={{
          section: "bg-[#1c1814] text-[#fbf8f1]",
          invert: false,
          label:
            "text-[10px] font-medium uppercase tracking-[0.04em] text-[#fbf8f1]/55 font-mono",
          input:
            "mt-2 w-full rounded-full border border-[#fbf8f1]/20 bg-[#fbf8f1]/5 px-5 py-3 text-sm text-[#fbf8f1] placeholder:text-[#fbf8f1]/40 focus:border-[#b85a3c] focus:outline-none",
          focus: "focus:border-[#b85a3c]",
          card: "rounded-sm border border-[#fbf8f1]/15 bg-[#fbf8f1]/[0.03] p-8",
          button:
            "rounded-full bg-[#b85a3c] px-8 py-3 text-[10px] font-medium uppercase tracking-[0.04em] text-[#fbf8f1] hover:bg-[#9c4828] font-mono",
        }}
      />

      <AromasKymFooter />

      {/* Toast */}
      {toast ? (
        <div
          className="fixed bottom-8 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-[#e8e1d4] bg-[#fbf8f1] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.04em] text-[#5a4e44] shadow-[0_12px_40px_rgba(28,24,20,0.18)]"
          role="status"
          aria-live="polite"
        >
          {toast}
        </div>
      ) : null}

      {/* Payment confirmation modal (demo) */}
      {paymentOpen ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#1c1814]/45 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-sm border border-[#e8e1d4] bg-[#fbf8f1] p-10 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setPaymentOpen(false)}
              className="absolute right-4 top-4 text-[#8d8074] transition hover:text-[#1c1814]"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#b85a3c]/10 text-[#b85a3c]">
              <Lock className="h-6 w-6" strokeWidth={1.25} />
            </span>
            <h3
              className="mt-6 text-[#1c1814]"
              style={{
                fontFamily: "var(--ak-serif)",
                fontStyle: "italic",
                fontSize: "1.75rem",
                lineHeight: 1.1,
              }}
            >
              Pago seguro procesado.
            </h3>
            <p className="mt-3 text-sm text-[#5a4e44]">
              Simulación de pasarela. Tu pedido se registró con éxito y vas a recibir
              un mail con el tracking apenas despachemos.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.04em] text-[#5a4e44]">
              <Check className="h-4 w-4 text-[#7d8e6f]" />
              SSL · Demo
            </div>
            <button
              type="button"
              onClick={() => {
                setPaymentOpen(false);
                setCart([]);
              }}
              className="mt-8 w-full rounded-full bg-[#1c1814] py-3.5 font-mono text-[10px] uppercase tracking-[0.04em] text-[#fbf8f1] transition hover:bg-[#b85a3c]"
            >
              Seguir comprando
            </button>
          </div>
        </div>
      ) : null}

      <AromasKymCartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onCheckout={() => {
          setCartOpen(false);
          setPaymentOpen(true);
        }}
      />
    </div>
  );
}

export function DemoAromasKym() {
  return <AromasKymLanding />;
}
