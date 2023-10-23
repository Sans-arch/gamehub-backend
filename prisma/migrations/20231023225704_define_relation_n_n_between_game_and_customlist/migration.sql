/*
  Warnings:

  - You are about to drop the `_CustomListToGame` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CustomListToGame" DROP CONSTRAINT "_CustomListToGame_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomListToGame" DROP CONSTRAINT "_CustomListToGame_B_fkey";

-- DropTable
DROP TABLE "_CustomListToGame";

-- CreateTable
CREATE TABLE "GamesOnCustomLists" (
    "customListId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "GamesOnCustomLists_pkey" PRIMARY KEY ("customListId","gameId")
);

-- AddForeignKey
ALTER TABLE "GamesOnCustomLists" ADD CONSTRAINT "GamesOnCustomLists_customListId_fkey" FOREIGN KEY ("customListId") REFERENCES "CustomList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamesOnCustomLists" ADD CONSTRAINT "GamesOnCustomLists_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
