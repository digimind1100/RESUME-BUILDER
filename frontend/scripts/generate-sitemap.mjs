import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");
const publicDir = path.join(rootDir, "public");

const siteUrl = (process.env.SITE_URL || "https://resumebuilder.pk").replace(/\/$/, "");
const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Karachi",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).format(new Date());

const excludedPaths = new Set([
  "/admin/payments",
  "/admin/review",
  "/admin/reviews",
  "/data-elite",
  "/resume-classic",
  "/preview-classic",
  "/clean-professional",
  "/creative-bold",
  "/minimal-accent",
  "/elegant-classic",
  "/medical-elites",
  "/engineer-elites",
  "/soft-tech",
  "/free-basic",
  "/royal-designer",
  "/neoedge-pro",
  "/neoEdge-pro",
  "/test-pagination",
  "/florence-classic",
  "/engineer-prime",
  "/aviation-pro",
  "/teacher-elite",
  "/coverletter",
  "/coverletter-generator"
]);

const priorityByPath = new Map([
  ["/", "1.0"],
  ["/pricing", "0.9"],
  ["/templates", "0.9"],
  ["/cv-maker", "0.9"],
  ["/features", "0.8"],
  ["/cover-letter", "0.8"],
  ["/blog", "0.8"],
  ["/policies", "0.6"],
  ["/contact", "0.6"]
]);

function readText(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), "utf8");
}

function normalizeRoute(route) {
  if (!route || route === "*") return null;
  const normalized = route.startsWith("/") ? route : `/${route}`;
  if (normalized.includes(":") || normalized.includes("*")) return null;
  if (excludedPaths.has(normalized)) return null;
  if (normalized.startsWith("/admin")) return null;
  return normalized.replace(/\/$/, "") || "/";
}

function getRoutePathsFromApp() {
  const appSource = readText("src/App.jsx");
  const routes = [];
  const routePattern = /<Route\b[\s\S]*?\bpath=(["'`])([^"'`]+)\1/g;
  let match;

  while ((match = routePattern.exec(appSource)) !== null) {
    const route = normalizeRoute(match[2]);
    if (route) routes.push(route);
  }

  return routes;
}

function getBlogLinksFromSource() {
  const sourceFiles = [
    path.join(srcDir, "pages", "Blog.jsx"),
    path.join(srcDir, "blogs", "ResumeGuideArticle.jsx")
  ];
  const links = [];
  const linkPattern = /\bto=(["'`])(\/blog\/[^"'`]+)\1/g;

  for (const sourceFile of sourceFiles) {
    if (!fs.existsSync(sourceFile)) continue;
    const source = fs.readFileSync(sourceFile, "utf8");
    let match;

    while ((match = linkPattern.exec(source)) !== null) {
      const route = normalizeRoute(match[2]);
      if (route) links.push(route);
    }
  }

  return links;
}

function getChangefreq(route) {
  if (route === "/" || route === "/templates" || route === "/cv-maker" || route === "/blog") return "weekly";
  if (route === "/policies" || route === "/contact") return "yearly";
  return "monthly";
}

function getPriority(route) {
  if (priorityByPath.has(route)) return priorityByPath.get(route);
  if (route.startsWith("/blog/")) return "0.7";
  return "0.7";
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildSitemap(routes) {
  const urls = routes
    .map((route) => {
      const loc = route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`;

      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${getChangefreq(route)}</changefreq>
    <priority>${getPriority(route)}</priority>
  </url>`;
    })
    .join("\n\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls}

</urlset>
`;
}

const routes = Array.from(new Set([...getRoutePathsFromApp(), ...getBlogLinksFromSource()])).sort(
  (a, b) => {
    if (a === "/") return -1;
    if (b === "/") return 1;
    if (a === "/blog") return b.startsWith("/blog/") ? -1 : a.localeCompare(b);
    if (b === "/blog") return a.startsWith("/blog/") ? 1 : a.localeCompare(b);
    return a.localeCompare(b);
  }
);

const sitemapPath = path.join(publicDir, "sitemap.xml");
fs.writeFileSync(sitemapPath, buildSitemap(routes));

console.log(`Generated sitemap.xml with ${routes.length} URLs.`);
