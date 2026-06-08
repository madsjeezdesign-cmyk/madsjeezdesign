import Link from "next/link";
import { site, navLinks } from "@/lib/data";
import { LogoHorizontal } from "./brand/logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link
              href="/"
              aria-label="MadsJeezDesign · Inicio"
              className="text-foreground"
            >
              <LogoHorizontal size={36} textSize="1.125rem" withTagline />
            </Link>
            <p className="mt-5 max-w-xs text-sm text-muted">
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
            Hecho con Next.js, TypeScript y mucho café en Buenos Aires ☕
          </p>
        </div>
      </div>
    </footer>
  );
}
