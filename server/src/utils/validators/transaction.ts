import { TransactionCategory, TransactionType } from "@/models/transaction";
const categories: TransactionCategory[] = [
  "salary",
  "investments",
  "business",
  "gifts",
  "refunds",
  "food",
  "transportation",
  "entertainment",
  "rent",
  "utilities",
  "healthcare",
  "shopping",
  "subscriptions",
  "education",
  "insurance",
  "travel",
  "donations",
  "debts",
  "other",
];

export const isValidTransactionCategory = (
  value: string,
): value is TransactionCategory => {
  return categories.includes(value as TransactionCategory);
};

export const isValidTransactionType = (
  value: string,
): value is TransactionType => {
  return value === "income" || value === "expense";
};
