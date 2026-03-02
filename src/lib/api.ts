import type { AnalysisResult } from "@/types/analysis";

export async function analyzeArticle(text: string): Promise<AnalysisResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120_000); // 2 min timeout

  let response: Response;
  try {
    response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      throw new Error("The analysis is taking too long. Please try again.");
    }
    throw new Error("Network error — is the backend server running?");
  }
  clearTimeout(timeoutId);

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || `Analysis failed (${response.status})`);
  }

  return response.json();
}
