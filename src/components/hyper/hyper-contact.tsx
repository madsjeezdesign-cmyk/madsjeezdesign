"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { site, websiteModels } from "@/lib/data";

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapsQuery)}`;

const SERVICE_OPTIONS = [
  ...websiteModels.map((m) => ({
    value: m.name,
    title: `${m.name} (${m.priceNote})`,
    subtitle: m.subtitle,
  })),
  { value: "Otro / integración", title: "Otro / integración", subtitle: "Proyecto a medida o integración externa" },
];

const DEFAULT_SERVICE = SERVICE_OPTIONS[0]?.value ?? "";

function HyperServiceSelect({
  disabled,
  value,
  onChange,
}: {
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = SERVICE_OPTIONS.find((o) => o.value === value) ?? SERVICE_OPTIONS[0];

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name="service" value={value} />
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => !disabled && setOpen((o) => !o)}
        className="mt-1 flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white outline-none transition-colors focus:border-[#1de0b1]/50 disabled:opacity-60"
      >
        <span className="min-w-0 flex-1">
          <span className="block font-medium leading-snug">{selected?.title}</span>
          {selected?.subtitle ? (
            <span className="mt-0.5 block text-xs leading-snug text-zinc-400">{selected.subtitle}</span>
          ) : null}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Servicio"
          className="absolute z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-white/15 bg-[#0c1018] py-1 shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
        >
          {SERVICE_OPTIONS.map((opt) => {
            const active = opt.value === value;
            return (
              <li key={opt.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left transition-colors hover:bg-white/10 ${
                    active ? "bg-[#1de0b1]/15 text-white" : "text-zinc-200"
                  }`}
                >
                  <span className="block text-sm font-medium leading-snug">{opt.title}</span>
                  {opt.subtitle ? (
                    <span className="mt-1 block text-xs leading-relaxed text-zinc-400">{opt.subtitle}</span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function HyperContact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [service, setService] = useState(DEFAULT_SERVICE);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          company: data.get("company") || null,
          email: data.get("email"),
          service: data.get("service"),
          message: data.get("message"),
          website: data.get("website") ?? "",
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setError(json.error ?? "No se pudo enviar. Intentá de nuevo.");
        return;
      }
      setSent(true);
      setService(DEFAULT_SERVICE);
      form.reset();
    } catch {
      setError("Error de conexión. Probá WhatsApp o email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contacto"
      className="relative scroll-mt-24 px-8 py-32 text-left"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 space-y-4">
          <h2
            className="font-[family-name:var(--font-instrument)] text-white"
            style={{
              fontSize: "var(--font-size-h1)",
              lineHeight: "var(--leading-heading)",
              letterSpacing: "var(--tracking-heading)",
            }}
          >
            Hablemos<span className="text-[#1de0b1]">.</span>
          </h2>
          <p className="max-w-xl font-[family-name:var(--font-jetbrains)] text-sm text-zinc-500">
            Escribinos o pasá por el estudio. {site.hours}. Zona Carlos Spegazzini,
            Partido de Ezeiza (GBA Sur). Respondemos en menos de 24 h hábiles.
          </p>
          <div className="h-1 w-20 bg-[#1de0b1]" />
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-4 text-zinc-400 transition-colors hover:text-[#1de0b1]"
            >
              <Mail className="h-5 w-5 shrink-0 text-[#1de0b1]" />
              <span className="font-[family-name:var(--font-jetbrains)] text-sm font-bold uppercase tracking-widest">
                {site.email}
              </span>
            </a>
            <a
              href={`tel:${site.phoneTel}`}
              className="flex items-center gap-4 text-zinc-400 transition-colors hover:text-[#1de0b1]"
            >
              <Phone className="h-5 w-5 shrink-0 text-[#1de0b1]" />
              <span className="font-[family-name:var(--font-jetbrains)] text-sm font-bold uppercase tracking-widest">
                {site.phoneDisplay}
              </span>
            </a>
            <div className="space-y-2 border-l border-white/10 pl-4">
              <div className="flex items-start gap-3 text-zinc-400">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#1de0b1]" />
                <div className="font-[family-name:var(--font-jetbrains)] text-sm font-bold uppercase leading-relaxed tracking-wide text-zinc-400">
                  <span className="block">{site.address.street}</span>
                  <span className="block text-zinc-500">
                    {site.address.locality}, {site.address.partido}
                  </span>
                  <span className="block text-zinc-500">
                    {site.address.province}, {site.address.country}
                  </span>
                </div>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 pl-8 text-xs font-bold uppercase tracking-widest text-[#1de0b1] transition-colors hover:text-white"
              >
                Abrir en Google Maps
              </a>
            </div>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#1de0b1]/40 bg-[#1de0b1]/10 px-6 py-3 text-sm font-black uppercase tracking-widest text-[#1de0b1] transition-all hover:bg-[#1de0b1] hover:text-black"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <div className="hyper-card rounded-[2rem] border border-white/5 p-8 md:p-10">
            {sent ? (
              <div className="py-12 text-center">
                <p className="text-[#1de0b1] font-[family-name:var(--font-jetbrains)] text-sm font-bold uppercase tracking-widest">
                  Mensaje recibido
                </p>
                <p className="mt-2 text-zinc-500">
                  Te contactamos pronto. Gracias.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  aria-hidden
                />
                {error && (
                  <p
                    role="alert"
                    className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                  >
                    {error}
                  </p>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                      Nombre
                    </span>
                    <input
                      required
                      minLength={2}
                      maxLength={120}
                      disabled={loading}
                      name="name"
                      className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#1de0b1]/50 disabled:opacity-60"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                      Empresa
                    </span>
                    <input
                      disabled={loading}
                      name="company"
                      className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#1de0b1]/50 disabled:opacity-60"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Email
                  </span>
                  <input
                    required
                    disabled={loading}
                    type="email"
                    name="email"
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#1de0b1]/50 disabled:opacity-60"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Servicio
                  </span>
                  <HyperServiceSelect
                    disabled={loading}
                    value={service}
                    onChange={setService}
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Mensaje
                  </span>
                  <textarea
                    required
                    minLength={10}
                    maxLength={4000}
                    disabled={loading}
                    name="message"
                    rows={4}
                    className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#1de0b1]/50 disabled:opacity-60"
                  />
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1de0b1] py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:scale-[1.02] disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enviando
                    </>
                  ) : (
                    <>
                      Enviar consulta
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
