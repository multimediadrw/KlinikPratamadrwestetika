import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/simple-auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { codeId, email } = body;

    if (!codeId || !email) {
      return NextResponse.json(
        { error: 'Code ID and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Find the code
    const code = await prisma.preClaimAffiliateCode.findUnique({
      where: { id: codeId },
    });

    if (!code) {
      return NextResponse.json({ error: 'Code not found' }, { status: 404 });
    }

    // Check if email is already assigned to another code
    const existingAssignment = await prisma.preClaimAffiliateCode.findFirst({
      where: {
        assignedEmail: email,
        id: { not: codeId },
      },
    });

    if (existingAssignment) {
      return NextResponse.json(
        { error: 'This email is already assigned to another code' },
        { status: 400 }
      );
    }

    // Find or create user with this email
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Create new user (without password, they'll use the affiliate link)
      // Generate unique affiliate code
      const affiliateCode = 'AFF' + Math.random().toString(36).substring(2, 8).toUpperCase();
      
      user = await prisma.user.create({
        data: {
          email,
          firstName: email.split('@')[0], // Use email prefix as firstName
          password: '', // No password needed for affiliators
          affiliateCode,
          isAdmin: false,
        },
      });
    }

    // Update the code: assign email and set status to claimed
    const updatedCode = await prisma.preClaimAffiliateCode.update({
      where: { id: codeId },
      data: {
        assignedEmail: email,
        status: 'claimed',
        claimedAt: new Date(),
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: code.status === 'claimed' ? 'TRANSFER_CODE' : 'ASSIGN_CLAIM_CODE',
        performedBy: session.email,
        targetEmail: email,
        details: `Code ${code.code} ${code.status === 'claimed' ? 'transferred to' : 'assigned and claimed by'} ${email}`,
      },
    });

    return NextResponse.json({
      success: true,
      code: updatedCode,
    });
  } catch (error) {
    console.error('Error assigning code:', error);
    return NextResponse.json(
      { error: 'Failed to assign code' },
      { status: 500 }
    );
  }
}
