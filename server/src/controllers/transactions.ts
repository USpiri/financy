import { handleError } from "@/utils/handleError";
import { Request, Response } from "express";

export const getTransactions = async (_req: Request, res: Response) => {
  try {
    res.send("/transactions");
  } catch (error) {
    handleError(res, "Error getting transactions", { errorRaw: error });
  }
};

export const createTransaction = async (_req: Request, res: Response) => {
  try {
    res.send("/transactions");
  } catch (error) {
    handleError(res, "Error creating transaction", { errorRaw: error });
  }
};

export const updateTransaction = async (_req: Request, res: Response) => {
  try {
    res.send("/transactions/:id");
  } catch (error) {
    handleError(res, "Error updating transaction", { errorRaw: error });
  }
};

export const deleteTransaction = async (_req: Request, res: Response) => {
  try {
    res.send("/transactions/:id");
  } catch (error) {
    handleError(res, "Error deleting transaction", { errorRaw: error });
  }
};
