import { Summary } from "@/models";
import { create } from "zustand";

interface State {
  loading: boolean;
  summary: Summary | null;
  error: string | null;

  loadSummary: (summary: Summary) => void;
  clearSummary: () => void;
  onError: (error?: string) => void;
}

const initialState = {
  loading: true,
  error: null,
  summary: null,
};

export const useSummaryStore = create<State>()((set) => ({
  ...initialState,
  loadSummary: (summary) => set({ loading: false, summary, error: null }),
  onError: (error) => set({ ...initialState, error }),
  clearSummary: () => set(initialState),
}));
