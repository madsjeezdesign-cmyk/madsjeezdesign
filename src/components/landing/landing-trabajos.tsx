"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type CaseStudy = {
  slug: string;
  brand: string;
  industry: string;
  description: string;
  accent: string;
  /** "lg" = col-span-2 row-span-2, "md" = col-span-2, "sm" = col-span-1 */
  size: "lg" | "md" | "sm";
  /** Card background recipe — kept editorial; never glass. */
  variant: "dark" | "light" | "warm" | "cool" | "rose" | "amber";
};

const cases: CaseStudy[] = [
  {
    slug: "luna-petit-co",
    brand: "Luna Petit & Co.",
    industry: "Moda infantil premium",
    description:
      "E-commerce con bento, animaciones y catálogo curado para una marca de lujo.",
    accent: "#E8D5D0",
    size: "lg",
    variant: "rose",
  },
  {
    slug: "nido-linaje",
    brand: "Nido & Linaje",
    industry: "Blanquería premium",
    description:
      "Checkout cuidado, variantes y un look editorial para textiles del hogar.",
    accent: "#78716c",
    size: "md",
    variant: "light",
  },
  {
    slug: "intima-co",
    brand: "Íntima & Co.",
    industry: "Lencería · bienestar",
    description: "Talles, packs y checkout sin fricción.",
    accent: "#9f1239",
    size: "sm",
    variant: "rose",
  },
  {
    slug: "tattoo",
    brand: "Oráculo Ink Lab",
    industry: "Estudio de tatuaje",
    description: "Identidad oscura, reservas y portfolio.",
    accent: "#e11d48",
    size: "sm",
    variant: "dark",
  },
  {
    slug: "restaurante",
    brand: "La Mesa Norteña",
    industry: "Restaurante & bar",
    description: "Reservas, carta y delivery en un click.",
    accent: "#9f1239",
    size: "sm",
    variant: "warm",
  },
  {
    slug: "raices-criollas",
    brand: "Raíces Criollas",
    industry: "Pulpería premium",
    description: "Mates, fiambres y caja regalo.",
    accent: "#b45309",
    size: "sm",
    variant: "amber",
  },
];

function CardSurface({
  variant,
  accent,
}: {
  variant: CaseStudy["variant"];
  accent: string;
}) {
  // Per-variant editorial backgrounds. Solid surfaces only, no glass.
  if (variant === "dark") {
    return (
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 0%, ${accent}22, transparent 55%),
            linear-gradient(155deg, #11151c 0%, #06080c 100%)
          `,
        }}
      />
    );
  }
  if (variant === "warm") {
    return (
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 80% 0%, ${accent}33, transparent 60%),
            linear-gradient(170deg, #1c1410 0%, #0c0807 100%)
          `,
        }}
      />
    );
  }
  if (variant === "cool") {
    return (
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 60% 30%, ${accent}33, transparent 60%),
            linear-gradient(165deg, #0f1419 0%, #060a10 100%)
          `,
        }}
      />
    );
  }
  if (variant === "rose") {
    return (
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 10%, ${accent}77, transparent 60%),
            linear-gradient(160deg, #FAF6F4 0%, #F1E8E5 100%)
          `,
        }}
      />
    );
  }
  if (variant === "amber") {
    return (
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 70% 10%, ${accent}33, transparent 55%),
            linear-gradient(165deg, #FBF6EE 0%, #F1E5CC 100%)
          `,
        }}
      />
    );
  }
  // light default
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(ellipse at 25% 0%, ${accent}22, transparent 60%),
          linear-gradient(170deg, #FAFAF8 0%, #EDEAE4 100%)
        `,
      }}
    />
  );
}

function isDark(variant: CaseStudy["variant"]) {
  return variant === "dark" || variant === "warm" || variant === "cool";
}

