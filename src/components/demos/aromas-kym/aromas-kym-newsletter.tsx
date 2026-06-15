"use client";

import { ArrowRight, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function AromasKymNewsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.querySelectorAll(".ak-reveal").forEach((n) => n.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.2 }
    );
    el.querySelectorAll(".ak-reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      ref={ref}
      className="relative scroll-mt-28 border-t border-[#e8e1d4] bg-[#f1ebdd] py-28 md:py-36"
    >
      {/* Decorative botanical SVG line on top */}
      <svg
        aria-hidden
        viewBox="0 0 1200 30"
        className="absolute inset-x-0 top-0 h-6 w-full text-[#b85a3c]/30"
        preserveAspectRatio="none"
      >
        <path
          d="M0 15 Q150 0 300 15 T600 15 T900 15 T1200 15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <div className="ak-reveal mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.04em] text-[#8d8074]">
          V — Carta abierta
        </p>
        <h2
          className="mt-5 text-balance text-[#1c1814]"
          style={{
            fontFamily: "var(--ak-serif)",
            fontSize: "clamp(2.25rem, 5.5vw, 4.25rem)",
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
          }}
        >
          Recetas, rituales{" "}
          <em className="text-[#b85a3c]">y descuentos</em>{" "}
          al inbox.
        </h2>
        <p className="mt-6 text-balance text-base leading-relaxed text-[#5a4e44] md:text-[17px]">
          Una vez al mes. Lo que aprendimos en el taller, una receta de cera para probar
          en casa y un descuento del 10% en tu próxima compra.
        </p>

        <form
          onSubmit={submit}
          className="mx-auto mt-12 flex max-w-xl flex-col items-stretch gap-3 sm:flex-row sm:gap-0"
        >
          <label htmlFor="ak-email" className="sr-only">
            Tu email
          </label>
          <input
            id="ak-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="flex-1 rounded-full border border-[#e8e1d4] bg-[#fbf8f1] px-6 py-4 text-base text-[#1c1814] placeholder:text-[#8d8074] focus:border-[#b85a3c] focus:outline-none focus:ring-2 focus:ring-[#b85a3c]/15 sm:rounded-l-full sm:rounded-r-none sm:border-r-0"
          />
          <button
            type="submit"
            disabled={sent}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1c1814] px-7 py-4 font-mono text-[11px] uppercase tracking-[0.04em] text-[#fbf8f1] transition hover:bg-[#b85a3c] disabled:opacity-90 sm:rounded-l-none sm:rounded-r-full"
          >
            {sent ? (
              <>
                <Check className="h-4 w-4" strokeWidth={2} /> Enviado
              </>
            ) : (
              <>
                Suscribirme
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.04em] text-[#8d8074]">
          Sin spam. Te podés dar de baja en cualquier momento.
        </p>
      </div>
    </section>
  );
}
