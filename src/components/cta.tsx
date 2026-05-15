"use client";

import { useState } from "react";
import { Loader2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { site } from "@/lib/data";
import { SectionHeading } from "./section-heading";

export function Cta() {
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
      setError("Error de conexión. Revisá tu internet o escribinos por WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contacto" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
          <div className="grid lg:grid-cols-2">
            <div className="bg-inverse-bg p-10 text-inverse-fg md:p-14">
              <SectionHeading
                eyebrow="Contacto"
                title="Hablemos de tu proyecto"
                description="Contanos qué necesitás. Te respondemos en menos de 24 horas con una propuesta clara."
                align="left"
                variant="dark"
              />

              <ul className="mt-10 space-y-5">
                <li className="flex items-center gap-3 text-sm">
                  <Mail className="h-5 w-5 shrink-0 text-teal-400" />
                  <a
                    href={`mailto:${site.email}`}
                    className="transition-colors hover:text-teal-300"
                  >
                    {site.email}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Phone className="h-5 w-5 shrink-0 text-teal-400" />
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <MapPin className="h-5 w-5 shrink-0 text-teal-400" />
                  {site.location}
                </li>
                <li>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-400"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Escribinos por WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="p-10 md:p-14">
              {sent ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-light text-accent">
                    <Send className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-foreground">
                    ¡Mensaje recibido!
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    Te contactamos en menos de 24 horas hábiles.
                  </p>
                </div>
              ) : (
                <>
                  {error && (
                    <p
                      role="alert"
                      className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                    >
                      {error}
                    </p>
                  )}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-medium text-foreground">
                        Nombre
                      </span>
                      <input
                        required
                        disabled={loading}
                        type="text"
                        name="name"
                        className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent disabled:opacity-60"
                        placeholder="Tu nombre"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-foreground">
                        Empresa
                      </span>
                      <input
                        disabled={loading}
                        type="text"
                        name="company"
                        className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent disabled:opacity-60"
                        placeholder="Nombre del negocio"
                      />
                    </label>
                  </div>
                  <label className="mt-5 block">
                    <span className="text-sm font-medium text-foreground">
                      Email
                    </span>
                    <input
                      required
                      disabled={loading}
                      type="email"
                      name="email"
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent disabled:opacity-60"
                      placeholder="tu@email.com"
                    />
                  </label>
                  <label className="mt-5 block">
                    <span className="text-sm font-medium text-foreground">
                      ¿Qué necesitás?
                    </span>
                    <select
                      disabled={loading}
                      name="service"
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent disabled:opacity-60"
                    >
                      <option>Landing page</option>
                      <option>Sitio corporativo</option>
                      <option>Tienda online</option>
                      <option>Portfolio</option>
                      <option>Aplicación web</option>
                      <option>Otro / No estoy seguro</option>
                    </select>
                  </label>
                  <label className="mt-5 block">
                    <span className="text-sm font-medium text-foreground">
                      Mensaje
                    </span>
                    <textarea
                      required
                      disabled={loading}
                      name="message"
                      rows={4}
                      className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent disabled:opacity-60"
                      placeholder="Contanos sobre tu proyecto, plazos y presupuesto aproximado..."
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-sm font-semibold text-white transition-all hover:bg-accent-dark hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Enviando…
                      </>
                    ) : (
                      <>
                        Enviar consulta
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
