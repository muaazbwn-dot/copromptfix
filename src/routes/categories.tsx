import { createFileRoute, Link } from "@tanstack/react-router";

import { AdSlot } from "@/components/site/AdSlot";
import { CATEGORIES, categorySlug, listPrompts } from "@/lib/promptify";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Prompt Categories — Promptify" },
      {
        name: "description",
        content:
          "Browse AI image prompts by category: realistic, anime, cinematic, fantasy, portrait, product photography and more.",
      },
      { property: "og:title", content: "Prompt Categories — Promptify" },
      {
        property: "og:description",
        content: "Find AI image prompts by style and subject across 15 curated categories.",
      },
      { property: "og:url", content: "/categories" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
  loader: async () => {
    const prompts = await listPrompts({ limit: 200 });
    const covers: Record<string, { image: string; count: number }> = {};
    for (const prompt of prompts) {
      const entry = covers[prompt.category];
      if (entry) entry.count += 1;
      else covers[prompt.category] = { image: prompt.image_url, count: 1 };
    }
    return { covers };
  },
  component: Categories,
});

function Categories() {
  const { covers } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold sm:text-4xl">Categories</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Pick a style and dive into the prompts behind the images.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((category) => {
          const cover = covers[category];
          return (
            <Link
              key={category}
              to="/explore"
              search={{ category: categorySlug(category), q: undefined }}
              className="group relative overflow-hidden rounded-2xl surface-card"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-secondary">
                {cover ? (
                  <img
                    src={cover.image}
                    alt={`${category} prompts`}
                    loading="lazy"
                    className="size-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                ) : null}
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-3">
                <p className="text-sm font-semibold">{category}</p>
                <p className="text-[11px] text-muted-foreground">
                  {cover?.count ?? 0} prompt{cover?.count === 1 ? "" : "s"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <AdSlot className="mt-12" />
    </div>
  );
}
