import "dotenv/config";
import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateJWT = async (uid: string, email: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, email };

    sign(payload, JWT_SECRET, { expiresIn: "24h" }, (err, token) => {
      if (err !== null) {
        console.error(err);
        reject("Unable to generate JWT token");
      }

      resolve(token);
    });
  });
};

export const verifyJWT = (jwt: string) => {
  try {
    const decoded = verify(jwt, JWT_SECRET, { ignoreExpiration: false });
    if (typeof decoded === "string") return null;
    return decoded;
  } catch (e) {
    console.error(e);
    return null;
  }
};
