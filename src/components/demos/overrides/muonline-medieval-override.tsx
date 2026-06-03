"use client";

/**
 * MUONLINE — MMO medieval ornamental override.
 *
 * Identity: parchment cream #f1e7c8 base + oxblood #3a1517 ink + matte gold
 * ornamental #b48742. Centered single column. Serif (Instrument Serif) headings
 * with illuminated drop-caps. Plan boxes ONE PER ROW (not 3-col card grid).
 * Wipe schedule + drop tables prominent. Pixel-era nod via CSS hairlines + dots.
 *
 * Voice: épica, sin parodia. "Reino abierto. Sin reset. Drop x40."
 */

import { motion } from "framer-motion";
import {
  ChevronRight,
  Crown,
  Scroll,
  ShieldCheck,
  Swords,
} from "lucide-react";
import { getGameServerConfig } from "@/lib/game-server-demos";
import { getDemoVisuals } from "@/lib/demo-assets";
import { useMotionTransition } from "@/lib/motion";
import { DemoLeadForm } from "../demo-lead-form";

const PARCHMENT = "#f1e7c8";
const PARCHMENT_DARK = "#e5d6a5";
const OXBLOOD = "#3a1517";
const OXBLOOD_LIGHT = "#5a2727";
const GOLD = "#b48742";
const GOLD_DARK = "#8a6b2f";
const INK_FADE = "rgba(58,21,23,0.7)";

type Realm = {
  name: string;
  tagline: string;
  slots: string;
  drop: string;
  reset: string;
  price: string;
  popular?: boolean;
  perks: readonly string[];
};

const REALMS: readonly Realm[] = [
  {
    name: "Reino del Hierro",
    tagline: "Bronze · entrada al castle siege",
    slots: "100 jugadores · stamina x2",
    drop: "Drop x20",
    reset: "Sin reset",
    price: "$9.800/mes",
    perks: [
      "Anti-hack classic + Live GM",
      "Launcher con tu logo",
      "Web register + ranking",
      "Soporte por Discord 24h",
    ],
  },
  {
    name: "Corte del Dragón",
    tagline: "Gold · season 6 ascendido",
    slots: "500 jugadores · castle siege completo",
    drop: "Drop x40",
    reset: "Sin reset · economía estable",
    price: "$17.400/mes",
    popular: true,
    perks: [
      "Todo lo del Reino del Hierro",
      "Cash shop con paneles separados",
      "Duel master + offattack avanzado",
      "Event scheduler con plantillas",
      "SQL Server tuneado por especialista",
    ],
  },
  {
    name: "Trono de la Leyenda",
    tagline: "Legend · custom builds avanzados",
    slots: "1000 jugadores · multi-realm bridge",
    drop: "Drop x60 con balance personalizado",
    reset: "Tu economía, tu reset",
    price: "$29.600/mes",
    perks: [
      "Todo lo de Corte del Dragón",
      "Custom wings + drop tables a medida",
      "Logística siege multi-realm",
      "Migración de files con downtime <1h",
      "DDoS protection L3+L7 dedicado",
    ],
  },
];

const WIPES = [
  { date: "Sábado 18 enero", title: "Apertura del Reino del Hierro" },
  { date: "Domingo 19 enero", title: "Castle siege · ronda inaugural" },
  { date: "Sábado 1 febrero", title: "Corte del Dragón · drop event x60 weekend" },
  { date: "Sábado 8 febrero", title: "Torneo PvP cross-server (sin reset)" },
] as const;

