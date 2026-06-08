"use client";

import { motion } from "framer-motion";
import {
  Check,
  Globe,
  GitBranch,
  Rocket,
  LifeBuoy,
  Sparkles,
  Code2,
  ArrowRight,
} from "lucide-react";
import { useMotionTransition, useReducedMotion } from "@/lib/motion";
import { websiteModels } from "@/lib/data";

type Plan = (typeof websiteModels)[number] & {
  highlighted?: boolean;
  badge?: string;
  ctaLabel?: string;
  ctaHref?: string;
  isQuote?: boolean;
};

/**
 * Pricing section — 4-tier comparison with highlighted "más popular" plan.
 *
 * Layout: 4-col grid on desktop with the personalizado plan visually elevated
 * (lifted -8px, accent border, soft mesh glow, primary CTA). Mobile stacks
 * with the highlighted plan FIRST to anchor decision-making.
 *
 * Motion: each card fades up with 80ms stagger on viewport entry (display speed);
 * hover lifts 2px + accent border (snap speed). Both respect reduced motion.
 */
export function LandingPlans() {
  const reduced = useReducedMotion();
  const tDisplay = useMotionTransition("display", "display");
  const tSnap = useMotionTransition("snap", "snap");

  // Decorate the raw data with display intent (which is "más popular", CTA copy).
  const plans: Plan[] = websiteModels.map((m) => {
    const isHighlighted = m.id === "personalizado";
    const isQuote = m.id === "desarrollo";
    return {
      ...m,
      highlighted: isHighlighted,
      badge: isHighlighted ? "Más popular" : undefined,
      ctaLabel: isQuote ? "Cotizar" : "Pedir este plan",
      ctaHref: "#contacto",
      isQuote,
    };
  });

  // Desktop ordering: básico, completo, personalizado, desarrollo (highlighted = idx 2)
  // Mobile (sm): highlighted first to anchor decision. Done via CSS order below.

  const includedAll = [
    { icon: Globe, label: "Dominio + hosting" },
    { icon: GitBranch, label: "Versionado git" },
    { icon: Rocket, label: "Deploy Railway / Vercel" },
    { icon: LifeBuoy, label: "Soporte post-lanzamiento" },
    { icon: Sparkles, label: "Iteraciones de diseño" },
    { icon: Code2, label: "Código 100% tuyo" },
  ];

  return (
    <section
      id="planes"
      className="scroll-mt-24 px-6 py-24 md:px-10 md:py-32"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--hairline)",
        borderBottom: "1px solid var(--hairline)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 max-w-2xl md:mb-20">
          <p className="text-micro font-[family-name:var(--font-jetbrains)]">
            Planes · Sin sorpresas · Iteramos hasta que cierra
          </p>
          <h2
            className="mt-3 font-[family-name:var(--font-instrument)] text-body-strong"
            style={{
              fontSize: "var(--font-size-h1)",
              lineHeight: "var(--leading-heading)",
              letterSpacing: "var(--tracking-heading)",
            }}
          >
            Una idea clara de lo que{" "}
            <span className="italic" style={{ color: "var(--accent)" }}>
              cuesta
            </span>
            .
          </h2>
          <p
            className="mt-5 max-w-[60ch] text-body"
            style={{ lineHeight: "var(--leading-body)" }}
          >
            Cuatro modelos según el alcance. Todos llaves en mano: diseño, código,
            deploy y soporte. Sin letra chica.
          </p>
        </div>

        {/* Plan grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:items-stretch">
          {plans.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={i}
              tDisplay={tDisplay}
              tSnap={tSnap}
              reduced={reduced}
            />
          ))}
        </div>

        {/* "Qué incluye TODO" strip */}
        <div
          className="mt-16 pt-10 md:mt-20 md:pt-12"
          style={{ borderTop: "1px solid var(--hairline)" }}
        >
          <p
            className="text-micro font-[family-name:var(--font-jetbrains)]"
            style={{ marginBottom: "1rem" }}
          >
            Qué incluye TODO plan
          </p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-3 lg:grid-cols-6">
            {includedAll.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5">
                <Icon
                  className="h-4 w-4 shrink-0"
                  style={{ color: "var(--accent)" }}
                  strokeWidth={1.75}
                />
                <span className="text-micro font-[family-name:var(--font-jetbrains)] text-body-strong">
                  {label}
                </span>
              </li>
            ))}
          </ul>

          {/* Bottom note + link to contacto */}
          <p
            className="mt-10 text-body"
            style={{ lineHeight: "var(--leading-body)" }}
          >
            ¿Necesitás algo distinto?{" "}
            <a
              href="#contacto"
              className="group inline-flex items-center gap-1 text-body-strong transition-colors hover:text-[var(--accent)]"
              style={{
                textDecoration: "underline",
                textDecorationColor: "var(--hairline)",
                textUnderlineOffset: "4px",
                transitionDuration: "var(--duration-snap)",
                transitionTimingFunction: "var(--ease-snap)",
              }}
            >
              Cotización gratis en 48 h
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* PlanCard                                                          */
/* ---------------------------------------------------------------- */

