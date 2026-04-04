import { z } from "zod";

export const suggestPriceResultSchema = z.object({
  suggestedPrice: z.number().positive(),
  rationale: z.string().min(1),
  confidence: z.enum(["low", "medium", "high"]).optional(),
});

export type SuggestPriceResult = z.infer<typeof suggestPriceResultSchema>;
