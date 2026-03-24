/* global process */

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { createIndex } from "pagefind";

const cwd = process.cwd();
const blogsPath = path.join(cwd, "blogs");
const outputPath = path.join(cwd, "build", "client", "pagefind");

function markdownToPlainText(markdown) {
  const html = marked.parse(markdown);

  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

async function buildPagefindIndex() {
  const indexResponse = await createIndex();

  if (!indexResponse.index) {
    throw new Error(indexResponse.errors.join("\n") || "Pagefind index could not be created.");
  }

  const index = indexResponse.index;
  const files = await fs.readdir(blogsPath);

  await fs.rm(outputPath, { recursive: true, force: true });

  for (const filename of files.filter((file) => file.endsWith(".md"))) {
    const filePath = path.join(blogsPath, filename);
    const file = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(file);
    const slug = filename.replace(/\.md$/, "");
    const date = new Date(data.date);
    const year = date.getFullYear().toString();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const url = `/blog/${year}/${month}/${slug}`;

    const plainText = markdownToPlainText(content);
    const searchableContent = [data.title, data.description, data.category, ...(data.tags || []), plainText]
      .filter(Boolean)
      .join("\n\n");

    const response = await index.addCustomRecord({
      url,
      language: "en",
      content: searchableContent,
      meta: {
        title: data.title || slug,
        description: data.description || "",
        category: data.category || "General",
        date: data.date || "",
      },
      filters: data.category ? { category: [data.category] } : undefined,
      sort: data.date ? { date: data.date } : undefined,
    });

    if (response.errors.length > 0) {
      throw new Error(response.errors.join("\n"));
    }
  }

  const writeResponse = await index.writeFiles({ outputPath });

  if (writeResponse.errors.length > 0) {
    throw new Error(writeResponse.errors.join("\n"));
  }
}

await buildPagefindIndex();
