import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./theme/ThemeProvider";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>{children}</ThemeProvider>
    </BrowserRouter>
  );
};
