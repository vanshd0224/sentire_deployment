import type { PageName } from "../types/appTypes";

/**
 * Wrong URLs used to land on the home page, so a mistyped link looked like
 * it had worked. This says plainly that the page doesn't exist and offers
 * the three places people were most likely heading.
 */
export default function NotFoundPage({
  onNavigate,
}: {
  onNavigate?: (page: PageName) => void;
}) {
  return (
    <main className="flex min-h-[70svh] w-full items-center justify-center bg-[#f2f2f0] px-5 py-24 text-ink">
      <div className="max-w-xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55 max-sm:text-[12px]">
          Error 404
        </p>
        <h1
          className="mt-4 text-[clamp(2.6rem,7vw,5rem)] leading-[0.95]"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          This page has{" "}
          <em className="text-[#6b1422]" style={{ fontStyle: "italic" }}>
            evaporated.
          </em>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-ink/70">
          The link may be old, or the address slightly off. Everything else is
          exactly where you left it.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <button
            type="button"
            onClick={() => onNavigate?.("perfumes")}
            className="cursor-pointer bg-ink px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-paper transition-colors duration-300 hover:bg-[#6b1422]"
          >
            Shop all perfumes
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.("discovery-set")}
            className="cursor-pointer border-b border-ink/30 pb-1 text-[13px] text-ink hover:border-ink"
          >
            Discovery Set, ₹549 →
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.("home")}
            className="cursor-pointer border-b border-ink/30 pb-1 text-[13px] text-ink hover:border-ink"
          >
            Back home →
          </button>
        </div>
      </div>
    </main>
  );
}
