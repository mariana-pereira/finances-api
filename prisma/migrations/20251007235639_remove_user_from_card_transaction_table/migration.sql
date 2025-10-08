/*
  Warnings:

  - You are about to drop the column `user_id` on the `card_transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "card_transactions" DROP CONSTRAINT "card_transactions_user_id_fkey";

-- AlterTable
ALTER TABLE "card_transactions" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "card_transactions" ADD CONSTRAINT "card_transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
