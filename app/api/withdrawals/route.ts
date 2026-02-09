import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextauth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// POST - Create withdrawal request
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { amount, accountType, bankName, accountNumber, accountName } = body;

    // Validate input
    if (!amount || !accountType || !bankName || !accountNumber || !accountName) {
      return NextResponse.json({ error: 'Semua field harus diisi' }, { status: 400 });
    }

    if (amount <= 0) {
      return NextResponse.json({ error: 'Jumlah penarikan harus lebih dari 0' }, { status: 400 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }

    // Get affiliate code for this user
    const affiliateCode = await prisma.preClaimAffiliateCode.findFirst({
      where: {
        OR: [
          { assignedEmail: session.user.email },
          { claimedBy: user.id },
        ],
      },
    });

    if (!affiliateCode) {
      return NextResponse.json({ error: 'Kode affiliate tidak ditemukan' }, { status: 404 });
    }

    // Get completed reservations to calculate available balance
    const completedReservations = await prisma.reservation.findMany({
      where: {
        referredBy: affiliateCode.code,
        status: 'completed'
      }
    });

    const availableBalance = completedReservations.reduce(
      (sum, r) => sum + Number(r.commissionAmount),
      0
    );

    // Check if user has enough balance
    if (availableBalance < amount) {
      return NextResponse.json({ 
        error: `Saldo tidak mencukupi. Saldo tersedia: Rp ${availableBalance.toLocaleString('id-ID')}` 
      }, { status: 400 });
    }

    // Check if bank account already exists for this user
    let bankAccount = await prisma.bankAccount.findFirst({
      where: {
        userId: user.id,
        accountType,
        bankName,
        accountNumber
      }
    });

    // If not exists, create new bank account
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
        amount,
        status: 'pending'
      },
      include: {
        bankAccount: true
      }
    });

    console.log(`[WITHDRAWAL] New request created: ${withdrawal.id} - Rp ${amount} for user ${user.email}`);

    return NextResponse.json({
      success: true,
      message: 'Permintaan penarikan berhasil dibuat',
      withdrawal: {
        id: withdrawal.id,
        amount: Number(withdrawal.amount),
        status: withdrawal.status,
        accountType: withdrawal.bankAccount.accountType,
        bankName: withdrawal.bankAccount.bankName,
        accountNumber: withdrawal.bankAccount.accountNumber,
        accountName: withdrawal.bankAccount.accountName,
        createdAt: withdrawal.createdAt.toISOString()
      }
    }, { status: 201 });

  } catch (error) {
    console.error('[WITHDRAWAL] Error creating withdrawal:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memproses penarikan' },
      { status: 500 }
    );
  }
}

// GET - Get user's withdrawals
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }

    // Get all withdrawals for this user
    const withdrawals = await prisma.withdrawal.findMany({
      where: {
        userId: user.id
      },
      include: {
        bankAccount: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Format withdrawals
    const formattedWithdrawals = withdrawals.map(w => ({
      id: w.id,
      amount: Number(w.amount),
      status: w.status,
      accountType: w.bankAccount.accountType,
      bankName: w.bankAccount.bankName,
      accountNumber: w.bankAccount.accountNumber,
      accountName: w.bankAccount.accountName,
      createdAt: w.createdAt.toISOString(),
      processedDate: w.processedDate?.toISOString() || null,
      adminNotes: w.adminNotes
    }));

    return NextResponse.json({
      success: true,
      withdrawals: formattedWithdrawals
    }, { status: 200 });

  } catch (error) {
    console.error('[WITHDRAWAL] Error fetching withdrawals:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data penarikan' },
      { status: 500 }
    );
  }
}
