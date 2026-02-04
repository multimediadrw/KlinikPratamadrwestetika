import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

// GET all codes
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 });
    }

    // Get all codes with user info
    const codes = await prisma.preClaimAffiliateCode.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
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

    return NextResponse.json({ codes });
  } catch (error) {
    console.error('Error fetching codes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST create new code
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 });
    }

    const { code, notes } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    // Check if code already exists
    const existing = await prisma.preClaimAffiliateCode.findUnique({
      where: { code },
    });

    if (existing) {
      return NextResponse.json({ error: 'Code already exists' }, { status: 400 });
    }

    // Create new code
    const newCode = await prisma.preClaimAffiliateCode.create({
      data: {
        code,
        notes,
        createdBy: user.id,
      },
    });

    return NextResponse.json({ code: newCode }, { status: 201 });
  } catch (error) {
    console.error('Error creating code:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
