import { useState, type ReactNode } from "react";
import { Lock } from "lucide-react";

import { rewardedReady, requestRewardedAd } from "@/lib/ads";

/**
 * Rewarded-video unlock gate.
 *
 * Disabled by default: while `ADS_CONFIG.rewarded.enabled` is false (or no
 * rewarded provider is configured in `src/lib/ads.ts`), the children render
 * normally — no lock, no placeholder, no simulated ad. Nothing ever plays
 * automatically; the user must press the button themselves, and the prompt
 * only unlocks when the real ad SDK reports a completed view.
 */
export function RewardedUnlock({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [pending, setPending] = useState(false);

  if (!rewardedReady() || unlocked) return <>{children}</>;

  return (
    <div className="rounded-2xl border border-dashed border-border p-6 text-center">
      <Lock className="mx-auto size-5 text-muted-foreground" />
      <p className="mt-3 text-sm font-medium">Watch a short video to unlock this prompt</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Optional — the video only starts when you choose to watch it.
      </p>
      <button
        type="button"
        disabled={pending}
        onClick={async () => {
          setPending(true);
          const completed = await requestRewardedAd();
          setPending(false);
          if (completed) setUnlocked(true);
        }}
        className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
      >
        {pending ? "Loading…" : "Watch video to unlock"}
      </button>
    </div>
  );
}
