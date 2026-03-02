import Header from "@/components/Header";
import ArticleInput from "@/components/ArticleInput";
import ResultsDashboard from "@/components/ResultsDashboard";
import { useAnalysis } from "@/hooks/use-analysis";
import { useHistory } from "@/hooks/use-history";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { FileText, Loader2, ArrowLeft, History } from "lucide-react"; // Import History icon
import { Button } from "@/components/ui/button";

const Index = () => {
  const { mutate, data, isPending, isError, error, reset } = useAnalysis();
  const { saveAnalysis, history, clearHistory } = useHistory();
  const [step, setStep] = useState<"input" | "analyzing" | "results" | "history">("input");
  const [articleText, setArticleText] = useState("");

  const handleAnalyze = (text: string) => {
    setArticleText(text); // Store text for history
    setStep("analyzing");
    mutate(text);
  };

  useEffect(() => {
    if (data && articleText) {
      setStep("results");
      saveAnalysis(articleText, data);
    }
  }, [data]);

  const viewHistory = () => {
    setStep("history");
  };

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

               <div className="flex justify-center mt-6">
                <Button 
                  onClick={() => setStep("history")} 
                  variant="outline" 
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                   <History className="h-4 w-4" /> View Analysis Archive
                </Button>
              </div>
            </div>
          )}

          {step === "history" && (
             <div className="mx-auto max-w-4xl space-y-6 animate-fade-in py-8">
               <div className="flex items-center justify-between border-b border-border pb-6 mb-8">
                 <div className="flex items-center gap-4">
                    <Button 
                     variant="ghost" 
                     size="sm"
                     className="gap-2 pl-0 hover:bg-transparent hover:text-primary"
                     onClick={() => setStep("input")}
                    >
                     <ArrowLeft className="h-4 w-4" /> Back
                   </Button>
                   <h2 className="text-3xl font-heading font-serif font-bold text-foreground">Archive</h2>
                 </div>
                 <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={clearHistory}>
                    Clear Archive
                 </Button>
               </div>
               
               {history.length === 0 ? (
                 <div className="text-center py-24 text-muted-foreground border-2 border-dashed border-border rounded-xl bg-card/50">
                   <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                   <p className="font-serif italic text-lg">"No records found in the archive."</p>
                 </div>
               ) : (
                 <div className="grid gap-6">
                   {history.map((item) => (
                     <div key={item.id} className="p-6 rounded-none border border-border bg-card shadow-sm hover:border-primary/50 transition-colors texture-paper relative">
                       <div className="absolute -top-3 -left-3 w-6 h-6 border-l border-t border-primary/20"></div>
                       <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r border-b border-primary/20"></div>
                       
                       <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                         <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-3">
                               <span className={`px-3 py-1 text-xs uppercase font-bold tracking-widest border ${
                                 item.result.verdict === 'verified' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' : 
                                 item.result.verdict === 'fake' ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' : 
                                 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
                               }`}>
                                 {item.result.verdict}
                               </span>
                               <span className="text-xs text-muted-foreground/70 font-mono">
                                 CASE #{item.id.slice(0, 8).toUpperCase()}
                               </span>
                            </div>
                            <p className="text-lg font-serif italic line-clamp-2 text-foreground/90 border-l-4 border-muted pl-4 py-1">
                                "{item.snippet}"
                            </p>
                         </div>

                         <div className="flex flex-col items-end text-right min-w-[120px]">
                           <span className="text-sm font-bold text-foreground block mb-1">
                             Confidence: {item.result.confidenceScore}%
                           </span>
                           <span className="text-xs text-muted-foreground block">
                             {new Date(item.timestamp).toLocaleDateString()}
                           </span>
                           <span className="text-xs text-muted-foreground block">
                             {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                           </span>
                         </div>
                       </div>
                       
                       <div className="text-sm text-foreground/70 border-t border-border/50 pt-3 mt-2 font-body">
                         <span className="font-semibold text-foreground/90">Summary: </span>
                         {item.result.summary}
                       </div>
                     </div>
                   ))}
                 </div>
               )}
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
