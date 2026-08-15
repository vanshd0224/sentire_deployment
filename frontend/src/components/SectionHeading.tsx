export default function SectionHeading({ title, light = false }: { title: string; light?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-5">
      <span
        className="h-px flex-shrink-0"
        style={{
          width: "clamp(24px, 6vw, 56px)",
          background: light ? "rgba(200,155,90,0.45)" : "rgba(30,30,30,0.2)",
        }}
      />
      <h2
        className="font-display uppercase text-center"
        style={{
          fontSize: "clamp(18px, 5vw, 26px)",
          letterSpacing: "0.24em",
          color: light ? "#f5f0e8" : "#1e1e1e",
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
      <span
        className="h-px flex-shrink-0"
        style={{
          width: "clamp(24px, 6vw, 56px)",
          background: light ? "rgba(200,155,90,0.45)" : "rgba(30,30,30,0.2)",
        }}
      />
    </div>
  );
}
