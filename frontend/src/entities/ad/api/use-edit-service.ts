import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { ENDPOINT } from "@/shared/api";
import { adService } from "./ad-list.service";
import type { EditAdItemDto } from "./dto";

type EditAdResponse = unknown;
type EditAdError = Error;
type EditAdVariables = EditAdItemDto;

export function useEditAd(
  params: { id: string },
  options?: UseMutationOptions<EditAdResponse, EditAdError, EditAdVariables>,
) {
  return useMutation({
    mutationKey: ["ad", "edit", params.id],
    mutationFn: (dto: EditAdItemDto) =>
      adService.editAd(`${ENDPOINT.ad.index}/${params.id}`, { arg: dto }),
    ...options,
  });
}
