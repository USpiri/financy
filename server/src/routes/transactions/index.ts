import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "../../controllers/transactions";
import { validateJWT } from "../../middlewares/jwt";
import { validator } from "../../middlewares/validator";
import { isValidTransaction } from "../../utils/validators/transaction";
import { Router } from "express";

const router = Router();

router.get("/", validateJWT, getTransactions);
router.post(
  "/",
  validateJWT,
  [...isValidTransaction, validator],
  createTransaction,
);
router.put(
  "/:id",
  validateJWT,
  [...isValidTransaction, validator],
  updateTransaction,
);
router.delete("/:id", validateJWT, deleteTransaction);

export { router as transactionsRouter };
