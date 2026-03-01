import { Search, Loader2 } from "lucide-react";
import { useState } from "react";

interface ArticleInputProps {
  onAnalyze: () => void;
  isLoading: boolean;
}

const ArticleInput = ({ onAnalyze, isLoading }: ArticleInputProps) => {
  const [text, setText] = useState("");

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <label className="mb-2 block font-display text-sm font-medium text-foreground">
        Paste an article or URL to verify
      </label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste the full text of a news article or a URL here..."
        className="mb-4 h-40 w-full resize-none rounded-lg border border-input bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
      />
      <button
        onClick={onAnalyze}
        disabled={isLoading || !text.trim()}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin-slow" />
        ) : (
          <Search className="h-4 w-4" />
        )}
        {isLoading ? "Analyzing..." : "Analyze Article"}
      </button>
    </div>
  );
};

export default ArticleInput;
