import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/affiliate-codes/claim
 * Claim kode affiliate yang unclaimed (user)
 */
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'Code is required' },
        { status: 400 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Find unclaimed code
    const unclaimedCode = await prisma.preClaimAffiliateCode.findUnique({
      where: { code },
    });

    if (!unclaimedCode) {
      return NextResponse.json(
        { error: 'Code not found' },
        { status: 404 }
      );
    }

    if (unclaimedCode.status === 'claimed') {
      return NextResponse.json(
        { error: 'Code already claimed' },
        { status: 400 }
      );
    }

    // Get all reservations using this code to calculate pending commission
    const reservationsWithCode = await prisma.reservation.findMany({
      where: {
        preClaimCodeId: unclaimedCode.id,
        status: 'completed',
        commissionPaid: false,
      },
    });

    const pendingCommission = reservationsWithCode.reduce(
      (sum: number, res: any) => sum + Number(res.commissionAmount),
      0
    );

    // Claim the code
    const claimedCode = await prisma.preClaimAffiliateCode.update({
      where: { id: unclaimedCode.id },
      data: {
        claimedBy: user.id,
        claimedAt: new Date(),
        status: 'claimed',
        assignedEmail: user.email, // Update assignedEmail saat claim
      },
    });

    // Update user with pending commission
    await prisma.user.update({
      where: { id: user.id },
      data: {
        commissionPending: { increment: pendingCommission },
      },
    });

    // Update all reservations to link to user instead of unclaimed code
    await prisma.reservation.updateMany({
      where: {
        preClaimCodeId: unclaimedCode.id,
      },
      data: {
        referrerId: user.id,
        referredBy: code,
      },
    });

    return NextResponse.json({
      success: true,
      code: claimedCode,
      pendingCommission,
      message: `Code ${code} claimed successfully. Pending commission: ${pendingCommission}`,
    });
  } catch (error) {
    console.error('Error claiming affiliate code:', error);
    return NextResponse.json(
      { error: 'Failed to claim affiliate code' },
      { status: 500 }
    );
  }
}
