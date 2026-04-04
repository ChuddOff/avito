import { useEffect, useState } from "react";
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
import { useImproveDescriptionMutation } from "@/feature/improve-description";
import { useSuggestPriceMutation } from "@/feature/suggest-price";
import { buildAiInputFromFormValues } from "../lib";

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
    getValues,
    setValue,
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

  const [descriptionSuggestion, setDescriptionSuggestion] = useState<{
    suggestion: string;
    rationale?: string;
  } | null>(null);

  const [priceSuggestion, setPriceSuggestion] = useState<{
    suggestedPrice: number;
    rationale: string;
    confidence?: "low" | "medium" | "high";
  } | null>(null);

  const [aiError, setAiError] = useState<string | null>(null);

  const { mutateAsync: improveDescription, isPending: isImprovingDescription } =
    useImproveDescriptionMutation();

  const { mutateAsync: suggestPrice, isPending: isSuggestingPrice } =
    useSuggestPriceMutation();

  const handleImproveDescription = async () => {
    setAiError(null);

    try {
      const input = buildAiInputFromFormValues(getValues());
      const result = await improveDescription(input);
      setDescriptionSuggestion(result);
    } catch (error) {
      setAiError(
        error instanceof Error ? error.message : "Не удалось улучшить описание",
      );
    }
  };

  const handleSuggestPrice = async () => {
    setAiError(null);

    try {
      const input = buildAiInputFromFormValues(getValues());
      const result = await suggestPrice(input);
      setPriceSuggestion(result);
    } catch (error) {
      setAiError(
        error instanceof Error ? error.message : "Не удалось получить цену",
      );
    }
  };

  const handleApplyDescription = () => {
    if (!descriptionSuggestion) return;

    setValue("description", descriptionSuggestion.suggestion, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleApplyPrice = () => {
    if (!priceSuggestion) return;

    setValue("price", String(priceSuggestion.suggestedPrice), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold text-foreground">
          Редактирование объявления
        </h1>

        <div className="max-w-70 space-y-2">
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

            <Button
              type="button"
              variant="outline"
              disabled={isSuggestingPrice}
              onClick={handleSuggestPrice}
            >
              {isSuggestingPrice ? "Оцениваем..." : "Узнать рыночную цену"}
            </Button>
          </div>

          {priceSuggestion ? (
            <div className="rounded-xl border bg-muted/30 p-3 text-sm">
              <p className="font-medium">
                Рекомендация: {priceSuggestion.suggestedPrice} ₽
              </p>
              <p className="mt-1 text-muted-foreground">
                {priceSuggestion.rationale}
              </p>
              {priceSuggestion.confidence ? (
                <p className="mt-1 text-xs text-muted-foreground">
                  Уверенность: {priceSuggestion.confidence}
                </p>
              ) : null}

              <div className="mt-3">
                <Button type="button" size="sm" onClick={handleApplyPrice}>
                  Применить цену
                </Button>
              </div>
            </div>
          ) : null}

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
            <Button
              type="button"
              variant="outline"
              disabled={isImprovingDescription}
              onClick={handleImproveDescription}
            >
              {isImprovingDescription ? "Генерируем..." : "Улучшить описание"}
            </Button>

            <p className="text-sm text-muted-foreground">
              {descriptionValue.length} / 1000
            </p>
          </div>

          {descriptionSuggestion ? (
            <div className="rounded-xl border bg-muted/30 p-3 text-sm">
              <p className="font-medium">Предложение</p>
              <p className="mt-1 whitespace-pre-wrap">
                {descriptionSuggestion.suggestion}
              </p>

              {descriptionSuggestion.rationale ? (
                <p className="mt-2 text-muted-foreground">
                  {descriptionSuggestion.rationale}
                </p>
              ) : null}

              <div className="mt-3">
                <Button
                  type="button"
                  size="sm"
                  onClick={handleApplyDescription}
                >
                  Применить описание
                </Button>
              </div>
            </div>
          ) : null}

          {errors.description ? (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          ) : null}
        </div>
      </section>

      {aiError ? <p className="text-sm text-destructive">{aiError}</p> : null}

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
