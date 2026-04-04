import type { AdItemDto } from "@/entities/ad";
import { EditAdForm, type EditAdFormValues } from "@/feature/edit-ad-form";

type Props = {
  ad: AdItemDto;
  onSubmit: (values: EditAdFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
};

export function AdEditPanel({ ad, onSubmit, isSubmitting = false }: Props) {
  return (
    <main className="rounded-2xl border bg-white p-6 shadow-sm">
      <EditAdForm ad={ad} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </main>
  );
}
