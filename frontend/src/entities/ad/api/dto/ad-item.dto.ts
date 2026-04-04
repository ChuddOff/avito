import type { AdEntity } from "../entity";

export type AdItemDto = Pick<
  AdEntity,
  | "id"
  | "category"
  | "title"
  | "description"
  | "price"
  | "createdAt"
  | "updatedAt"
  | "params"
  | "needsRevision"
>;

export type EditAdItemDto = Pick<
  AdEntity,
  "category" | "title" | "description" | "price" | "params"
>;
