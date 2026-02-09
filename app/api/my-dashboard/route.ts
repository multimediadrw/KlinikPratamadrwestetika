import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextauth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Find affiliate code assigned to or claimed by this user
    const affiliateCode = await prisma.preClaimAffiliateCode.findFirst({
      where: {
        OR: [
          { assignedEmail: userEmail },
          { claimedBy: user.id },
        ],
      },
    });

    if (!affiliateCode) {
      return NextResponse.json(
        { error: 'No affiliate code assigned' },
        { status: 404 }
      );
    }

    // Get reservations that used this affiliate code
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

    // Calculate stats
    const totalCommission = reservations.reduce(
      (sum, r) => sum + Number(r.commissionAmount),
      0
    );
    const totalReservations = reservations.length;
    const completedReservations = reservations.filter(
      (r) => r.status === 'completed'
    ).length;
    const pendingReservations = reservations.filter(
      (r) => r.status === 'pending'
    ).length;
    const totalCustomers = new Set(reservations.map((r) => r.patientEmail)).size;

    // Calculate available balance (completed reservations only)
    const availableBalance = reservations
      .filter((r) => r.status === 'completed')
      .reduce((sum, r) => sum + Number(r.commissionAmount), 0);

    // Format reservations for frontend
    const formattedReservations = reservations.map((r) => ({
      id: r.id,
      customerName: r.patientName,
      treatment: r.treatment.name,
      price: Number(r.finalPrice),
      commission: Number(r.commissionAmount),
      status: r.status,
      date: r.reservationDate.toISOString(),
    }));

    // Generate referral link
    const referralLink = `${process.env.NEXT_PUBLIC_APP_URL || 'https://klinik.drwskincare.com'}/?ref=${affiliateCode.code}`;

    // Return data matching frontend DashboardData interface
    return NextResponse.json({
      affiliateCode: affiliateCode.code,
      email: userEmail,
      referralLink,
      totalCommission,
      totalReservations,
      completedReservations,
      pendingReservations,
      totalCustomers,
      availableBalance,
      reservations: formattedReservations,
    });
  } catch (error) {
    console.error('Error fetching MY DASHBOARD:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
