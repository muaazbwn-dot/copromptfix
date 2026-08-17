import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { trackMetric } from "@/lib/promptify";

export function CopyPromptButton({
  text,
  slug,
  className = "",
}: {
  text: string;
  slug: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      toast.error("Couldn't access the clipboard");
      return;
    }
    setCopied(true);
    toast.success("Prompt copied!");
    void trackMetric(slug, "copies");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex h-13 min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-100 sm:w-auto ${className}`}
    >
      {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
      {copied ? "Prompt copied!" : "Copy Prompt"}
    </button>
  );
}
