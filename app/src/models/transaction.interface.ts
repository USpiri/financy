export type TransactionType = "income" | "expense";
export type TransactionCategory =
  | "salary"
  | "investments"
  | "business"
  | "gifts"
  | "refunds"
  | "food"
  | "transportation"
  | "entertainment"
  | "rent"
  | "utilities"
  | "healthcare"
  | "shopping"
  | "subscriptions"
  | "education"
  | "insurance"
  | "travel"
  | "donations"
  | "debts"
  | "other";

export interface Transaction {
  id: string;
  amount: number;
  description?: string;
  note: string;
  type: TransactionType;
  category: TransactionCategory;
  createdAt: Date;
}
