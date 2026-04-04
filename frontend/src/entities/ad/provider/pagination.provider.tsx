import { useSearchParams } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import { AdPaginationContext } from "../context/ad-pagination.context";

export function AdPaginationProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<number>(1);
  const [per_page, setPerPage] = useState<number>(10);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const pageQ = searchParams.get("page");
    const perPageQ = searchParams.get("per_page");

    if (pageQ && !Number.isNaN(Number(pageQ))) {
      setPage(Number(pageQ));
    }

    if (perPageQ && !Number.isNaN(Number(perPageQ))) {
      setPerPage(Number(perPageQ));
    }
  }, []);

  return (
    <AdPaginationContext.Provider
      value={{
        page,
        setPage,
        per_page,
        setPerPage,
      }}
    >
      {children}
    </AdPaginationContext.Provider>
  );
}
