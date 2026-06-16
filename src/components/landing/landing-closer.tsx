"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/primitives";
import { site } from "@/lib/data";
import { useMotionTransition } from "@/lib/motion";

/**
 * Full-bleed closer CTA — the bold "let's work together" moment right before
 * the contact form. Dark inverse surface, animated gradient mesh, huge
 * Instrument Serif headline with a cyan italic accent, one magnetic primary
 * CTA + a WhatsApp secondary. The emotional peak of the selling page.
 */
export function LandingCloser() {
  const reduced = useReducedMotion();
  const tHead = useMotionTransition("display", "display");

  return (
    <section
      aria-label="Trabajemos juntos"
      className="relative overflow-hidden px-6 py-28 md:px-10 md:py-40"
      style={{ background: "var(--inverse-bg)", color: "var(--inverse-fg)" }}
    >
      {/* Animated gradient mesh atmosphere */}
      <div
        aria-hidden
        className="gradient-mesh-cyan pointer-events-none absolute inset-0 opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 120%, color-mix(in srgb, var(--brand-cyan) 22%, transparent), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={tHead}
          className="section-eyebrow mx-auto mb-6 w-fit"
        >
          Próximo proyecto
        </motion.p>

        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ ...tHead, delay: reduced ? 0 : 0.08 }}
          className="font-[family-name:var(--font-instrument)] text-balance"
          style={{
            fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
            lineHeight: 1.02,
            letterSpacing: "var(--tracking-display)",
            color: "var(--inverse-fg)",
          }}
        >
          ¿Hacemos algo que{" "}
          <span className="italic" style={{ color: "var(--brand-cyan)" }}>
            venda
          </span>
          ?
        </motion.h2>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ ...tHead, delay: reduced ? 0 : 0.16 }}
          className="mx-auto mt-6 max-w-xl text-balance"
          style={{
            fontSize: "1.125rem",
            lineHeight: "var(--leading-body)",
            color: "var(--muted-body)",
          }}
        >
          Contanos tu idea y te pasamos alcance, tiempos y presupuesto claro en
          menos de 48 h. Sin compromiso.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ ...tHead, delay: reduced ? 0 : 0.24 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <MagneticButton href="#contacto" variant="primary" strength={10}>
            Pedir presupuesto
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors"
            style={{
              border: "1px solid color-mix(in srgb, var(--inverse-fg) 16%, transparent)",
              color: "var(--inverse-fg)",
              transitionDuration: "var(--duration-snap)",
            }}
          >
            Escribir por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
