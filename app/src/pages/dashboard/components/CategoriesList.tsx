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
import { currency } from "@/utils/currency-format";
import { useMemo } from "react";

const data = [
  {
    category: "rent",
    count: 1,
    amount: 879.9,
  },
  {
    category: "food",
    count: 2,
    amount: 58.40000000000003,
    fill: "var(--color-food)",
  },
  {
    category: "other",
    count: 1,
    amount: -873.5,
  },
  {
    category: "travel",
    count: 2,
    amount: 629.1999999999999,
  },
  {
    category: "debts",
    count: 1,
    amount: 618.8,
  },
  {
    category: "refunds",
    count: 1,
    amount: -526.1,
  },
  {
    category: "utilities",
    count: 1,
    amount: 333.9,
  },
  {
    category: "healthcare",
    count: 1,
    amount: 957.5,
  },
]
  .sort((a, b) => b.count - a.count)
  .slice(0, 8);

export const CategoriesList = () => {
  const total = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

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
