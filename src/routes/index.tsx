import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Flame, Search, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { AdSlot } from "@/components/site/AdSlot";
import { PromptGrid } from "@/components/site/PromptCard";
import { CATEGORIES, categorySlug, listPrompts } from "@/lib/promptify";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Promptify — Discover, Copy, Create AI Image Prompts" },
      {
        name: "description",
        content:
          "Browse a curated gallery of AI-generated images and copy the exact prompt behind each one. Free prompt library, no login required.",
      },
      { property: "og:title", content: "Promptify — Discover, Copy, Create" },
      {
        property: "og:description",
        content: "A free, beautiful library of AI image prompts you can copy in one tap.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  loader: async () => {
    const [trending, latest, featured] = await Promise.all([
      listPrompts({ sort: "trending", limit: 8 }),
      listPrompts({ sort: "latest", limit: 12 }),
      listPrompts({ sort: "featured", limit: 8 }),
    ]);
    return { trending, latest, featured };
  },
  component: Home,
});

const HERO_IMAGES = [
  "/images/p-fantasy.jpg",
  "/images/p-scifi.jpg",
  "/images/p-car.jpg",
  "/images/p-anime.jpg",
];

function Hero() {
  const [index, setIndex] = useState(0);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => setIndex((value) => (value + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate flex min-h-[78vh] items-center overflow-hidden">
      {HERO_IMAGES.map((src, position) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          loading={position === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${
            position === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "var(--gradient-hero)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="animate-fade-up text-xs uppercase tracking-[0.35em] text-primary">
          AI Prompt Library
        </p>
        <h1 className="animate-fade-up mt-4 text-5xl font-bold leading-[1.05] sm:text-7xl">
          <span className="text-gradient-brand">Promptify</span>
        </h1>
        <p className="animate-fade-up mt-4 text-lg text-foreground/80 sm:text-xl">
          Discover. Copy. Create.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            navigate({ to: "/explore", search: { q: term || undefined, category: undefined } });
          }}
          className="animate-fade-up mx-auto mt-9 flex max-w-xl items-center gap-2 rounded-full border border-border/80 bg-background/70 p-2 backdrop-blur-xl"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          <Search className="ml-3 size-5 shrink-0 text-muted-foreground" />
          <input
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Search prompts..."
            aria-label="Search prompts"
            className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="h-11 shrink-0 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            Search
          </button>
        </form>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {CATEGORIES.slice(0, 6).map((category) => (
            <Link
              key={category}
              to="/explore"
              search={{ category: categorySlug(category), q: undefined }}
              className="rounded-full border border-border/70 bg-background/50 px-3.5 py-1.5 text-xs text-foreground/80 backdrop-blur transition-colors hover:border-primary/60 hover:text-foreground"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="flex items-center gap-2 text-2xl font-semibold sm:text-3xl">
          {icon}
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <Link
        to="/explore"
        search={{ q: undefined, category: undefined }}
        className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground hover:border-primary/60 hover:text-foreground"
      >
        Browse all
      </Link>
    </div>
  );
}

function Home() {
  const initial = Route.useLoaderData();
  const { data } = useQuery({
    queryKey: ["home-sections"],
    queryFn: async () => {
      const [trending, latest, featured] = await Promise.all([
        listPrompts({ sort: "trending", limit: 8 }),
        listPrompts({ sort: "latest", limit: 12 }),
        listPrompts({ sort: "featured", limit: 8 }),
      ]);
      return { trending, latest, featured };
    },
    initialData: initial,
  });

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6">
        {data.featured.length > 0 ? (
          <section>
            <SectionHeading
              icon={<Star className="size-5 text-primary" />}
              title="Featured Prompts"
              subtitle="Hand-picked by the Promptify editors."
            />
            <PromptGrid prompts={data.featured} />
          </section>
        ) : null}

        <AdSlot />

        <section>
          <SectionHeading
            icon={<Flame className="size-5 text-primary" />}
            title="Trending Prompts"
            subtitle="Most viewed and most copied right now."
          />
          <PromptGrid prompts={data.trending} />
        </section>

        <section>
          <SectionHeading
            icon={<Sparkles className="size-5 text-primary" />}
            title="Latest Prompts"
            subtitle="Freshly approved submissions from the community."
          />
          <PromptGrid prompts={data.latest} />
        </section>

        <AdSlot />
      </div>
    </>
  );
}
