import { useMotionBudget } from "../motion";

/** Wine hairline across the top of the window, filling as you read down. */
export function ScrollProgress() {
  // Desktop only. Driven by the browser's own scroll timeline in CSS
  // (.scroll-progress), with no JavaScript: the old useScroll tracker
  // re-measured the whole page, and it ran even on phones where the bar
  // wasn't shown. Browsers without scroll timelines just don't show it.
  const rich = useMotionBudget();
  if (!rich) return null;
  return (
    <div
      aria-hidden
      className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[99980] h-[3px] origin-left bg-[#6b1422]"
    />
  );
}
