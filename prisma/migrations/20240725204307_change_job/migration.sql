/*
  Warnings:

  - You are about to drop the `UserJob` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserJob" DROP CONSTRAINT "UserJob_jobId_fkey";

-- DropForeignKey
ALTER TABLE "UserJob" DROP CONSTRAINT "UserJob_userId_fkey";

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "UserJob";

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
