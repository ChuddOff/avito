import type { AdCategory } from "../api";

export type AdEditFieldOption = {
  value: string;
  label: string;
};

export type AdEditFieldConfig = {
  name: string;
  label: string;
  type: "text" | "number" | "select";
  placeholder?: string;
  options?: AdEditFieldOption[];
};

export const adEditFieldConfigByCategory: Record<
  AdCategory,
  AdEditFieldConfig[]
> = {
  auto: [
    {
      name: "brand",
      label: "Бренд",
      type: "text",
      placeholder: "Например, BMW",
    },
    {
      name: "model",
      label: "Модель",
      type: "text",
      placeholder: "Например, X1",
    },
    {
      name: "yearOfManufacture",
      label: "Год выпуска",
      type: "number",
      placeholder: "Например, 2016",
    },
    {
      name: "transmission",
      label: "Коробка передач",
      type: "select",
      placeholder: "Выберите коробку передач",
      options: [
        { value: "automatic", label: "Автомат" },
        { value: "manual", label: "Механика" },
      ],
    },
    {
      name: "mileage",
      label: "Пробег",
      type: "number",
      placeholder: "Например, 120000",
    },
    {
      name: "enginePower",
      label: "Мощность двигателя",
      type: "number",
      placeholder: "Например, 190",
    },
  ],
  real_estate: [
    {
      name: "type",
      label: "Тип",
      type: "select",
      placeholder: "Выберите тип недвижимости",
      options: [
        { value: "flat", label: "Квартира" },
        { value: "house", label: "Дом" },
        { value: "room", label: "Комната" },
      ],
    },
    {
      name: "address",
      label: "Адрес",
      type: "text",
      placeholder: "Введите адрес",
    },
    {
      name: "area",
      label: "Площадь",
      type: "number",
      placeholder: "Например, 45",
    },
    {
      name: "floor",
      label: "Этаж",
      type: "number",
      placeholder: "Например, 6",
    },
  ],
  electronics: [
    {
      name: "type",
      label: "Тип",
      type: "select",
      placeholder: "Выберите тип",
      options: [
        { value: "phone", label: "Телефон" },
        { value: "laptop", label: "Ноутбук" },
        { value: "misc", label: "Другое" },
      ],
    },
    {
      name: "brand",
      label: "Бренд",
      type: "text",
      placeholder: "Например, Apple",
    },
    {
      name: "model",
      label: "Модель",
      type: "text",
      placeholder: "Например, M1 Pro",
    },
    {
      name: "color",
      label: "Цвет",
      type: "text",
      placeholder: "Например, Silver",
    },
    {
      name: "condition",
      label: "Состояние",
      type: "select",
      placeholder: "Выберите состояние",
      options: [
        { value: "new", label: "Новый" },
        { value: "used", label: "Б/у" },
      ],
    },
  ],
};

export const adCategoryOptions: Array<{
  value: AdCategory;
  label: string;
}> = [
  { value: "electronics", label: "Электроника" },
  { value: "auto", label: "Транспорт" },
  { value: "real_estate", label: "Недвижимость" },
];
