"use client";

import Image from "next/image";
import { Calendar, Check, ChevronLeft, ChevronRight, Sparkles, Sun, Sunset, User } from "lucide-react";
import { useMemo, useState } from "react";
import {
  formatSalonPrice,
  getNextSalonDays,
  getSalonSlots,
  getSelectedServices,
  getServicesTotal,
  getStylistById,
  SALON_STYLISTS,
  type SalonBookingDraft,
} from "@/lib/leclat-salon";

type Props = {
  selectedServiceIds: string[];
  onConfirmed: (summary: string) => void;
};

export function LeclatSalonBooking({ selectedServiceIds, onConfirmed }: Props) {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<SalonBookingDraft>({
    serviceIds: [],
    stylistId: null,
    date: null,
    time: null,
    period: null,
  });

  const services = getSelectedServices(selectedServiceIds.length ? selectedServiceIds : draft.serviceIds);
  const days = useMemo(() => getNextSalonDays(7), []);
  const stylist = getStylistById(draft.stylistId);

  const slots = useMemo(
    () =>
      draft.stylistId && draft.date && draft.period
        ? getSalonSlots(draft.stylistId, draft.date, draft.period)
        : [],
    [draft.stylistId, draft.date, draft.period],
  );

  const total = getServicesTotal(selectedServiceIds.length ? selectedServiceIds : draft.serviceIds);

  const canNext =
    (step === 1 && (selectedServiceIds.length > 0 || draft.serviceIds.length > 0)) ||
    (step === 2 && draft.stylistId) ||
    (step === 3 && draft.date && draft.time) ||
    step === 4;

  const confirm = () => {
    if (!stylist || !draft.date || !draft.time || services.length === 0) return;
    const dayLabel = days.find((d) => d.key === draft.date)?.label ?? draft.date;
    const names = services.map((s) => s.name).join(" + ");
    onConfirmed(
      `${names} con ${stylist.name} · ${dayLabel} ${draft.time} · ${formatSalonPrice(total)}`,
    );
    setStep(1);
    setDraft({ serviceIds: [], stylistId: null, date: null, time: null, period: null });
  };

  const steps = [
    { n: 1, label: "Servicio", icon: Sparkles },
    { n: 2, label: "Estilista", icon: User },
    { n: 3, label: "Horario", icon: Calendar },
    { n: 4, label: "Confirmar", icon: Check },
  ];

  const activeIds = selectedServiceIds.length ? selectedServiceIds : draft.serviceIds;

  return (
    <section id="turnos" className="scroll-mt-20 bg-gradient-to-b from-rose-50/40 to-stone-50 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-rose-400">Reservas online</p>
          <h2 className="mt-2 font-serif text-3xl font-light text-stone-900">Agendá tu turno</h2>
          {activeIds.length > 0 ? (
            <p className="mt-2 text-sm text-stone-500">
              {activeIds.length} servicio(s) · {formatSalonPrice(total)}
            </p>
          ) : (
            <p className="mt-2 text-sm text-rose-500">Elegí al menos un servicio en el menú superior</p>
          )}
        </div>

        <div className="mt-8 flex gap-2">
          {steps.map((s) => (
            <div
              key={s.n}
              className={`flex flex-1 flex-col items-center gap-1 rounded-xl border py-3 text-center transition ${
                step === s.n
                  ? "border-rose-300 bg-white text-rose-600 shadow-sm"
                  : "border-stone-100 bg-white/50 text-stone-400"
              }`}
            >
              <s.icon className="h-4 w-4" strokeWidth={1.5} />
              <span className="text-[9px] font-medium uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm text-stone-600">
                Servicios seleccionados desde el menú. Podés combinar tratamiento + color.
              </p>
              {services.length === 0 ? (
                <p className="rounded-xl bg-rose-50 p-4 text-sm text-rose-600">
                  Volvé a Servicios y elegí uno o más tratamientos.
                </p>
              ) : (
                <ul className="space-y-2">
                  {services.map((s) => (
                    <li key={s.id} className="flex justify-between text-sm">
                      <span className="text-stone-800">{s.name}</span>
                      <span className="text-rose-600">{formatSalonPrice(s.price)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4 sm:grid-cols-3">
              {SALON_STYLISTS.map((pro) => (
                <button
                  key={pro.id}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, stylistId: pro.id }))}
                  className={`overflow-hidden rounded-xl border text-center transition ${
                    draft.stylistId === pro.id
                      ? "border-rose-400 ring-2 ring-rose-200"
                      : "border-stone-100 hover:border-rose-200"
                  }`}
                >
                  <div className="relative mx-auto mt-3 h-20 w-20 overflow-hidden rounded-full">
                    <Image src={pro.image} alt="" fill className="object-cover" sizes="80px" />
                  </div>
                  <p className="mt-2 font-medium text-stone-900">{pro.name}</p>
                  <p className="px-2 pb-3 text-[10px] text-rose-500">{pro.specialty}</p>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-400">Día</p>
                <div className="flex flex-wrap gap-2">
                  {days.map((d) => (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => setDraft((prev) => ({ ...prev, date: d.key, time: null }))}
                      className={`rounded-lg border px-3 py-2 text-xs ${
                        draft.date === d.key
                          ? "border-rose-400 bg-rose-50 text-rose-700"
                          : "border-stone-200 text-stone-600"
                      }`}
                    >
                      <span className="block font-semibold">{d.weekday}</span>
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-400">Turno</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDraft((p) => ({ ...p, period: "morning", time: null }))}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-xs font-medium ${
                      draft.period === "morning"
                        ? "border-rose-400 bg-rose-50 text-rose-700"
                        : "border-stone-200"
                    }`}
                  >
                    <Sun className="h-4 w-4" /> Mañana
                  </button>
                  <button
                    type="button"
                    onClick={() => setDraft((p) => ({ ...p, period: "afternoon", time: null }))}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-xs font-medium ${
                      draft.period === "afternoon"
                        ? "border-rose-400 bg-rose-50 text-rose-700"
                        : "border-stone-200"
                    }`}
                  >
                    <Sunset className="h-4 w-4" /> Tarde
                  </button>
                </div>
              </div>
              {draft.period ? (
                <div className="flex flex-wrap gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setDraft((p) => ({ ...p, time: slot.time }))}
                      className={`min-w-[4.5rem] rounded-lg border px-3 py-2 text-sm font-medium ${
                        !slot.available
                          ? "cursor-not-allowed border-stone-100 bg-stone-50 text-stone-300 line-through"
                          : draft.time === slot.time
                            ? "border-rose-400 bg-rose-500 text-white"
                            : "border-stone-200 text-stone-700 hover:border-rose-300"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          )}

          {step === 4 && services.length > 0 && stylist && draft.date && draft.time && (
            <div className="space-y-3 text-sm text-stone-600">
              <p>
                <strong className="text-stone-900">Servicios:</strong> {services.map((s) => s.name).join(", ")}
              </p>
              <p>
                <strong className="text-stone-900">Profesional:</strong> {stylist.name}
              </p>
              <p>
                <strong className="text-stone-900">Fecha:</strong>{" "}
                {days.find((d) => d.key === draft.date)?.label} · {draft.time}
              </p>
              <p className="font-serif text-xl text-rose-600">{formatSalonPrice(total)}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="flex items-center gap-1 rounded-full border border-stone-200 px-4 py-2 text-xs font-medium text-stone-600 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" /> Atrás
          </button>
          {step < 4 ? (
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-1 rounded-full bg-rose-500 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white disabled:opacity-40"
            >
              Siguiente <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={confirm}
              className="rounded-full bg-stone-900 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-white"
            >
              Confirmar reserva
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
