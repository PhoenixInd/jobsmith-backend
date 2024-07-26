-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "suggestion" TEXT;

-- CreateTable
CREATE TABLE "ApplicationRanking" (
    "id" SERIAL NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "criteriaId" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ApplicationRanking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RankingCriteria" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RankingCriteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectionProbabilityTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "SelectionProbabilityTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ApplicationToSelectionProbabilityTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SelectionProbabilityTag_name_key" ON "SelectionProbabilityTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ApplicationToSelectionProbabilityTag_AB_unique" ON "_ApplicationToSelectionProbabilityTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ApplicationToSelectionProbabilityTag_B_index" ON "_ApplicationToSelectionProbabilityTag"("B");

-- AddForeignKey
ALTER TABLE "ApplicationRanking" ADD CONSTRAINT "ApplicationRanking_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationRanking" ADD CONSTRAINT "ApplicationRanking_criteriaId_fkey" FOREIGN KEY ("criteriaId") REFERENCES "RankingCriteria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApplicationToSelectionProbabilityTag" ADD CONSTRAINT "_ApplicationToSelectionProbabilityTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApplicationToSelectionProbabilityTag" ADD CONSTRAINT "_ApplicationToSelectionProbabilityTag_B_fkey" FOREIGN KEY ("B") REFERENCES "SelectionProbabilityTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
