import { handleError } from "@/utils/handleError";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    handleError(res, "Validation Errors", { code: 400, errorRaw: errors });
  } else {
    return next();
  }
};
