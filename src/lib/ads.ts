/**
 * Single place to configure advertising for Promptify.
 *
 * Everything is disabled until a real AdSense configuration is provided.
 * To go live later:
 *   1. set `enabled: true`
 *   2. fill in `publisherId` (ca-pub-XXXXXXXXXXXXXXXX)
 *   3. fill in the `slots` ids for each placement
 * No other file needs to change.
 */

export type AdPlacement = "prompt-detail" | "listing-footer" | "in-feed";

export type AdsConfig = {
  /** Master switch. While false, no ad markup, script or reserved space renders. */
  enabled: boolean;
  /** AdSense publisher id, e.g. "ca-pub-0000000000000000". Empty until provided. */
  publisherId: string;
  /** Ad unit ids per placement. Empty until provided. */
  slots: Record<AdPlacement, string>;
  /**
   * Show a reserved ad area before every Nth prompt view.
   * 4 = prompts 1-3 are ad-free, an ad area appears before prompt 4, 8, 12...
   */
  promptViewInterval: number;
};

export const ADS_CONFIG: AdsConfig = {
  enabled: false,
  publisherId: "",
  slots: {
    "prompt-detail": "",
    "listing-footer": "",
    "in-feed": "",
  },
  promptViewInterval: 4,
};

export function adsReady(): boolean {
  return ADS_CONFIG.enabled && ADS_CONFIG.publisherId.length > 0;
}

const STORAGE_KEY = "promptify.prompt-view-count";

/** Records a prompt view and returns the running view count for this session. */
export function recordPromptView(slug: string): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    const state = raw ? (JSON.parse(raw) as { count: number; last: string }) : { count: 0, last: "" };
    if (state.last === slug) return state.count;
    const next = { count: state.count + 1, last: slug };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next.count;
  } catch {
    return 0;
  }
}

/** True when this prompt view is one where an ad area should be reserved. */
export function isAdView(viewCount: number): boolean {
  const interval = ADS_CONFIG.promptViewInterval;
  return interval > 0 && viewCount > 0 && viewCount % interval === 0;
}
