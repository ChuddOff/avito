import type { AdCategory, AdParams } from "../api";

type ParamEntry = {
  key: string;
  label: string;
  value: string;
};

type KeysOfUnion<T> = T extends T ? keyof T : never;
type ParamKey = Extract<KeysOfUnion<AdParams>, string>;

const PARAM_LABELS: Record<AdCategory, Partial<Record<ParamKey, string>>> = {
  auto: {
    brand: "Бренд",
    model: "Модель",
    yearOfManufacture: "Год выпуска",
    transmission: "Коробка передач",
    mileage: "Пробег",
    enginePower: "Мощность двигателя",
  },
  real_estate: {
    type: "Тип",
    address: "Адрес",
    area: "Площадь",
    floor: "Этаж",
  },
  electronics: {
    type: "Тип",
    brand: "Бренд",
    model: "Модель",
    condition: "Состояние",
    color: "Цвет",
  },
};

const VALUE_LABELS: Record<string, string> = {
  automatic: "Автомат",
  manual: "Механика",
  flat: "Квартира",
  house: "Дом",
  room: "Комната",
  phone: "Телефон",
  laptop: "Ноутбук",
  misc: "Другое",
  new: "Новый",
  used: "Б/у",
};

function formatParamValue(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (typeof value === "string") {
    return VALUE_LABELS[value] ?? value;
  }

  return String(value);
}

export function getAdParamEntries(category: AdCategory, params: AdParams) {
  const labels = PARAM_LABELS[category] ?? {};
  const paramsMap = params as Record<string, unknown>;

  return (Object.entries(labels) as [ParamKey, string][])
    .filter(([key]) => {
      const value = paramsMap[key];
      return value !== undefined && value !== null && value !== "";
    })
    .map<ParamEntry>(([key, label]) => ({
      key,
      label,
      value: formatParamValue(paramsMap[key]),
    }));
}
