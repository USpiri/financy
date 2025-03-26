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
const initialState = {
  status: "not-authenticated" as AuthStatus,
  error: null,
  user: null,
};

const init = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "null");
  return {
    ...initialState,
    status: (user ? "authenticated" : "not-authenticated") as AuthStatus,
    user: user || null,
  };
};

export const useAuthStore = create<State>()((set) => ({
  ...init(),
  login: (user) => set({ status: "authenticated", user }),
  logout: (error) => set({ ...initialState, error }),
  checkAuth: () => set({ status: "checking" }),
  clearError: () => set({ error: null }),
}));
