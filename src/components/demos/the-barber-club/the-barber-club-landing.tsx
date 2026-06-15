"use client";

import { Bell, CheckCircle2, Crown } from "lucide-react";
import { useCallback, useState } from "react";
import { BARBER_CLUB_CONFIG, type BarberProduct } from "@/lib/the-barber-club";
import { DemoLeadForm } from "../demo-lead-form";
import { TheBarberClubBooking } from "./the-barber-club-booking";
import { TheBarberClubCart } from "./the-barber-club-cart";
import { TheBarberClubGallery } from "./the-barber-club-gallery";
import { TheBarberClubHero } from "./the-barber-club-hero";
import { TheBarberClubMembership } from "./the-barber-club-membership";
import { TheBarberClubNavbar } from "./the-barber-club-navbar";
import { TheBarberClubShop } from "./the-barber-club-shop";
import "./the-barber-club.css";

export function TheBarberClubLanding() {
  const cfg = BARBER_CLUB_CONFIG;
  const [cart, setCart] = useState<BarberProduct[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [shopSuccess, setShopSuccess] = useState(false);
  const [memberSuccess, setMemberSuccess] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3000);
  }, []);

  const addToCart = useCallback(
    (p: BarberProduct) => {
      setCart((prev) => [...prev, p]);
      showToast(`${p.name} agregado al carrito`);
      setCartOpen(true);
    },
    [showToast],
  );

  return (
    <div className="tbc-demo min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased selection:bg-amber-500/30">
      <TheBarberClubNavbar cartCount={cart.length} onOpenCart={() => setCartOpen(true)} />
      <TheBarberClubHero />
      <TheBarberClubBooking
        onConfirmed={(summary) => {
          setBookingSuccess(summary);
          showToast("Recordatorio programado para 24 hs antes");
        }}
      />
      <TheBarberClubShop onAdd={addToCart} />
      <TheBarberClubGallery />
      <TheBarberClubMembership onJoin={(plan) => setMemberSuccess(plan)} />

      <footer className="border-t border-zinc-800 bg-black py-12 text-center text-xs text-[color:var(--muted-body)]">
        <p className="font-serif text-lg font-bold text-amber-500/80">{cfg.brand}</p>
        <p className="mt-2">{cfg.address}</p>
        <p>{cfg.hours} · {cfg.phone}</p>
        <p className="mt-6">© {new Date().getFullYear()} {cfg.brand} — Demo interactiva</p>
      </footer>

      <DemoLeadForm
        slug={cfg.slug}
        brandLabel={cfg.brand}
        kicker="¿Te gusta esta demo?"
        title="Barbería premium con turnos y shop"
        sub="Sistema de reservas, e-commerce y membresías — adaptamos a tu local."
        theme={{
          section: "bg-zinc-900 text-zinc-100",
          invert: false,
          label: "text-[10px] font-bold uppercase tracking-[0.04em] text-[color:var(--muted-body)]",
          input:
            "mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none",
          focus: "focus:border-amber-500",
          card: "rounded-3xl border border-zinc-800 bg-zinc-950 p-8",
          button:
            "rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-3 text-xs font-bold uppercase tracking-[0.04em] text-zinc-950",
        }}
      />

      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-xl border border-amber-500/30 bg-zinc-900 px-5 py-3 text-sm font-bold text-amber-400 shadow-xl">
          {toast}
        </div>
      ) : null}

      {bookingSuccess ? (
        <div className="fixed inset-0 z-[65] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="tbc-animate-in max-w-md rounded-2xl border border-amber-500/30 bg-zinc-900 p-8 text-center shadow-2xl">
            <CheckCircle2 className="mx-auto h-14 w-14 text-amber-500" />
            <h3 className="mt-4 font-serif text-2xl font-bold text-white">¡Turno confirmado!</h3>
            <p className="mt-3 text-sm text-zinc-400">{bookingSuccess}</p>
            <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-zinc-400">
              <Bell className="h-4 w-4 text-amber-500" />
              Te enviaremos un recordatorio 24 hs antes
            </div>
            <button
              type="button"
              onClick={() => setBookingSuccess(null)}
              className="mt-6 w-full rounded-xl bg-amber-500 py-3 text-xs font-black uppercase text-zinc-950"
            >
              Perfecto
            </button>
          </div>
        </div>
      ) : null}

      {shopSuccess ? (
        <div className="fixed inset-0 z-[65] flex items-center justify-center bg-black/80 p-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <p className="text-lg font-bold text-white">¡Compra simulada con éxito!</p>
            <button type="button" onClick={() => { setShopSuccess(false); setCart([]); }} className="mt-4 text-amber-400 text-sm font-bold">
              Cerrar
            </button>
          </div>
        </div>
      ) : null}

      {memberSuccess ? (
        <div className="fixed inset-0 z-[65] flex items-center justify-center bg-black/80 p-4">
          <div className="rounded-2xl border border-amber-500/30 bg-zinc-900 p-8 text-center max-w-sm">
            <Crown className="mx-auto h-10 w-10 text-amber-500" />
            <p className="mt-4 font-bold text-white">¡Bienvenido al {memberSuccess}!</p>
            <p className="mt-2 text-xs text-[color:var(--muted-body)]">Un asesor te contactará para activar tu membresía (demo).</p>
            <button type="button" onClick={() => setMemberSuccess(null)} className="mt-6 text-sm font-bold text-amber-400">
              Cerrar
            </button>
          </div>
        </div>
      ) : null}

      <TheBarberClubCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemove={(id) => setCart((prev) => prev.filter((i) => i.id !== id))}
        onCheckout={() => {
          setCartOpen(false);
          setShopSuccess(true);
        }}
      />
    </div>
  );
}

export function DemoTheBarberClub() {
  return <TheBarberClubLanding />;
}
