/*
  Warnings:

  - Added the required column `category` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionCategory" AS ENUM ('salary', 'investments', 'business', 'gifts', 'refunds', 'food', 'transportation', 'entertainment', 'rent', 'utilities', 'healthcare', 'shopping', 'subscriptions', 'education', 'insurance', 'travel', 'donations', 'debts', 'other');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "category" "TransactionCategory" NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Transaction_category_idx" ON "Transaction"("category");
