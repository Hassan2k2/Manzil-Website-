/*
  Warnings:

  - Added the required column `userId` to the `UniversityMatch` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UniversityMatch" DROP CONSTRAINT "UniversityMatch_schoolId_fkey";

-- AlterTable
ALTER TABLE "UniversityMatch" ADD COLUMN     "preferences" JSONB,
ADD COLUMN     "score" INTEGER,
ADD COLUMN     "tier" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "schoolId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UniversityMatch" ADD CONSTRAINT "UniversityMatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversityMatch" ADD CONSTRAINT "UniversityMatch_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;
