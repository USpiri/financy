import { handleError } from "@/utils/handleError";
import { Request, Response } from "express";
import { register as registerAction } from "@/services/auth";

export const login = async (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);

  try {
    res.send("/auth/login");
  } catch (error) {
    handleError(res, "Error logging in", { errorRaw: error });
  }
};

export const register = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const status = await registerAction(user);
    if (!status.ok) {
      handleError(res, status.error!.message, {
        errorRaw: status.error?.errorRaw,
      });
    }

    res.status(201).send({ ...status });
  } catch (error) {
    handleError(res, "Error registering", { errorRaw: error });
  }
};
