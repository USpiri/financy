import { TransactionCategory } from "./transaction.interface";

interface CategoryStats {
  category: TransactionCategory;
  count: number;
  amount: number;
}

export interface Summary {
  income: number;
  expense: number;
  categoryStats: CategoryStats[];
}
