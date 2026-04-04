import type { AdCategory, AdParams } from "@/entities/ad";
import type { EditAdFormValues } from "../model/edit-ad-form.schema";

export type UpdateAdPayload = {
  category: AdCategory;
  title: string;
  description: string;
  price: number;
  params: AdParams;
};

function toOptionalString(value?: string) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function toOptionalNumber(value?: string) {
  if (!value?.trim()) return undefined;

  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function buildParamsByCategory(
  values: EditAdFormValues,
): UpdateAdPayload["params"] {
  const params = values.params;

  switch (values.category) {
    case "auto":
      return {
        brand: toOptionalString(params.brand),
        model: toOptionalString(params.model),
        yearOfManufacture: toOptionalNumber(params.yearOfManufacture),
        transmission: toOptionalString(params.transmission) as
          | "automatic"
          | "manual"
          | undefined,
        mileage: toOptionalNumber(params.mileage),
        enginePower: toOptionalNumber(params.enginePower),
      };

    case "real_estate":
      return {
        type: toOptionalString(params.type) as
          | "flat"
          | "house"
          | "room"
          | undefined,
        address: toOptionalString(params.address),
        area: toOptionalNumber(params.area),
        floor: toOptionalNumber(params.floor),
      };

    case "electronics":
      return {
        type: toOptionalString(params.type) as
          | "phone"
          | "laptop"
          | "misc"
          | undefined,
        brand: toOptionalString(params.brand),
        model: toOptionalString(params.model),
        condition: toOptionalString(params.condition) as
          | "new"
          | "used"
          | undefined,
        color: toOptionalString(params.color),
      };
  }
}

export function buildUpdateAdPayload(
  values: EditAdFormValues,
): UpdateAdPayload {
  return {
    category: values.category,
    title: values.title.trim(),
    description: values.description?.trim() ?? "",
    price: Number(values.price),
    params: buildParamsByCategory(values),
  };
}
