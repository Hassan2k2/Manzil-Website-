-- CreateTable
CREATE TABLE "PakistanProgram" (
    "id" TEXT NOT NULL,
    "university_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "department" TEXT,
    "degree" TEXT,
    "program" TEXT,
    "duration" TEXT,
    "eligibility_criteria" TEXT,
    "test_required" TEXT,
    "fee_structure" DOUBLE PRECISION,
    "admission_deadline" TEXT,
    "program_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PakistanProgram_pkey" PRIMARY KEY ("id")
);
