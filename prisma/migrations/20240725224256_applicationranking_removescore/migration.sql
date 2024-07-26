/*
  Warnings:

  - You are about to drop the column `score` on the `ApplicationRanking` table. All the data in the column will be lost.
  - Made the column `description` on table `RankingCriteria` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ApplicationRanking" DROP COLUMN "score";

-- AlterTable
ALTER TABLE "RankingCriteria" ALTER COLUMN "description" SET NOT NULL;
