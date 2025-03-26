import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/config/category";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useSearchParams } from "react-router";

export const TransactionsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== "null") {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return (
    <>
      <Input
        placeholder="Search..."
        defaultValue={searchParams.get("query") || ""}
        onChange={(e) => updateFilter("query", e.target.value)}
      />
      <Select
        onValueChange={(value) => updateFilter("type", value)}
        defaultValue={searchParams.get("type") || ""}
      >
        <SelectTrigger>
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="max-h-80 rounded-sm">
          <SelectItem value="null">All</SelectItem>
          <SelectItem value="income">Incomes</SelectItem>
          <SelectItem value="expense">Expenses</SelectItem>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => updateFilter("category", value)}
        defaultValue={searchParams.get("category") || ""}
      >
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="max-h-80 rounded-sm">
          <SelectItem value="null">All</SelectItem>
          {CATEGORIES.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
