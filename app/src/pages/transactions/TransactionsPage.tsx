import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currency } from "@/utils/currency-format";
import { PencilLine, Plus, Trash } from "lucide-react";

const data = [
  {
    id: "721646a4-1712-47ff-8897-ce7c58436fa5",
    amount: 879.9,
    description: "Transferred from savings",
    note: "Clothing purchase",
    category: "rent",
    type: "income",
    createdAt: "2025-03-25T20:39:13.454Z",
    updatedAt: "2025-03-25T20:39:13.454Z",
    userId: "ec4545d4-7636-41d4-bb8e-0b8815f7de06",
  },
  {
    id: "9af9717f-3b9c-496e-92b5-11379116e475",
    amount: -873.5,
    description: null,
    note: "Rent payment",
    category: "other",
    type: "expense",
    createdAt: "2025-03-25T20:39:13.454Z",
    updatedAt: "2025-03-25T20:39:13.454Z",
    userId: "ec4545d4-7636-41d4-bb8e-0b8815f7de06",
  },
  {
    id: "9bb41fd5-b259-465e-8d07-3f77072bc431",
    amount: 333.9,
    description: "One-time purchase",
    note: "Gym membership",
    category: "utilities",
    type: "income",
    createdAt: "2025-03-25T20:39:13.454Z",
    updatedAt: "2025-03-25T20:39:13.454Z",
    userId: "ec4545d4-7636-41d4-bb8e-0b8815f7de06",
  },
  {
    id: "aa595645-cc11-403c-a382-5d8324b55264",
    amount: 618.8,
    description: null,
    note: "Grocery shopping",
    category: "debts",
    type: "income",
    createdAt: "2025-03-25T20:39:13.454Z",
    updatedAt: "2025-03-25T20:39:13.454Z",
    userId: "ec4545d4-7636-41d4-bb8e-0b8815f7de06",
  },
  {
    id: "8a32892a-3b4a-49b1-9716-1f84ca453113",
    amount: -170.6,
    description: null,
    note: "Freelance income",
    category: "travel",
    type: "expense",
    createdAt: "2025-03-25T20:39:13.454Z",
    updatedAt: "2025-03-25T20:39:13.454Z",
    userId: "ec4545d4-7636-41d4-bb8e-0b8815f7de06",
  },
  {
    id: "6bb22653-983a-42d4-a093-d43cf7dbe03b",
    amount: 957.5,
    description: null,
    note: "Grocery shopping",
    category: "healthcare",
    type: "income",
    createdAt: "2025-03-25T20:39:13.454Z",
    updatedAt: "2025-03-25T20:39:13.454Z",
    userId: "ec4545d4-7636-41d4-bb8e-0b8815f7de06",
  },
  {
    id: "b572f2f3-3937-4a01-a2e0-2ce2c89590be",
    amount: -526.1,
    description: null,
    note: "Medical expenses",
    category: "refunds",
    type: "expense",
    createdAt: "2025-03-25T20:39:13.454Z",
    updatedAt: "2025-03-25T20:39:13.454Z",
    userId: "ec4545d4-7636-41d4-bb8e-0b8815f7de06",
  },
  {
    id: "a2a01e97-73d2-481b-8763-a9749a674eb1",
    amount: 799.8,
    description: null,
    note: "Flight ticket",
    category: "travel",
    type: "income",
    createdAt: "2025-03-25T20:39:13.454Z",
    updatedAt: "2025-03-25T20:39:13.454Z",
    userId: "ec4545d4-7636-41d4-bb8e-0b8815f7de06",
  },
  {
    id: "a81e885c-a310-4b11-932b-4c1acb273731",
    amount: 489.1,
    description: null,
    note: "Flight ticket",
    category: "food",
    type: "income",
    createdAt: "2025-03-25T20:39:13.454Z",
    updatedAt: "2025-03-25T20:39:13.454Z",
    userId: "ec4545d4-7636-41d4-bb8e-0b8815f7de06",
  },
  {
    id: "76546e77-9bb5-449a-ac3d-f225d3baa404",
    amount: -430.7,
    description: "Paid via PayPal",
    note: "Flight ticket",
    category: "food",
    type: "expense",
    createdAt: "2025-03-25T20:39:13.454Z",
    updatedAt: "2025-03-25T20:39:13.454Z",
    userId: "ec4545d4-7636-41d4-bb8e-0b8815f7de06",
  },
];

export const TransactionsPage = () => {
  return (
    <div className="space-y-5">
      <header className="mt-4 flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <Button variant="default" className="max-sm:hidden">
          <Plus /> Add Transaction
        </Button>
      </header>
      <section className="">
        <Card className="p-3">
          <CardContent className="px-2">
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
                      {new Date(transaction.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </TableCell>
                    <TableCell className="font-mono tabular-nums">
                      {currency(transaction.amount)}
                    </TableCell>
                    <TableCell className="flex justify-end gap-2 text-right">
                      <Button
                        variant="outline"
                        size="icon"
                        className="max-sm:size-8"
                      >
                        <PencilLine />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="max-sm:size-8"
                      >
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
