import { Info, TriangleAlert } from "lucide-react";

type DocCalloutProps = {
  variant?: "info" | "warning";
  title: string;
  children: React.ReactNode;
};

export function DocCallout({
  variant = "info",
  title,
  children,
}: DocCalloutProps) {
  const isWarning = variant === "warning";

  return (
    <aside
      className={[
        "mt-6 rounded-xl border p-4",
        isWarning
          ? "border-amber-500/40 bg-amber-500/10"
          : "border-sky-500/40 bg-sky-500/10",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        {isWarning ? (
          <TriangleAlert className="mt-0.5 h-4 w-4" />
        ) : (
          <Info className="mt-0.5 h-4 w-4" />
        )}
        <div>
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          <div className="mt-1 text-sm text-muted-foreground">{children}</div>
        </div>
      </div>
    </aside>
  );
}
