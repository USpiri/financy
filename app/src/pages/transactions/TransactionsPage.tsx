import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTransactions } from "@/hooks/useTransactions";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { TransactionsTable } from "./components/TransactionsTable";
import { useUIStore } from "@/store/ui.store";
import { Link, useSearchParams } from "react-router";
import { TransactionsFilters } from "./components/TransactionsFilters";

export const TransactionsPage = () => {
  const { debouncedLoadTransactions, loading, transactions } =
    useTransactions();
  const toggleTransactions = useUIStore(
    (state) => state.toggleTransactionsModal,
  );
  const [searchParams] = useSearchParams();

  useEffect(() => {
    debouncedLoadTransactions();
  }, [searchParams]);

  return (
    <div>
      <header className="mt-4 flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <Button
          variant="default"
          className="max-sm:hidden"
          onClick={() => toggleTransactions(true)}
        >
          <Plus /> Add Transaction
        </Button>
      </header>
      <p className="-mt-1">
        <Link to="/" className="text-sm opacity-80 hover:underline">
          Go to Dashboard
        </Link>
      </p>
      <div className="mt-5 flex gap-2">
        <TransactionsFilters />
      </div>
      <section className="mt-5">
        <Card className="p-3">
          <CardContent className="px-2">
            {loading ? (
              <p className="w-full text-center text-sm">Loading...</p>
            ) : transactions.length === 0 ? (
              <p className="text-center text-sm">No transactions found.</p>
            ) : (
              <TransactionsTable />
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
