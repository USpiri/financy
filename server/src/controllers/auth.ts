import { handleError } from "@/utils/handleError";
import { Request, Response } from "express";
import { register as registerAction } from "@/services/auth";
import { encrypt } from "@/utils/password";
import { generateJWT } from "@/utils/jwt";

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
  const { password: insequrePassword } = user;

  try {
    const password = await encrypt(insequrePassword);
    const status = await registerAction({ ...user, password });

    if (!status.ok || !status.user) {
      return handleError(res, status.error!.message, {
        errorRaw: status.error?.errorRaw,
      });
    }

    const jwt = await generateJWT(status.user.id, status.user.email);

    res.status(201).send({ ...status, jwt });
  } catch (error) {
    handleError(res, "Error registering", { errorRaw: error });
  }
};
