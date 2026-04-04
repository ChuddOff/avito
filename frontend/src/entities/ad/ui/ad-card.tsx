import { Link } from "react-router-dom";

import { formatPrice } from "@/shared/lib/format-price";
import { Badge } from "@/shared/ui";

import { getCategoryLabel } from "../lib/get-category-label";
import type { AdAllDto } from "../api/dto";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80";

type Props = {
  item: AdAllDto;
};

export function AdCard({ item }: Props) {
  return (
    <article className="overflow-hidden rounded-[16px] bg-white">
      <Link to={`/ads/${item.id}`} className="flex h-full flex-col">
        <img
          src={PLACEHOLDER_IMAGE}
          alt={item.title}
          className="aspect-[4/3] w-full object-cover"
        />

        <div className="flex flex-1 flex-col gap-2 p-4">
          <Badge variant="outline" className="w-fit">
            {getCategoryLabel(item.category)}
          </Badge>

          <h3 className="line-clamp-2 text-sm font-medium text-foreground">
            {item.title}
          </h3>

          <p className="text-base font-semibold text-foreground">
            {formatPrice(item.price)} ₽
          </p>

          {item.needsRevision ? (
            <Badge variant="secondary" className="w-fit">
              Требует доработок
            </Badge>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
