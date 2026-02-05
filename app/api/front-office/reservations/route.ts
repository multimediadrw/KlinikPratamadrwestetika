import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateCommission } from '@/lib/affiliate-utils';
import { requireFrontOffice } from '@/lib/auth';

/**
 * GET /api/front-office/reservations
 * List semua reservasi (front office/admin only)
 */
export async function GET(request: NextRequest) {
  try {
    // Check if user has front office access
    await requireFrontOffice();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where: any = {};
    if (status && status !== 'all') {
      where.status = status;
    }

    const reservations = await prisma.reservation.findMany({
      where,
      include: {
        treatment: {
          select: {
            name: true,
          },
        },
        referrer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            affiliateCode: true,
          },
        },
        preClaimCode: true,
      },
      orderBy: {
        reservationDate: 'desc',
      },
      take: 100, // Limit to recent 100
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    
    if (error instanceof Error && (error.message === 'Unauthorized' || error.message.includes('Forbidden'))) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === 'Unauthorized' ? 401 : 403 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch reservations' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/front-office/reservations
 * Update atau create reservasi (front office/admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // Check if user has front office access
    await requireFrontOffice();

    const body = await request.json();
    const {
      id, // Jika ada, berarti update
      treatmentId,
      patientName,
      patientEmail,
      patientPhone,
      patientNotes,
      reservationDate,
      reservationTime,
      referredBy,
      originalPrice,
      finalPrice,
      status,
      adminNotes,
    } = body;

    // Validasi required fields
    if (!treatmentId || !patientName || !patientEmail || !patientPhone || !reservationDate || !reservationTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Cek treatment exists
    const treatment = await prisma.treatment.findUnique({
      where: { id: treatmentId },
    });

    if (!treatment) {
      return NextResponse.json(
        { error: 'Treatment not found' },
        { status: 404 }
      );
    }

    let referrerId: string | null = null;
    let preClaimCodeId: string | null = null;
    let commissionAmount = 0;

    // Handle referral code
    if (referredBy) {
      const referrer = await prisma.user.findUnique({
        where: { affiliateCode: referredBy },
      });

      if (referrer) {
        referrerId = referrer.id;
        commissionAmount = calculateCommission(Number(finalPrice));
      } else {
        const unclaimedCode = await prisma.preClaimAffiliateCode.findUnique({
          where: { code: referredBy },
        });

        if (unclaimedCode) {
          preClaimCodeId = unclaimedCode.id;
          commissionAmount = calculateCommission(Number(finalPrice));
        }
      }
    }

    if (id) {
      // Update existing reservation
      const reservation = await prisma.reservation.update({
        where: { id },
        data: {
          treatmentId,
          patientName,
          patientEmail,
          patientPhone,
          patientNotes: patientNotes || null,
          reservationDate: new Date(reservationDate),
          reservationTime,
          referredBy: referredBy || null,
          referrerId,
          preClaimCodeId,
          originalPrice: Number(originalPrice),
          finalPrice: Number(finalPrice),
          commissionAmount,
          status,
          adminNotes: adminNotes || null,
          completedAt: status === 'completed' ? new Date() : null,
        },
        include: {
          treatment: true,
          referrer: true,
        },
      });

      return NextResponse.json(reservation);
    } else {
      // Create new reservation
      const reservation = await prisma.reservation.create({
        data: {
          treatmentId,
          patientName,
          patientEmail,
          patientPhone,
          patientNotes: patientNotes || null,
          reservationDate: new Date(reservationDate),
          reservationTime,
          referredBy: referredBy || null,
          referrerId,
          preClaimCodeId,
          originalPrice: Number(originalPrice) || Number(treatment.price),
          finalPrice: Number(finalPrice) || Number(treatment.price),
          commissionAmount,
          status: status || 'pending',
          adminNotes: adminNotes || null,
        },
        include: {
          treatment: true,
          referrer: true,
        },
      });

      return NextResponse.json(reservation, { status: 201 });
    }
  } catch (error) {
    console.error('Error managing reservation:', error);
    
    if (error instanceof Error && (error.message === 'Unauthorized' || error.message.includes('Forbidden'))) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === 'Unauthorized' ? 401 : 403 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to manage reservation' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/front-office/reservations?id=xxx
 * Delete reservasi (front office/admin only)
 */
export async function DELETE(request: NextRequest) {
  try {
    // Check if user has front office access
    await requireFrontOffice();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing reservation id' },
        { status: 400 }
      );
    }

    await prisma.reservation.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    
    if (error instanceof Error && (error.message === 'Unauthorized' || error.message.includes('Forbidden'))) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === 'Unauthorized' ? 401 : 403 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to delete reservation' },
      { status: 500 }
    );
  }
}
