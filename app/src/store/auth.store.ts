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

export const useAuthStore = create<State>()((set) => ({
  ...initialState,
  login: (user) => set({ status: "authenticated", user }),
  logout: (error) => {
    console.log("logout", error);
    set({ ...initialState, error });
  },
  checkAuth: () => set({ status: "checking" }),
  clearError: () => set({ error: null }),
}));
