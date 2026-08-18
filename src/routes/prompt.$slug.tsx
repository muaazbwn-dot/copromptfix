import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Copy, Eye, Tag } from "lucide-react";
import { useEffect } from "react";

import { AdSlot } from "@/components/site/AdSlot";
import { CopyPromptButton } from "@/components/site/CopyPromptButton";
import { PromptGrid } from "@/components/site/PromptCard";
import {
  categorySlug,
  formatCount,
  getPromptBySlug,
  getRelatedPrompts,
  trackMetric,
  type Prompt,
} from "@/lib/promptify";

export const Route = createFileRoute("/prompt/$slug")({
  head: ({ params }) => {
    const title = `AI Image Prompt — Promptify`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content:
            "See the exact AI image prompt behind this picture and copy it in one click. Free on Promptify.",
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: "Copy the exact AI image prompt behind this picture.",
        },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/prompt/${params.slug}` }],
    };
  },
  component: PromptDetail,
  errorComponent: () => (
    <Fallback title="This prompt didn't load" body="Try refreshing the page." />
  ),
  notFoundComponent: () => (
    <Fallback title="Prompt not found" body="It may have been removed or is awaiting review." />
  ),
});

function Fallback({ title, body }: { title: string; body: string }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      <Link
        to="/explore"
        className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        Explore prompts
      </Link>
    </div>
  );
}

function PromptDetail() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["prompt", slug],
    queryFn: () => getPromptBySlug(slug),
  });

  useEffect(() => {
    if (data) void trackMetric(slug, "views");
  }, [data, slug]);

  const { data: related = [] } = useQuery({
    queryKey: ["related", data?.id],
    queryFn: () => getRelatedPrompts(data as Prompt),
    enabled: Boolean(data),
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="h-[420px] animate-pulse rounded-3xl bg-secondary" />
      </div>
    );
  }

  if (!data) {
    return <Fallback title="Prompt not found" body="It may have been removed or is pending review." />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2">/</span>
        <Link
          to="/explore"
          search={{ category: categorySlug(data.category), q: undefined, sort: undefined }}
          className="hover:text-foreground"
        >
          {data.category}
        </Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="overflow-hidden rounded-3xl surface-card">
          <img
            src={data.image_url}
            alt={data.title}
            className="w-full object-cover"
            decoding="async"
          />
        </div>

        <div>
          <h1 className="font-display text-3xl font-semibold leading-tight">{data.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Eye className="size-3.5" /> {formatCount(data.views)} views
            </span>
            <span className="inline-flex items-center gap-1">
              <Copy className="size-3.5" /> {formatCount(data.copies)} copies
            </span>
            {data.creator ? <span>by {data.creator}</span> : null}
          </div>

          <div className="mt-6 rounded-2xl surface-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Prompt
            </p>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
              {data.prompt_text}
            </p>
          </div>

          <div className="mt-5">
            <CopyPromptButton text={data.prompt_text} slug={data.slug} />
          </div>

          {data.tags.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <Link
                  key={tag}
                  to="/explore"
                  search={{ q: tag, category: undefined, sort: undefined }}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Tag className="size-3" /> {tag}
                </Link>
              ))}
            </div>
          ) : null}

          <AdSlot className="mt-8" />
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="mb-5 font-display text-xl font-semibold">More like this</h2>
          <PromptGrid prompts={related} />
        </section>
      ) : null}
    </div>
  );
}
