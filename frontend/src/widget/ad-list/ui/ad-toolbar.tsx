import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { LayoutGrid, List } from "lucide-react";

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
        className="flex gap-6 overflow-hidden p-3 bg-white rounded-[16px] justify-between border border-white2"
      >
        <form
          role="search"
          className="w-full flex-1"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            value={searchValue}
            onChange={(e) => onSearchValueChange(e.target.value)}
            divClassName="max-h-[32px] min-h-[32px] max-w-full flex-1"
            className="max-h-[32px] min-h-[32px] max-w-full flex-1"
            placeholder="Найти объявление..."
            aria-label="Поиск по названию объявления"
            onSearch={() => onSearchValueChange(searchValue)}
            needSearch
          />
        </form>

        <div className="flex gap-4 w-65 ">
          <div className="flex p-2 bg-gray rounded-[8px] gap-[10px] h-[32px] items-center">
            <LayoutGrid className="w-[18px] h-[18px]" />
            <div className="w-[2px] h-full bg-white" />
            <List className="w-[18px] h-[18px]" />
          </div>
          <Select value={sortValue} onValueChange={onSortChange}>
            <SelectTrigger
              aria-label="Сортировка объявлений"
              className="w-full h-[32px]"
              iconClassName="text-gray-text"
            >
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>

            <SelectContent className="border border-white2">
              {SORT_OPTIONS.map((option) => (
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
        </div>
      </section>
    </header>
  );
}
