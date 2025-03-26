import { CategoriesCharts } from "./components/CategoriesCharts";
import { DashboardCards } from "./components/DashboardCards";
import { useEffect } from "react";
import { useSummary } from "@/hooks/useSummary";
import { CategoriesListCard } from "./components/CategoriesListCard";
import { useUIStore } from "@/store/ui.store";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router";

export const DashboardPage = () => {
  const { loadSummary } = useSummary();
  const { user } = useAuth();
  const isTransactionsOpen = useUIStore((store) => store.isTransactionsOpen);

  useEffect(() => {
    loadSummary();
  }, [isTransactionsOpen]);

  return (
    <div className="space-y-5">
      <header className="mt-4 flex items-end justify-between sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm font-semibold opacity-80">
            Welcome {user?.name} {user?.lastName}
          </p>
        </div>
        <div>
          <Link
            to="/transactions"
            className="text-sm opacity-60 hover:underline hover:opacity-80 sm:me-8"
          >
            See transactions
          </Link>
        </div>
      </header>
      <section className="flex justify-between gap-2 *:flex-1 max-sm:flex-col">
        <DashboardCards />
      </section>
      <section className="grid gap-4 md:grid-cols-2 md:gap-2">
        <CategoriesCharts />
        <CategoriesListCard />
      </section>
    </div>
  );
};
