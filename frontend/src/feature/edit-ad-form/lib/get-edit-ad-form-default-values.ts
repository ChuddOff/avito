import type { AdEntity } from "@/entities/ad";
import type { EditAdFormValues } from "../model/edit-ad-form.schema";

function toStringValue(value: unknown) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}

export function getEditAdFormDefaultValues(ad: AdEntity): EditAdFormValues {
  const params = (ad.params ?? {}) as Record<string, unknown>;

  return {
    category: ad.category,
    title: ad.title ?? "",
    price: String(ad.price ?? ""),
    description: ad.description ?? "",
    params: {
      brand: toStringValue(params.brand),
      model: toStringValue(params.model),
      yearOfManufacture: toStringValue(params.yearOfManufacture),
      transmission: toStringValue(params.transmission),
      mileage: toStringValue(params.mileage),
      enginePower: toStringValue(params.enginePower),
      type: toStringValue(params.type),
      address: toStringValue(params.address),
      area: toStringValue(params.area),
      floor: toStringValue(params.floor),
      condition: toStringValue(params.condition),
      color: toStringValue(params.color),
    },
  };
}
