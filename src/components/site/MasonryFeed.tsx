import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { AdSlot } from "@/components/site/AdSlot";
import { NativeAd } from "@/components/site/NativeAd";
import { PromptGrid } from "@/components/site/PromptCard";
import { listPrompts, type Prompt } from "@/lib/promptify";

const PAGE_SIZE = 24;

/**
 * Infinite masonry feed. Loads one page at a time as the user scrolls and
 * places a banner ad slot between page batches (never inside a batch, never
 * styled like a prompt card).
 */
export function MasonryFeed({
  initialPrompts = [],
  interleaveVideos,
}: {
  initialPrompts?: Prompt[];
  interleaveVideos?: React.ReactNode;
}) {
  const sentinel = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["masonry-feed"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      listPrompts({ sort: "latest", limit: PAGE_SIZE, offset: pageParam as number }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length * PAGE_SIZE,
    ...(initialPrompts.length > 0
      ? { initialData: { pages: [initialPrompts], pageParams: [0] } }
      : {}),
  });

  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) void fetchNextPage();
      },
      { rootMargin: "600px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // De-duplicate across pages so a card never renders twice (duplicate keys would
  // make React reorder/remount cards while images are still loading).
  const seen = new Set<string>();
  const items = (data?.pages ?? [])
    .flat()
    .filter((item) => (seen.has(item.id) ? false : (seen.add(item.id), true)));

  // One ad after roughly every 7-8 rows of cards (2 columns on mobile → 16 cards).
  const CHUNK = 16;
  const chunks: Prompt[][] = [];
  for (let index = 0; index < items.length; index += CHUNK) {
    chunks.push(items.slice(index, index + CHUNK));
  }

  return (
    <div className="space-y-12">
      {chunks.map((chunk, index) => (
        <div key={index} className="space-y-12">
          <PromptGrid prompts={chunk} />
          {interleaveVideos && index === 0 ? interleaveVideos : null}
          {chunk.length === CHUNK ? <NativeAd /> : null}
          {index % 2 === 1 ? <AdSlot placement="in-feed" /> : null}
        </div>
      ))}

      <div ref={sentinel} aria-hidden="true" className="h-px" />

      {isFetchingNextPage ? (
        <p className="text-center text-xs text-muted-foreground">Loading more prompts…</p>
      ) : null}
    </div>
  );
}

