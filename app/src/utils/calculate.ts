export const calculateUndefinedBalance = (income?: number, expense?: number) =>
  (income || 0) - (expense || 0);
