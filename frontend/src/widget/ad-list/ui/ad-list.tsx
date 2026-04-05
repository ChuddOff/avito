import type { AdAllDto } from "@/entities/ad/api/dto";
import { AdCard, AdRowCard } from "@/entities/ad/ui";

type Props = {
  items: AdAllDto[];
  isPending: boolean;
  isError: boolean;
  error: unknown;
  layout: "grid" | "list";
};

export function AdsList({ items, isPending, isError, error, layout }: Props) {
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
        className={
          layout === "grid" ? "grid gap-3 grid-cols-5" : "flex flex-col gap-3"
        }
      >
        {items.map((item) => (
          <li key={item.id}>
            {layout === "grid" ? (
              <AdCard item={item} />
            ) : (
              <AdRowCard item={item} />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
