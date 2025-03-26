import { TransactionCategory } from "./transaction.interface";

interface CategoryStats {
  category: TransactionCategory;
  count: number;
  income: number;
  expense: number;
  incomeCount: number;
  expenseCount: number;
}

export interface Summary {
  income: number;
  expense: number;
  incomeCount: number;
  expenseCount: number;
  categoryStats: CategoryStats[];
}
