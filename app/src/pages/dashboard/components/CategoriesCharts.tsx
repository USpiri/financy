import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpensesChart } from "./ExpensesChart";
import { IncomesChart } from "./IncomesChart";
import { Link } from "react-router";
import { TotalCountChart } from "./TotalCountChart";
import { useSummary } from "@/hooks/useSummary";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoriesCharts() {
  const { loading } = useSummary();

  return (
    <Card className="flex flex-col">
      <Tabs defaultValue="expenses" className="h-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>Balance by Category</CardTitle>
          <TabsList className="mt-2 flex w-full gap-2">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="incomes">Incomes</TabsTrigger>
            <TabsTrigger value="total">Total Count</TabsTrigger>
          </TabsList>
        </CardHeader>
        {loading ? (
          <CardContent>
            <Skeleton className="h-72" />
          </CardContent>
        ) : (
          <CardContent className="flex-1 pb-0">
            <>
              <TabsContent value="expenses">
                <ExpensesChart />
              </TabsContent>
              <TabsContent value="incomes">
                <IncomesChart />
              </TabsContent>
              <TabsContent value="total">
                <TotalCountChart />
              </TabsContent>
            </>
          </CardContent>
        )}
        <CardFooter className="flex-col gap-2 text-sm">
          <Link
            to="/transactions"
            className="flex items-center gap-2 leading-none font-medium hover:underline"
          >
            See all transactions
          </Link>
        </CardFooter>
      </Tabs>
    </Card>
  );
}
