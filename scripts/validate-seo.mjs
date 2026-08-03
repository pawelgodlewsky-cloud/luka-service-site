import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const outputRoot = resolve("gh-pages-dist");
const html = readFileSync(resolve(outputRoot, "index.html"), "utf8");
const title = html.match(/<title>([^<]+)/)?.[1] ?? "";
const description = html.match(/<meta name="description" content="([^"]+)/)?.[1] ?? "";
const h1Count = (html.match(/<h1\b/gi) ?? []).length;
const headings = [...html.matchAll(/<h([1-6])\b/gi)].map((match) => Number(match[1]));
const structuredData = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)]
  .map((match) => JSON.parse(match[1]));
const visibleWords = html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&[^;]+;/g, " ")
  .trim()
  .split(/\s+/)
  .filter(Boolean).length;

const headingJumps = headings.filter((level, index) => index > 0 && level > headings[index - 1] + 1);
const report = {
  titleLength: title.length,
  descriptionLength: description.length,
  h1Count,
  visibleWords,
  structuredDataTypes: structuredData.map((item) => item["@type"]),
  headingHierarchy: headingJumps.length === 0 ? "valid" : "invalid",
  robots: existsSync(resolve(outputRoot, "robots.txt")),
  sitemap: existsSync(resolve(outputRoot, "sitemap.xml")),
};

console.log(JSON.stringify(report, null, 2));

const failed =
  title.length < 30 ||
  title.length > 60 ||
  description.length < 120 ||
  description.length > 160 ||
  h1Count !== 1 ||
  visibleWords < 500 ||
  structuredData.length === 0 ||
  headingJumps.length > 0 ||
  !report.robots ||
  !report.sitemap;

if (failed) process.exit(1);
