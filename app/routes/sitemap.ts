import type { Route } from "./+types/sitemap";
import { getPosts } from "../utils/blog.server";
import { getBlogTagHref, getUniqueBlogTags } from "../utils/blog";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toAbsoluteUrl(origin: string, pathname: string) {
  return new URL(pathname, origin).toString();
}

export async function loader({ request }: Route.LoaderArgs) {
  const origin = new URL(request.url).origin;
  const posts = await getPosts();

  const staticRoutes = [
    { loc: toAbsoluteUrl(origin, "/"), lastmod: new Date().toISOString() },
    { loc: toAbsoluteUrl(origin, "/about"), lastmod: new Date().toISOString() },
    { loc: toAbsoluteUrl(origin, "/blog"), lastmod: new Date().toISOString() },
    { loc: toAbsoluteUrl(origin, "/books/digital-bharat"), lastmod: new Date().toISOString() },
    { loc: toAbsoluteUrl(origin, "/books/Digital-Bharat.pdf"), lastmod: new Date().toISOString() },
  ];

  const postRoutes = posts.map((post) => ({
    loc: toAbsoluteUrl(origin, `/blog/${post.year}/${post.month}/${post.slug}`),
    lastmod: new Date(post.date).toISOString(),
  }));

  const tagRoutes = getUniqueBlogTags(posts).map((tag) => ({
    loc: toAbsoluteUrl(origin, getBlogTagHref(tag)),
    lastmod: new Date().toISOString(),
  }));

  const urls = [...staticRoutes, ...tagRoutes, ...postRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
