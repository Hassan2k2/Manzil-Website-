import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// tsx usually provides __dirname, but let's be safe
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const prisma = new PrismaClient();

const ukFiles = [
  'Tier_1_uk_universities_merged.json',
  'Tier_2_UK_unis_merged.json',
  'merged_tier_3_unis.json'
];

async function main() {
  console.log('Clearing existing UK data...');
  const db = prisma as any;
  await db.ukProgram.deleteMany();

  const batchSize = 1000;

  for (const fileName of ukFiles) {
    const jsonPath = path.join(__dirname, '../public/UK Unis', fileName);
    
    if (!fs.existsSync(jsonPath)) {
      console.error(`File not found: ${jsonPath}`);
      continue;
    }

    console.log(`Reading JSON data from ${fileName}...`);
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const programs = JSON.parse(rawData);

    console.log(`Found ${programs.length} programs in ${fileName}. Inserting data in batches...`);
    
    for (let i = 0; i < programs.length; i += batchSize) {
      const batch = programs.slice(i, i + batchSize).map((p: any) => ({
        university_name: p.university_name,
        city: p.city || '',
        department: p.department || null,
        degree: p.degree || null,
        program: p.program || null,
        duration: p.duration || null,
        eligibility_criteria: p.eligibility_criteria || null,
        test_required: p.test_required || null,
        fee_structure: p.fee_structure ? String(p.fee_structure) : null,
        admission_deadline: p.admission_deadline || null,
        program_url: p.program_url || null,
      }));

      await db.ukProgram.createMany({
        data: batch,
        skipDuplicates: true,
      });
      console.log(`Inserted ${Math.min(i + batchSize, programs.length)} / ${programs.length} from ${fileName}`);
    }
  }

  console.log('Seeding UK data completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
