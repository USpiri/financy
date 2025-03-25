import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "@/controllers/transactions";
import { Router } from "express";

const router = Router();

router.get("/", getTransactions);
router.post("/", createTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export { router as transactionsRouter };
