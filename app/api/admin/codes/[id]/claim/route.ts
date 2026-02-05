import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const adminUser = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!adminUser?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 });
    }

    // Get the code
    const code = await prisma.preClaimAffiliateCode.findUnique({
      where: { id: params.id },
    });

    if (!code) {
      return NextResponse.json({ error: 'Code not found' }, { status: 404 });
    }

    // Check if code is already claimed
    if (code.status === 'claimed') {
      return NextResponse.json({ error: 'Code is already claimed' }, { status: 400 });
    }

    // Check if email is assigned
    if (!code.assignedEmail) {
      return NextResponse.json({ error: 'Email must be assigned first' }, { status: 400 });
    }

    // Find user by email
    const targetUser = await prisma.user.findUnique({
      where: { email: code.assignedEmail },
    });

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found with assigned email' }, { status: 404 });
    }

    // Claim the code
    const updatedCode = await prisma.preClaimAffiliateCode.update({
      where: { id: params.id },
      data: {
        status: 'claimed',
        claimedBy: targetUser.id,
        claimedAt: new Date(),
      },
    });

    // Update user's affiliate code
    await prisma.user.update({
      where: { id: targetUser.id },
      data: {
        affiliateCode: code.code,
      },
    });

    return NextResponse.json({ code: updatedCode });
  } catch (error) {
    console.error('Error claiming code:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
