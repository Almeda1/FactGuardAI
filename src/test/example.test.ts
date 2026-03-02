import { describe, it, expect } from "vitest";
import type { AnalysisResult, AnalysisFlag } from "@/types/analysis";

describe("AnalysisResult type", () => {
  it("should accept valid analysis result objects", () => {
    const result: AnalysisResult = {
      verdict: "fake",
      confidenceScore: 85,
      summary: "Test summary",
      flags: [{ text: "Test flag", severity: "high" }],
    };
    expect(result.verdict).toBe("fake");
    expect(result.confidenceScore).toBe(85);
    expect(result.flags).toHaveLength(1);
  });

  it("should accept all verdict types", () => {
    const verdicts: AnalysisResult["verdict"][] = ["fake", "verified", "uncertain"];
    verdicts.forEach((v) => expect(["fake", "verified", "uncertain"]).toContain(v));
  });

  it("should accept all severity levels", () => {
    const severities: AnalysisFlag["severity"][] = ["high", "medium", "low"];
    severities.forEach((s) => expect(["high", "medium", "low"]).toContain(s));
  });
});
