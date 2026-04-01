import { Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../src/lib/prisma';

async function main() {
  console.log('Starting seed...');

  // Create initial schools
  const schools = [
    { name: 'International College of Arts & Sciences', code: 'ICAS26' },
    { name: 'City School PAF Chapter', code: 'CS-PAF' },
    { name: 'Beaconhouse School System', code: 'BSS-01' },
  ];

  for (const school of schools) {
    await prisma.school.upsert({
      where: { code: school.code },
      update: {},
      create: school,
    });
  }

  console.log('Schools seeded.');

  // Create a test student
  const hashedPassword = await bcrypt.hash('password123', 10);
  await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Test Student',
      role: Role.STUDENT,
    },
  });

  console.log('Test user seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
