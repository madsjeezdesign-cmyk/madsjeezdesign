"use client";

import { useState } from "react";
import { Loader2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { site, websiteModels } from "@/lib/data";

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapsQuery)}`;

export function HyperContact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setError(json.error ?? "No se pudo enviar. Intentá de nuevo.");
        return;
      }
      setSent(true);
      form.reset();
    } catch {
      setError("Error de conexión. Probá WhatsApp o email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="nexo"
      className="relative scroll-mt-24 px-8 py-32 text-left"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 space-y-4">
          <h2 className="text-5xl font-black tracking-tighter text-white">
            NEXO<span className="text-[#1de0b1]">.</span>
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
                  <select
                    disabled={loading}
                    name="service"
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#1de0b1]/50 disabled:opacity-60"
                  >
                    {websiteModels.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name} ({m.priceNote}) — {m.subtitle}
                      </option>
                    ))}
                    <option value="Otro / integración">Otro / integración</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Mensaje
                  </span>
                  <textarea
                    required
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
                      Enviar señal
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
