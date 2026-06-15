"use client";

import { Check, Crown } from "lucide-react";
import { MEMBERSHIP_PLANS, formatBarberPrice } from "@/lib/the-barber-club";

type Props = {
  onJoin: (planName: string) => void;
};

export function TheBarberClubMembership({ onJoin }: Props) {
  return (
    <section id="club" className="border-t border-zinc-800 bg-zinc-900/40 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span className="text-xs font-black uppercase tracking-[0.04em] text-amber-500">Club de miembros</span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-white">Suscripciones mensuales</h2>
          <p className="mt-2 text-sm text-[color:var(--muted-body)]">Beneficios exclusivos para clientes frecuentes.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`tbc-card-shine relative rounded-2xl border bg-zinc-950 p-8 ${plan.accent} ${
                plan.badge ? "ring-1 ring-amber-500/40" : ""
              }`}
            >
              {plan.badge ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-4 py-1 text-[10px] font-black uppercase text-zinc-950">
                  {plan.badge}
                </span>
              ) : null}
              <div className="flex items-center gap-2">
                <Crown className={`h-6 w-6 ${plan.id === "vip" ? "text-amber-400" : "text-[color:var(--muted-body)]"}`} />
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              </div>
              <p className="mt-4">
                <span className="text-4xl font-black text-amber-400">{formatBarberPrice(plan.price)}</span>
                <span className="text-sm text-[color:var(--muted-body)]">/mes</span>
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onJoin(plan.name)}
                className={`mt-8 w-full rounded-xl py-4 text-xs font-black uppercase tracking-[0.04em] ${
                  plan.id === "vip"
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950"
                    : "border border-zinc-700 text-white hover:border-amber-500/40"
                }`}
              >
                Unirme al plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
