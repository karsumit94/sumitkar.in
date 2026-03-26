import { Link } from "react-router";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import HTMLFlipBook from "react-pageflip";
import type { Route } from "./+types/books.digital-bharat";
import { BaseLayout } from "../components/BaseLayout";
import bookData from "../data/generated/digital-bharat.json";
import {
  SITE_IMAGE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  breadcrumbJsonLd,
  serializeJsonLd,
} from "../utils/seo";

const BOOK_TITLE = "Digital Bharat";
const BOOK_DESCRIPTION =
  "Read Digital Bharat in an interactive page-flip experience with the official front cover and a generated image edition built from the source PDF.";
const AMAZON_URL = "https://amzn.to/41rHJ3I";
const FLIPKART_URL =
  "https://www.flipkart.com/digital-bharat-ai-computing/p/itm80ad8266acfc6";

type FlipBookHandle = {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
  };
};

function getFlipPageIndex(data: unknown) {
  if (typeof data === "number") {
    return data;
  }

  if (typeof data === "object" && data && "page" in data) {
    const page = (data as { page?: unknown }).page;
    return typeof page === "number" ? page : 0;
  }

  return 0;
}

const BookCoverPage = forwardRef<HTMLDivElement>(function BookCoverPage(_, ref) {
  return (
    <div ref={ref} className="book-flip-page book-flip-page-cover" data-density="hard">
      <div className="book-reader-cover">
        <div className="book-reader-cover-spine"></div>
        <img
          src={bookData.coverPath}
          alt={`${BOOK_TITLE} cover`}
          className="book-reader-cover-image"
          width={1294}
          height={2000}
          decoding="async"
        />
      </div>
    </div>
  );
});

const BookBlankPage = forwardRef<HTMLDivElement>(function BookBlankPage(_, ref) {
  return (
    <div ref={ref} className="book-flip-page">
      <div className="book-pdf-page-shell book-pdf-page-shell-blank" aria-hidden="true"></div>
    </div>
  );
});

const BookImagePage = forwardRef<
  HTMLDivElement,
  { pageNumber: number; src: string }
