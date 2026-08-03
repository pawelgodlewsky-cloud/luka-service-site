import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = resolve(projectRoot, "gh-pages-dist");
const clientRoot = resolve(projectRoot, "dist/client");
const routes = [
  "",
  "naprawa-silnika-warszawa",
  "wymiana-rozrzadu-warszawa",
  "hamulce-warszawa-wlochy",
  "zawieszenie-warszawa-wlochy",
  "wymiana-oleju-warszawa-wlochy",
  "diagnostyka-samochodowa-warszawa",
  "sprawdzenie-auta-przed-zakupem-warszawa",
];

if (!outputRoot.startsWith(projectRoot)) {
  throw new Error("Unsafe static export path");
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(clientRoot, outputRoot, { recursive: true });

const workerUrl = pathToFileURL(resolve(projectRoot, "dist/server/index.js"));
workerUrl.searchParams.set("static-export", `${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const exported = [];
for (const route of routes) {
  const pathname = route ? `/${route}` : "/";
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  if (!response.ok) throw new Error(`Static render failed for ${pathname}: ${response.status}`);

  let html = await response.text();
  html = html.replace(/<script\b([^>]*)>[\s\S]*?<\/script>/gi, (tag, attrs) =>
    /application\/ld\+json/i.test(attrs) ? tag : "",
  );
  html = html.replace(/<link\b[^>]*rel=["']modulepreload["'][^>]*>/gi, "");
  const relativeRoot = route ? "../" : "./";
  html = html.replace(/(href|src)=["']\/(?!\/)/g, `$1="${relativeRoot}`);
  html = html.replace(
    /https:\/\/lukaservice\.pl\/og\.png/g,
    "https://pawelgodlewsky-cloud.github.io/luka-service-site/og.png",
  );
  if (!route) html = html.replace("</body>", '<script src="./site.js" defer></script></body>');

  const routeRoot = route ? resolve(outputRoot, route) : outputRoot;
  await mkdir(routeRoot, { recursive: true });
  await writeFile(resolve(routeRoot, "index.html"), html, "utf8");
  exported.push({ pathname, htmlBytes: html.length });
}

await cp(resolve(projectRoot, "scripts/site.js"), resolve(outputRoot, "site.js"));
await writeFile(resolve(outputRoot, ".nojekyll"), "", "utf8");

const cssFiles = (await readFile(resolve(outputRoot, "index.html"), "utf8")).match(/\.\/assets\/[^"']+\.css/g) ?? [];
console.log(JSON.stringify({ outputRoot, exported, cssFiles }));
