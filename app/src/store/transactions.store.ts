import { Transaction } from "@/models";
import { create } from "zustand";

interface State {
  loading: boolean;
  transactions: Transaction[];
  activeTransaction: Transaction | null;
  error: string | null;

  loadTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  setActive: (transaction: Transaction | null) => void;
  clearTransactions: () => void;
  onError: (error?: string) => void;
}

const initialState = {
  loading: true,
  error: null,
  transactions: [],
  activeTransaction: null,
};

export const useTransactionStore = create<State>()((set, get) => ({
  ...initialState,

  loadTransactions: (transactions) =>
    set({ loading: false, transactions, error: null }),

  setActive: (transaction) => set({ activeTransaction: transaction }),

  updateTransaction: (transaction) => {
    const { transactions } = get();
    set({
      transactions: transactions.map((t) =>
        t.id === transaction.id ? transaction : t,
      ),
    });
  },

  addTransaction: (transaction) => {
    const { transactions } = get();
    set({ transactions: [transaction, ...transactions] });
  },

  deleteTransaction: (id) => {
    const { transactions } = get();
    set({
      transactions: transactions.filter((t) => t.id !== id),
    });
  },

  onError: (error) => set({ ...initialState, error }),
  clearTransactions: () => set(initialState),
}));
