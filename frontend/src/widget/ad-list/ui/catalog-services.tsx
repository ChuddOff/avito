import { AdFilterProvider, AdPaginationProvider } from "@/entities/ad";
import { Suspense } from "react";
import { AdsListPage } from "./ad-list-page";

export function AdCatalog() {
  return (
    <Suspense>
      <AdFilterProvider>
        <AdPaginationProvider>
          <AdsListPage />
        </AdPaginationProvider>
      </AdFilterProvider>
    </Suspense>
  );
}
