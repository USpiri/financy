import { Label, Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { categoriesChart } from "@/config/category-charts";
import { useMemo } from "react";
import { useSummary } from "@/hooks/useSummary";

export const IncomesChart = () => {
  const { summary } = useSummary();
  const chartData = useMemo(() => {
    return summary?.categoryStats
      .filter((i) => i.amount >= 0)
      .map((item) => ({
        ...item,
        amount: Math.abs(item.amount),
        fill: `var(--color-${item.category})`,
      }));
  }, [summary]);

  const total = useMemo(() => {
    return chartData?.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);
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
                      {(total ?? "").toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Incomes
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
