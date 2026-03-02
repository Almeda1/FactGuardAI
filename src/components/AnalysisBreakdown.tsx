import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import type { AnalysisFlag } from "@/types/analysis";

interface AnalysisBreakdownProps {
  flags: AnalysisFlag[];
}

const severityConfig = {
  high: { icon: AlertCircle, colorClass: "text-destructive" },
  medium: { icon: AlertTriangle, colorClass: "text-warning" },
  low: { icon: Info, colorClass: "text-accent" },
};

const AnalysisBreakdown = ({ flags }: AnalysisBreakdownProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
        Analysis Breakdown
      </h3>
      <ul className="space-y-3">
        {flags.map((flag, i) => {
          const config = severityConfig[flag.severity];
          const Icon = config.icon;
          return (
            <li
              key={i}
              className="flex items-start gap-3 opacity-0 animate-fade-in"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${config.colorClass}`} />
              <div className="flex-1">
                <span className="text-sm leading-relaxed text-muted-foreground">{flag.text}</span>
                <span className={`ml-2 inline-block rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${config.colorClass} bg-current/10`}>
                  {flag.severity}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AnalysisBreakdown;
