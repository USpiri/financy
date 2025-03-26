import { Label, Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { categoriesChart } from "@/config/category-charts";
import { useMemo } from "react";

const data = [
  {
    category: "rent",
    count: 1,
    amount: 879.9,
  },
  {
    category: "food",
    count: 2,
    amount: 58.40000000000003,
    fill: "var(--color-food)",
  },
  {
    category: "other",
    count: 1,
    amount: -873.5,
  },
  {
    category: "travel",
    count: 2,
    amount: 629.1999999999999,
  },
  {
    category: "debts",
    count: 1,
    amount: 618.8,
  },
  {
    category: "refunds",
    count: 1,
    amount: -526.1,
  },
  {
    category: "utilities",
    count: 1,
    amount: 333.9,
  },
  {
    category: "healthcare",
    count: 1,
    amount: 957.5,
  },
];

export const IncomesChart = () => {
  const chartData = useMemo(() => {
    return data
      .filter((i) => i.amount >= 0)
      .map((item) => ({
        ...item,
        amount: Math.abs(item.amount),
        fill: `var(--color-${item.category})`,
      }));
  }, []);

  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
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
                      {totalVisitors.toLocaleString()}
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
