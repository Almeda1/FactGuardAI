import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express, { Request, Response } from "express";
import cors from "cors";
import { analyzeArticle } from "./llm";

// Initialize Firebase Admin (for Firestore)
admin.initializeApp();
const db = admin.firestore();

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(express.json());

app.post("/analyze", async (req: Request, res: Response) => {
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

    // --- Save to Firestore ---
    try {
      await db.collection("analyses").add({
        snippet: trimmed.slice(0, 200),
        textHash: simpleHash(trimmed), // simple hash for manual deduplication checking if needed
        result: result,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (dbError) {
      console.error("[FactGuard] Failed to save analysis to Firestore:", dbError);
      // We don't fail the request if saving fails, just log it.
    }
    // -------------------------

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

// Helper for simple hashing (optional)
function simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(16);
}

// Expose Express API as a single Cloud Function:
// We use runWith to request access to the secret
export const api = functions
    .runWith({ 
      secrets: ["OPENROUTER_API_KEY"],
      timeoutSeconds: 120, // Increase timeout for LLM
      memory: "512MB"
    })
    .https.onRequest(app);
