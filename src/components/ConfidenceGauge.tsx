interface ConfidenceGaugeProps {
  score: number;
}

const ConfidenceGauge = ({ score }: ConfidenceGaugeProps) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-32 w-32">
        <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="animate-progress-fill transition-all duration-1000"
            style={{ "--progress-offset": offset } as React.CSSProperties}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-bold text-foreground">{score}%</span>
        </div>
      </div>
      <span className="text-sm font-medium text-muted-foreground">Confidence Score</span>
    </div>
  );
};

export default ConfidenceGauge;
