"use client";

import { useEffect, useState } from "react";

type Props = {
  /** Texto del H1, ej. BRIONES */
  word: string;
  /** Progreso extra por scroll del padre (0–100), opcional */
  scrollProgress?: number;
};

/**
 * Título hero estilo Vanguardia: se “construye” de abajo hacia arriba
 * con máscara + línea de glow (como la demo inmobiliaria premium).
 */
export function VanguardHeroTitle({ word, scrollProgress = 0 }: Props) {
  const [introProgress, setIntroProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 2200;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setIntroProgress(ease * 100);
      if (t < 1) requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  const textProgress = Math.min(Math.max(Math.max(introProgress, scrollProgress), 0), 100);
  const showGlow = textProgress > 2 && textProgress < 98;

  return (
    <div className="relative inline-block">
      <h1
        className="bb-vanguard-hero-title bb-gold-shimmer text-[clamp(5rem,24vw,18rem)] font-black leading-none tracking-[-0.04em] drop-shadow-[0_0_100px_rgba(245,158,11,0.25)]"
        style={{
          WebkitMaskImage: `linear-gradient(to top, black ${textProgress}%, transparent ${textProgress + 6}%)`,
          maskImage: `linear-gradient(to top, black ${textProgress}%, transparent ${textProgress + 6}%)`,
        }}
      >
        {word}
      </h1>
      {showGlow && (
        <div
          className="pointer-events-none absolute right-0 left-0 z-20 h-1 rounded-full bg-amber-400 blur-sm"
          style={{
            bottom: `${textProgress}%`,
            boxShadow: "0 0 24px 4px rgba(251,191,36,0.7)",
            opacity: 1 - textProgress / 100,
          }}
          aria-hidden
        />
      )}
    </div>
  );
}
