import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (["node_modules", ".next"].includes(ent.name)) continue;
    if (ent.isDirectory()) walk(p, acc);
    else if (/\.(ts|tsx)$/.test(ent.name)) acc.push(p);
  }
  return acc;
}

const ids = new Map();
for (const f of walk(path.join(root, "src"))) {
  const rel = path.relative(root, f);
  for (const m of fs.readFileSync(f, "utf8").matchAll(/photo-[0-9]+-[a-f0-9]+/gi)) {
    const id = m[0];
    if (!ids.has(id)) ids.set(id, []);
    if (ids.get(id).length < 2) ids.get(id).push(rel);
  }
}

async function isOk(photoId) {
  const url = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=400&q=80`;
  const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(12000) });
  return res.ok;
}

const broken = [];
let ok = 0;
const all = [...ids.keys()];
for (let i = 0; i < all.length; i++) {
  const id = all[i];
  if (await isOk(id)) ok++;
  else broken.push({ id, files: ids.get(id) });
  if (i % 20 === 0) process.stderr.write(`\r${i + 1}/${all.length}`);
}
console.error(`\nOK: ${ok}, broken: ${broken.length}`);
broken.forEach((b) => console.log(b.id, b.files[0]));
fs.writeFileSync(path.join(root, "scripts/broken-src-images.json"), JSON.stringify(broken, null, 2));
