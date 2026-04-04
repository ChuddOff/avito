import { useSearchParams } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import { AdFilterContext } from "../context/ad-filter.context";

export function AdFilterProvider({ children }: { children: ReactNode }) {
  const [q, setQ] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [needsRevision, setNeedsRevision] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState<"title" | "createdAt">(
    "createdAt",
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const qQ = searchParams.get("q");
    const categoriesQ = searchParams.get("categories");
    const needsRevisionQ = searchParams.get("needsRevision");
    const sortColumnQ = searchParams.get("sortColumn");
    const sortDirectionQ = searchParams.get("sortDirection");

    qQ && setQ(qQ);
    categoriesQ && setCategories(categoriesQ.split(","));
    needsRevisionQ && setNeedsRevision(needsRevisionQ === "true");

    if (sortColumnQ === "title" || sortColumnQ === "createdAt") {
      setSortColumn(sortColumnQ);
    }

    if (sortDirectionQ === "asc" || sortDirectionQ === "desc") {
      setSortDirection(sortDirectionQ);
    }
  }, []);

  return (
    <AdFilterContext.Provider
      value={{
        q,
        setQ,
        categories,
        setCategories,
        needsRevision,
        setNeedsRevision,
        sortColumn,
        setSortColumn,
        sortDirection,
        setSortDirection,
      }}
    >
      {children}
    </AdFilterContext.Provider>
  );
}
