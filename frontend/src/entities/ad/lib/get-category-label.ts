import type { AdCategory } from "../api";

const CATEGORY_LABELS: Record<AdCategory, string> = {
  auto: "Авто",
  real_estate: "Недвижимость",
  electronics: "Электроника",
};

export function getCategoryLabel(category: AdCategory) {
  return CATEGORY_LABELS[category];
}
