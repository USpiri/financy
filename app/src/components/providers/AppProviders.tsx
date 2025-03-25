import { BrowserRouter } from "react-router";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
