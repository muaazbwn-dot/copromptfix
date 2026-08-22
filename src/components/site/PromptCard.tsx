import { Link } from "@tanstack/react-router";
import { Copy, Eye } from "lucide-react";

import { formatCount, type Prompt } from "@/lib/promptify";

export function PromptCard({ prompt, priority = false }: { prompt: Prompt; priority?: boolean }) {
  return (
    <article className="group mb-3 break-inside-avoid overflow-hidden rounded-2xl bg-secondary/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:mb-4">
      <Link
        to="/prompt/$slug"
        params={{ slug: prompt.slug }}
        className="relative block"
        aria-label={`View prompt: ${prompt.title}`}
      >
        <img
          src={prompt.image_url}
          alt={prompt.title}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.03] group-active:scale-[0.99]"
        />

        {/* Overlay: desktop hover reveal, always-legible bottom strip on touch */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <h3 className="line-clamp-2 text-xs font-semibold leading-snug sm:text-sm">
            {prompt.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Eye className="size-3" /> {formatCount(prompt.views)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Copy className="size-3" /> {formatCount(prompt.copies)}
            </span>
            <span className="ml-auto rounded-full bg-background/70 px-2 py-0.5">
              {prompt.category}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/** Responsive masonry: 2 columns on mobile, more as the viewport grows. */
export function PromptGrid({ prompts }: { prompts: Prompt[] }) {
  if (prompts.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
        No prompts found. Try another search or category.
      </p>
    );
  }
  return (
    <div className="columns-2 gap-3 sm:columns-2 sm:gap-4 md:columns-3 xl:columns-4 2xl:columns-5">
      {prompts.map((prompt, index) => (
        <PromptCard key={prompt.id} prompt={prompt} priority={index < 4} />
      ))}
    </div>
  );
}
