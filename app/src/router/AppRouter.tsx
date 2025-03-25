import { LoginPage } from "@/pages/auth/LoginPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { TransactionsPage } from "@/pages/transactions/TransactionsPage";
import { useState } from "react";
import { Navigate } from "react-router";
import { Route, Routes } from "react-router";

export const AppRouter = () => {
  const [status] = useState<"not-authenticated" | "checking" | "authenticated">(
    "not-authenticated",
  );
  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="auth" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth" />} />
        </>
      ) : (
        <>
          <Route index element={<DashboardPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
