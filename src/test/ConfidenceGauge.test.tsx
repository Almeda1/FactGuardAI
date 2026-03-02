import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ConfidenceGauge from "@/components/ConfidenceGauge";

describe("ConfidenceGauge", () => {
  it("renders the score percentage", () => {
    render(<ConfidenceGauge score={75} />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("renders 'Confidence Score' label", () => {
    render(<ConfidenceGauge score={50} />);
    expect(screen.getByText("Confidence Score")).toBeInTheDocument();
  });

  it("renders with score of 0", () => {
    render(<ConfidenceGauge score={0} />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("renders with score of 100", () => {
    render(<ConfidenceGauge score={100} />);
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("uses success color for verified verdict", () => {
    const { container } = render(<ConfidenceGauge score={88} verdict="verified" />);
    const progressCircle = container.querySelectorAll("circle")[1];
    expect(progressCircle.getAttribute("stroke")).toBe("hsl(var(--success))");
  });

  it("uses destructive color for fake verdict", () => {
    const { container } = render(<ConfidenceGauge score={88} verdict="fake" />);
    const progressCircle = container.querySelectorAll("circle")[1];
    expect(progressCircle.getAttribute("stroke")).toBe("hsl(var(--destructive))");
  });
});
