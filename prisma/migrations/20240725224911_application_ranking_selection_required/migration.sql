/*
  Warnings:

  - Made the column `rankingId` on table `Application` required. This step will fail if there are existing NULL values in that column.
  - Made the column `selectionTagId` on table `Application` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "rankingId" SET NOT NULL,
ALTER COLUMN "selectionTagId" SET NOT NULL;
