export interface AnalysisRequest {
  text: string;
}

export interface AnalysisFlag {
  text: string;
  severity: "high" | "medium" | "low";
}

export interface AnalysisResult {
  verdict: "fake" | "verified" | "uncertain";
  confidenceScore: number;
  flags: AnalysisFlag[];
  summary: string;
}
