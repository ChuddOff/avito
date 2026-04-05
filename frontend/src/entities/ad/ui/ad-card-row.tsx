import { Link } from "react-router-dom";

import { formatPrice } from "@/shared/lib/format-price";
import { Badge } from "@/shared/ui";

import { getCategoryLabel } from "../lib/get-category-label";
import type { AdAllDto } from "../api/dto";
import { useGetAdById } from "../api";

const PLACEHOLDER_IMAGE = "/photo.png";

type Props = {
  item: AdAllDto;
};

export function AdRowCard({ item }: Props) {
  const { data } = useGetAdById({ id: item.id.toString() });

  const needsRevision =
    !data?.category ||
    !data.description ||
    !data.price ||
    !data.params ||
    !data.title;

  return (
    <article className="overflow-hidden rounded-[16px] bg-white border border-white2 h-[132px]">
      <Link
        to={`/ads/${item.id}`}
        className="flex flex-row items-stretch gap-6 "
      >
        <img
          src={PLACEHOLDER_IMAGE}
          alt={item.title}
          className="shrink-0 rounded-[12px] object-cover bg-gray aspect-[4/3] h-[132px]"
        />

        <div className="flex min-w-0 flex-1 flex-col py-4">
          <div className="flex flex-col gap-1">
            <p className="text-h-4 text-gray-text2 text-start">
              {getCategoryLabel(item.category)}
            </p>

            <h3 className="line-clamp-2 text-based text-start">{item.title}</h3>

            <p className="text-bold-based text-gray-text text-start">
              {formatPrice(item.price)} ₽
            </p>
          </div>

          {needsRevision ? (
            <Badge
              variant="secondary"
              className="w-fit mt-1 flex gap-2 h-[26px]"
            >
              <p className="text-based text-alert-text">• Требует доработок</p>
            </Badge>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