function PlanCard({
  plan,
  index,
  tDisplay,
  tSnap,
  reduced,
}: {
  plan: Plan;
  index: number;
  tDisplay: ReturnType<typeof useMotionTransition>;
  tSnap: ReturnType<typeof useMotionTransition>;
  reduced: boolean;
}) {
  const stagger = reduced ? 0 : 0.08 * index;
  const initial = reduced ? false : { opacity: 0, y: 24 };

  const highlighted = !!plan.highlighted;

  // Keep natural array order on every breakpoint: básico → completo →
  // personalizado (highlighted) → desarrollo. The highlighted plan stands
  // out via border/glow, not by jumping out of sequence.

  return (
    <motion.article
      initial={initial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        ...tDisplay,
        delay: typeof tDisplay === "object" && "duration" in tDisplay && tDisplay.duration === 0
          ? 0
          : stagger,
      }}
      whileHover={
        reduced
          ? undefined
          : { y: -2, transition: tSnap }
      }
      className="group relative flex flex-col overflow-hidden"
      style={{
        background: highlighted ? "var(--card)" : "var(--card)",
        border: highlighted
          ? "1px solid color-mix(in srgb, var(--accent) 55%, var(--hairline))"
          : "1px solid var(--hairline)",
        borderRadius: "var(--radius-lg)",
        boxShadow: highlighted
          ? "0 1px 2px rgb(0 0 0 / 0.04), 0 14px 40px -16px color-mix(in srgb, var(--accent) 35%, transparent), 0 8px 24px -12px rgb(0 0 0 / 0.10)"
          : "0 1px 2px rgb(0 0 0 / 0.03)",
        transform: highlighted ? "translateY(-8px)" : undefined,
        transition: "border-color var(--duration-snap) var(--ease-snap), box-shadow var(--duration-snap) var(--ease-snap)",
      }}
    >
      {/* Soft mesh glow — highlighted only */}
      {highlighted ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--accent) 18%, transparent) 0%, transparent 55%)",
          }}
        />
      ) : null}

      {/* Top badge */}
      {plan.badge ? (
        <div
          className="relative flex items-center justify-center pt-5"
          style={{ minHeight: "2.75rem" }}
        >
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-micro font-[family-name:var(--font-jetbrains)] text-body-strong"
            style={{
              background: "color-mix(in srgb, var(--accent) 14%, var(--card))",
              border: "1px solid color-mix(in srgb, var(--accent) 35%, var(--hairline))",
              color: "var(--accent)",
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            {plan.badge}
          </span>
        </div>
      ) : (
        // Spacer so heights line up across all 4 cards on desktop
        <div className="hidden lg:block" style={{ height: "2.75rem" }} />
      )}

      <div className="relative flex flex-1 flex-col p-6 md:p-7">
        {/* Plan name */}
        <h3
          className="text-body-strong"
          style={{
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            fontSize: "1.125rem",
            fontWeight: 600,
            letterSpacing: "var(--tracking-heading)",
          }}
        >
          {plan.name}
        </h3>

        {/* Subtitle */}
        <p
          className="mt-1.5 text-body"
          style={{
            fontSize: "var(--font-size-small)",
            lineHeight: "var(--leading-body)",
          }}
        >
          {plan.subtitle}
        </p>

        {/* Price BIG */}
        <div className="mt-6 mb-5">
          {plan.isQuote ? (
            <p
              className="font-[family-name:var(--font-instrument)] italic text-body-strong"
              style={{
                fontSize: "var(--font-size-display-2)",
                lineHeight: "var(--leading-display)",
                letterSpacing: "var(--tracking-display)",
              }}
            >
              Cotizar
            </p>
          ) : (
            <div className="flex items-baseline gap-2">
              <span
                className="font-[family-name:var(--font-instrument)] text-body-strong"
                style={{
                  fontSize: "var(--font-size-display-2)",
                  lineHeight: "var(--leading-display)",
                  letterSpacing: "var(--tracking-display)",
                }}
              >
                {formatPrice(plan.priceNote)}
              </span>
              <span
                className="text-micro font-[family-name:var(--font-jetbrains)]"
                style={{ color: "var(--muted-body)" }}
              >
                ARS
              </span>
            </div>
          )}
        </div>

        {/* CTA */}
        <a
          href={plan.ctaHref}
          className="group/cta inline-flex w-full items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-medium transition-all"
          style={
            highlighted
              ? {
                  background: "var(--accent)",
                  color: "#fff",
                  border: "1px solid var(--accent)",
                  transitionDuration: "var(--duration-snap)",
                  transitionTimingFunction: "var(--ease-snap)",
                }
              : {
                  background: "transparent",
                  color: "var(--foreground)",
                  border: "1px solid var(--hairline)",
                  transitionDuration: "var(--duration-snap)",
                  transitionTimingFunction: "var(--ease-snap)",
                }
          }
          onMouseEnter={(e) => {
            if (!highlighted) {
              e.currentTarget.style.borderColor =
                "color-mix(in srgb, var(--accent) 60%, var(--hairline))";
            }
          }}
          onMouseLeave={(e) => {
            if (!highlighted) {
              e.currentTarget.style.borderColor = "var(--hairline)";
            }
          }}
        >
          {plan.ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
        </a>

        {/* Hairline divider */}
        <div
          className="my-6"
          style={{ height: "1px", background: "var(--hairline)" }}
        />

        {/* Ideal para */}
        <p
          className="font-[family-name:var(--font-instrument)] italic"
          style={{
            color: "var(--muted-body)",
            fontSize: "0.95rem",
            lineHeight: "var(--leading-body)",
          }}
        >
          <span
            className="not-italic text-micro font-[family-name:var(--font-jetbrains)] text-body-strong"
            style={{ display: "block", marginBottom: "0.35rem" }}
          >
            Ideal para
          </span>
          {plan.idealFor}
        </p>

        {/* Feature list */}
        <ul className="mt-5 space-y-3">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <span
                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: highlighted
                    ? "color-mix(in srgb, var(--accent) 18%, transparent)"
                    : "var(--surface)",
                  border: "1px solid color-mix(in srgb, var(--accent) 35%, var(--hairline))",
                }}
              >
                <Check
                  className="h-3 w-3"
                  style={{ color: "var(--accent)" }}
                  strokeWidth={2.5}
                />
              </span>
              <span
                className="text-body"
                style={{
                  fontSize: "var(--font-size-small)",
                  lineHeight: "var(--leading-body)",
                  color: "var(--foreground)",
                }}
              >
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

/* ---------------------------------------------------------------- */
/* Helpers                                                          */
/* ---------------------------------------------------------------- */

/**
 * Convert "ARS 75.000" → "$75.000" for display. Keeps "Cotizar" untouched.
 */
function formatPrice(raw: string): string {
  const match = raw.match(/(\d[\d.]*)/);
  if (!match) return raw;
  return `$${match[1]}`;
}