export function MuonlineMedievalOverride({ slug }: { slug: string }) {
  const config = getGameServerConfig(slug);
  const v = config ? getDemoVisuals(slug) : null;
  const t = useMotionTransition("display");

  if (!config || !v) return null;

  return (
    <div
      className="relative min-h-screen overflow-x-hidden antialiased"
      style={{
        background: PARCHMENT,
        color: OXBLOOD,
        fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
      }}
    >
      {/* Parchment paper grain — subtle */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 18%, rgba(180,135,66,0.10), transparent 55%), radial-gradient(circle at 80% 78%, rgba(58,21,23,0.12), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(rgba(58,21,23,0.7) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      <header
        className="relative z-20"
        style={{ borderBottom: `1px solid ${GOLD}55` }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-5 md:px-8">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ border: `1px solid ${GOLD}`, background: "rgba(255,255,255,0.4)" }}
            >
              <Crown className="h-4 w-4" style={{ color: OXBLOOD }} />
            </div>
            <div className="leading-tight">
              <p
                className="text-[1.08rem] font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-instrument), serif" }}
              >
                {config.brand}
              </p>
              <p className="text-[0.74rem] italic" style={{ color: INK_FADE }}>
                {config.gameLabel}
              </p>
            </div>
          </div>
          <nav
            className="hidden items-center gap-7 text-[0.84rem] italic md:flex"
            style={{ color: INK_FADE }}
          >
            <a href="#prologo">prólogo</a>
            <a href="#reinos">reinos</a>
            <a href="#calendario">calendario</a>
            <a href="#consultas">consultas</a>
          </nav>
          <a
            href="#contacto"
            className="px-4 py-2 text-[0.82rem] tracking-[0.02em] transition-colors hover:opacity-80"
            style={{
              border: `1px solid ${OXBLOOD}`,
              color: OXBLOOD,
              fontFamily: "var(--font-instrument), serif",
            }}
          >
            Solicitar siege
          </a>
        </div>
      </header>

      {/* HERO — centered, ornament */}
      <section id="prologo" className="relative z-10 py-24 text-center md:py-32">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t}
          >
            {/* Ornament divider */}
            <div className="mx-auto mb-7 flex items-center justify-center gap-3">
              <span className="h-px w-12" style={{ background: GOLD }} />
              <Scroll className="h-4 w-4" style={{ color: GOLD_DARK }} />
              <span className="h-px w-12" style={{ background: GOLD }} />
            </div>

            <p
              className="text-[0.86rem] italic"
              style={{ color: GOLD_DARK }}
            >
              Crónica del servidor {config.brand}
            </p>

            <h1
              className="mt-5 leading-[0.96] tracking-[-0.01em]"
              style={{
                fontFamily: "var(--font-instrument), serif",
                fontSize: "clamp(2.6rem, 6.5vw, 4.8rem)",
                color: OXBLOOD,
              }}
            >
              Reino abierto.
              <br />
              <span style={{ fontStyle: "italic", color: OXBLOOD_LIGHT }}>
                Sin reset.
              </span>
              <br />
              Drop x40.
            </h1>

            <p
              className="mx-auto mt-7 max-w-xl text-[1.02rem] leading-relaxed"
              style={{ color: INK_FADE }}
            >
              Servidor privado clásico Season 6 con economía estable, castle
              siege completo y soporte por Discord. La crónica empieza el
              próximo sábado a las 22 hs.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#reinos"
                className="inline-flex items-center gap-2 px-6 py-3 text-[0.94rem]"
                style={{
                  background: OXBLOOD,
                  color: PARCHMENT,
                  fontFamily: "var(--font-instrument), serif",
                  letterSpacing: "0.02em",
                }}
              >
                Elegir reino <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#calendario"
                className="inline-flex items-center gap-2 px-6 py-3 text-[0.94rem]"
                style={{
                  border: `1px solid ${OXBLOOD}`,
                  color: OXBLOOD,
                  fontFamily: "var(--font-instrument), serif",
                  letterSpacing: "0.02em",
                }}
              >
                Calendario de wipes
              </a>
            </div>

            <div
              className="mx-auto mt-12 flex max-w-md items-center justify-around gap-4 border-y py-5"
              style={{ borderColor: `${GOLD}77` }}
            >
              {[
                { l: "Latencia", v: config.pingMs },
                { l: "Jugadores", v: config.onlinePlayers },
                { l: "Sin reset", v: "100%" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <p
                    className="text-[1.2rem]"
                    style={{ fontFamily: "var(--font-instrument), serif", color: OXBLOOD }}
                  >
                    {s.v}
                  </p>
                  <p
                    className="mt-0.5 text-[0.74rem] italic"
                    style={{ color: GOLD_DARK }}
                  >
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* REALMS — one per row, illuminated boxes */}
      <section
        id="reinos"
        className="relative z-10 py-20 md:py-28"
        style={{ borderTop: `1px solid ${GOLD}55`, background: PARCHMENT_DARK }}
      >
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="text-center">
            <p className="text-[0.84rem] italic" style={{ color: GOLD_DARK }}>
              Los tres reinos
            </p>
            <h2
              className="mt-3 leading-[1.02]"
              style={{
                fontFamily: "var(--font-instrument), serif",
                fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
                color: OXBLOOD,
              }}
            >
              Elegí dónde levantar el estandarte.
            </h2>
          </div>

          <div className="mt-14 space-y-7">
            {REALMS.map((r, i) => (
              <motion.article
                key={r.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...t, delay: i * 0.06 }}
                className="relative px-7 py-9 md:px-10 md:py-12"
                style={{
                  background: PARCHMENT,
                  border: `1px solid ${GOLD}`,
                  outline: r.popular ? `1px solid ${OXBLOOD}` : "none",
                  outlineOffset: r.popular ? "6px" : 0,
                }}
              >
                {r.popular && (
                  <span
                    className="absolute -top-3 left-7 px-3 py-0.5 text-[0.7rem] italic tracking-[0.04em]"
                    style={{
                      background: OXBLOOD,
                      color: PARCHMENT,
                      fontFamily: "var(--font-instrument), serif",
                    }}
                  >
                    elegido por la corte
                  </span>
                )}
                <div className="grid gap-7 md:grid-cols-12 md:items-start">
                  {/* Left — name */}
                  <div className="md:col-span-5">
                    <div className="flex items-center gap-3">
                      {/* illuminated initial */}
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center"
                        style={{
                          background: OXBLOOD,
                          color: PARCHMENT,
                          fontFamily: "var(--font-instrument), serif",
                          fontSize: "1.55rem",
                        }}
                      >
                        {r.name[0]}
                      </span>
                      <div>
                        <h3
                          className="text-[1.4rem] leading-tight"
                          style={{ fontFamily: "var(--font-instrument), serif", color: OXBLOOD }}
                        >
                          {r.name}
                        </h3>
                        <p className="text-[0.84rem] italic" style={{ color: GOLD_DARK }}>
                          {r.tagline}
                        </p>
                      </div>
                    </div>
                    <p
                      className="mt-7 text-[2rem] tabular-nums"
                      style={{ fontFamily: "var(--font-instrument), serif", color: OXBLOOD }}
                    >
                      {r.price}
                    </p>
                  </div>
                  {/* Middle — perks */}
                  <ul className="md:col-span-5 space-y-2">
                    {r.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-[0.92rem]" style={{ color: OXBLOOD }}>
                        <Swords className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color: GOLD_DARK }} />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Right — meta */}
                  <div className="md:col-span-2 space-y-2 text-right text-[0.82rem]" style={{ color: INK_FADE }}>
                    <p>
                      <span style={{ color: OXBLOOD }}>{r.slots}</span>
                    </p>
                    <p>
                      <span style={{ color: OXBLOOD }}>{r.drop}</span>
                    </p>
                    <p>{r.reset}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* WIPE CALENDAR */}
      <section
        id="calendario"
        className="relative z-10 py-20 md:py-28"
        style={{ borderTop: `1px solid ${GOLD}55` }}
      >
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="text-center">
            <p className="text-[0.84rem] italic" style={{ color: GOLD_DARK }}>
              Calendario de wipes
            </p>
            <h2
              className="mt-3 leading-[1.05]"
              style={{
                fontFamily: "var(--font-instrument), serif",
                fontSize: "clamp(1.85rem, 4vw, 2.6rem)",
                color: OXBLOOD,
              }}
            >
              Las próximas fechas en el reino.
            </h2>
          </div>

          <ul className="mt-12 space-y-0">
            {WIPES.map((w, i) => (
              <li
                key={w.title}
                className="grid grid-cols-[auto_1fr_auto] items-baseline gap-6 border-t py-6"
                style={{ borderColor: `${OXBLOOD}26` }}
              >
                <span
                  className="text-[1.1rem]"
                  style={{ fontFamily: "var(--font-instrument), serif", color: OXBLOOD }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[0.84rem] italic" style={{ color: GOLD_DARK }}>
                    {w.date}
                  </p>
                  <p
                    className="mt-1 text-[1.1rem]"
                    style={{ fontFamily: "var(--font-instrument), serif", color: OXBLOOD }}
                  >
                    {w.title}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4" style={{ color: GOLD_DARK }} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <DemoLeadForm
        slug={slug}
        brandLabel={`${config.brand} · ${config.gameLabel}`}
        theme={{
          ...v.lead,
          invert: true,
          section: "py-20 md:py-28",
          card: "px-5 py-9 md:px-10 md:py-12",
          label: "text-[0.84rem] italic",
          input: "mt-1 w-full border-b border-[#3a1517]/30 bg-transparent px-0 py-3 text-[0.96rem] text-[#3a1517] outline-none focus:border-[#b48742]",
          button: "w-full bg-[#3a1517] py-3.5 text-[0.95rem] font-semibold text-[#f1e7c8]",
          focus: "focus:border-[#b48742]",
        }}
        kicker="Pedido al heraldo"
        title="Reservá tu sigil"
        sub="Te respondemos por Discord/WhatsApp el mismo día. Migración de files con downtime mínimo."
      />

      <footer
        id="contacto"
        className="relative z-10 py-10 text-center"
        style={{ borderTop: `1px solid ${GOLD}55` }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 px-5 md:px-8">
          <ShieldCheck className="h-3.5 w-3.5" style={{ color: GOLD_DARK }} />
          <p className="text-[0.82rem] italic" style={{ color: INK_FADE }}>
            © {config.brand} · Crónica del servidor · Demo
          </p>
        </div>
      </footer>
    </div>
  );
}
