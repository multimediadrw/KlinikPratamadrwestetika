import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/simple-auth';
import { prisma } from '@/lib/prisma';
import { generateReferralLink } from '@/lib/affiliate-utils';

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
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get affiliate code (from PreClaimAffiliateCode or User.affiliateCode)
    const claimedCode = await prisma.preClaimAffiliateCode.findFirst({
      where: {
        OR: [
          { claimedBy: user.id },
          { assignedEmail: user.email },
        ]
      }
    });

    const affiliateCode = claimedCode?.code || user.affiliateCode;

    // Get reservations via affiliate code
    const reservations = await prisma.reservation.findMany({
      where: {
        OR: [
          { referrerId: user.id },
          { referredBy: affiliateCode },
        ]
      },
      include: {
        treatment: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const completedReservations = reservations.filter(r => r.status === 'completed');
    const pendingReservations = reservations.filter(r => r.status === 'pending' || r.status === 'confirmed');

    // Calculate available balance (completed commissions - paid withdrawals)
    const totalCompletedCommission = completedReservations.reduce(
      (sum, r) => sum + Number(r.commissionAmount), 0
    );

    // Get withdrawals
    const withdrawals = await prisma.withdrawal.findMany({
      where: { userId: user.id },
      include: { bankAccount: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    const approvedWithdrawals = withdrawals.filter(w => w.status === 'approved' || w.status === 'completed');
    const totalWithdrawn = approvedWithdrawals.reduce((sum, w) => sum + Number(w.amount), 0);
    const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending');
    const totalPendingWithdrawal = pendingWithdrawals.reduce((sum, w) => sum + Number(w.amount), 0);

    const availableBalance = totalCompletedCommission - totalWithdrawn - totalPendingWithdrawal;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://klinik.drwskincare.com';
    const referralLink = generateReferralLink(appUrl, affiliateCode);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      affiliateCode,
      referralLink,
      stats: {
        totalReferrals: reservations.length,
        completedReferrals: completedReservations.length,
        pendingReferrals: pendingReservations.length,
        totalCommission: totalCompletedCommission,
        availableBalance: Math.max(0, availableBalance),
        commissionPending: Number(user.commissionPending),
        commissionPaid: Number(user.commissionPaid),
        totalEarnings: Number(user.totalEarnings),
      },
      reservations: reservations.map(r => ({
        id: r.id,
        patientName: r.patientName,
        treatment: r.treatment.name,
        reservationDate: r.reservationDate.toISOString(),
        status: r.status,
        finalPrice: Number(r.finalPrice),
        commissionAmount: Number(r.commissionAmount),
        commissionRate: Number(r.commissionRate),
        commissionPaid: r.commissionPaid,
        createdAt: r.createdAt.toISOString(),
      })),
      withdrawals: withdrawals.map(w => ({
        id: w.id,
        amount: Number(w.amount),
        status: w.status,
        bankName: w.bankAccount.bankName,
        accountNumber: w.bankAccount.accountNumber,
        accountName: w.bankAccount.accountName,
        accountType: w.bankAccount.accountType,
        requestDate: w.requestDate.toISOString(),
        processedDate: w.processedDate?.toISOString() || null,
        adminNotes: w.adminNotes,
      })),
      bankAccounts: user.bankAccounts,
    });
  } catch (error) {
    console.error('Error fetching affiliate dashboard:', error);
    return NextResponse.json(
      { error: 'Unauthorized atau terjadi kesalahan' },
      { status: 401 }
    );
  }
}
