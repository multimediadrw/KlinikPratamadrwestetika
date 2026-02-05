import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/simple-auth';

export async function GET() {
  try {
    // Check authentication
    await requireAuth();

    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      totalReservations, 
      pendingReservations, 
      confirmedReservations,
      completedReservations, 
      totalToday
    ] = await Promise.all([
      prisma.reservation.count(),
      prisma.reservation.count({ where: { status: 'pending' } }),
      prisma.reservation.count({ where: { status: 'confirmed' } }),
      prisma.reservation.count({ where: { status: 'completed' } }),
      prisma.reservation.count({
        where: {
          reservationDate: {
            gte: today,
            lt: tomorrow,
          },
        },
      }),
    ]);

    return NextResponse.json({
      totalReservations,
      pendingReservations,
      confirmedReservations,
      completedReservations,
      totalToday,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    
    if (error instanceof Error && (error.message === 'Unauthorized' || error.message.includes('Forbidden'))) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === 'Unauthorized' ? 401 : 403 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
