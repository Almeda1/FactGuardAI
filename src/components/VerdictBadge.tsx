import { AlertTriangle, CheckCircle2, HelpCircle } from "lucide-react";

interface VerdictBadgeProps {
  verdict: "fake" | "verified" | "uncertain";
}

const verdictConfig = {
  fake: {
    className: "verdict-fake",
    icon: AlertTriangle,
    label: "Likely Fake",
  },
  verified: {
    className: "verdict-verified",
    icon: CheckCircle2,
    label: "Verified",
  },
  uncertain: {
    className: "verdict-uncertain",
    icon: HelpCircle,
    label: "Uncertain",
  },
};

const VerdictBadge = ({ verdict }: VerdictBadgeProps) => {
  const config = verdictConfig[verdict]; // No fallback needed as types are strict, but could add if needed
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-2 border-2 px-4 py-2 font-heading font-bold uppercase tracking-wider ${config.className}`}
    >
      <Icon className="h-5 w-5" />
      {config.label}
    </div>
  );
};

export default VerdictBadge;
