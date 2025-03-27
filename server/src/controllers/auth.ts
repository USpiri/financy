import { handleError } from "../utils/handleError";
import { Request, Response } from "express";
import {
  register as registerAction,
  login as loginAction,
} from "../services/auth";

export const login = async (req: Request, res: Response) => {
  const user = req.body;
  const { email, password } = user;

  try {
    const status = await loginAction({ email, password });

    if (!status.ok || !status.user) {
      return handleError(res, status.error!.message, {
        code: 401,
        errorRaw: status.error?.errorRaw,
      });
    }

    res.status(200).send({ ...status });
  } catch (error) {
    handleError(res, "Error logging in", { errorRaw: error });
  }
};

export const register = async (req: Request, res: Response) => {
  const user = req.body;

  try {
    const status = await registerAction({ ...user });

    if (!status.ok || !status.user) {
      return handleError(res, status.error!.message, {
        errorRaw: status.error?.errorRaw,
        code: 400,
      });
    }

    res.status(201).send({ ...status });
  } catch (error) {
    handleError(res, "Error registering", { errorRaw: error });
  }
};
