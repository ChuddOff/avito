import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";

const SORT_OPTIONS = [
  { value: "createdAt:desc", label: "Сначала новые" },
  { value: "createdAt:asc", label: "Сначала старые" },
  { value: "title:asc", label: "По названию: А-Я" },
  { value: "title:desc", label: "По названию: Я-А" },
] as const;

type Props = {
  total: number;
  searchValue: string;
  sortValue: string;
  onSearchValueChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

export function AdsToolbar({
  total,
  searchValue,
  sortValue,
  onSearchValueChange,
  onSortChange,
}: Props) {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex flex-col gap-1 items-start">
        <h1 className="text-h-1 text-black">Мои объявления</h1>
        <p className="text-for-sign">{total} объявлений</p>
      </div>

      <section
        aria-label="Поиск и сортировка объявлений"
        className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"
      >
        <form
          role="search"
          className="w-full max-w-xl"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            value={searchValue}
            onChange={(e) => onSearchValueChange(e.target.value)}
            placeholder="Найти объявление..."
            aria-label="Поиск по названию объявления"
          />
        </form>

        <div className="w-full lg:w-65">
          <Select value={sortValue} onValueChange={onSortChange}>
            <SelectTrigger
              aria-label="Сортировка объявлений"
              className="w-full"
            >
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>

            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>
    </header>
  );
}
