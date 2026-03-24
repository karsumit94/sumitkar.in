import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

type PagefindSearchData = {
  url: string;
  excerpt: string;
  meta: Record<string, string>;
};

type PagefindSearchResult = {
  data: () => Promise<PagefindSearchData>;
};

type PagefindSearchResponse = {
  results: PagefindSearchResult[];
};

type PagefindModule = {
  search: (term: string) => Promise<PagefindSearchResponse>;
};

type SearchResult = {
  url: string;
  title: string;
  excerpt: string;
  description?: string;
  category?: string;
  date?: string;
};

const MIN_QUERY_LENGTH = 2;
const MAX_RESULTS = 6;
const MAX_SUGGESTIONS = 5;

const importPagefind = new Function(
  "modulePath",
  "return import(modulePath);",
) as (modulePath: string) => Promise<PagefindModule>;

function formatSearchDate(value?: string) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogSearch({ suggestions = [] }: { suggestions?: string[] }) {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const initialQuery = new URLSearchParams(search).get("q")?.trim() ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query.trim());
  const pagefindRef = useRef<PagefindModule | null>(null);
  const quickTopics = useMemo(
    () => suggestions.filter(Boolean).slice(0, MAX_SUGGESTIONS),
    [suggestions],
  );
  const isSearchMode = deferredQuery.length >= MIN_QUERY_LENGTH;

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const current = params.get("q")?.trim() ?? "";
    const next = query.trim();

    if (current === next) {
      return;
    }

    if (next) {
      params.set("q", next);
    } else {
      params.delete("q");
    }

    const nextSearch = params.toString();
    void navigate(
      {
        pathname,
        search: nextSearch ? `?${nextSearch}` : "",
      },
      { replace: true },
    );
  }, [navigate, pathname, query, search]);

  useEffect(() => {
    let cancelled = false;

    async function performSearch() {
      if (deferredQuery.length < MIN_QUERY_LENGTH) {
        setLoading(false);
        setError(null);
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const pagefind =
          pagefindRef.current ??
          (await importPagefind("/pagefind/pagefind.js"));

        pagefindRef.current = pagefind;

        const search = await pagefind.search(deferredQuery);
        const nextResults = await Promise.all(
          search.results.slice(0, MAX_RESULTS).map(async (result) => {
            const data = await result.data();

            return {
              url: data.url,
              title: data.meta.title || data.url,
              excerpt: data.excerpt,
              description: data.meta.description,
              category: data.meta.category,
              date: data.meta.date,
            };
          }),
        );

        if (!cancelled) {
          setResults(nextResults);
        }
      } catch {
        if (!cancelled) {
          setError("Search index is only available after a production build.");
          setResults([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void performSearch();

    return () => {
      cancelled = true;
    };
  }, [deferredQuery]);

  const resultLabel = loading
    ? "Scanning indexed logs"
    : `${results.length} result${results.length === 1 ? "" : "s"}`;

  return (
    <section className="blog-search-panel mb-16 rounded-[28px] border border-cyan-400/15 bg-white/[0.03] p-5 md:p-7 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_24px_80px_rgba(0,0,0,0.28)]">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,560px)] lg:items-center">
        <div className="max-w-2xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-cyan-400/80">
            Signal Search
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold text-white">
            Search across blog logs
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[rgba(200,216,240,0.66)]">
            Search titles, summaries, and post content. Results update as you type.
          </p>
          {!isSearchMode && quickTopics.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {quickTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setQuery(topic)}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(200,216,240,0.8)] transition hover:border-cyan-400/40 hover:text-cyan-300"
                >
                  {topic}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="w-full">
          <label htmlFor="blog-search" className="sr-only">
            Search blog posts
          </label>
          <div className="blog-search-input-shell">
            <span className="blog-search-input-icon" aria-hidden="true">
              Search
            </span>
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search systems, AI, APIs..."
              className="blog-search-input"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="blog-search-clear"
              >
                Clear
              </button>
            ) : null}
          </div>
          <div className="mt-4 min-h-10">
            {isSearchMode && !error ? (
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/8 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300">
                <span>Search Mode</span>
                <span className="h-1 w-1 rounded-full bg-cyan-400/60" />
                <span>{resultLabel}</span>
              </div>
            ) : null}

            {query.trim().length > 0 && query.trim().length < MIN_QUERY_LENGTH ? (
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Type at least {MIN_QUERY_LENGTH} characters to begin search.
              </p>
            ) : null}

            {loading ? (
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-400">
                Scanning indexed logs...
              </p>
            ) : null}

            {error ? (
              <p className="text-sm leading-relaxed text-[rgba(255,128,180,0.82)]">{error}</p>
            ) : null}

            {!loading && !error && deferredQuery.length >= MIN_QUERY_LENGTH && results.length === 0 ? (
              <p className="text-sm text-[rgba(200,216,240,0.66)]">
                No matching entries found for “{deferredQuery}”.
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {!loading && results.length > 0 ? (
        <div className="mt-6 grid gap-4">
          {results.map((result) => (
            <a
              key={result.url}
              href={result.url}
              className="group rounded-2xl border border-white/8 bg-[#07101b]/90 p-5 transition hover:border-cyan-400/35 hover:bg-[#091424]"
            >
              <div className="flex flex-wrap items-center gap-3">
                {result.date ? (
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-400/85">
                    {formatSearchDate(result.date)}
                  </span>
                ) : null}
                {result.category ? (
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-magenta-400/85">
                    {result.category}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold text-white transition group-hover:text-cyan-300">
                {result.title}
              </h3>
              {result.description ? (
                <p className="mt-2 text-sm leading-relaxed text-[rgba(200,216,240,0.7)]">
                  {result.description}
                </p>
              ) : null}
              <p
                className="blog-search-excerpt mt-3 text-sm leading-relaxed text-[rgba(200,216,240,0.62)]"
                dangerouslySetInnerHTML={{ __html: result.excerpt }}
              />
              <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-400 transition group-hover:translate-x-1">
                Open Post →
              </div>
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
}
