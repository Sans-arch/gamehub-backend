/*
  Warnings:

  - Made the column `id_igdb` on table `game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gameid` on table `gamelist` required. This step will fail if there are existing NULL values in that column.
  - Made the column `listid` on table `gamelist` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profileid` on table `gamelist` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `list` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "game" ALTER COLUMN "id_igdb" SET NOT NULL;

-- AlterTable
ALTER TABLE "gamelist" ALTER COLUMN "gameid" SET NOT NULL,
ALTER COLUMN "listid" SET NOT NULL,
ALTER COLUMN "profileid" SET NOT NULL;

-- AlterTable
ALTER TABLE "list" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "profile" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL;
