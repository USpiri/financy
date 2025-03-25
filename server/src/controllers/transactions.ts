import { handleError } from "@/utils/handleError";
import { Request, Response } from "express";
import { createTransaction as createTransactionAction } from "@/services/transactions";
import { Transaction } from "@/models/transaction";

// model Transaction {
//   id          String              @id @default(uuid())
//   amount      Float
//   description String?
//   note        String
//   category    TransactionCategory
//   type        TransactionType
//   createdAt   DateTime            @default(now())
//   updatedAt   DateTime            @updatedAt
//
//   user   User   @relation(fields: [userId], references: [id])
//   userId String
//
//   @@index([type])
//   @@index([category])
// }

export const getTransactions = async (_req: Request, res: Response) => {
  try {
    res.send("/transactions");
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

    if (!status.ok || !status.transaction) {
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
