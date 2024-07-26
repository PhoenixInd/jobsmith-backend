/*
  Warnings:

  - You are about to drop the `_ApplicationToSelectionProbabilityTag` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `description` on table `SelectionProbabilityTag` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ApplicationRanking" DROP CONSTRAINT "ApplicationRanking_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "_ApplicationToSelectionProbabilityTag" DROP CONSTRAINT "_ApplicationToSelectionProbabilityTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ApplicationToSelectionProbabilityTag" DROP CONSTRAINT "_ApplicationToSelectionProbabilityTag_B_fkey";

-- DropIndex
DROP INDEX "SelectionProbabilityTag_name_key";

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "rankingId" INTEGER,
ADD COLUMN     "selectionTagId" INTEGER;

-- AlterTable
ALTER TABLE "SelectionProbabilityTag" ALTER COLUMN "description" SET NOT NULL;

-- DropTable
DROP TABLE "_ApplicationToSelectionProbabilityTag";

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_rankingId_fkey" FOREIGN KEY ("rankingId") REFERENCES "ApplicationRanking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_selectionTagId_fkey" FOREIGN KEY ("selectionTagId") REFERENCES "SelectionProbabilityTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
