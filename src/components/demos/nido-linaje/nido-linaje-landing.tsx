"use client";

import { Check, Lock, X } from "lucide-react";
import { useCallback, useState } from "react";
import { ScrollReveal } from "@/components/primitives";
import {
  buildCartKey,
  getLinajeUnitPrice,
  LINAJE_COLORS,
  LINAJE_SIZES,
  NIDO_LINAJE_CONFIG,
  type LinajeCartItem,
  type LinajeColor,
  type LinajeProduct,
  type LinajeSize,
} from "@/lib/nido-linaje";
import { DemoLeadForm } from "../demo-lead-form";
import { NidoLinajeCart } from "./nido-linaje-cart";
import { NidoLinajeCatalog } from "./nido-linaje-catalog";
import { NidoLinajeEditorial } from "./nido-linaje-editorial";
import { NidoLinajeHero } from "./nido-linaje-hero";
import { NidoLinajeNavbar } from "./nido-linaje-navbar";
import { NidoLinajeProductModal } from "./nido-linaje-product-modal";
import "./nido-linaje.css";

export function NidoLinajeLanding() {
  const cfg = NIDO_LINAJE_CONFIG;
  const [cart, setCart] = useState<LinajeCartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<LinajeProduct | null>(null);
  const [modalSize, setModalSize] = useState<LinajeSize>(LINAJE_SIZES[1]);
  const [modalColor, setModalColor] = useState<LinajeColor>(LINAJE_COLORS[0]);
  const [modalAdding, setModalAdding] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2800);
  }, []);

  const bumpCart = useCallback(() => {
    setCartBump(true);
    window.setTimeout(() => setCartBump(false), 400);
  }, []);

  const addToCart = useCallback(
    (product: LinajeProduct, size: LinajeSize, color: LinajeColor, onDone?: () => void) => {
      const key = buildCartKey(product.id, size.id, color.id);
      const unitPrice = getLinajeUnitPrice(product.basePrice, size);
      window.setTimeout(() => {
        setCart((prev) => {
          const ex = prev.find((i) => i.key === key);
          if (ex) {
            return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + 1 } : i));
          }
          return [
            ...prev,
            { ...product, key, size, color, unitPrice, quantity: 1 },
          ];
        });
        bumpCart();
        notify(`${product.name} añadido`);
        setCartOpen(true);
        onDone?.();
      }, 650);
    },
    [bumpCart, notify],
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

  const openDetail = (product: LinajeProduct) => {
    setDetailProduct(product);
    setModalSize(LINAJE_SIZES[1]);
    setModalColor(LINAJE_COLORS[0]);
  };

  return (
    <div className="nl-demo min-h-screen bg-white font-sans text-stone-800 antialiased selection:bg-stone-200">
      <NidoLinajeNavbar cartCount={cartCount} cartBump={cartBump} onOpenCart={() => setCartOpen(true)} />
      <NidoLinajeHero />
      <NidoLinajeCatalog
        onOpenDetail={openDetail}
        onAdd={(product, size, color, onDone) => addToCart(product, size, color, onDone)}
      />
      <ScrollReveal as="section">
        <NidoLinajeEditorial />
      </ScrollReveal>

      <footer className="border-t border-stone-100 py-14 text-center">
        <p className="font-serif text-xl font-light text-stone-900">
          {cfg.brand} <span className="text-stone-400">|</span> {cfg.brandSub}
        </p>
        <p className="mt-3 text-[10px] uppercase tracking-[0.04em] text-stone-400">
          © {new Date().getFullYear()} — Demo interactiva couture
        </p>
      </footer>

      <DemoLeadForm
        slug={cfg.slug}
        brandLabel={`${cfg.brand} ${cfg.brandSub}`}
        kicker="¿Te gusta esta demo?"
        title="E-commerce de blanquería ultra premium"
        sub="Catálogo con variantes, carrito lateral y checkout de lujo — adaptamos a tu marca."
        theme={{
          section: "bg-stone-900 text-stone-100",
          invert: false,
          label: "text-[10px] font-medium uppercase tracking-[0.04em] text-stone-500",
          input:
            "mt-2 w-full rounded-sm border border-stone-700 bg-stone-950 px-4 py-3 text-sm text-white focus:border-stone-400 focus:outline-none",
          focus: "focus:border-stone-400",
          card: "rounded-sm border border-stone-700 bg-stone-950 p-8",
          button:
            "rounded-sm bg-white px-8 py-3 text-[10px] font-medium uppercase tracking-[0.04em] text-stone-900",
        }}
      />

      {toast ? (
        <div className="fixed bottom-8 left-1/2 z-[70] -translate-x-1/2 rounded-sm border border-stone-200 bg-white px-6 py-3 text-xs font-medium uppercase tracking-[0.04em] text-stone-700 shadow-lg">
          {toast}
        </div>
      ) : null}

      {paymentOpen ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-stone-900/30 p-4 backdrop-blur-sm">
          <div className="nl-fade-in relative w-full max-w-md rounded-sm border border-stone-100 bg-white p-10 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setPaymentOpen(false)}
              className="absolute right-4 top-4 text-stone-400 hover:text-stone-800"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-700">
              <Lock className="h-6 w-6" strokeWidth={1.25} />
            </span>
            <h3 className="mt-6 font-serif text-2xl font-light text-stone-900">Pago seguro procesado</h3>
            <p className="mt-3 text-sm font-light text-stone-500">
              Simulación de pasarela premium. Tu pedido ha sido registrado con éxito.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-stone-600">
              <Check className="h-4 w-4 text-green-700" />
              Transacción cifrada SSL · Demo
            </div>
            <button
              type="button"
              onClick={() => {
                setPaymentOpen(false);
                setCart([]);
              }}
              className="mt-8 w-full rounded-sm bg-stone-900 py-3.5 text-[10px] font-medium uppercase tracking-[0.04em] text-white"
            >
              Continuar comprando
            </button>
          </div>
        </div>
      ) : null}

      <NidoLinajeProductModal
        product={detailProduct}
        size={modalSize}
        color={modalColor}
        onSize={setModalSize}
        onColor={setModalColor}
        onClose={() => setDetailProduct(null)}
        adding={modalAdding}
        onAdd={() => {
          if (!detailProduct) return;
          setModalAdding(true);
          addToCart(detailProduct, modalSize, modalColor, () => {
            setModalAdding(false);
            setDetailProduct(null);
          });
        }}
      />

      <NidoLinajeCart
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

export function DemoNidoLinaje() {
  return <NidoLinajeLanding />;
}
