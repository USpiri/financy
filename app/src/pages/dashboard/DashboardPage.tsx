import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CategoriesCharts } from "./components/CategoriesCharts";
import { CategoriesList } from "./components/CategoriesList";

export const DashboardPage = () => {
  return (
    <div className="space-y-5">
      <header className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </header>
      <section className="flex justify-between gap-2 *:flex-1 max-sm:flex-col">
        <Card>
          <CardHeader>
            <CardDescription>Balance</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              $1,250.00
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total Incomes</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              $1,250.00
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total Expenses</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              $1,250.00
            </CardTitle>
          </CardHeader>
        </Card>
      </section>
      <section className="grid gap-4 md:grid-cols-2 md:gap-2">
        <CategoriesCharts />
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoriesList />
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
