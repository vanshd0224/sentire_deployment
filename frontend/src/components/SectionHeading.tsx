/**
 * Shared section heading, editorial version: a hairline rule with a left-set
 * serif title. Same props as before, so every page that already uses it
 * (perfumes, byob, discovery set…) picks up the new look automatically.
 */
export default function SectionHeading({
  title,
  subtitle,
  light = false,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="w-full">
      {" "}
      <div
        className="h-px w-full"
        style={{
          background: light ? "rgba(242, 242, 240,0.22)" : "var(--color-rule)",
        }}
      />{" "}
      <h2
        className="mt-5 font-serif text-left font-light lowercase first-letter:uppercase"
        style={{
          fontSize: "clamp(1.75rem, 4.5vw, 3.25rem)",
          letterSpacing: "-0.02em",
          lineHeight: 1.04,
          color: light ? "#f2f2f0" : "#161616",
        }}
      >
        {" "}
        {title}
      </h2>{" "}
      {subtitle && (
        <p
          className="mt-3 max-w-xl text-left text-[15px] leading-relaxed"
          style={{ color: light ? "rgba(242, 242, 240,0.7)" : "#555555" }}
        >
          {" "}
          {subtitle}
        </p>
      )}
    </div>
  );
}
