import { NextResponse } from "next/server";
import { getPost } from "@/lib/blog/store";

/** GET /api/blog/[slug] → single post (200) or 404. */
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return NextResponse.json(
      { ok: false, error: "Post no encontrado." },
      { status: 404 },
    );
  }
  return NextResponse.json({ ok: true, post }, { status: 200 });
}
