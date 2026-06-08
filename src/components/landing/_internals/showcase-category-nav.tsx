"use client";

import { motion } from "framer-motion";
import { useMotionTransition } from "@/lib/motion";

export type ShowcaseCategory = {
  id: string;
  label: string;
  /** Demo slugs that belong to this category. */
  slugs: string[];
  /** Accent color for active indicator (hex). */
  accent: string;
};

type Props = {
  categories: ShowcaseCategory[];
  activeId: string;
  onSelect: (id: string) => void;
};

/**
 * ShowcaseCategoryNav — left-column category selector.
 *
 * Active item gets a left accent bar (animated via layoutId) + accent label
 * color + slug count. Inactive items use --muted-body for restraint.
 */
export function ShowcaseCategoryNav({ categories, activeId, onSelect }: Props) {
  const snap = useMotionTransition("snap", "snap");

  return (
    <nav aria-label="Categorías de demos">
      <ul className="flex flex-row gap-1 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
        {categories.map((c) => {
          const active = c.id === activeId;
          return (
            <li key={c.id} className="shrink-0 lg:shrink">
              <button
                type="button"
                onClick={() => onSelect(c.id)}
                aria-pressed={active}
                aria-current={active ? "true" : undefined}
                className="group relative flex w-full items-center gap-3 whitespace-nowrap px-3 py-2.5 text-left lg:py-3 lg:pl-5 lg:pr-3"
                style={{
                  transitionDuration: "var(--duration-snap)",
                  transitionTimingFunction: "var(--ease-snap)",
                }}
              >
                {/* Vertical accent bar — only on lg+ (left side); horizontal pill on mobile */}
                {active ? (
                  <motion.span
                    layoutId="showcase-cat-bar-vertical"
                    transition={snap}
                    aria-hidden
                    className="absolute hidden lg:block"
                    style={{
                      left: 0,
                      top: 8,
                      bottom: 8,
                      width: 2,
                      background: c.accent,
                      borderRadius: 2,
                    }}
                  />
                ) : null}

                {active ? (
                  <motion.span
                    layoutId="showcase-cat-bg"
                    transition={snap}
                    aria-hidden
                    className="absolute inset-0 -z-10 lg:rounded-md"
                    style={{
                      background: `color-mix(in srgb, ${c.accent} 9%, transparent)`,
                    }}
                  />
                ) : null}

                <span
                  className="block h-1.5 w-1.5 shrink-0 rounded-full transition-transform lg:hidden"
                  style={{
                    background: active ? c.accent : "color-mix(in srgb, var(--muted-body) 40%, transparent)",
                  }}
                />

                <span className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
                  <span
                    className="flex items-center gap-2 truncate font-medium"
                    style={{
                      color: active ? "var(--foreground)" : "var(--muted-body)",
                      fontSize: "var(--font-size-small)",
                      letterSpacing: "var(--tracking-body)",
                      transition: "color var(--duration-snap) var(--ease-snap)",
                    }}
                  >
                    <span className="truncate">{c.label}</span>
                    {/* Animated arrow indicator — shows on active OR hover */}
                    <span
                      aria-hidden
                      className="hidden h-3 w-3 shrink-0 items-center justify-center text-[10px] opacity-0 transition-all lg:inline-flex group-hover:opacity-60"
                      style={{
                        color: c.accent,
                        opacity: active ? 1 : undefined,
                        transform: active ? "translateX(0)" : "translateX(-4px)",
                        transitionDuration: "var(--duration-snap)",
                        transitionTimingFunction: "var(--ease-ui)",
                      }}
                    >
                      ↗
                    </span>
                  </span>
                  <span
                    className="hidden items-center gap-1 font-[family-name:var(--font-jetbrains)] text-[10px] tabular-nums lg:inline-flex"
                    style={{
                      color: active ? c.accent : "color-mix(in srgb, var(--muted-body) 70%, transparent)",
                      letterSpacing: "var(--tracking-micro)",
                      transition: "color var(--duration-snap) var(--ease-snap)",
                    }}
                  >
                    {active ? (
                      <span
                        aria-hidden
                        className="inline-block h-1 w-1 rounded-full"
                        style={{
                          background: c.accent,
                          boxShadow: `0 0 6px ${c.accent}`,
                        }}
                      />
                    ) : null}
                    {String(c.slugs.length).padStart(2, "0")}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
