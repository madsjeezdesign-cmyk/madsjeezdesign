"use client";

/**
 * STREAMER / VOD — archetype shell for content-creator demos.
 * Slugs: streamer, youtuber, tiktoker, comunicadores.
 *
 * One shell, four chrome variants via `format`. Each format ships a
 * format-specific HERO + content-discovery layout. NOT just an accent swap.
 *
 * Banlist enforced:
 *  - No glassmorphism, no clip-path skew buttons.
 *  - No ALL-CAPS tracking-[0.04em]+ everywhere.
 *  - No "EN VIVO · viewers · subs" badge on non-streamer formats; on streamer
 *    only when isLive === true.
 *  - No lg:grid-cols-2 desktop split for tiktoker (phone stays the lead).
 */

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { motion, type Transition } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Film,
  Headphones,
  Heart,
  MessageCircle,
  Mic,
  MonitorPlay,
  PlayCircle,
  Podcast,
  Radio,
  Rss,
  Share2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { getCreatorConfig, type CreatorDemoConfig } from "@/lib/creator-demos";
import { getDemoVisuals } from "@/lib/demo-assets";
import { useMotionTransition } from "@/lib/motion";
import { DemoLeadForm } from "../demo-lead-form";
import {
  ScrollReveal,
  SpotlightCard,
  MagneticButton,
  AnimatedStats,
} from "@/components/primitives";

type Format = "streamer" | "youtuber" | "tiktoker" | "comunicadores";
type Props = { slug: string; format: Format };

const VOD_LIBRARY: Record<
  Format,
  { title: string; meta: string; duration: string }[]
> = {
  streamer: [
    { title: "Ranked Climb · GM grind", meta: "Hace 2 días", duration: "4h 12m" },
    { title: "Just Chatting · Q&A community", meta: "Hace 5 días", duration: "2h 48m" },
    { title: "Speedrun any% · WR attempt", meta: "Hace 1 semana", duration: "3h 05m" },
    { title: "Watchparty · finals", meta: "Hace 2 semanas", duration: "5h 30m" },
  ],
  youtuber: [
    { title: "Probé el setup de un profesional · 2024", meta: "1.2M views · hace 6 días", duration: "12:42" },
    { title: "Tour del estudio · cómo lo armamos", meta: "640k views · hace 2 sem", duration: "18:10" },
    { title: "Tutorial: el atajo que cambió mi flujo", meta: "980k views · hace 3 sem", duration: "9:21" },
    { title: "Detrás de cámara · serie nueva", meta: "412k views · hace 1 mes", duration: "15:54" },
    { title: "Respondiendo comentarios #04", meta: "311k views · hace 1 mes", duration: "22:08" },
    { title: "Las 5 cosas que aprendí este año", meta: "1.5M views · hace 2 meses", duration: "14:36" },
  ],
  tiktoker: [
    { title: "POV: el primer día", meta: "Trending", duration: "0:24" },
    { title: "Soundtrip · viral mash-up", meta: "Hot", duration: "0:31" },
    { title: "Tutorial 60 segundos", meta: "Saved", duration: "0:58" },
    { title: "Day in my life · BTS", meta: "Liked", duration: "0:46" },
  ],
  comunicadores: [
    { title: "Ep. 124 · La salud mental en el trabajo", meta: "Estreno · 03 Jun", duration: "58 min" },
    { title: "Ep. 123 · Entrevista a María Fernanda López", meta: "27 May", duration: "1 h 12 min" },
    { title: "Ep. 122 · Cómo se piensa una redacción hoy", meta: "20 May", duration: "47 min" },
    { title: "Ep. 121 · Especial elecciones · mesa abierta", meta: "13 May", duration: "1 h 38 min" },
  ],
};

const SCHEDULE: Record<Format, string> = {
  streamer: "Lun · Mié · Vie · 21:00 ARG",
  youtuber: "Videos nuevos los martes 19:00 ARG",
  tiktoker: "3 a 5 publicaciones diarias",
  comunicadores: "Episodios todos los lunes 9:00 ARG",
};

