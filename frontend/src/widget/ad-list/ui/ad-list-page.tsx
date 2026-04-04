import { useEffect, useMemo, useState } from "react";

import { useGetAllAdCatalog, type AdCategory } from "@/entities/ad";
import { MePaginationListServices } from "@/feature/ad";
import { AdsToolbar } from "./ad-toolbar";
import { AdsFilters } from "./ad-filters";
import { AdsList } from "./ad-list";

export function AdsListPage() {
  const {
    data,
    isPending,
    isError,
    error,

    q,
    categories,
    needsRevision,
    sortColumn,
    sortDirection,

    setQ,
    setCategories,
    setNeedsRevision,
    setSortColumn,
    setSortDirection,
    setPage,
  } = useGetAllAdCatalog();

  const [searchValue, setSearchValue] = useState(q ?? "");

  useEffect(() => {
    setSearchValue(q ?? "");
  }, [q]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (searchValue !== q) {
        setQ(searchValue);
        setPage(1);
      }
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [searchValue, q, setQ, setPage]);

  const sortValue = useMemo(
    () => `${sortColumn}:${sortDirection}`,
    [sortColumn, sortDirection],
  );

  const total = data?.total ?? 0;
  const items = data?.items ?? [];

  const handleToggleCategory = (
    category: "auto" | "real_estate" | "electronics",
    checked: boolean,
  ) => {
    const nextCategories = checked
      ? [...categories, category]
      : categories.filter((item) => item !== category);

    setCategories(nextCategories);
    setPage(1);
  };

  const handleToggleNeedsRevision = (checked: boolean) => {
    setNeedsRevision(checked);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    const [nextSortColumn, nextSortDirection] = value.split(":") as [
      "title" | "createdAt",
      "asc" | "desc",
    ];

    setSortColumn(nextSortColumn);
    setSortDirection(nextSortDirection);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearchValue("");
    setQ("");
    setCategories([]);
    setNeedsRevision(false);
    setSortColumn("createdAt");
    setSortDirection("desc");
    setPage(1);
  };

  return (
    <main className="flex flex-col gap-6">
      <AdsToolbar
        total={total}
        searchValue={searchValue}
        sortValue={sortValue}
        onSearchValueChange={setSearchValue}
        onSortChange={handleSortChange}
      />

      <div className="grid gap-6 lg:grid-cols-[256px_minmax(0,1fr)]">
        <AdsFilters
          categories={categories as unknown as AdCategory[]}
          needsRevision={needsRevision}
          onToggleCategory={handleToggleCategory}
          onToggleNeedsRevision={handleToggleNeedsRevision}
          onReset={handleResetFilters}
        />

        <div className="flex min-w-0 flex-col gap-4">
          <AdsList
            items={items}
            isPending={isPending}
            isError={isError}
            error={error}
          />

          {!isPending && !isError && items.length > 0 ? (
            <MePaginationListServices />
          ) : null}
        </div>
      </div>
    </main>
  );
}
