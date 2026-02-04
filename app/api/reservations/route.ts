import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateCommission } from '@/lib/affiliate-utils';

/**
 * GET /api/reservations
 * List semua reservasi (public - untuk testing)
 */
export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      include: {
        treatment: true,
        referrer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            affiliateCode: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reservations' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/reservations
 * Buat reservasi baru (public - dari form reservasi)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      treatmentId,
      patientName,
      patientEmail,
      patientPhone,
      patientNotes,
      reservationDate,
      reservationTime,
      referredBy, // Kode affiliate dari URL parameter
      originalPrice,
      finalPrice,
    } = body;

    // Validasi required fields
    if (!treatmentId || !patientName || !patientEmail || !patientPhone || !reservationDate || !reservationTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Cek apakah treatment exists
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

    // Jika ada referral code, cari user atau unclaimed code
    if (referredBy) {
      // Cari user dengan affiliate code
      const referrer = await prisma.user.findUnique({
        where: { affiliateCode: referredBy },
      });

      if (referrer) {
        referrerId = referrer.id;
        // Calculate commission
        commissionAmount = calculateCommission(Number(finalPrice));
      } else {
        // Cari unclaimed code
        const unclaimedCode = await prisma.preClaimAffiliateCode.findUnique({
          where: { code: referredBy },
        });

        if (unclaimedCode) {
          preClaimCodeId = unclaimedCode.id;
          // Calculate commission
          commissionAmount = calculateCommission(Number(finalPrice));
        }
      }
    }

    // Create reservation
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
        status: 'pending',
      },
      include: {
        treatment: true,
        referrer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            affiliateCode: true,
          },
        },
      },
    });

    // Update usage count jika ada referral
    if (referredBy) {
      if (preClaimCodeId) {
        await prisma.preClaimAffiliateCode.update({
          where: { id: preClaimCodeId },
          data: { usageCount: { increment: 1 } },
        });
      } else if (referrerId) {
        await prisma.user.update({
          where: { id: referrerId },
          data: { totalReferrals: { increment: 1 } },
        });
      }
    }

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error('Error creating reservation:', error);
    return NextResponse.json(
      { error: 'Failed to create reservation' },
      { status: 500 }
    );
  }
}
