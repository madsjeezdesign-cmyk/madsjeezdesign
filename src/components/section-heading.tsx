export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  variant = "light",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  variant?: "light" | "dark";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const isDark = variant === "dark";

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      <p
        className={`text-sm font-semibold uppercase tracking-wider ${isDark ? "text-teal-400" : "text-accent"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 font-[family-name:var(--font-instrument)] text-3xl tracking-tight md:text-4xl lg:text-5xl ${isDark ? "text-white" : "text-foreground"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${isDark ? "text-slate-300" : "text-muted"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
