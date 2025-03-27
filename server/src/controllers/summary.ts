import { handleError } from "../utils/handleError";
import { Request, Response } from "express";
import { getSummary as getTransactionsSummary } from "../services/summary";

export const getSummary = async (req: Request, res: Response) => {
  const { uid } = req.body;
  try {
    const status = await getTransactionsSummary(uid);

    if (!status.ok) {
      return handleError(res, status.error!.message, {
        errorRaw: status.error?.errorRaw,
      });
    }

    res.status(200).send({ ...status });
  } catch (error) {
    handleError(res, "Error getting summary", { errorRaw: error });
  }
};
