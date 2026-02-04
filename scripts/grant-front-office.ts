import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function grantFrontOfficeAccess(email: string) {
  try {
    console.log(`🔍 Looking for user with email: ${email}`);
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error(`❌ User not found with email: ${email}`);
      console.log('\n📋 Available users:');
      const allUsers = await prisma.user.findMany({
        select: { email: true, isFrontOffice: true, isAdmin: true },
      });
      console.table(allUsers);
      process.exit(1);
    }

    console.log(`✅ User found: ${user.email}`);
    console.log(`   Current status - isFrontOffice: ${user.isFrontOffice}, isAdmin: ${user.isAdmin}`);

    // Update user to grant front office access
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { 
        isFrontOffice: true,
        // Also grant admin access for full control
        isAdmin: true,
      },
    });

    console.log(`\n✅ Front office access granted successfully!`);
    console.log(`   Email: ${updatedUser.email}`);
    console.log(`   isFrontOffice: ${updatedUser.isFrontOffice}`);
    console.log(`   isAdmin: ${updatedUser.isAdmin}`);
    console.log(`\n🎉 User can now access front office dashboard at /front-office`);
  } catch (error) {
    console.error('❌ Error granting front office access:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.error('❌ Please provide an email address');
  console.log('Usage: ts-node scripts/grant-front-office.ts <email>');
  process.exit(1);
}

grantFrontOfficeAccess(email);
