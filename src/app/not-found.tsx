import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.04em] text-[color:var(--muted-body)]">
        Error 404
      </p>
      <h1
        className="mt-4 font-[family-name:var(--font-instrument)] text-foreground"
        style={{
          fontSize: "var(--font-size-display-2)",
          lineHeight: "var(--leading-display)",
          letterSpacing: "var(--tracking-display)",
        }}
      >
        Esta página no existe.
      </h1>
      <p className="mt-4 max-w-md text-base text-[color:var(--muted-body)]">
        Tal vez te equivocaste de URL, o la movimos. Andá al inicio o mirá los
        trabajos.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          Volver al inicio
        </Link>
        <Link
          href="/demos"
          className="surface-solid inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
        >
          Ver trabajos
        </Link>
      </div>
    </div>
  );
}
