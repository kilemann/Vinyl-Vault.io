/* Vinyl Vault – bildebuffer (v1.4.0)
   Husker coverbilder på enheten etter første visning, så de vises straks neste gang – også uten nett.
   Rører bare bilder. Appen, samlingen og GitHub hentes alltid fra nettet som før. */
const CACHE = "vinylvault-bilder-v1";
const MAX = 1500;                                  // eldste bilder fjernes over dette antallet

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k.startsWith("vinylvault-bilder-") && k !== CACHE) await caches.delete(k);
  await self.clients.claim();
})()));

self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || r.destination !== "image") return;
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const hit = await c.match(r);
    if (hit) return hit;
    const res = await fetch(r);
    // vanlige svar må være OK; bilder fra andre nettsteder er «opaque» og kan ikke sjekkes
    if (res.ok || res.type === "opaque") e.waitUntil(c.put(r, res.clone()).then(() => trim(c)).catch(() => {}));
    return res;
  })());
});

async function trim(c) {
  const keys = await c.keys();
  for (let i = 0; i < keys.length - MAX; i++) await c.delete(keys[i]);
}
