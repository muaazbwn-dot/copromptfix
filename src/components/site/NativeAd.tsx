import { useEffect, useRef, useState } from "react";

const AD_KEY = "4be0beda39d6946f0a3d4bb5914237a6";
const AD_SRC = `https://pl31187053.profitableratecpmnetwork.com/${AD_KEY}/invoke.js`;

/**
 * Reusable native ad unit.
 *
 * Loads the provider script once per unit into its own container and keeps the
 * block collapsed (no reserved blank space) until real ad content renders.
 */
export function NativeAd({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement | null>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const node = host.current;
    if (!node) return;

    const container = document.createElement("div");
    container.id = `container-${AD_KEY}`;
    node.appendChild(container);

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = AD_SRC;
    node.appendChild(script);

    const observer = new MutationObserver(() => {
      if (container.childNodes.length > 0) setFilled(true);
    });
    observer.observe(container, { childList: true, subtree: true });

    const timer = window.setTimeout(() => {
      if (container.childNodes.length > 0) setFilled(true);
    }, 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      node.innerHTML = "";
    };
  }, []);

  return (
    <aside
      aria-label="Advertisement"
      className={`mx-auto w-full max-w-5xl overflow-hidden ${filled ? "my-8" : ""} ${className}`}
    >
      <div ref={host} className="w-full" />
    </aside>
  );
}
