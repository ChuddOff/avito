import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle, Button } from "@/shared/ui";
import { formatPrice } from "@/shared/lib";
import { formatDate } from "@/shared/lib";
import { getMissingFields, type AdItemDto } from "@/entities/ad";
import { AdParamsList } from "@/entities/ad/ui";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80";

export function AdView({ ad }: { ad: AdItemDto }) {
  const missingFields = getMissingFields({
    category: ad.category,
    description: ad.description,
    params: ad.params,
  });

  return (
    <main className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold text-foreground">{ad.title}</h1>

          <div className="flex items-center gap-3">
            <Button asChild>
              <Link to={`/ads/${ad.id}/edit`}>Редактировать</Link>
            </Button>

            <Button asChild variant="ghost">
              <Link to="/ads">Назад к списку</Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-left lg:text-right">
          <p className="text-3xl font-semibold text-foreground">
            {formatPrice(ad.price)} ₽
          </p>

          <div className="text-sm text-muted-foreground">
            <p>Опубликовано: {formatDate(ad.createdAt)}</p>
            {ad.updatedAt ? (
              <p>Отредактировано: {formatDate(ad.updatedAt)}</p>
            ) : null}
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
        <div>
          <img
            src={PLACEHOLDER_IMAGE}
            alt={ad.title}
            className="aspect-[4/3] w-full rounded-2xl bg-muted object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          {missingFields.length ? (
            <Alert className="bg-amber-50 border-amber-200">
              <AlertTitle>Требуются доработки</AlertTitle>
              <AlertDescription>
                <p>У объявления не заполнены поля:</p>
                <ul className="mt-2 list-disc pl-5">
                  {missingFields.map((field) => (
                    <li key={field}>{field}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          ) : null}

          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Характеристики
            </h2>
            <AdParamsList category={ad.category} params={ad.params} />
          </section>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-foreground">Описание</h2>

        <div className="max-w-2xl rounded-xl border bg-background p-4 text-sm leading-6 text-foreground">
          {ad.description?.trim() ? ad.description : "Описание не указано"}
        </div>
      </section>
    </main>
  );
}
