import { LogoMark } from "@/components/brand/logo";
import { LoadingState } from "@/components/primitives";

/**
 * Loading skeleton for the admin panel. Mirrors the layout chrome (sticky
 * header + content section) so there's no layout shift when the leads
 * table arrives.
 */
export default function AdminPanelLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2
            className="font-[family-name:var(--font-instrument)]"
            style={{
              fontSize: "var(--font-size-h2)",
              color: "var(--inverse-fg)",
            }}
          >
            Consultas recibidas
          </h2>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--muted-body)" }}
          >
            Cargando bandeja…
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="h-8 w-20 animate-pulse rounded-lg"
              style={{ background: "rgba(255,255,255,0.05)" }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center py-6">
        <LogoMark size={24} className="opacity-60" />
      </div>

      <LoadingState
        title="Sincronizando con Supabase"
        description="Los últimos leads del formulario llegarán en un segundo."
        rows={5}
      />
    </div>
  );
}
