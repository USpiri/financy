import { CategoriesCharts } from "./components/CategoriesCharts";
import { DashboardCards } from "./components/DashboardCards";
import { useEffect } from "react";
import { useSummary } from "@/hooks/useSummary";
import { CategoriesListCard } from "./components/CategoriesListCard";

export const DashboardPage = () => {
  const { loadSummary } = useSummary();

  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <div className="space-y-5">
      <header className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
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
