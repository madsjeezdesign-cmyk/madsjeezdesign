import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import { createSupabaseAdmin } from "@/lib/supabase/server";

/**
 * Blog store — Supabase-backed with a file fallback.
 *
 * Production: posts live in the `blog_posts` table (durable across deploys).
 * The table is created on boot by `scripts/ensure-schema.mjs` (DDL in
 * `supabase/schema.sql`). On the first read, if the table is empty, the
 * seed posts bundled in `data/blog.json` are inserted via the service-role
 * REST client (idempotent upsert on slug).
 *
 * Local dev without Supabase configured: reads/writes fall back to the
 * `data/blog.json` file so the blog still works offline.
 */

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  author: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
};

const TABLE = "blog_posts";
const DATA_FILE = path.join(process.cwd(), "data", "blog.json");

/* ---------------- helpers ---------------- */

export function slugify(input: string): string {
  return input
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function calcReadingTime(content: string): number {
  const text = content.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function sortNewestFirst(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/** Bundled seed posts (committed to git, copied into the image). */
function fileSeed(): BlogPost[] {
  try {
    const parsed = JSON.parse(readFileSync(DATA_FILE, "utf8"));
    return Array.isArray(parsed) ? (parsed as BlogPost[]) : [];
  } catch {
    return [];
  }
}

type Row = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author: string;
  tags: string[] | null;
  reading_time: number;
  published_at: string;
  updated_at: string;
};

function fromRow(r: Row): BlogPost {
  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    coverImage: r.cover_image,
    author: r.author,
    tags: r.tags ?? [],
    publishedAt: r.published_at,
    updatedAt: r.updated_at,
    readingTime: r.reading_time,
  };
}

function toRow(p: BlogPost): Row {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    cover_image: p.coverImage,
    author: p.author,
    tags: p.tags,
    reading_time: p.readingTime,
    published_at: p.publishedAt,
    updated_at: p.updatedAt,
  };
}

/* ---------------- public API ---------------- */

/** All posts, newest first. */
export async function getAllPosts(): Promise<BlogPost[]> {
  const client = createSupabaseAdmin();
  if (!client) return sortNewestFirst(fileSeed());

  let { data, error } = await client
    .from(TABLE)
    .select("*")
    .order("published_at", { ascending: false });

  // Table missing / DB unreachable → serve the bundled seed so /blog never
  // breaks. (Happens until the blog_posts table is created in Supabase.)
  if (error) return sortNewestFirst(fileSeed());

  // First-run seed: populate from the bundled file when the table is empty.
  if (!data || data.length === 0) {
    const seed = fileSeed();
    if (seed.length > 0) {
      await client
        .from(TABLE)
        .upsert(seed.map(toRow), { onConflict: "slug", ignoreDuplicates: true });
      const re = await client
        .from(TABLE)
        .select("*")
        .order("published_at", { ascending: false });
      data = re.data ?? [];
    }
  }

  return (data ?? []).map((r) => fromRow(r as Row));
}

/** A single post by slug, or null. */
export async function getPost(slug: string): Promise<BlogPost | null> {
  const client = createSupabaseAdmin();
  if (!client) {
    return fileSeed().find((p) => p.slug === slug) ?? null;
  }
  const { data } = await client
    .from(TABLE)
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (data) return fromRow(data as Row);
  // Fallback in case the table hasn't seeded yet.
  return fileSeed().find((p) => p.slug === slug) ?? null;
}

export type PublishInput = {
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string | null;
  author?: string;
  tags?: string[];
};

/**
 * Create or update a post (keyed by slug). Returns the stored post.
 * Persists to Supabase; falls back to a no-DB error only if unconfigured.
 */
export async function publishPost(input: PublishInput): Promise<BlogPost> {
  const client = createSupabaseAdmin();
  const baseSlug = slugify(input.title);
  const now = new Date().toISOString();
  const excerpt =
    input.excerpt?.trim() ||
    input.content.replace(/<[^>]+>/g, " ").trim().slice(0, 160).trim();

  // Preserve original publishedAt if the slug already exists.
  let publishedAt = now;
  if (client) {
    const { data: existing } = await client
      .from(TABLE)
      .select("published_at")
      .eq("slug", baseSlug)
      .maybeSingle();
    if (existing?.published_at) publishedAt = existing.published_at as string;
  }

  const post: BlogPost = {
    slug: baseSlug,
    title: input.title.trim(),
    excerpt,
    content: input.content,
    coverImage: input.coverImage ?? null,
    author: input.author?.trim() || "MadsJeez Design",
    tags: (input.tags ?? []).map((t) => t.trim()).filter(Boolean),
    publishedAt,
    updatedAt: now,
    readingTime: calcReadingTime(input.content),
  };

  if (!client) {
    throw new Error(
      "Supabase no configurado: no se puede publicar sin SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  const { error } = await client
    .from(TABLE)
    .upsert(toRow(post), { onConflict: "slug" });
  if (error) {
    throw new Error(`No se pudo guardar el post: ${error.message}`);
  }

  return post;
}
