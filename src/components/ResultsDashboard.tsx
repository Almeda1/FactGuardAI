import VerdictBadge from "./VerdictBadge";
import ConfidenceGauge from "./ConfidenceGauge";
import AnalysisBreakdown from "./AnalysisBreakdown";
import type { AnalysisResult } from "@/types/analysis";

interface ResultsDashboardProps {
  result: AnalysisResult;
}

const ResultsDashboard = ({ result }: ResultsDashboardProps) => {
  return (
    <div className="space-y-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Verdict Card */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-8 shadow-sm">
          <span className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Verdict
          </span>
          <VerdictBadge verdict={result.verdict} />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {result.summary}
          </p>
        </div>

        {/* Confidence Card */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-8 shadow-sm">
          <span className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            AI Confidence
          </span>
          <ConfidenceGauge score={result.confidenceScore} verdict={result.verdict} />
        </div>
      </div>

      <AnalysisBreakdown flags={result.flags} />
    </div>
  );
};

export default ResultsDashboard;
