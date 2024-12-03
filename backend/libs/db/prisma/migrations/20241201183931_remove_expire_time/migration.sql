/*
  Warnings:

  - You are about to drop the column `refreshTokenExpiryTime` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "refreshTokenExpiryTime",
ALTER COLUMN "refreshToken" DROP NOT NULL;
