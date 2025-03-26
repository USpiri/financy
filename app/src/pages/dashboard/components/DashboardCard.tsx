import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { currency } from "@/utils/currency-format";

interface Props {
  title: string;
  value: number;
}

export const DashboardCard = ({ title, value }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle
          className={cn(
            "text-2xl font-semibold tabular-nums @[250px]/card:text-3xl",
            value < 0 && "text-rose-700",
          )}
        >
          {currency(value)}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
