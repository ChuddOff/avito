import { z } from "zod";

export const improveDescriptionResultSchema = z.object({
  suggestion: z.string().min(1, "Пустое предложение"),
  rationale: z.string().optional(),
});

export type ImproveDescriptionResult = z.infer<
  typeof improveDescriptionResultSchema
>;
