"use client";

import { AK_CATEGORIES, AROMAS_KYM_CONFIG } from "@/lib/aromas-kym";

const INFO_LINKS = [
  { label: "Envíos & retiros", href: "#" },
  { label: "Cambios y devoluciones", href: "#" },
  { label: "Preguntas frecuentes", href: "#" },
  { label: "Talleres en el atelier", href: "#" },
  { label: "Mayoristas", href: "#" },
];

const PAYMENT_METHODS = ["Visa", "Mastercard", "Amex", "MercadoPago", "Transferencia"];

export function AromasKymFooter() {
  const cfg = AROMAS_KYM_CONFIG;
  return (
    <footer className="border-t border-[#e8e1d4] bg-[#1c1814] pt-24 text-[#fbf8f1] md:pt-32">
      <div className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 md:pb-16">
        {/* Brand mark row */}
        <div className="mb-16 flex flex-col items-start justify-between gap-10 border-b border-[#fbf8f1]/10 pb-12 md:flex-row md:items-end md:gap-16 md:pb-16">
          <div className="max-w-md">
            <p
              className="text-[#fbf8f1]"
              style={{
                fontFamily: "var(--ak-serif)",
                fontStyle: "italic",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {cfg.brand}
            </p>
            <p className="mt-5 max-w-sm text-balance text-base leading-relaxed text-[#fbf8f1]/65">
              {cfg.tagline} Un atelier de aromas en Spegazzini, Buenos Aires —
              piezas hechas a mano para tu casa.
            </p>
          </div>

          <a
            href="#coleccion"
            className="group inline-flex items-center gap-3 rounded-full border border-[#fbf8f1]/30 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[#fbf8f1] transition hover:border-[#b85a3c] hover:bg-[#b85a3c]"
          >
            Comprar ahora
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* 4-col grid */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 md:gap-14">
          {/* Col 1: Catálogo */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#fbf8f1]/45">
              Catálogo
            </p>
            <ul className="mt-5 space-y-3">
              {AK_CATEGORIES.map((c) => (
                <li key={c.id}>
                  <a
                    href="#coleccion"
                    className="text-sm text-[#fbf8f1]/85 transition hover:text-[#b85a3c]"
                    style={{
                      fontFamily:
                        "var(--ak-serif)",
                      fontStyle: "italic",
                      fontSize: "1.1rem",
                    }}
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Información */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#fbf8f1]/45">
              Información
            </p>
            <ul className="mt-5 space-y-3">
              {INFO_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-[#fbf8f1]/80 transition hover:text-[#b85a3c]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contacto */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#fbf8f1]/45">
              Contacto
            </p>
            <ul className="mt-5 space-y-3 text-sm text-[#fbf8f1]/80">
              <li>
                <a
                  href="mailto:hola@aromaskym.com.ar"
                  className="transition hover:text-[#b85a3c]"
                >
                  hola@aromaskym.com.ar
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/541100000000"
                  className="transition hover:text-[#b85a3c]"
                >
                  WhatsApp · +54 9 11 0000 0000
                </a>
              </li>
              <li className="pt-2 text-[#fbf8f1]/60">
                Av. Spegazzini 1830,
                <br />
                Buenos Aires (1810)
              </li>
            </ul>
            <a
              href="https://instagram.com/aromaskym"
              className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#fbf8f1]/80 transition hover:text-[#b85a3c]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
              </svg>
              @aromaskym
            </a>
          </div>

          {/* Col 4: Atelier hours */}
          <div className="col-span-2 sm:col-span-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#fbf8f1]/45">
              Atelier
            </p>
            <ul className="mt-5 space-y-3 text-sm text-[#fbf8f1]/80">
              <li>
                <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-[#fbf8f1]/45">
                  Lunes a viernes
                </span>
                10 — 19 h
              </li>
              <li>
                <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-[#fbf8f1]/45">
                  Sábados
                </span>
                10 — 14 h
              </li>
              <li className="pt-2 text-[#fbf8f1]/60">
                Talleres mensuales con cupo limitado. Reservas por WhatsApp.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-[#fbf8f1]/10 pt-8 md:flex-row md:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#fbf8f1]/45">
            © {new Date().getFullYear()} {cfg.brand} · Todos los derechos reservados
          </p>

          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#fbf8f1]/45">
            {PAYMENT_METHODS.map((m, i) => (
              <span key={m} className="flex items-center gap-4">
                {i > 0 ? <span className="h-1 w-1 rounded-full bg-[#fbf8f1]/30" /> : null}
                {m}
              </span>
            ))}
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#fbf8f1]/45">
            Hecho en Buenos Aires
          </p>
        </div>
      </div>
    </footer>
  );
}
