import { useTransactions } from "@/hooks/useTransactions";
import { TransactionForm } from "../transaction-form/TransactionForm";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { useUIStore } from "@/store/ui.store";
import { useTransactionStore } from "@/store/transactions.store";

export const TransactionDialog = () => {
  const isOpen = useUIStore((state) => state.isTransactionsOpen);
  const setOpen = useUIStore((state) => state.toggleTransactionsModal);
  const setActiveTransaction = useTransactionStore((state) => state.setActive);

  const onOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) setActiveTransaction(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add new transaction</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>
        <TransactionForm />
      </DialogContent>
    </Dialog>
  );
};
