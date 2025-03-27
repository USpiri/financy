import { Transaction } from "@/models";
import { useTransactionStore } from "@/store/transactions.store";
import { useUIStore } from "@/store/ui.store";
import { getHeaders } from "@/utils/get-headers";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { useDebouncedCallback } from "use-debounce";

export const useTransactions = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const loading = useTransactionStore((state) => state.loading);
  const error = useTransactionStore((state) => state.error);
  const active = useTransactionStore((state) => state.activeTransaction);
  const pagination = useTransactionStore((state) => state.pagination);
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
  const setPagination = useTransactionStore((state) => state.setPagination);
  // const clear = useTransactionStore((state) => state.clearTransactions);
  const onError = useTransactionStore((state) => state.onError);

  const [loadingAction, setLoadingAction] = useState(false);
  const [searchParams] = useSearchParams();

  const loadTransactions = async () => {
    if (!searchParams.get("take")) {
      searchParams.set("take", "5");
    }

    const { ok, transactions, error, pagination } = await fetch(
      `/api/transactions?${searchParams.toString()}`,
      {
        headers: { ...getHeaders() },
      },
    ).then((res) => res.json());

    if (ok) {
      load(transactions);
      setPagination(pagination);
    } else {
      onError(error);
    }
  };

  const debouncedLoadTransactions = useDebouncedCallback(loadTransactions, 300);

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

    setLoadingAction(false);
  };

  const setActiveTransaction = (transaction: Transaction) => {
    setActive(transaction);
    toggleTransactionForm(true);
  };

  return {
    transactions,
    loading,
    loadingAction,
    error,
    active,
    pagination,

    loadTransactions,
    deleteTransaction,
    createTransaction,
    setActiveTransaction,
    updateTransaction,
    setPagination,

    debouncedLoadTransactions,
  };
};
