import { useThemeStore } from "@/store/theme.store";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const theme = useThemeStore((store) => store.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    const systemMedia = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const systemDark = systemMedia.matches;
      if (theme === "dark" || (theme === "system" && systemDark)) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };
    applyTheme();

    if (theme === "system") {
      systemMedia.addEventListener("change", applyTheme);
    }
    return () => systemMedia.removeEventListener("change", applyTheme);
  }, [theme]);

  return <>{children}</>;
};
