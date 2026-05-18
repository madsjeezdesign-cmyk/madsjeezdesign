/**
 * Replace all broken Unsplash IDs under src/lib (except catalog).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const libDir = path.join(root, "src/lib");
const skip = new Set(["demo-visual-catalog.ts"]);

const QUERIES = [
  "fashion clothing boutique",
  "restaurant food plate",
  "cocktail drinks bar",
  "bakery pastry bread",
  "hotel bedroom interior",
  "beauty hair salon",
  "hardware store",
  "ice cream dessert",
  "pizza italian food",
  "home decor living room",
  "kids clothing family",
  "barber shop haircut",
  "latin food empanadas",
  "lingerie fashion",
  "locksmith keys",
  "petit kids fashion",
];

function extractPhotoId(url) {
  const m = String(url).match(/photo-([0-9]+-[a-f0-9]+)/i);
  return m ? `photo-${m[1]}` : null;
}

async function isOk(photoId) {
  const url = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=400&q=80`;
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(12000) });
    return res.ok;
  } catch {
    return false;
  }
}

async function fetchSearchIds(query) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=30`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) return [];
  const data = await res.json();
  const ids = [];
  for (const item of data.results ?? []) {
    for (const u of [item.urls?.raw, item.urls?.regular, item.urls?.small]) {
      const id = extractPhotoId(u);
      if (id && !ids.includes(id)) ids.push(id);
    }
  }
  return ids;
}

const files = fs
  .readdirSync(libDir)
  .filter((f) => f.endsWith(".ts") && !skip.has(f));

const idToFiles = new Map();
for (const f of files) {
  const text = fs.readFileSync(path.join(libDir, f), "utf8");
  for (const m of text.matchAll(/photo-[0-9]+-[a-f0-9]+/gi)) {
    const id = m[0];
    if (!idToFiles.has(id)) idToFiles.set(id, new Set());
    idToFiles.get(id).add(f);
  }
}

const working = new Set();
const broken = [];
for (const id of idToFiles.keys()) {
  if (await isOk(id)) working.add(id);
  else broken.push(id);
}

console.log(`Unique IDs: ${idToFiles.size}, working: ${working.size}, broken: ${broken.length}`);

const pool = [];
for (const q of QUERIES) {
  if (pool.length >= broken.length + 40) break;
  for (const id of await fetchSearchIds(q)) {
    if (working.has(id) || pool.includes(id)) continue;
    if (await isOk(id)) pool.push(id);
  }
  process.stderr.write(`\rPool: ${pool.length}`);
}
console.error("");

let pi = 0;
const mapping = {};
for (const oldId of broken) {
  while (pi < pool.length && working.has(pool[pi])) pi++;
  if (pi >= pool.length) {
    console.warn("Pool out:", oldId);
    continue;
  }
  const newId = pool[pi++];
  mapping[oldId] = newId;
  working.add(newId);
}

const touched = new Set();
for (const f of files) {
  const fp = path.join(libDir, f);
  let text = fs.readFileSync(fp, "utf8");
  let changed = false;
  for (const [from, to] of Object.entries(mapping)) {
    if (text.includes(from)) {
      text = text.split(from).join(to);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(fp, text);
    touched.add(f);
  }
}

fs.writeFileSync(path.join(root, "scripts/lib-image-replacements.json"), JSON.stringify(mapping, null, 2));
console.log(`Replaced ${Object.keys(mapping).length} ids in ${touched.size} files`);
console.log([...touched].sort().join("\n"));
