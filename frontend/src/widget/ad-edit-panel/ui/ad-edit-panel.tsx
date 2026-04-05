import type { AdItemDto } from "@/entities/ad";
import { EditAdForm, type EditAdFormValues } from "@/feature/edit-ad-form";

type Props = {
  ad: AdItemDto;
  onSubmit: (values: EditAdFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
  isEditPending?: boolean;
};

export function AdEditPanel({
  ad,
  onSubmit,
  isSubmitting = false,
  isEditPending,
}: Props) {
  return (
    <main className="bg-white py-5 max-w-[1103px]">
      <EditAdForm
        ad={ad}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        isEditPending={isEditPending}
      />
    </main>
  );
}
