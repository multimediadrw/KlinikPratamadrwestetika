import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/simple-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// POST - Buat permintaan withdrawal
export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await req.json();
    const { amount, accountType, bankName, accountNumber, accountName } = body;

    if (!amount || !accountType || !bankName || !accountNumber || !accountName) {
      return NextResponse.json({ error: 'Semua field harus diisi' }, { status: 400 });
    }

    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount <= 0) {
      return NextResponse.json({ error: 'Jumlah penarikan harus lebih dari 0' }, { status: 400 });
    }

    if (withdrawAmount < 50000) {
      return NextResponse.json({ error: 'Minimum penarikan adalah Rp 50.000' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId }
    });

    if (!user) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }

    // Get affiliate code
    const claimedCode = await prisma.preClaimAffiliateCode.findFirst({
      where: {
        OR: [
          { claimedBy: user.id },
          { assignedEmail: user.email },
        ]
      }
    });

    const affiliateCode = claimedCode?.code || user.affiliateCode;

    // Calculate available balance
    const completedReservations = await prisma.reservation.findMany({
      where: {
        OR: [
          { referrerId: user.id },
          { referredBy: affiliateCode },
        ],
        status: 'completed',
      }
    });

    const totalCompletedCommission = completedReservations.reduce(
      (sum, r) => sum + Number(r.commissionAmount), 0
    );

    const approvedWithdrawals = await prisma.withdrawal.findMany({
      where: {
        userId: user.id,
        status: { in: ['approved', 'completed', 'pending'] }
      }
    });

    const totalUsed = approvedWithdrawals.reduce((sum, w) => sum + Number(w.amount), 0);
    const availableBalance = totalCompletedCommission - totalUsed;

    if (withdrawAmount > availableBalance) {
      return NextResponse.json({
        error: `Saldo tidak mencukupi. Saldo tersedia: Rp ${availableBalance.toLocaleString('id-ID')}`
      }, { status: 400 });
    }

    // Get or create bank account
    let bankAccount = await prisma.bankAccount.findFirst({
      where: {
        userId: user.id,
        accountType,
        bankName,
        accountNumber
      }
    });

    if (!bankAccount) {
      bankAccount = await prisma.bankAccount.create({
        data: {
          userId: user.id,
          accountType,
          bankName,
          accountNumber,
          accountName,
          isDefault: false
        }
      });
    }

    // Create withdrawal request
    const withdrawal = await prisma.withdrawal.create({
      data: {
        userId: user.id,
        bankAccountId: bankAccount.id,
        amount: withdrawAmount,
        status: 'pending'
      },
      include: { bankAccount: true }
    });

    return NextResponse.json({
      success: true,
      message: 'Permintaan penarikan berhasil dibuat. Menunggu persetujuan admin.',
      withdrawal: {
        id: withdrawal.id,
        amount: Number(withdrawal.amount),
        status: withdrawal.status,
        bankName: withdrawal.bankAccount.bankName,
        accountNumber: withdrawal.bankAccount.accountNumber,
        accountName: withdrawal.bankAccount.accountName,
        createdAt: withdrawal.createdAt.toISOString(),
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating withdrawal:', error);
    return NextResponse.json(
      { error: 'Unauthorized atau terjadi kesalahan' },
      { status: 401 }
    );
  }
}

// GET - Get withdrawals milik user yang login
export async function GET() {
  try {
    const session = await requireAuth();

    const withdrawals = await prisma.withdrawal.findMany({
      where: { userId: session.userId },
      include: { bankAccount: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
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
      }))
    });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
