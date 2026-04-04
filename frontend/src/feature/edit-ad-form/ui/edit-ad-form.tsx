import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import {
  adCategoryOptions,
  adEditFieldConfigByCategory,
  type AdItemDto,
} from "@/entities/ad";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/shared/ui";

import {
  editAdFormSchema,
  type EditAdFormValues,
} from "../model/edit-ad-form.schema";
import { getEditAdFormDefaultValues } from "../lib/get-edit-ad-form-default-values";

type Props = {
  ad: AdItemDto;
  onSubmit: (values: EditAdFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
};

type ParamKey = keyof EditAdFormValues["params"] & string;
type ParamFieldName = `params.${ParamKey}`;

export function EditAdForm({ ad, onSubmit, isSubmitting = false }: Props) {
  const form = useForm<EditAdFormValues>({
    resolver: zodResolver(editAdFormSchema),
    mode: "onChange",
    defaultValues: getEditAdFormDefaultValues(ad),
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = form;

  useEffect(() => {
    reset(getEditAdFormDefaultValues(ad));
  }, [ad, reset]);

  const selectedCategory = watch("category");
  const descriptionValue = watch("description") ?? "";
  const dynamicFields = adEditFieldConfigByCategory[selectedCategory] as Array<
    (typeof adEditFieldConfigByCategory)[keyof typeof adEditFieldConfigByCategory][number] & {
      name: ParamKey;
    }
  >;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold text-foreground">
          Редактирование объявления
        </h1>

        <div className="max-w-[280px] space-y-2">
          <Label htmlFor="category">Категория</Label>

          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>

                <SelectContent>
                  {adCategoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </section>

      <section className="flex flex-col gap-5 border-t pt-6">
        <div className="space-y-2">
          <Label htmlFor="title">
            <span className="text-destructive">*</span> Название
          </Label>

          <Input
            id="title"
            placeholder="Введите название объявления"
            aria-invalid={Boolean(errors.title)}
            {...register("title")}
          />

          {errors.title ? (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
            <div className="w-full max-w-[320px] space-y-2">
              <Label htmlFor="price">
                <span className="text-destructive">*</span> Цена
              </Label>

              <Input
                id="price"
                type="number"
                placeholder="Введите цену"
                aria-invalid={Boolean(errors.price)}
                {...register("price")}
              />
            </div>

            <Button type="button" variant="outline" disabled>
              Узнать рыночную цену
            </Button>
          </div>

          {errors.price ? (
            <p className="text-sm text-destructive">{errors.price.message}</p>
          ) : null}
        </div>
      </section>

      <section className="flex flex-col gap-5 border-t pt-6">
        <h2 className="text-xl font-semibold text-foreground">
          Характеристики
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {dynamicFields.map((field) => {
            const fieldName = `params.${field.name}` as ParamFieldName;
            const error = errors.params?.[field.name];

            if (field.type === "select") {
              return (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>

                  <Controller
                    control={control}
                    name={fieldName}
                    render={({ field: controllerField }) => (
                      <Select
                        value={controllerField.value ?? ""}
                        onValueChange={controllerField.onChange}
                      >
                        <SelectTrigger id={field.name} className="w-full">
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>

                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {error ? (
                    <p className="text-sm text-destructive">{error.message}</p>
                  ) : null}
                </div>
              );
            }

            return (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label}</Label>

                <Input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  aria-invalid={Boolean(error)}
                  {...register(fieldName)}
                />

                {error ? (
                  <p className="text-sm text-destructive">{error.message}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-4 border-t pt-6">
        <h2 className="text-xl font-semibold text-foreground">Описание</h2>

        <div className="space-y-2">
          <Textarea
            rows={6}
            placeholder="Введите описание"
            {...register("description")}
          />

          <div className="flex items-center justify-between gap-3">
            <Button type="button" variant="outline" disabled>
              Улучшить описание
            </Button>

            <p className="text-sm text-muted-foreground">
              {descriptionValue.length} / 1000
            </p>
          </div>

          {errors.description ? (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          ) : null}
        </div>
      </section>

      <section className="flex items-center gap-3">
        <Button type="submit" disabled={!isValid || isSubmitting}>
          Сохранить
        </Button>

        <Button asChild type="button" variant="secondary">
          <Link to={`/ads/${ad.id}`}>Отменить</Link>
        </Button>
      </section>
    </form>
  );
}
