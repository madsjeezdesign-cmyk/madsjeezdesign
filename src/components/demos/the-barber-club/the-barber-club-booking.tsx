"use client";

import Image from "next/image";
import { Calendar, Check, ChevronLeft, ChevronRight, Clock, Scissors, User } from "lucide-react";
import { useMemo, useState } from "react";
import {
  BARBER_PROS,
  BARBER_SERVICES,
  formatBarberPrice,
  getAvailableSlots,
  getBarberById,
  getNextDays,
  getServiceById,
  type BookingDraft,
} from "@/lib/the-barber-club";

type Props = {
  onConfirmed: (summary: string) => void;
};

export function TheBarberClubBooking({ onConfirmed }: Props) {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<BookingDraft>({
    serviceId: null,
    barberId: null,
    date: null,
    time: null,
  });

  const days = useMemo(() => getNextDays(6), []);
  const slots = useMemo(
    () => (draft.barberId && draft.date ? getAvailableSlots(draft.barberId, draft.date) : []),
    [draft.barberId, draft.date],
  );

  const service = getServiceById(draft.serviceId);
  const barber = getBarberById(draft.barberId);

  const canNext =
    (step === 1 && draft.serviceId) ||
    (step === 2 && draft.barberId) ||
    (step === 3 && draft.date && draft.time) ||
    step === 4;

  const confirm = () => {
    if (!service || !barber || !draft.date || !draft.time) return;
    const dayLabel = days.find((d) => d.key === draft.date)?.label ?? draft.date;
    onConfirmed(
      `${service.name} con ${barber.name} · ${dayLabel} ${draft.time} · ${formatBarberPrice(service.price)}`,
    );
    setStep(1);
    setDraft({ serviceId: null, barberId: null, date: null, time: null });
  };

  const steps = [
    { n: 1, label: "Servicio", icon: Scissors },
    { n: 2, label: "Barbero", icon: User },
    { n: 3, label: "Fecha", icon: Calendar },
    { n: 4, label: "Confirmar", icon: Check },
  ];

  return (
    <section id="turnos" className="border-t border-zinc-800 bg-zinc-950 py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-amber-500">Reservas online</span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl">Reservá tu turno</h2>
        </div>

        <div className="mb-8 flex justify-between gap-2">
          {steps.map((s) => (
            <div
              key={s.n}
              className={`flex flex-1 flex-col items-center gap-1 rounded-lg border px-2 py-3 text-center transition-colors ${
                step === s.n ? "border-amber-500/50 bg-amber-500/10 text-amber-400" : "border-zinc-800 text-[color:var(--muted-body)]"
              }`}
            >
              <s.icon className="h-4 w-4" />
              <span className="text-[9px] font-bold uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
          {step === 1 ? (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Elegí tu servicio</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {BARBER_SERVICES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setDraft((d) => ({ ...d, serviceId: s.id }))}
                    className={`rounded-xl border p-5 text-left transition-all ${
                      draft.serviceId === s.id
                        ? "border-amber-500 bg-amber-500/10 ring-1 ring-amber-500/30"
                        : "border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <span className="text-2xl">{s.icon}</span>
                    <p className="mt-2 font-bold text-white">{s.name}</p>
                    <p className="text-lg font-black text-amber-400">{formatBarberPrice(s.price)}</p>
                    <p className="mt-1 text-[10px] text-[color:var(--muted-body)]">{s.duration}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Elegí tu barbero</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {BARBER_PROS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setDraft((d) => ({ ...d, barberId: b.id, date: null, time: null }))}
                    className={`overflow-hidden rounded-xl border text-left transition-all ${
                      draft.barberId === b.id ? "border-amber-500 ring-1 ring-amber-500/30" : "border-zinc-800"
                    }`}
                  >
                    <div className="relative h-36 w-full">
                      <Image src={b.image} alt={b.name} fill className="object-cover" sizes="200px" />
                    </div>
                    <div className="p-4">
                      <p className="font-bold text-white">{b.name}</p>
                      <p className="text-xs text-amber-400">{b.specialty}</p>
                      <p className="mt-1 text-[10px] text-[color:var(--muted-body)]">★ {b.rating}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Fecha y hora</h3>
              <div className="flex flex-wrap gap-2">
                {days.map((d) => (
                  <button
                    key={d.key}
                    type="button"
                    onClick={() => setDraft((prev) => ({ ...prev, date: d.key, time: null }))}
                    className={`rounded-lg border px-4 py-3 text-center transition-colors ${
                      draft.date === d.key
                        ? "border-amber-500 bg-amber-500/10 text-amber-400"
                        : "border-zinc-800 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <span className="block text-[10px] uppercase">{d.weekday}</span>
                    <span className="block text-sm font-bold">{d.label}</span>
                  </button>
                ))}
              </div>
              {draft.date ? (
                <div>
                  <p className="mb-3 flex items-center gap-2 text-xs font-bold text-[color:var(--muted-body)]">
                    <Clock className="h-4 w-4" /> Horarios disponibles
                  </p>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                    {slots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setDraft((prev) => ({ ...prev, time: slot.time }))}
                        className={`rounded-lg py-2 text-xs font-bold transition-colors ${
                          !slot.available
                            ? "cursor-not-allowed bg-zinc-900 text-zinc-700 line-through"
                            : draft.time === slot.time
                              ? "bg-amber-500 text-zinc-950"
                              : "border border-zinc-800 text-zinc-300 hover:border-amber-500/40"
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {step === 4 ? (
            <div className="space-y-6 text-center">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Confirmá tu reserva</h3>
              <div className="mx-auto max-w-sm rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-left text-sm">
                <p>
                  <span className="text-[color:var(--muted-body)]">Servicio:</span> <strong className="text-white">{service?.name}</strong>
                </p>
                <p className="mt-2">
                  <span className="text-[color:var(--muted-body)]">Barbero:</span> <strong className="text-white">{barber?.name}</strong>
                </p>
                <p className="mt-2">
                  <span className="text-[color:var(--muted-body)]">Cuándo:</span>{" "}
                  <strong className="text-white">
                    {days.find((d) => d.key === draft.date)?.label} · {draft.time}
                  </strong>
                </p>
                <p className="mt-4 border-t border-zinc-800 pt-4 text-xl font-black text-amber-400">
                  {service ? formatBarberPrice(service.price) : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={confirm}
                className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-10 py-4 text-sm font-black uppercase tracking-widest text-zinc-950 shadow-lg"
              >
                Confirmar turno
              </button>
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-1 rounded-lg border border-zinc-800 px-4 py-2 text-xs font-bold text-zinc-400 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" /> Atrás
          </button>
          {step < 4 ? (
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-1 rounded-lg bg-zinc-800 px-4 py-2 text-xs font-bold text-white disabled:opacity-30"
            >
              Siguiente <ChevronRight className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
