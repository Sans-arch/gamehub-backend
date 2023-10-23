/*
  Warnings:

  - You are about to drop the column `id_external_igdb` on the `CustomList` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CustomList" DROP COLUMN "id_external_igdb";

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "id_igdb" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CustomListToGame" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CustomListToGame_AB_unique" ON "_CustomListToGame"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomListToGame_B_index" ON "_CustomListToGame"("B");

-- AddForeignKey
ALTER TABLE "_CustomListToGame" ADD CONSTRAINT "_CustomListToGame_A_fkey" FOREIGN KEY ("A") REFERENCES "CustomList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomListToGame" ADD CONSTRAINT "_CustomListToGame_B_fkey" FOREIGN KEY ("B") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
