import {
  Transaction,
  TransactionType,
  TransactionCategory,
} from "../models/transaction";
import { hashSync } from "bcryptjs";

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

const notes = [
  "Payment received",
  "Grocery shopping",
  "Rent payment",
  "Freelance income",
  "Netflix subscription",
  "Gym membership",
  "Dinner with friends",
  "Flight ticket",
  "Medical expenses",
  "Clothing purchase",
];

const descriptions = [
  "Paid via credit card",
  "Cash payment",
  "Transferred from savings",
  "Received as a refund",
  "Monthly recurring transaction",
  "One-time purchase",
  "Paid via PayPal",
  "Auto-debited from bank account",
];

const randAmount = (type: TransactionType) => {
  const baseAmount = Math.random() * 1000;
  const amount = Math.round(baseAmount * 10) / 10;
  return type === "expense" ? -amount : amount;
};

const randDescription = () =>
  Math.random() > 0.5
    ? descriptions[Math.floor(Math.random() * descriptions.length)]
    : null;

const randNote = () => notes[Math.floor(Math.random() * notes.length)];

const randCategory = () =>
  categories[Math.floor(Math.random() * categories.length)];

export const generateRandomTransactions = (count: number = 10) => {
  return Array.from({ length: count }).map(() => {
    const type = Math.random() > 0.5 ? "income" : "expense";
    return {
      amount: randAmount(type),
      description: randDescription(),
      note: randNote(),
      category: randCategory(),
      type,
    } as Transaction;
  });
};

export const initalData = {
  users: [
    {
      name: "First",
      lastName: "User",
      email: "first@mail.com",
      password: hashSync("12345678"),
    },
    {
      name: "Second",
      lastName: "User",
      email: "second@mail.com",
      password: hashSync("12345678"),
    },
  ],
};
