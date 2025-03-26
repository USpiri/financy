import { prisma } from "@/lib/prisma";
import {
  Transaction,
  TransactionCategory,
  TransactionType,
} from "@/models/transaction";

interface PaginationOptions {
  page?: number;
  take?: number;
  type?: TransactionType;
  category?: TransactionCategory;
  query?: string;
}

export const getTransactions = async (
  userID: string,
  { page = 1, take, type, category, query = "" }: PaginationOptions,
) => {
  if (isNaN(page) || page < 1) page = 1;

  try {
    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        take,
        skip: (page - 1) * (take ?? 0),
        orderBy: { transactionDate: "desc" },
        where: {
          userId: userID,
          category,
          type,
          OR: [
            { note: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
      }),
      prisma.transaction.count({ where: { userId: userID } }),
    ]);

    const totalPages = take ? Math.ceil(total / take) : 1;

    return {
      ok: true,
      transactions,
      pagination: {
        total,
        totalPages,
        pageSize: take,
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
