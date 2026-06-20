import "server-only";
import { promises as fs } from "node:fs";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * File-based blog store.
 *
 * Posts live in `data/blog.json` (an array). Seed posts committed to git
 * ship inside the Docker image and always render. Posts published at runtime
 * via the API are written to the same file, but Railway's container FS is
 * EPHEMERAL — they survive restarts within a deploy but are wiped on the next
 * deploy. For durable runtime publishing, migrate `publishPost` to Supabase
 * (already wired in this project). See POSTHOG-style docs in the PR.
 */

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** HTML or plain text. Rendered inside a `.prose` container. */
  content: string;
  coverImage: string | null;
  author: string;
  tags: string[];
  publishedAt: string; // ISO
  updatedAt: string; // ISO
  readingTime: number; // minutes
};

const DATA_FILE = path.join(process.cwd(), "data", "blog.json");

/** Convert a title into a URL-safe slug. */
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

/** Estimate reading time in minutes (~200 wpm), min 1. */
export function calcReadingTime(content: string): number {
  const text = content.replace(/<[^>]+>/g, " "); // drop HTML tags
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Synchronous read for use in sitemap/RSS/build contexts. Safe on missing file. */
function readPostsSync(): BlogPost[] {
  try {
    const raw = readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as BlogPost[]) : [];
  } catch {
    return [];
  }
}

async function readPosts(): Promise<BlogPost[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as BlogPost[]) : [];
  } catch {
    return [];
  }
}

async function writePosts(posts: BlogPost[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2) + "\n", "utf8");
}

function sortNewestFirst(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/** All posts, newest first. Async (route handlers, ISR pages). */
export async function getAllPosts(): Promise<BlogPost[]> {
  return sortNewestFirst(await readPosts());
}

/** All posts, newest first. Sync (sitemap / RSS). */
export function getAllPostsSync(): BlogPost[] {
  return sortNewestFirst(readPostsSync());
}

/** A single post by slug, or null. */
export async function getPost(slug: string): Promise<BlogPost | null> {
  const posts = await readPosts();
  return posts.find((p) => p.slug === slug) ?? null;
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
 * Create + persist a post. Generates slug (de-duplicated), reading time and
 * timestamps. If the slug already exists the post is UPDATED in place.
 * Returns the stored post.
 */
export async function publishPost(input: PublishInput): Promise<BlogPost> {
  const posts = await readPosts();

  const baseSlug = slugify(input.title);
  const now = new Date().toISOString();
  const excerpt =
    input.excerpt?.trim() ||
    input.content.replace(/<[^>]+>/g, " ").trim().slice(0, 160).trim();

  const existingIdx = posts.findIndex((p) => p.slug === baseSlug);

  const post: BlogPost = {
    slug: baseSlug,
    title: input.title.trim(),
    excerpt,
    content: input.content,
    coverImage: input.coverImage ?? null,
    author: input.author?.trim() || "MadsJeez Design",
    tags: (input.tags ?? []).map((t) => t.trim()).filter(Boolean),
    publishedAt: existingIdx >= 0 ? posts[existingIdx].publishedAt : now,
    updatedAt: now,
    readingTime: calcReadingTime(input.content),
  };

  if (existingIdx >= 0) {
    posts[existingIdx] = post;
  } else {
    posts.unshift(post);
  }

  await writePosts(posts);
  return post;
}
