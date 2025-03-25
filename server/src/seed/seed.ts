import { prisma } from "../lib/prisma";
import { initalData, generateRandomTransactions } from "./data";

async function main() {
  if (process.env.NODE_ENV === "production") return;

  //1. Delete all data
  await prisma.transaction.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create initial data
  const { users } = initalData;
  const [firstUserData, secondUserData] = users;

  // 2.1 Create users
  const firstUser = await prisma.user.create({ data: firstUserData });
  const secondUser = await prisma.user.create({ data: secondUserData });

  // 2.2 Create transactions
  const transactionsFirstUser = generateRandomTransactions();
  await prisma.transaction.createMany({
    data: transactionsFirstUser.map((t) => ({
      ...t,
      userId: firstUser.id,
    })),
  });

  const transactionsSecondUser = generateRandomTransactions();
  await prisma.transaction.createMany({
    data: transactionsSecondUser.map((t) => ({
      ...t,
      userId: secondUser.id,
    })),
  });

  console.log("Seed Executed");
}

(() => main())();
