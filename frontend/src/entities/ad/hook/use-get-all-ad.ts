import { useContext, useEffect } from "react";
import { AdFilterContext, AdPaginationContext } from "../context";
import { ENDPOINT } from "@/shared/api";
import { getKey } from "@/shared/lib";
import { useGetAllAd } from "../api/get-all-ad";

/**
 * Выполняется запрос при изменении контекста
 */
export function useGetAllAdCatalog() {
  const filterCtx = useContext(AdFilterContext);
  const paginationCtx = useContext(AdPaginationContext);

  if (!filterCtx) {
    throw new Error("useGetAllAdCatalog must be used within AdFilterProvider");
  }

  if (!paginationCtx) {
    throw new Error(
      "useGetAllAdCatalog must be used within AdPaginationProvider",
    );
  }

  const page = paginationCtx.page;
  const per_page = paginationCtx.per_page;

  const limit = per_page;
  const skip = (page - 1) * per_page;

  const url = getKey(ENDPOINT.ad.index, {
    q: filterCtx.q,
    categories: filterCtx.categories.join(","),
    needsRevision: filterCtx.needsRevision,
    sortColumn: filterCtx.sortColumn,
    sortDirection: filterCtx.sortDirection,
    limit,
    skip,
  });

  useEffect(() => {
    const path = getKey(window.location.pathname, {
      q: filterCtx.q,
      categories: filterCtx.categories.join(","),
      needsRevision: filterCtx.needsRevision,
      sortColumn: filterCtx.sortColumn,
      sortDirection: filterCtx.sortDirection,
      page,
      per_page,
    });

    window.history.replaceState({}, "", path);
  }, [url]);

  const res = useGetAllAd(url);

  const total = res.data?.total ?? 0;
  const lastPage = Math.max(1, Math.ceil(total / per_page));

  return {
    ...res,
    ...filterCtx,
    ...paginationCtx,
    page,
    last: lastPage,
  };
}
