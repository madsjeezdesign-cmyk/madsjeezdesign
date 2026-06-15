"use client";

import Image from "next/image";
import {
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import {
  ANDREA_MARI_PRODUCTS,
  andreaCartWhatsApp,
  andreaProductWhatsApp,
  formatAndreaPrice,
  type AndreaCartItem,
  type AndreaMariProduct,
} from "@/lib/andrea-mari";

function sizesLabel(sizes: string[]): string {
  return sizes.length > 3
    ? `${sizes.slice(0, 3).join(", ")} +${sizes.length - 3}`
    : sizes.join(", ");
}

type Props = {
  onToast: (msg: string) => void;
};

export function AndreaMariShop({ onToast }: Props) {
  const [cart, setCart] = useState<AndreaCartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const addToCart = useCallback(
    (product: AndreaMariProduct) => {
      setCart((prev) => {
        const existing = prev.find((p) => p.id === product.id);
        if (existing) {
          return prev.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
          );
        }
        return [
          ...prev,
          { ...product, quantity: 1, selectedSize: product.sizes[0] ?? "Consultar" },
        ];
      });
      onToast("¡Agregaste magia a tu carrito! ✨");
      setDrawerOpen(true);
    },
    [onToast],
  );

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const changeQty = useCallback((id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantity: p.quantity + delta } : p))
        .filter((p) => p.quantity > 0),
    );
  }, []);

  const checkoutUrl = useMemo(() => andreaCartWhatsApp(cart), [cart]);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <>
      <section id="nueva-coleccion" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="am-reveal mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.04em] text-[var(--am-accent)]">
                <Sparkles className="h-4 w-4" /> Recién ingresados
              </span>
              <h2 className="mt-3 font-serif text-5xl font-black text-[var(--am-dark)]">
                Nueva Colección
              </h2>
            </div>
            <a
              href="#categorias"
              className="group flex items-center gap-2 text-sm font-bold uppercase tracking-[0.04em] text-[var(--am-primary)] hover:text-[var(--am-dark)]"
            >
              Ver categorías
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {ANDREA_MARI_PRODUCTS.map((product, index) => (
              <article
                key={product.id}
                className="am-product-card am-reveal group flex flex-col"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="relative aspect-[3/4] cursor-pointer overflow-hidden rounded-3xl bg-stone-100 shadow-sm transition-shadow group-hover:shadow-xl">
                  {product.badge ? (
                    <span className="absolute left-4 top-4 z-10 rounded-full bg-[var(--am-primary)] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.04em] text-white am-shadow-glow">
                      {product.badge}
                    </span>
                  ) : product.isNew ? (
                    <span className="absolute left-4 top-4 z-10 rounded-full bg-[var(--am-dark)] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.04em] text-[var(--am-secondary)]">
                      Nuevo
                    </span>
                  ) : null}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="am-product-image object-cover"
                    sizes="(max-width:640px) 100vw, 25vw"
                  />
                  <div className="absolute inset-x-4 bottom-4 translate-y-[120%] transition-transform duration-300 group-hover:translate-y-0">
                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-white/95 py-4 text-sm font-bold uppercase tracking-[0.04em] text-[var(--am-dark)] shadow-lg backdrop-blur transition-colors hover:bg-[var(--am-primary)] hover:text-white"
                    >
                      Lo quiero
                    </button>
                  </div>
                </div>
                <div className="flex flex-1 flex-col px-2 pt-5">
                  <span className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.04em] text-gray-400">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold leading-tight text-[var(--am-dark)]">
                    {product.name}
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-xl font-black">{formatAndreaPrice(product.price)}</span>
                    <span className="rounded-full bg-[var(--am-soft)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.04em] text-[var(--am-primary)]">
                      {sizesLabel(product.sizes)}
                    </span>
                  </div>
                  <a
                    href={andreaProductWhatsApp(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.04em] text-gray-500 underline hover:text-[var(--am-primary)]"
                  >
                    Consultar por WhatsApp
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-28 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[var(--am-dark)] am-shadow-card ring-1 ring-black/5 transition-transform hover:scale-105 md:bottom-8 md:right-24"
        aria-label={`Carrito, ${cartCount} artículos`}
      >
        <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
        {cartCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--am-primary)] px-1 text-[10px] font-bold text-white">
            {cartCount}
          </span>
        ) : null}
      </button>

      <div
        className={`fixed inset-0 z-[70] bg-[var(--am-dark)]/80 backdrop-blur-sm transition-opacity ${
          drawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden={!drawerOpen}
      />

      <aside
        className={`fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-500 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Carrito"
      >
        <div className="flex items-center justify-between border-b border-gray-100 bg-[var(--am-soft)] p-6">
          <h3 className="flex items-center gap-3 font-serif text-2xl font-black text-[var(--am-dark)]">
            <ShoppingBag className="h-6 w-6 text-[var(--am-primary)]" /> Tu carrito
          </h3>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-500 hover:text-[var(--am-primary)]"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-gray-400">
              <p className="text-xl font-bold text-[var(--am-dark)]">Tu carrito está vacío</p>
              <p className="mt-2 text-sm">¡Agregá color y estilo a tu vida!</p>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="mt-6 rounded-full bg-[var(--am-dark)] px-8 py-3 text-xs font-bold uppercase tracking-[0.04em] text-white hover:bg-[var(--am-primary)]"
              >
                Ver colección
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="relative flex gap-4 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
                >
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--am-soft)]">
                    <Image src={item.image} alt="" fill className="object-cover" sizes="96px" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                    <div>
                      <h4 className="pr-8 font-serif font-bold leading-snug text-[var(--am-dark)]">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.04em] text-gray-400">
                        Talle: <span className="text-[var(--am-dark)]">{item.selectedSize}</span>
                      </p>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="flex items-center rounded-full border border-gray-100 bg-gray-50 p-0.5">
                        <button
                          type="button"
                          onClick={() => changeQty(item.id, -1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full font-bold"
                          aria-label="Menos"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => changeQty(item.id, 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full font-bold"
                          aria-label="Más"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-black">
                        {formatAndreaPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-[var(--am-primary)]"
                    aria-label="Quitar"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 ? (
          <div className="border-t border-gray-100 p-6">
            <div className="mb-6 flex justify-between text-xl font-black">
              <span>Total estimado</span>
              <span className="text-[var(--am-primary)]">{formatAndreaPrice(cartTotal)}</span>
            </div>
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 py-4 text-sm font-bold uppercase tracking-[0.04em] text-white shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Pedir por WhatsApp
            </a>
            <p className="mt-4 text-center text-xs text-gray-400">
              Envío y disponibilidad se confirman por chat.
            </p>
          </div>
        ) : null}
      </aside>
    </>
  );
}
