import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function run() {
  const programs = await prisma.pakistanProgram.findMany({ select: { university_name: true }});
  const unis = [...new Set(programs.map(p => p.university_name))];
  console.log("Total unique unis:", unis.length);
  console.log(unis.join('\n'));
}
run();
