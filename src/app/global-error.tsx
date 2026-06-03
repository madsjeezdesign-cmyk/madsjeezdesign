"use client";

import { useEffect } from "react";

/**
 * Global error boundary — only fires when the root layout itself throws.
 * Must define its own <html> and <body> because the root layout is
 * the thing that failed.
 *
 * Keep it dependency-light: no theme provider, no fonts, no analytics.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[app:global-error]", error.digest, error);
  }, [error]);

  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          padding: "8rem 1.5rem",
          background: "#0a0f1a",
          color: "#e8eef3",
          fontFamily: "system-ui, -apple-system, sans-serif",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#94a3b8",
            margin: 0,
          }}
        >
          Error crítico
        </p>
        <h1
          style={{
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: "1rem 0 0",
            fontWeight: 400,
          }}
        >
          El sitio no pudo cargar.
        </h1>
        <p
          style={{
            maxWidth: "32rem",
            margin: "1rem 0 2rem",
            fontSize: "1rem",
            lineHeight: 1.6,
            color: "#cbd5e1",
          }}
        >
          Intentalo de nuevo en un momento. Si persiste, contactanos por
          WhatsApp y lo revisamos en el momento.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0.75rem 1.5rem",
            borderRadius: "999px",
            background: "#2dd4bf",
            color: "#0a0f1a",
            fontWeight: 600,
            fontSize: "0.875rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          Probar de nuevo
        </button>
        {error.digest ? (
          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "0.625rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "#64748b",
            }}
          >
            ref · {error.digest}
          </p>
        ) : null}
      </body>
    </html>
  );
}