>(function BookImagePage({ pageNumber, src }, ref) {
  return (
    <div ref={ref} className="book-flip-page">
      <div className="book-pdf-page-shell">
        <img
          src={src}
          alt={`${BOOK_TITLE} page ${pageNumber}`}
          className="book-reader-page-image"
          width={1294}
          height={2000}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
});

const BookEndPage = forwardRef<HTMLDivElement>(function BookEndPage(_, ref) {
  return (
    <div ref={ref} className="book-flip-page book-flip-page-end" data-density="hard">
      <div className="book-end-card">
        <div className="book-end-kicker">End Matter</div>
        <h2 className="book-end-title">Continue Beyond The Reader</h2>
        <p className="book-end-copy">
          Download the full PDF or grab a physical copy from Amazon or Flipkart.
        </p>
        <div className="book-end-links">
          <a href={AMAZON_URL} target="_blank" rel="noreferrer">
            Amazon
          </a>
          <a href={FLIPKART_URL} target="_blank" rel="noreferrer">
            Flipkart
          </a>
        </div>
      </div>
    </div>
  );
});

export function meta(_: Route.MetaArgs) {
  const pageUrl = absoluteUrl("/books/digital-bharat");

  return [
    { title: `${BOOK_TITLE} — ${SITE_NAME}` },
    { name: "description", content: BOOK_DESCRIPTION },
    { name: "robots", content: "index,follow" },
    { property: "og:title", content: `${BOOK_TITLE} — ${SITE_NAME}` },
    { property: "og:description", content: BOOK_DESCRIPTION },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:type", content: "book" },
    { property: "og:url", content: pageUrl },
    { property: "og:image", content: absoluteUrl(bookData.coverPath) },
    { property: "og:image:alt", content: `${BOOK_TITLE} book cover` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `${BOOK_TITLE} — ${SITE_NAME}` },
    { name: "twitter:description", content: BOOK_DESCRIPTION },
    { name: "twitter:image", content: absoluteUrl(bookData.coverPath) },
    { name: "twitter:image:alt", content: `${BOOK_TITLE} book cover` },
    { tagName: "link", rel: "canonical", href: pageUrl },
  ];
}

export default function DigitalBharatBookPage() {
  const [isClient, setIsClient] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [stageWidth, setStageWidth] = useState(0);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "landscape"
  );
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const flipBookRef = useRef<FlipBookHandle | null>(null);
  const readerPanelRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!stageRef.current) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }

      setStageWidth(entry.contentRect.width);
    });

    observer.observe(stageRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        flipBookRef.current?.pageFlip().flipNext();
      }

      if (event.key === "ArrowLeft") {
        flipBookRef.current?.pageFlip().flipPrev();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === readerPanelRef.current);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const basePageWidth = 520;
  const basePageHeight = Math.round(basePageWidth / bookData.aspectRatio);
  const minPageWidth = 220;
  const maxPageWidth = 720;
  const minPageHeight = Math.round(minPageWidth / bookData.aspectRatio);
  const maxPageHeight = Math.round(maxPageWidth / bookData.aspectRatio);
  const renderWidth = Math.max(
    180,
    Math.floor(
      (stageWidth || basePageWidth * (orientation === "landscape" ? 2 : 1)) /
      (orientation === "landscape" ? 2 : 1)
    ) - 40
  );

  const imagePages = useMemo(
    () => bookData.pages.map((page) => ({ ...page })),
    []
  );
  const totalReaderPages = bookData.pageCount + 3;

  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: BOOK_TITLE,
    description: BOOK_DESCRIPTION,
    url: absoluteUrl("/books/digital-bharat"),
    image: absoluteUrl(bookData.coverPath),
    bookFormat: "https://schema.org/EBook",
    encoding: {
      "@type": "MediaObject",
      contentUrl: absoluteUrl(bookData.pdfPath),
      encodingFormat: "application/pdf",
    },
    author: {
      "@type": "Person",
      name: SITE_NAME,
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
    inLanguage: "en",
    numberOfPages: bookData.pageCount,
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", item: SITE_URL },
    { name: "Books", item: absoluteUrl("/books/digital-bharat") },
    { name: BOOK_TITLE, item: absoluteUrl("/books/digital-bharat") },
  ]);

  const toggleFullscreen = async () => {
    const panel = readerPanelRef.current;

    if (!panel) {
      return;
    }

    if (document.fullscreenElement === panel) {
      await document.exitFullscreen();
      return;
    }

    await panel.requestFullscreen();
  };

  return (
    <BaseLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(bookJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }}
      />

      <section className="book-page-shell">
        <div className="layout-container section-frame book-page-frame">
          <Link to="/" className="book-page-back">
            <span>←</span>
            Return to Main Console
          </Link>

          <div className="book-hero">
            <div className="book-hero-copy">
              <div className="book-kicker">Featured Publication</div>
              <h1 className="book-title">
                {BOOK_TITLE}
                <span className="book-title-accent">AI &amp; Computing</span>
              </h1>
              <p className="book-description">{BOOK_DESCRIPTION}</p>
              <div className="book-purchase-note">
                Physical copies can be purchased on{" "}
                <a href={AMAZON_URL} target="_blank" rel="noreferrer">
                  Amazon
                </a>{" "}
                and{" "}
                <a href={FLIPKART_URL} target="_blank" rel="noreferrer">
                  Flipkart
                </a>
                .
              </div>
              <div className="book-actions">
                <a
                  href={bookData.pdfPath}
                  download
                  className="book-action-primary"
                >
                  Download PDF
                </a>
              </div>
            </div>

            <div className="book-cover-display">
              <div className="book-cover-orbit"></div>
              <img
                src={bookData.coverPath}
                alt={`${BOOK_TITLE} front cover`}
                className="book-cover-image"
                width={1294}
                height={2000}
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>

          <div
            className={`book-reader-panel${isFullscreen ? " is-fullscreen" : ""}`}
            ref={readerPanelRef}
          >
            <div className="book-reader-toolbar">
              <div>
                <div className="book-reader-progress">
                  Page {currentPageIndex + 1} of {totalReaderPages}
                </div>
              </div>
              <div className="book-reader-controls">
                <button
                  type="button"
                  className="book-reader-button"
                  onClick={() => {
                    void toggleFullscreen();
                  }}
                >
                  {isFullscreen ? "Exit Full Screen" : "Full Screen"}
                </button>
              </div>
            </div>
            <div className="book-reader-stage" ref={stageRef}>
              {isClient ? (
                <HTMLFlipBook
                  ref={flipBookRef}
                  width={basePageWidth}
                  height={basePageHeight}
                  size="stretch"
                  minWidth={minPageWidth}
                  maxWidth={maxPageWidth}
                  minHeight={minPageHeight}
                  maxHeight={maxPageHeight}
                  maxShadowOpacity={0.24}
                  drawShadow
                  showCover
                  usePortrait
                  startZIndex={10}
                  autoSize
                  mobileScrollSupport
                  clickEventForward
                  flippingTime={760}
                  onFlip={(event) => setCurrentPageIndex(getFlipPageIndex(event.data))}
                  onInit={(event) => setCurrentPageIndex(getFlipPageIndex(event.data))}
                  onChangeOrientation={(event) =>
                    setOrientation(event.data as "portrait" | "landscape")
                  }
                  className="book-flipbook"
                >
                  <BookCoverPage />
                  <BookBlankPage />
                  {imagePages.map((page) => (
                    <BookImagePage
                      key={page.pageNumber}
                      pageNumber={page.pageNumber}
                      src={page.src}
                    />
                  ))}
                  <BookEndPage />
                </HTMLFlipBook>
              ) : (
                <div className="book-reader-loading">Preparing reader...</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
