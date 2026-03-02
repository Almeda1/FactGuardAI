import { describe, it, expect, vi, beforeEach } from "vitest";
import { analyzeArticle } from "@/lib/api";

describe("analyzeArticle API", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("sends a POST request with the article text", async () => {
    const mockResult = {
      verdict: "fake",
      confidenceScore: 80,
      summary: "Test summary",
      flags: [{ text: "Test flag", severity: "high" }],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResult),
    });

    const result = await analyzeArticle("Test article text that is long enough for analysis");

    expect(global.fetch).toHaveBeenCalledWith("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "Test article text that is long enough for analysis" }),
    });
    expect(result).toEqual(mockResult);
  });

  it("throws an error when the response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ error: "Text too short" }),
    });

    await expect(analyzeArticle("short")).rejects.toThrow("Text too short");
  });

  it("throws a generic error when response has no error message", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.reject(new Error("Parse error")),
    });

    await expect(analyzeArticle("test")).rejects.toThrow("Analysis failed (500)");
  });
});
