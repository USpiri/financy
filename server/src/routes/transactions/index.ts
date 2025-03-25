import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.send("/transactions");
});
router.post("/", (_req, res) => {
  res.send("/transactions");
});
router.put("/:id", (_req, res) => {
  res.send("/transactions");
});
router.delete("/:id", (_req, res) => {
  res.send("/transactions");
});

export { router as transactionsRouter };
