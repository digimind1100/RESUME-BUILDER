import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const sitemapPath = path.join(rootDir, "public", "sitemap.xml");
const siteUrl = "https://www.resumebuilder.pk";

function readSitemapRoutes() {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  const locPattern = /<loc>([^<]+)<\/loc>/g;
  const routes = [];
  let match;

  while ((match = locPattern.exec(sitemap)) !== null) {
    const url = new URL(match[1]);
    routes.push(url.pathname.replace(/\/$/, "") || "/");
  }

  return Array.from(new Set(routes));
}

function getCanonical(route) {
  return route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`;
}

function getOutputPath(route) {
  if (route === "/") return path.join(distDir, "index.html");
  return path.join(distDir, route, "index.html");
}

function withCanonical(html, canonicalUrl) {
  const canonicalTag = `    <link rel="canonical" href="${canonicalUrl}" />`;
  const withoutCanonical = html.replace(/\s*<link\s+rel=["']canonical["'][^>]*>\s*/gi, "\n");

  if (withoutCanonical.includes("</head>")) {
    return withoutCanonical.replace("</head>", `${canonicalTag}\n  </head>`);
  }

  return `${withoutCanonical}\n${canonicalTag}\n`;
}

const templatePath = path.join(distDir, "index.html");
const templateHtml = fs.readFileSync(templatePath, "utf8");
const routes = readSitemapRoutes();

for (const route of routes) {
  const outputPath = getOutputPath(route);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, withCanonical(templateHtml, getCanonical(route)));
}

console.log(`Prerendered ${routes.length} raw HTML pages with canonical tags.`);
