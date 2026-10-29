// Vinyl Vault – lagrer coverbilder i repoet (v1.4.0)
// Kjøres av GitHub Actions når collection.json endres (.github/workflows/covers.yml).
// Henter cover som mangler, legger dem i covers/ og skriver covers/index.json,
// som appen leser for å vise bildene fra GitHub Pages i stedet for fra Cover Art Archive.
// Krever Node 20 eller nyere (innebygd fetch). Ingen avhengigheter.
import { readFile, writeFile, mkdir, readdir, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.env.VV_ROOT || process.cwd();
const DIR = path.join(ROOT, "covers");
const INDEX = path.join(DIR, "index.json");
const CAA = (process.env.VV_CAA_BASE || "https://coverartarchive.org").replace(/\/$/, "");
const UA = "VinylVault/1.4.0 (https://github.com/kilemann/Vinyl-Vault.io)";
const MAX_BYTES = 2 * 1024 * 1024;          // egne cover-lenker over 2 MB hoppes over
const RETRY_DAYS = 14;                       // album uten cover sjekkes på nytt etter så mange dager
const PAUSE_MS = Number(process.env.VV_PAUSE_MS ?? 400);
const CAA_RE = /coverartarchive\.org\/release-group\/([0-9a-f-]{36})\/front(?:-(?:250|500|1200))?$/i;

/* samme nøkkel som i appen (FNV-1a over UTF-8) */
export function urlKey(u) {
  let h = 0x811c9dc5;
  for (const b of new TextEncoder().encode(String(u).trim())) { h ^= b; h = Math.imul(h, 16777619) >>> 0; }
  return "u-" + h.toString(16).padStart(8, "0");
}
export function coverJobs(data) {
  const jobs = new Map();
  for (const a of data.albums || []) {
    const c = String(a.cover || "").trim();
    const m = c.match(CAA_RE);
    const rgid = (m && m[1].toLowerCase()) || (/^[0-9a-f-]{36}$/.test(a.rgid || "") && (!c || CAA_RE.test(c)) ? a.rgid : "");
    if (rgid) jobs.set(rgid, { key: rgid, caa: rgid });
    else if (/^https?:\/\//i.test(c)) jobs.set(urlKey(c), { key: urlKey(c), url: c });
  }
  return jobs;
}
const EXT = { "image/jpeg": "jpg", "image/jpg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" };
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function download(url) {
  const r = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (r.status === 404) return { missing: true };
  if (!r.ok) throw new Error(`${r.status} for ${url}`);
  const type = (r.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
  const ext = EXT[type];
  if (!ext) throw Object.assign(new Error(`ikke et bilde (${type || "ukjent type"}): ${url}`), { permanent: true });
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length > MAX_BYTES) throw Object.assign(new Error(`for stort (${Math.round(buf.length / 1024)} kB): ${url}`), { permanent: true });
  return { buf, ext };
}

async function main() {
  const data = JSON.parse(await readFile(path.join(ROOT, "collection.json"), "utf8"));
  await mkdir(DIR, { recursive: true });
  const index = existsSync(INDEX) ? JSON.parse(await readFile(INDEX, "utf8")) : {};
  const jobs = coverJobs(data);
  const now = new Date(), today = now.toISOString().slice(0, 10);
  let added = 0, none = 0, failed = 0;

  for (const job of jobs.values()) {
    const e = index[job.key];
    if (e && e.s && existsSync(path.join(ROOT, e.s)) && existsSync(path.join(ROOT, e.l))) continue;
    if (e && e.none && (now - new Date(e.none)) / 864e5 < RETRY_DAYS) continue;
    try {
      if (job.caa) {
        const small = await download(`${CAA}/release-group/${job.caa}/front-250`); await sleep(PAUSE_MS);
        if (small.missing) { index[job.key] = { none: today }; none++; continue; }
        const large = await download(`${CAA}/release-group/${job.caa}/front-500`); await sleep(PAUSE_MS);
        const s = `covers/${job.key}-250.${small.ext}`, l = large.missing ? s : `covers/${job.key}-500.${large.ext}`;
        await writeFile(path.join(ROOT, s), small.buf);
        if (!large.missing) await writeFile(path.join(ROOT, l), large.buf);
        index[job.key] = { s, l };
      } else {
        const img = await download(job.url); await sleep(PAUSE_MS);
        if (img.missing) { index[job.key] = { none: today }; none++; continue; }
        const f = `covers/${job.key}.${img.ext}`;
        await writeFile(path.join(ROOT, f), img.buf);
        index[job.key] = { s: f, l: f };
      }
      added++;
    } catch (err) {
      failed++; console.warn("Hoppet over:", err.message);
      if (err.permanent) index[job.key] = { none: today };   // ikke et bilde / for stort: prøv igjen om noen dager
    }
  }

  // rydd bort bilder for album som ikke finnes lenger
  let removed = 0;
  for (const k of Object.keys(index)) if (!jobs.has(k)) { delete index[k]; }
  const keep = new Set(Object.values(index).flatMap(e => [e.s, e.l]).filter(Boolean).map(f => path.basename(f)));
  for (const f of await readdir(DIR)) if (f !== "index.json" && !keep.has(f)) { await unlink(path.join(DIR, f)); removed++; }

  const sorted = Object.fromEntries(Object.keys(index).sort().map(k => [k, index[k]]));
  await writeFile(INDEX, JSON.stringify(sorted, null, 1) + "\n");
  console.log(`Cover: ${jobs.size} i samlingen, ${added} nye, ${none} uten cover, ${failed} feilet, ${removed} fjernet.`);
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch(e => { console.error(e); process.exit(1); });
