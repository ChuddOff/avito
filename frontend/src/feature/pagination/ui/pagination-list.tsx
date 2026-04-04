import { cn } from "@/shared/lib";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui";

interface PaginationListProps {
  onClick: (val: number) => void;
  page: number;
  last: number;
  add_page?: number;
  className?: string;
}

export const PaginationList = ({
  onClick,
  page,
  last,
  add_page = 0,
  className,
}: PaginationListProps) => {
  return (
    <Pagination className={className}>
      <PaginationContent className={cn("w-full justify-between")}>
        {/*Предыдущая*/}
        <PaginationItem>
          <PaginationPrevious
            disable={page + add_page === 1}
            onClick={() => onClick(page + add_page - 1)}
          />
        </PaginationItem>

        <div className={"gap-x-0.5 mx-auto tablet:flex hidden"}>
          {/* Цифра 1 (не пропадает) */}
          <PaginationItem>
            <PaginationLink
              isActive={page + add_page === 1}
              onClick={() => onClick(1)}
            >
              1
            </PaginationLink>
          </PaginationItem>

          {/* Поставить троеточие, если больше 4 */}
          {page + add_page > 3 ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : null}

          {/* Первое число посередине */}
          {last > 2 ? (
            <PaginationItem>
              <PaginationLink
                isActive={page + add_page === 2}
                onClick={() =>
                  onClick(page + add_page < 3 ? 2 : page + add_page - 1)
                }
              >
                {page + add_page < 3 ? 2 : page + add_page - 1}
              </PaginationLink>
            </PaginationItem>
          ) : null}

          {/* Второе число посередине */}
          {last > 3 && page + add_page !== last && page + add_page !== 1 ? (
            <PaginationItem>
              <PaginationLink
                isActive={page + add_page !== 2}
                onClick={() =>
                  onClick(page + add_page === 2 ? 3 : page + add_page)
                }
              >
                {page + add_page === 2 ? 3 : page + add_page}
              </PaginationLink>
            </PaginationItem>
          ) : null}

          {/* Третье число посередине */}
          {last > 4 && page + add_page > 2 && page + add_page < last - 1 ? (
            <PaginationItem>
              <PaginationLink onClick={() => onClick(page + add_page + 1)}>
                {page + add_page + 1}
              </PaginationLink>
            </PaginationItem>
          ) : null}

          {/* Поставить троеточие, если уже конец */}
          {page + add_page < last - 2 && last > 3 ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : null}

          {/* Последнее число */}
          {last > 1 ? (
            <PaginationItem>
              <PaginationLink
                isActive={page + add_page === last}
                onClick={() => onClick(last)}
              >
                {last}
              </PaginationLink>
            </PaginationItem>
          ) : null}
        </div>
        <div className={"tablet:hidden block"}>
          Страница {page + add_page} из {last}
        </div>

        {/*Следующая*/}
        <PaginationItem>
          <PaginationNext
            disable={page + add_page === last}
            onClick={() => onClick(page + add_page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
