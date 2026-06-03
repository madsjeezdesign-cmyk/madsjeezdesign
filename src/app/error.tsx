"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to the console so it's grep-able in deploy logs.
    // eslint-disable-next-line no-console
    console.error("[app:error]", error.digest, error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.04em] text-[color:var(--muted-body)]">
        Error inesperado
      </p>
      <h1
        className="mt-4 font-[family-name:var(--font-instrument)] text-foreground"
        style={{
          fontSize: "var(--font-size-display-2)",
          lineHeight: "var(--leading-display)",
          letterSpacing: "var(--tracking-display)",
        }}
      >
        Algo salió mal.
      </h1>
      <p className="mt-4 max-w-md text-base text-[color:var(--muted-body)]">
        Probá de nuevo en un momento. Si vuelve a fallar, escribinos por
        WhatsApp y lo revisamos.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          Probar de nuevo
        </button>
        <Link
          href="/"
          className="surface-solid inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
        >
          Volver al inicio
        </Link>
      </div>
      {error.digest ? (
        <p className="mt-6 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.04em] text-[color:var(--muted-body)] opacity-60">
          ref · {error.digest}
        </p>
      ) : null}
    </div>
  );
}
