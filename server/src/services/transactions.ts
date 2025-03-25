import { prisma } from "@/lib/prisma";
import { Transaction } from "@/models/transaction";

// model Transaction {
//   id          String              @id @default(uuid())
//   amount      Float
//   description String?
//   note        String
//   category    TransactionCategory
//   type        TransactionType
//   createdAt   DateTime            @default(now())
//   updatedAt   DateTime            @updatedAt
//
//   user   User   @relation(fields: [userId], references: [id])
//   userId String
//
//   @@index([type])
//   @@index([category])
// }

export const createTransaction = async (
  { amount, type, description, note, category }: Transaction,
  userID: string,
) => {
  try {
    const transaction = await prisma.transaction.create({
      data: { amount, type, description, note, category, userId: userID },
    });
    return { ok: true, transaction };
  } catch (error) {
    return {
      ok: false,
      error: { message: "Error creating transaction", errorRaw: error },
    };
  }
};
