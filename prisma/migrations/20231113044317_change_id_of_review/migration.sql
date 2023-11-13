/*
  Warnings:

  - Changed the type of `gameId` on the `userRating` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "userRating" DROP CONSTRAINT "userRating_gameId_fkey";

-- AlterTable
ALTER TABLE "userRating" DROP COLUMN "gameId",
ADD COLUMN     "gameId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "userRating" ADD CONSTRAINT "userRating_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
