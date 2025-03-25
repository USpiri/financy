import { handleError } from "@/utils/handleError";
import { Request, Response } from "express";

export const login = async (_req: Request, res: Response) => {
  try {
    res.send("/auth/login");
  } catch (error) {
    handleError(res, "Error logging in", { errorRaw: error });
  }
};

export const register = async (_req: Request, res: Response) => {
  try {
    res.send("/auth/register");
  } catch (error) {
    handleError(res, "Error registering", { errorRaw: error });
  }
};
