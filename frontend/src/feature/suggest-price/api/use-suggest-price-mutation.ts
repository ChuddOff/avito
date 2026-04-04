import { useMutation } from "@tanstack/react-query";

import { puterChat } from "@/shared/api/puter/client";
import { suggestPriceResultSchema } from "../model/suggest-price.schema";
import { buildSuggestPriceMessages } from "../lib/build-suggest-price-messages";

type SuggestPriceInput = {
  category: "auto" | "real_estate" | "electronics";
  title: string;
  description?: string;
  price: number;
  params: Record<string, unknown>;
};

export function useSuggestPriceMutation() {
  return useMutation({
    mutationFn: async (input: SuggestPriceInput) => {
      const rawText = await puterChat(buildSuggestPriceMessages(input));

      let parsed: unknown;

      try {
        parsed = JSON.parse(rawText);
      } catch {
        throw new Error("Модель вернула невалидный JSON для цены");
      }

      return suggestPriceResultSchema.parse(parsed);
    },
  });
}
