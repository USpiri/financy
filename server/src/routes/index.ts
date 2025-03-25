import { Router } from "express";
import { authRouter } from "./auth";
import { summaryRouter } from "./summary";
import { transactionsRouter } from "./transactions";

const router = Router();

router.use("/auth", authRouter);
router.use("/transactions", transactionsRouter);
router.use("/summary", summaryRouter);

export { router as routes };
