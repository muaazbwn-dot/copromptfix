import { Link } from "@tanstack/react-router";
import { Copy, Eye } from "lucide-react";

import { formatCount, type Prompt } from "@/lib/promptify";

export function PromptCard({ prompt, priority = false }: { prompt: Prompt; priority?: boolean }) {
  return (
    <article className="group mb-5 break-inside-avoid overflow-hidden rounded-2xl surface-card transition-transform duration-300 hover:-translate-y-1">
      <Link
        to="/prompt/$slug"
        params={{ slug: prompt.slug }}
        className="block"
        aria-label={`View prompt: ${prompt.title}`}
      >
        <div className="relative overflow-hidden">
          <img
            src={prompt.image_url}
            alt={prompt.title}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug">{prompt.title}</h3>
            <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] text-muted-foreground">
              {prompt.category}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Eye className="size-3.5" /> {formatCount(prompt.views)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Copy className="size-3.5" /> {formatCount(prompt.copies)}
              </span>
            </span>
            <span className="rounded-full border border-primary/40 px-3 py-1.5 text-xs font-medium text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              View Prompt
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function PromptGrid({ prompts }: { prompts: Prompt[] }) {
  if (prompts.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
        No prompts found. Try another search or category.
      </p>
    );
  }
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
      {prompts.map((prompt, index) => (
        <PromptCard key={prompt.id} prompt={prompt} priority={index < 4} />
      ))}
    </div>
  );
}
