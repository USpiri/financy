import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoriesList } from "./CategoriesList";
import { useSummary } from "@/hooks/useSummary";
import { Skeleton } from "@/components/ui/skeleton";

export const CategoriesListCard = () => {
  const { loading } = useSummary();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Most used categories</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? <Skeleton className="h-80" /> : <CategoriesList />}
      </CardContent>
    </Card>
  );
};
