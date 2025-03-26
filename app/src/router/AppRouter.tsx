import { MainLayout } from "@/components/layouts/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { TransactionsPage } from "@/pages/transactions/TransactionsPage";
import { useEffect } from "react";
import { Navigate } from "react-router";
import { Route, Routes } from "react-router";

export const AppRouter = () => {
  const { status, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Routes>
      {status !== "authenticated" ? (
        <>
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="auth/register" element={<RegisterPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Route>
        </>
      )}
    </Routes>
  );
};
