import { handleError } from "@/utils/handleError";
import { Request, Response } from "express";

export const getSummary = async (_req: Request, res: Response) => {
  try {
    res.send("/summary");
  } catch (error) {
    handleError(res, "Error getting summary", { errorRaw: error });
  }
};
