"use client";

import { CheckCircle2, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  calcCentralTotals,
  centralCartWhatsApp,
  CERRAJERIA_CENTRAL_CONFIG,
  formatProductSpecs,
  getKeyType,
  type CentralCartLine,
  type CentralDeliveryMode,
  type KeyTypeId,
  type SecurityProduct,
} from "@/lib/cerrajeria-central";
import { DemoLeadForm } from "../demo-lead-form";
import { CerrajeriaCentralCart } from "./cerrajeria-central-cart";
import { CerrajeriaCentralEmergency } from "./cerrajeria-central-emergency";
import { CerrajeriaCentralFooter } from "./cerrajeria-central-footer";
import { CerrajeriaCentralHero } from "./cerrajeria-central-hero";
import { CerrajeriaCentralKeyQuote } from "./cerrajeria-central-key-quote";
import { CerrajeriaCentralNavbar } from "./cerrajeria-central-navbar";
import { CerrajeriaCentralServices } from "./cerrajeria-central-services";
import { CerrajeriaCentralShop } from "./cerrajeria-central-shop";
import "./cerrajeria-central.css";

export function CerrajeriaCentralLanding() {
  const cfg = CERRAJERIA_CENTRAL_CONFIG;
  const [cart, setCart] = useState<CentralCartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [urgencyOpen, setUrgencyOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [waOpen, setWaOpen] = useState(false);
  const [waUrl, setWaUrl] = useState<string | null>(null);

  const cartCount = cart.reduce(
    (s, l) => s + (l.kind === "product" ? l.quantity : 1),
    0,
  );
  const previewTotals = useMemo(() => calcCentralTotals(cart, "pickup"), [cart]);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2500);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const addProduct = useCallback(
    (product: SecurityProduct) => {
      const key = `p-${product.id}`;
      setCart((prev) => {
        const ex = prev.find((l) => l.key === key && l.kind === "product");
        if (ex && ex.kind === "product") {
          return prev.map((l) =>
            l.key === key && l.kind === "product" ? { ...l, quantity: l.quantity + 1 } : l,
          );
        }
        return [
          ...prev,
          {
            kind: "product",
            key,
            productId: product.id,
            name: product.name,
            specs: formatProductSpecs(product),
            unitPrice: product.price,
            quantity: 1,
          },
        ];
      });
      notify(`${product.name} agregado`);
      setCartOpen(true);
    },
    [notify],
  );

  const addKeyService = useCallback(
    (typeId: KeyTypeId, copies: number, total: number) => {
      const kt = getKeyType(typeId);
      setCart((prev) => [
        ...prev,
        {
          kind: "service",
          key: `svc-${typeId}-${Date.now()}`,
          serviceLabel: `Copias de llave × ${copies}`,
          keyTypeLabel: kt.label,
          copies,
          unitPrice: total,
          quantity: 1,
        },
      ]);
      notify("Servicio agregado al carrito");
      setCartOpen(true);
    },
    [notify],
  );

  const reserveTurn = (typeId: KeyTypeId, copies: number) => {
    const kt = getKeyType(typeId);
    const url = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(
      `Hola, quiero reservar turno para duplicado:\n${kt.label}\n${copies} copias\nGracias.`,
    )}`;
    window.open(url, "_blank");
    notify("Abriendo WhatsApp para reserva");
  };

  const updateQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((l) =>
          l.kind === "product" && l.key === key ? { ...l, quantity: l.quantity + delta } : l,
        )
        .filter((l) => l.kind !== "product" || l.quantity > 0),
    );
  };

  const handleConfirm = (mode: CentralDeliveryMode) => {
    const totals = calcCentralTotals(cart, mode);
    setWaUrl(centralCartWhatsApp(cart, totals, mode));
    setCartOpen(false);
    setWaOpen(true);
  };

  return (
    <div className="cc-demo min-h-screen bg-zinc-950 font-sans text-zinc-200">
      <CerrajeriaCentralNavbar
        brand={cfg.brand}
        cartCount={cartCount}
        cartTotal={previewTotals.total}
        onOpenCart={() => setCartOpen(true)}
        onNav={scrollTo}
        onUrgency={() => setUrgencyOpen(true)}
      />
      <CerrajeriaCentralHero
        onUrgency={() => setUrgencyOpen(true)}
        onCatalog={() => scrollTo("tienda")}
      />
      <CerrajeriaCentralServices />
      <CerrajeriaCentralKeyQuote onAddService={addKeyService} onReserve={reserveTurn} />
      <CerrajeriaCentralShop onAdd={addProduct} />
      <CerrajeriaCentralFooter />

      <DemoLeadForm
        slug={cfg.slug}
        brandLabel={cfg.brand}
        kicker="¿Te gusta esta demo?"
        title="Cerrajería con urgencias y cotizador"
        sub="Emergencias 24 hs, cotizador de llaves, tienda técnica y WhatsApp con ficha — para tu negocio."
        theme={{
          section: "bg-black text-zinc-100 border-t border-zinc-800",
          invert: false,
          label: "text-[10px] font-bold uppercase tracking-widest text-[color:var(--muted-body)]",
          input:
            "mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none",
          focus: "focus:border-amber-500",
          card: "rounded-xl border border-zinc-800 bg-zinc-900 p-8",
          button: "rounded-lg bg-amber-500 px-8 py-3 text-xs font-black uppercase text-zinc-950",
        }}
      />

      {toast ? (
        <div className="fixed bottom-20 left-1/2 z-[75] -translate-x-1/2 rounded-lg bg-zinc-800 px-4 py-2 text-xs font-bold text-amber-400 ring-1 ring-amber-500/50 sm:bottom-6">
          {toast}
        </div>
      ) : null}

      {waOpen && waUrl ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-md rounded-2xl border border-amber-500/50 bg-zinc-900 p-8 text-center">
            <button type="button" onClick={() => setWaOpen(false)} className="absolute right-4 top-4 text-[color:var(--muted-body)]">
              <X className="h-5 w-5" />
            </button>
            <CheckCircle2 className="mx-auto h-14 w-14 text-amber-400" />
            <h3 className="mt-4 text-xl font-black uppercase text-white">Pedido listo</h3>
            <p className="mt-2 text-sm text-[color:var(--muted-body)]">Enviá los detalles técnicos por WhatsApp</p>
            <Link
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block rounded-lg bg-green-600 py-3.5 text-sm font-black uppercase text-white"
            >
              Abrir WhatsApp
            </Link>
            <button
              type="button"
              onClick={() => {
                setWaOpen(false);
                setCart([]);
              }}
              className="mt-3 text-xs text-[color:var(--muted-body)]"
            >
              Cerrar y vaciar
            </button>
          </div>
        </div>
      ) : null}

      <CerrajeriaCentralEmergency
        modalOpen={urgencyOpen}
        onOpenModal={() => setUrgencyOpen(true)}
        onCloseModal={() => setUrgencyOpen(false)}
      />

      <CerrajeriaCentralCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={cart}
        onUpdateQty={updateQty}
        onRemove={(key) => setCart((prev) => prev.filter((l) => l.key !== key))}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export function DemoCerrajeriaCentral() {
  return <CerrajeriaCentralLanding />;
}
