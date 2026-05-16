import fs from "fs";

const t = fs.readFileSync("src/lib/demo-visual-catalog.ts", "utf8");
const section = t.split("export const DEMO_SHOPS")[0];
const blocks = [...section.matchAll(/^\s+(\w+):\s*\{([\s\S]*?)^\s+\},/gm)];
const keys = ["cover", "a", "b", "c", "d", "e"];
const broken = [];
const workingIds = new Set();

for (const [, slug, body] of blocks) {
  const ids = [...body.matchAll(/id\("([^"]+)"\)/g)].map((m) => m[1]);
  for (let i = 0; i < ids.length; i++) {
    const photoId = ids[i];
    const url = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=400&q=80`;
    const res = await fetch(url, { method: "GET", redirect: "follow" });
    if (res.ok) workingIds.add(photoId);
    else broken.push({ slug, key: keys[i], photoId, status: res.status });
  }
}

console.log(`working: ${workingIds.size}, broken: ${broken.length}`);
fs.writeFileSync("scripts/broken-images.json", JSON.stringify(broken, null, 2));
broken.forEach((b) => console.log(`${b.slug}.${b.key} ${b.photoId}`));
