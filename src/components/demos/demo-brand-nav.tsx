"use client";

import { useCallback, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Calculator,
  Camera,
  ChefHat,
  Croissant,
  Droplets,
  Flower2,
  Glasses,
  IceCream,
  Key,
  Leaf,
  Menu,
  Music,
  Pen,
  Plane,
  Shield,
  Sparkles,
  Wifi,
  Wine,
  X,
} from "lucide-react";
import { getDemoBySlug } from "@/lib/demos-registry";
import { getDemoNavLinks } from "@/lib/demo-content-extensions";

const NAV_ICONS: Record<string, LucideIcon> = {
  Calculator,
  Camera,
  ChefHat,
  Croissant,
  Droplets,
  Flower2,
  Glasses,
  IceCream,
  Key,
  Leaf,
  Music,
  Pen,
  Plane,
  Shield,
  Sparkles,
  Wifi,
  Wine,
};

type Props = {
  slug: string;
  brand: string;
  /** Nombre del icono Lucide (evita pasar componentes desde Server Components). */
  iconKey?: keyof typeof NAV_ICONS;
  industryLabel?: string;
  primaryCta?: string;
  onPrimaryClick?: () => void;
  /** Clases del botón principal (desde art direction). */
  primaryCtaClass?: string;
  /** Barra clara u oscura según el demo. */
  variant?: "dark" | "light";
  sticky?: boolean;
};

export function DemoBrandNav({
  slug,
  brand,
  iconKey,
  industryLabel,
  primaryCta = "Consultar",
  onPrimaryClick,
  primaryCtaClass,
  variant = "dark",
  sticky = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const demo = getDemoBySlug(slug);
  const links = getDemoNavLinks(slug);
  const Icon = iconKey ? NAV_ICONS[iconKey] : undefined;
  const sub = industryLabel ?? demo?.industry ?? "Demo rubro";

  const close = useCallback(() => setOpen(false), []);

  const isLight = variant === "light";
  const bar = isLight
    ? "border-stone-200/80 bg-white/90 text-stone-900"
    : "border-white/10 bg-zinc-950/85 text-white";
  const muted = isLight ? "text-stone-500" : "text-zinc-500";
  const linkCls = isLight
    ? "text-stone-600 hover:text-stone-900"
    : "text-zinc-400 hover:text-white";
  const menuBtn = isLight ? "border-stone-200 text-stone-700" : "border-white/15 text-zinc-300";

  const defaultCta = isLight
    ? "rounded-full bg-stone-900 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white"
    : "rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm hover:bg-white/20";

  return (
    <header
      id="top"
      className={`${sticky ? "sticky top-0 z-[80]" : "relative z-[80]"} border-b backdrop-blur-xl ${bar}`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 md:px-10 md:py-4">
        <a href="#top" className="flex min-w-0 items-center gap-3" onClick={close}>
          {Icon ? (
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${isLight ? "border-stone-200 bg-stone-50" : "border-white/10 bg-white/5"}`}
            >
              <Icon className={`h-5 w-5 ${isLight ? "text-stone-600" : "text-zinc-400"}`} />
            </span>
          ) : null}
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold tracking-tight md:text-base">{brand}</span>
            <span className={`block truncate text-[9px] uppercase tracking-[0.28em] ${muted}`}>{sub}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href + l.label}
              href={l.href}
              className={`text-[10px] font-bold uppercase tracking-[0.22em] transition-colors ${linkCls}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border lg:hidden ${menuBtn}`}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={onPrimaryClick}
            className={primaryCtaClass ?? defaultCta}
          >
            {primaryCta}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          className={`border-t px-4 py-4 lg:hidden ${isLight ? "border-stone-200 bg-white" : "border-white/10 bg-zinc-950"}`}
        >
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href + l.label}>
                <a
                  href={l.href}
                  onClick={close}
                  className={`block py-2 text-xs font-bold uppercase tracking-[0.2em] ${linkCls}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
