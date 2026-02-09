import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET - Get all affiliators for report (Admin only)
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId }
    });

    if (!user?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 });
    }

    // Get all users who have an affiliate code
    const affiliators = await prisma.user.findMany({
      where: {
        affiliateCode: {
          not: ''
        }
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        affiliateCode: true,
        totalEarnings: true,
        createdAt: true,
        referrals: {
          select: {
            id: true
          }
        },
        bankAccounts: {
          where: {
            isDefault: true
          },
          select: {
            accountType: true,
            bankName: true,
            accountNumber: true,
            accountName: true
          },
          take: 1
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const reportData = affiliators.map(aff => ({
      id: aff.id,
      firstName: aff.firstName,
      lastName: aff.lastName,
      email: aff.email,
      affiliateCode: aff.affiliateCode,
      totalCommission: aff.totalEarnings,
      totalReservations: aff.referrals.length,
      registrationDate: aff.createdAt,
      bankAccount: aff.bankAccounts[0] || null
    }));

    return NextResponse.json({
      success: true,
      affiliators: reportData
    }, { status: 200 });

  } catch (error) {
    console.error('[FO AFFILIATORS] Error fetching affiliator report:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data report affiliator' },
      { status: 500 }
    );
  }
}
