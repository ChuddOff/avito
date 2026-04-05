import type { PuterChatMessage } from "@/shared/api/puter/client";

type ImproveDescriptionInput = {
  category: "auto" | "real_estate" | "electronics";
  title: string;
  description?: string;
  price: number;
  params: Record<string, unknown>;
};

export function buildImproveDescriptionMessages(
  input: ImproveDescriptionInput,
): PuterChatMessage[] {
  return [
    {
      role: "system",
      content:
        'Ты помогаешь улучшать описание объявления. Используй только факты из входных данных. Ничего не выдумывай. Не добавляй характеристик, которых нет. Верни строго JSON без markdown и без пояснений. Формат ответа: {"suggestion":"string","rationale":"string"}. Пример rationale: Средняя цена на MacBook Pro 16" M1 Pro (16/512GB):115 000 – 135 000 ₽ — отличное состояние.От 140 000 ₽ — идеал, малый износ АКБ.90 000 – 110 000 ₽ — срочно или с дефектами.',
    },
    {
      role: "user",
      content: JSON.stringify(
        {
          task: "improve_description",
          ad: input,
        },
        null,
        2,
      ),
    },
  ];
}
