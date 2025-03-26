import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSummary } from "@/hooks/useSummary";
import { cn } from "@/lib/utils";
import { calculateUndefinedBalance } from "@/utils/calculate";
import { currency } from "@/utils/currency-format";
import { useMemo } from "react";

export const CategoriesList = () => {
  const { summary, balance } = useSummary();

  const data = useMemo(() => {
    return summary!.categoryStats.sort((a, b) => b.count - a.count).slice(0, 8);
  }, [summary]);

  return (
    <Table>
      <TableCaption>Popular Categories</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Category</TableHead>
          <TableHead className="text-center">Transactions</TableHead>
          <TableHead className="text-right">Balance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((c) => (
          <TableRow key={c.category}>
            <TableCell className="font-medium">{c.category}</TableCell>
            <TableCell className="text-center">{c.count}</TableCell>
            <TableCell
              className={cn(
                "text-right font-mono tabular-nums opacity-90",
                calculateUndefinedBalance(c.income, c.expense) < 0
                  ? "text-rose-500"
                  : "text-emerald-500",
              )}
            >
              {currency(
                Math.abs(calculateUndefinedBalance(c.income, c.expense)),
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right tabular-nums">
            {currency(balance)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
