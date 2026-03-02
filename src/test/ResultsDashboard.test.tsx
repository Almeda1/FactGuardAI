import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ResultsDashboard from "@/components/ResultsDashboard";
import type { AnalysisResult } from "@/types/analysis";

const mockResult: AnalysisResult = {
  verdict: "fake",
  confidenceScore: 85,
  summary: "This article contains multiple indicators of misinformation.",
  flags: [
    { text: "Sensationalist headline", severity: "high" },
    { text: "Missing author attribution", severity: "medium" },
    { text: "Some facts are verifiable", severity: "low" },
  ],
};

describe("ResultsDashboard", () => {
  it("renders the verdict badge", () => {
    render(<ResultsDashboard result={mockResult} />);
    expect(screen.getByText("Likely Fake")).toBeInTheDocument();
  });

  it("renders the confidence score", () => {
    render(<ResultsDashboard result={mockResult} />);
    expect(screen.getByText("85%")).toBeInTheDocument();
  });

  it("renders the summary", () => {
    render(<ResultsDashboard result={mockResult} />);
    expect(screen.getByText(mockResult.summary)).toBeInTheDocument();
  });

  it("renders all flags", () => {
    render(<ResultsDashboard result={mockResult} />);
    expect(screen.getByText("Sensationalist headline")).toBeInTheDocument();
    expect(screen.getByText("Missing author attribution")).toBeInTheDocument();
    expect(screen.getByText("Some facts are verifiable")).toBeInTheDocument();
  });

  it("renders verified verdict correctly", () => {
    const verifiedResult: AnalysisResult = {
      ...mockResult,
      verdict: "verified",
      confidenceScore: 92,
      summary: "This article appears credible.",
    };
    render(<ResultsDashboard result={verifiedResult} />);
    expect(screen.getByText("Verified")).toBeInTheDocument();
    expect(screen.getByText("92%")).toBeInTheDocument();
  });
});
