import type { AdAllDto } from "@/entities/ad/api/dto";
import { AdCard } from "@/entities/ad/ui";

type Props = {
  items: AdAllDto[];
  isPending: boolean;
  isError: boolean;
  error: unknown;
};

export function AdsList({ items, isPending, isError, error }: Props) {
  if (isPending) {
    return (
      <div className="rounded-[16px] bg-white p-6 text-sm text-muted-foreground">
        Загружаем объявления...
      </div>
    );
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="rounded-[16px] border border-destructive/20 bg-white p-6 text-sm text-destructive"
      >
        Не удалось загрузить объявления.
        {error instanceof Error ? ` ${error.message}` : ""}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-[16px] bg-white p-6 text-sm text-muted-foreground">
        По текущим параметрам ничего не найдено.
      </div>
    );
  }

  return (
    <section aria-label="Список объявлений" className="min-w-0">
      <ul
        role="list"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        {items.map((item) => (
          <li key={item.id}>
            <AdCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
