"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const COMMANDS = [
  '$ /madsjeez run --build "tu sitio"',
  "$ /madsjeez deploy --target production",
  "$ /madsjeez optimize --metric conversion",
] as const;

const TYPE_MS = 38;
const ERASE_MS = 18;
const HOLD_MS = 4200;
const PAUSE_MS = 360;

/**
 * Mono "terminal" line that types/erases through a small command rotation.
 * Lives between the H1 and the subhead. NOT central to scan-flow — small,
 * muted, accent caret. Respects prefers-reduced-motion (renders 1st command
 * statically, cursor still as a visual cue).
 */
export function HeroTerminalLine() {
  const reduced = useReducedMotion();
  const [text, setText] = useState(reduced ? COMMANDS[0] : "");
  const idxRef = useRef(0);
  const charRef = useRef(0);
  const phaseRef = useRef<"typing" | "hold" | "erasing" | "pause">("typing");

  useEffect(() => {
    if (reduced) return;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      const current = COMMANDS[idxRef.current];
      const phase = phaseRef.current;

      if (phase === "typing") {
        charRef.current += 1;
        setText(current.slice(0, charRef.current));
        if (charRef.current >= current.length) {
          phaseRef.current = "hold";
          timer = setTimeout(step, HOLD_MS);
          return;
        }
        timer = setTimeout(step, TYPE_MS);
        return;
      }

      if (phase === "hold") {
        phaseRef.current = "erasing";
        timer = setTimeout(step, PAUSE_MS);
        return;
      }

      if (phase === "erasing") {
        charRef.current -= 1;
        setText(current.slice(0, Math.max(charRef.current, 0)));
        if (charRef.current <= 0) {
          phaseRef.current = "pause";
          idxRef.current = (idxRef.current + 1) % COMMANDS.length;
          timer = setTimeout(step, PAUSE_MS);
          return;
        }
        timer = setTimeout(step, ERASE_MS);
        return;
      }

      // pause
      phaseRef.current = "typing";
      timer = setTimeout(step, PAUSE_MS);
    };

    timer = setTimeout(step, 900);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <div
      aria-hidden
      className="mt-6 inline-flex max-w-full items-center gap-2 rounded-md px-3 py-1.5"
      style={{
        background: "color-mix(in srgb, var(--card) 55%, transparent)",
        border:
          "1px solid color-mix(in srgb, var(--foreground) 8%, transparent)",
        backdropFilter: "blur(8px)",
      }}
    >
      <span
        className="text-[11px]"
        style={{
          color: "var(--muted-body)",
          fontFamily: "var(--font-jetbrains), monospace",
          letterSpacing: "var(--tracking-micro)",
        }}
      >
        {text}
      </span>
      <span
        className="inline-block h-3 w-[6px] translate-y-[1px]"
        style={{
          background: "var(--accent)",
          animation: reduced ? "none" : "hero-caret 1.05s steps(2) infinite",
        }}
      />
      <style jsx>{`
        @keyframes hero-caret {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
