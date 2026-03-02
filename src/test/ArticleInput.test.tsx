import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ArticleInput from "@/components/ArticleInput";
import { useState } from "react";

// Wrapper component to handle controlled input state
const TestWrapper = ({ onAnalyze = vi.fn(), isLoading = false }) => {
  const [value, setValue] = useState("");
  return (
    <ArticleInput
      onAnalyze={onAnalyze}
      isLoading={isLoading}
      value={value}
      onChange={setValue}
    />
  );
};

describe("ArticleInput", () => {
  it("renders the textarea and button", () => {
    render(<TestWrapper />);
    expect(screen.getByPlaceholderText(/paste the full text/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /start investigation/i })).toBeInTheDocument();
  });

  it("disables button when text is empty", () => {
    render(<TestWrapper />);
    expect(screen.getByRole("button", { name: /start investigation/i })).toBeDisabled();
  });

  it("disables button when text is too short", () => {
    render(<TestWrapper />);
    const input = screen.getByPlaceholderText(/paste the full text/i);
    fireEvent.change(input, { target: { value: "Short text" } });
    expect(screen.getByRole("button", { name: /start investigation/i })).toBeDisabled();
  });

  it("enables button when text is long enough", () => {
    render(<TestWrapper />);
    const input = screen.getByPlaceholderText(/paste the full text/i);
    fireEvent.change(input, { target: { value: "A".repeat(50) } });
    expect(screen.getByRole("button", { name: /start investigation/i })).toBeEnabled();
  });

  it("calls onAnalyze with trimmed text when button is clicked", () => {
    const onAnalyze = vi.fn();
    render(<TestWrapper onAnalyze={onAnalyze} />);
    const input = screen.getByPlaceholderText(/paste the full text/i);
    fireEvent.change(input, { target: { value: "  " + "A".repeat(50) + "  " } });
    
    fireEvent.click(screen.getByRole("button", { name: /start investigation/i }));
    expect(onAnalyze).toHaveBeenCalledWith("A".repeat(50));
  });

  it("shows loading state when isLoading is true", () => {
    render(<TestWrapper isLoading={true} />);
    expect(screen.getByRole("button", { name: /investigating/i })).toBeDisabled();
  });

  it("shows character warning when text is too short", () => {
    render(<TestWrapper />);
    const input = screen.getByPlaceholderText(/paste the full text/i);
    fireEvent.change(input, { target: { value: "Short text" } });
    expect(screen.getByText(/minimum 50 characters/i)).toBeInTheDocument();
  });
});
