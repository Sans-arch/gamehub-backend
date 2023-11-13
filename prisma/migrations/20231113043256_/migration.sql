/*
  Warnings:

  - A unique constraint covering the columns `[id_igdb]` on the table `game` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "userRating" DROP CONSTRAINT "userRating_gameId_fkey";

-- AlterTable
ALTER TABLE "userRating" ALTER COLUMN "gameId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "game_id_igdb_key" ON "game"("id_igdb");

-- AddForeignKey
ALTER TABLE "userRating" ADD CONSTRAINT "userRating_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("id_igdb") ON DELETE RESTRICT ON UPDATE CASCADE;
