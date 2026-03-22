import { useLoaderData, Link } from "react-router";
import { getPost } from "../utils/blog.server";
import type { Route } from "./+types/blog.$slug";
import { BaseLayout } from "../components/BaseLayout";
import { getBlogTagHref } from "../utils/blog";
import {
  SITE_IMAGE,
  SITE_NAME,
  SITE_URL,
  blogPostingJsonLd,
  breadcrumbJsonLd,
  personJsonLd,
  serializeJsonLd,
} from "../utils/seo";

export function meta({ data }: Route.MetaArgs) {
  if (!data?.post) {
    return [
      { title: "Post Not Found" },
      { name: "description", content: "The requested blog post could not be found." },
    ];
  }
  const postUrl = `${SITE_URL}/blog/${data.post.year}/${data.post.month}/${data.post.slug}`;
  return [
    { title: `${data.post.title} — Sumit Kar` },
    { name: "description", content: data.post.description },
    { name: "robots", content: "index,follow" },
    { property: "og:title", content: `${data.post.title} — Sumit Kar` },
    { property: "og:description", content: data.post.description },
    { property: "og:type", content: "article" },
    { property: "og:url", content: postUrl },
    { property: "og:image", content: SITE_IMAGE },
    { name: "author", content: data.post.author },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `${data.post.title} — ${SITE_NAME}` },
    { name: "twitter:description", content: data.post.description },
    { name: "twitter:image", content: SITE_IMAGE },
    { property: "article:published_time", content: data.post.date },
    { property: "article:author", content: data.post.author },
    { property: "article:section", content: data.post.category },
    { property: "article:tag", content: data.post.tags.join(",") },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPost(params.slug);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return { post };
}

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();

  const jsonLd = blogPostingJsonLd(post);
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", item: SITE_URL },
    { name: "Blog", item: `${SITE_URL}/blog` },
    { name: post.title, item: `${SITE_URL}/blog/${post.year}/${post.month}/${post.slug}` },
  ]);

  return (
    <BaseLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd()) }}
      />
      <section className="relative w-full overflow-hidden bg-transparent" style={{ minHeight: '100svh', paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="layout-container blog-post-frame px-4 md:px-10 mx-auto relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-muted hover:text-cyan-400 transition-colors mb-12 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Log
          </Link>
          
          <article className="prose prose-invert prose-lg max-w-none">
            <header className="mb-16 border-b border-white/10 pb-12">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <time className="text-[11px] text-cyan-400 font-mono tracking-widest uppercase">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                <span className="text-[11px] text-magenta-400 font-mono tracking-widest uppercase">{post.category}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black font-display tracking-tight leading-[1.1] mb-14 drop-shadow-sm text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-blue-400/80">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px bg-white/10 flex-1"></div>
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      to={getBlogTagHref(tag)}
                      className="px-3 py-1 border border-white/5 rounded-full text-[10px] font-mono text-muted uppercase tracking-widest bg-white/5 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
                      aria-label={`View posts tagged ${tag}`}
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
                <div className="h-px bg-white/10 flex-1"></div>
              </div>

              <p className="text-xl text-[rgba(200,216,240,0.7)] leading-relaxed font-light mt-2">
                {post.description}
              </p>
            </header>
            
            <div 
              className="blog-content font-body prose-headings:font-display prose-headings:font-bold prose-headings:text-white prose-p:text-[rgba(200,216,240,0.8)] prose-p:leading-loose prose-p:font-light prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:border prose-img:border-cyan-400/20 prose-code:text-magenta-400 prose-code:bg-magenta-400/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#060c1a] prose-pre:border prose-pre:border-cyan-400/20 prose-hr:border-white/10 prose-strong:text-white prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: post.html }} 
            />
          </article>

          <footer className="mt-24 pt-12 border-t border-white/10">
            <div className="author-panel">
              <div className="author-panel-avatar">
                <div className="author-panel-avatar-ring"></div>
                <img src="/images/me.png" alt={post.author} className="author-panel-image" />
              </div>

              <div className="author-panel-body">
                <div className="author-panel-kicker">Author Detected</div>
                <div className="author-panel-header">
                  <div>
                    <h3 className="author-panel-name">{post.author}</h3>
                    <p className="author-panel-role">Staff Engineer · Backend Systems · AI Architecture</p>
                  </div>
                  <div className="author-panel-signal">Signal Stable</div>
                </div>

                <p className="author-panel-copy">
                  Building resilient backend systems and orchestrating AI-native architectures at enterprise scale.
                </p>

                <div className="author-panel-tags">
                  <span className="author-panel-tag">Distributed Systems</span>
                  <span className="author-panel-tag">Enterprise AI</span>
                  <span className="author-panel-tag">System Design</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </BaseLayout>
  );
}
