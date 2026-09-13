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

        const baseUrl = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"] ?? "";
        const serviceKey = process.env["SUPABASE_SERVICE_ROLE_KEY"] ?? "";

        // Resized variant: served straight from the storage image transformer,
        // which is dramatically smaller than the original upload.
        if (width && baseUrl && serviceKey) {
          const target =
            `${baseUrl}/storage/v1/render/image/authenticated/prompt-images/${path}` +
            `?width=${width}&quality=68&resize=contain`;
          const response = await fetch(target, {
            headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
          });
          if (response.ok) {
            return new Response(response.body, {
              headers: {
                "content-type": response.headers.get("content-type") ?? "image/jpeg",
                "cache-control": "public, max-age=31536000, immutable",
              },
            });
          }
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
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
