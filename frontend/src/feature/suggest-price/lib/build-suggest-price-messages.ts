import type { PuterChatMessage } from "@/shared/api/puter/client";

type SuggestPriceInput = {
  category: "auto" | "real_estate" | "electronics";
  title: string;
  description?: string;
  price: number;
  params: Record<string, unknown>;
};

export function buildSuggestPriceMessages(
  input: SuggestPriceInput,
): PuterChatMessage[] {
  return [
    {
      role: "system",
      content:
        'Ты помогаешь оценить рекомендуемую цену объявления по данным карточки. Это не live-market price, а ориентир по входным данным. Используй только предоставленные данные, ничего не выдумывай. Верни строго JSON без markdown и без пояснений. Формат ответа: {"suggestedPrice": number, "rationale":"string", "confidence":"low|medium|high"}',
    },
    {
      role: "user",
      content: JSON.stringify(
        {
          task: "suggest_price",
          ad: input,
        },
        null,
        2,
      ),
    },
  ];
}
