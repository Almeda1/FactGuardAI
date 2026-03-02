import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AnalysisBreakdown from "@/components/AnalysisBreakdown";
import type { AnalysisFlag } from "@/types/analysis";

const mockFlags: AnalysisFlag[] = [
  { text: "Emotionally manipulative language", severity: "high" },
  { text: "Unverified sources", severity: "medium" },
  { text: "Proper date citations", severity: "low" },
];

describe("AnalysisBreakdown", () => {
  it("renders all flags", () => {
    render(<AnalysisBreakdown flags={mockFlags} />);
    expect(screen.getByText("Emotionally manipulative language")).toBeInTheDocument();
    expect(screen.getByText("Unverified sources")).toBeInTheDocument();
    expect(screen.getByText("Proper date citations")).toBeInTheDocument();
  });

  it("renders severity badges", () => {
    render(<AnalysisBreakdown flags={mockFlags} />);
    expect(screen.getByText("high")).toBeInTheDocument();
    expect(screen.getByText("medium")).toBeInTheDocument();
    expect(screen.getByText("low")).toBeInTheDocument();
  });

  it("renders the heading", () => {
    render(<AnalysisBreakdown flags={mockFlags} />);
    expect(screen.getByText("Analysis Breakdown")).toBeInTheDocument();
  });

  it("renders empty list when no flags provided", () => {
    render(<AnalysisBreakdown flags={[]} />);
    expect(screen.getByText("Analysis Breakdown")).toBeInTheDocument();
  });
});
