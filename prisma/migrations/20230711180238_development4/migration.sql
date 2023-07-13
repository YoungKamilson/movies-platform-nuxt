/*
  Warnings:

  - The `movies` column on the `MovieList` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MovieList" DROP COLUMN "movies",
ADD COLUMN     "movies" INTEGER[];
