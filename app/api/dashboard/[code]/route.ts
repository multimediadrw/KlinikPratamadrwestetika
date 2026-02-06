import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code;

    if (!code) {
      return NextResponse.json(
        { error: 'Code is required' },
        { status: 400 }
      );
    }

    // Cari kode affiliate
    const affiliateCode = await prisma.preClaimAffiliateCode.findUnique({
      where: {
        code: code.toUpperCase(),
      },
    });

    if (!affiliateCode) {
      return NextResponse.json(
        { error: 'Affiliate code not found' },
        { status: 404 }
      );
    }

    // Cek apakah kode sudah di-assign (punya email)
    if (!affiliateCode.assignedEmail) {
      return NextResponse.json(
        { error: 'This code has not been assigned yet. Please contact admin.' },
        { status: 403 }
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
    console.error('Error fetching dashboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
