import { NextResponse } from 'next/server';
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

    const { newEmail } = await req.json();

    if (!newEmail) {
      return NextResponse.json({ error: 'New email is required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Get the code
    const code = await prisma.preClaimAffiliateCode.findUnique({
      where: { id: params.id },
      include: {
        user: true,
        reservations: true,
      },
    });

    if (!code) {
      return NextResponse.json({ error: 'Code not found' }, { status: 404 });
    }

    // Check if code is claimed
    if (code.status !== 'claimed') {
      return NextResponse.json({ error: 'Only claimed codes can be transferred' }, { status: 400 });
    }

    // Find new owner by email
    const newOwner = await prisma.user.findUnique({
      where: { email: newEmail },
    });

    if (!newOwner) {
      return NextResponse.json({ error: 'New owner not found with this email' }, { status: 404 });
    }

    // Get old owner
    const oldOwner = code.user;

    if (!oldOwner) {
      return NextResponse.json({ error: 'Current owner not found' }, { status: 404 });
    }

    // Calculate commission to transfer
    const commissionToTransfer = code.totalCommission;
    const pendingCommission = code.reservations
      .filter((r: any) => r.status === 'completed' && !r.commissionPaid)
      .reduce((sum: number, r: any) => sum + Number(r.commissionAmount), 0);

    // Transfer code ownership
    await prisma.$transaction([
      // Update code
      prisma.preClaimAffiliateCode.update({
        where: { id: params.id },
        data: {
          assignedEmail: newEmail,
          claimedBy: newOwner.id,
          claimedAt: new Date(),
        },
      }),
      
      // Update old owner stats (deduct)
      prisma.user.update({
        where: { id: oldOwner.id },
        data: {
          totalEarnings: { decrement: commissionToTransfer },
          commissionPending: { decrement: pendingCommission },
          totalReferrals: { decrement: code.usageCount },
        },
      }),
      
      // Update new owner stats (add)
      prisma.user.update({
        where: { id: newOwner.id },
        data: {
          affiliateCode: code.code,
          totalEarnings: { increment: commissionToTransfer },
          commissionPending: { increment: pendingCommission },
          totalReferrals: { increment: code.usageCount },
        },
      }),
      
      // Update all reservations to point to new owner
      prisma.reservation.updateMany({
        where: { preClaimCodeId: code.id },
        data: { referrerId: newOwner.id },
      }),
    ]);

    const updatedCode = await prisma.preClaimAffiliateCode.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return NextResponse.json({ code: updatedCode });
  } catch (error) {
    console.error('Error transferring code:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
