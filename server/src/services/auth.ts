import { prisma } from "../lib/prisma";
import { generateJWT } from "../utils/jwt";
import { encrypt, verify } from "../utils/password";

interface LoginAuth {
  email: string;
  password: string;
}

interface RegisterAuth {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginAuth) => {
  try {
    const user = await findUser(email);
    if (!user) {
      return {
        ok: false,
        error: {
          message: "User not found",
        },
      };
    }

    const { password: hash, ...userWithoutPassword } = user;
    const isValid = await verify(password, hash);

    if (!isValid) {
      return {
        ok: false,
        error: {
          message: "Unauthorized",
        },
      };
    }

    const jwt = await generateJWT(user.id, user.email);

    return { ok: true, user: userWithoutPassword, jwt };
  } catch (error) {
    return {
      ok: false,
      error: { message: "Error logging in", errorRaw: error },
    };
  }
};

export const register = async ({
  name,
  lastName,
  email,
  password: insequrePassword,
}: RegisterAuth) => {
  try {
    const password = await encrypt(insequrePassword);
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
        password,
      },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
      },
    });
    const jwt = await generateJWT(user.id, user.email);

    return { ok: true, user, jwt };
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
