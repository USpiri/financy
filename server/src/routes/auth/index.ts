import { login, register } from "../../controllers/auth";
import { validator } from "../../middlewares/validator";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Password is required on must have at least 6 characters",
    ).isLength({ min: 6 }),
    validator,
  ],
  login,
);

router.post(
  "/register",
  [
    check("name", "Name is required").notEmpty(),
    check("lastName", "Name is required").notEmpty(),
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Password is required on must have at least 6 characters",
    ).isLength({ min: 6 }),
    validator,
  ],
  register,
);

export { router as authRouter };
