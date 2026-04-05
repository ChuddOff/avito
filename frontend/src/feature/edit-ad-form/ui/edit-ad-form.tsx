import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Lightbulb, LoaderCircle, RefreshCw } from "lucide-react";

import {
  adCategoryOptions,
  adEditFieldConfigByCategory,
  type AdItemDto,
} from "@/entities/ad";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
  Popover,
  PopoverAnchor,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
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
import { AiResponsePopover } from "./ai-response-popover";

type Props = {
  ad: AdItemDto;
  onSubmit: (values: EditAdFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
  isEditPending?: boolean;
};

type ParamKey = keyof EditAdFormValues["params"] & string;
type ParamFieldName = `params.${ParamKey}`;

export function EditAdForm({
  ad,
  onSubmit,
  isSubmitting = false,
  isEditPending,
}: Props) {
  const form = useForm<EditAdFormValues>({
    resolver: zodResolver(editAdFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: getEditAdFormDefaultValues(ad),
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    getValues,
    setValue,
    formState: { isValid, errors },
  } = form;

  useEffect(() => {
    reset(getEditAdFormDefaultValues(ad));
    setDescriptionSuggestion(null);
    setPriceSuggestion(null);
    setAiError(null);
  }, [ad, reset]);

  const selectedCategory = watch("category");
  const descriptionValue = watch("description") ?? "";

  const dynamicFields = adEditFieldConfigByCategory[selectedCategory] as Array<
    (typeof adEditFieldConfigByCategory)[keyof typeof adEditFieldConfigByCategory][number] & {
      name: ParamKey;
    }
  >;

  const [isDescriptionPopoverOpen, setIsDescriptionPopoverOpen] =
    useState(false);
  const [isPricePopoverOpen, setIsPricePopoverOpen] = useState(false);

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
      setIsDescriptionPopoverOpen(true);
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
      setIsPricePopoverOpen(true);
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

    setIsDescriptionPopoverOpen(false);
  };

  const handleApplyPrice = () => {
    if (!priceSuggestion) return;

    setValue("price", String(priceSuggestion.suggestedPrice), {
      shouldDirty: true,
      shouldValidate: true,
    });

    setIsPricePopoverOpen(false);
  };

  useEffect(() => {
    reset(getEditAdFormDefaultValues(ad));
    setDescriptionSuggestion(null);
    setPriceSuggestion(null);
    setAiError(null);
    setIsDescriptionPopoverOpen(false);
    setIsPricePopoverOpen(false);
  }, [ad, reset]);

  const hasDescription = descriptionValue.trim().length > 0;
  const hasSuggestion = Boolean(descriptionSuggestion);
  const isLoadingDescription = isImprovingDescription;

  const hasPriceSuggestion = Boolean(priceSuggestion);

  const priceButtonState = isSuggestingPrice
    ? "loading"
    : hasPriceSuggestion
      ? "retry"
      : "default";

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4.5">
        <section className="flex flex-col gap-4.5">
          <h1 className="text-h-0 text-start">Редактирование объявления</h1>

          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem className="max-w-70 space-y-2">
                <Label htmlFor="category" className="text-based">
                  Категория
                </Label>

                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="category"
                      className="w-full h-8 min-h-8 border-1 border-gray2"
                      iconClassName="text-gray2"
                    >
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>

                    <SelectContent className="border-1 border-gray2">
                      {adCategoryOptions.map((option) => (
                        <SelectItem
                          className="!text-[14px]"
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <Separator className="bg-white2" />

        <section className="flex flex-col gap-4.5">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <Label htmlFor="title" className="text-based">
                  <span className="text-destructive">*</span> Название
                </Label>

                <FormControl>
                  <Input
                    id="title"
                    placeholder="Введите название объявления"
                    divClassName="max-w-[456px] w-full"
                    className="h-8 min-h-8 bg-white"
                    aria-invalid={Boolean(errors.title)}
                    {...field}
                    value={field.value ?? ""}
                    needDelete
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="bg-white2" />

          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex gap-3 items-end">
                  <div className="space-y-2 max-w-[456px] w-full">
                    <Label htmlFor="price" className="text-based">
                      <span className="text-destructive">*</span> Цена
                    </Label>

                    <FormControl>
                      <Input
                        id="price"
                        type="number"
                        placeholder="Введите цену"
                        divClassName="max-w-[456px] w-full"
                        className="h-8 min-h-8 bg-white"
                        aria-invalid={Boolean(errors.price)}
                        {...field}
                        value={field.value ?? ""}
                        needDelete
                      />
                    </FormControl>
                  </div>
                  <Popover
                    open={isPricePopoverOpen}
                    onOpenChange={setIsPricePopoverOpen}
                  >
                    <PopoverAnchor asChild>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isSuggestingPrice}
                        onClick={handleSuggestPrice}
                        className="h-8 min-h-8 border-0 bg-alert text-alert-text flex gap-2.5 cursor-pointer disabled:text-alert-text"
                      >
                        {priceButtonState === "loading" ? (
                          <>
                            <LoaderCircle className="w-[14px] h-[14px] animate-spin" />
                            <p className="text-h-4">Генерируем...</p>
                          </>
                        ) : priceButtonState === "retry" ? (
                          <>
                            <RefreshCw className="w-[14px] h-[14px]" />
                            <p className="text-h-4">Повторить запрос</p>
                          </>
                        ) : (
                          <>
                            <Lightbulb className="w-[14px] h-[14px]" />
                            <p className="text-h-4">Узнать рыночную цену</p>
                          </>
                        )}
                      </Button>
                    </PopoverAnchor>
                    {priceSuggestion ? (
                      <AiResponsePopover
                        open={isPricePopoverOpen}
                        onOpenChange={setIsPricePopoverOpen}
                        title="Ответ AI:"
                        content={`${priceSuggestion.suggestedPrice} ₽\n\n${priceSuggestion.rationale}${priceSuggestion.confidence ? `\n\nУверенность: ${priceSuggestion.confidence}` : ""}`}
                        onApply={handleApplyPrice}
                        onRetry={handleSuggestPrice}
                        applyText="Применить"
                      />
                    ) : null}
                  </Popover>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <Separator className="bg-white2" />

        <section className="flex flex-col gap-5">
          <h2 className="text-based text-start">Характеристики</h2>

          <div className="flex flex-col gap-3 ">
            {dynamicFields.map((config) => {
              const fieldName = `params.${config.name}` as ParamFieldName;

              if (config.type === "select") {
                return (
                  <FormField
                    key={config.name}
                    control={control}
                    name={fieldName}
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <Label
                          htmlFor={config.name}
                          className="text-h-4 !text-[14px] !font-normal"
                        >
                          {config.label}
                        </Label>

                        <FormControl>
                          <Select
                            value={field.value || undefined}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger
                              id={config.name}
                              className={`w-full border-1 border-gray2 h-8 min-h-8 max-w-[456px] w-full ${!!form.getValues(fieldName)?.length ? "" : "!border-1 !border-alert2"}`}
                            >
                              <SelectValue placeholder={config.placeholder} />
                            </SelectTrigger>

                            <SelectContent className="border-1 border-gray2">
                              {config.options?.map((option) => (
                                <SelectItem
                                  className="text-[14px]"
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              }

              return (
                <FormField
                  key={config.name}
                  control={control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <Label
                        htmlFor={config.name}
                        className="text-h-4 !text-[14px] !font-normal"
                      >
                        {config.label}
                      </Label>

                      <FormControl>
                        <Input
                          id={config.name}
                          type={config.type}
                          placeholder={config.placeholder}
                          aria-invalid={Boolean(
                            form.formState.errors.params?.[config.name],
                          )}
                          className={`bg-white h-8 min-h-8 ${!!form.getValues(fieldName)?.length ? "" : "!border-1 !border-alert2"} max-w-[456px] w-full`}
                          divClassName="max-w-[456px] w-full"
                          {...field}
                          value={field.value ?? ""}
                          needDelete
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}
          </div>
        </section>

        <Separator className="bg-white2" />

        <section className="flex flex-col gap-4">
          <h2 className="text-based text-start">Описание</h2>

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex flex-col">
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="Введите описание"
                      className={`max-w-[942px] w-full ${
                        descriptionValue.trim().length === 0
                          ? "!border !border-alert2"
                          : ""
                      }`}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>

                  <p className="text-h-4 text-gray2 text-end max-w-[942px]">
                    {descriptionValue.length}/1000
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <Popover
                    open={isDescriptionPopoverOpen}
                    onOpenChange={setIsDescriptionPopoverOpen}
                  >
                    <PopoverAnchor asChild>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isImprovingDescription}
                        onClick={handleImproveDescription}
                        className="h-8 min-h-8 border-0 bg-alert text-alert-text flex gap-2.5 disabled:text-alert-text"
                      >
                        {isLoadingDescription ? (
                          <>
                            <LoaderCircle className="w-[14px] h-[14px] animate-spin" />
                            <p className="text-h-4">Генерируем...</p>
                          </>
                        ) : hasSuggestion ? (
                          <>
                            <RefreshCw className="w-[14px] h-[14px]" />
                            <p className="text-h-4">Повторить запрос</p>
                          </>
                        ) : hasDescription ? (
                          <>
                            <Lightbulb className="w-[14px] h-[14px]" />
                            <p className="text-h-4">Улучшить описание</p>
                          </>
                        ) : (
                          <>
                            <Lightbulb className="w-[14px] h-[14px]" />
                            <p className="text-h-4">Придумать описание</p>
                          </>
                        )}
                      </Button>
                    </PopoverAnchor>
                    {descriptionSuggestion ? (
                      <AiResponsePopover
                        open={isDescriptionPopoverOpen}
                        onOpenChange={setIsDescriptionPopoverOpen}
                        title="Ответ AI:"
                        content={
                          descriptionSuggestion.rationale
                            ? `${descriptionSuggestion.suggestion}\n\n${descriptionSuggestion.rationale}`
                            : descriptionSuggestion.suggestion
                        }
                        onApply={handleApplyDescription}
                        onRetry={handleImproveDescription}
                        applyText="Применить"
                      />
                    ) : null}
                  </Popover>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {aiError ? <p className="text-sm text-destructive">{aiError}</p> : null}

        <section className="flex items-center gap-3">
          <Button
            type="submit"
            className="bg-blue2 text-white h-[38px] border-0 disabled:text-white disabled:bg-gray2"
            disabled={!isValid || isSubmitting}
          >
            {isEditPending ? "Сохраняем..." : "Сохранить"}
          </Button>

          <Button
            asChild
            type="button"
            variant="secondary"
            className="bg-gray2 text-gray-text3 h-[38px] border-0"
          >
            <Link to={`/ads/${ad.id}`}>Отменить</Link>
          </Button>
        </section>
      </form>
    </Form>
  );
}
