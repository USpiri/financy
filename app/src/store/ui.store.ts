import { create } from "zustand";

interface State {
  isTransactionsOpen: boolean;
  toggleTransactionsModal: (value?: boolean) => void;
}

const initialState = {
  isTransactionsOpen: false,
};

export const useUIStore = create<State>()((set) => ({
  ...initialState,
  toggleTransactionsModal: (value) =>
    set((state) => ({
      isTransactionsOpen: value ?? !state.isTransactionsOpen,
    })),
}));
