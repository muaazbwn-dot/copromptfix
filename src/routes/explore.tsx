import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

import { AdSlot } from "@/components/site/AdSlot";
import { PromptGrid } from "@/components/site/PromptCard";
import { CATEGORIES, categoryFromSlug, categorySlug, listPrompts } from "@/lib/promptify";

type ExploreSearch = { q?: string; category?: string; sort?: "latest" | "trending" };

export const Route = createFileRoute("/explore")({
  validateSearch: (search: Record<string, unknown>): ExploreSearch => ({
    q: typeof search.q === "string" && search.q ? search.q : undefined,
    category:
      typeof search.category === "string" && search.category ? search.category : undefined,
    sort: search.sort === "trending" ? "trending" : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Explore AI Image Prompts — Promptify" },
      {
        name: "description",
        content:
          "Search and filter thousands of AI image prompts by category, tag or keyword. Copy any prompt instantly.",
      },
      { property: "og:title", content: "Explore AI Image Prompts — Promptify" },
      {
        property: "og:description",
        content: "Search and filter AI image prompts by category, tag or keyword.",
      },
      { property: "og:url", content: "/explore" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/explore" }],
  }),
  component: Explore,
});

function Explore() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/explore" });
  const [term, setTerm] = useState(search.q ?? "");
  const category = search.category ? categoryFromSlug(search.category) : undefined;

  const { data: prompts = [], isLoading } = useQuery({
    queryKey: ["explore", search.q ?? "", category ?? "", search.sort ?? "latest"],
    queryFn: () =>
      listPrompts({ search: search.q, category, sort: search.sort ?? "latest", limit: 90 }),
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold sm:text-4xl">
          {category ? `${category} Prompts` : "Explore Prompts"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {search.q
            ? `Results for “${search.q}”`
            : "Browse the full library — click any image to read and copy its prompt."}
        </p>
      </header>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate({ search: (prev) => ({ ...prev, q: term || undefined }) });
        }}
        className="mb-6 flex items-center gap-2 rounded-full border border-border bg-surface p-1.5"
      >
        <Search className="ml-3 size-4 shrink-0 text-muted-foreground" />
        <input
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Search prompts..."
          aria-label="Search prompts"
          className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          className="h-10 shrink-0 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
        >
          Search
        </button>
      </form>

      <div className="mb-4 flex gap-2">
        {(["latest", "trending"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() =>
              navigate({
                search: (prev) => ({ ...prev, sort: value === "trending" ? "trending" : undefined }),
              })
            }
            className={`rounded-full px-4 py-1.5 text-xs capitalize transition-colors ${
              (search.sort ?? "latest") === value
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {value}
          </button>
        ))}
      </div>

      <nav aria-label="Categories" className="mb-8 flex flex-wrap gap-2">
        <Link
          to="/explore"
          search={(prev) => ({ ...prev, category: undefined })}
          className={`rounded-full px-3.5 py-1.5 text-xs transition-colors ${
            category
              ? "border border-border text-muted-foreground hover:text-foreground"
              : "bg-secondary text-foreground"
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((item) => (
          <Link
            key={item}
            to="/explore"
            search={(prev) => ({ ...prev, category: categorySlug(item) })}
            className={`rounded-full px-3.5 py-1.5 text-xs transition-colors ${
              category === item
                ? "bg-secondary text-foreground"
                : "border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {item}
          </Link>
        ))}
      </nav>

      {isLoading ? (
        <p className="py-16 text-center text-sm text-muted-foreground">Loading prompts…</p>
      ) : (
        <PromptGrid prompts={prompts} />
      )}

      <AdSlot className="mt-12" />
    </div>
  );
}
