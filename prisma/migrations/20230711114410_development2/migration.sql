/*
  Warnings:

  - Added the required column `name` to the `MovieList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MovieList" ADD COLUMN     "name" TEXT NOT NULL;
