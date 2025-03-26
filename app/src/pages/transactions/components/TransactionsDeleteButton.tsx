import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/useTransactions";
import { LoaderCircle, Trash } from "lucide-react";
import { useState } from "react";

interface Props {
  transactionId: string;
}

export const TransactionsDeleteButton = ({ transactionId }: Props) => {
  const { deleteTransaction, loadingAction } = useTransactions();
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="max-sm:size-8"
          onClick={() => setOpen(true)}
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            transaction.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          {loadingAction && (
            <LoaderCircle className="animate-spin opacity-80" />
          )}
          <AlertDialogCancel disabled={loadingAction}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              deleteTransaction(transactionId).then(() => setOpen(false))
            }
            disabled={loadingAction}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
