import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getAllPosts, publishPost } from "@/lib/blog/store";

/**
 * Blog API.
 *
 *   GET  /api/blog            → list all posts (public, 200)
 *   POST /api/blog            → publish a post (protected, 201)
 *                               header: x-publish-secret: <BLOG_PUBLISH_SECRET>
 *
 * The secret is read from env (never hardcoded). On Railway set
 * BLOG_PUBLISH_SECRET in the service variables.
 */

export const dynamic = "force-dynamic";

const publishSchema = z.object({
  title: z.string().min(3).max(160),
  content: z.string().min(1).max(100_000),
  excerpt: z.string().max(300).optional(),
  coverImage: z.string().url().nullable().optional(),
  author: z.string().max(80).optional(),
  tags: z.array(z.string().max(40)).max(12).optional(),
});

/** Constant-time secret comparison; false on any mismatch / missing config. */
function secretOk(provided: string | null): boolean {
  const expected = process.env.BLOG_PUBLISH_SECRET;
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(
    { ok: true, count: posts.length, posts },
    { status: 200 },
  );
}

export async function POST(req: NextRequest) {
  if (!secretOk(req.headers.get("x-publish-secret"))) {
    return NextResponse.json(
      { ok: false, error: "No autorizado." },
      { status: 401 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "JSON inválido." },
      { status: 400 },
    );
  }

  const parsed = publishSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Datos inválidos.", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const post = await publishPost(parsed.data);

  // Refresh the ISR cache for the affected surfaces.
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/feed.xml");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true, post }, { status: 201 });
}
