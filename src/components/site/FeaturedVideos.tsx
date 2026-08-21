import { Play } from "lucide-react";
import { useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FEATURED_VIDEOS, isEmbed, type FeaturedVideo } from "@/lib/videos";

export function FeaturedVideos() {
  const [active, setActive] = useState<FeaturedVideo | null>(null);

  if (FEATURED_VIDEOS.length === 0) return null;

  return (
    <section aria-labelledby="featured-videos">
      <div className="mb-6">
        <h2 id="featured-videos" className="text-2xl font-semibold sm:text-3xl">
          Featured Videos
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Tutorials and prompt demonstrations from Promptify.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_VIDEOS.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setActive(video)}
            className="group overflow-hidden rounded-2xl surface-card text-left transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid size-14 place-items-center rounded-full bg-primary/90 text-primary-foreground backdrop-blur">
                  <Play className="size-6" />
                </span>
              </span>
            </div>
            <div className="space-y-1.5 p-4">
              <h3 className="line-clamp-1 text-sm font-semibold">{video.title}</h3>
              <p className="line-clamp-2 text-xs text-muted-foreground">{video.description}</p>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={Boolean(active)} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-3xl overflow-hidden p-0">
          <DialogTitle className="sr-only">{active?.title ?? "Video"}</DialogTitle>
          {active ? (
            <div className="aspect-video w-full bg-black">
              {isEmbed(active.src) ? (
                <iframe
                  src={active.src}
                  title={active.title}
                  allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="size-full"
                />
              ) : (
                <video src={active.src} controls playsInline className="size-full" />
              )}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
