"use client";

import { Loader2, Send } from "lucide-react";
import { useMemo, useState } from "react";
import type { DemoLeadTheme } from "@/lib/demo-assets";

type Props = {
  slug: string;
  brandLabel: string;
  kicker?: string;
  theme: DemoLeadTheme;
};

/** Envía lead real al mismo `/api/contact` que la sección NEXO de la home. */
export function DemoLeadForm({ slug, brandLabel, kicker = "Consultá desde esta demo", theme }: Props) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const serviceValue = useMemo(() => `Demo ${brandLabel}`.slice(0, 80), [brandLabel]);
  const hClass = theme.invert ? "text-stone-900" : "text-white";
  const pClass = theme.invert ? "text-stone-600" : "text-zinc-400";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const companyRaw = String(data.get("company") ?? "").trim();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          company: companyRaw || null,
          email: data.get("email"),
          service: serviceValue,
          message: `[Lead /demos/${slug}]\n\n${data.get("message")}`,
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
      setError("Error de conexión. Probá más tarde.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls = `${theme.input} ${theme.focus}`;

  return (
    <section className={`px-4 py-16 md:px-10 ${theme.section}`} id={`lead-${slug}`}>
      <div className="mx-auto max-w-3xl">
        <p className={theme.label}>{kicker}</p>
        <h2
          className={`mt-3 font-[family-name:var(--font-demo-bebas)] text-4xl uppercase tracking-wide md:text-5xl ${hClass}`}
        >
          Contacto
        </h2>
        <p className={`mt-3 max-w-xl text-sm leading-relaxed ${pClass}`}>
          Mismo flujo que la sección de contacto del sitio principal: tu consulta queda registrada para el
          equipo. Etiquetamos el rubro de esta demo automáticamente.
        </p>

        <div className={`mt-8 ${theme.card}`}>
          {sent ? (
            <div className="py-10 text-center">
              <p className={`text-sm font-bold ${theme.invert ? "text-emerald-700" : "text-[#1de0b1]"}`}>
                Mensaje recibido
              </p>
              <p className={`mt-2 text-sm ${pClass}`}>Te contactamos pronto. Gracias.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error ? (
                <p
                  role="alert"
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                >
                  {error}
                </p>
              ) : null}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={theme.label}>Nombre</span>
                  <input required disabled={loading} name="name" className={inputCls} />
                </label>
                <label className="block">
                  <span className={theme.label}>Empresa (opcional)</span>
                  <input disabled={loading} name="company" className={inputCls} />
                </label>
              </div>
              <label className="block">
                <span className={theme.label}>Email</span>
                <input required disabled={loading} type="email" name="email" className={inputCls} />
              </label>
              <label className="block">
                <span className={theme.label}>Mensaje</span>
                <textarea
                  required
                  disabled={loading}
                  name="message"
                  rows={4}
                  minLength={10}
                  placeholder="Contanos qué necesitás para tu sitio..."
                  className={`${inputCls} resize-none`}
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full items-center justify-center gap-2 rounded-xl font-semibold ${theme.button} disabled:opacity-60`}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Enviando
                  </>
                ) : (
                  <>
                    Enviar consulta <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
