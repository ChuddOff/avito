import { createContext } from "react";

type Data = {
  page: number;
  per_page: number;
};

type Action = {
  setPage: (e: number) => void;
  setPerPage: (e: number) => void;
};

export type AdPaginationContext = Action & Data;

export const AdPaginationContext = createContext<
  AdPaginationContext | undefined
>(undefined);
