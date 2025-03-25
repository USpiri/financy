import { prisma } from "@/lib/prisma";
import { Transaction } from "@/models/transaction";

export const getTransactions = async (userID: string) => {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
      where: { userId: userID },
    });

    return { ok: true, transactions };
  } catch (error) {
    return {
      ok: false,
      error: { message: "Error getting transactions", errorRaw: error },
    };
  }
};

export const createTransaction = async (
  { amount, type, description, note, category }: Transaction,
  userID: string,
) => {
  try {
    const transaction = await prisma.transaction.create({
      data: { amount, type, description, note, category, userId: userID },
    });
    return { ok: true, transaction };
  } catch (error) {
    return {
      ok: false,
      error: { message: "Error creating transaction", errorRaw: error },
    };
  }
};

export const updateTransaction = async (
  { amount, type, description, note, category }: Transaction,
  id: string,
) => {
  try {
    const transaction = await prisma.transaction.update({
      where: { id },
      data: { amount, type, description, note, category },
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
