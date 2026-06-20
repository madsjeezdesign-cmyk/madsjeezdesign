import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHeader, SpotlightCard, EmptyState } from "@/components/primitives";
import { site } from "@/lib/data";
import { getAllPosts } from "@/lib/blog/store";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog · Web, diseño y negocio",
  description:
    "Ideas prácticas sobre desarrollo web, diseño, e-commerce y crecimiento digital para comercios y marcas en Argentina.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: {
    title: `Blog · ${site.name}`,
    description:
      "Ideas prácticas sobre desarrollo web, diseño y crecimiento digital.",
    type: "website",
    url: `${site.siteUrl}/blog`,
    locale: "es_AR",
  },
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Header />
      <PageHeader
        eyebrow="Blog"
        title={
          <>
            Ideas para que tu negocio{" "}
            <span className="italic" style={{ color: "var(--brand-cyan)" }}>
              venda más online
            </span>
            .
          </>
        }
        subtitle="Desarrollo web, diseño, e-commerce y crecimiento digital — sin vueltas, pensado para comercios y marcas argentinas."
        meta={
          <a
            href="/feed.xml"
            className="section-eyebrow"
            style={{ textDecoration: "none" }}
          >
            Suscribite por RSS
          </a>
        }
      />

      <section
        className="px-6 py-20 md:px-10 md:py-28"
        style={{ background: "var(--background)" }}
      >
        <div className="mx-auto max-w-5xl">
          {posts.length === 0 ? (
            <EmptyState
              title="Todavía no hay artículos"
              description="Estamos preparando el primer post. Volvé pronto o suscribite por RSS."
              cta={{ label: "Volver al inicio", href: "/" }}
              secondaryCta={{ label: "Ver trabajos", href: "/demos" }}
            />
          ) : (
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <SpotlightCard className="h-full p-7" variant="solid">
                    <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
                      <div className="flex items-center gap-2 text-micro">
                        <span style={{ color: "var(--brand-cyan)" }}>
                          {post.tags[0] ?? "Artículo"}
                        </span>
                        <span style={{ color: "var(--muted-body)" }}>·</span>
                        <span style={{ color: "var(--muted-body)" }}>
                          {post.readingTime} min
                        </span>
                      </div>

                      <h2
                        className="mt-4 font-[family-name:var(--font-instrument)] text-body-strong"
                        style={{
                          fontSize: "var(--font-size-h3)",
                          lineHeight: "var(--leading-heading)",
                          letterSpacing: "var(--tracking-heading)",
                        }}
                      >
                        {post.title}
                      </h2>

                      <p
                        className="mt-3 flex-1 text-body"
                        style={{ fontSize: "0.9375rem", lineHeight: "var(--leading-body)" }}
                      >
                        {post.excerpt}
                      </p>

                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-micro" style={{ color: "var(--muted-body)" }}>
                          {formatDate(post.publishedAt)}
                        </span>
                        <span
                          className="inline-flex items-center gap-1 text-sm font-medium"
                          style={{ color: "var(--brand-cyan)" }}
                        >
                          Leer
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  </SpotlightCard>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
