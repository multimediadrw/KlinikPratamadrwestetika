import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [totalReservations, pendingReservations, completedReservations, totalAffiliates] = await Promise.all([
      prisma.reservation.count(),
      prisma.reservation.count({ where: { status: 'pending' } }),
      prisma.reservation.count({ where: { status: 'completed' } }),
      prisma.user.count({ where: { isAdmin: false } }),
    ]);

    return NextResponse.json({
      totalReservations,
      pendingReservations,
      completedReservations,
      totalAffiliates,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
