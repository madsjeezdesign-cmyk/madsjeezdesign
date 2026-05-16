import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-api";
import { adminLogoutAction } from "./actions";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#09090b] font-[family-name:var(--font-plus-jakarta)] text-zinc-100">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#09090b]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div>
            <Link
              href="/admin"
              className="text-sm font-bold tracking-tight text-white hover:text-[#1de0b1]"
            >
              Leads · MadsJeez
            </Link>
            <p className="mt-0.5 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-zinc-500">
              {session.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-zinc-400 transition-colors hover:text-white"
            >
              Ir al sitio
            </Link>
            <form action={adminLogoutAction}>
              <button
                type="submit"
                className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-300 transition-colors hover:border-[#1de0b1]/40 hover:text-[#1de0b1]"
              >
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 md:px-6">{children}</main>
    </div>
  );
}
