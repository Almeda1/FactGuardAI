import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import VerdictBadge from "@/components/VerdictBadge";

describe("VerdictBadge", () => {
  it("renders 'Likely Fake' for fake verdict", () => {
    render(<VerdictBadge verdict="fake" />);
    expect(screen.getByText("Likely Fake")).toBeInTheDocument();
  });

  it("renders 'Verified' for verified verdict", () => {
    render(<VerdictBadge verdict="verified" />);
    expect(screen.getByText("Verified")).toBeInTheDocument();
  });

  it("renders 'Uncertain' for uncertain verdict", () => {
    render(<VerdictBadge verdict="uncertain" />);
    expect(screen.getByText("Uncertain")).toBeInTheDocument();
  });

  it("applies correct CSS class for fake verdict", () => {
    const { container } = render(<VerdictBadge verdict="fake" />);
    expect(container.firstChild).toHaveClass("verdict-fake");
  });

  it("applies correct CSS class for verified verdict", () => {
    const { container } = render(<VerdictBadge verdict="verified" />);
    expect(container.firstChild).toHaveClass("verdict-verified");
  });

  it("applies correct CSS class for uncertain verdict", () => {
    const { container } = render(<VerdictBadge verdict="uncertain" />);
    expect(container.firstChild).toHaveClass("verdict-uncertain");
  });
});
