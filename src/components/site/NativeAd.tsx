import { useEffect, useRef, useState } from "react";

const AD_KEY = "4be0beda39d6946f0a3d4bb5914237a6";
const AD_SRC = `https://pl31187053.profitableratecpmnetwork.com/${AD_KEY}/invoke.js`;

/**
 * Reusable native ad unit.
 *
 * The provider script writes into a container with one fixed id, so several
 * units on the same page would fight over it. Each unit therefore renders in
 * its own sandboxed iframe with its own document, which lets any number of
 * units co-exist. The iframe reports its content height back and the block
 * stays fully collapsed until real ad content arrives.
 */
export function NativeAd({ className = "" }: { className?: string }) {
  const frame = useRef<HTMLIFrameElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const node = frame.current;
    if (!node) return;

    const doc = node.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(`<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<base target="_blank">
<style>html,body{margin:0;padding:0;background:transparent;color:#e5e5e5;font-family:system-ui,sans-serif}</style>
</head><body>
<script async data-cfasync="false" src="${AD_SRC}"><\/script>
<div id="container-${AD_KEY}"></div>
<script>
(function(){
  function report(){
    var h = document.body.scrollHeight;
    parent.postMessage({ __nativeAd: true, key: "${AD_KEY}", height: h }, "*");
  }
  new MutationObserver(report).observe(document.body, { childList: true, subtree: true });
  setInterval(report, 1000);
  window.addEventListener("load", report);
})();
<\/script>
</body></html>`);
    doc.close();

    const onMessage = (event: MessageEvent) => {
      const data = event.data as { __nativeAd?: boolean; height?: number } | null;
      if (!data || !data.__nativeAd) return;
      if (event.source !== node.contentWindow) return;
      const next = Math.min(Math.max(data.height ?? 0, 0), 1200);
      setHeight(next > 20 ? next : 0);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <aside
      aria-label="Advertisement"
      className={`mx-auto w-full max-w-5xl overflow-hidden ${height > 0 ? "my-8" : ""} ${className}`}
      style={{ height: height > 0 ? height : 0 }}
    >
      <iframe
        ref={frame}
        title="Advertisement"
        scrolling="no"
        className="w-full border-0"
        style={{ height: height > 0 ? height : 1 }}
      />
    </aside>
  );
}
