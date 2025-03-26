import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TransactionType } from "@/models";
import { currency } from "@/utils/currency-format";

interface Props {
  title: string;
  value: number;
  type?: TransactionType;
}

export const DashboardCard = ({ title, value, type }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle
          className={cn(
            "text-2xl font-semibold tabular-nums @[250px]/card:text-3xl",
            type === "expense" && value !== 0 && "text-rose-700",
            type === "income" && value !== 0 && "text-rose-700",
          )}
        >
          {currency(value)}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
