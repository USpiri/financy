import { handleError } from "../utils/handleError";
import { verifyJWT } from "../utils/jwt";
import { Request, Response, NextFunction } from "express";

export const validateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;
  if (!header) return handleError(res, "No token provided", { code: 401 });

  const jwt = header.split(" ").pop() ?? "";
  if (jwt.length === 0) return handleError(res, "Unauthorized", { code: 401 });

  const verifiedJwt = verifyJWT(jwt);
  if (verifiedJwt === null)
    return handleError(res, "Unauthorized", { code: 401 });

  req.body.uid = verifiedJwt.uid;
  req.body.name = verifiedJwt.name;

  return next();
};
