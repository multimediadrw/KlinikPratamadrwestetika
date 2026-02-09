import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

    // Find affiliate code by email
    const affiliateCode = await prisma.affiliateCode.findFirst({
      where: {
        email: userEmail,
        status: 'claimed',
      },
    });

    if (!affiliateCode) {
      return NextResponse.json(
        { error: 'No affiliate code found' },
        { status: 404 }
      );
    }

    // Get reservations for this affiliate code
    const reservations = await prisma.reservation.findMany({
      where: {
        affiliateCode: affiliateCode.code,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate stats
    const totalReservations = reservations.length;
    const completedReservations = reservations.filter(r => r.status === 'completed').length;
    const pendingReservations = reservations.filter(r => r.status === 'pending').length;
    
    // Calculate commission (10% of total price)
    const totalCommission = reservations.reduce((sum, r) => {
      if (r.status === 'completed') {
        return sum + (r.totalPrice * 0.1);
      }
      return sum;
    }, 0);

    // Count unique customers
    const uniqueCustomers = new Set(reservations.map(r => r.customerEmail || r.customerPhone)).size;

    // Generate referral link
    const referralLink = `${process.env.NEXT_PUBLIC_APP_URL || 'https://klinik.drwskincare.com'}/?ref=${affiliateCode.code}`;

    // Format reservations data
    const formattedReservations = reservations.map(r => ({
      id: r.id,
      customerName: r.customerName,
      treatment: r.treatment,
      price: r.totalPrice,
      commission: r.status === 'completed' ? r.totalPrice * 0.1 : 0,
      status: r.status,
      date: r.createdAt.toISOString(),
    }));

    return NextResponse.json({
      affiliateCode: affiliateCode.code,
      email: userEmail,
      referralLink,
      totalCommission: Math.round(totalCommission),
      totalReservations,
      completedReservations,
      pendingReservations,
      totalCustomers: uniqueCustomers,
      availableBalance: Math.round(totalCommission),
      reservations: formattedReservations,
    });

  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
