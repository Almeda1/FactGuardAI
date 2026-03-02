import "dotenv/config";
import express from "express";
import cors from "cors";
import { analyzeArticle } from "./llm.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ["http://localhost:8080", "http://localhost:5173"] }));
app.use(express.json({ limit: "100kb" }));

app.post("/api/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      res.status(400).json({ error: "Request body must include a 'text' field (string)." });
      return;
    }

    const trimmed = text.trim();
    if (trimmed.length < 50) {
      res.status(400).json({ error: "Article text must be at least 50 characters." });
      return;
    }

    console.log(`[FactGuard] Analyzing article (${trimmed.length} chars)...`);
    const result = await analyzeArticle(trimmed);
    console.log(`[FactGuard] Verdict: ${result.verdict} (${result.confidenceScore}%)`);

    res.json(result);
  } catch (err: any) {
    console.error("[FactGuard] Analysis error:", err.message);

    if (err.message?.includes("OPENROUTER_API_KEY")) {
      res.status(500).json({ error: "Server configuration error: API key not set." });
      return;
    }

    res.status(500).json({ error: "Analysis failed. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`[FactGuard] Server running on http://localhost:${PORT}`);
});
