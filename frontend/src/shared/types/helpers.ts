/**
 * Все значения из объекта
 */
export type ValuesIn<T> = T extends object
  ? {
      [K in keyof T]: ValuesIn<T[K]>;
    }[keyof T]
  : T;
