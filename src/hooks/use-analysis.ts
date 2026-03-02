import { useMutation } from "@tanstack/react-query";
import { analyzeArticle } from "@/lib/api";
import type { AnalysisResult } from "@/types/analysis";

export function useAnalysis() {
  return useMutation<AnalysisResult, Error, string>({
    mutationFn: (text: string) => analyzeArticle(text),
  });
}
