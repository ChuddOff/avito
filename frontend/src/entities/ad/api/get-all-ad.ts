import { useQuery } from "@tanstack/react-query";
import { adService } from "./ad-list.service";

export function useGetAllAd(url: string) {
  return useQuery({
    queryKey: ["all-ad", url],
    queryFn: () => adService.getAllAd(url),
    enabled: Boolean(url),
  });
}
