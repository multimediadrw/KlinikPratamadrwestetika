import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { generateRandomAffiliateCode } from '@/lib/affiliate-utils';

// GET all codes with stats
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin or front office
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user?.isAdmin && !user?.isFrontOffice) {
      return NextResponse.json({ error: 'Forbidden - Admin or Front Office access required' }, { status: 403 });
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
        reservations: {
          select: {
            id: true,
            finalPrice: true,
            commissionAmount: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate stats
    const totalCodes = codes.length;
    const claimedCodes = codes.filter(c => c.status === 'claimed').length;
    const unclaimedCodes = totalCodes - claimedCodes;
    const totalUsage = codes.reduce((sum, code) => sum + code.usageCount, 0);

    // Transform codes to match expected format
    const transformedCodes = codes.map(code => ({
      id: code.id,
      code: code.code,
      assignedEmail: code.assignedEmail || code.user?.email || null,
      status: code.status,
      usageCount: code.usageCount,
      totalCommission: Number(code.totalCommission),
      createdAt: code.createdAt.toISOString(),
    }));

    const stats = {
      totalCodes,
      unclaimedCodes,
      claimedCodes,
      totalUsage,
    };

    return NextResponse.json({ codes: transformedCodes, stats });
  } catch (error) {
    console.error('Error fetching codes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST create new codes (bulk generation)
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin or front office
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user?.isAdmin && !user?.isFrontOffice) {
      return NextResponse.json({ error: 'Forbidden - Admin or Front Office access required' }, { status: 403 });
    }

    const body = await req.json();
    const { count = 1, code, notes, customCode } = body;

    // If custom code is provided, create single code
    if (customCode || code) {
      const codeToUse = customCode || code;
      // Check if code already exists
      const existing = await prisma.preClaimAffiliateCode.findUnique({
        where: { code: codeToUse },
      });

      if (existing) {
        return NextResponse.json({ error: 'Code already exists' }, { status: 400 });
      }

      // Create new code
      const newCode = await prisma.preClaimAffiliateCode.create({
        data: {
          code: codeToUse,
          notes,
          status: 'unclaimed',
        },
      });

      return NextResponse.json({ code: newCode }, { status: 201 });
    }

    // Bulk generation
    const codesToCreate = [];
    const generatedCodes = new Set();

    // Get existing codes to avoid duplicates
    const existingCodes = await prisma.preClaimAffiliateCode.findMany({
      select: { code: true },
    });
    const existingCodesSet = new Set(existingCodes.map(c => c.code));

    for (let i = 0; i < count; i++) {
      let newCode;
      let attempts = 0;
      
      // Generate unique code
      do {
        newCode = generateRandomAffiliateCode();
        attempts++;
        
        if (attempts > 100) {
          return NextResponse.json({ error: 'Failed to generate unique codes' }, { status: 500 });
        }
      } while (generatedCodes.has(newCode) || existingCodesSet.has(newCode));

      generatedCodes.add(newCode);
      codesToCreate.push({
        code: newCode,
        createdBy: user.id,
        notes: notes || null,
        status: 'unclaimed',
      });
    }

    // Create all codes
    const result = await prisma.preClaimAffiliateCode.createMany({
      data: codesToCreate,
      skipDuplicates: true,
    });

    return NextResponse.json({ 
      message: `Successfully generated ${result.count} codes`,
      count: result.count 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating codes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
