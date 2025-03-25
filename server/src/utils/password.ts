import { compare, hash } from "bcryptjs";

export const encrypt = async (password: string): Promise<string> => {
  return await hash(password, 10);
};

export const verify = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await compare(password, hash);
};
