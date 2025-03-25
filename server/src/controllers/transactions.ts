import { handleError } from "@/utils/handleError";
import { Request, Response } from "express";
import {
  createTransaction as createTransactionAction,
  getTransactions as getTransactionsAction,
  updateTransaction as updateTransactionAction,
  deleteTransaction as deleteTransactionAction,
} from "@/services/transactions";
import { Transaction } from "@/models/transaction";

export const getTransactions = async (req: Request, res: Response) => {
  const { uid } = req.body;
  try {
    const status = await getTransactionsAction(uid);

    if (!status.ok) {
      return handleError(res, status.error!.message, {
        errorRaw: status.error?.errorRaw,
      });
    }

    res.status(200).send({ ...status });
  } catch (error) {
    handleError(res, "Error getting transactions", { errorRaw: error });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  const { uid, amount, description, type, note, category } = req.body;
  try {
    const status = await createTransactionAction(
      { amount, description, type, note, category } as Transaction,
      uid,
    );

    if (!status.ok) {
      return handleError(res, status.error!.message, {
        code: 401,
        errorRaw: status.error?.errorRaw,
      });
    }

    res.status(200).send({ ...status });
  } catch (error) {
    handleError(res, "Error creating transaction", { errorRaw: error });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  const { amount, description, type, note, category } = req.body;
  const { id } = req.params;

  const status = await updateTransactionAction(
    { amount, description, type, note, category } as Transaction,
    id,
  );

  if (!status.ok) {
    return handleError(res, status.error!.message, {
      code: 401,
      errorRaw: status.error?.errorRaw,
    });
  }

  res.status(200).send({ ...status });

  try {
    res.send("/transactions/:id");
  } catch (error) {
    handleError(res, "Error updating transaction", { errorRaw: error });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { uid } = req.body;

  try {
    const status = await deleteTransactionAction(id, uid);
    if (!status.ok) {
      return handleError(res, status.error!.message, {
        errorRaw: status.error?.errorRaw,
      });
    }

    res.status(200).send({ ...status });
  } catch (error) {
    handleError(res, "Error deleting transaction", { errorRaw: error });
  }
};
