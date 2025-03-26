import { prisma } from "@/lib/prisma";
import {
  Transaction,
  TransactionCategory,
  TransactionType,
} from "@/models/transaction";
import { Prisma } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  type?: string;
  category?: string;
  query?: string;
}

export const getTransactions = async (
  userID: string,
  { page = 1, take, type, category, query = "" }: PaginationOptions,
) => {
  if (isNaN(page) || page < 1) page = 1;

  const filters: Prisma.TransactionWhereInput = { userId: userID };
  if (category) filters.category = category as TransactionCategory;
  if (type) filters.type = type as TransactionType;
  if (query) {
    filters.OR = [
      { note: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  try {
    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        take: take || undefined,
        skip: (page - 1) * (take || 1),
        orderBy: { transactionDate: "desc" },
        where: filters,
      }),
      prisma.transaction.count({ where: filters }),
    ]);

    const totalPages = take ? Math.ceil(total / (take || 1)) : 1;

    return {
      ok: true,
      transactions,
      pagination: {
        total,
        totalPages,
        pageSize: Math.min(take || total, total),
        currentPage: page,
      },
    };
  } catch (error) {
    return {
      ok: false,
      error: { message: "Error getting transactions", errorRaw: error },
    };
  }
};

export const createTransaction = async (
  { amount, type, description, note, category, transactionDate }: Transaction,
  userID: string,
) => {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount.toString()),
        type,
        description,
        note,
        category,
        transactionDate: transactionDate ?? new Date(),
        userId: userID,
      },
    });
    return { ok: true, transaction };
  } catch (error) {
    return {
      ok: false,
      error: {
        message: "Error creating transaction",
        errorRaw: error,
      },
    };
  }
};

export const updateTransaction = async (
  { amount, type, description, note, category, transactionDate }: Transaction,
  id: string,
) => {
  try {
    const transaction = await prisma.transaction.update({
      where: { id },
      data: {
        amount,
        type,
        description,
        note,
        category,
        transactionDate: transactionDate ?? new Date(),
      },
    });
    return { ok: true, transaction };
  } catch (error) {
    return {
      ok: false,
      error: { message: "Error updating transaction", errorRaw: error },
    };
  }
};

export const deleteTransaction = async (id: string, userId: string) => {
  try {
    const result = await prisma.transaction.delete({ where: { id, userId } });
    return { ok: true, result };
  } catch (error) {
    return {
      ok: false,
      error: { message: "Error deleting transaction", errorRaw: error },
    };
  }
};
