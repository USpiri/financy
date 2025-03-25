import { Router } from "express";

const router = Router();

router.post("/login", (_req, res) => {
  res.send("/auth/login");
});
router.post("/register", (_req, res) => {
  res.send("/auth/register");
});

export { router as authRouter };
