import type { AnalysisResult } from "@/types/analysis";

export async function analyzeArticle(text: string): Promise<AnalysisResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120_000); // 2 min timeout

  // Use environment variable for API URL in production, fallback to local proxy for dev
  const API_URL = import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/analyze` 
    : "/api/analyze";

  let response: Response;
  try {
    response = await fetch(API_URL, {
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
