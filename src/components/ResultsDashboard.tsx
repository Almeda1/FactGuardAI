import VerdictBadge from "./VerdictBadge";
import ConfidenceGauge from "./ConfidenceGauge";
import AnalysisBreakdown from "./AnalysisBreakdown";

const ResultsDashboard = () => {
  return (
    <div className="space-y-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Verdict Card */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-8 shadow-sm">
          <span className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Verdict
          </span>
          <VerdictBadge verdict="fake" />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            This article exhibits multiple indicators of misinformation.
          </p>
        </div>

        {/* Confidence Card */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-8 shadow-sm">
          <span className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            AI Confidence
          </span>
          <ConfidenceGauge score={88} />
        </div>
      </div>

      <AnalysisBreakdown />
    </div>
  );
};

export default ResultsDashboard;
