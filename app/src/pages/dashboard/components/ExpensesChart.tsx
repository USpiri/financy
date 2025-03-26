import { Label, Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { categoriesChart } from "@/config/category-charts";
import { useMemo } from "react";
import { useSummary } from "@/hooks/useSummary";

export const ExpensesChart = () => {
  const { categoryStats, expenseCount } = useSummary();

  const chartData = useMemo(() => {
    return categoryStats?.map((item) => ({
      ...item,
      amount: item.expense,
      fill: `var(--color-${item.category})`,
    }));
  }, [categoryStats]);

  if (expenseCount === 0)
    return (
      <p className="h-[250px] text-center text-sm font-semibold opacity-50">
        No incomes found.
      </p>
    );

  return (
    <ChartContainer
      config={categoriesChart}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="category"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {expenseCount}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Expenses cat.
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};
