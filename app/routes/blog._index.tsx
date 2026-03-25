import { Link, redirect, useLoaderData, useLocation } from "react-router";
import type { Route } from "./+types/blog._index";
import { getPosts } from "../utils/blog.server";
import { BaseLayout } from "../components/BaseLayout";
import { BlogSearch } from "../components/blog/BlogSearch";
import { getBlogTagHref } from "../utils/blog";
import {
  DEFAULT_OG_IMAGE,
  SITE_URL,
  blogIndexJsonLd,
  breadcrumbJsonLd,
  serializeJsonLd,
} from "../utils/seo";

export function meta({ data: _data }: Route.MetaArgs) {
  const title = "Blog — Sumit Kar";
  const description =
    "Explore backend engineering, AI architecture, authentication, and system design notes by Sumit Kar, with practical guides from production-scale software delivery.";
  const url = `${SITE_URL}/blog`;
  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "index,follow" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:site_name", content: "Sumit Kar" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: DEFAULT_OG_IMAGE },
    { property: "og:image:alt", content: "Sumit Kar blog social preview" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    { name: "twitter:image:alt", content: "Sumit Kar blog social preview" },
    { tagName: "link", rel: "canonical", href: url },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const activeTag = url.searchParams.get("tag")?.trim();

  if (activeTag) {
    throw redirect(getBlogTagHref(activeTag));
  }

  const posts = await getPosts();
  return { posts };
}

export default function BlogIndex() {
  const { posts } = useLoaderData<typeof loader>();
  const { search } = useLocation();
  const activeQuery = new URLSearchParams(search).get("q")?.trim() ?? "";
  const isSearchMode = activeQuery.length >= 2;
  const suggestedTopics = [...new Set(posts.flatMap((post) => post.tags))];
  const blogJsonLd = blogIndexJsonLd(posts);
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", item: SITE_URL },
    { name: "Blog", item: `${SITE_URL}/blog` },
  ]);

  return (
    <BaseLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }}
      />
      <section className="relative w-full overflow-hidden bg-transparent" style={{ minHeight: '100svh', paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="layout-container blog-frame px-4 md:px-10 relative z-10">
          <div className="mb-16">
            <div className="section-label">Transmission Log</div>
            <h1 className="section-title" style={{ marginBottom: '16px' }}>
              <>Engineering <span className="accent">Insights</span></>
            </h1>
            <p className="text-[rgba(200,216,240,0.65)] font-light leading-relaxed max-w-2xl text-lg">
              {"Thoughts on building resilient backend systems, orchestrating AI-native architectures, and navigating the complexities of enterprise scale."}
            </p>
          </div>

          <BlogSearch suggestions={suggestedTopics} />

          {!isSearchMode ? (
            <div className="grid gap-8">
            {posts.map((post, i) => (
              <article key={post.slug} className="project-card visible group" style={{ animationDelay: `${i * 100}ms` }}>
                <Link to={`/blog/${post.year}/${post.month}/${post.slug}`} className="absolute inset-0 z-10" aria-label={`Read ${post.title}`}></Link>
                <div className="flex flex-col gap-4 relative z-20 pointer-events-none">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <time className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase opacity-80">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                      <span className="font-mono text-[10px] text-magenta-400 tracking-widest uppercase">{post.category}</span>
                    </div>
                    <div className="h-px bg-white/10 flex-1 ml-4 hidden md:block"></div>
                  </div>
                  
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors drop-shadow-sm mb-2">
                      {post.title}
                    </h2>
                    <p className="text-[rgba(200,216,240,0.6)] leading-relaxed font-light text-sm line-clamp-2">
                      {post.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2 pointer-events-auto relative z-30">
                    {post.tags.map(tag => (
                      <Link
                        key={tag}
                        to={getBlogTagHref(tag)}
                        className="px-2 py-0.5 border border-white/10 rounded-full text-[9px] font-mono text-muted uppercase tracking-wider bg-white/5 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
                        aria-label={`View posts tagged ${tag}`}
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center font-mono text-[10px] text-cyan-400 tracking-widest uppercase group-hover:gap-3 transition-all">
                    Initialize Extraction <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </article>
            ))}
            </div>
          ) : (
            <div className="rounded-[24px] border border-white/8 bg-white/[0.02] px-5 py-4 text-sm leading-relaxed text-[rgba(200,216,240,0.66)]">
              Search results are shown above. Clear the query to return to the full transmission log.
            </div>
          )}
          {!isSearchMode && posts.length === 0 ? (
            <div className="project-card visible mt-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-400 mb-3">No Matching Entries</div>
              <p className="text-[rgba(200,216,240,0.68)] font-light leading-relaxed">
                No blog posts were found for this tag yet.
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </BaseLayout>
  );
}
