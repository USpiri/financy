import { handleError } from "@/utils/handleError";
import express from "express";
import { validationResult } from "express-validator";

export const validator = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    handleError(res, "Validation Errors", { code: 400, errorRaw: errors });
  } else {
    return next();
  }
};
