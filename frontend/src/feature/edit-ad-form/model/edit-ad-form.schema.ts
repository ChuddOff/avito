import { z } from "zod";

export const editAdFormSchema = z.object({
  category: z.enum(["auto", "real_estate", "electronics"]),
  title: z.string().trim().min(1, "Название должно быть заполнено"),
  price: z
    .string()
    .trim()
    .min(1, "Цена должна быть заполнена")
    .refine((value) => !Number.isNaN(Number(value)), "Цена должна быть числом")
    .refine((value) => Number(value) > 0, "Цена должна быть больше нуля"),
  description: z
    .string()
    .max(1000, "Описание не должно превышать 1000 символов"),
  params: z.object({
    brand: z.string().optional(),
    model: z.string().optional(),
    yearOfManufacture: z.string().optional(),
    transmission: z.string().optional(),
    mileage: z.string().optional(),
    enginePower: z.string().optional(),
    type: z.string().optional(),
    address: z.string().optional(),
    area: z.string().optional(),
    floor: z.string().optional(),
    condition: z.string().optional(),
    color: z.string().optional(),
  }),
});

export type EditAdFormValues = z.infer<typeof editAdFormSchema>;
