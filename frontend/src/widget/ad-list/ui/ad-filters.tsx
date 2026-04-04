import type { AdCategory } from "@/entities/ad";
import { Button, Checkbox, Separator, Switch } from "@/shared/ui";

const CATEGORY_OPTIONS: Array<{ value: AdCategory; label: string }> = [
  { value: "auto", label: "Транспорт" },
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
    <aside aria-label="Фильтры объявлений" className="flex flex-col gap-2.5">
      <section className="flex flex-col gap-4 rounded-[16px] bg-white p-4">
        <h2 className="text-base font-medium">Фильтры</h2>

        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium">Категории</legend>

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
        </fieldset>

        <Separator />

        <div className="flex items-center justify-between gap-3">
          <label htmlFor="needs-revision" className="text-sm leading-5">
            Только требующие доработок
          </label>

          <Switch
            id="needs-revision"
            checked={needsRevision}
            onCheckedChange={onToggleNeedsRevision}
          />
        </div>
      </section>

      <Button type="button" variant="outline" onClick={onReset}>
        Сбросить фильтры
      </Button>
    </aside>
  );
}
