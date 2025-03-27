import { prisma } from "../lib/prisma";

export const getSummary = async (userId: string) => {
  try {
    const [income, expense, categoryStats] = await Promise.all([
      prisma.transaction.aggregate({
        _sum: { amount: true },
        _count: { _all: true },
        where: { userId, type: "income" },
      }),
      prisma.transaction.aggregate({
        _sum: { amount: true },
        _count: { _all: true },
        where: { userId, type: "expense" },
      }),
      prisma.transaction.groupBy({
        by: ["category", "type"],
        _count: { _all: true },
        _sum: { amount: true },
        where: { userId },
      }),
    ]);

    const categoryMap = categoryStats.reduce(
      (acc, { category, type, _count, _sum }) => {
        acc[category] = acc[category] || {
          category,
          income: 0,
          expense: 0,
          incomeCount: 0,
          expenseCount: 0,
          count: 0,
        };

        acc[category][type] = _sum.amount || 0;
        acc[category][`${type}Count`] = _count._all;
        acc[category].count += _count._all;

        return acc;
      },
      {} as Record<
        string,
        {
          category: string;
          income: number;
          expense: number;
          count: number;
          incomeCount: number;
          expenseCount: number;
        }
      >,
    );

    const summary = {
      income: income._sum.amount || 0,
      expense: expense._sum.amount || 0,
      incomeCount: income._count._all || 0,
      expenseCount: expense._count._all || 0,
      categoryStats: Object.values(categoryMap),
    };

    return { ok: true, summary };
  } catch (error) {
    return {
      ok: false,
      error: { message: "Error getting transactions", errorRaw: error },
    };
  }
};
