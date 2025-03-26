import { Outlet } from "react-router";
import { Navbar } from "../navbar/Navbar";
import { Footer } from "../footer/Footer";
import { TransactionDialog } from "../transaction-dialog/TransactionDialog";

export const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="mx-auto w-full max-w-5xl p-4">
        <Outlet />
      </main>
      <Footer />
      <TransactionDialog />
    </div>
  );
};
