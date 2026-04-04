import type { ValuesIn } from "../types";

export type Endpoints = typeof ENDPOINT;
export type AdEndpoints = Endpoints["ad"];
/**
 * Все ендпоинты
 */
export type AllEndpoints = ValuesIn<Endpoints>;

/**
 * Эндпоинты с параметрами
 */
export type QueryParamsEndpoint<T extends AllEndpoints> = `${T}${string}`;

/**
 * Ендпоинты для запросов
 */
export const ENDPOINT = {
  ad: {
    index: `/items`,
  },
} as const;
