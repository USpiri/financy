import { useSummary } from "@/hooks/useSummary";
import { DashboardCard } from "./DashboardCard";
import { Skeleton } from "@/components/ui/skeleton";

export const DashboardCards = () => {
  const { loading, summary } = useSummary();
  return (
    <>
      {loading ? (
        <>
          <Skeleton className="h-[108px]" />
          <Skeleton className="h-[108px]" />
          <Skeleton className="h-[108px]" />
        </>
      ) : (
        <>
          <DashboardCard
            title="Balance"
            value={(summary!.income || 0) + (summary!.expense || 0)}
          />
          <DashboardCard title="Total Incomes" value={summary!.income || 0} />
          <DashboardCard
            title="Total Expenses"
            value={Math.abs(summary!.expense || 0)}
          />
        </>
      )}
    </>
  );
};
