import { useSummary } from "@/hooks/useSummary";
import { DashboardCard } from "./DashboardCard";
import { Skeleton } from "@/components/ui/skeleton";

export const DashboardCards = () => {
  const { loading, balance, income, expense } = useSummary();
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
          <DashboardCard title="Balance" value={balance} />
          <DashboardCard
            title="Total Incomes"
            value={income ?? 0}
            type="income"
          />
          <DashboardCard
            title="Total Expenses"
            value={expense ?? 0}
            type="expense"
          />
        </>
      )}
    </>
  );
};
