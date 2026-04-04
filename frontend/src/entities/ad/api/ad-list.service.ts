import { http } from "@/shared/api/axios";
import type { AdResponse } from "./response/ad.response";
import type { AdEndpoints, QueryParamsEndpoint } from "@/shared/api";
import type { GetAdByIdResponse } from "./response/get-ad-by-id.response";
import type { EditAdItemDto } from "./dto";

export class AdService {
  /**
   * @description
   * получение всех ad для каталога
   * @method GET
   * @param url /items?..
   */
  async getAllAd(url: string) {
    const res = await http.get<AdResponse>(url).then((res) => res.data);
    return res;
  }

  /**
   * @description
   * получение ad по id
   * @method GET
   * @param url /items/{id}
   */

  async getAdById(
    url: QueryParamsEndpoint<AdEndpoints["index"]>,
  ): Promise<GetAdByIdResponse> {
    return await http.get<GetAdByIdResponse>(url).then((r) => r.data);
  }

  /**
   * @description
   * редактирование объявлени
   * @method PUT
   * @param url /items/{id}
   */
  async editAd(
    url: QueryParamsEndpoint<AdEndpoints["index"]>,
    { arg }: { arg: EditAdItemDto },
  ) {
    const res = await http.put(url, arg).then((res) => res.data);
    return res;
  }
}

export const adService = new AdService();
