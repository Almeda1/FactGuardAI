import { AlertCircle } from "lucide-react";

const flags = [
  "High use of emotionally manipulative language designed to provoke outrage",
  "Unverified primary sources — no credible outlets corroborate the claims",
  "Headline uses sensationalist framing inconsistent with factual reporting",
  "Statistical claims lack citations or reference verifiable datasets",
  "Author attribution is missing or linked to known misinformation networks",
];

const AnalysisBreakdown = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
        Analysis Breakdown
      </h3>
      <ul className="space-y-3">
        {flags.map((flag, i) => (
          <li
            key={i}
            className="flex items-start gap-3 opacity-0 animate-fade-in"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <span className="text-sm leading-relaxed text-muted-foreground">{flag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalysisBreakdown;
