import { createContext } from "react";

type Data = {
  q: string;
  categories: string[];
  needsRevision: boolean;
  sortColumn: "title" | "createdAt";
  sortDirection: "asc" | "desc";
};

type Action = {
  setQ: (e: string) => void;
  setCategories: (e: string[]) => void;
  setNeedsRevision: (e: boolean) => void;
  setSortColumn: (e: "title" | "createdAt") => void;
  setSortDirection: (e: "asc" | "desc") => void;
};

export type AdFilterContext = Action & Data;

export const AdFilterContext = createContext<AdFilterContext | undefined>(
  undefined,
);
