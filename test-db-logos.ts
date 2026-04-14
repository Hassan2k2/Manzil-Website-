import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function run() {
  const unis = await prisma.university.findMany({ select: { id: true, name: true, website: true, logo: true }});
  console.log("Total Unis:", unis.length);
  const missingLogos = unis.filter(u => !u.logo && !u.website);
  console.log("Missing both logo & website:", missingLogos.length);
  
  const sample = unis.slice(0, 15);
  console.log("Sample:", sample);
  
  const hasOnlyWebsite = unis.filter(u => !u.logo && u.website);
  console.log("Has website but no logo in DB:", hasOnlyWebsite.length);
}
run();
