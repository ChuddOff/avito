import { useQuery } from "@tanstack/react-query";
import { ENDPOINT } from "@/shared/api";
import { adService } from "./ad-list.service";

export function useGetAdById(params: { id: string }) {
  return useQuery({
    queryKey: [ENDPOINT.ad.index, params.id],
    queryFn: () => adService.getAdById(`${ENDPOINT.ad.index}/${params.id}`),
    enabled: !!params.id,
  });
}
