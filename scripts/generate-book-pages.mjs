import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { createCanvas, DOMMatrix, ImageData, Path2D } from "@napi-rs/canvas";
import sharp from "sharp";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import * as pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker.mjs";

globalThis.DOMMatrix = DOMMatrix;
globalThis.ImageData = ImageData;
globalThis.Path2D = Path2D;
globalThis.pdfjsWorker = pdfjsWorker;

const require = createRequire(import.meta.url);
const rootDir = process.cwd();
const pdfjsDistDir = path.dirname(require.resolve("pdfjs-dist/package.json"));
const pdfPath = path.join(rootDir, "public", "books", "Digital-Bharat.pdf");
const outputDir = path.join(rootDir, "public", "books", "digital-bharat-pages");
const tempOutputDir = path.join(rootDir, "public", "books", "digital-bharat-pages.tmp");
const metadataDir = path.join(rootDir, "app", "data", "generated");
const metadataPath = path.join(metadataDir, "digital-bharat.json");
const standardFontDataUrl = `${path.join(pdfjsDistDir, "standard_fonts")}/`;
const cMapUrl = `${path.join(pdfjsDistDir, "cmaps")}/`;

const pdfBuffer = await fs.readFile(pdfPath);
const loadingTask = pdfjs.getDocument({
  data: new Uint8Array(pdfBuffer),
  disableWorker: true,
  cMapUrl,
  cMapPacked: true,
  standardFontDataUrl,
  verbosity: pdfjs.VerbosityLevel.ERRORS,
});
const pdf = await loadingTask.promise;

await fs.rm(tempOutputDir, { recursive: true, force: true });
await fs.mkdir(tempOutputDir, { recursive: true });
await fs.mkdir(metadataDir, { recursive: true });

const pages = [];
let aspectRatio = 0.647;

for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale: 2 });

  if (pageNumber === 1 && viewport.width > 0 && viewport.height > 0) {
    aspectRatio = viewport.width / viewport.height;
  }

  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  const context = canvas.getContext("2d");

  await page.render({
    canvasContext: context,
    viewport,
  }).promise;

  const pngBuffer = await canvas.toBuffer("image/png");
  const filename = `page-${String(pageNumber).padStart(3, "0")}.webp`;

  await sharp(pngBuffer).webp({ quality: 88 }).toFile(path.join(tempOutputDir, filename));

  pages.push({
    pageNumber,
    src: `/books/digital-bharat-pages/${filename}`,
  });
}

await fs.writeFile(
  metadataPath,
  JSON.stringify(
    {
      title: "Digital Bharat",
      pdfPath: "/books/Digital-Bharat.pdf",
      coverPath: "/books/Digital-Bharat-Book-Front-Cover.jpg",
      pageCount: pdf.numPages,
      aspectRatio,
      pages,
    },
    null,
    2
  )
);

await loadingTask.destroy();
await fs.rm(outputDir, { recursive: true, force: true });
await fs.rename(tempOutputDir, outputDir);
