import { site, navLinks } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
                M
              </span>
              <span className="font-[family-name:var(--font-instrument)] text-xl text-foreground">
                {site.name}
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-muted">
              Desarrollo web profesional para comercios y empresas en Argentina y
              Latinoamérica.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.name}. Todos los derechos reservados.</p>
          <p>
            Hecho con Next.js, TypeScript y mucho café en Córdoba ☕
          </p>
        </div>
      </div>
    </footer>
  );
}
