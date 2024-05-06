/*
  Warnings:

  - Changed the type of `branch` on the `accounts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "branch",
ADD COLUMN     "branch" INTEGER NOT NULL;
