import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/lib/data";
import { getAllPosts, getPost } from "@/lib/blog/store";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Artículo no encontrado" };

  const url = `${site.siteUrl}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      locale: "es_AR",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const url = `${site.siteUrl}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: post.author, url: site.siteUrl },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.siteUrl}/og-image.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: post.coverImage ?? `${site.siteUrl}/og-image.svg`,
    keywords: post.tags.join(", "),
    inLanguage: "es-AR",
  };

  return (
    <>
      <Header />

      <article className="relative overflow-hidden">
        {/* Header band with ambient cyan */}
        <header
          className="relative overflow-hidden border-b px-6 pb-12 pt-24 md:px-10 md:pb-16 md:pt-28"
          style={{ borderColor: "var(--hairline)" }}
        >
          <div
            aria-hidden
            className="gradient-mesh-cyan pointer-events-none absolute inset-0 opacity-50"
          />
          <div className="relative mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: "var(--muted-body)", transitionDuration: "var(--duration-snap)" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al blog
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-micro">
              {post.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full px-3 py-1"
                  style={{
                    background: "color-mix(in srgb, var(--brand-cyan) 10%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--brand-cyan) 28%, transparent)",
                    color: "var(--brand-cyan)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <h1
              className="mt-5 font-[family-name:var(--font-instrument)] text-balance text-foreground"
              style={{
                fontSize: "var(--font-size-display-2)",
                lineHeight: "var(--leading-display)",
                letterSpacing: "var(--tracking-display)",
              }}
            >
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-micro" style={{ color: "var(--muted-body)" }}>
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime} min de lectura</span>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="px-6 py-16 md:px-10 md:py-20" style={{ background: "var(--background)" }}>
          <div
            className="prose prose-lg mx-auto max-w-3xl dark:prose-invert prose-headings:font-[family-name:var(--font-instrument)] prose-a:text-[color:var(--brand-cyan)] prose-a:no-underline hover:prose-a:underline"
            // Content is authored only via the secret-protected API (studio-only),
            // so HTML is trusted. Styled by @tailwindcss/typography.
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Footer />
    </>
  );
}
