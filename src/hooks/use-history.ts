// src/hooks/use-history.ts
import { useState, useEffect } from "react";
import type { AnalysisResult } from "@/types/analysis";

const HISTORY_KEY = "factguard_history";
const MAX_HISTORY_ITEMS = 50; // Limit to prevent localStorage overflow

export interface HistoryItem {
  id: string;
  timestamp: number;
  snippet: string;
  result: AnalysisResult;
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load history from localStorage:", error);
    }
  }, []);

  const saveAnalysis = (text: string, result: AnalysisResult) => {
    const newItem: HistoryItem = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      snippet: text.slice(0, 150) + (text.length > 150 ? "..." : ""),
      result,
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev].slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return { history, saveAnalysis, clearHistory };
}
