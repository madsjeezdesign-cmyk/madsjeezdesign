"use client";

import Link from "next/link";
import { site } from "@/lib/data";

export function CinematicBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1]">
      <div
        className="absolute inset-0 opacity-[0.03] contrast-150"
        style={{
          backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
        }}
      />
      <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[150px]" />
    </div>
  );
}

type ShowcaseNavProps = {
  /** Barra fija al hacer scroll (recomendado en páginas slug largas). */
  sticky?: boolean;
  /** En `/demos/[slug]`: enlace explícito al listado de demos. */
  showDemosIndexLink?: boolean;
};

export function ShowcaseSiteNav({
  sticky = false,
  showDemosIndexLink = false,
}: ShowcaseNavProps) {
  const base =
    "relative z-50 flex items-center justify-between px-6 py-8 md:px-12 lg:px-16";
  const stickyCls = sticky
    ? "sticky top-0 z-[60] border-b border-white/5 bg-black/80 py-5 backdrop-blur-xl md:py-6"
    : "";

  return (
    <nav className={`${base} ${stickyCls}`}>
      <Link
        href="/demos"
        className="flex flex-col transition-opacity hover:opacity-90"
      >
        <span className="text-[11px] font-black uppercase tracking-[0.45em] text-white md:text-xs">
          MADSJEEZ
        </span>
        <span className="text-[8px] uppercase tracking-[0.35em] text-zinc-500 md:text-[9px]">
          Design Studio
        </span>
      </Link>
      <div className="flex flex-wrap items-center justify-end gap-2 md:gap-3">
        {showDemosIndexLink ? (
          <Link
            href="/demos"
            className="inline-flex rounded-full border border-white/10 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-300 backdrop-blur-md transition-all hover:border-white/20 hover:text-white"
          >
            Todos los demos
          </Link>
        ) : null}
        <Link
          href="/"
          className="hidden rounded-full border border-white/10 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 backdrop-blur-md transition-all hover:border-white/20 hover:text-white sm:inline-flex"
        >
          Sitio
        </Link>
        <Link
          href="/#nexo"
          className="rounded-full border border-white/10 px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.2em] backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black md:text-[10px]"
        >
          Contacto directo
        </Link>
      </div>
    </nav>
  );
}

export function ShowcaseSiteFooter() {
  const year = site.activeYear;

  return (
    <footer className="relative z-10 border-t border-white/5 px-6 py-16 md:px-12 lg:px-16">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 md:flex-row">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 md:text-left">
          © {year} {site.name} · Creative solutions
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            WhatsApp
          </a>
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-white"
          >
            Email
          </a>
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
        </div>
      </div>
    </footer>
  );
}
