import { prisma } from "@/lib/prisma";

export const getSummary = async (userId: string) => {
  try {
    const [income, expense, categoryStats] = await Promise.all([
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { userId, type: "income" },
      }),
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { userId, type: "expense" },
      }),
      prisma.transaction.groupBy({
        by: ["category"],
        _count: { _all: true },
        _sum: { amount: true },
        where: { userId },
      }),
    ]);

    const summary = {
      income: income._sum.amount || 0,
      expense: expense._sum.amount || 0,
      categoryStats: categoryStats.map((category) => ({
        category: category.category,
        count: category._count._all,
        amount: category._sum.amount || 0,
      })),
    };

    return { ok: true, summary };
  } catch (error) {
    return {
      ok: false,
      error: { message: "Error getting transactions", errorRaw: error },
    };
  }
};
