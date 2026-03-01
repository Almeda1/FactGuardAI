import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface VerdictBadgeProps {
  verdict: "fake" | "verified";
}

const VerdictBadge = ({ verdict }: VerdictBadgeProps) => {
  const isFake = verdict === "fake";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold ${
        isFake ? "verdict-fake" : "verdict-verified"
      }`}
    >
      {isFake ? (
        <AlertTriangle className="h-4 w-4" />
      ) : (
        <CheckCircle2 className="h-4 w-4" />
      )}
      {isFake ? "Likely Fake" : "Verified"}
    </div>
  );
};

export default VerdictBadge;
