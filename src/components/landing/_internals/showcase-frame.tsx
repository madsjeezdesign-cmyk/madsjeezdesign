"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { DemoMeta } from "@/lib/demos-registry";
import { useReducedMotion } from "@/lib/motion";

/**
 * ShowcaseFrame — composed mock-browser preview of a single demo.
 *
 * Renders a realistic browser chrome (traffic lights + URL bar with a subtle
 * backdrop-blur ONLY on the URL pill — banlist-compliant) and a CSS-only
 * editorial hero composition driven by the demo's `accent` + `previewClass`.
 *
 * Adds mouse-parallax (2deg perspective tilt) that respects reduced motion.
 */
export function ShowcaseFrame({ demo }: { demo: DemoMeta }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Mouse parallax — tilt the frame slightly toward the cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [2, -2]), {
    stiffness: 140,
    damping: 18,
    mass: 0.5,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-2, 2]), {
    stiffness: 140,
    damping: 18,
    mass: 0.5,
  });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  // Pretty-format the slug as if it were a URL path
  const urlPath = `madsjeezdesign.com/demos/${demo.slug}`;

  // Derive a sensible CTA label from industry / accent vibe
  const ctaLabel = getCta(demo);

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ rotateX: reduced ? 0 : rx, rotateY: reduced ? 0 : ry, transformStyle: "preserve-3d" }}
        className="relative w-full overflow-hidden"
      >
        {/* Glow on the frame edge — accent-tinted, low alpha */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-[20px]"
          style={{
            background: `radial-gradient(120% 80% at 50% 0%, ${demo.accent}24, transparent 60%)`,
            filter: "blur(20px)",
            opacity: 0.55,
          }}
        />

        <div
          className="relative w-full overflow-hidden rounded-[18px]"
          style={{
            background: "#0b1120",
            border: `1px solid color-mix(in srgb, ${demo.accent} 18%, transparent)`,
            boxShadow:
              "0 30px 70px -30px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.04) inset",
            aspectRatio: "16 / 10",
          }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-2 px-3 py-2"
            style={{
              background: "rgba(10, 15, 26, 0.6)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
            </div>
            <div
              className="ml-3 flex flex-1 items-center gap-2 rounded-md px-3 py-1"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                fontFamily: "var(--font-jetbrains), monospace",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: demo.accent }}
              />
              <span
                className="truncate text-[10px]"
                style={{
                  color: "rgba(226,232,240,0.7)",
                  letterSpacing: "var(--tracking-micro)",
                }}
              >
                {urlPath}
              </span>
            </div>
          </div>

          {/* Hero composition — accent-driven CSS scene */}
          <div className={`relative flex h-[calc(100%-2.5rem)] bg-gradient-to-br ${demo.previewClass}`}>
            <FrameComposition demo={demo} ctaLabel={ctaLabel} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* -----------------------------------------------------------
 * Inner composition — varies per demo via accent + simple shapes.
 * Two columns: editorial copy left, hero "image" area right.
 * --------------------------------------------------------- */

function FrameComposition({
  demo,
  ctaLabel,
}: {
  demo: DemoMeta;
  ctaLabel: string;
}) {
  const isLight = isLightPreview(demo.previewClass);
  const titleColor = isLight ? "#0f172a" : "#f8fafc";
  const subColor = isLight ? "#475569" : "rgba(226,232,240,0.78)";
  const microColor = isLight ? "rgba(15,23,42,0.55)" : "rgba(226,232,240,0.62)";
  const hairline = isLight ? "rgba(15,23,42,0.10)" : "rgba(255,255,255,0.08)";
  const softBg = isLight ? "rgba(15,23,42,0.04)" : "rgba(255,255,255,0.04)";
  const ctaTextColor = pickCtaText(demo.accent);
  const navLinks = navFor(demo);
  const products = productsFor(demo);
  const stats = statsFor(demo);

  return (
    <div className="flex h-full w-full flex-col">
      {/* MOCK NAVBAR — gives the preview an actual "site" feel */}
      <div
        className="flex items-center justify-between gap-3 px-5 py-3"
        style={{
          borderBottom: `1px solid ${hairline}`,
          background: isLight ? "rgba(255,255,255,0.6)" : "rgba(10,15,26,0.45)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="inline-flex h-5 w-5 items-center justify-center rounded"
            style={{
              background: demo.accent,
              color: ctaTextColor,
              fontFamily: "var(--font-instrument), serif",
              fontSize: "10px",
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            {monogram(demo.title).slice(0, 1)}
          </span>
          <span
            className="text-[10px] font-semibold"
            style={{
              color: titleColor,
              fontFamily: "var(--font-instrument), serif",
              letterSpacing: "-0.01em",
            }}
          >
            {demo.title.length > 18 ? demo.title.slice(0, 17) + "…" : demo.title}
          </span>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          {navLinks.map((link) => (
            <span
              key={link}
              className="text-[9px]"
              style={{
                color: microColor,
                fontFamily: "var(--font-jetbrains), monospace",
              }}
            >
              {link}
            </span>
          ))}
        </div>
        <span
          className="rounded-full px-2.5 py-1 text-[9px] font-semibold"
          style={{
            background: demo.accent,
            color: ctaTextColor,
          }}
        >
          {ctaLabel}
        </span>
      </div>

      {/* MAIN — hero left, product/feature grid right */}
      <div className="grid flex-1 grid-cols-12 gap-3 p-5 md:gap-4 md:p-6">
        {/* LEFT — editorial copy */}
        <div className="col-span-7 flex flex-col justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: demo.accent }}
            />
            <span
              className="text-[9px] uppercase"
              style={{
                color: microColor,
                letterSpacing: "0.18em",
                fontFamily: "var(--font-jetbrains), monospace",
              }}
            >
              {demo.industry.split(" · ")[0].slice(0, 28)}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h3
              className="text-balance"
              style={{
                color: titleColor,
                fontFamily: "var(--font-instrument), serif",
                fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)",
                lineHeight: 1.05,
                letterSpacing: "var(--tracking-display)",
              }}
            >
              {demo.title}
            </h3>
            <p
              className="max-w-[28ch] text-[11px] md:text-[12px]"
              style={{ color: subColor, lineHeight: 1.5 }}
            >
              {demo.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-medium"
              style={{
                background: demo.accent,
                color: ctaTextColor,
                letterSpacing: "0.02em",
              }}
            >
              {ctaLabel}
              <span aria-hidden>→</span>
            </span>
            <span
              className="rounded-full px-3 py-1.5 text-[10px]"
              style={{
                background: softBg,
                color: subColor,
                border: `1px solid ${hairline}`,
              }}
            >
              Ver más
            </span>
          </div>
        </div>

        {/* RIGHT — product/feature mini-grid (3 stacked cards) */}
        <div className="col-span-5 flex flex-col gap-2">
          {products.map((p, i) => (
            <div
              key={p.name}
              className="flex items-center gap-2 rounded-md px-2.5 py-2"
              style={{
                background: i === 0 ? softBg : "transparent",
                border: `1px solid ${i === 0 ? demo.accent + "44" : hairline}`,
              }}
            >
              {/* Mini product thumb */}
              <span
                className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded"
                style={{
                  background: `radial-gradient(120% 90% at 30% 20%, ${demo.accent}55, transparent 70%), ${softBg}`,
                  border: `1px solid ${hairline}`,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-instrument), serif",
                    fontSize: "12px",
                    color: demo.accent,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {monogram(p.name).slice(0, 2)}
                </span>
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span
                  className="truncate text-[10px] font-medium"
                  style={{ color: titleColor }}
                >
                  {p.name}
                </span>
                <span
                  className="truncate text-[9px]"
                  style={{
                    color: microColor,
                    fontFamily: "var(--font-jetbrains), monospace",
                    letterSpacing: "0.02em",
                  }}
                >
                  {p.note}
                </span>
              </span>
              <span
                className="text-[10px] font-semibold"
                style={{
                  color: demo.accent,
                  fontFamily: "var(--font-jetbrains), monospace",
                }}
              >
                {p.price}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM STRIP — stats / trust signals */}
      <div
        className="flex items-center justify-between gap-2 px-5 py-2.5 md:px-6"
        style={{
          borderTop: `1px solid ${hairline}`,
          background: isLight ? "rgba(255,255,255,0.4)" : "rgba(10,15,26,0.35)",
        }}
      >
        <div className="flex items-center gap-3">
          {stats.map((s) => (
            <span
              key={s}
              className="text-[9px]"
              style={{
                color: microColor,
                fontFamily: "var(--font-jetbrains), monospace",
                letterSpacing: "0.04em",
              }}
            >
              {s}
            </span>
          ))}
        </div>
        <span
          className="text-[9px]"
          style={{
            color: microColor,
            fontFamily: "var(--font-jetbrains), monospace",
            letterSpacing: "0.18em",
          }}
        >
          ● LIVE
        </span>
      </div>
    </div>
  );
}

/* ---------- Mock content generators ---------- */

function navFor(demo: DemoMeta): string[] {
  // Pick a nav that reads contextually right for the industry
  const k = demo.industry.toLowerCase();
  if (k.includes("gam")) return ["Servers", "Comunidad", "Soporte"];
  if (k.includes("moda") || k.includes("retail") || k.includes("boutique"))
    return ["Catálogo", "Lookbook", "Contacto"];
  if (k.includes("gastr") || k.includes("restaur") || k.includes("café"))
    return ["Carta", "Reservas", "Delivery"];
  if (k.includes("salon") || k.includes("estética") || k.includes("spa") || k.includes("salud"))
    return ["Servicios", "Turnos", "Equipo"];
  if (k.includes("comercio") || k.includes("e-com") || k.includes("ecom") || k.includes("tienda"))
    return ["Productos", "Ofertas", "Envíos"];
  if (k.includes("hotel") || k.includes("viajes") || k.includes("hospital"))
    return ["Habitaciones", "Servicios", "Reservar"];
  if (k.includes("trade") || k.includes("oficio") || k.includes("ferretería") || k.includes("constru"))
    return ["Servicios", "Trabajos", "Contacto"];
  if (k.includes("media") || k.includes("creador") || k.includes("stream"))
    return ["En vivo", "Videos", "Patrocinar"];
  return ["Inicio", "Servicios", "Contacto"];
}

function productsFor(demo: DemoMeta): { name: string; note: string; price: string }[] {
  const k = demo.industry.toLowerCase();
  if (k.includes("gam")) {
    return [
      { name: "Starter", note: "8 slots · global", price: "$3.5k" },
      { name: "Pro", note: "32 slots · LATAM", price: "$8.9k" },
      { name: "Elite", note: "128 slots · DDoS", price: "$22k" },
    ];
  }
  if (k.includes("moda") || k.includes("boutique") || k.includes("retail")) {
    return [
      { name: "Túnica Linnea", note: "Talles XS–XL", price: "$48k" },
      { name: "Pantalón slip", note: "3 colores", price: "$32k" },
      { name: "Saco de lino", note: "Edición FW26", price: "$92k" },
    ];
  }
  if (k.includes("gastr") || k.includes("restaur")) {
    return [
      { name: "Tapeo del día", note: "Para compartir", price: "$8.4k" },
      { name: "Bondiola lenta", note: "Plato fuerte", price: "$14k" },
      { name: "Postre helado", note: "Casero", price: "$5.2k" },
    ];
  }
  if (k.includes("salud") || k.includes("salon") || k.includes("estética")) {
    return [
      { name: "Consulta inicial", note: "45 min", price: "$12k" },
      { name: "Sesión completa", note: "90 min · combo", price: "$28k" },
      { name: "Plan mensual", note: "4 sesiones", price: "$95k" },
    ];
  }
  if (k.includes("hotel") || k.includes("viajes")) {
    return [
      { name: "Hab. Standard", note: "2 personas", price: "$45k" },
      { name: "Suite Vista", note: "Premium", price: "$95k" },
      { name: "Pack 3 noches", note: "Con desayuno", price: "$210k" },
    ];
  }
  if (k.includes("trade") || k.includes("oficio") || k.includes("ferret")) {
    return [
      { name: "Visita técnica", note: "GBA Sur", price: "$8.5k" },
      { name: "Service completo", note: "Mano de obra", price: "$45k" },
      { name: "Urgencia 24h", note: "Disponible", price: "$22k" },
    ];
  }
  if (k.includes("creador") || k.includes("stream") || k.includes("media")) {
    return [
      { name: "Pack mensual", note: "4 videos", price: "$60k" },
      { name: "Set lifestyle", note: "Reels + foto", price: "$95k" },
      { name: "Branding full", note: "Identidad", price: "$220k" },
    ];
  }
  // Default — generic commerce/services
  return [
    { name: "Producto base", note: "Edición simple", price: "$12k" },
    { name: "Combo destacado", note: "Más vendido", price: "$28k" },
    { name: "Plan premium", note: "Full service", price: "$78k" },
  ];
}

function statsFor(demo: DemoMeta): string[] {
  const k = demo.industry.toLowerCase();
  if (k.includes("gam")) return ["DDoS 24/7", "Latencia <40ms", "Backup auto"];
  if (k.includes("moda") || k.includes("retail")) return ["Envíos 48h", "Cambios", "Mercado Pago"];
  if (k.includes("gastr") || k.includes("restaur")) return ["Reservas online", "Delivery", "WhatsApp"];
  if (k.includes("salud") || k.includes("estética")) return ["Turnos online", "Profesionales", "Obra social"];
  if (k.includes("hotel") || k.includes("viajes")) return ["Booking integrado", "Mejor precio", "Sin recargo"];
  if (k.includes("trade") || k.includes("oficio")) return ["Matrícula MP 1234", "15 años", "Urgencias"];
  if (k.includes("creador") || k.includes("stream")) return ["+200k followers", "Top 5 LATAM", "Patrocinios"];
  return ["Pago seguro", "Envíos 48h", "Soporte WhatsApp"];
}

/* -----------------------------------------------------------
 * Helpers
 * --------------------------------------------------------- */

function monogram(title: string): string {
  const parts = title.replace(/[^\p{L}\p{N}\s&]/gu, " ").split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0]?.[0] ?? "").concat(parts[1]?.[0] ?? "").toUpperCase();
}

function isLightPreview(previewClass: string): boolean {
  // Heuristic — preview gradients ending in stone-100/50, white, rose-50, etc. are light
  return /(?:white|stone-(?:50|100|200)|amber-(?:50|100)|rose-(?:50|100)|emerald-(?:50)|slate-(?:50|100)|blue-(?:100)|sky-(?:50)|cyan-(?:100)|F8F6F2|FBF6EE|FAF6F4)/.test(
    previewClass,
  );
}

function pickCtaText(hex: string): string {
  // Naive luminance to pick contrasting CTA text color
  const m = hex.replace("#", "");
  if (m.length !== 6 && m.length !== 3) return "#0f172a";
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.62 ? "#0f172a" : "#ffffff";
}

function getCta(demo: DemoMeta): string {
  const ind = demo.industry.toLowerCase();
  if (ind.includes("hosting")) return "Crear servidor";
  if (ind.includes("ropa") || ind.includes("moda")) return "Ver colección";
  if (ind.includes("restaurante") || ind.includes("pizza") || ind.includes("burger") || ind.includes("hambur")) return "Hacer pedido";
  if (ind.includes("inmobiliaria")) return "Tasar propiedad";
  if (ind.includes("salón") || ind.includes("salon") || ind.includes("estética") || ind.includes("estetica") || ind.includes("barber")) return "Reservar turno";
  if (ind.includes("legal") || ind.includes("jurídico") || ind.includes("juridico") || ind.includes("contable")) return "Pedir consulta";
  if (ind.includes("gym") || ind.includes("yoga") || ind.includes("pilates") || ind.includes("gimnasio")) return "Empezar prueba";
  if (ind.includes("streamer") || ind.includes("youtuber") || ind.includes("tiktok") || ind.includes("podcast")) return "Ver media kit";
  if (ind.includes("ferret") || ind.includes("almacén") || ind.includes("almacen") || ind.includes("super") || ind.includes("bazar")) return "Comprar online";
  if (ind.includes("tatuaje") || ind.includes("tattoo")) return "Reservar sesión";
  if (ind.includes("hotel") || ind.includes("posada")) return "Reservar estadía";
  if (ind.includes("agencia") || ind.includes("marketing")) return "Ver propuesta";
  if (ind.includes("veterinaria") || ind.includes("pet")) return "Pedir turno";
  return "Empezar";
}
