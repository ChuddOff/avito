import type { AdCategory, AdParams } from "../api";

type KeysOfUnion<T> = T extends T ? keyof T : never;
type MissingFieldKey = "description" | Extract<KeysOfUnion<AdParams>, string>;
type MissingLabels = Partial<Record<MissingFieldKey, string>>;

const MISSING_FIELD_LABELS: Record<AdCategory, MissingLabels> = {
  auto: {
    description: "Описание",
    brand: "Бренд",
    model: "Модель",
    yearOfManufacture: "Год выпуска",
    transmission: "Коробка передач",
    mileage: "Пробег",
    enginePower: "Мощность двигателя",
  },
  real_estate: {
    description: "Описание",
    type: "Тип",
    address: "Адрес",
    area: "Площадь",
    floor: "Этаж",
  },
  electronics: {
    description: "Описание",
    type: "Тип",
    brand: "Бренд",
    model: "Модель",
    condition: "Состояние",
    color: "Цвет",
  },
};

function isEmptyValue(value: unknown) {
  return value === null || value === undefined || value === "";
}

export function getMissingFields(input: {
  category: AdCategory;
  description?: string;
  params: AdParams;
}) {
  const labels: MissingLabels = MISSING_FIELD_LABELS[input.category];
  const result: string[] = [];

  for (const key of Object.keys(labels) as MissingFieldKey[]) {
    const label = labels[key];
    if (!label) continue;

    if (key === "description") {
      if (isEmptyValue(input.description)) {
        result.push(label);
      }
      continue;
    }

    const value = (input.params as Record<string, unknown>)[key];
    if (isEmptyValue(value)) {
      result.push(label);
    }
  }

  return result;
}
