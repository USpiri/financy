import { Transaction } from "@/models";
import { useTransactionStore } from "@/store/transactions.store";
import { useUIStore } from "@/store/ui.store";
import { getHeaders } from "@/utils/get-headers";
import { useState } from "react";

export const useTransactions = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const loading = useTransactionStore((state) => state.loading);
  const error = useTransactionStore((state) => state.error);
  const active = useTransactionStore((state) => state.activeTransaction);
  const [loadingAction, setLoadingAction] = useState(false);
  const toggleTransactionForm = useUIStore(
    (state) => state.toggleTransactionsModal,
  );

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
    setActive(null);
  };

  const createTransaction = async (newTransaction: Partial<Transaction>) => {
    setLoadingAction(true);
    const { ok, error, transaction } = await fetch(`/api/transactions/`, {
      method: "POST",
      headers: { ...getHeaders() },
      body: JSON.stringify({ ...newTransaction }),
    }).then((res) => res.json());

    if (ok) {
      add(transaction);
    } else {
      console.log(error);
      onError(error);
    }
    setLoadingAction(false);
    setActive(null);
  };

  const updateTransaction = async (data: Partial<Transaction>) => {
    const newTransaction = {
      ...active,
      ...data,
    };

    setLoadingAction(true);
    const { ok, error, transaction } = await fetch(
      `/api/transactions/${newTransaction.id}`,
      {
        method: "PUT",
        headers: { ...getHeaders() },
        body: JSON.stringify({ ...newTransaction }),
      },
    ).then((res) => res.json());

    if (ok) {
      update(transaction);
    } else {
      console.log(error);
      onError(error);
    }

    setActive(null);
    setLoadingAction(false);
  };

  const setActiveTransaction = (transaction: Transaction) => {
    setActive(transaction);
    toggleTransactionForm(true);
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
    createTransaction,
    setActiveTransaction,
    updateTransaction,
  };
};
