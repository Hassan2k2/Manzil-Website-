-- CreateEnum
CREATE TYPE "SchoolTier" AS ENUM ('FULL_ACCESS', 'QUIZ_ONLY');

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "tier" "SchoolTier" NOT NULL DEFAULT 'FULL_ACCESS';
