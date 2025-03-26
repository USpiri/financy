import { TransactionForm } from "../transaction-form/TransactionForm";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { useUIStore } from "@/store/ui.store";

export const TransactionDialog = () => {
  const isOpen = useUIStore((state) => state.isTransactionsOpen);
  const setOpen = useUIStore((state) => state.toggleTransactionsModal);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
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
