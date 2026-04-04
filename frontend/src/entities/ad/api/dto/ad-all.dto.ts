import type { AdEntity } from "../entity";

export type AdAllDto = Pick<
  AdEntity,
  "title" | "price" | "needsRevision" | "category" | "id"
>;
