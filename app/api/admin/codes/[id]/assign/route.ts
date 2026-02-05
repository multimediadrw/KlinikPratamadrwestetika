import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Get the code
    const code = await prisma.preClaimAffiliateCode.findUnique({
      where: { id: params.id },
    });

    if (!code) {
      return NextResponse.json({ error: 'Code not found' }, { status: 404 });
    }

    // Check if code is already claimed
    if (code.status === 'claimed') {
      return NextResponse.json({ error: 'Code is already claimed' }, { status: 400 });
    }

    // Assign email to code
    const updatedCode = await prisma.preClaimAffiliateCode.update({
      where: { id: params.id },
      data: {
        assignedEmail: email,
      },
    });

    return NextResponse.json({ code: updatedCode });
  } catch (error) {
    console.error('Error assigning email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
