import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Fonts ship with the site (no Google Fonts round trip): Archivo with its
// width + weight axes, and Instrument Serif for accent words.
import "@fontsource-variable/archivo/standard.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./index.css";
import { MotionConfig } from "framer-motion";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";

/**
 * Meta Pixel, without the startup cost.
 *
 * fbq() exists immediately and queues, so no event is lost, but the 70 KB
 * script itself is fetched only once the page is interactive (first idle
 * moment, or the visitor's first touch/scroll — whichever comes first).
 * On a mid-range phone this took ~600 ms of blocking off the first load.
 */
const PIXEL_ID = "4305047443093499";

if (typeof window !== "undefined") {
  const w = window as any;
  if (!w.fbq) {
    const n: any = (w.fbq = function (...args: unknown[]) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
    });
    if (!w._fbq) w._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
  }
  try {
    w.fbq("init", PIXEL_ID);
    w.fbq("track", "PageView");
  } catch {}

  // fbevents.js costs ~380ms to evaluate on a mid-range phone, so it waits
  // for a genuinely quiet moment: the browser idle *and* no scrolling for a
  // second and a half. Running it mid-scroll dropped a visible frame; the
  // queued PageView is sent the moment it lands.
  let loaded = false;
  let lastScroll = 0;
  const markScroll = () => {
    lastScroll = performance.now();
  };
  window.addEventListener("scroll", markScroll, { passive: true });

  const loadPixel = () => {
    if (loaded) return;
    loaded = true;
    window.removeEventListener("scroll", markScroll);
    window.removeEventListener("pointerdown", loadPixel);
    const t = document.createElement("script");
    t.async = true;
    t.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(t);
  };

  const idle =
    w.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
  const whenQuiet = (attempt = 0) => {
    if (loaded) return;
    // still scrolling, and we haven't been waiting too long: try again later
    if (performance.now() - lastScroll < 1500 && attempt < 12) {
      window.setTimeout(() => whenQuiet(attempt + 1), 1200);
      return;
    }
    idle(loadPixel, { timeout: 2000 });
  };
  window.setTimeout(() => whenQuiet(), 1800);
  // a tap is itself a pause in scrolling, so it's a safe moment
  window.addEventListener("pointerdown", loadPixel, {
    once: true,
    passive: true,
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      {/* Every framer-motion animation honours the OS "reduce motion" setting. */}
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </ErrorBoundary>
  </StrictMode>,
);
