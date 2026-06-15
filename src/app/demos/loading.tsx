/**
 * Loading skeleton for /demos — shown during navigation while the SSG
 * page is being streamed. Mirrors the real layout's chrome (dark bg +
 * cyan strip + title block + section grids) so the layout-shift is
 * negligible.
 *
 * Pure server component, no client deps.
 */
export default function DemosLoading() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-zinc-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 gradient-mesh-cyan opacity-25"
      />

      <header className="relative z-10 mx-auto max-w-[1400px] px-6 pb-16 pt-8 md:px-12 md:pb-20 lg:px-16">
        {/* Eyebrow + hairline */}
        <div className="mb-10 flex w-full items-center gap-4">
          <span
            className="inline-flex h-6 w-40 shrink-0 animate-pulse rounded-full"
            style={{
              background: "color-mix(in srgb, var(--brand-cyan) 14%, transparent)",
            }}
          />
          <div
            className="h-px flex-1"
            style={{
              background: "color-mix(in srgb, var(--brand-cyan) 18%, transparent)",
            }}
          />
        </div>

        {/* Title skeleton */}
        <div className="mb-10 space-y-4">
          <div
            className="h-[clamp(3.4rem,14vw,11rem)] w-[60%] animate-pulse rounded-2xl"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
          <div
            className="h-[clamp(2.25rem,9vw,6.75rem)] w-[35%] animate-pulse rounded-xl"
            style={{
              background: "color-mix(in srgb, var(--brand-cyan) 12%, transparent)",
            }}
          />
        </div>

        {/* Subhead skeleton */}
        <div className="space-y-3">
          <div
            className="h-5 w-full max-w-3xl animate-pulse rounded"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
          <div
            className="h-5 w-3/4 max-w-3xl animate-pulse rounded"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
        </div>

        {/* Stats strip */}
        <div
          className="mt-12 grid grid-cols-2 gap-6 border-y py-6 md:mt-16 md:grid-cols-4 md:gap-8 md:py-8"
          style={{
            borderColor:
              "color-mix(in srgb, var(--brand-cyan) 18%, transparent)",
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div
                className="h-12 w-20 animate-pulse rounded"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />
              <div
                className="h-3 w-32 animate-pulse rounded"
                style={{ background: "rgba(255,255,255,0.04)" }}
              />
            </div>
          ))}
        </div>
      </header>

      {/* Sections skeleton */}
      <main className="relative z-10 mx-auto max-w-[1400px] space-y-20 px-6 pb-28 md:px-12 md:pb-40 lg:px-16">
        {Array.from({ length: 2 }).map((_, sec) => (
          <section key={sec}>
            <div
              className="mb-10 flex items-end justify-between gap-4 border-b pb-8"
              style={{
                borderColor:
                  "color-mix(in srgb, var(--brand-cyan) 14%, transparent)",
              }}
            >
              <div className="space-y-3">
                <div
                  className="h-12 w-64 animate-pulse rounded"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
                <div
                  className="h-4 w-80 animate-pulse rounded"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                />
              </div>
              <div
                className="h-7 w-24 animate-pulse rounded-full"
                style={{
                  background:
                    "color-mix(in srgb, var(--brand-cyan) 10%, transparent)",
                }}
              />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] animate-pulse rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                    animationDelay: `${i * 80}ms`,
                  }}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
