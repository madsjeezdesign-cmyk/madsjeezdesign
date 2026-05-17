"use client";

import { ShoppingBag, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import type { RetailFashionConfig, RetailFashionProduct } from "@/lib/retail-fashion-demos";
import {
  whatsappCartUrl,
  whatsappGeneralUrl,
  whatsappProductUrl,
} from "@/lib/fashion-whatsapp";
import { FashionPhoto } from "./fashion-photo";

type Props = {
  config: RetailFashionConfig;
};

export function FashionShop({ config }: Props) {
  const [cart, setCart] = useState<RetailFashionProduct[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const cartCount = cart.length;

  const addToCart = useCallback((product: RetailFashionProduct) => {
    setCart((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
    setDrawerOpen(true);
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const checkoutUrl = useMemo(
    () => (cartCount > 0 ? whatsappCartUrl(config, cart) : whatsappGeneralUrl(config)),
    [cart, cartCount, config],
  );

  return (
    <>
      <section id="shop" className="bg-[#fafafa] py-32">
        <div className="mx-auto max-w-[90%]">
          <div className="rf-reveal mb-16 flex flex-col items-center text-center md:mb-20">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.35em] text-gray-500">
              {config.seasonBadge}
            </p>
            <h2 className="font-serif text-5xl tracking-tighter text-black md:text-7xl">
              {config.shopTitle}
            </h2>
            <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-gray-600">
              {config.shopSubtitle}
            </p>
            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Agregá al carrito · Comprá por WhatsApp
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {config.products.map((product, index) => (
              <article
                key={product.id}
                className="rf-reveal group flex flex-col overflow-hidden border border-black/5 bg-white"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                  <FashionPhoto
                    src={product.image}
                    fallbackSrc={product.fallbackImage}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  />
                  {product.badge ? (
                    <span className="absolute left-3 top-3 bg-black px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white">
                      {product.badge}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-lg italic leading-snug text-black">{product.name}</h3>
                  {product.sizeHint ? (
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-400">
                      {product.sizeHint}
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm font-medium text-black">{product.price}</p>

                  <div className="mt-auto flex flex-col gap-2 pt-5">
                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="flex w-full items-center justify-center gap-2 border border-black bg-black py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" aria-hidden />
                      Agregar al carrito
                    </button>
                    <a
                      href={whatsappProductUrl(config, product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center border border-black/20 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition-colors hover:border-black"
                    >
                      Comprar por WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-28 right-8 z-50 flex h-14 w-14 items-center justify-center bg-white text-black shadow-xl ring-1 ring-black/10 transition-transform hover:scale-105 md:bottom-8 md:right-28"
        aria-label={`Carrito, ${cartCount} artículos`}
      >
        <ShoppingBag className="h-5 w-5" strokeWidth={1.25} />
        {cartCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
            {cartCount}
          </span>
        ) : null}
      </button>

      <div
        className={`fixed inset-0 z-[70] bg-black/40 transition-opacity duration-500 ${
          drawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden={!drawerOpen}
      />

      <aside
        className={`fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Carrito de compras"
      >
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <h3 className="font-serif text-2xl tracking-tight">Votre panier</h3>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="p-2 text-black/60 hover:text-black"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" strokeWidth={1} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <p className="py-12 text-center text-sm text-gray-500">
              Tu carrito está vacío. Elegí prendas de la colección {config.seasonBadge}.
            </p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-4 border-b border-black/5 pb-4">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-stone-100">
                    <FashionPhoto
                      src={item.image}
                      fallbackSrc={item.fallbackImage}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-sm italic leading-snug">{item.name}</p>
                    <p className="mt-1 text-xs text-gray-500">{item.price}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-black"
                      >
                        Quitar
                      </button>
                      <a
                        href={whatsappProductUrl(config, item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold uppercase tracking-wider text-black underline"
                      >
                        Solo esta
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-black/10 p-6">
          <p className="mb-4 text-center text-[10px] uppercase tracking-[0.2em] text-gray-500">
            {cartCount} {cartCount === 1 ? "artículo" : "artículos"} · Envío por WhatsApp
          </p>
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 bg-[#25D366] py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90"
          >
            <MessageCircleIcon />
            Finalizar en WhatsApp
          </a>
          {config.phoneDisplay ? (
            <p className="mt-3 text-center text-xs text-gray-500">
              También: {config.phoneDisplay}
            </p>
          ) : null}
        </div>
      </aside>
    </>
  );
}

function MessageCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
