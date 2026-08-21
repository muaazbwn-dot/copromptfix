import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";

import { CATEGORIES } from "@/lib/promptify";
import { publishPrompt } from "@/lib/publish.functions";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(new Error("Could not read the image file."));
    reader.readAsDataURL(file);
  });
}


export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload an AI Image Prompt — Promptify" },
      {
        name: "description",
        content:
          "Share your best AI image prompt with the Promptify community. Submissions are reviewed before publishing.",
      },
      { property: "og:title", content: "Upload an AI Image Prompt — Promptify" },
      {
        property: "og:description",
        content: "Share your AI image prompt with the Promptify community.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/upload" }],
  }),
  component: Upload,
});

const inputClass =
  "h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/60";

function Upload() {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [promptText, setPromptText] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [tags, setTags] = useState("");
  const [creator, setCreator] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pin, setPin] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const runPublish = useServerFn(publishPrompt);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim() || !promptText.trim()) {
      toast.error("Title and prompt text are required.");
      return;
    }
    if (!file && !imageUrl.trim()) {
      toast.error("Add an image file or an image URL.");
      return;
    }
    if (!pin.trim()) {
      toast.error("Enter the Owner PIN to publish this prompt.");
      return;
    }
    setPending(true);
    try {
      const result = await runPublish({
        data: {
          pin,
          title,
          prompt_text: promptText,
          category,
          tags: tags
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter(Boolean)
            .slice(0, 10),
          creator,
          imageUrl: imageUrl.trim() || undefined,
          imageBase64: file ? await fileToBase64(file) : undefined,
          imageName: file?.name,
          imageType: file?.type,
        },
      });

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      setPublishedSlug(result.slug);
      setPin("");
      setDone(true);
      toast.success("Prompt published successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Publishing failed.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-semibold">Prompt published successfully!</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your prompt is now live in the Promptify gallery.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {publishedSlug ? (
            <Link
              to="/prompt/$slug"
              params={{ slug: publishedSlug }}
              className="inline-flex rounded-full border border-border px-5 py-2.5 text-sm font-medium"
            >
              View prompt
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => {
              setDone(false);
              setPublishedSlug(null);
              setTitle("");
              setPromptText("");
              setTags("");
              setImageUrl("");
              setFile(null);
            }}
            className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Publish another
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">Upload a prompt</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Share the image and the exact prompt behind it. Every submission is reviewed by a
        moderator before it goes live.
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-5">
        <label className="grid gap-2 text-sm">
          <span className="font-medium">Title</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className={inputClass}
            placeholder="Cinematic vintage sports car at dusk"
            required
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">Prompt text</span>
          <textarea
            value={promptText}
            onChange={(event) => setPromptText(event.target.value)}
            rows={6}
            className="w-full rounded-xl border border-border bg-surface p-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/60"
            placeholder="Describe the exact prompt you used..."
            required
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            <span className="font-medium">Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className={inputClass}
            >
              {CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            <span className="font-medium">Your name (optional)</span>
            <input
              value={creator}
              onChange={(event) => setCreator(event.target.value)}
              className={inputClass}
              placeholder="Alex"
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">Tags (comma separated)</span>
          <input
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            className={inputClass}
            placeholder="cinematic, car, sunset"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">Image file</span>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:text-foreground"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">…or image URL</span>
          <input
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            className={inputClass}
            placeholder="https://..."
          />
        </label>

        <button
          type="submit"
          disabled={pending}
          className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {pending ? "Submitting…" : "Submit prompt"}
        </button>
      </form>
    </div>
  );
}
