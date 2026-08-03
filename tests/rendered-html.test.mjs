import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Luka Service landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="pl">/i);
  assert.match(html, /Mechanik Warszawa Włochy \| Warsztat Luka Service/i);
  assert.match(html, /Najpierw sprawdzamy/);
  assert.match(html, /Pełny zakres usług/);
  assert.match(html, /Pianistów 10B/);
  assert.match(html, /google\.com\/maps\?q=Pianist%C3%B3w%2010B[^\"]+output=embed/);
  assert.match(html, /Mapa dojazdu do warsztatu Luka Service/);
  assert.match(html, /Tak wygląda praca w Luka Service/);
  assert.match(html, /\/workshop\/diagnostyka\.webp/);
  assert.match(html, /"@type":"AutoRepair"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

const serviceRoutes = [
  ["/naprawa-silnika-warszawa", "Naprawa silnika w Warszawie"],
  ["/wymiana-rozrzadu-warszawa", "Wymiana rozrządu w Warszawie"],
  ["/hamulce-warszawa-wlochy", "Naprawa hamulców w Warszawie"],
  ["/zawieszenie-warszawa-wlochy", "Naprawa zawieszenia w Warszawie"],
  ["/wymiana-oleju-warszawa-wlochy", "Wymiana oleju w Warszawie"],
  ["/diagnostyka-samochodowa-warszawa", "Diagnostyka samochodowa w Warszawie"],
  ["/sprawdzenie-auta-przed-zakupem-warszawa", "Sprawdzenie auta przed zakupem w Warszawie"],
];

test("server-renders all individual service pages with unique SEO content", async () => {
  for (const [pathname, heading] of serviceRoutes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, new RegExp(`<h1[^>]*>${heading}</h1>`), pathname);
    assert.match(html, /<link rel="canonical" href="https:\/\/lukaservice\.pl\//, pathname);
    assert.match(html, /"@type":"Service"/, pathname);
    assert.match(html, /Pianistów 10B/, pathname);
    assert.match(html, /Najczęstsze pytania/, pathname);
    assert.doesNotMatch(html, /[—–]/, pathname);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, pathname);
  }
});

test("keeps production assets and metadata in place", async () => {
  const [page, layout, styles, serviceData, sitemap, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/service-pages.ts", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /data-reveal/);
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(styles, /\.service-card:is\(:hover, :focus-visible\)/);
  assert.match(page, /application\/ld\+json/);
  assert.match(layout, /\/og\.png/);
  assert.match(layout, /canonical/);
  assert.match(serviceData, /sprawdzenie-auta-przed-zakupem-warszawa/);
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 8);
  assert.doesNotMatch(serviceData, /[—–]/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await Promise.all([
    access(new URL("../public/hero-workshop.webp", import.meta.url)),
    access(new URL("../public/transparent-process.webp", import.meta.url)),
    access(new URL("../public/workshop/diagnostyka.webp", import.meta.url)),
    access(new URL("../public/workshop/hamulce.webp", import.meta.url)),
    access(new URL("../public/workshop/zawieszenie.webp", import.meta.url)),
    access(new URL("../public/workshop/naprawa-silnika.webp", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/favicon.png", import.meta.url)),
  ]);
});
