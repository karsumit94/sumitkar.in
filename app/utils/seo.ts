import type { Post } from "./blog.server";

export const SITE_NAME = "Sumit Kar";
export const SITE_URL = "https://sumitkar.in";
export const SITE_DESCRIPTION =
  "Staff Engineer sharing insights on AI systems, resilient backend architecture, distributed design, and product-focused engineering at enterprise scale.";
export const HOME_META_TITLE =
  "Sumit Kar | Staff Engineer for AI Systems & Backend Scale";
export const SITE_IMAGE = `${SITE_URL}/images/SumitKar.in.png`;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/landing.png`;
export const PERSON_IMAGE = `${SITE_URL}/images/me.png`;
export const PERSON_LINKEDIN = "https://www.linkedin.com/in/timusrak";

export function absoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    image: PERSON_IMAGE,
    jobTitle: "Staff Engineer",
    description: SITE_DESCRIPTION,
    sameAs: [PERSON_LINKEDIN, SITE_URL],
    worksFor: {
      "@type": "Organization",
      name: "UKG",
    },
    knowsAbout: [
      "AI Systems",
      "Backend Architecture",
      "Distributed Systems",
      "System Design",
      "Microservices",
      "RAG Pipelines",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: SITE_IMAGE,
    sameAs: [PERSON_LINKEDIN],
  };
}

export function homePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${SITE_NAME} — Staff Engineer · AI Systems Architect`,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "Person",
      name: SITE_NAME,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: DEFAULT_OG_IMAGE,
    },
  };
}

export function resolveOgImageUrl(ogImage?: string) {
  if (!ogImage) {
    return DEFAULT_OG_IMAGE;
  }

  try {
    return new URL(ogImage).toString();
  } catch {
    return absoluteUrl(ogImage.startsWith("/") ? ogImage : `/${ogImage}`);
  }
}

export function blogIndexJsonLd(posts: Post[], activeTag?: string) {
  const blogUrl = activeTag
    ? `${absoluteUrl("/blog")}?tag=${encodeURIComponent(activeTag)}`
    : absoluteUrl("/blog");

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: activeTag ? `Posts tagged ${activeTag}` : "Engineering Insights",
    url: blogUrl,
    description: activeTag
      ? `Blog posts tagged ${activeTag}.`
      : "Thoughts on building resilient backend systems, orchestrating AI-native architectures, and navigating enterprise scale.",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "Blog",
      name: "Engineering Insights",
      url: absoluteUrl("/blog"),
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: absoluteUrl(`/blog/${post.year}/${post.month}/${post.slug}`),
        datePublished: post.date,
        keywords: post.tags.join(", "),
      })),
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; item: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

export function blogPostingJsonLd(post: Post & { html?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: SITE_IMAGE,
      },
    },
    image: resolveOgImageUrl(post.ogImage),
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.year}/${post.month}/${post.slug}`),
    },
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
