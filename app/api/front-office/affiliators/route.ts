import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextauth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET - Get all affiliators for report (Admin only)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin (for now, allow all authenticated users to see report)
    // TODO: Add proper admin check when admin system is implemented
    
    // Get all claimed affiliate codes with their users
    const claimedCodes = await prisma.preClaimAffiliateCode.findMany({
      where: {
        status: 'claimed',
        claimedBy: {
          not: null
        }
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            createdAt: true,
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
          }
        },
        reservations: {
          select: {
            id: true,
            status: true,
            commissionAmount: true,
            finalPrice: true,
            createdAt: true
          }
        }
      },
      orderBy: {
        claimedAt: 'desc'
      }
    });

    // Also get codes assigned by email but not yet claimed
    const assignedCodes = await prisma.preClaimAffiliateCode.findMany({
      where: {
        assignedEmail: {
          not: null
        },
        status: 'unclaimed'
      },
      include: {
        reservations: {
          select: {
            id: true,
            status: true,
            commissionAmount: true,
            finalPrice: true,
            createdAt: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Format claimed codes data
    const claimedAffiliators = claimedCodes.map(code => {
      const totalReservations = code.reservations.length;
      const completedReservations = code.reservations.filter(r => r.status === 'completed').length;
      const totalCommission = code.reservations.reduce(
        (sum, r) => sum + Number(r.commissionAmount),
        0
      );
      const totalRevenue = code.reservations.reduce(
        (sum, r) => sum + Number(r.finalPrice),
        0
      );

      return {
        id: code.user?.id || code.id,
        name: code.user ? `${code.user.firstName || ''} ${code.user.lastName || ''}`.trim() || code.user.email : code.assignedEmail || 'Unknown',
        email: code.user?.email || code.assignedEmail || '-',
        affiliateCode: code.code,
        status: 'claimed',
        totalCommission,
        totalReservations,
        completedReservations,
        pendingReservations: totalReservations - completedReservations,
        totalRevenue,
        registrationDate: code.claimedAt || code.createdAt,
        bankAccount: code.user?.bankAccounts[0] || null,
        usageCount: code.usageCount
      };
    });

    // Format assigned but unclaimed codes
    const assignedAffiliators = assignedCodes.map(code => {
      const totalReservations = code.reservations.length;
      const completedReservations = code.reservations.filter(r => r.status === 'completed').length;
      const totalCommission = code.reservations.reduce(
        (sum, r) => sum + Number(r.commissionAmount),
        0
      );
      const totalRevenue = code.reservations.reduce(
        (sum, r) => sum + Number(r.finalPrice),
        0
      );

      return {
        id: code.id,
        name: code.assignedEmail || 'Unknown',
        email: code.assignedEmail || '-',
        affiliateCode: code.code,
        status: 'assigned (unclaimed)',
        totalCommission,
        totalReservations,
        completedReservations,
        pendingReservations: totalReservations - completedReservations,
        totalRevenue,
        registrationDate: code.createdAt,
        bankAccount: null,
        usageCount: code.usageCount
      };
    });

    // Combine both lists
    const allAffiliators = [...claimedAffiliators, ...assignedAffiliators];

    return NextResponse.json({
      success: true,
      affiliators: allAffiliators,
      summary: {
        totalAffiliators: allAffiliators.length,
        claimedCodes: claimedAffiliators.length,
        assignedCodes: assignedAffiliators.length,
        totalCommission: allAffiliators.reduce((sum, a) => sum + a.totalCommission, 0),
        totalReservations: allAffiliators.reduce((sum, a) => sum + a.totalReservations, 0)
      }
    }, { status: 200 });

  } catch (error) {
    console.error('[FO AFFILIATORS] Error fetching affiliator report:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data report affiliator' },
      { status: 500 }
    );
  }
}
