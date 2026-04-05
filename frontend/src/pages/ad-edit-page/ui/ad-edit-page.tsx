import { useGetAdById } from "@/entities/ad";
import { useEditAd } from "@/entities/ad/api/use-edit-service";
import {
  buildUpdateAdPayload,
  type EditAdFormValues,
} from "@/feature/edit-ad-form";
import { AdEditPanel } from "@/widget/ad-edit-panel";
import { useNavigate, useParams } from "react-router-dom";

export function AdEditPage() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { mutate: editAd, isPending: isEditPending } = useEditAd(
    {
      id: id ?? "",
    },
    {
      onSuccess() {
        navigate(`/ads/${id}`);
      },
    },
  );

  const { data, isPending, isError, error } = useGetAdById({ id: id ?? "" });

  const handleSubmit = async (values: EditAdFormValues) => {
    const payload = buildUpdateAdPayload(values);
    await editAd(payload);
  };

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
        Загружаем форму редактирования...
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

  if (!data) {
    return (
      <main className="rounded-2xl bg-white p-6 text-sm text-muted-foreground">
        Объявление не найдено
      </main>
    );
  }

  return (
    <AdEditPanel
      ad={data}
      onSubmit={handleSubmit}
      isEditPending={isEditPending}
    />
  );
}
