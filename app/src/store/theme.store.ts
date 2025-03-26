import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeType = "system" | "dark" | "light";

interface ThemeStore {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => {
        set({ theme });
      },
    }),
    {
      name: "theme",
    },
  ),
);
