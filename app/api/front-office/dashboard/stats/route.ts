import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireFrontOffice } from '@/lib/auth';

export async function GET() {
  try {
    // Check if user has front office access
    await requireFrontOffice();

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