export function StreamerVodLanding({ slug, format }: Props) {
  const config = getCreatorConfig(slug);
  const v = config ? getDemoVisuals(slug) : null;
  const tDisplay = useMotionTransition("display");

  const isLive = false;

  const accent = config?.accent ?? "#0284c7";
  const accentDim = useMemo(() => {
    const hex = accent.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, 0.12)`;
  }, [accent]);

  if (!config || !v) return null;

  const dark = format === "streamer" || format === "tiktoker";
  const surface = dark ? "#0b0b0f" : "#fafaf7";
  const ink = dark ? "#fafafa" : "#171717";
  const muted = dark ? "#94a3b8" : "#6f6a5e";
  const hairline = dark ? "rgba(255,255,255,0.08)" : "#e6e3dc";

  const HeaderIcon: LucideIcon =
    format === "streamer" ? MonitorPlay
      : format === "youtuber" ? Film
      : format === "tiktoker" ? Sparkles
      : Podcast;

  return (
    <div
      className="relative min-h-screen font-[family-name:var(--font-demo-b-creator)] antialiased"
      style={
        {
          background: surface,
          color: ink,
          "--accent": accent,
          "--brand-cyan": accent,
        } as React.CSSProperties
      }
    >
      {/* HEADER */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-md"
        style={{
          borderColor: hairline,
          background: dark ? "rgba(11,11,15,0.85)" : "rgba(250,250,247,0.92)",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg border"
              style={{ borderColor: hairline, color: accent }}
            >
              <HeaderIcon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-lg font-semibold tracking-tight md:text-xl" style={{ color: ink }}>
                {config.brand}
              </p>
              <p className="text-[11px]" style={{ color: muted }}>{config.platformLabel}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-7 text-sm md:flex" style={{ color: muted }}>
            <a href="#contenido" className="hover:text-[color:var(--accent)]">
              {format === "comunicadores" ? "Episodios" : format === "youtuber" ? "Videos" : "Contenido"}
            </a>
            <a href="#calendario" className="hover:text-[color:var(--accent)]">
              {format === "tiktoker" ? "Stats" : "Calendario"}
            </a>
            <a href="#stack" className="hover:text-[color:var(--accent)]">Stack</a>
            <a href="#contacto" className="hover:text-[color:var(--accent)]">Contacto</a>
          </nav>
          <MagneticButton
            href="#contacto"
            variant="primary"
            strength={6}
            className="!px-4 !py-2 !text-sm shadow-sm"
          >
            {format === "comunicadores" ? "Bookear charla" : "Trabajar conmigo"}
          </MagneticButton>
        </div>
      </header>

      {/* HERO per-format */}
      {format === "streamer" && (
        <StreamerHero
          config={config}
          accent={accent}
          accentDim={accentDim}
          ink={ink}
          muted={muted}
          hairline={hairline}
          coverSrc={v.cover}
          schedule={SCHEDULE.streamer}
          isLive={isLive}
          vods={VOD_LIBRARY.streamer}
          tDisplay={tDisplay}
        />
      )}
      {format === "youtuber" && (
        <YoutuberHero
          config={config}
          accent={accent}
          ink={ink}
          muted={muted}
          hairline={hairline}
          coverSrc={v.cover}
          thumbs={[v.a, v.b, v.c]}
          videos={VOD_LIBRARY.youtuber.slice(0, 4)}
          tDisplay={tDisplay}
        />
      )}
      {format === "tiktoker" && (
        <TiktokerHero
          config={config}
          accent={accent}
          ink={ink}
          muted={muted}
          hairline={hairline}
          coverSrc={v.cover}
          frames={[v.cover, v.a, v.b, v.c]}
          schedule={SCHEDULE.tiktoker}
          tDisplay={tDisplay}
        />
      )}
      {format === "comunicadores" && (
        <ComunicadoresHero
          config={config}
          accent={accent}
          ink={ink}
          muted={muted}
          hairline={hairline}
          coverSrc={v.cover}
          schedule={SCHEDULE.comunicadores}
          tDisplay={tDisplay}
        />
      )}

      {/* CONTENIDO per-format */}
      {format === "streamer" && (
        <ScrollReveal
          as="section"
          className="border-y px-5 py-16 md:px-8 md:py-20"
        >
          <div id="contenido" className="mx-auto max-w-6xl" style={{ borderColor: hairline }}>
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="inline-flex items-center gap-3 text-2xl font-semibold tracking-tight md:text-3xl">
                Últimos VODs
                <span
                  className="live-ping-dot"
                  style={{ background: accent, "--brand-cyan": accent } as React.CSSProperties}
                  aria-hidden
                />
              </h2>
              <a href="#contenido" className="text-sm hover:text-[color:var(--accent)]" style={{ color: muted }}>
                Ver archivo →
              </a>
            </div>
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:thin]">
              {VOD_LIBRARY.streamer.map((vod, i) => (
                <SpotlightCard
                  key={vod.title}
                  glowColor={accent}
                  size={300}
                  variant="transparent"
                  href="#contenido"
                  className="group relative aspect-video min-w-[280px] shrink-0 snap-start overflow-hidden !rounded-lg border bg-black md:min-w-[360px]"
                >
                  <Image
                    src={[v.a, v.b, v.c, v.cover][i % 4]}
                    alt={vod.title}
                    fill
                    className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
                    sizes="360px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <span
                    className="absolute right-3 top-3 rounded px-2 py-0.5 text-[10px] font-medium text-white"
                    style={{ background: "rgba(0,0,0,0.65)" }}
                  >
                    {vod.duration}
                  </span>
                  <div className="absolute inset-x-3 bottom-3">
                    <p className="text-sm font-medium text-white">{vod.title}</p>
                    <p className="mt-0.5 text-[11px] text-white/70">{vod.meta}</p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {format === "youtuber" && (
        <ScrollReveal
          as="section"
          className="border-y bg-white px-5 py-16 md:px-8 md:py-20"
        >
          <div id="contenido" className="mx-auto max-w-6xl" style={{ borderColor: hairline }}>
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl" style={{ color: "#171717" }}>
                Biblioteca de videos
              </h2>
              <a href="#contenido" className="text-sm hover:text-[color:var(--accent)]" style={{ color: muted }}>
                Ver canal →
              </a>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {VOD_LIBRARY.youtuber.map((vid, i) => (
                <SpotlightCard
                  key={vid.title}
                  glowColor={accent}
                  size={260}
                  variant="transparent"
                  className="group !rounded-md bg-white p-0 transition-colors hover:!border-[color:var(--accent)]"
                >
                  <article>
                    <div
                      className="relative aspect-video overflow-hidden rounded-md border"
                      style={{ borderColor: hairline }}
                    >
                      <Image
                        src={[v.cover, v.a, v.b, v.c][i % 4]}
                        alt={vid.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <span
                        className="absolute bottom-2 right-2 rounded px-1.5 py-0.5 text-[10px] font-medium text-white"
                        style={{ background: "rgba(0,0,0,0.75)" }}
                      >
                        {vid.duration}
                      </span>
                    </div>
                    <h3 className="mt-3 line-clamp-2 px-2 text-sm font-medium leading-snug md:text-base" style={{ color: "#171717" }}>
                      {vid.title}
                    </h3>
                    <p className="mt-1 px-2 pb-2 text-xs" style={{ color: muted }}>{vid.meta}</p>
                  </article>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {format === "tiktoker" && (
        <ScrollReveal
          as="section"
          className="border-y px-5 py-14 md:px-8 md:py-16"
        >
          <div id="calendario" className="mx-auto max-w-2xl" style={{ borderColor: hairline }}>
            <h2 className="mb-8 inline-flex items-center gap-3 text-xl font-semibold tracking-tight">
              <span
                className="live-ping-dot"
                style={{ background: accent, "--brand-cyan": accent } as React.CSSProperties}
                aria-hidden
              />
              Lo que pasa en mi feed
            </h2>
            <AnimatedStats
              layout="grid-3"
              items={[
                { value: 1200000, label: "Seguidores", format: (v) => (v / 1_000_000).toFixed(1) + "M" },
                { value: 84, label: "Likes totales", suffix: "M" },
                { value: 120, label: "Views 30 días", suffix: "M" },
              ]}
            />
          </div>
        </ScrollReveal>
      )}

      {format === "comunicadores" && (
        <ScrollReveal
          as="section"
          className="border-y bg-white px-5 py-16 md:px-8 md:py-20"
        >
          <div id="contenido" className="mx-auto max-w-4xl" style={{ borderColor: hairline }}>
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="inline-flex items-center gap-3 text-2xl font-semibold tracking-tight md:text-3xl" style={{ color: "#171717" }}>
                Episodios recientes
                <span
                  className="live-ping-dot"
                  style={{ background: accent, "--brand-cyan": accent } as React.CSSProperties}
                  aria-hidden
                />
              </h2>
              <a href="#contenido" className="text-sm hover:text-[color:var(--accent)]" style={{ color: muted }}>
                Archivo completo →
              </a>
            </div>
            <ul className="divide-y border-y" style={{ borderColor: hairline }}>
              {VOD_LIBRARY.comunicadores.map((ep, i) => (
                <li key={ep.title} className="group flex items-center gap-4 py-5 transition-colors hover:bg-[color:var(--accent)]/[0.03]">
                  <button
                    type="button"
                    aria-label={`Reproducir ${ep.title}`}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                    style={{ background: accentDim, color: accent }}
                  >
                    <PlayCircle className="h-6 w-6" aria-hidden />
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-base font-medium md:text-lg" style={{ color: "#171717" }}>
                      {ep.title}
                    </p>
                    <p className="mt-0.5 text-xs" style={{ color: muted }}>{ep.meta} · {ep.duration}</p>
                  </div>
                  <span className="hidden text-xs tabular-nums md:inline" style={{ color: muted }}>
                    {String(VOD_LIBRARY.comunicadores.length - i).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      )}

      {/* STACK */}
      <section id="stack" className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Stack y colaboraciones</h2>
            <p className="max-w-sm text-sm" style={{ color: muted }}>
              Las plataformas y herramientas con las que ya está integrado.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {config.integrations.map((tool) => (
              <li
                key={tool}
                className="rounded-full border px-3.5 py-1.5 text-sm transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
                style={{ borderColor: hairline, color: muted }}
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FEATURES */}
      <section
        className="border-y px-5 py-16 md:px-8 md:py-20"
        style={{ borderColor: hairline, background: dark ? "rgba(255,255,255,0.02)" : "white" }}
      >
        <ScrollReveal className="mx-auto max-w-6xl grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl" style={{ color: ink }}>
              {format === "comunicadores" ? "Tu programa, listo para crecer" : "Tu marca como creador, ordenada"}
            </h2>
            <p className="mt-3 text-sm" style={{ color: muted }}>
              {format === "comunicadores"
                ? "Press kit, booking, suscripción a episodios y red de sponsors."
                : "Press kit, página de marcas, monetización y discovery, todo en un sólo home."}
            </p>
          </div>
          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {config.features.map((feat) => (
              <li
                key={feat}
                className="flex items-start gap-3 text-sm"
                style={{ color: dark ? "#cbd5e1" : "#3a3a36" }}
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </section>

      {/* CONTACT BAND */}
      <section
        className="px-5 py-16 md:px-8 md:py-20"
        style={{ background: dark ? "#070709" : "white" }}
      >
        <div
          className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 rounded-2xl border p-8 md:flex-row md:items-center md:p-12"
          style={{ borderColor: hairline, background: accentDim }}
        >
          <div className="flex items-start gap-4">
            {format === "comunicadores" ? (
              <Headphones className="h-9 w-9 shrink-0" style={{ color: accent }} />
            ) : format === "tiktoker" ? (
              <Heart className="h-9 w-9 shrink-0" style={{ color: accent }} />
            ) : format === "youtuber" ? (
              <PlayCircle className="h-9 w-9 shrink-0" style={{ color: accent }} />
            ) : (
              <Radio className="h-9 w-9 shrink-0" style={{ color: accent }} />
            )}
            <div>
              <h3 className="text-xl font-semibold md:text-2xl" style={{ color: ink }}>
                {format === "comunicadores"
                  ? "Charlas, entrevistas y colaboraciones"
                  : "Hablemos de tu próxima campaña"}
              </h3>
              <p className="mt-2 max-w-lg text-sm" style={{ color: muted }}>
                Recibimos briefs por mail. Respondemos en menos de 48 horas con tarifas y propuestas.
              </p>
            </div>
          </div>
          <Link
            href={`#lead-${slug}`}
            className="shrink-0 rounded-full px-6 py-3 text-sm font-medium text-white shadow-sm transition-transform hover:scale-[1.02]"
            style={{ background: accent }}
          >
            Enviar brief
          </Link>
        </div>
      </section>

      {/* LEAD FORM */}
      <div id="contacto">
        <DemoLeadForm
          slug={slug}
          brandLabel={`${config.brand} · ${config.platformLabel}`}
          theme={v.lead}
          kicker={format === "comunicadores" ? "Booking & prensa" : "Brief de campaña"}
          title={format === "comunicadores" ? "Pedinos disponibilidad" : "Contanos sobre tu marca"}
          sub="Te respondemos con propuesta, timeline y mockups en menos de 24 h."
        />
      </div>

      <footer
        className="border-t px-5 py-10 text-center text-xs md:px-8"
        style={{ borderColor: hairline, color: muted }}
      >
        © {new Date().getFullYear()} {config.brand} · {config.platformLabel}
      </footer>
    </div>
  );
}

