export type AdCategory = "auto" | "real_estate" | "electronics";

export interface AutoAdParams {
  brand?: string;
  model?: string;
  yearOfManufacture?: string | number;
  transmission?: "automatic" | "manual";
  mileage?: string | number;
  enginePower?: string | number;
}

export interface RealEstateAdParams {
  type?: "flat" | "house" | "room";
  address?: string;
  area?: string | number;
  floor?: string | number;
}

export interface ElectronicsAdParams {
  type?: "phone" | "laptop" | "misc";
  brand?: string;
  model?: string;
  condition?: "new" | "used";
  color?: string;
}

export type AdParams = AutoAdParams | RealEstateAdParams | ElectronicsAdParams;

export interface AdEntity {
  /**
   * Id ad
   */
  id: number;

  /**
   * Заголовок ad
   */
  title: string;

  /**
   * Описание ad
   */
  description: string;

  /**
   * Цена ad
   */
  price: number;

  /**
   * Дата создания ad
   */
  createdAt: string;

  /**
   * Дата обновления ad
   */
  updatedAt: string;

  /**
   * Требуются ли доработки
   */
  needsRevision: boolean;

  /**
   * Категория ad
   */
  category: AdCategory;

  /**
   * Параметры ad
   */
  params: AdParams;
}
