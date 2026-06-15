"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogoMark } from "@/components/brand/logo";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Error al iniciar sesión.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Error de conexión.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center px-4 font-[family-name:var(--font-plus-jakarta)]"
      style={{ background: "var(--inverse-bg)", color: "var(--inverse-fg)" }}
    >
      {/* Ambient brand glow behind the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 gradient-mesh-cyan opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, color-mix(in srgb, var(--brand-cyan) 14%, transparent), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <Link
        href="/"
        aria-label="MadsJeezDesign — Volver al sitio"
        className="relative z-10 mb-8 inline-flex items-center gap-3"
      >
        <LogoMark size={44} />
        <span
          style={{
            fontFamily: "var(--font-brand), var(--font-sans), sans-serif",
            fontSize: "1.0625rem",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--inverse-fg)",
          }}
        >
          Mads<span style={{ color: "var(--brand-cyan)" }}>Jeez</span>Design
        </span>
      </Link>

      <div
        className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl p-8"
        style={{
          background: "rgba(15, 23, 42, 0.55)",
          border: "1px solid color-mix(in srgb, var(--brand-cyan) 22%, rgba(255,255,255,0.05))",
          boxShadow:
            "0 28px 72px -28px color-mix(in srgb, var(--brand-cyan) 32%, transparent), 0 8px 24px -12px rgba(0,0,0,0.45)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <p className="section-eyebrow mb-3">Panel privado</p>
        <h1
          className="font-[family-name:var(--font-instrument)]"
          style={{
            fontSize: "var(--font-size-h2)",
            lineHeight: "var(--leading-heading)",
            letterSpacing: "var(--tracking-heading)",
            color: "var(--inverse-fg)",
          }}
        >
          Panel de leads
        </h1>
        <p
          className="mt-1.5 text-sm"
          style={{
            color: "var(--muted-body)",
            lineHeight: "var(--leading-body)",
          }}
        >
          Acceso solo para el estudio.
        </p>

        <form onSubmit={onSubmit} className="mt-7 space-y-4">
          {error && (
            <p
              role="alert"
              className="rounded-lg border px-3 py-2 text-center text-sm"
              style={{
                borderColor: "rgba(239, 68, 68, 0.4)",
                background: "rgba(239, 68, 68, 0.10)",
                color: "#fca5a5",
              }}
            >
              {error}
            </p>
          )}

          <label className="block">
            <span
              className="block text-xs"
              style={{
                fontFamily: "var(--font-mono), monospace",
                color: "var(--muted-body)",
                letterSpacing: "var(--tracking-micro)",
              }}
            >
              Email
            </span>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="mt-1.5 w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors disabled:opacity-50"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "var(--inverse-fg)",
                transitionDuration: "var(--duration-snap)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor =
                  "color-mix(in srgb, var(--brand-cyan) 55%, transparent)";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px color-mix(in srgb, var(--brand-cyan) 15%, transparent)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </label>

          <label className="block">
            <span
              className="block text-xs"
              style={{
                fontFamily: "var(--font-mono), monospace",
                color: "var(--muted-body)",
                letterSpacing: "var(--tracking-micro)",
              }}
            >
              Contraseña
            </span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="mt-1.5 w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors disabled:opacity-50"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "var(--inverse-fg)",
                transitionDuration: "var(--duration-snap)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor =
                  "color-mix(in srgb, var(--brand-cyan) 55%, transparent)";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px color-mix(in srgb, var(--brand-cyan) 15%, transparent)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="glow-cyan-sm w-full rounded-xl py-3 text-sm font-semibold transition-all disabled:opacity-50"
            style={{
              background: "var(--brand-cyan)",
              color: "#06141f",
              fontFamily: "var(--font-brand), var(--font-sans), sans-serif",
              transitionDuration: "var(--duration-snap)",
            }}
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <p
          className="mt-5 text-center text-xs"
          style={{
            fontFamily: "var(--font-mono), monospace",
            color: "var(--muted-body)",
            letterSpacing: "var(--tracking-micro)",
          }}
        >
          Diseñado y servido por MadsJeezDesign
        </p>
      </div>
    </div>
  );
}
