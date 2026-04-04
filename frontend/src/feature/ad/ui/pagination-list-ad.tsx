import { useGetAllAdCatalog } from "@/entities/ad";
import { PaginationList } from "@/feature/pagination";

export function MePaginationListServices() {
  const { data, setPage, page, last } = useGetAllAdCatalog();

  if (!data) return <div className="h-12"></div>;

  return <PaginationList onClick={setPage} page={page} last={last} />;
}
