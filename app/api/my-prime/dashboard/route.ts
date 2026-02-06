import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get('user_email')?.value;

    console.log('[MY PRIME DEBUG] User email from cookie:', userEmail);

    if (!userEmail) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Cari kode affiliate yang di-assign atau di-claim oleh user ini
    // Pertama cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    console.log('[MY PRIME DEBUG] User from DB:', user);

    const affiliateCode = await prisma.preClaimAffiliateCode.findFirst({
      where: {
        OR: [
          { assignedEmail: userEmail },
          { claimedBy: user?.id },
        ],
      },
    });

    console.log('[MY PRIME DEBUG] Affiliate code found:', affiliateCode);

    if (!affiliateCode) {
      return NextResponse.json(
        { error: 'No affiliate code assigned' },
        { status: 404 }
      );
    }

    // Ambil reservasi yang menggunakan kode ini
    const reservations = await prisma.reservation.findMany({
      where: {
        referredBy: affiliateCode.code,
      },
      include: {
        treatment: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Hitung stats
    const totalCommission = reservations.reduce(
      (sum, r) => sum + Number(r.commissionAmount),
      0
    );
    const totalReservations = reservations.length;
    const pendingReservations = reservations.filter(
      (r) => r.status === 'pending'
    ).length;
    const totalCustomers = new Set(reservations.map((r) => r.patientEmail)).size;

    // Format reservations
    const formattedReservations = reservations.map((r) => ({
      id: r.id,
      patientName: r.patientName,
      patientEmail: r.patientEmail,
      patientPhone: r.patientPhone,
      treatmentName: r.treatment.name,
      reservationDate: r.reservationDate.toISOString(),
      reservationTime: r.reservationTime,
      status: r.status,
      finalPrice: r.finalPrice,
      commissionAmount: r.commissionAmount,
      createdAt: r.createdAt.toISOString(),
    }));

    return NextResponse.json({
      affiliate: {
        code: affiliateCode.code,
        assignedEmail: affiliateCode.assignedEmail,
        status: affiliateCode.status,
        usageCount: affiliateCode.usageCount,
        totalCommission: Number(affiliateCode.totalCommission),
        referralLink: `${process.env.NEXT_PUBLIC_APP_URL || 'https://klinik.drwskincare.com'}/?ref=${affiliateCode.code}`,
      },
      reservations: formattedReservations,
      stats: {
        totalCommission,
        totalReservations,
        pendingReservations,
        totalCustomers,
      },
    });
  } catch (error) {
    console.error('Error fetching MY PRIME dashboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
