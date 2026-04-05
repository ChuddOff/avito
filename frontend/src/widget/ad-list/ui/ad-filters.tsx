import type { AdCategory } from "@/entities/ad";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Checkbox,
  Separator,
  Switch,
} from "@/shared/ui";

const CATEGORY_OPTIONS: Array<{ value: AdCategory; label: string }> = [
  { value: "auto", label: "Авто" },
  { value: "real_estate", label: "Недвижимость" },
  { value: "electronics", label: "Электроника" },
];

type Props = {
  categories: AdCategory[];
  needsRevision: boolean;
  onToggleCategory: (category: AdCategory, checked: boolean) => void;
  onToggleNeedsRevision: (checked: boolean) => void;
  onReset: () => void;
};

export function AdsFilters({
  categories,
  needsRevision,
  onToggleCategory,
  onToggleNeedsRevision,
  onReset,
}: Props) {
  return (
    <aside
      aria-label="Фильтры объявлений"
      className="flex flex-col  justify-start  gap-2.5"
    >
      <section className="flex flex-col justify-start gap-2.5 rounded-[16px] bg-gray p-4 ">
        <h2 className="text-start text-h-2">Фильтры</h2>

        <Accordion type="multiple">
          <AccordionItem
            value="12"
            className="flex flex-col justify-start gap-2"
          >
            <AccordionTrigger className="text-start">
              Категории
            </AccordionTrigger>
            <AccordionContent>
              {CATEGORY_OPTIONS.map((category) => {
                const checked = categories.includes(category.value);

                return (
                  <label
                    key={category.value}
                    className="flex items-center gap-3 text-sm"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(value) =>
                        onToggleCategory(category.value, Boolean(value))
                      }
                    />
                    <span>{category.label}</span>
                  </label>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator className="border-white2 bg-white2" />

        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor="needs-revision"
            className="text-bold-based text-start"
          >
            Только требующие доработок
          </label>

          <Switch
            id="needs-revision"
            checked={needsRevision}
            onCheckedChange={onToggleNeedsRevision}
            className="h-[22px] w-[44px] bg-gray-button"
            classNameThumb="w-[18px] h-[18px]"
          />
        </div>
      </section>

      <Button
        type="button"
        className="text-based bg-gray text-gray-text2"
        onClick={onReset}
      >
        Сбросить фильтры
      </Button>
    </aside>
  );
}
