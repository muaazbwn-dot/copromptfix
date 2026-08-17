type AdSlotProps = {
  label?: string;
  className?: string;
  height?: "banner" | "rectangle";
};

/**
 * Reserved advertising space (Google AdSense compatible).
 * Kept visually distinct and separated from images, buttons and navigation.
 */
export function AdSlot({ label = "Advertisement", className = "", height = "banner" }: AdSlotProps) {
  return (
    <aside
      aria-label={label}
      className={`mx-auto flex w-full max-w-5xl items-center justify-center rounded-2xl border border-dashed border-border/80 bg-surface/60 text-[11px] uppercase tracking-[0.2em] text-muted-foreground ${
        height === "banner" ? "h-24 sm:h-28" : "h-64"
      } ${className}`}
      data-ad-slot="adsense"
    >
      {label}
    </aside>
  );
}
