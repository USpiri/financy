import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "@/controllers/transactions";
import { validateJWT } from "@/middlewares/jwt";
import { validator } from "@/middlewares/validator";
import {
  isValidTransactionCategory,
  isValidTransactionType,
} from "@/utils/validators/transaction";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

router.get("/", validateJWT, getTransactions);
router.post(
  "/",
  validateJWT,
  [
    check("note", "Note is required").notEmpty(),
    check("category").notEmpty(),
    check("category").custom(isValidTransactionCategory),
    check("amount", "Amount is required").notEmpty(),
    check("type", "Type is required").notEmpty(),
    check("type", "Type must be a valid type").custom(isValidTransactionType),
    validator,
  ],
  createTransaction,
);
router.put(
  "/:id",
  validateJWT,
  [
    check("note", "Note is required").notEmpty(),
    check("category").notEmpty(),
    check("category").custom(isValidTransactionCategory),
    check("amount", "Amount is required").notEmpty(),
    check("type", "Type is required").notEmpty(),
    check("type", "Type must be a valid type").custom(isValidTransactionType),
    validator,
  ],
  updateTransaction,
);
router.delete("/:id", validateJWT, deleteTransaction);

export { router as transactionsRouter };
