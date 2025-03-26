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
import { currency } from "@/utils/currency-format";
import { useMemo } from "react";

export const CategoriesList = () => {
  const { summary } = useSummary();

  const data = useMemo(() => {
    return summary!.categoryStats.sort((a, b) => b.count - a.count).slice(0, 8);
  }, [summary]);

  const total = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.amount, 0);
  }, [data]);

  return (
    <Table>
      <TableCaption>Popular Categories</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Category</TableHead>
          <TableHead>Transactions</TableHead>
          <TableHead className="text-right">Balance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((c) => (
          <TableRow key={c.category}>
            <TableCell className="font-medium">{c.category}</TableCell>
            <TableCell className="text-center">{c.count}</TableCell>
            <TableCell className="text-right font-mono tabular-nums">
              {currency(c.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right tabular-nums">
            {currency(total)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