function Card({ c }: { c: CaseStudy }) {
  const dark = isDark(c.variant);
  const titleColor = dark ? "#f8fafc" : "#0f172a";
  const bodyColor = dark ? "#cbd5e1" : "#475569";
  const microColor = dark ? "#94a3b8" : "#64748b";

  const sizeClasses =
    c.size === "lg"
      ? "md:col-span-2 md:row-span-2 min-h-[400px] md:min-h-[520px]"
      : c.size === "md"
        ? "md:col-span-2 min-h-[260px]"
        : "md:col-span-1 min-h-[260px]";

  return (
    <Link
      href={`/demos/${c.slug}`}
      className="group relative block overflow-hidden hairline transition-[transform,border-color] hover:-translate-y-0.5"
      style={{
        borderRadius: "var(--radius-lg)",
        transitionDuration: "var(--duration-ui)",
        transitionTimingFunction: "var(--ease-ui)",
      }}
    >
      <div
        className={`relative ${sizeClasses}`}
        style={{
          background: "var(--card)",
        }}
      >
        <CardSurface variant={c.variant} accent={c.accent} />

        {/* Subtle accent border on hover */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            border: `1px solid ${c.accent}66`,
            borderRadius: "var(--radius-lg)",
            transitionDuration: "var(--duration-ui)",
            transitionTimingFunction: "var(--ease-ui)",
          }}
        />

        {/* Content */}
        <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: c.accent }}
            />
            <span
              className="text-micro font-[family-name:var(--font-jetbrains)]"
              style={{ color: microColor }}
            >
              {c.industry}
            </span>
          </div>

          {/* Brand showcase area (large card gets a typographic moment) */}
          {c.size === "lg" ? (
            <div className="my-8 md:my-12">
              <p
                className="font-[family-name:var(--font-instrument)] text-balance"
                style={{
                  color: titleColor,
                  fontSize: "var(--font-size-display-2)",
                  lineHeight: "var(--leading-display)",
                  letterSpacing: "var(--tracking-display)",
                }}
              >
                {c.brand.split("&")[0].trim()}{" "}
                <span className="italic" style={{ color: c.accent }}>
                  &
                </span>
                {c.brand.split("&")[1] ?? ""}
              </p>
            </div>
          ) : null}

          <div>
            {c.size !== "lg" ? (
              <h3
                className="font-[family-name:var(--font-instrument)]"
                style={{
                  color: titleColor,
                  fontSize: c.size === "md" ? "2rem" : "1.5rem",
                  lineHeight: "var(--leading-heading)",
                  letterSpacing: "var(--tracking-heading)",
                }}
              >
                {c.brand}
              </h3>
            ) : null}

            <p
              className="mt-2 max-w-[40ch] text-sm"
              style={{
                color: bodyColor,
                lineHeight: "var(--leading-body)",
              }}
            >
              {c.description}
            </p>

            <span
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-transform group-hover:translate-x-0.5"
              style={{
                color: titleColor,
                transitionDuration: "var(--duration-snap)",
                transitionTimingFunction: "var(--ease-snap)",
              }}
            >
              Ver caso
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function LandingTrabajos() {
  return (
    <section
      id="trabajos"
      className="scroll-mt-24 px-6 py-24 md:px-10 md:py-32"
      style={{ background: "var(--background)" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header — left title, right link, no eyebrow ALL-CAPS */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4 md:mb-16">
          <div>
            <p className="text-micro font-[family-name:var(--font-jetbrains)]">
              Algunos trabajos
            </p>
            <h2
              className="mt-3 font-[family-name:var(--font-instrument)] text-body-strong"
              style={{
                fontSize: "var(--font-size-h1)",
                lineHeight: "var(--leading-heading)",
                letterSpacing: "var(--tracking-heading)",
              }}
            >
              Casos seleccionados,{" "}
              <span className="italic" style={{ color: "var(--accent)" }}>
                en vivo
              </span>
              .
            </h2>
          </div>

          <Link
            href="/demos"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-body-strong transition-colors hover:text-[var(--accent)]"
            style={{
              transitionDuration: "var(--duration-snap)",
              transitionTimingFunction: "var(--ease-snap)",
            }}
          >
            Ver todos
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Bento — 4 cols on desktop with mixed spans */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-5">
          {cases.map((c) => (
            <Card key={c.slug} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
