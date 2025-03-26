import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTransactions } from "@/hooks/useTransactions";
import { currency } from "@/utils/currency-format";
import { PencilLine } from "lucide-react";
import { TransactionsDeleteButton } from "./TransactionsDeleteButton";
import { cn } from "@/lib/utils";

export const TransactionsTable = () => {
  const { transactions: data, setActiveTransaction } = useTransactions();
  return (
    <Table>
      <TableCaption>A list of your recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="max-sm:hidden">Invoice</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="max-sm:hidden">Category</TableHead>
          <TableHead className="max-sm:hidden">Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="max-sm:text-sm">
        {data.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-mono uppercase opacity-70 max-sm:hidden">
              {transaction.id.slice(0, 5)}
            </TableCell>
            <TableCell>{transaction.note}</TableCell>
            <TableCell className="capitalize opacity-70 max-sm:hidden">
              {transaction.category}
            </TableCell>
            <TableCell className="opacity-70 max-sm:hidden">
              {new Date(transaction.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </TableCell>
            <TableCell
              className={cn(
                "font-mono tabular-nums opacity-95",
                transaction.type === "expense"
                  ? "text-rose-500"
                  : "text-emerald-500",
              )}
            >
              {currency(transaction.amount)}
            </TableCell>
            <TableCell className="flex justify-end gap-2 text-right">
              <Button
                variant="outline"
                size="icon"
                className="max-sm:size-8"
                onClick={() => setActiveTransaction(transaction)}
              >
                <PencilLine />
              </Button>
              <TransactionsDeleteButton transactionId={transaction.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
