import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { useTransactions } from "@/hooks/useTransactions";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

const tableSizes = [5, 10, 20, { label: "All", value: "null" }];

export const TransactionsPagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pagination } = useTransactions();
  const { totalPages, currentPage, pageSize } = pagination || {
    totalPages: 1,
    currentPage: 1,
  };

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== "null") {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  useEffect(() => {
    if (!searchParams.get("take")) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("take", String(pageSize) || "5");
      setSearchParams(newParams, { replace: true });
    }
  }, []);

  return (
    <div className="flex">
      <Pagination className="mb-2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              to={`?${new URLSearchParams({
                ...Object.fromEntries(searchParams),
                page: String(currentPage - 1),
              }).toString()}`}
              className={cn(
                currentPage <= 1 && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>

          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink
                to={`?${new URLSearchParams({
                  ...Object.fromEntries(searchParams),
                  page: "1",
                }).toString()}`}
              >
                1
              </PaginationLink>
            </PaginationItem>
          )}

          {currentPage > 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <p className="p-4 font-bold">{currentPage}</p>
          </PaginationItem>

          {currentPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationLink
                to={`?${new URLSearchParams({
                  ...Object.fromEntries(searchParams),
                  page: String(totalPages),
                }).toString()}`}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              to={`?${new URLSearchParams({
                ...Object.fromEntries(searchParams),
                page: String(currentPage + 1),
              }).toString()}`}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Select
        onValueChange={(value) => updateFilter("take", value)}
        defaultValue={String(pageSize)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {tableSizes.map((size) =>
            typeof size === "number" ? (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ) : (
              <SelectItem key={size.value} value={size.value}>
                {size.label}
              </SelectItem>
            ),
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
