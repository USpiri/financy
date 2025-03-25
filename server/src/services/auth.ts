import { prisma } from "@/lib/prisma";

interface Auth {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({ name, lastName, email }: Auth) => {
  try {
    const checkUser = await findUser(email);
    if (checkUser) {
      return {
        ok: false,
        error: {
          message: "User already exists",
        },
      };
    }

    const user = await prisma.user.create({
      data: {
        name,
        lastName,
        email,
        password: "123",
      },
      select: {
        id: true,
        name: true,
        lastName: true,
      },
    });
    return { ok: true, user };
  } catch (error) {
    return {
      ok: false,
      error: {
        message: "Unable to create user",
        errorRaw: error,
      },
    };
  }
};

const findUser = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};
