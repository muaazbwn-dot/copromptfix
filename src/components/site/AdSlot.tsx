import { ADS_CONFIG, adsReady, type AdPlacement } from "@/lib/ads";

type AdSlotProps = {
  placement?: AdPlacement;
  label?: string;
  className?: string;
  height?: "banner" | "rectangle";
};

/**
 * Reserved advertising space.
 *
 * Renders nothing at all while ads are disabled in `src/lib/ads.ts`
 * (no placeholder, no fake ad, no layout shift-inducing box).
 * When a real AdSense configuration is added, insert the official
 * <ins class="adsbygoogle"> markup in the marked block below — this is the
 * only component that needs to change.
 */
export function AdSlot({
  placement = "listing-footer",
  label = "Advertisement",
  className = "",
  height = "banner",
}: AdSlotProps) {
  if (!adsReady()) return null;

  const slotId = ADS_CONFIG.slots[placement];
  if (!slotId) return null;

  return (
    <aside
      aria-label={label}
      className={`mx-auto flex w-full max-w-5xl items-center justify-center overflow-hidden rounded-2xl ${
        height === "banner" ? "min-h-24 sm:min-h-28" : "min-h-64"
      } ${className}`}
      data-ad-placement={placement}
    >
      {/* AdSense unit goes here once configuration is provided:
        <ins
          className="adsbygoogle block w-full"
          data-ad-client={ADS_CONFIG.publisherId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      */}
    </aside>
  );
}
