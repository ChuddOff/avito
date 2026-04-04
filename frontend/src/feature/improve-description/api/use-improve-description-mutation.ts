import { useMutation } from "@tanstack/react-query";

import { puterChat } from "@/shared/api/puter/client";
import { improveDescriptionResultSchema } from "../model/improve-description.schema";
import { buildImproveDescriptionMessages } from "../lib/build-improve-description-messages";

type ImproveDescriptionInput = {
  category: "auto" | "real_estate" | "electronics";
  title: string;
  description?: string;
  price: number;
  params: Record<string, unknown>;
};

export function useImproveDescriptionMutation() {
  return useMutation({
    mutationFn: async (input: ImproveDescriptionInput) => {
      const rawText = await puterChat(buildImproveDescriptionMessages(input));

      let parsed: unknown;

      try {
        parsed = JSON.parse(rawText);
      } catch {
        throw new Error("Модель вернула невалидный JSON для описания");
      }

      return improveDescriptionResultSchema.parse(parsed);
    },
  });
}
