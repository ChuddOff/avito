import type { EditAdFormValues } from "../model/edit-ad-form.schema";

function toOptionalString(value?: string) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

export function buildAiInputFromFormValues(values: EditAdFormValues) {
  const params = Object.fromEntries(
    Object.entries(values.params).filter(([, value]) => {
      return Boolean(value?.trim());
    }),
  );

  return {
    category: values.category,
    title: values.title.trim(),
    description: toOptionalString(values.description),
    price: Number(values.price),
    params,
  };
}
