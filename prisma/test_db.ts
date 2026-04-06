import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Testing connection...');
  try {
    const count = await prisma.user.count();
    console.log(`Connection successful! User count: ${count}`);
    const programCount = await prisma.pakistanProgram.count();
    console.log(`PakistanProgram count: ${programCount}`);
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
