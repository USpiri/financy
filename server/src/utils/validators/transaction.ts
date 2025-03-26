import { TransactionCategory, TransactionType } from "@/models/transaction";
import { check } from "express-validator";
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

export const isValidTransaction = [
  check("note", "Note is required").notEmpty(),
  check("category").notEmpty(),
  check("category").custom(isValidTransactionCategory),
  check("amount", "Amount is required").notEmpty(),
  check("amount", "Amount must be a Number").isFloat(),
  check("amount", "Amount must be a positive number").isFloat({ gt: 0 }),
  check("type", "Type is required").notEmpty(),
  check("type", "Type must be a valid type").custom(isValidTransactionType),
];
