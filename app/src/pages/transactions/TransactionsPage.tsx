import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTransactions } from "@/hooks/useTransactions";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { TransactionsTable } from "./components/TransactionsTable";
import { useUIStore } from "@/store/ui.store";

export const TransactionsPage = () => {
  const { loadTransactions, loading } = useTransactions();
  const toggleTransactions = useUIStore(
    (state) => state.toggleTransactionsModal,
  );

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div className="space-y-5">
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
      <section className="">
        <Card className="p-3">
          <CardContent className="px-2">
            {loading ? (
              <p className="w-full text-center text-sm">Loading...</p>
            ) : (
              <TransactionsTable />
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
