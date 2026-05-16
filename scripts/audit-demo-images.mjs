import fs from "fs";

const t = fs.readFileSync("src/lib/demo-visual-catalog.ts", "utf8");
const section = t.split("export const DEMO_SHOPS")[0];
const slugBlocks = [...section.matchAll(/^\s+(\w+):\s*\{([\s\S]*?)^\s+\},/gm)];
const global = new Map();

for (const [, slug, body] of slugBlocks) {
  const ids = [...body.matchAll(/photo-[a-z0-9-]+/g)].map((m) => m[0]);
  const local = new Map();
  for (const id of ids) {
    local.set(id, (local.get(id) ?? 0) + 1);
    if (!global.has(id)) global.set(id, []);
    global.get(id).push(slug);
  }
  const within = [...local.entries()].filter(([, c]) => c > 1);
  if (within.length) console.error("WITHIN", slug, within);
}

const cross = [...global.entries()].filter(([, slugs]) => slugs.length > 1);
console.log(`slugs: ${slugBlocks.length}, ids: ${global.size}, cross-dups: ${cross.length}`);
if (cross.length) {
  cross.forEach(([id, slugs]) => console.log(slugs.length, id, slugs.join(", ")));
  process.exit(1);
}
console.log("OK: all images unique");
