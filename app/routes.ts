import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("books/digital-bharat", "routes/books.digital-bharat.tsx"),
    route("sitemap.xml", "routes/sitemap.ts"),
    route("robots.txt", "routes/robots.ts"),
    route("rss.xml", "routes/rss.ts"),
    ...prefix("blog", [
        index("routes/blog._index.tsx"),
        route("tag/:tag", "routes/blog.tag.$tag.tsx"),
        route(":year/:month/:slug", "routes/blog.$slug.tsx"),
    ]),
    route("about", "routes/about.tsx"),
] satisfies RouteConfig;
