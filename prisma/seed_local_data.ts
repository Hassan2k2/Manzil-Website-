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

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const jsonPath = path.join(__dirname, '../../public/Pakistan_Unis/merged_all_unis_data_UPDATED_latest.json');
  
  if (!fs.existsSync(jsonPath)) {
    console.error(`File not found: ${jsonPath}`);
    process.exit(1);
  }

  console.log('Reading JSON data...');
  const rawData = fs.readFileSync(jsonPath, 'utf8');
  const programs = JSON.parse(rawData);

  console.log(`Found ${programs.length} programs. Clearing existing data...`);
  // Try to use the model name exactly as it appears if the camelCase didn't work
  // But standard Prisma is camelCase. 
  // Let's check the client by just casting to any if it's a typing issue
  const db = prisma as any;
  
  await db.pakistanProgram.deleteMany();

  console.log('Inserting data in batches...');
  const batchSize = 1000;
  for (let i = 0; i < programs.length; i += batchSize) {
    const batch = programs.slice(i, i + batchSize).map((p: any) => ({
      university_name: p.university_name,
      city: p.city,
      department: p.department || null,
      degree: p.degree || null,
      program: p.program || null,
      duration: p.duration || null,
      eligibility_criteria: p.eligibility_criteria || null,
      test_required: p.test_required || null,
      fee_structure: typeof p.fee_structure === 'number' ? p.fee_structure : parseFloat(p.fee_structure) || null,
      admission_deadline: p.admission_deadline || null,
      program_url: p.program_url || null,
    }));

    await db.pakistanProgram.createMany({
      data: batch,
      skipDuplicates: true,
    });
    console.log(`Inserted ${Math.min(i + batchSize, programs.length)} / ${programs.length}`);
  }

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
