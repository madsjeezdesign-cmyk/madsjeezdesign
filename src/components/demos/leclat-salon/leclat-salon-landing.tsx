"use client";

import { Bell, CheckCircle2 } from "lucide-react";
import { useCallback, useState } from "react";
import { LECLAT_CONFIG, type SalonProduct } from "@/lib/leclat-salon";
import { DemoLeadForm } from "../demo-lead-form";
import { LeclatSalonBooking } from "./leclat-salon-booking";
import { LeclatSalonCart, type CartItem } from "./leclat-salon-cart";
import { LeclatSalonContact } from "./leclat-salon-contact";
import { LeclatSalonGallery } from "./leclat-salon-gallery";
import { LeclatSalonHero } from "./leclat-salon-hero";
import { LeclatSalonNavbar } from "./leclat-salon-navbar";
import { LeclatSalonServices } from "./leclat-salon-services";
import { LeclatSalonShop } from "./leclat-salon-shop";
import "./leclat-salon.css";

export function LeclatSalonLanding() {
  const cfg = LECLAT_CONFIG;
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3000);
  }, []);

  const toggleService = useCallback((id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const addProduct = useCallback(
    (p: SalonProduct) => {
      const key = String(p.id);
      setCart((prev) => {
        const ex = prev.find((i) => i.key === key);
        if (ex) return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + 1 } : i));
        return [...prev, { ...p, key, quantity: 1 }];
      });
      notify(`${p.name} en tu bolsa`);
      setCartOpen(true);
    },
    [notify],
  );

  return (
    <div className="leclat-demo min-h-screen bg-stone-50 font-sans text-stone-800 antialiased selection:bg-rose-200">
      <LeclatSalonNavbar />
      <LeclatSalonHero />
      <LeclatSalonServices selectedIds={selectedServices} onToggle={toggleService} />
      <LeclatSalonBooking
        selectedServiceIds={selectedServices}
        onConfirmed={(summary) => {
          setBookingSuccess(summary);
          notify("Recordatorio enviado 24 hs antes (simulado)");
        }}
      />
      <LeclatSalonGallery />
      <LeclatSalonShop onAdd={addProduct} cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <LeclatSalonContact />

      <footer className="border-t border-rose-100 py-10 text-center text-xs text-stone-400">
        <p className="font-serif text-lg text-stone-700">
          {cfg.brand} {cfg.brandSub}
        </p>
        <p className="mt-4">© {new Date().getFullYear()} — Demo interactiva</p>
      </footer>

      <DemoLeadForm
        slug={cfg.slug}
        brandLabel={`${cfg.brand} ${cfg.brandSub}`}
        kicker="¿Te gusta esta demo?"
        title="Salón premium con turnos y shop"
        sub="Reservas paso a paso, galería y retail — adaptamos a tu salón."
        theme={{
          section: "bg-stone-900 text-stone-100",
          invert: false,
          label: "text-[10px] font-medium uppercase tracking-widest text-stone-500",
          input:
            "mt-2 w-full rounded-xl border border-stone-700 bg-stone-950 px-4 py-3 text-sm text-white focus:border-rose-400 focus:outline-none",
          focus: "focus:border-rose-400",
          card: "rounded-2xl border border-stone-700 bg-stone-950 p-8",
          button:
            "rounded-full bg-rose-500 px-8 py-3 text-[10px] font-semibold uppercase tracking-widest text-white",
        }}
      />

      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-rose-200 bg-white px-5 py-2.5 text-xs font-medium text-rose-600 shadow-lg">
          {toast}
        </div>
      ) : null}

      {bookingSuccess ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-stone-900/30 p-4 backdrop-blur-sm">
          <div className="leclat-fade w-full max-w-md rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-2xl">
            <CheckCircle2 className="mx-auto h-14 w-14 text-rose-500" />
            <h3 className="mt-4 font-serif text-2xl text-stone-900">¡Reserva confirmada!</h3>
            <p className="mt-3 text-sm text-stone-600">{bookingSuccess}</p>
            <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-xs text-rose-700">
              <Bell className="h-4 w-4" />
              Te enviaremos un recordatorio 24 hs antes
            </div>
            <button
              type="button"
              onClick={() => setBookingSuccess(null)}
              className="mt-6 w-full rounded-full bg-stone-900 py-3 text-xs font-semibold uppercase tracking-wider text-white"
            >
              Perfecto
            </button>
          </div>
        </div>
      ) : null}

      <LeclatSalonCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={(key) => setCart((prev) => prev.filter((i) => i.key !== key))}
      />
    </div>
  );
}

export function DemoLeclatSalon() {
  return <LeclatSalonLanding />;
}
