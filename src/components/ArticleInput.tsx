import { Search, Loader2 } from "lucide-react";

interface ArticleInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
  value: string;
  onChange: (text: string) => void;
}

const ArticleInput = ({ onAnalyze, isLoading, value, onChange }: ArticleInputProps) => {
  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed.length < 50) return;
    onAnalyze(trimmed);
  };

  const isTooShort = value.trim().length > 0 && value.trim().length < 50;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block font-heading text-sm font-semibold text-foreground">
          Paste text to verify
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the full text of a news article here (minimum 50 characters)..."
          className="min-h-[200px] w-full resize-none border-b-2 border-input bg-transparent px-4 py-3 font-body text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors leading-relaxed"
          style={{ backgroundImage: 'linear-gradient(transparent 95%, var(--border) 95%)', backgroundSize: '100% 2rem', lineHeight: '2rem' }}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
             <span>{value.length} characters</span>
             {isTooShort && <span className="text-destructive font-medium">Minimum 50 characters required</span>}
        </div>
      </div>
     
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSubmit}
          disabled={isLoading || value.trim().length < 50}
          className="inline-flex items-center justify-center gap-2 rounded-none bg-primary px-8 py-3 font-heading text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          {isLoading ? "Investigating..." : "Start Investigation"}
        </button>
      </div>
    </div>
  );
};

export default ArticleInput;
