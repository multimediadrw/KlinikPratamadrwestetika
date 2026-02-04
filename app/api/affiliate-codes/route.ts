import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { generateRandomAffiliateCode, isValidAffiliateCode } from '@/lib/affiliate-utils';

/**
 * GET /api/affiliate-codes
 * List semua kode affiliate (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify user is admin
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user?.isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // claimed, unclaimed, all
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status && status !== 'all') {
      where.status = status;
    }

    const [codes, total] = await Promise.all([
      prisma.preClaimAffiliateCode.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.preClaimAffiliateCode.count({ where }),
    ]);

    return NextResponse.json({
      data: codes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching affiliate codes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch affiliate codes' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/affiliate-codes
 * Generate kode affiliate baru (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify user is admin
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user?.isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    let { code, notes } = body;

    // Generate random code jika tidak diberikan
    if (!code) {
      code = generateRandomAffiliateCode();
    }

    // Validasi format kode
    if (!isValidAffiliateCode(code)) {
      return NextResponse.json(
        { error: 'Invalid code format. Must be 4-10 alphanumeric characters (uppercase)' },
        { status: 400 }
      );
    }

    // Cek apakah kode sudah ada
    const existingCode = await prisma.preClaimAffiliateCode.findUnique({
      where: { code },
    });

    if (existingCode) {
      return NextResponse.json(
        { error: 'Code already exists' },
        { status: 409 }
      );
    }

    // Create kode baru
    const newCode = await prisma.preClaimAffiliateCode.create({
      data: {
        code,
        notes: notes || null,
        createdBy: user.id,
        status: 'unclaimed',
      },
    });

    return NextResponse.json(newCode, { status: 201 });
  } catch (error) {
    console.error('Error creating affiliate code:', error);
    return NextResponse.json(
      { error: 'Failed to create affiliate code' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/affiliate-codes?id=xxx
 * Delete kode unclaimed (admin only)
 */
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify user is admin
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user?.isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing code id' },
        { status: 400 }
      );
    }

    const code = await prisma.preClaimAffiliateCode.findUnique({
      where: { id },
    });

    if (!code) {
      return NextResponse.json(
        { error: 'Code not found' },
        { status: 404 }
      );
    }

    if (code.status === 'claimed') {
      return NextResponse.json(
        { error: 'Cannot delete claimed code' },
        { status: 400 }
      );
    }

    await prisma.preClaimAffiliateCode.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting affiliate code:', error);
    return NextResponse.json(
      { error: 'Failed to delete affiliate code' },
      { status: 500 }
    );
  }
}
