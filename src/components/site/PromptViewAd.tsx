import { useEffect, useState } from "react";

import { AdSlot } from "@/components/site/AdSlot";
import { adsReady, isAdView, recordPromptView } from "@/lib/ads";

/**
 * Frequency-controlled ad area for prompt detail pages.
 * Prompts 1-3 are ad-free; an ad area is reserved on every 4th prompt view
 * (configurable via ADS_CONFIG.promptViewInterval).
 */
export function PromptViewAd({ slug, className = "" }: { slug: string; className?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const count = recordPromptView(slug);
    setShow(isAdView(count));
  }, [slug]);

  if (!adsReady() || !show) return null;

  return <AdSlot placement="prompt-detail" className={className} height="rectangle" />;
}
