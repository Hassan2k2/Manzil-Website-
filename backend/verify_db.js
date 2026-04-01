const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Database Verification Test ---');
  
  const usersCount = await prisma.user.count();
  console.log(`Total Users in DB: ${usersCount}`);
  
  const testsCount = await prisma.assessment.count();
  console.log(`Total Assessments in DB: ${testsCount}`);
  
  const recentTests = await prisma.assessment.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 3,
    include: { user: { select: { email: true } } }
  });
  
  console.log('\nRecent Assessments Stored:');
  recentTests.forEach(t => {
     console.log(`- User: ${t.user.email} | Step: ${t.currentStep} | RIASEC Answers Count: ${Object.keys(t.riasecAnswers || {}).length} | Completed: ${t.completedAt ? 'Yes' : 'No'}`);
     if (t.careerResults) {
       console.log(`  -> Final Match Results populated!`);
     }
  });

  const actsCount = await prisma.userActivity.count();
  console.log(`\nTotal User Activities stored: ${actsCount}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
