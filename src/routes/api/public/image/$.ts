import { createFileRoute } from "@tanstack/react-router";

/** Only these widths are served, so the CDN cache stays small and hot. */
const ALLOWED_WIDTHS = [200, 320, 400, 600, 900, 1200, 1600];

export const Route = createFileRoute("/api/public/image/$")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const path = params._splat ?? "";
        if (!path || path.includes("..")) return new Response("Not found", { status: 404 });

        const requested = Number(new URL(request.url).searchParams.get("w") ?? "");
        const width = ALLOWED_WIDTHS.includes(requested) ? requested : undefined;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Resized variant: served by the storage image transformer, which is
        // dramatically smaller than the original upload. The browser's Accept
        // header is forwarded so modern clients get WebP instead of huge PNGs.
        if (width) {
          const signed = await supabaseAdmin.storage
            .from("prompt-images")
            .createSignedUrl(path, 60, {
              transform: { width, quality: 68, resize: "contain" },
            });
          if (signed.data?.signedUrl) {
            const accept = request.headers.get("accept") ?? "image/webp,image/*";
            const response = await fetch(signed.data.signedUrl, { headers: { accept } });
            if (response.ok) {
              return new Response(response.body, {
                headers: {
                  "content-type": response.headers.get("content-type") ?? "image/webp",
                  "cache-control": "public, max-age=31536000, immutable",
                  vary: "Accept",
                },
              });
            }
          }
        }


        const { data, error } = await supabaseAdmin.storage.from("prompt-images").download(path);

        if (error || !data) return new Response("Not found", { status: 404 });

        return new Response(data, {
          headers: {
            "content-type": data.type || "image/jpeg",
            "cache-control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
