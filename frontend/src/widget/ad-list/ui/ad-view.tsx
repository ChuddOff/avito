import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle, Button } from "@/shared/ui";
import { formatPrice } from "@/shared/lib";
import { formatDate } from "@/shared/lib";
import { getMissingFields, type AdItemDto } from "@/entities/ad";
import { AdParamsList } from "@/entities/ad/ui";
import { AlertCircle, PenLine } from "lucide-react";

const PLACEHOLDER_IMAGE = "/photo.png";

export function AdView({ ad }: { ad: AdItemDto }) {
  const missingFields = getMissingFields({
    category: ad.category,
    description: ad.description,
    params: ad.params,
  });

  return (
    <main className="flex flex-col gap-8">
      <header className="flex gap-4 flex-row items-start justify-between pt-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-h-0">{ad.title}</h1>

          <Button asChild className="bg-blue2 border-blue2  max-h-[38px]">
            <Link
              to={`/ads/${ad.id}/edit`}
              className="text-based text-white flex gap-2 w-min  px-3 py-2"
            >
              <p>Редактировать</p>

              <PenLine className="w-[18px] h-[18px]" />
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-3 text-right">
          <p className="text-h-0">{formatPrice(ad.price)} ₽</p>

          <div className="text-based text-gray-text2 flex flex-col gap-1">
            <p>Опубликовано: {formatDate(ad.createdAt)}</p>
            {ad.updatedAt ? (
              <p>Отредактировано: {formatDate(ad.updatedAt)}</p>
            ) : null}
          </div>
        </div>
      </header>

      <section className="flex gap-8 ">
        <img
          src={PLACEHOLDER_IMAGE}
          alt={ad.title}
          className="aspect-[4/3] w-full max-w-[480px] rounded-2xl bg-gray object-cover"
        />

        <div className="flex flex-col gap-8 flex-1">
          {missingFields.length ? (
            <Alert className="bg-alert border-0 shadow-md flex gap-4 px-4 py-3 max-w-[512px]">
              <AlertCircle className="w-[18px] h-[18px] !text-alert2" />
              <AlertDescription>
                <AlertTitle className="text-bold-based">
                  Требуются доработки
                </AlertTitle>
                <p className="text-based pt-1 text-black">
                  У объявления не заполнены поля:
                </p>
                <ul className=" list-disc pl-5 text-based text-black">
                  {missingFields.map((field) => (
                    <li key={field}>{field}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          ) : null}

          <section className="flex flex-col gap-4 text-start">
            <h3 className="text-h-3 text-black">Характеристики</h3>
            <AdParamsList category={ad.category} params={ad.params} />
          </section>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-h-3 text-black text-start">Описание</h3>

        <p className="max-w-2xl text-based text-start">
          {ad.description?.trim() ? ad.description : "Отсутствует"}
        </p>
      </section>
    </main>
  );
}
