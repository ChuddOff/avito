import { Link } from "react-router-dom";

import { formatPrice } from "@/shared/lib/format-price";
import { Badge } from "@/shared/ui";

import { getCategoryLabel } from "../lib/get-category-label";
import type { AdAllDto } from "../api/dto";

const PLACEHOLDER_IMAGE = "/photo.png";

type Props = {
  item: AdAllDto;
};

export function AdCard({ item }: Props) {
  return (
    <article className="overflow-hidden rounded-[16px] bg-white h-full border border-white2">
      <Link to={`/ads/${item.id}`} className="flex h-full flex-col">
        <img
          src={PLACEHOLDER_IMAGE}
          alt={item.title}
          className="aspect-[4/3] w-full object-cover bg-gray"
        />

        <div className="flex flex-1 flex-col gap-1 pb-[9px] px-3 translate-y-[-11px]">
          <Badge variant="outline" className="w-fit h-[22px] bg-white">
            {getCategoryLabel(item.category)}
          </Badge>

          <h3 className="line-clamp-2 text-based text-start pt-1.5">
            {item.title}
          </h3>

          <p className="text-bold-based text-gray-text text-start">
            {formatPrice(item.price)} ₽
          </p>

          {item.needsRevision ? (
            <Badge
              variant="secondary"
              className="w-fit mt-auto flex gap-2 h-[26px]"
            >
              <p className="text-based text-alert-text">• Требует доработок</p>
            </Badge>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
