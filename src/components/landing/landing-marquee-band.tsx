import { Marquee } from "@/components/primitives";

/**
 * Value-prop marquee band — the agency-site moving text strip. Sits between
 * sections as a rhythm break. Big Instrument Serif words separated by a cyan
 * star, looping infinitely, paused on hover.
 */
const WORDS = [
  "Diseño a medida",
  "Código propio",
  "Performance real",
  "SEO técnico",
  "Mobile-first",
  "E-commerce",
  "Integraciones",
  "Soporte humano",
];

export function LandingMarqueeBand() {
  return (
    <section
      aria-label="Lo que hacemos"
      className="relative overflow-hidden border-y py-8 md:py-10"
      style={{
        background: "var(--inverse-bg)",
        borderColor: "color-mix(in srgb, var(--brand-cyan) 16%, transparent)",
      }}
    >
      <Marquee speed={36}>
        {WORDS.map((w, i) => (
          <span key={i} className="flex items-center">
            <span
              className="px-6 font-[family-name:var(--font-instrument)] md:px-9"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                lineHeight: 1,
                letterSpacing: "var(--tracking-heading)",
                color: "var(--inverse-fg)",
                whiteSpace: "nowrap",
              }}
            >
              {w}
            </span>
            <span
              aria-hidden
              style={{
                color: "var(--brand-cyan)",
                fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
              }}
            >
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
