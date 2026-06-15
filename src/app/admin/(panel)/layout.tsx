import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-api";
import { LogoMark } from "@/components/brand/logo";
import { adminLogoutAction } from "./actions";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div
      className="relative min-h-screen font-[family-name:var(--font-plus-jakarta)]"
      style={{ background: "var(--inverse-bg)", color: "var(--inverse-fg)" }}
    >
      {/* Ambient cyan drift behind the whole panel */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 gradient-mesh-cyan opacity-30"
      />

      <header
        className="sticky top-0 z-10 backdrop-blur-md"
        style={{
          borderBottom: "1px solid color-mix(in srgb, var(--brand-cyan) 14%, rgba(255,255,255,0.06))",
          background: "color-mix(in srgb, var(--inverse-bg) 86%, transparent)",
        }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <Link
            href="/admin"
            aria-label="Panel de leads — Admin"
            className="group flex items-center gap-2.5"
          >
            <LogoMark size={28} />
            <span className="flex flex-col leading-tight">
              <span
                className="text-sm font-bold tracking-tight transition-colors group-hover:text-[var(--brand-cyan)]"
                style={{
                  color: "var(--inverse-fg)",
                  transitionDuration: "var(--duration-snap)",
                }}
              >
                Panel de leads
              </span>
              <span
                className="font-[family-name:var(--font-mono),monospace] text-[10px]"
                style={{
                  color: "var(--muted-body)",
                  letterSpacing: "var(--tracking-micro)",
                }}
              >
                {session.email}
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold transition-colors"
              style={{
                color: "var(--muted-body)",
                transitionDuration: "var(--duration-snap)",
              }}
            >
              Ir al sitio
            </Link>
            <form action={adminLogoutAction}>
              <button
                type="submit"
                className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
                style={{
                  border: "1px solid color-mix(in srgb, var(--brand-cyan) 22%, rgba(255,255,255,0.08))",
                  background: "rgba(255,255,255,0.03)",
                  color: "var(--inverse-fg)",
                  transitionDuration: "var(--duration-snap)",
                }}
              >
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-5xl px-4 py-8 md:px-6">
        {children}
      </section>
    </div>
  );
}
