import { useGetAdById } from "@/entities/ad";
import { AdView } from "@/widget/ad-list";
import { useParams } from "react-router-dom";

export function AdViewPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const {
    data: ad,
    isPending,
    isError,
    error,
  } = useGetAdById({ id: id ?? "" });

  if (!id) {
    return (
      <main className="rounded-2xl bg-white p-6 text-sm text-destructive">
        Некорректный id объявления
      </main>
    );
  }

  if (isPending) {
    return (
      <main className="rounded-2xl bg-white p-6 text-sm text-muted-foreground">
        Загружаем объявление...
      </main>
    );
  }

  if (isError) {
    return (
      <main
        role="alert"
        className="rounded-2xl border border-destructive/20 bg-white p-6 text-sm text-destructive"
      >
        Не удалось загрузить объявление.
        {error instanceof Error ? ` ${error.message}` : ""}
      </main>
    );
  }

  if (!ad) {
    return (
      <main className="rounded-2xl bg-white p-6 text-sm text-muted-foreground">
        Объявление не найдено
      </main>
    );
  }

  return <AdView ad={ad} />;
}
