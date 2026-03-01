import { useState } from "react";
import Header from "@/components/Header";
import ArticleInput from "@/components/ArticleInput";
import ResultsDashboard from "@/components/ResultsDashboard";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    setShowResults(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Detect Misinformation
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Paste any news article and let AI assess its credibility in seconds.
          </p>
        </div>

        <div className="space-y-8">
          <ArticleInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          {showResults && <ResultsDashboard />}
        </div>
      </main>
    </div>
  );
};

export default Index;
