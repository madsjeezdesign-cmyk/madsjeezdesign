"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
};

/** Imagen local (Next) o CDN Instagram (img nativo con referrer). */
export function FashionPhoto({
  src,
  fallbackSrc,
  alt,
  className = "",
  priority,
  sizes = "100vw",
  fill,
}: Props) {
  const [current, setCurrent] = useState(src);

  if (current.startsWith("http")) {
    const cls = fill
      ? `absolute inset-0 h-full w-full object-cover ${className}`
      : `h-full w-full object-cover ${className}`;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={current}
        alt={alt}
        className={cls}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => {
          if (fallbackSrc && current !== fallbackSrc) setCurrent(fallbackSrc);
        }}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={current}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${className}`}
        onError={() => {
          if (fallbackSrc) setCurrent(fallbackSrc);
        }}
      />
    );
  }

  return (
    <Image
      src={current}
      alt={alt}
      width={800}
      height={1000}
      priority={priority}
      className={`h-auto w-full ${className}`}
      onError={() => {
        if (fallbackSrc) setCurrent(fallbackSrc);
      }}
    />
  );
}
