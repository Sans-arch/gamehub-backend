/*
  Warnings:

  - Added the required column `description` to the `CustomList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomList" ADD COLUMN     "description" TEXT NOT NULL;
