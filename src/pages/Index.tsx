import Header from "@/components/Header";
import ArticleInput from "@/components/ArticleInput";
import ResultsDashboard from "@/components/ResultsDashboard";
import { useAnalysis } from "@/hooks/use-analysis";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { FileText, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { mutate, data, isPending, isError, error, reset } = useAnalysis();
  const [step, setStep] = useState<"input" | "analyzing" | "results">("input");
  const [articleText, setArticleText] = useState("");

  const handleAnalyze = (text: string) => {
    setStep("analyzing");
    mutate(text);
  };

  useEffect(() => {
    if (data) {
      setStep("results");
    }
  }, [data]);

  useEffect(() => {
    if (isError && error) {
      setStep("input");
      toast.error("Investigation Halted", {
        description: error.message || "We encountered an issue analyzing this document.",
      });
    }
  }, [isError, error]);

  const handleStartOver = () => {
    reset();
    setStep("input");
    setArticleText("");
  };

  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-accent/30 selection:text-foreground">
      <Header />
      
      <main className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        
        {/* Wizard Progress - Only show if not on simple input or if needed */}
        <div className="mb-12 flex justify-center">
          <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
            <span className={step === "input" ? "text-primary font-bold" : ""}>1. Draft</span>
            <span className="h-px w-8 bg-border"></span>
            <span className={step === "analyzing" ? "text-primary font-bold" : ""}>2. Review</span>
            <span className="h-px w-8 bg-border"></span>
            <span className={step === "results" ? "text-primary font-bold" : ""}>3. Report</span>
          </div>
        </div>

        <div className="relative min-h-[500px] w-full">
          {step === "input" && (
            <div className="animate-fade-in space-y-8">
              <div className="text-center">
                <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  The FactGuard Daily
                </h1>
                <p className="mt-4 text-lg text-muted-foreground italic font-serif">
                  "Exposing misinformation, one article at a time."
                </p>
                <div className="mt-2 text-sm uppercase tracking-widest text-muted-foreground/60">
                  Vol. I — Issue No. 1
                </div>
              </div>

              <div className="mx-auto max-w-2xl bg-card p-8 shadow-sm border border-border texture-paper">
                <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                  <h2 className="font-heading text-xl font-bold">New Investigation</h2>
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <ArticleInput 
                  onAnalyze={handleAnalyze} 
                  isLoading={isPending} 
                  value={articleText}
                  onChange={setArticleText}
                />
              </div>
            </div>
          )}

          {step === "analyzing" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="relative mb-8">
                <div className="absolute inset-0 animate-ping rounded-full bg-accent/20"></div>
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-card border-2 border-primary shadow-lg">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
              </div>
              <h2 className="font-heading text-2xl font-bold mb-2">Investigating Sources...</h2>
              <p className="text-muted-foreground max-w-md">
                Our AI journalists are cross-referencing claims, analyzing tone, and verifying facts.
              </p>
            </div>
          )}

          {step === "results" && data && (
            <div className="animate-fade-in-up space-y-8">
               <div className="flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    onClick={handleStartOver}
                    className="gap-2 hover:bg-transparent hover:text-primary pl-0"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Desk
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Analyzed on {new Date().toLocaleDateString()}
                  </div>
               </div>

               <div className="bg-card border border-border texture-paper p-8 md:p-12 shadow-sm">
                  <ResultsDashboard result={data} />
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
