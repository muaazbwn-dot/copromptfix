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

/**
 * Rewarded-video unlock configuration.
 *
 * Disabled until a real, policy-compliant rewarded-ad product is wired up.
 * While disabled, prompts are never locked and no ad code runs.
 */
export const REWARDED_CONFIG: {
  enabled: boolean;
  /** Rewarded ad unit id from the chosen provider. */
  unitId: string;
} = {
  enabled: false,
  unitId: "",
};

export function rewardedReady(): boolean {
  return REWARDED_CONFIG.enabled && REWARDED_CONFIG.unitId.length > 0;
}

/**
 * Requests a user-initiated rewarded ad and resolves true only when the real
 * SDK reports a completed view. No simulation, no autoplay: while no provider
 * is configured this always resolves false and the caller keeps content open.
 */
export async function requestRewardedAd(): Promise<boolean> {
  if (!rewardedReady()) return false;
  // Insert the official rewarded-ad SDK call here once configured, e.g.
  //   return new Promise((resolve) => provider.show(REWARDED_CONFIG.unitId, {
  //     beforeReward: (show) => show(),
  //     adViewed: () => resolve(true),
  //     adDismissed: () => resolve(false),
  //   }));
  return false;
}

export function adsReady(): boolean {
  return ADS_CONFIG.enabled && ADS_CONFIG.publisherId.length > 0;
}


const STORAGE_KEY = "promptHell.prompt-view-count";

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
