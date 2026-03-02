import OpenAI from "openai";
import { z } from "zod";
import { SYSTEM_PROMPT } from "./prompt.js";

const FlagSchema = z.object({
  text: z.string(),
  severity: z.enum(["high", "medium", "low"]),
});

const AnalysisResultSchema = z.object({
  verdict: z.enum(["fake", "verified", "uncertain"]),
  confidenceScore: z.number().min(0).max(100),
  summary: z.string(),
  flags: z.array(FlagSchema).min(1),
});

export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!client) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY is not set in environment variables");
    }
    client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey,
    });
  }
  return client;
}

// Free models to try in order — falls back if one is rate-limited
const FREE_MODELS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "deepseek/deepseek-r1-0528:free",
  "google/gemma-3-27b-it:free",
  "mistralai/mistral-small-3.1-24b-instruct:free",
  "openai/gpt-oss-120b:free",
  "nvidia/nemotron-nano-9b-v2:free",
  "qwen/qwen3-235b-a22b:free",
  "microsoft/phi-4-reasoning-plus:free",
];

const MAX_RETRIES = 2;
const BASE_DELAY_MS = 2000;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function analyzeArticle(text: string): Promise<AnalysisResult> {
  const openai = getClient();

  for (let modelIdx = 0; modelIdx < FREE_MODELS.length; modelIdx++) {
    const model = FREE_MODELS[modelIdx];

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`[FactGuard] Trying ${model} (attempt ${attempt}/${MAX_RETRIES})...`);

        const chatCompletion = await openai.chat.completions.create({
          model,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `Article to analyze:\n\n${text}` },
          ],
          temperature: 0.3,
          response_format: { type: "json_object" },
        });

        if (!chatCompletion.choices || chatCompletion.choices.length === 0) {
          console.error(`[FactGuard] Unexpected response from ${model}:`, JSON.stringify(chatCompletion).slice(0, 500));
          throw new Error(`No choices in response from ${model}`);
        }

        const responseText = chatCompletion.choices[0]?.message?.content;
        if (!responseText) {
          throw new Error("Empty response from OpenRouter");
        }

        let parsed: unknown;
        try {
          parsed = JSON.parse(responseText);
        } catch {
          throw new Error(`Failed to parse response as JSON: ${responseText.slice(0, 200)}`);
        }

        const validated = AnalysisResultSchema.safeParse(parsed);
        if (!validated.success) {
          throw new Error(`Invalid response structure: ${validated.error.message}`);
        }

        return validated.data;
      } catch (err: any) {
        const isRetryable = err.message?.includes("429") || err.status === 429
          || err.message?.includes("402") || err.status === 402
          || err.message?.includes("404") || err.status === 404
          || err.message?.includes("No choices")
          || err.message?.includes("Empty response");

        if (isRetryable && attempt < MAX_RETRIES) {
          const delay = BASE_DELAY_MS * attempt;
          console.log(`[FactGuard] Error on ${model} (${err.message?.slice(0, 60)}), retrying in ${delay / 1000}s...`);
          await sleep(delay);
          continue;
        }

        if (isRetryable && modelIdx < FREE_MODELS.length - 1) {
          console.log(`[FactGuard] ${model} failed, trying next model...`);
          break; // break retry loop, move to next model
        }

        throw err; // non-retryable error or all models exhausted
      }
    }
  }

  throw new Error("All free models are rate-limited. Please try again in a minute.");
}
