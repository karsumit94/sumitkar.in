import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/blog.tag.$tag";
import { getPosts } from "../utils/blog.server";
import { BaseLayout } from "../components/BaseLayout";
import { getCanonicalTag, getBlogTagHref, normalizeTag } from "../utils/blog";
import {
  SITE_IMAGE,
  SITE_URL,
  blogIndexJsonLd,
  breadcrumbJsonLd,
  serializeJsonLd,
} from "../utils/seo";

export function meta({ data }: Route.MetaArgs) {
  const activeTag = data?.activeTag ?? "Tag";
  const title = `Posts tagged ${activeTag} — Sumit Kar`;
  const description = `Blog posts tagged ${activeTag}.`;
  const url = `${SITE_URL}${getBlogTagHref(activeTag)}`;

  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "index,follow" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: SITE_IMAGE },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: SITE_IMAGE },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const rawTag = params.tag?.trim() ?? "";
  const posts = await getPosts();
  const allTags = posts.flatMap((post) => post.tags);
  const activeTag = getCanonicalTag(allTags, rawTag);
  const filteredPosts = posts.filter((post) =>
    post.tags.some((tag) => normalizeTag(tag) === normalizeTag(rawTag))
  );

  return { posts: filteredPosts, activeTag };
}

export default function BlogTagIndex() {
  const { posts, activeTag } = useLoaderData<typeof loader>();
  const blogJsonLd = blogIndexJsonLd(posts, activeTag);
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", item: SITE_URL },
    { name: "Blog", item: `${SITE_URL}/blog` },
    { name: activeTag, item: `${SITE_URL}${getBlogTagHref(activeTag)}` },
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
              <>Tagged <span className="accent">{activeTag}</span></>
            </h1>
            <p className="text-[rgba(200,216,240,0.65)] font-light leading-relaxed max-w-2xl text-lg">
              {`All blog posts filed under ${activeTag}.`}
            </p>
            <div className="mt-6">
              <Link to="/blog" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-400 hover:text-white transition-colors">
                <span>←</span>
                Clear Filter
              </Link>
            </div>
          </div>

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
                    {post.tags.map((tag) => (
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
          {posts.length === 0 ? (
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
