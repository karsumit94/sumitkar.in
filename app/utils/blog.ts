export function normalizeTag(tag: string) {
  return tag.trim().toLowerCase();
}

export function getBlogTagHref(tag: string) {
  return `/blog/tag/${encodeURIComponent(tag)}`;
}

export function getCanonicalTag(
  tags: string[],
  rawTag: string
) {
  const normalizedRawTag = normalizeTag(rawTag);
  return tags.find((tag) => normalizeTag(tag) === normalizedRawTag) ?? rawTag.trim();
}

export function getUniqueBlogTags(posts: Array<{ tags: string[] }>) {
  const seen = new Set<string>();
  const uniqueTags: string[] = [];

  for (const post of posts) {
    for (const tag of post.tags) {
      const normalizedTag = normalizeTag(tag);
      if (!seen.has(normalizedTag)) {
        seen.add(normalizedTag);
        uniqueTags.push(tag);
      }
    }
  }

  return uniqueTags;
}
