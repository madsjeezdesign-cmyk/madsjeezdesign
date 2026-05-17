"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
};

/** Video de fondo: autoplay continuo, silenciado, loop (políticas mobile). */
export function FashionHeroVideo({ src, poster, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const play = () => {
      void video.play().catch(() => {
        /* El navegador puede bloquear hasta interacción; reintentamos al scroll */
      });
    };

    play();
    video.addEventListener("loadeddata", play);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") play();
    });

    return () => {
      video.removeEventListener("loadeddata", play);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className={`h-full w-full object-cover object-center ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
