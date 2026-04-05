import { useGetAllAdCatalog } from "@/entities/ad";
import { PaginationList } from "@/feature/pagination";

export function MePaginationListServices({
  layout,
}: {
  layout: "grid" | "list";
}) {
  const { data, setPage, page, last } = useGetAllAdCatalog(
    layout === "grid" ? 10 : 4,
  );

  if (!data) return <div className="h-12"></div>;

  return <PaginationList onClick={setPage} page={page} last={last} />;
}
