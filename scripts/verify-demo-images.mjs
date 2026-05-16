import fs from "fs";

const t = fs.readFileSync("src/lib/demo-visual-catalog.ts", "utf8");
const section = t.split("export const DEMO_SHOPS")[0];
const slugBlocks = [...section.matchAll(/^\s+(\w+):\s*\{([\s\S]*?)^\s+\},/gm)];

const broken = [];
const dupWithin = [];

for (const [, slug, body] of slugBlocks) {
  const urls = [...body.matchAll(/id\("([^"]+)"\)/g)].map((m) => {
    const photoId = m[1];
    return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=200&q=60`;
  });
  const keys = ["cover", "a", "b", "c", "d", "e"];
  const local = new Map();
  for (let i = 0; i < urls.length; i++) {
    const u = urls[i];
    local.set(u, (local.get(u) ?? 0) + 1);
  }
  for (const [u, c] of local) {
    if (c > 1) dupWithin.push({ slug, url: u, count: c });
  }
  for (let i = 0; i < urls.length; i++) {
    const res = await fetch(urls[i], { method: "GET", redirect: "follow" });
    if (!res.ok) {
      broken.push({ slug, key: keys[i], photoId: urls[i].match(/photo-[^?]+/)?.[0], status: res.status });
    }
  }
}

console.log("dupWithin", dupWithin.length);
dupWithin.forEach((d) => console.log(JSON.stringify(d)));
console.log("broken", broken.length);
broken.forEach((b) => console.log(JSON.stringify(b)));
if (broken.length || dupWithin.length) process.exit(1);
