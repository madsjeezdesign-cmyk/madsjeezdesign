"use client";

import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import type { DemoShopConfig, DemoShopProduct } from "@/lib/demo-assets";
import { demoContainer, demoSection } from "./demo-layout";

type Props = {
  slug: string;
  shop: DemoShopConfig;
  headingClass?: string;
  cardClass?: string;
  accentClass?: string;
  /** Salón / demos con fondo claro (ej. estética) */
  light?: boolean;
};

export function DemoShopFlow({
  slug,
  shop,
  headingClass = "",
  cardClass = "border border-white/10 bg-zinc-900/50",
  accentClass = "bg-[#1de0b1] text-black",
  light = false,
}: Props) {
  const [qty, setQty] = useState<Record<string, number>>(() =>
    Object.fromEntries(shop.products.map((p) => [p.id, 0])),
  );
  const layout = shop.layout ?? "grid";
  const shopEyebrow = shop.eyebrow ?? "E-commerce demo";
  const [step, setStep] = useState<"browse" | "cart" | "done">("browse");

  const lineItems = useMemo(() => {
    const lines: { p: DemoShopProduct; q: number }[] = [];
    for (const p of shop.products) {
      const q = qty[p.id] ?? 0;
      if (q > 0) lines.push({ p, q });
    }
    return lines;
  }, [qty, shop.products]);

  const totalUnits = lineItems.reduce((s, x) => s + x.q, 0);

  function bump(id: string, delta: number) {
    setQty((prev) => {
      const n = Math.max(0, (prev[id] ?? 0) + delta);
      return { ...prev, [id]: n };
    });
  }

  function fakePay() {
    setStep("done");
  }

  const h = light ? "text-stone-900" : "text-white";
  const sub = light ? "text-stone-600" : "text-zinc-500";
  const btnGhost = light
    ? "border border-stone-300 bg-white text-stone-800 hover:bg-stone-100"
    : "border border-white/15 bg-white/5 text-white hover:bg-white/10";
  const productTitle = light ? "text-stone-900" : "text-white";
  const priceCol = light ? "text-amber-800" : "text-[#1de0b1]";
  const noteCol = light ? "text-stone-500" : "text-zinc-500";
  const innerBtn = light ? "text-stone-600 hover:bg-stone-100 hover:text-stone-900" : "text-zinc-400 hover:bg-white/10 hover:text-white";
  const countBg = light ? "border border-stone-200 bg-white" : "border border-white/10 bg-black/30";
  const cartUl = light ? "border-y border-stone-200" : "border-y border-white/10";

  const productChrome = (p: DemoShopProduct) => (
    <>
      <p className={`font-bold ${productTitle}`}>{p.name}</p>
      <p className={`mt-1 text-sm font-semibold ${priceCol}`}>{p.price}</p>
      {p.note ? <p className={`mt-1 text-xs ${noteCol}`}>{p.note}</p> : null}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className={`flex items-center gap-2 rounded-lg p-1 ${countBg}`}>
          <button
            type="button"
            aria-label="Menos"
            className={`rounded-md p-1.5 ${innerBtn}`}
            onClick={() => bump(p.id, -1)}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className={`min-w-[2ch] text-center text-sm font-bold ${productTitle}`}>{qty[p.id] ?? 0}</span>
          <button
            type="button"
            aria-label="Más"
            className={`rounded-md p-1.5 ${innerBtn}`}
            onClick={() => bump(p.id, 1)}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => bump(p.id, 1)}
          className={`rounded-lg px-3 py-2 text-[10px] font-black uppercase tracking-wide ${accentClass}`}
        >
          Agregar
        </button>
      </div>
    </>
  );

  const browseGrid = (
    <div className="mt-10 grid gap-4 md:grid-cols-3">
      {shop.products.map((p) => (
        <div key={p.id} className={`flex min-h-[220px] flex-col rounded-2xl p-6 ${cardClass}`}>
          <div className="flex flex-1 flex-col justify-between">{productChrome(p)}</div>
        </div>
      ))}
    </div>
  );

  const browseList = (
    <div className="mt-10 space-y-4">
      {shop.products.map((p) => (
        <div
          key={p.id}
          className={`flex flex-col gap-5 rounded-2xl p-5 md:flex-row md:items-stretch ${cardClass}`}
        >
          <div
            className={`h-3 w-full shrink-0 rounded-lg md:h-auto md:w-3 ${light ? "bg-stone-200" : "bg-gradient-to-b from-white/20 to-white/5"}`}
          />
          <div className="min-w-0 flex-1">{productChrome(p)}</div>
        </div>
      ))}
    </div>
  );

  const browseFeatured =
    shop.products.length >= 1 ? (
      <div className="mt-10 grid gap-4 md:grid-cols-2 md:grid-rows-2">
        <div className={`rounded-2xl p-8 md:row-span-2 ${cardClass}`}>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${sub}`}>Destacado</p>
          {productChrome(shop.products[0]!)}
        </div>
        {shop.products.slice(1).map((p) => (
          <div key={p.id} className={`rounded-2xl p-6 ${cardClass}`}>
            {productChrome(p)}
          </div>
        ))}
      </div>
    ) : (
      browseGrid
    );

  const browseMinimal = (
    <div className="mx-auto mt-10 max-w-md space-y-4">
      {shop.products.map((p) => (
        <div key={p.id} className={`rounded-3xl px-5 py-5 ${cardClass}`}>
          {productChrome(p)}
        </div>
      ))}
    </div>
  );

  const browseBento = (
    <div className="mt-10 grid gap-3 sm:grid-cols-4 sm:grid-rows-2">
      {shop.products.map((p, i) => {
        const span =
          i === 0 ? "sm:col-span-2 sm:row-span-2" : i === 1 ? "sm:col-span-2" : "sm:col-span-2";
        return (
          <div key={p.id} className={`rounded-2xl p-6 ${span} ${cardClass}`}>
            {productChrome(p)}
          </div>
        );
      })}
    </div>
  );

  const browseUi =
    layout === "list"
      ? browseList
      : layout === "featured"
        ? browseFeatured
        : layout === "minimal"
          ? browseMinimal
          : layout === "bento"
            ? browseBento
            : browseGrid;

  return (
    <section className={`${demoSection} ${light ? "bg-[#f5f0e8]" : ""}`} id={`shop-${slug}`}>
      <div className={demoContainer}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${light ? "text-stone-500" : "text-zinc-500"}`}>
              {shopEyebrow}
            </p>
            <h2
              className={`mt-2 text-3xl font-semibold uppercase tracking-wide md:text-4xl ${headingClass} ${h}`}
            >
              {shop.headline}
            </h2>
            <p className={`mt-2 max-w-2xl text-sm ${sub}`}>{shop.sub}</p>
          </div>
          <button
            type="button"
            onClick={() => setStep(step === "cart" ? "browse" : "cart")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider ${btnGhost}`}
          >
            <ShoppingBag className="h-4 w-4" />
            {step === "cart" ? "Seguir comprando" : `Ver carrito (${totalUnits})`}
          </button>
        </div>

        {step === "done" ? (
          <div className={`mt-10 rounded-2xl p-10 text-center ${cardClass}`}>
            <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${accentClass}`}>
              <Check className="h-7 w-7" />
            </div>
            <p className={`mt-4 font-[family-name:var(--font-demo-montserrat)] text-lg font-bold ${h}`}>
              ¡Compra demo completada!
            </p>
            <p className={`mt-2 text-sm ${sub}`}>
              En tu sitio real: pago seguro, email de confirmación y seguimiento del pedido. Este paso es
              demostración para que veas cómo convierte tu marca.
            </p>
            <button
              type="button"
              onClick={() => {
                setStep("browse");
                setQty(Object.fromEntries(shop.products.map((p) => [p.id, 0])));
              }}
              className={`mt-6 rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-wider ${light ? "border border-stone-400 text-stone-800 hover:bg-stone-200/50" : "border border-white/20 text-white hover:bg-white/5"}`}
            >
              Reiniciar demo
            </button>
          </div>
        ) : step === "browse" ? (
          browseUi
        ) : (
          <div className={`mt-10 rounded-2xl p-6 md:p-8 ${cardClass}`}>
            <h3 className={`font-bold ${h}`}>Tu carrito (demo)</h3>
            {lineItems.length === 0 ? (
              <p className={`mt-4 text-sm ${sub}`}>Todavía no agregaste productos.</p>
            ) : (
              <ul className={`mt-6 space-y-3 py-6 ${cartUl}`}>
                {lineItems.map(({ p, q }) => (
                  <li key={p.id} className={`flex justify-between gap-4 text-sm ${light ? "text-stone-700" : "text-zinc-300"}`}>
                    <span>
                      {p.name} × {q}
                    </span>
                    <span className={`shrink-0 ${noteCol}`}>{p.price}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={lineItems.length === 0}
                onClick={fakePay}
                className={`rounded-xl px-6 py-3 text-xs font-black uppercase tracking-wider disabled:opacity-40 ${accentClass}`}
              >
                Finalizar compra (simulado)
              </button>
            </div>
            <p className={`mt-4 text-xs ${light ? "text-stone-500" : "text-zinc-600"}`}>
              Datos de envío y cupón se mostrarían en los siguientes pasos — estructura típica de checkout.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
