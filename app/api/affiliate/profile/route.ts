import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/simple-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await requireAuth();

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        affiliateCode: true,
        totalReferrals: true,
        totalEarnings: true,
        commissionPending: true,
        commissionPaid: true,
        isAdmin: true,
        bankAccounts: {
          select: {
            id: true,
            accountType: true,
            bankName: true,
            accountNumber: true,
            accountName: true,
            isDefault: true,
          }
        }
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching affiliate profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
