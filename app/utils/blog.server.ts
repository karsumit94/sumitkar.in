import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
  year: string;
  month: string;
};

export type PostMarkdownAttributes = {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
};

const postsPath = path.join(process.cwd(), "blogs");

export async function getPosts(): Promise<Post[]> {
  const dir = await fs.readdir(postsPath);
  const posts = await Promise.all(
    dir
      .filter((file) => file.endsWith(".md"))
      .map(async (filename) => {
        const file = await fs.readFile(path.join(postsPath, filename));
        const { data } = matter(file.toString());
        const date = new Date(data.date);
        return {
          slug: filename.replace(/\.md$/, ""),
          title: data.title,
          description: data.description,
          date: data.date,
          category: data.category || "General",
          tags: data.tags || [],
          author: data.author || "Sumit Kar",
          year: date.getFullYear().toString(),
          month: (date.getMonth() + 1).toString().padStart(2, '0'),
        };
      })
  );

  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export async function getPost(slug: string) {
  const filepath = path.join(postsPath, `${slug}.md`);
  try {
    const file = await fs.readFile(filepath);
    const { data, content } = matter(file.toString());
    const html = await marked.parse(content);
    const date = new Date(data.date);
    return { 
        slug, 
        title: data.title, 
        description: data.description, 
        date: data.date,
        category: data.category || "General",
        tags: data.tags || [],
        author: data.author || "Sumit Kar",
        year: date.getFullYear().toString(),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        html 
    };
  } catch {
    return null;
  }
}
