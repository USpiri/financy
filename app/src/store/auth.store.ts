import { User } from "@/models";
import { create } from "zustand";

type AuthStatus = "not-authenticated" | "checking" | "authenticated";

interface State {
  status: AuthStatus;
  error: string | null;
  user: User | null;

  login: (user: User) => void;
  logout: (error?: string) => void;
  checkAuth: () => void;
  clearError: () => void;
}

const initialState = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "null");
  return {
    status: (user ? "authenticated" : "not-authenticated") as AuthStatus,
    error: null,
    user: user || null,
  };
};

export const useAuthStore = create<State>()((set) => ({
  ...initialState(),
  login: (user) => set({ status: "authenticated", user }),
  logout: (error) => set({ ...initialState, error }),
  checkAuth: () => set({ status: "checking" }),
  clearError: () => set({ error: null }),
}));