/* Per-format hero components */

type HeroBase = {
  config: CreatorDemoConfig;
  accent: string;
  ink: string;
  muted: string;
  hairline: string;
  coverSrc: string;
  tDisplay: Transition;
};

function StreamerHero(props: HeroBase & {
  accentDim: string;
  schedule: string;
  isLive: boolean;
  vods: { title: string; meta: string; duration: string }[];
}) {
  const { config, accent, accentDim, isLive, ink, muted, hairline, coverSrc, schedule, vods, tDisplay } = props;
  return (
    <section className="relative px-5 pb-14 pt-12 md:px-8 md:pb-20 md:pt-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_1.15fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tDisplay}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5" style={{ borderColor: hairline }}>
            {isLive ? (
              <>
                <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: "#ef4444" }} />
                <span className="text-xs font-medium" style={{ color: ink }}>En vivo ahora</span>
              </>
            ) : (
              <>
                <Calendar className="h-3.5 w-3.5" style={{ color: accent }} />
                <span className="text-xs" style={{ color: muted }}>{schedule}</span>
              </>
            )}
          </div>
          <h1 className="text-4xl font-semibold leading-[1.04] tracking-tight md:text-6xl" style={{ color: ink }}>
            {config.heroTitle} <span style={{ color: accent }}>{config.heroHighlight}</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed" style={{ color: muted }}>{config.heroSub}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton
              href="#contenido"
              variant="primary"
              strength={9}
              className="shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]"
            >
              Ver últimos VODs <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <a
              href="#stack"
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium hover:border-[color:var(--accent)]"
              style={{ borderColor: hairline, color: ink }}
            >
              Sponsor kit
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={tDisplay}
          className="relative"
        >
          <div className="relative aspect-video overflow-hidden rounded-xl border" style={{ borderColor: hairline, background: "#000" }}>
            <Image
              src={coverSrc}
              alt={`${config.brand} stream cover`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.04em] text-white/80">
                  {isLive ? "En vivo" : "Próximo stream"}
                </p>
                <p className="mt-0.5 text-base font-semibold text-white">{config.industryLabel}</p>
              </div>
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{ background: accentDim, color: accent, border: `1px solid ${accent}33` }}
              >
                {isLive ? "En el aire" : "VOD disponible"}
              </span>
            </div>
          </div>
          <p className="mt-3 text-xs" style={{ color: muted }}>
            Próximo · {vods[0]?.title}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function YoutuberHero(props: HeroBase & {
  thumbs: string[];
  videos: { title: string; meta: string; duration: string }[];
}) {
  const { config, accent, ink, muted, hairline, coverSrc, thumbs, videos, tDisplay } = props;
  const [latest, ...rest] = videos;
  const firstWord = SCHEDULE.youtuber.split("·")[0]?.trim() ?? "Mar";
  return (
    <section className="px-5 pb-14 pt-12 md:px-8 md:pb-20 md:pt-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tDisplay}
          className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14"
        >
          <div>
            <p className="mb-3 text-sm" style={{ color: muted }}>{config.platformLabel}</p>
            <h1 className="text-4xl font-semibold leading-[1.04] tracking-tight md:text-6xl" style={{ color: ink }}>
              {config.heroTitle} <span style={{ color: accent }}>{config.heroHighlight}</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed" style={{ color: "#3a3a36" }}>{config.heroSub}</p>
            <dl className="mt-8 grid max-w-md grid-cols-3 gap-5 text-sm">
              <div>
                <dt className="text-xs" style={{ color: muted }}>Suscriptores</dt>
                <dd className="mt-1 text-xl font-semibold tabular-nums" style={{ color: ink }}>{config.statFollowers}</dd>
              </div>
              <div>
                <dt className="text-xs" style={{ color: muted }}>CTR medio</dt>
                <dd className="mt-1 text-xl font-semibold tabular-nums" style={{ color: ink }}>{config.statEngagement}</dd>
              </div>
              <div>
                <dt className="text-xs" style={{ color: muted }}>Nuevo</dt>
                <dd className="mt-1 text-xl font-semibold tabular-nums" style={{ color: ink }}>{firstWord}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton
                href="#contenido"
                variant="primary"
                strength={9}
                className="shadow-[0_10px_30px_-12px_rgba(0,0,0,0.3)]"
              >
                Ver canal <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full border bg-white px-6 py-3 text-sm font-medium hover:border-[color:var(--accent)]"
                style={{ borderColor: hairline, color: ink }}
              >
                Media kit
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <a
              href="#contenido"
              className="group block overflow-hidden rounded-lg border bg-black shadow-[0_24px_60px_-32px_rgba(0,0,0,0.25)]"
              style={{ borderColor: hairline }}
            >
              <div className="relative aspect-video">
                <Image
                  src={coverSrc}
                  alt={latest?.title ?? "Latest video"}
                  fill
                  priority
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/85 via-transparent to-transparent p-5">
                  <div>
                    <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.04em] text-white">Latest</span>
                    <p className="mt-2 text-lg font-semibold leading-tight text-white md:text-xl">{latest?.title}</p>
                    <p className="mt-1 text-xs text-white/70">{latest?.meta}</p>
                  </div>
                </div>
                <span
                  className="absolute bottom-3 right-3 rounded px-1.5 py-0.5 text-[10px] font-medium text-white"
                  style={{ background: "rgba(0,0,0,0.75)" }}
                >
                  {latest?.duration}
                </span>
              </div>
            </a>
            <div className="grid grid-cols-3 gap-3">
              {rest.slice(0, 3).map((vid, i) => (
                <a
                  href="#contenido"
                  key={vid.title}
                  className="block overflow-hidden rounded-md border bg-white"
                  style={{ borderColor: hairline }}
                >
                  <div className="relative aspect-video">
                    <Image
                      src={thumbs[i] ?? coverSrc}
                      alt={vid.title}
                      fill
                      className="object-cover"
                      sizes="20vw"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="line-clamp-2 text-xs font-medium leading-snug" style={{ color: ink }}>{vid.title}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TiktokerHero(props: HeroBase & {
  frames: string[];
  schedule: string;
}) {
  const { config, accent, coverSrc, frames, schedule, tDisplay } = props;
  return (
    <section className="relative px-5 pb-14 pt-10 md:px-8 md:pb-20 md:pt-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tDisplay}
          className="mx-auto max-w-xl text-center"
        >
          <p
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px]"
            style={{ color: accent }}
          >
            <Sparkles className="h-3 w-3" /> {config.platformLabel} · {schedule}
          </p>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            {config.heroTitle} <span style={{ color: accent }}>{config.heroHighlight}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-slate-400 md:text-base">{config.heroSub}</p>
        </motion.div>

        <div className="mt-12 flex flex-col items-center gap-10 md:flex-row md:justify-center">
          <div className="relative" style={{ width: 280 }}>
            <div
              className="relative mx-auto overflow-hidden rounded-[36px] border-[10px] border-black bg-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
              style={{ aspectRatio: "9 / 16" }}
            >
              <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
              <div className="h-full snap-y snap-mandatory overflow-y-auto">
                {frames.map((src, i) => (
                  <article key={`${src}-${i}`} className="relative h-full w-full snap-start">
                    <Image
                      src={src}
                      alt={`Reel ${i + 1}`}
                      fill
                      priority={i === 0}
                      className="object-cover"
                      sizes="280px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
                    <div className="absolute bottom-20 right-2 flex flex-col items-center gap-4 text-white">
                      <button className="flex flex-col items-center" aria-label="Me gusta">
                        <Heart className="h-6 w-6" />
                        <span className="text-[10px]">{12 + i * 3}.4k</span>
                      </button>
                      <button className="flex flex-col items-center" aria-label="Comentar">
                        <MessageCircle className="h-6 w-6" />
                        <span className="text-[10px]">{3 + i}.8k</span>
                      </button>
                      <button className="flex flex-col items-center" aria-label="Compartir">
                        <Share2 className="h-6 w-6" />
                        <span className="text-[10px]">2.1k</span>
                      </button>
                    </div>
                    <div className="absolute inset-x-3 bottom-3 text-white">
                      <p className="text-sm font-semibold">{config.brand}</p>
                      <p className="mt-1 line-clamp-2 text-xs">
                        {VOD_LIBRARY.tiktoker[i]?.title ?? "Nuevo contenido"}{" "}
                        <span style={{ color: accent }}>#{config.platformLabel.split(" ")[0]?.toLowerCase()}</span>
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <aside className="hidden w-full max-w-xs space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:block">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10">
                <Image src={coverSrc} alt={config.brand} fill className="object-cover" sizes="48px" />
              </div>
              <div>
                <p className="text-sm font-semibold">{config.brand}</p>
                <p className="text-xs text-slate-400">@{config.brand.toLowerCase().replace(/\s+/g, "")}</p>
              </div>
            </div>
            <button className="w-full rounded-full px-4 py-2 text-sm font-medium text-white" style={{ background: accent }}>
              Seguir
            </button>
            <dl className="grid grid-cols-3 gap-2 text-center text-[11px] text-slate-400">
              {[
                { label: "Sig.", value: config.statFollowers.split(" ")[0] ?? "1.2M" },
                { label: "Likes", value: "84M" },
                { label: "Posts", value: "412" },
              ].map((s) => (
                <div key={s.label} className="rounded-md border border-white/5 py-2">
                  <dd className="text-sm font-semibold text-white">{s.value}</dd>
                  <dt className="mt-0.5">{s.label}</dt>
                </div>
              ))}
            </dl>
            <p className="text-xs text-slate-400">{config.heroKicker}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ComunicadoresHero(props: HeroBase & { schedule: string }) {
  const { config, accent, ink, muted, hairline, coverSrc, schedule, tDisplay } = props;
  return (
    <section className="relative overflow-hidden px-5 pb-14 pt-12 md:px-8 md:pb-20 md:pt-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_1.1fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tDisplay}
        >
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-xs"
            style={{ borderColor: hairline, color: muted }}
          >
            <Mic className="h-3.5 w-3.5" style={{ color: accent }} />
            {schedule}
          </div>
          <h1 className="text-4xl font-semibold leading-[1.04] tracking-tight md:text-6xl" style={{ color: ink }}>
            {config.heroTitle} <span style={{ color: accent }}>{config.heroHighlight}</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed" style={{ color: "#3a3a36" }}>{config.heroSub}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton
              href="#contenido"
              variant="primary"
              strength={9}
              className="shadow-[0_10px_30px_-12px_rgba(0,0,0,0.3)]"
            >
              Escuchar último episodio <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-full border bg-white px-6 py-3 text-sm font-medium hover:border-[color:var(--accent)]"
              style={{ borderColor: hairline, color: ink }}
            >
              Prensa & booking
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <PodcastPlatformPill icon={Rss} label="RSS" color={accent} hairline={hairline} muted={muted} />
            <PodcastPlatformPill label="Spotify" color={accent} hairline={hairline} muted={muted} />
            <PodcastPlatformPill label="Apple Podcasts" color={accent} hairline={hairline} muted={muted} />
            <PodcastPlatformPill label="YouTube Music" color={accent} hairline={hairline} muted={muted} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={tDisplay}
          className="relative"
        >
          <div
            className="relative aspect-square overflow-hidden rounded-2xl border bg-black shadow-[0_24px_60px_-32px_rgba(0,0,0,0.25)]"
            style={{ borderColor: hairline }}
          >
            <Image
              src={coverSrc}
              alt={`${config.brand} cover`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5 flex h-12 items-end gap-[3px]">
              {Array.from({ length: 48 }).map((_, i) => {
                const h = 18 + Math.abs(Math.sin(i * 0.55)) * 32 + (i % 3) * 4;
                return (
                  <span
                    key={i}
                    className="block w-[3px] rounded-full"
                    style={{
                      height: `${h}px`,
                      background: i < 20 ? accent : "rgba(255,255,255,0.45)",
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div
            className="absolute -bottom-5 -left-5 hidden rounded-xl border bg-white px-5 py-4 shadow-md md:block"
            style={{ borderColor: hairline }}
          >
            <p className="text-[10px] uppercase tracking-[0.04em]" style={{ color: muted }}>Suscriptores</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums" style={{ color: ink }}>{config.statFollowers}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PodcastPlatformPill({
  icon: Icon,
  label,
  color,
  hairline,
  muted,
}: {
  icon?: LucideIcon;
  label: string;
  color: string;
  hairline: string;
  muted: string;
}) {
  return (
    <a
      href="#contenido"
      className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-xs transition-colors hover:border-[color:var(--accent)]"
      style={{ borderColor: hairline, color: muted }}
    >
      {Icon ? (
        <Icon className="h-3 w-3" style={{ color }} />
      ) : (
        <span className="block h-2 w-2 rounded-full" style={{ background: color }} />
      )}
      {label}
    </a>
  );
}
