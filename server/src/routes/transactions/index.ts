import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "@/controllers/transactions";
import { validateJWT } from "@/middlewares/jwt";
import { Router } from "express";

const router = Router();

router.get("/", validateJWT, getTransactions);
router.post("/", validateJWT, createTransaction);
router.put("/:id", validateJWT, updateTransaction);
router.delete("/:id", validateJWT, deleteTransaction);

export { router as transactionsRouter };
