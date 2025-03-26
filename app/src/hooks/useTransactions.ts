import { useTransactionStore } from "@/store/transactions.store";
import { getHeaders } from "@/utils/get-headers";
import { useState } from "react";

export const useTransactions = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const loading = useTransactionStore((state) => state.loading);
  const error = useTransactionStore((state) => state.error);
  const active = useTransactionStore((state) => state.activeTransaction);
  const [loadingAction, setLoadingAction] = useState(false);

  const load = useTransactionStore((state) => state.loadTransactions);
  const update = useTransactionStore((state) => state.updateTransaction);
  const setActive = useTransactionStore((state) => state.setActive);
  const deleteTransactionStore = useTransactionStore(
    (state) => state.deleteTransaction,
  );
  const add = useTransactionStore((state) => state.addTransaction);
  const clear = useTransactionStore((state) => state.clearTransactions);
  const onError = useTransactionStore((state) => state.onError);

  const loadTransactions = async () => {
    const { ok, transactions, error } = await fetch("/api/transactions", {
      headers: { ...getHeaders() },
    }).then((res) => res.json());

    if (ok) {
      load(transactions);
    } else {
      onError(error);
    }
  };

  const deleteTransaction = async (id: string) => {
    setLoadingAction(true);
    const { ok, error } = await fetch(`/api/transactions/${id}`, {
      method: "DELETE",
      headers: { ...getHeaders() },
    }).then((res) => res.json());

    if (ok) {
      deleteTransactionStore(id);
    } else {
      onError(error);
    }
    setLoadingAction(false);
  };

  // const clear = useSummaryStore((state) => state.clearSummary);
  // const onError = useSummaryStore((state) => state.onError);
  //
  // const loadSummary = async () => {
  //   const { ok, summary, error } = await fetch("/api/summary", {
  //     headers: { ...getHeaders() },
  //   }).then((res) => res.json());
  //
  //   if (ok) {
  //     load(summary);
  //   } else {
  //     onError(error);
  //   }
  // };

  return {
    transactions,
    loading,
    loadingAction,
    error,
    active,
    loadTransactions,
    deleteTransaction,
  };
};
